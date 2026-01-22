import React, { useState, useEffect, useRef } from 'react';
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  TouchableOpacity,
  TextInput,
  Image,
  KeyboardAvoidingView,
  Platform,
  ActivityIndicator,
  Alert,
} from 'react-native';
import { useRouter, useLocalSearchParams } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';
import { useUser } from '../../contexts/UserContext';
import chatService, { PrivateChat, PrivateMessage, ChatNotification } from '../../services/chatService';

type TabType = 'chats' | 'requests' | 'notifications';

export default function PrivateChatsScreen() {
  const router = useRouter();
  const { chatId } = useLocalSearchParams<{ chatId?: string }>();
  const { firebaseUser, user } = useUser();
  const [activeTab, setActiveTab] = useState<TabType>('chats');
  const [chats, setChats] = useState<PrivateChat[]>([]);
  const [notifications, setNotifications] = useState<ChatNotification[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedChat, setSelectedChat] = useState<PrivateChat | null>(null);
  const [messages, setMessages] = useState<PrivateMessage[]>([]);
  const [newMessage, setNewMessage] = useState('');
  const [sendingMessage, setSendingMessage] = useState(false);
  const flatListRef = useRef<FlatList>(null);

  const userId = firebaseUser?.uid || '';
  const userName = user?.firstName || user?.name || firebaseUser?.displayName || 'Usuario';
  const userPhoto = firebaseUser?.photoURL || '';

  useEffect(() => {
    if (!userId) return;

    const unsubChats = chatService.subscribeToPrivateChats(
      userId,
      (updatedChats) => {
        setChats(updatedChats);
        setLoading(false);
      },
      (error) => {
        setLoading(false);
        Alert.alert('Error', 'No se pudieron cargar los chats privados.');
        console.error('Error en chats privados:', error);
      }
    );

    const unsubNotifs = chatService.subscribeToNotifications(
      userId,
      (updatedNotifs) => {
        setNotifications(updatedNotifs);
      },
      (error) => {
        console.error('Error en notificaciones de chat:', error);
      }
    );

    return () => {
      unsubChats();
      unsubNotifs();
    };
  }, [userId]);

  useEffect(() => {
    if (!selectedChat) return;

    const unsubMessages = chatService.subscribeToPrivateMessages(selectedChat.id, (updatedMessages) => {
      setMessages(updatedMessages);
      setTimeout(() => flatListRef.current?.scrollToEnd(), 100);
    });

    chatService.markChatAsRead(selectedChat.id, userId);

    return () => unsubMessages();
  }, [selectedChat, userId]);

  useEffect(() => {
    if (!chatId) return;
    const chat = chats.find((c) => c.id === chatId);
    if (!chat) return;

    if (chat.status === 'active') {
      setSelectedChat(chat);
      setActiveTab('chats');
    } else if (chat.status === 'pending') {
      setActiveTab(chat.recipientId === userId ? 'requests' : 'chats');
    }
  }, [chatId, chats, userId]);

  const activeChats = chats.filter((c) => c.status === 'active');
  const pendingRequests = chats.filter((c) => c.status === 'pending' && c.recipientId === userId);
  const sentRequests = chats.filter((c) => c.status === 'pending' && c.initiatorId === userId);
  const unreadNotifications = notifications.filter((n) => !n.read);

  const handleAcceptRequest = async (chat: PrivateChat) => {
    try {
      await chatService.acceptChatRequest(chat.id, userId, userName);
      Alert.alert('Chat aceptado', 'Ahora puedes chatear con este usuario');
    } catch (error: any) {
      Alert.alert('Error', error.message);
    }
  };

  const handleRejectRequest = async (chat: PrivateChat) => {
    try {
      await chatService.rejectChatRequest(chat.id, userId, userName);
      Alert.alert('Solicitud rechazada');
    } catch (error: any) {
      Alert.alert('Error', error.message);
    }
  };

  const handleSendMessage = async () => {
    if (!newMessage.trim() || !selectedChat || sendingMessage) return;

    setSendingMessage(true);
    try {
      await chatService.sendPrivateMessage(
        selectedChat.id,
        userId,
        userName,
        userPhoto,
        newMessage.trim()
      );
      setNewMessage('');
    } catch (error: any) {
      Alert.alert('Error', error.message);
    } finally {
      setSendingMessage(false);
    }
  };

  const handleNotificationPress = async (notif: ChatNotification) => {
    await chatService.markNotificationAsRead(notif.id);
    
    if (notif.chatId) {
      const chat = chats.find((c) => c.id === notif.chatId);
      if (chat && chat.status === 'active') {
        setSelectedChat(chat);
      } else if (notif.type === 'private_chat_request') {
        setActiveTab('requests');
      }
    }
  };

  const getOtherParticipant = (chat: PrivateChat) => {
    const otherId = chat.participants.find((p) => p !== userId) || '';
    return {
      id: otherId,
      name: chat.participantNames?.[otherId] || 'Usuario',
      photo: chat.participantPhotos?.[otherId] || '',
    };
  };

  const formatTime = (timestamp: any) => {
    if (!timestamp) return '';
    const date = timestamp.toDate ? timestamp.toDate() : new Date(timestamp);
    const now = new Date();
    const diff = now.getTime() - date.getTime();
    
    if (diff < 60000) return 'Ahora';
    if (diff < 3600000) return `${Math.floor(diff / 60000)}m`;
    if (diff < 86400000) return `${Math.floor(diff / 3600000)}h`;
    return date.toLocaleDateString('es-ES', { day: '2-digit', month: '2-digit' });
  };

  if (selectedChat) {
    const other = getOtherParticipant(selectedChat);
    
    return (
      <KeyboardAvoidingView
        style={styles.container}
        behavior={Platform.OS === 'ios' ? 'padding' : undefined}
        keyboardVerticalOffset={90}
      >
        <View style={styles.chatHeader}>
          <TouchableOpacity onPress={() => setSelectedChat(null)} style={styles.backButton}>
            <Ionicons name="arrow-back" size={24} color="#fff" />
          </TouchableOpacity>
          {other.photo ? (
            <Image source={{ uri: other.photo }} style={styles.chatHeaderAvatar} />
          ) : (
            <View style={styles.chatHeaderAvatarPlaceholder}>
              <Text style={styles.avatarText}>{other.name.charAt(0).toUpperCase()}</Text>
            </View>
          )}
          <View style={styles.chatHeaderInfo}>
            <Text style={styles.chatHeaderName}>{other.name}</Text>
            <Text style={styles.chatHeaderStatus}>En línea</Text>
          </View>
        </View>

        <FlatList
          ref={flatListRef}
          data={messages}
          keyExtractor={(item) => item.id}
          style={styles.messagesList}
          contentContainerStyle={styles.messagesContent}
          onContentSizeChange={() => flatListRef.current?.scrollToEnd()}
          renderItem={({ item }) => {
            const isMe = item.senderId === userId;
            return (
              <View style={[styles.messageBubble, isMe ? styles.myMessage : styles.otherMessage]}>
                <Text style={[styles.messageText, isMe && styles.myMessageText]}>{item.text}</Text>
                <View style={styles.messageFooter}>
                  <Text style={[styles.messageTime, isMe && styles.myMessageTime]}>
                    {formatTime(item.timestamp)}
                  </Text>
                  {isMe && (
                    <Ionicons
                      name={item.read ? 'checkmark-done' : 'checkmark'}
                      size={14}
                      color={item.read ? '#4FC3F7' : '#ffffff80'}
                      style={styles.readIcon}
                    />
                  )}
                </View>
              </View>
            );
          }}
          ListEmptyComponent={
            <View style={styles.emptyMessages}>
              <Ionicons name="chatbubbles-outline" size={60} color="#ccc" />
              <Text style={styles.emptyText}>No hay mensajes aún</Text>
              <Text style={styles.emptySubtext}>¡Envía el primer mensaje!</Text>
            </View>
          }
        />

        <View style={styles.inputContainer}>
          <TextInput
            style={styles.messageInput}
            placeholder="Escribe un mensaje..."
            placeholderTextColor="#999"
            value={newMessage}
            onChangeText={setNewMessage}
            multiline
            maxLength={1000}
          />
          <TouchableOpacity
            style={[styles.sendButton, !newMessage.trim() && styles.sendButtonDisabled]}
            onPress={handleSendMessage}
            disabled={!newMessage.trim() || sendingMessage}
          >
            {sendingMessage ? (
              <ActivityIndicator size="small" color="#fff" />
            ) : (
              <Ionicons name="send" size={20} color="#fff" />
            )}
          </TouchableOpacity>
        </View>
      </KeyboardAvoidingView>
    );
  }

  return (
    <View style={styles.container}>
      <LinearGradient colors={['#1a1a1a', '#2d2d2d']} style={styles.header}>
        <TouchableOpacity onPress={() => router.back()} style={styles.backButton}>
          <Ionicons name="arrow-back" size={24} color="#FFD700" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Mensajes Privados</Text>
        <View style={styles.headerRight} />
      </LinearGradient>

      <View style={styles.tabs}>
        <TouchableOpacity
          style={[styles.tab, activeTab === 'chats' && styles.activeTab]}
          onPress={() => setActiveTab('chats')}
        >
          <Text style={[styles.tabText, activeTab === 'chats' && styles.activeTabText]}>
            Chats ({activeChats.length})
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[styles.tab, activeTab === 'requests' && styles.activeTab]}
          onPress={() => setActiveTab('requests')}
        >
          <Text style={[styles.tabText, activeTab === 'requests' && styles.activeTabText]}>
            Solicitudes ({pendingRequests.length})
          </Text>
          {pendingRequests.length > 0 && <View style={styles.badge} />}
        </TouchableOpacity>
        <TouchableOpacity
          style={[styles.tab, activeTab === 'notifications' && styles.activeTab]}
          onPress={() => setActiveTab('notifications')}
        >
          <Text style={[styles.tabText, activeTab === 'notifications' && styles.activeTabText]}>
            Avisos ({unreadNotifications.length})
          </Text>
          {unreadNotifications.length > 0 && <View style={styles.badge} />}
        </TouchableOpacity>
      </View>

      {loading ? (
        <View style={styles.loadingContainer}>
          <ActivityIndicator size="large" color="#FFD700" />
        </View>
      ) : activeTab === 'chats' ? (
        <FlatList
          data={activeChats}
          keyExtractor={(item) => item.id}
          contentContainerStyle={styles.listContent}
          renderItem={({ item }) => {
            const other = getOtherParticipant(item);
            const unread = item.unreadCount?.[userId] || 0;
            return (
              <TouchableOpacity style={styles.chatItem} onPress={() => setSelectedChat(item)}>
                {other.photo ? (
                  <Image source={{ uri: other.photo }} style={styles.avatar} />
                ) : (
                  <View style={styles.avatarPlaceholder}>
                    <Text style={styles.avatarText}>{other.name.charAt(0).toUpperCase()}</Text>
                  </View>
                )}
                <View style={styles.chatInfo}>
                  <Text style={styles.chatName}>{other.name}</Text>
                  <Text style={styles.lastMessage} numberOfLines={1}>
                    {item.lastMessage || 'Sin mensajes'}
                  </Text>
                </View>
                <View style={styles.chatMeta}>
                  <Text style={styles.chatTime}>{formatTime(item.lastMessageTime)}</Text>
                  {unread > 0 && (
                    <View style={styles.unreadBadge}>
                      <Text style={styles.unreadText}>{unread}</Text>
                    </View>
                  )}
                </View>
              </TouchableOpacity>
            );
          }}
          ListEmptyComponent={
            <View style={styles.emptyContainer}>
              <Ionicons name="chatbubbles-outline" size={60} color="#666" />
              <Text style={styles.emptyTitle}>No tienes chats activos</Text>
              <Text style={styles.emptySubtitle}>Ve al chat global para iniciar conversaciones</Text>
            </View>
          }
        />
      ) : activeTab === 'requests' ? (
        <FlatList
          data={pendingRequests}
          keyExtractor={(item) => item.id}
          contentContainerStyle={styles.listContent}
          renderItem={({ item }) => {
            const other = getOtherParticipant(item);
            return (
              <View style={styles.requestItem}>
                {other.photo ? (
                  <Image source={{ uri: other.photo }} style={styles.avatar} />
                ) : (
                  <View style={styles.avatarPlaceholder}>
                    <Text style={styles.avatarText}>{other.name.charAt(0).toUpperCase()}</Text>
                  </View>
                )}
                <View style={styles.requestInfo}>
                  <Text style={styles.chatName}>{other.name}</Text>
                  <Text style={styles.requestText}>Quiere chatear contigo</Text>
                </View>
                <View style={styles.requestActions}>
                  <TouchableOpacity
                    style={styles.acceptButton}
                    onPress={() => handleAcceptRequest(item)}
                  >
                    <Ionicons name="checkmark" size={20} color="#fff" />
                  </TouchableOpacity>
                  <TouchableOpacity
                    style={styles.rejectButton}
                    onPress={() => handleRejectRequest(item)}
                  >
                    <Ionicons name="close" size={20} color="#fff" />
                  </TouchableOpacity>
                </View>
              </View>
            );
          }}
          ListEmptyComponent={
            <View style={styles.emptyContainer}>
              <Ionicons name="mail-outline" size={60} color="#666" />
              <Text style={styles.emptyTitle}>No tienes solicitudes</Text>
            </View>
          }
        />
      ) : (
        <FlatList
          data={notifications}
          keyExtractor={(item) => item.id}
          contentContainerStyle={styles.listContent}
          renderItem={({ item }) => (
            <TouchableOpacity
              style={[styles.notifItem, !item.read && styles.unreadNotif]}
              onPress={() => handleNotificationPress(item)}
            >
              {item.fromUserPhoto ? (
                <Image source={{ uri: item.fromUserPhoto }} style={styles.notifAvatar} />
              ) : (
                <View style={styles.notifAvatarPlaceholder}>
                  <Ionicons
                    name={
                      item.type === 'private_chat_request'
                        ? 'person-add'
                        : item.type === 'new_message'
                        ? 'chatbubble'
                        : item.type === 'chat_accepted'
                        ? 'checkmark-circle'
                        : 'close-circle'
                    }
                    size={20}
                    color="#FFD700"
                  />
                </View>
              )}
              <View style={styles.notifContent}>
                <Text style={styles.notifText}>{item.message}</Text>
                <Text style={styles.notifTime}>{formatTime(item.createdAt)}</Text>
              </View>
              {!item.read && <View style={styles.notifDot} />}
            </TouchableOpacity>
          )}
          ListEmptyComponent={
            <View style={styles.emptyContainer}>
              <Ionicons name="notifications-outline" size={60} color="#666" />
              <Text style={styles.emptyTitle}>No tienes notificaciones</Text>
            </View>
          }
        />
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingTop: 50,
    paddingBottom: 15,
    paddingHorizontal: 16,
  },
  backButton: {
    padding: 8,
  },
  headerTitle: {
    fontSize: 18,
    fontWeight: '700',
    color: '#FFD700',
  },
  headerRight: {
    width: 40,
  },
  tabs: {
    flexDirection: 'row',
    backgroundColor: '#fff',
    borderBottomWidth: 1,
    borderBottomColor: '#e0e0e0',
  },
  tab: {
    flex: 1,
    paddingVertical: 14,
    alignItems: 'center',
    flexDirection: 'row',
    justifyContent: 'center',
  },
  activeTab: {
    borderBottomWidth: 2,
    borderBottomColor: '#FFD700',
  },
  tabText: {
    fontSize: 13,
    color: '#666',
    fontWeight: '500',
  },
  activeTabText: {
    color: '#1a1a1a',
    fontWeight: '700',
  },
  badge: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: '#FF3B30',
    marginLeft: 6,
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  listContent: {
    padding: 12,
    flexGrow: 1,
  },
  chatItem: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#fff',
    padding: 14,
    borderRadius: 12,
    marginBottom: 10,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 3,
    elevation: 2,
  },
  avatar: {
    width: 50,
    height: 50,
    borderRadius: 25,
  },
  avatarPlaceholder: {
    width: 50,
    height: 50,
    borderRadius: 25,
    backgroundColor: '#FFD700',
    justifyContent: 'center',
    alignItems: 'center',
  },
  avatarText: {
    fontSize: 20,
    fontWeight: '700',
    color: '#1a1a1a',
  },
  chatInfo: {
    flex: 1,
    marginLeft: 12,
  },
  chatName: {
    fontSize: 16,
    fontWeight: '600',
    color: '#1a1a1a',
  },
  lastMessage: {
    fontSize: 14,
    color: '#666',
    marginTop: 4,
  },
  chatMeta: {
    alignItems: 'flex-end',
  },
  chatTime: {
    fontSize: 12,
    color: '#999',
  },
  unreadBadge: {
    backgroundColor: '#FFD700',
    borderRadius: 10,
    minWidth: 20,
    height: 20,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 6,
    paddingHorizontal: 6,
  },
  unreadText: {
    fontSize: 11,
    fontWeight: '700',
    color: '#1a1a1a',
  },
  requestItem: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#fff',
    padding: 14,
    borderRadius: 12,
    marginBottom: 10,
  },
  requestInfo: {
    flex: 1,
    marginLeft: 12,
  },
  requestText: {
    fontSize: 14,
    color: '#666',
    marginTop: 2,
  },
  requestActions: {
    flexDirection: 'row',
    gap: 10,
  },
  acceptButton: {
    backgroundColor: '#4CAF50',
    width: 40,
    height: 40,
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
  },
  rejectButton: {
    backgroundColor: '#FF3B30',
    width: 40,
    height: 40,
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
  },
  notifItem: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#fff',
    padding: 14,
    borderRadius: 12,
    marginBottom: 10,
  },
  unreadNotif: {
    backgroundColor: '#FFF8E1',
  },
  notifAvatar: {
    width: 40,
    height: 40,
    borderRadius: 20,
  },
  notifAvatarPlaceholder: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: '#1a1a1a',
    justifyContent: 'center',
    alignItems: 'center',
  },
  notifContent: {
    flex: 1,
    marginLeft: 12,
  },
  notifText: {
    fontSize: 14,
    color: '#1a1a1a',
  },
  notifTime: {
    fontSize: 12,
    color: '#999',
    marginTop: 4,
  },
  notifDot: {
    width: 10,
    height: 10,
    borderRadius: 5,
    backgroundColor: '#FFD700',
  },
  emptyContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingTop: 60,
  },
  emptyTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#666',
    marginTop: 16,
  },
  emptySubtitle: {
    fontSize: 14,
    color: '#999',
    marginTop: 8,
  },
  chatHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#1a1a1a',
    paddingTop: 50,
    paddingBottom: 15,
    paddingHorizontal: 12,
  },
  chatHeaderAvatar: {
    width: 40,
    height: 40,
    borderRadius: 20,
    marginLeft: 8,
  },
  chatHeaderAvatarPlaceholder: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: '#FFD700',
    justifyContent: 'center',
    alignItems: 'center',
    marginLeft: 8,
  },
  chatHeaderInfo: {
    marginLeft: 12,
  },
  chatHeaderName: {
    fontSize: 16,
    fontWeight: '700',
    color: '#fff',
  },
  chatHeaderStatus: {
    fontSize: 12,
    color: '#4CAF50',
  },
  messagesList: {
    flex: 1,
    backgroundColor: '#f0f0f0',
  },
  messagesContent: {
    padding: 12,
    flexGrow: 1,
  },
  messageBubble: {
    maxWidth: '80%',
    padding: 12,
    borderRadius: 16,
    marginBottom: 8,
  },
  myMessage: {
    alignSelf: 'flex-end',
    backgroundColor: '#1a1a1a',
    borderBottomRightRadius: 4,
  },
  otherMessage: {
    alignSelf: 'flex-start',
    backgroundColor: '#fff',
    borderBottomLeftRadius: 4,
  },
  messageText: {
    fontSize: 15,
    color: '#1a1a1a',
    lineHeight: 20,
  },
  myMessageText: {
    color: '#fff',
  },
  messageFooter: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'flex-end',
    marginTop: 4,
  },
  messageTime: {
    fontSize: 11,
    color: '#999',
  },
  myMessageTime: {
    color: '#ffffff80',
  },
  readIcon: {
    marginLeft: 4,
  },
  emptyMessages: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingTop: 100,
  },
  emptyText: {
    fontSize: 18,
    fontWeight: '600',
    color: '#999',
    marginTop: 16,
  },
  emptySubtext: {
    fontSize: 14,
    color: '#bbb',
    marginTop: 8,
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'flex-end',
    padding: 12,
    backgroundColor: '#fff',
    borderTopWidth: 1,
    borderTopColor: '#e0e0e0',
  },
  messageInput: {
    flex: 1,
    backgroundColor: '#f5f5f5',
    borderRadius: 20,
    paddingHorizontal: 16,
    paddingVertical: 10,
    fontSize: 15,
    maxHeight: 100,
    marginRight: 10,
  },
  sendButton: {
    backgroundColor: '#FFD700',
    width: 44,
    height: 44,
    borderRadius: 22,
    justifyContent: 'center',
    alignItems: 'center',
  },
  sendButtonDisabled: {
    backgroundColor: '#ccc',
  },
});
