import {
  collection,
  doc,
  addDoc,
  updateDoc,
  deleteDoc,
  query,
  where,
  orderBy,
  onSnapshot,
  serverTimestamp,
  getDoc,
  getDocs,
  Timestamp,
  limit,
} from 'firebase/firestore';
import { firestore } from '../config/firebase';

export interface PrivateChat {
  id: string;
  participants: string[];
  participantNames: { [uid: string]: string };
  participantPhotos: { [uid: string]: string };
  status: 'pending' | 'active' | 'rejected';
  initiatorId: string;
  recipientId: string;
  lastMessage?: string;
  lastMessageTime?: Timestamp;
  unreadCount: { [uid: string]: number };
  createdAt: Timestamp;
}

export interface PrivateMessage {
  id: string;
  chatId: string;
  senderId: string;
  senderName: string;
  senderPhoto?: string;
  text: string;
  timestamp: Timestamp;
  read: boolean;
}

export interface ChatNotification {
  id: string;
  toUserId: string;
  fromUserId: string;
  fromUserName: string;
  fromUserPhoto?: string;
  type: 'private_chat_request' | 'new_message' | 'chat_accepted' | 'chat_rejected';
  chatId?: string;
  message?: string;
  read: boolean;
  createdAt: Timestamp;
}

export const chatService = {
  async sendPrivateChatRequest(
    initiatorId: string,
    initiatorName: string,
    initiatorPhoto: string,
    recipientId: string,
    recipientName: string,
    recipientPhoto: string
  ): Promise<string> {
    const existingQuery = query(
      collection(firestore, 'privateChats'),
      where('participants', 'array-contains', initiatorId)
    );
    const existingChats = await getDocs(existingQuery);
    
    for (const chatDoc of existingChats.docs) {
      const chat = chatDoc.data();
      if (chat.participants.includes(recipientId)) {
        if (chat.status === 'active') {
          return chatDoc.id;
        }
        if (chat.status === 'pending') {
          throw new Error('Ya tienes una solicitud pendiente con este usuario');
        }
      }
    }

    const chatRef = await addDoc(collection(firestore, 'privateChats'), {
      participants: [initiatorId, recipientId],
      participantNames: {
        [initiatorId]: initiatorName,
        [recipientId]: recipientName,
      },
      participantPhotos: {
        [initiatorId]: initiatorPhoto || '',
        [recipientId]: recipientPhoto || '',
      },
      status: 'pending',
      initiatorId,
      recipientId,
      unreadCount: { [initiatorId]: 0, [recipientId]: 0 },
      createdAt: serverTimestamp(),
    });

    await addDoc(collection(firestore, 'notifications'), {
      toUserId: recipientId,
      fromUserId: initiatorId,
      fromUserName: initiatorName,
      fromUserPhoto: initiatorPhoto || '',
      type: 'private_chat_request',
      chatId: chatRef.id,
      message: `${initiatorName} quiere chatear contigo`,
      read: false,
      createdAt: serverTimestamp(),
    });

    return chatRef.id;
  },

  async acceptChatRequest(chatId: string, recipientId: string, recipientName: string): Promise<void> {
    const chatRef = doc(firestore, 'privateChats', chatId);
    const chatSnap = await getDoc(chatRef);
    
    if (!chatSnap.exists()) {
      throw new Error('Chat no encontrado');
    }

    const chat = chatSnap.data();
    
    await updateDoc(chatRef, {
      status: 'active',
    });

    await addDoc(collection(firestore, 'notifications'), {
      toUserId: chat.initiatorId,
      fromUserId: recipientId,
      fromUserName: recipientName,
      type: 'chat_accepted',
      chatId,
      message: `${recipientName} aceptó tu solicitud de chat`,
      read: false,
      createdAt: serverTimestamp(),
    });
  },

  async rejectChatRequest(chatId: string, recipientId: string, recipientName: string): Promise<void> {
    const chatRef = doc(firestore, 'privateChats', chatId);
    const chatSnap = await getDoc(chatRef);
    
    if (!chatSnap.exists()) {
      throw new Error('Chat no encontrado');
    }

    const chat = chatSnap.data();
    
    await updateDoc(chatRef, {
      status: 'rejected',
    });

    await addDoc(collection(firestore, 'notifications'), {
      toUserId: chat.initiatorId,
      fromUserId: recipientId,
      fromUserName: recipientName,
      type: 'chat_rejected',
      chatId,
      message: `${recipientName} rechazó tu solicitud de chat`,
      read: false,
      createdAt: serverTimestamp(),
    });
  },

  async sendPrivateMessage(
    chatId: string,
    senderId: string,
    senderName: string,
    senderPhoto: string,
    text: string
  ): Promise<void> {
    const chatRef = doc(firestore, 'privateChats', chatId);
    const chatSnap = await getDoc(chatRef);
    
    if (!chatSnap.exists()) {
      throw new Error('Chat no encontrado');
    }

    const chat = chatSnap.data();
    const recipientId = chat.participants.find((p: string) => p !== senderId);

    await addDoc(collection(firestore, 'privateMessages'), {
      chatId,
      senderId,
      senderName,
      senderPhoto: senderPhoto || '',
      text,
      timestamp: serverTimestamp(),
      read: false,
    });

    const currentUnread = chat.unreadCount?.[recipientId] || 0;
    await updateDoc(chatRef, {
      lastMessage: text,
      lastMessageTime: serverTimestamp(),
      [`unreadCount.${recipientId}`]: currentUnread + 1,
    });

    await addDoc(collection(firestore, 'notifications'), {
      toUserId: recipientId,
      fromUserId: senderId,
      fromUserName: senderName,
      fromUserPhoto: senderPhoto || '',
      type: 'new_message',
      chatId,
      message: text.length > 50 ? text.substring(0, 50) + '...' : text,
      read: false,
      createdAt: serverTimestamp(),
    });
  },

  async markChatAsRead(chatId: string, userId: string): Promise<void> {
    const chatRef = doc(firestore, 'privateChats', chatId);
    await updateDoc(chatRef, {
      [`unreadCount.${userId}`]: 0,
    });

    const messagesQuery = query(
      collection(firestore, 'privateMessages'),
      where('chatId', '==', chatId),
      where('senderId', '!=', userId),
      where('read', '==', false)
    );
    const messages = await getDocs(messagesQuery);
    
    for (const msgDoc of messages.docs) {
      await updateDoc(doc(firestore, 'privateMessages', msgDoc.id), {
        read: true,
      });
    }
  },

  subscribeToPrivateChats(
    userId: string,
    callback: (chats: PrivateChat[]) => void
  ): () => void {
    const q = query(
      collection(firestore, 'privateChats'),
      where('participants', 'array-contains', userId),
      orderBy('lastMessageTime', 'desc')
    );

    return onSnapshot(q, (snapshot) => {
      const chats: PrivateChat[] = snapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      })) as PrivateChat[];
      callback(chats);
    });
  },

  subscribeToPrivateMessages(
    chatId: string,
    callback: (messages: PrivateMessage[]) => void
  ): () => void {
    const q = query(
      collection(firestore, 'privateMessages'),
      where('chatId', '==', chatId),
      orderBy('timestamp', 'asc')
    );

    return onSnapshot(q, (snapshot) => {
      const messages: PrivateMessage[] = snapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      })) as PrivateMessage[];
      callback(messages);
    });
  },

  subscribeToNotifications(
    userId: string,
    callback: (notifications: ChatNotification[]) => void
  ): () => void {
    const q = query(
      collection(firestore, 'notifications'),
      where('toUserId', '==', userId),
      orderBy('createdAt', 'desc'),
      limit(50)
    );

    return onSnapshot(q, (snapshot) => {
      const notifications: ChatNotification[] = snapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      })) as ChatNotification[];
      callback(notifications);
    });
  },

  async markNotificationAsRead(notificationId: string): Promise<void> {
    await updateDoc(doc(firestore, 'notifications', notificationId), {
      read: true,
    });
  },

  async markAllNotificationsAsRead(userId: string): Promise<void> {
    const q = query(
      collection(firestore, 'notifications'),
      where('toUserId', '==', userId),
      where('read', '==', false)
    );
    const notifications = await getDocs(q);
    
    for (const notifDoc of notifications.docs) {
      await updateDoc(doc(firestore, 'notifications', notifDoc.id), {
        read: true,
      });
    }
  },

  async deleteNotification(notificationId: string): Promise<void> {
    await deleteDoc(doc(firestore, 'notifications', notificationId));
  },

  async getUnreadNotificationCount(userId: string): Promise<number> {
    const q = query(
      collection(firestore, 'notifications'),
      where('toUserId', '==', userId),
      where('read', '==', false)
    );
    const snapshot = await getDocs(q);
    return snapshot.size;
  },
};

export default chatService;
