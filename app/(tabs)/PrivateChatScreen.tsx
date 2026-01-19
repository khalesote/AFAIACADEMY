import React, { useEffect, useMemo, useRef, useState, useCallback } from 'react';
import {
  ActivityIndicator,
  FlatList,
  KeyboardAvoidingView,
  Platform,
  StyleSheet,
  Text,
  TextInput,
  View,
  TouchableOpacity,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useLocalSearchParams } from 'expo-router';
import {
  addDoc,
  collection,
  doc,
  onSnapshot,
  orderBy,
  query,
  Timestamp,
  updateDoc,
  DocumentData,
  getDoc,
} from 'firebase/firestore';
import { firestore, auth } from '../../config/firebase';
import { useUser } from '../../contexts/UserContext';

interface PrivateChat {
  id: string;
  participants: string[];
  participantNames?: Record<string, string>;
  status?: 'pending' | 'active' | 'declined';
  initiatorId?: string;
  recipientId?: string;
  lastActivity?: Timestamp;
}

interface PrivateMessage {
  id: string;
  text: string;
  senderId: string;
  senderName: string;
  createdAt: Timestamp;
}

export default function PrivateChatScreen() {
  const { chatId } = useLocalSearchParams<{ chatId?: string }>();
  const { user } = useUser();
  const [chat, setChat] = useState<PrivateChat | null>(null);
  const [messages, setMessages] = useState<PrivateMessage[]>([]);
  const [inputValue, setInputValue] = useState('');
  const [loadingChat, setLoadingChat] = useState(true);
  const [sending, setSending] = useState(false);
  const flatListRef = useRef<FlatList<PrivateMessage>>(null);

  const currentUserId = user?.id || auth.currentUser?.uid;

  const otherParticipantName = useMemo(() => {
    if (!chat || !currentUserId) return 'Chat privado';
    const names = chat.participantNames || {};
    const otherId = chat.participants.find((id) => id !== currentUserId);
    return otherId ? names[otherId] || 'Participante' : 'Chat privado';
  }, [chat, currentUserId]);

  const chatStatusLabel = useMemo(() => {
    if (!chat?.status) return null;
    switch (chat.status) {
      case 'pending':
        return 'Esperando confirmación';
      case 'declined':
        return 'Solicitud rechazada';
      default:
        return null;
    }
  }, [chat]);

  useEffect(() => {
    if (!chatId || !firestore) {
      setLoadingChat(false);
      return;
    }

    const chatRef = doc(firestore, 'privateChats', chatId);
    const unsubscribe = onSnapshot(chatRef, (snapshot) => {
      if (snapshot.exists()) {
        setChat({ id: snapshot.id, ...(snapshot.data() as DocumentData) } as PrivateChat);
      } else {
        setChat(null);
      }
      setLoadingChat(false);
    });

    return unsubscribe;
  }, [chatId]);

  useEffect(() => {
    if (!chatId || !firestore) {
      return;
    }

    const messagesRef = collection(firestore, 'privateChats', chatId, 'messages');
    const q = query(messagesRef, orderBy('createdAt', 'asc'));
    const unsubscribe = onSnapshot(q, (snapshot) => {
      const items: PrivateMessage[] = snapshot.docs.map((docSnapshot) => {
        const { id: _ignoredId, ...rest } = docSnapshot.data();
        return {
          id: docSnapshot.id,
          ...(rest as Omit<PrivateMessage, 'id'>),
        };
      });
      setMessages(items);
      // Scroll to bottom whenever new messages arrive
      requestAnimationFrame(() => flatListRef.current?.scrollToEnd({ animated: true }));
    });

    return unsubscribe;
  }, [chatId]);

  const sendMessage = useCallback(async () => {
    if (!chatId || !firestore || !currentUserId) {
      return;
    }
    const trimmed = inputValue.trim();
    if (!trimmed) {
      return;
    }

    try {
      setSending(true);
      const messagesRef = collection(firestore, 'privateChats', chatId, 'messages');
      const senderName = user?.name || user?.email || auth.currentUser?.displayName || 'Usuario';
      await addDoc(messagesRef, {
        text: trimmed,
        senderId: currentUserId,
        senderName,
        createdAt: Timestamp.now(),
      });

      // Update chat metadata
      const chatRef = doc(firestore, 'privateChats', chatId);
      await updateDoc(chatRef, {
        lastActivity: Timestamp.now(),
        lastMessage: trimmed,
        lastMessageSenderId: currentUserId,
      });

      setInputValue('');
    } catch (error) {
      console.error('Error sending private message:', error);
    } finally {
      setSending(false);
    }
  }, [chatId, currentUserId, inputValue, user]);

  const renderMessage = ({ item }: { item: PrivateMessage }) => {
    const isMine = item.senderId === currentUserId;
    return (
      <View style={[styles.messageBubble, isMine ? styles.myMessage : styles.otherMessage]}>
        {!isMine && <Text style={styles.senderName}>{item.senderName}</Text>}
        <Text style={styles.messageText}>{item.text}</Text>
        <Text style={styles.messageTimestamp}>
          {item.createdAt?.toDate?.().toLocaleTimeString('es-ES', { hour: '2-digit', minute: '2-digit' })}
        </Text>
      </View>
    );
  };

  if (loadingChat) {
    return (
      <View style={styles.centerContainer}>
        <ActivityIndicator size="large" color="#FFD700" />
        <Text style={styles.centerText}>Cargando chat privado...</Text>
      </View>
    );
  }

  if (!chatId || !chat) {
    return (
      <View style={styles.centerContainer}>
        <Ionicons name="chatbubble-ellipses-outline" size={48} color="#999" />
        <Text style={styles.centerText}>No se encontró el chat privado.</Text>
      </View>
    );
  }

  return (
    <KeyboardAvoidingView
      style={styles.container}
      behavior={Platform.OS === 'ios' ? 'padding' : undefined}
      keyboardVerticalOffset={90}
    >
      <View style={styles.header}>
        <View>
          <Text style={styles.title}>{otherParticipantName}</Text>
          {chatStatusLabel && <Text style={styles.statusText}>{chatStatusLabel}</Text>}
        </View>
      </View>

      <FlatList
        ref={flatListRef}
        data={messages}
        keyExtractor={(item) => item.id}
        renderItem={renderMessage}
        contentContainerStyle={styles.messagesList}
      />

      <View style={styles.inputContainer}>
        <TextInput
          style={styles.textInput}
          placeholder="Escribe tu mensaje..."
          placeholderTextColor="#999"
          multiline
          value={inputValue}
          onChangeText={setInputValue}
        />
        <TouchableOpacity style={styles.sendButton} onPress={sendMessage} disabled={sending}>
          {sending ? (
            <ActivityIndicator color="#fff" size="small" />
          ) : (
            <Ionicons name="send" size={20} color="#fff" />
          )}
        </TouchableOpacity>
      </View>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#0f0f0f',
    paddingHorizontal: 16,
    paddingBottom: 12,
  },
  header: {
    paddingTop: 50,
    paddingBottom: 16,
  },
  title: {
    fontSize: 22,
    fontWeight: '700',
    color: '#fff',
  },
  statusText: {
    marginTop: 4,
    color: '#ffcc00',
    fontSize: 14,
  },
  messagesList: {
    flexGrow: 1,
    paddingBottom: 16,
  },
  messageBubble: {
    marginBottom: 12,
    padding: 12,
    borderRadius: 12,
    maxWidth: '80%',
  },
  myMessage: {
    alignSelf: 'flex-end',
    backgroundColor: '#2979ff',
  },
  otherMessage: {
    alignSelf: 'flex-start',
    backgroundColor: '#1f1f1f',
  },
  senderName: {
    fontSize: 12,
    color: '#ffeb3b',
    marginBottom: 4,
  },
  messageText: {
    color: '#fff',
    fontSize: 16,
  },
  messageTimestamp: {
    marginTop: 6,
    fontSize: 10,
    color: '#cfd8dc',
    alignSelf: 'flex-end',
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#1a1a1a',
    borderRadius: 24,
    paddingHorizontal: 12,
    paddingVertical: 6,
    marginTop: 8,
  },
  textInput: {
    flex: 1,
    color: '#fff',
    minHeight: 40,
    maxHeight: 100,
  },
  sendButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: '#ffab00',
    alignItems: 'center',
    justifyContent: 'center',
    marginLeft: 8,
  },
  centerContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#0f0f0f',
    padding: 24,
  },
  centerText: {
    marginTop: 12,
    color: '#ccc',
    textAlign: 'center',
  },
});
