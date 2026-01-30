import React, { useState, useEffect, useCallback } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  TextInput,
  Alert,
  FlatList,
  Modal,
  ActivityIndicator
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { collection, addDoc, getDocs, query, orderBy, where, Timestamp, onSnapshot, updateDoc, increment, doc } from 'firebase/firestore';
import { ref, uploadBytes, getDownloadURL } from 'firebase/storage';
import * as ImagePicker from 'expo-image-picker';
import { firestore, storage } from '../../config/firebase';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useUser } from '../../contexts/UserContext';
import { Image } from 'react-native';
import { useFocusEffect } from '@react-navigation/native';
import { useRouter } from 'expo-router';

interface ForumPost {
  id: string;
  title: string;
  content: string;
  author: string;
  authorId: string;
  authorPhoto?: string;
  imageUrl?: string;
  createdAt: Timestamp;
  category: string;
  commentsCount?: number;
}

interface ForumComment {
  id: string;
  postId: string;
  content: string;
  author: string;
  authorId: string;
  authorPhoto?: string;
  createdAt: Timestamp;
  parentCommentId?: string | null;
}

const categories = [
  { key: 'general', label: 'General', icon: 'chatbubbles-outline', color: '#1976d2' },
  { key: 'study', label: 'Estudios', icon: 'school-outline', color: '#388e3c' },
  { key: 'work', label: 'Trabajo', icon: 'briefcase-outline', color: '#fbc02d' },
  { key: 'immigration', label: 'Inmigración', icon: 'airplane-outline', color: '#d32f2f' },
  { key: 'culture', label: 'Cultura', icon: 'heart-outline', color: '#e91e63' },
];

const getBlobFromUri = async (uri: string): Promise<Blob> => {
  return await new Promise<Blob>((resolve, reject) => {
    const xhr = new XMLHttpRequest();
    xhr.onload = function () {
      resolve(xhr.response);
    };
    xhr.onerror = function () {
      reject(new TypeError('Network request failed'));
    };
    xhr.responseType = 'blob';
    xhr.open('GET', uri, true);
    xhr.send(null);
  });
};

export default function ForumScreen() {
  const [posts, setPosts] = useState<ForumPost[]>([]);
  const [comments, setComments] = useState<{ [postId: string]: ForumComment[] }>({});
  const [loading, setLoading] = useState(true);
  const [modalVisible, setModalVisible] = useState(false);
  const [newPostTitle, setNewPostTitle] = useState('');
  const [newPostContent, setNewPostContent] = useState('');
  const [newPostImageUri, setNewPostImageUri] = useState<string | null>(null);
  const [uploadingImage, setUploadingImage] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState('general');
  const [expandedPosts, setExpandedPosts] = useState<Set<string>>(new Set());
  const [commentModalVisible, setCommentModalVisible] = useState(false);
  const [selectedPostId, setSelectedPostId] = useState<string | null>(null);
  const [newCommentContent, setNewCommentContent] = useState('');
  const [replyingTo, setReplyingTo] = useState<ForumComment | null>(null);
  const { user, profileImage } = useUser();
  const [commentUnsubscribers, setCommentUnsubscribers] = useState<{ [postId: string]: () => void }>({});
  const [showNewPostsBanner, setShowNewPostsBanner] = useState(false);
  const [lastViewedTimestamp, setLastViewedTimestamp] = useState(0);
  const router = useRouter();

  useFocusEffect(
    useCallback(() => {
      const updateViewed = async () => {
        const now = Date.now();
        await AsyncStorage.setItem('@forum_last_viewed', now.toString());
        setLastViewedTimestamp(now);
        setShowNewPostsBanner(false);
      };
      updateViewed();
    }, [])
  );

  useEffect(() => {
    const init = async () => {
      const last = await AsyncStorage.getItem('@forum_last_viewed');
      const ts = last ? parseInt(last) : 0;
      setLastViewedTimestamp(ts);
      const unsubscribePosts = loadPosts(ts);
      return () => {
        if (unsubscribePosts) unsubscribePosts();
        Object.values(commentUnsubscribers).forEach(unsub => unsub());
      };
    };
    init();
  }, []);

  const loadPosts = (lastViewed: number) => {
    if (!firestore) {
      console.error('Firestore not available');
      Alert.alert('Error', 'Servicio de base de datos no disponible');
      setLoading(false);
      return;
    }

    const postsQuery = query(
      collection(firestore, 'forum_posts'),
      orderBy('createdAt', 'desc')
    );

    const unsubscribe = onSnapshot(postsQuery, (querySnapshot) => {
      const postsData: ForumPost[] = [];
      querySnapshot.forEach((doc) => {
        const post = { id: doc.id, ...doc.data() } as ForumPost;
        postsData.push(post);
        // Always subscribe to comment updates so new comments appear in real time
        loadComments(post.id);
      });
      setPosts(postsData);
      setLoading(false);

      // Check for new posts
      const hasNew = postsData.some(p => p.createdAt.toMillis() > lastViewed);
      setShowNewPostsBanner(hasNew);
    }, (error) => {
      console.error('Error loading posts:', error);
      setLoading(false);
    });

    return unsubscribe;
  };

  const loadComments = (postId: string) => {
    if (!firestore) return;
    if (commentUnsubscribers[postId]) return; // already listening

    console.log('📥 Loading comments for post:', postId);
    const commentsQuery = query(
      collection(firestore, 'forum_comments'),
      where('postId', '==', postId),
      orderBy('createdAt', 'asc')
    );

    const unsubscribe = onSnapshot(commentsQuery, (querySnapshot) => {
      const commentsData: ForumComment[] = [];
      querySnapshot.forEach((doc) => {
        commentsData.push({ id: doc.id, ...doc.data() } as ForumComment);
      });
      commentsData.sort((a, b) => {
        const aTime = a.createdAt?.toMillis?.() ?? 0;
        const bTime = b.createdAt?.toMillis?.() ?? 0;
        return aTime - bTime;
      });
      console.log(`📡 Comments updated for post ${postId}: ${commentsData.length} comments`);
      setComments(prev => ({ ...prev, [postId]: commentsData }));
    }, (error) => {
      console.error('❌ Error loading comments:', error);
    });

    setCommentUnsubscribers(prev => ({ ...prev, [postId]: unsubscribe }));
  };

  const createPost = async () => {
    if (!newPostTitle.trim() || !newPostContent.trim()) {
      Alert.alert('Error', 'Por favor completa el título y contenido');
      return;
    }

    if (!user) {
      Alert.alert('Error', 'Debes estar logueado para publicar');
      return;
    }

    if (!firestore) {
      console.error('Firestore not available');
      Alert.alert('Error', 'Servicio de base de datos no disponible');
      return;
    }

    try {
      const trimmedTitle = newPostTitle.trim();
      const trimmedContent = newPostContent.trim();
      const authorName = user.name || user.email;
      const createdAt = Timestamp.now();

      try {
        setUploadingImage(true);

        let uploadedImageUrl: string | null = null;
        if (newPostImageUri) {
          try {
            const fileExtension = newPostImageUri.split('.').pop()?.split('?')[0] || 'jpg';
            const imageBlob = await getBlobFromUri(newPostImageUri);
            const storageRef = ref(storage, `forum_posts/${user.id}_${Date.now()}.${fileExtension}`);
            await uploadBytes(storageRef, imageBlob);
            uploadedImageUrl = await getDownloadURL(storageRef);
            (imageBlob as any)?.close?.();
          } catch (imageError) {
            console.error('Error subiendo imagen del foro:', imageError);
            Alert.alert('Error', 'No se pudo subir la imagen seleccionada');
            setUploadingImage(false);
            return;
          }
        }

        const postRef = await addDoc(collection(firestore, 'forum_posts'), {
          title: trimmedTitle,
          content: trimmedContent,
          author: authorName,
          authorId: user.id,
          authorPhoto: profileImage || null,
          imageUrl: uploadedImageUrl,
          createdAt,
          category: selectedCategory,
          commentsCount: 0,
        });

        try {
          const usersSnapshot = await getDocs(collection(firestore, 'users'));
          const notificationPromises: Promise<any>[] = [];
          const tokens: string[] = [];
          const title = 'Nueva publicación en el foro';
          const message = `${authorName} publicó: ${trimmedTitle}`;

          usersSnapshot.forEach((docSnapshot) => {
            if (docSnapshot.id === user.id) return;
            const userData = docSnapshot.data();
            notificationPromises.push(addDoc(collection(firestore, 'notifications'), {
              title,
              message,
              sentBy: authorName,
              sentByEmail: user.email,
              sentById: user.id,
              toUserId: docSnapshot.id,
              read: false,
              type: 'forum_post',
              postId: postRef.id,
              createdAt,
            }));

            if (userData.pushToken) {
              tokens.push(userData.pushToken);
            }
          });

          await Promise.all(notificationPromises);

          if (tokens.length > 0) {
            const messages = tokens.map((token) => ({
              to: token,
              title,
              body: message,
              data: { type: 'forum_post', postId: postRef.id },
              sound: 'default',
              channelId: 'default',
              priority: 'high',
            }));

            const batchSize = 100;
            for (let i = 0; i < messages.length; i += batchSize) {
              const batch = messages.slice(i, i + batchSize);
              const response = await fetch('https://exp.host/--/api/v2/push/send', {
                method: 'POST',
                headers: {
                  Accept: 'application/json',
                  'Content-Type': 'application/json',
                },
                body: JSON.stringify(batch),
              });

              if (!response.ok) {
                console.error('Error enviando push de foro, batch:', i / batchSize);
              }
            }
          }
        } catch (notifyError) {
          console.error('Error notificando publicación de foro:', notifyError);
        }

        setModalVisible(false);
        setNewPostTitle('');
        setNewPostContent('');
        setSelectedCategory('general');
        setNewPostImageUri(null);
        Alert.alert('Éxito', 'Publicación creada correctamente');
      } catch (error) {
        console.error('Error creating post:', error);
        Alert.alert('Error', 'No se pudo crear la publicación');
      } finally {
        setUploadingImage(false);
      }
    } catch (error) {
      console.error('Error creating post:', error);
      Alert.alert('Error', 'No se pudo crear la publicación');
    }
  };

  const handlePickImage = async () => {
    try {
      const permissionResult = await ImagePicker.requestMediaLibraryPermissionsAsync();
      if (!permissionResult.granted) {
        Alert.alert('Permiso requerido', 'Necesitamos acceso a tu galería para adjuntar imágenes');
        return;
      }

      const result = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.Images,
        allowsMultipleSelection: false,
        allowsEditing: true,
        aspect: [3, 4],
        quality: 0.8,
      });

      if (!result.canceled && result.assets?.length) {
        setNewPostImageUri(result.assets[0].uri);
      }
    } catch (pickerError) {
      console.error('Error seleccionando imagen:', pickerError);
      Alert.alert('Error', 'No se pudo seleccionar la imagen');
    }
  };

  const removeSelectedImage = () => {
    setNewPostImageUri(null);
  };

  const createComment = async () => {
    if (!newCommentContent.trim() || !selectedPostId || !user || !firestore) {
      console.log('❌ Comment creation failed: missing data', { newCommentContent: !!newCommentContent.trim(), selectedPostId, user: !!user, firestore: !!firestore });
      return;
    }

    try {
      console.log('📝 Creating comment for post:', selectedPostId);
      await addDoc(collection(firestore, 'forum_comments'), {
        postId: selectedPostId,
        content: newCommentContent.trim(),
        author: user.name || user.email,
        authorId: user.id,
        authorPhoto: profileImage || null,
        createdAt: Timestamp.now(),
        parentCommentId: replyingTo?.id || null,
      });

      // Update comments count in the post
      const postRef = doc(firestore, 'forum_posts', selectedPostId);
      await updateDoc(postRef, {
        commentsCount: increment(1)
      });

      console.log('✅ Comment created successfully');
      setCommentModalVisible(false);
      setNewCommentContent('');
      setSelectedPostId(null);
      setReplyingTo(null);

      Alert.alert('Éxito', 'Comentario agregado correctamente');
    } catch (error) {
      console.error('❌ Error creating comment:', error);
      Alert.alert('Error', 'No se pudo agregar el comentario');
    }
  };

  const togglePostExpansion = (postId: string) => {
    const newExpandedPosts = new Set(expandedPosts);
    if (expandedPosts.has(postId)) {
      newExpandedPosts.delete(postId);
      // unsubscribe comments for this post
      if (commentUnsubscribers[postId]) {
        commentUnsubscribers[postId]();
        setCommentUnsubscribers(prev => {
          const newUnsubs = { ...prev };
          delete newUnsubs[postId];
          return newUnsubs;
        });
      }
    } else {
      newExpandedPosts.add(postId);
      if (!comments[postId]) {
        loadComments(postId);
      }
    }
    setExpandedPosts(newExpandedPosts);
  };

  const openCommentModal = (postId: string, replyTo?: ForumComment) => {
    setSelectedPostId(postId);
    setReplyingTo(replyTo || null);
    setNewCommentContent(replyTo ? `@${replyTo.author} ` : '');
    setCommentModalVisible(true);
  };

  const formatDate = (timestamp: Timestamp) => {
    const date = timestamp.toDate();
    return date.toLocaleDateString('es-ES', {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  const getCategoryInfo = (categoryKey: string) => {
    return categories.find(cat => cat.key === categoryKey) || categories[0];
  };

  const renderPost = ({ item }: { item: ForumPost }) => {
    const category = getCategoryInfo(item.category);
    const isExpanded = expandedPosts.has(item.id);
    const postComments = comments[item.id] || [];
    const commentsCount = postComments.length;

    return (
      <View style={styles.postCard}>
        <View style={styles.postHeader}>
          <View style={styles.categoryBadge}>
            <Ionicons name={category.icon as any} size={16} color={category.color} />
            <Text style={[styles.categoryText, { color: category.color }]}>
              {category.label}
            </Text>
          </View>
          <Text style={styles.postDate}>{formatDate(item.createdAt)}</Text>
        </View>

        <Text style={styles.postTitle}>{item.title}</Text>

        <Text style={styles.postContent} numberOfLines={isExpanded ? undefined : 3}>
          {item.content}
        </Text>

        {item.imageUrl ? (
          <Image source={{ uri: item.imageUrl }} style={styles.postImage} />
        ) : null}

        <View style={styles.postFooter}>
          <TouchableOpacity
            style={styles.authorInfo}
            onPress={() => router.push({ pathname: '/PublicProfileScreen', params: { userId: item.authorId, returnTo: '/(tabs)/ForumScreen' } })}
            disabled={!item.authorId}
            activeOpacity={0.7}
          >
            {item.authorPhoto ? (
              <Image source={{ uri: item.authorPhoto }} style={styles.authorPhoto} />
            ) : (
              <View style={styles.authorFallbackAvatar}>
                <Ionicons name="person" size={14} color="#fff" />
              </View>
            )}
            <Text style={styles.postAuthor}>Por: {item.author}</Text>
          </TouchableOpacity>
        </View>

        <View style={styles.postActions}>
          <TouchableOpacity
            style={styles.commentButton}
            onPress={() => openCommentModal(item.id)}
          >
            <Ionicons name="chatbubble-outline" size={16} color="#1976d2" />
            <Text style={styles.commentButtonText}>Comentar</Text>
          </TouchableOpacity>

          {(commentsCount > 0) && (
            <TouchableOpacity
              style={styles.expandButton}
              onPress={() => togglePostExpansion(item.id)}
            >
              <Ionicons
                name={isExpanded ? "chevron-up" : "chevron-down"}
                size={16}
                color="#666"
              />
              <Text style={styles.expandButtonText}>
                {commentsCount} {commentsCount === 1 ? 'comentario' : 'comentarios'}
              </Text>
            </TouchableOpacity>
          )}
        </View>

        {isExpanded && postComments.length > 0 && (
          <View style={styles.commentsSection}>
            <Text style={styles.commentsTitle}>Comentarios</Text>
            {postComments.map((comment) => (
              <View key={comment.id} style={styles.commentItem}>
                <TouchableOpacity
                  style={styles.commentAuthorInfo}
                  onPress={() => router.push({ pathname: '/PublicProfileScreen', params: { userId: comment.authorId, returnTo: '/(tabs)/ForumScreen' } })}
                  disabled={!comment.authorId}
                  activeOpacity={0.75}
                >
                  {comment.authorPhoto ? (
                    <Image source={{ uri: comment.authorPhoto }} style={styles.commentAuthorPhoto} />
                  ) : (
                    <View style={styles.commentFallbackAvatar}>
                      <Ionicons name="person" size={16} color="#fff" />
                    </View>
                  )}
                  <View style={styles.commentContent}>
                    <Text style={styles.commentAuthor}>{comment.author}</Text>
                    <Text style={styles.commentText}>{comment.content}</Text>
                    <Text style={styles.commentDate}>{formatDate(comment.createdAt)}</Text>
                  </View>
                </TouchableOpacity>
                <TouchableOpacity
                  style={styles.replyButton}
                  onPress={() => openCommentModal(comment.postId, comment)}
                >
                  <Ionicons name="return-down-forward" size={14} color="#1976d2" />
                  <Text style={styles.replyButtonText}>Responder</Text>
                </TouchableOpacity>
              </View>
            ))}
          </View>
        )}
      </View>
    );
  };

  if (loading) {
    return (
      <View style={styles.centerContainer}>
        <Text>Cargando foro...</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity style={styles.backButton} onPress={() => router.push('/')}>
          <Ionicons name="arrow-back" size={28} color="#FFD700" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Foro de la Comunidad</Text>
        <TouchableOpacity
          style={styles.addButton}
          onPress={() => setModalVisible(true)}
        >
          <Ionicons name="add-circle" size={24} color="#FFD700" />
          <Text style={styles.addButtonText}>Publicar</Text>
        </TouchableOpacity>
      </View>

      {showNewPostsBanner && (
        <View style={styles.newPostsBanner}>
          <Text style={styles.newPostsBannerText}>Hay nuevas publicaciones</Text>
          <TouchableOpacity onPress={() => setShowNewPostsBanner(false)}>
            <Ionicons name="close" size={20} color="#666" />
          </TouchableOpacity>
        </View>
      )}

      <FlatList
        data={posts}
        renderItem={renderPost}
        keyExtractor={(item) => item.id}
        contentContainerStyle={styles.postsList}
        ListEmptyComponent={
          <View style={styles.emptyContainer}>
            <Ionicons name="chatbubbles-outline" size={64} color="#ccc" />
            <Text style={styles.emptyText}>No hay publicaciones aún</Text>
            <Text style={styles.emptySubtext}>¡Sé el primero en compartir algo!</Text>
          </View>
        }
      />

      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => setModalVisible(false)}
      >
        <View style={styles.modalOverlay}>
          <View style={styles.modalContent}>
            <View style={styles.modalHeader}>
              <Text style={styles.modalTitle}>Nueva Publicación</Text>
              <TouchableOpacity onPress={() => setModalVisible(false)}>
                <Ionicons name="close" size={24} color="#666" />
              </TouchableOpacity>
            </View>

            <ScrollView style={styles.modalBody}>
              <Text style={styles.inputLabel}>Categoría</Text>
              <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.categoriesScroll}>
                {categories.map((category) => (
                  <TouchableOpacity
                    key={category.key}
                    style={[
                      styles.categoryButton,
                      selectedCategory === category.key && { backgroundColor: category.color }
                    ]}
                    onPress={() => setSelectedCategory(category.key)}
                  >
                    <Ionicons
                      name={category.icon as any}
                      size={20}
                      color={selectedCategory === category.key ? '#fff' : category.color}
                    />
                    <Text style={[
                      styles.categoryButtonText,
                      { color: selectedCategory === category.key ? '#fff' : category.color }
                    ]}>
                      {category.label}
                    </Text>
                  </TouchableOpacity>
                ))}
              </ScrollView>

              <Text style={styles.inputLabel}>Título</Text>
              <TextInput
                style={styles.textInput}
                placeholder="Escribe un título llamativo"
                value={newPostTitle}
                onChangeText={setNewPostTitle}
                maxLength={120}
              />

              <Text style={styles.inputLabel}>Contenido</Text>
              <TextInput
                style={[styles.textInput, styles.contentInput]}
                placeholder="Comparte tus pensamientos, preguntas o experiencias..."
                value={newPostContent}
                onChangeText={setNewPostContent}
                multiline
                numberOfLines={6}
                maxLength={1000}
              />

              <View style={{ marginTop: 20 }}>
                <TouchableOpacity
                  style={styles.imagePickerButton}
                  onPress={handlePickImage}
                >
                  <Ionicons name="image" size={20} color="#1976d2" />
                  <Text style={styles.imagePickerText}>
                    {newPostImageUri ? 'Cambiar imagen (opcional)' : 'Añadir imagen (opcional)'}
                  </Text>
                </TouchableOpacity>
                {newPostImageUri && (
                  <View style={styles.imagePreviewContainer}>
                    <Image source={{ uri: newPostImageUri }} style={styles.imagePreview} />
                    <TouchableOpacity
                      style={styles.removeImageButton}
                      onPress={removeSelectedImage}
                    >
                      <Ionicons name="close" size={16} color="#fff" />
                    </TouchableOpacity>
                  </View>
                )}
              </View>
            </ScrollView>

            <View style={styles.modalFooter}>
              <TouchableOpacity
                style={styles.cancelButton}
                onPress={() => setModalVisible(false)}
              >
                <Text style={styles.cancelButtonText}>Cancelar</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={[styles.submitButton, uploadingImage && styles.submitButtonDisabled]}
                onPress={createPost}
                disabled={uploadingImage}
              >
                {uploadingImage ? (
                  <View style={{ flexDirection: 'row', alignItems: 'center', gap: 8 }}>
                    <ActivityIndicator size="small" color="#fff" />
                    <Text style={styles.submitButtonText}>Publicando...</Text>
                  </View>
                ) : (
                  <Text style={styles.submitButtonText}>
                    Publicar
                  </Text>
                )}
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>

      <Modal
        animationType="slide"
        transparent={true}
        visible={commentModalVisible}
        onRequestClose={() => setCommentModalVisible(false)}
      >
        <View style={styles.modalOverlay}>
          <View style={styles.commentModalContent}>
            <View style={styles.modalHeader}>
              <Text style={styles.modalTitle}>Agregar Comentario</Text>
              <TouchableOpacity onPress={() => setCommentModalVisible(false)}>
                <Ionicons name="close" size={24} color="#666" />
              </TouchableOpacity>
            </View>

            <View style={styles.commentModalBody}>
              {replyingTo && (
                <View style={styles.replyingToBanner}>
                  <Ionicons name="chatbox" size={16} color="#1976d2" />
                  <Text style={styles.replyingToText}>Respondiendo a {replyingTo.author}</Text>
                  <TouchableOpacity onPress={() => { setReplyingTo(null); setNewCommentContent(''); }}>
                    <Ionicons name="close" size={16} color="#999" />
                  </TouchableOpacity>
                </View>
              )}
              <Text style={styles.inputLabel}>Tu comentario</Text>
              <TextInput
                style={[styles.textInput, styles.commentInput]}
                placeholder="Escribe tu comentario..."
                value={newCommentContent}
                onChangeText={setNewCommentContent}
                multiline
                numberOfLines={4}
                maxLength={500}
              />
            </View>

            <View style={styles.modalFooter}>
              <TouchableOpacity
                style={styles.cancelButton}
                onPress={() => {
                  setCommentModalVisible(false);
                  setNewCommentContent('');
                  setSelectedPostId(null);
                  setReplyingTo(null);
                }}
              >
                <Text style={styles.cancelButtonText}>Cancelar</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={styles.submitButton}
                onPress={createComment}
              >
                <Text style={styles.submitButtonText}>Comentar</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f8f9fa',
  },
  centerContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#f8f9fa',
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingVertical: 10,
    backgroundColor: '#1a1a1a',
    borderBottomWidth: 1,
    borderBottomColor: '#333',
  },
  backButton: {
    marginRight: 10,
  },
  headerTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#FFD700',
  },
  addButton: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#1976d2',
    paddingHorizontal: 12,
    paddingVertical: 8,
    borderRadius: 20,
    marginTop: 5,
  },
  addButtonText: {
    color: '#fff',
    marginLeft: 5,
    fontWeight: '600',
  },
  newPostsBanner: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: '#e3f2fd',
    paddingHorizontal: 15,
    paddingVertical: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#bbdefb',
  },
  newPostsBannerText: {
    fontSize: 14,
    fontWeight: '600',
    color: '#1976d2',
  },
  postsList: {
    padding: 15,
  },
  postCard: {
    backgroundColor: '#fff',
    borderRadius: 10,
    padding: 15,
    marginBottom: 15,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  postHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 10,
  },
  categoryBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#f0f0f0',
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 12,
  },
  categoryText: {
    fontSize: 12,
    fontWeight: '600',
    marginLeft: 4,
  },
  postDate: {
    fontSize: 12,
    color: '#666',
  },
  postTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 8,
  },
  postContent: {
    fontSize: 14,
    color: '#666',
    lineHeight: 20,
    marginBottom: 10,
  },
  postImage: {
    width: '100%',
    height: 180,
    borderRadius: 10,
    marginBottom: 12,
  },
  postFooter: {
    flexDirection: 'column',
    alignItems: 'flex-start',
    marginBottom: 8,
  },
  authorInfo: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  authorPhoto: {
    width: 24,
    height: 24,
    borderRadius: 12,
    marginRight: 8,
  },
  authorFallbackAvatar: {
    width: 24,
    height: 24,
    borderRadius: 12,
    marginRight: 8,
    backgroundColor: '#555',
    alignItems: 'center',
    justifyContent: 'center',
  },
  postAuthor: {
    fontSize: 12,
    color: '#999',
    fontStyle: 'italic',
  },
  postActions: {
    width: '100%',
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 10,
    gap: 8,
  },
  commentButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 20,
    paddingVertical: 8,
    borderRadius: 24,
    borderWidth: 1,
    borderColor: '#1976d2',
    backgroundColor: '#eef4ff',
    minWidth: '70%',
  },
  commentButtonText: {
    fontSize: 14,
    color: '#1976d2',
    marginLeft: 6,
    fontWeight: '600',
  },
  expandButton: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 10,
    paddingVertical: 6,
  },
  expandButtonText: {
    fontSize: 12,
    color: '#666',
    marginLeft: 4,
  },
  commentsSection: {
    marginTop: 15,
    paddingTop: 15,
    borderTopWidth: 1,
    borderTopColor: '#eee',
  },
  commentsTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 10,
  },
  commentItem: {
    marginBottom: 12,
    padding: 10,
    backgroundColor: '#f8f9fa',
    borderRadius: 8,
  },
  commentAuthorInfo: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    marginBottom: 5,
  },
  commentAuthorPhoto: {
    width: 20,
    height: 20,
    borderRadius: 10,
    marginRight: 8,
    marginTop: 2,
  },
  commentFallbackAvatar: {
    width: 20,
    height: 20,
    borderRadius: 10,
    marginRight: 8,
    marginTop: 2,
    backgroundColor: '#777',
    alignItems: 'center',
    justifyContent: 'center',
  },
  commentContent: {
    flex: 1,
  },
  commentAuthor: {
    fontSize: 12,
    fontWeight: '600',
    color: '#333',
    marginBottom: 2,
  },
  commentText: {
    fontSize: 14,
    color: '#666',
    lineHeight: 18,
    marginBottom: 4,
  },
  commentDate: {
    fontSize: 10,
    color: '#999',
  },
  replyButton: {
    flexDirection: 'row',
    alignItems: 'center',
    alignSelf: 'flex-end',
    marginTop: 6,
    gap: 4,
  },
  replyButtonText: {
    fontSize: 12,
    color: '#1976d2',
    fontWeight: '600',
  },
  emptyContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 50,
  },
  emptyText: {
    fontSize: 18,
    color: '#666',
    marginTop: 15,
    fontWeight: '600',
  },
  emptySubtext: {
    fontSize: 14,
    color: '#999',
    marginTop: 5,
  },
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.5)',
    justifyContent: 'flex-end',
  },
  modalContent: {
    backgroundColor: '#fff',
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    maxHeight: '80%',
  },
  commentModalContent: {
    backgroundColor: '#fff',
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    maxHeight: '60%',
  },
  modalHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 20,
    borderBottomWidth: 1,
    borderBottomColor: '#eee',
  },
  modalTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#333',
  },
  modalBody: {
    padding: 20,
  },
  commentModalBody: {
    padding: 20,
  },
  replyingToBanner: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: '#eef4ff',
    borderRadius: 8,
    paddingHorizontal: 12,
    paddingVertical: 8,
    marginBottom: 10,
    gap: 10,
  },
  replyingToText: {
    flex: 1,
    fontSize: 13,
    color: '#1976d2',
    fontWeight: '600',
    marginLeft: 6,
  },
  inputLabel: {
    fontSize: 16,
    fontWeight: '600',
    color: '#333',
    marginBottom: 8,
    marginTop: 15,
  },
  textInput: {
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 8,
    padding: 12,
    fontSize: 16,
    backgroundColor: '#f9f9f9',
  },
  contentInput: {
    height: 120,
    textAlignVertical: 'top',
  },
  commentInput: {
    height: 100,
    textAlignVertical: 'top',
  },
  categoriesScroll: {
    marginBottom: 10,
  },
  imagePickerButton: {
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#1976d2',
    borderRadius: 8,
    padding: 10,
  },
  imagePickerText: {
    marginLeft: 8,
    color: '#1976d2',
    fontWeight: '600',
  },
  imagePreviewContainer: {
    marginTop: 12,
    alignSelf: 'flex-start',
  },
  imagePreview: {
    width: 160,
    height: 120,
    borderRadius: 8,
  },
  removeImageButton: {
    position: 'absolute',
    top: -8,
    right: -8,
    backgroundColor: '#d32f2f',
    borderRadius: 12,
    padding: 4,
  },
  categoryButton: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#f0f0f0',
    paddingHorizontal: 12,
    paddingVertical: 8,
    borderRadius: 20,
    marginRight: 10,
  },
  categoryButtonText: {
    fontSize: 14,
    fontWeight: '600',
    marginLeft: 6,
  },
  modalFooter: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    padding: 20,
    borderTopWidth: 1,
    borderTopColor: '#eee',
  },
  cancelButton: {
    flex: 1,
    backgroundColor: '#f0f0f0',
    padding: 12,
    borderRadius: 8,
    marginRight: 10,
    alignItems: 'center',
  },
  cancelButtonText: {
    color: '#666',
    fontWeight: '600',
  },
  submitButton: {
    flex: 1,
    backgroundColor: '#1976d2',
    padding: 12,
    borderRadius: 8,
    marginLeft: 10,
    alignItems: 'center',
  },
  submitButtonDisabled: {
    opacity: 0.7,
  },
  submitButtonText: {
    color: '#fff',
    fontWeight: '600',
  },
});
