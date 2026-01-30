import React, { useState, useEffect, useRef } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  FlatList,
  StyleSheet,
  KeyboardAvoidingView,
  Platform,
  Alert,
  Modal,
  Image,
  Linking,
  ScrollView,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';
import { collection, addDoc, onSnapshot, query, orderBy, Timestamp, doc, updateDoc, setDoc, where, getDoc } from 'firebase/firestore';
import { firestore, auth } from '../../config/firebase';
import { useUser } from '../../contexts/UserContext';
import { useRouter } from 'expo-router';
import { chatService } from '../../services/chatService';
import PoliticaProteccionDatos from '../../components/PoliticaProteccionDatos';

interface Message {
  id: string;
  text: string;
  user: string;
  timestamp: Date;
  userPhoto?: string;
  userId?: string;
}

interface User {
  id: string;
  name: string;
  online: boolean;
  photo?: string;
}

const db = firestore;

export default function ChatScreen() {
  const [showEmojiPicker, setShowEmojiPicker] = useState(false);
  const [messages, setMessages] = useState<Message[]>([]);
  const [inputText, setInputText] = useState('');
  const [connectedUsers, setConnectedUsers] = useState<User[]>([]);
  const [unreadNotifications, setUnreadNotifications] = useState(0);
  const flatListRef = useRef<FlatList>(null);
  const { profileImage, user: currentUser } = useUser();
  const router = useRouter();
  const [showPolicyModal, setShowPolicyModal] = useState(false);
  const reportIncident = () => {
    Linking.openURL('mailto:admin@academiadeinmigrantes.es?subject=Reporte%20de%20incidente');
  };

  const emojis = [
    '😊', '😂', '❤️', '👍', '👋', '🎉', '😢', '😍', '🤔', '🙌',
    '😀', '😎', '🥳', '😜', '🤗', '😴', '🤤', '😭', '🥺', '😡',
    '👏', '🙏', '💪', '👀', '🤷‍♂️', '🤷‍♀️', '👌', '✌️', '👎', '🤝'
  ];

  // Real-time messages listener
  useEffect(() => {
    const q = query(collection(db, 'messages'), orderBy('timestamp', 'asc'));
    const unsubscribe = onSnapshot(q, (querySnapshot) => {
      const messagesData: Message[] = [];
      querySnapshot.forEach((doc) => {
        const data = doc.data();
        messagesData.push({
          id: doc.id,
          text: data.text,
          user: data.user,
          timestamp: data.timestamp.toDate(),
          userPhoto: data.userPhoto,
          userId: data.userId,
        });
      });
      setMessages(messagesData);
    });

    return unsubscribe;
  }, []);

  // Real-time users listener
  useEffect(() => {
    const q = query(collection(db, 'users'));
    const unsubscribe = onSnapshot(q, (querySnapshot) => {
      const usersData: User[] = [];
      querySnapshot.forEach((doc) => {
        const data = doc.data();
        usersData.push({
          id: doc.id,
          name: data.name || data.email || 'Usuario',
          online: data.online || false,
          photo: data.photoURL || data.photo || null,
        });
      });
      // Add demo users if list is empty
      if (usersData.length === 0) {
        usersData.push(
          { id: 'demo1', name: 'Ana García', online: true },
          { id: 'demo2', name: 'Carlos López', online: true },
          { id: 'demo3', name: 'María Rodríguez', online: false }
        );
      }
      setConnectedUsers(usersData);
    });

    return unsubscribe;
  }, []);

  // Unread notifications counter for private messages
  useEffect(() => {
    const user = auth.currentUser;
    if (!user) return;
    
    const unsubscribe = chatService.subscribeToNotifications(user.uid, (notifications) => {
      const unread = notifications.filter(n => !n.read).length;
      setUnreadNotifications(unread);
    });

    return unsubscribe;
  }, []);

  // Manage presence
  useEffect(() => {
    const user = auth.currentUser;
    if (user) {
      const userRef = doc(db, 'users', user.uid);
      const userData = {
        name: user.displayName || user.email,
        email: user.email,
        online: true,
        lastSeen: Timestamp.now(),
      };

      // Set online on mount
      setDoc(userRef, userData, { merge: true });

      // Set offline on unmount
      return () => {
        updateDoc(userRef, {
          online: false,
          lastSeen: Timestamp.now(),
        });
      };
    }
  }, []);

  const sendMessage = async () => {
    const user = auth.currentUser;
    if (inputText.trim() && user) {
      try {
        await addDoc(collection(db, 'messages'), {
          text: inputText,
          user: user.displayName || user.email || 'Usuario',
          timestamp: Timestamp.now(),
          userPhoto: profileImage,
          userId: user.uid,
        });
        setInputText('');
        flatListRef.current?.scrollToEnd();
      } catch (error) {
        Alert.alert('Error', 'No se pudo enviar el mensaje');
        console.error('Error sending message:', error);
      }
    }
  };

  const insertEmoji = (emoji: string) => {
    setInputText(prev => prev + emoji);
    setShowEmojiPicker(false);
  };

  const toggleEmojiPicker = () => {
    setShowEmojiPicker(!showEmojiPicker);
  };

  const requestPrivateChat = async (targetUserId: string) => {
    const user = auth.currentUser;
    if (!user) {
      return;
    }

    if (targetUserId === user.uid) {
      Alert.alert('Aviso', 'No puedes iniciar un chat privado contigo mismo.');
      return;
    }

    try {
      const targetUser = connectedUsers.find(u => u.id === targetUserId);
      if (!targetUser) {
        Alert.alert('Usuario no disponible', 'No pudimos encontrar a este usuario. Intenta nuevamente.');
        return;
      }

      const sortedIds = [user.uid, targetUserId].sort();
      const chatId = `private_${sortedIds.join('_')}`;
      const chatRef = doc(db, 'privateChats', chatId);
      const chatSnapshot = await getDoc(chatRef);

      if (chatSnapshot.exists()) {
        const chatData = chatSnapshot.data();
        if (chatData.status === 'active') {
          router.push({ pathname: '/(tabs)/PrivateChatsScreen', params: { chatId } });
          return;
        }

        if (chatData.status === 'pending' && chatData.initiatorId === user.uid) {
          Alert.alert('Solicitud pendiente', 'Ya enviaste una solicitud de chat privado. Espera a que el usuario responda.');
          return;
        }
      }

      await setDoc(chatRef, {
        participants: sortedIds,
        participantNames: {
          [user.uid]: user.displayName || user.email || 'Usuario',
          [targetUserId]: targetUser.name,
        },
        status: 'pending',
        initiatorId: user.uid,
        recipientId: targetUserId,
        createdAt: Timestamp.now(),
      }, { merge: true });

      await addDoc(collection(db, 'notifications'), {
        toUserId: targetUserId,
        fromUserId: user.uid,
        fromUserName: user.displayName || user.email,
        type: 'private_chat_request',
        chatId,
        message: `Solicitud de chat privado de ${user.displayName || user.email}`,
        timestamp: Timestamp.now(),
        read: false,
      });

      Alert.alert('Solicitud enviada', `Has enviado una solicitud de chat privado a ${targetUser.name}`);
    } catch (error) {
      Alert.alert('Error', 'No se pudo enviar la solicitud');
      console.error('Error sending notification:', error);
    }
  };

  const renderMessage = ({ item }: { item: Message }) => (
    <View style={[styles.messageContainer, item.userId === currentUser?.id ? styles.myMessage : styles.otherMessage]}>
      <TouchableOpacity
        style={styles.messageHeader}
        onPress={() => item.userId && router.push({ pathname: '/PublicProfileScreen', params: { userId: item.userId, returnTo: '/(tabs)/ChatScreen' } })}
        disabled={!item.userId}
        activeOpacity={0.75}
      >
        {item.userPhoto ? (
          <Image source={{ uri: item.userPhoto }} style={styles.messageAvatar} />
        ) : (
          <View style={styles.messageFallbackAvatar}>
            <Ionicons name="person" size={16} color="#fff" />
          </View>
        )}
        <Text style={styles.userName}>{item.user}</Text>
      </TouchableOpacity>
      <Text style={styles.messageText}>{item.text}</Text>
      <Text style={styles.timestamp}>{item.timestamp.toLocaleTimeString()}</Text>
    </View>
  );

  const renderUser = ({ item }: { item: User }) => (
    <View style={styles.userCard}>
      <TouchableOpacity
        style={styles.userTopRow}
        onPress={() => item.id && router.push({ pathname: '/PublicProfileScreen', params: { userId: item.id, returnTo: '/(tabs)/ChatScreen' } })}
        disabled={!item.id}
        activeOpacity={0.8}
      >
        {item.photo ? (
          <Image source={{ uri: item.photo }} style={styles.userAvatar} />
        ) : (
          <View style={styles.userAvatarPlaceholder}>
            <Ionicons name="person" size={18} color="#fff" />
          </View>
        )}
        <Text style={styles.userNamePrimary} numberOfLines={1}>
          {item.name || 'Usuario'}
        </Text>
      </TouchableOpacity>
      <View style={styles.userBottomRow}>
        <View style={styles.statusBadge}>
          <View style={[styles.onlineIndicator, item.online ? styles.online : styles.offline]} />
          <Text style={styles.userStatusText}>{item.online ? 'En línea' : 'Desconectado'}</Text>
        </View>
        <TouchableOpacity
          style={styles.privateChatButton}
          onPress={() => requestPrivateChat(item.id)}
        >
          <Ionicons name="chatbubble-outline" size={18} color="#007AFF" />
          <Text style={styles.privateChatText}>Chat</Text>
        </TouchableOpacity>
      </View>
    </View>
  );

  return (
    <LinearGradient colors={['#000000', '#000000']} style={styles.container}>
      <KeyboardAvoidingView
        style={styles.keyboardContainer}
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      >
        <View style={styles.header}>
          <Text style={styles.headerTitle}>Chat en Vivo</Text>
          <TouchableOpacity
            style={styles.privateMessagesButton}
            onPress={() => router.push('/(tabs)/PrivateChatsScreen')}
          >
            <Ionicons name="mail" size={24} color="#FFD700" />
            {unreadNotifications > 0 && (
              <View style={styles.badgeContainer}>
                <Text style={styles.badgeText}>
                  {unreadNotifications > 99 ? '99+' : unreadNotifications}
                </Text>
              </View>
            )}
          </TouchableOpacity>
        </View>

        <View style={styles.policyBox}>
          <Text style={styles.policyText}>
            <Text style={styles.policyLink} onPress={() => setShowPolicyModal(true)}>Política y reportes</Text>
          </Text>
        </View>

        <View style={styles.content}>
          <View style={styles.chatContainer}>
            <FlatList
              ref={flatListRef}
              data={messages}
              renderItem={renderMessage}
              keyExtractor={(item) => item.id}
              style={styles.messagesList}
              onContentSizeChange={() => flatListRef.current?.scrollToEnd()}
            />

            <View style={styles.inputContainer}>
              <TextInput
                style={styles.textInput}
                value={inputText}
                onChangeText={setInputText}
                placeholder="Escribe un mensaje..."
                placeholderTextColor="#999"
                multiline
              />
              <TouchableOpacity style={styles.emojiButton} onPress={toggleEmojiPicker}>
                <Ionicons name="happy-outline" size={24} color="#007AFF" />
              </TouchableOpacity>
              <TouchableOpacity style={styles.sendButton} onPress={sendMessage}>
                <Ionicons name="send" size={24} color="#fff" />
              </TouchableOpacity>
            </View>
          </View>

          <View style={styles.usersContainer}>
            <Text style={styles.usersTitle}>Usuarios Conectados</Text>
            <FlatList
              data={connectedUsers}
              renderItem={renderUser}
              keyExtractor={(item) => item.id}
              style={styles.usersList}
            />
          </View>
        </View>

        {/* Emoji Picker Modal */}
        <Modal
          visible={showEmojiPicker}
          transparent={true}
          animationType="slide"
          onRequestClose={() => setShowEmojiPicker(false)}
        >
          <View style={styles.emojiModalOverlay}>
            <View style={styles.emojiModalContent}>
              <Text style={styles.emojiModalTitle}>Elige un emoji</Text>
              <View style={styles.emojiGrid}>
                {emojis.map((emoji, index) => (
                  <TouchableOpacity
                    key={index}
                    style={styles.emojiItem}
                    onPress={() => insertEmoji(emoji)}
                  >
                    <Text style={styles.emojiText}>{emoji}</Text>
                  </TouchableOpacity>
                ))}
              </View>
              <TouchableOpacity
                style={styles.closeEmojiButton}
                onPress={() => setShowEmojiPicker(false)}
              >
                <Text style={styles.closeEmojiText}>Cerrar</Text>
              </TouchableOpacity>
            </View>
          </View>
        </Modal>

        <Modal
          visible={showPolicyModal}
          transparent
          animationType="slide"
          onRequestClose={() => setShowPolicyModal(false)}
        >
          <View style={styles.policyModalOverlay}>
            <View style={styles.policyModalContent}>
              <View style={styles.policyModalHeader}>
                <Text style={styles.policyModalTitle}>Políticas y Reportes</Text>
                <TouchableOpacity onPress={() => setShowPolicyModal(false)}>
                  <Ionicons name="close" size={22} color="#333" />
                </TouchableOpacity>
              </View>
              <ScrollView style={styles.policyModalBody}>
                <Text style={styles.policySectionTitle}>Política y reportes</Text>
                <Text style={styles.policyBodyText}>
                  • No se permite contenido ilegal, violento, sexual, discriminatorio o spam.
                  {'\n'}• Se prohíbe el acoso, suplantación de identidad o difusión de datos personales sin permiso.
                  {'\n'}• La administración puede borrar mensajes o bloquear cuentas ante abusos.
                  {'\n'}• Reporta cualquier incidente para mantener la comunidad segura.
                </Text>

                <TouchableOpacity style={styles.reportButton} onPress={reportIncident}>
                  <Ionicons name="alert-circle" size={18} color="#fff" />
                  <Text style={styles.reportButtonText}>Reportar a admin@academiadeinmigrantes.es</Text>
                </TouchableOpacity>

                <View style={styles.policyDivider} />

                <Text style={styles.policyBodyText}>
                  Para una consulta completa de la Política de Privacidad, visita "Mi Perfil &gt; Politica" dentro de la app o escribe a somos@afaiacademiadeinmigrantes.com.
                </Text>
              </ScrollView>
            </View>
          </View>
        </Modal>
      </KeyboardAvoidingView>
    </LinearGradient>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  keyboardContainer: {
    flex: 1,
  },
  header: {
    paddingTop: 50,
    paddingHorizontal: 20,
    paddingBottom: 20,
    flexDirection: 'row',
    alignItems: 'center',
  },
  backButton: {
    marginRight: 15,
  },
  headerTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#fff',
    flex: 1,
  },
  privateMessagesButton: {
    padding: 8,
    borderRadius: 20,
    backgroundColor: 'rgba(255, 255, 255, 0.1)',
    position: 'relative',
  },
  badgeContainer: {
    position: 'absolute',
    top: -5,
    right: -5,
    backgroundColor: '#FF3B30',
    borderRadius: 10,
    minWidth: 20,
    height: 20,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 4,
  },
  badgeText: {
    color: '#fff',
    fontSize: 11,
    fontWeight: 'bold',
  },
  policyBox: {
    marginHorizontal: 20,
    marginBottom: 10,
    backgroundColor: 'rgba(255, 255, 255, 0.1)',
    borderRadius: 12,
    padding: 12,
  },
  policyText: {
    color: '#f0f0f0',
    fontSize: 13,
    fontWeight: '600',
    textAlign: 'center',
  },
  policyLink: {
    color: '#FFD700',
    fontWeight: '700',
    textDecorationLine: 'underline',
  },
  policyModalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.5)',
    justifyContent: 'center',
    padding: 20,
  },
  policyModalContent: {
    backgroundColor: '#fff',
    borderRadius: 20,
    maxHeight: '85%',
    overflow: 'hidden',
  },
  policyModalHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 20,
    borderBottomWidth: 1,
    borderBottomColor: '#eee',
  },
  policyModalTitle: {
    fontSize: 18,
    fontWeight: '700',
    color: '#333',
  },
  policyModalBody: {
    paddingHorizontal: 20,
    paddingVertical: 15,
  },
  policySectionTitle: {
    fontSize: 16,
    fontWeight: '700',
    color: '#1b1b1b',
    marginBottom: 8,
  },
  policyBodyText: {
    fontSize: 13,
    color: '#444',
    lineHeight: 18,
    marginBottom: 16,
  },
  reportButton: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    backgroundColor: '#d84315',
    paddingVertical: 10,
    paddingHorizontal: 12,
    borderRadius: 10,
    marginBottom: 20,
  },
  reportButtonText: {
    color: '#fff',
    fontWeight: '600',
  },
  policyDivider: {
    height: 1,
    backgroundColor: '#eee',
    marginBottom: 20,
  },
  content: {
    flex: 1,
    flexDirection: 'row',
  },
  chatContainer: {
    flex: 2,
    backgroundColor: 'rgba(255, 255, 255, 0.9)',
    margin: 10,
    borderRadius: 20,
    overflow: 'hidden',
  },
  messagesList: {
    flex: 1,
    padding: 10,
  },
  messageContainer: {
    maxWidth: '80%',
    padding: 10,
    marginVertical: 5,
    borderRadius: 15,
  },
  myMessage: {
    alignSelf: 'flex-end',
    backgroundColor: '#007AFF',
  },
  otherMessage: {
    alignSelf: 'flex-start',
    backgroundColor: '#E5E5EA',
  },
  messageHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 5,
  },
  messageAvatar: {
    width: 24,
    height: 24,
    borderRadius: 12,
    marginRight: 8,
  },
  messageFallbackAvatar: {
    width: 24,
    height: 24,
    borderRadius: 12,
    marginRight: 8,
    backgroundColor: '#555',
    alignItems: 'center',
    justifyContent: 'center',
  },
  userName: {
    fontSize: 12,
    fontWeight: 'bold',
    color: '#666',
    marginBottom: 5,
  },
  messageText: {
    fontSize: 16,
    color: '#333',
  },
  timestamp: {
    fontSize: 10,
    color: '#999',
    alignSelf: 'flex-end',
    marginTop: 5,
  },
  inputContainer: {
    flexDirection: 'row',
    padding: 10,
    borderTopWidth: 1,
    borderTopColor: '#E5E5EA',
    alignItems: 'center',
  },
  textInput: {
    flex: 1,
    borderWidth: 1,
    borderColor: '#E5E5EA',
    borderRadius: 20,
    paddingHorizontal: 15,
    paddingVertical: 10,
    fontSize: 16,
    maxHeight: 100,
  },
  emojiButton: {
    marginLeft: 10,
    padding: 10,
  },
  sendButton: {
    marginLeft: 10,
    backgroundColor: '#007AFF',
    borderRadius: 20,
    padding: 10,
  },
  usersContainer: {
    flex: 1,
    backgroundColor: 'rgba(255, 255, 255, 0.9)',
    margin: 10,
    borderRadius: 20,
    padding: 10,
  },
  usersTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 10,
  },
  usersList: {
    flex: 1,
  },
  userCard: {
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: '#E5E5EA',
  },
  userTopRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
    marginBottom: 8,
  },
  userAvatar: {
    width: 38,
    height: 38,
    borderRadius: 19,
  },
  userAvatarPlaceholder: {
    width: 38,
    height: 38,
    borderRadius: 19,
    backgroundColor: '#1976d2',
    alignItems: 'center',
    justifyContent: 'center',
  },
  userBottomRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    flexWrap: 'wrap',
    gap: 8,
  },
  statusBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    flexShrink: 1,
  },
  userNamePrimary: {
    fontSize: 15,
    fontWeight: '700',
    color: '#1c1c1c',
  },
  userStatusText: {
    fontSize: 12,
    color: '#555',
  },
  privateChatText: {
    marginLeft: 4,
    fontSize: 13,
    fontWeight: '600',
    color: '#007AFF',
  },
  onlineIndicator: {
    width: 10,
    height: 10,
    borderRadius: 5,
    marginRight: 10,
  },
  online: {
    backgroundColor: '#4CD964',
  },
  offline: {
    backgroundColor: '#FF3B30',
  },
  privateChatButton: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 10,
    paddingVertical: 6,
    backgroundColor: '#e6f0ff',
    borderRadius: 20,
    borderWidth: 1,
    borderColor: '#c2ddff',
    flexShrink: 0,
  },
  emojiModalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  emojiModalContent: {
    backgroundColor: '#fff',
    borderRadius: 20,
    padding: 20,
    width: '80%',
    maxHeight: '60%',
  },
  emojiModalTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 10,
  },
  emojiGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'center',
  },
  emojiItem: {
    width: '20%',
    height: 50,
    justifyContent: 'center',
    alignItems: 'center',
    margin: 5,
    borderRadius: 10,
  },
  emojiText: {
    fontSize: 30,
  },
  closeEmojiButton: {
    marginTop: 15,
    backgroundColor: '#007AFF',
    borderRadius: 10,
    padding: 10,
    alignItems: 'center',
  },
  closeEmojiText: {
    color: '#fff',
    fontWeight: 'bold',
  },
});
