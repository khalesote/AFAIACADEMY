import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  TouchableOpacity,
  ActivityIndicator,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { collection, query, onSnapshot, Timestamp, where, updateDoc, doc } from 'firebase/firestore';
import { firestore } from '../../config/firebase';
import { useUser } from '../../contexts/UserContext';

interface Notification {
  id: string;
  title: string;
  message: string;
  sentBy: string;
  sentByEmail: string;
  createdAt?: Timestamp | null;
}

export default function NotificationsScreen() {
  const [notifications, setNotifications] = useState<Notification[]>([]);
  const [loading, setLoading] = useState(true);
  const { user } = useUser();

  useEffect(() => {
    if (!firestore || !user) {
      console.error('Firestore not available');
      setLoading(false);
      return;
    }

    const notificationsQuery = query(
      collection(firestore, 'notifications'),
      where('toUserId', '==', user.id)
    );

    const unsubscribe = onSnapshot(notificationsQuery, (querySnapshot) => {
      const notificationsData: Notification[] = [];
      querySnapshot.forEach((doc) => {
        notificationsData.push({ id: doc.id, ...doc.data() } as Notification);
      });
      notificationsData.sort((a, b) => {
        const aTime = a.createdAt?.toMillis?.() ?? 0;
        const bTime = b.createdAt?.toMillis?.() ?? 0;
        return bTime - aTime;
      });
      setNotifications(notificationsData);
      setLoading(false);

      // Mark unread notifications as read now that the user has viewed the list
      const unread = notificationsData.filter((n: any) => n.read === false);
      unread.forEach((notification) => {
        const notificationRef = doc(firestore, 'notifications', notification.id);
        updateDoc(notificationRef, { read: true }).catch((err) =>
          console.error('Failed to mark notification as read:', err)
        );
      });
    }, (error) => {
      console.error('Error loading notifications:', error);
      setLoading(false);
    });

    return unsubscribe;
  }, [user]);

  const formatDate = (timestamp?: Timestamp | null) => {
    if (!timestamp || typeof timestamp.toDate !== 'function') {
      return 'Fecha no disponible';
    }
    const date = timestamp.toDate();
    return date.toLocaleDateString('es-ES', {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  const renderNotification = ({ item }: { item: Notification }) => (
    <View style={styles.notificationCard}>
      <View style={styles.notificationHeader}>
        <Text style={styles.notificationTitle}>{item.title}</Text>
        <Text style={styles.notificationDate}>{formatDate(item.createdAt)}</Text>
      </View>
      <Text style={styles.notificationMessage}>{item.message}</Text>
      <Text style={styles.notificationSender}>Enviado por: {item.sentBy}</Text>
    </View>
  );

  if (loading) {
    return (
      <View style={styles.centerContainer}>
        <ActivityIndicator size="large" color="#1976d2" />
        <Text style={styles.loadingText}>Cargando notificaciones...</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Notificaciones</Text>
      </View>

      <FlatList
        data={notifications}
        renderItem={renderNotification}
        keyExtractor={(item) => item.id}
        contentContainerStyle={styles.notificationsList}
        ListEmptyComponent={
          <View style={styles.emptyContainer}>
            <Ionicons name="notifications-off-outline" size={64} color="#ccc" />
            <Text style={styles.emptyText}>No hay notificaciones</Text>
            <Text style={styles.emptySubtext}>Las notificaciones aparecerán aquí</Text>
          </View>
        }
      />
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
  loadingText: {
    marginTop: 16,
    color: '#666',
    fontSize: 16,
  },
  header: {
    backgroundColor: '#1a1a1a',
    paddingHorizontal: 20,
    paddingVertical: 15,
    borderBottomWidth: 1,
    borderBottomColor: '#333',
  },
  headerTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#FFD700',
  },
  notificationsList: {
    padding: 15,
  },
  notificationCard: {
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
  notificationHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 10,
  },
  notificationTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333',
    flex: 1,
  },
  notificationDate: {
    fontSize: 12,
    color: '#666',
  },
  notificationMessage: {
    fontSize: 14,
    color: '#666',
    lineHeight: 20,
    marginBottom: 10,
  },
  notificationSender: {
    fontSize: 12,
    color: '#999',
    fontStyle: 'italic',
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
});
