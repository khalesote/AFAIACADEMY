import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  TextInput,
  Alert,
  FlatList,
  Modal
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { collection, addDoc, getDocs, query, orderBy, where, Timestamp } from 'firebase/firestore';
import { ref, uploadBytes, getDownloadURL } from 'firebase/storage';
import * as ImagePicker from 'expo-image-picker';
import { firestore, storage } from '../../config/firebase';
import { useUser } from '../../contexts/UserContext';
import { Image } from 'react-native';

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
}

const categories = [
  { key: 'general', label: 'General', icon: 'chatbubbles-outline', color: '#1976d2' },
  { key: 'study', label: 'Estudios', icon: 'school-outline', color: '#388e3c' },
  { key: 'work', label: 'Trabajo', icon: 'briefcase-outline', color: '#fbc02d' },
  { key: 'immigration', label: 'Inmigración', icon: 'airplane-outline', color: '#d32f2f' },
  { key: 'culture', label: 'Cultura', icon: 'heart-outline', color: '#e91e63' },
];

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
  const { user, profileImage } = useUser();

  useEffect(() => {
    loadPosts();
  }, []);

  const loadPosts = async () => {
    if (!firestore) {
      console.error('Firestore not available');
      Alert.alert('Error', 'Servicio de base de datos no disponible');
      setLoading(false);
      return;
    }

    try {
      const postsQuery = query(
        collection(firestore, 'forum_posts'),
        orderBy('createdAt', 'desc')
      );
      const querySnapshot = await getDocs(postsQuery);
      const postsData: ForumPost[] = [];
      querySnapshot.forEach((doc) => {
        postsData.push({ id: doc.id, ...doc.data() } as ForumPost);
      });
      setPosts(postsData);
    } catch (error) {
      console.error('Error loading posts:', error);
      Alert.alert('Error', 'No se pudieron cargar las publicaciones del foro');
    } finally {
      setLoading(false);
    }
  };

  const loadComments = async (postId: string) => {
    if (!firestore) return;

    try {
      const commentsQuery = query(
        collection(firestore, 'forum_comments'),
        where('postId', '==', postId)
      );
      const querySnapshot = await getDocs(commentsQuery);
      const commentsData: ForumComment[] = [];
      querySnapshot.forEach((doc) => {
        commentsData.push({ id: doc.id, ...doc.data() } as ForumComment);
      });
      commentsData.sort((a, b) => {
        const aTime = a.createdAt?.toMillis?.() ?? 0;
        const bTime = b.createdAt?.toMillis?.() ?? 0;
        return aTime - bTime;
      });
      setComments(prev => ({ ...prev, [postId]: commentsData }));
    } catch (error) {
      console.error('Error loading comments:', error);
    }
  };

  const pickPostImage = async () => {
    const permissionResult = await ImagePicker.requestMediaLibraryPermissionsAsync();
    if (!permissionResult.granted) {
      Alert.alert('Permiso requerido', 'Necesitamos acceso a tu galería para subir una imagen.');
      return;
    }

    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      quality: 0.8,
    });

    if (!result.canceled && result.assets?.length) {
      setNewPostImageUri(result.assets[0].uri);
    }
  };

  const uploadPostImage = async (userId: string, imageUri: string) => {
    if (!storage) {
      console.warn('Firebase Storage no disponible');
      return null;
    }

    const response = await fetch(imageUri);
    const blob = await response.blob();
    const filename = `forum_images/${userId}/${Date.now()}.jpg`;
    const storageRef = ref(storage, filename);

    const uploadTask = await uploadBytes(storageRef, blob);
    return getDownloadURL(uploadTask.ref);
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
      let imageUrl: string | null = null;
      if (newPostImageUri) {
        setUploadingImage(true);
        try {
          imageUrl = await uploadPostImage(user.id, newPostImageUri);
        } catch (uploadError) {
          console.error('Error uploading post image:', uploadError);
          Alert.alert('Error', 'No se pudo subir la imagen. Publicaremos sin imagen.');
        } finally {
          setUploadingImage(false);
        }
      }

      await addDoc(collection(firestore, 'forum_posts'), {
        title: newPostTitle.trim(),
        content: newPostContent.trim(),
        author: user.name || user.email,
        authorId: user.id,
        authorPhoto: profileImage || null,
        imageUrl: imageUrl || null,
        createdAt: Timestamp.now(),
        category: selectedCategory,
      });

      setModalVisible(false);
      setNewPostTitle('');
      setNewPostContent('');
      setNewPostImageUri(null);
      setSelectedCategory('general');
      loadPosts();
      Alert.alert('Éxito', 'Publicación creada correctamente');
    } catch (error) {
      console.error('Error creating post:', error);
      Alert.alert('Error', 'No se pudo crear la publicación');
    }
  };

  const createComment = async () => {
    if (!newCommentContent.trim() || !selectedPostId || !user || !firestore) {
      return;
    }

    try {
      await addDoc(collection(firestore, 'forum_comments'), {
        postId: selectedPostId,
        content: newCommentContent.trim(),
        author: user.name || user.email,
        authorId: user.id,
        authorPhoto: profileImage || null,
        createdAt: Timestamp.now(),
      });

      setCommentModalVisible(false);
      setNewCommentContent('');
      setSelectedPostId(null);

      await loadComments(selectedPostId);

      setPosts(prevPosts =>
        prevPosts.map(post =>
          post.id === selectedPostId
            ? { ...post, commentsCount: (post.commentsCount || 0) + 1 }
            : post
        )
      );

      Alert.alert('Éxito', 'Comentario agregado correctamente');
    } catch (error) {
      console.error('Error creating comment:', error);
      Alert.alert('Error', 'No se pudo agregar el comentario');
    }
  };

  const togglePostExpansion = async (postId: string) => {
    const newExpandedPosts = new Set(expandedPosts);
    if (expandedPosts.has(postId)) {
      newExpandedPosts.delete(postId);
    } else {
      newExpandedPosts.add(postId);
      if (!comments[postId]) {
        await loadComments(postId);
      }
    }
    setExpandedPosts(newExpandedPosts);
  };

  const openCommentModal = (postId: string) => {
    setSelectedPostId(postId);
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
          {item.authorPhoto ? (
            <View style={styles.authorInfo}>
              <Image source={{ uri: item.authorPhoto }} style={styles.authorPhoto} />
              <Text style={styles.postAuthor}>Por: {item.author}</Text>
            </View>
          ) : (
            <Text style={styles.postAuthor}>Por: {item.author}</Text>
          )}

          <View style={styles.postActions}>
            <TouchableOpacity
              style={styles.commentButton}
              onPress={() => openCommentModal(item.id)}
            >
              <Ionicons name="chatbubble-outline" size={16} color="#666" />
              <Text style={styles.commentButtonText}>Comentar</Text>
            </TouchableOpacity>

            {(item.commentsCount || 0) > 0 && (
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
                  {item.commentsCount} {item.commentsCount === 1 ? 'comentario' : 'comentarios'}
                </Text>
              </TouchableOpacity>
            )}
          </View>
        </View>

        {isExpanded && postComments.length > 0 && (
          <View style={styles.commentsSection}>
            <Text style={styles.commentsTitle}>Comentarios</Text>
            {postComments.map((comment) => (
              <View key={comment.id} style={styles.commentItem}>
                {comment.authorPhoto ? (
                  <View style={styles.commentAuthorInfo}>
                    <Image source={{ uri: comment.authorPhoto }} style={styles.commentAuthorPhoto} />
                    <View style={styles.commentContent}>
                      <Text style={styles.commentAuthor}>{comment.author}</Text>
                      <Text style={styles.commentText}>{comment.content}</Text>
                      <Text style={styles.commentDate}>{formatDate(comment.createdAt)}</Text>
                    </View>
                  </View>
                ) : (
                  <View style={styles.commentContent}>
                    <Text style={styles.commentAuthor}>{comment.author}</Text>
                    <Text style={styles.commentText}>{comment.content}</Text>
                    <Text style={styles.commentDate}>{formatDate(comment.createdAt)}</Text>
                  </View>
                )}
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
        <Text style={styles.headerTitle}>Foro de la Comunidad</Text>
        <TouchableOpacity
          style={styles.addButton}
          onPress={() => setModalVisible(true)}
        >
          <Ionicons name="add-circle" size={24} color="#FFD700" />
          <Text style={styles.addButtonText}>Nueva Publicación</Text>
        </TouchableOpacity>
      </View>

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

              <Text style={styles.inputLabel}>Imagen (opcional)</Text>
              <TouchableOpacity style={styles.imagePickerButton} onPress={pickPostImage}>
                <Ionicons name="image-outline" size={20} color="#1976d2" />
                <Text style={styles.imagePickerText}>Elegir imagen</Text>
              </TouchableOpacity>
              {newPostImageUri ? (
                <View style={styles.imagePreviewContainer}>
                  <Image source={{ uri: newPostImageUri }} style={styles.imagePreview} />
                  <TouchableOpacity
                    style={styles.removeImageButton}
                    onPress={() => setNewPostImageUri(null)}
                  >
                    <Ionicons name="close" size={18} color="#fff" />
                  </TouchableOpacity>
                </View>
              ) : null}

              <Text style={styles.inputLabel}>Título</Text>
              <TextInput
                style={styles.textInput}
                placeholder="Escribe el título de tu publicación..."
                value={newPostTitle}
                onChangeText={setNewPostTitle}
                maxLength={100}
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
                <Text style={styles.submitButtonText}>
                  {uploadingImage ? 'Subiendo...' : 'Publicar'}
                </Text>
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
    paddingVertical: 15,
    backgroundColor: '#1a1a1a',
    borderBottomWidth: 1,
    borderBottomColor: '#333',
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
  },
  addButtonText: {
    color: '#fff',
    marginLeft: 5,
    fontWeight: '600',
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
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
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
  postAuthor: {
    fontSize: 12,
    color: '#999',
    fontStyle: 'italic',
  },
  postActions: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  commentButton: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 10,
    paddingVertical: 6,
    marginRight: 10,
  },
  commentButtonText: {
    fontSize: 12,
    color: '#666',
    marginLeft: 4,
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
