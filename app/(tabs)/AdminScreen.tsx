import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  TextInput,
  Alert,
  ScrollView,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { collection, addDoc, getDocs, Timestamp } from 'firebase/firestore';
import { firestore } from '../../config/firebase';
import { useUser } from '../../contexts/UserContext';

interface Notification {
  id?: string;
  title: string;
  message: string;
  sentBy: string;
  sentByEmail: string;
  createdAt: Timestamp;
}

const isExpoPushToken = (token?: string): token is string => {
  if (!token) return false;
  return token.startsWith('ExponentPushToken') || token.startsWith('ExpoPushToken');
};

export default function AdminScreen() {
  const { user, isAdmin } = useUser();
  const [title, setTitle] = useState('');
  const [message, setMessage] = useState('');
  const [sending, setSending] = useState(false);

  console.log('AdminScreen - User email:', user?.email, 'isAdmin:', isAdmin);

  if (!isAdmin) {
    console.log('AdminScreen - Not admin, showing unauthorized');
    return (
      <View style={styles.container}>
        <View style={styles.header}>
          <Text style={styles.headerTitle}>Acceso Denegado</Text>
        </View>
        <View style={styles.form}>
          <Text style={styles.label}>No tienes permisos de administrador.</Text>
        </View>
      </View>
    );
  }

  const sendNotification = async () => {
    if (!title.trim() || !message.trim()) {
      Alert.alert('Error', 'Por favor completa título y mensaje');
      return;
    }

    if (!user || !isAdmin) {
      Alert.alert('Error', 'No tienes permisos de administrador');
      return;
    }

    if (!firestore) {
      Alert.alert('Error', 'Servicio de base de datos no disponible');
      return;
    }

    try {
      setSending(true);

      const usersSnapshot = await getDocs(collection(firestore, 'users'));
      if (usersSnapshot.empty) {
        Alert.alert('Aviso', 'No se encontraron usuarios para notificar.');
        setSending(false);
        return;
      }

      const trimmedTitle = title.trim();
      const trimmedMessage = message.trim();
      const createdAt = Timestamp.now();
      console.log('🚀 Enviando notificación admin', {
        title: trimmedTitle,
        messageLength: trimmedMessage.length,
        adminEmail: user.email,
        adminId: user.id,
      });
      console.log('👥 Usuarios encontrados para notificar:', usersSnapshot.size);
      const notificationPromises: Promise<any>[] = [];
      const tokens: string[] = [];
      let invalidTokens = 0;

      usersSnapshot.forEach((docSnapshot) => {
        const userData = docSnapshot.data();

        notificationPromises.push(addDoc(collection(firestore, 'notifications'), {
          title: trimmedTitle,
          message: trimmedMessage,
          sentBy: user.name || user.email,
          sentByEmail: user.email,
          sentById: user.id,
          toUserId: docSnapshot.id,
          read: false,
          type: 'admin_broadcast',
          createdAt,
        }));

        const pushToken = userData.pushToken as string | undefined;
        if (isExpoPushToken(pushToken)) {
          tokens.push(pushToken);
        } else if (pushToken) {
          invalidTokens += 1;
        }
      });

      console.log('🔔 Tokens de push recopilados', {
        totalUsers: usersSnapshot.size,
        validTokens: tokens.length,
        invalidTokens,
      });

      await Promise.all(notificationPromises);

      Alert.alert('Éxito', 'Notificación enviada a todos los usuarios');
      setTitle('');
      setMessage('');

      // Send push notifications
      if (tokens.length > 0) {
        const messages = tokens.map(token => ({
          to: token,
          title: trimmedTitle,
          body: trimmedMessage,
          data: { type: 'admin_notification' },
          sound: 'default',
          channelId: 'default',
          priority: 'high',
        }));

        const batchSize = 100;
        for (let i = 0; i < messages.length; i += batchSize) {
          const batch = messages.slice(i, i + batchSize);
          console.log('📤 Enviando batch de push:', i / batchSize + 1, 'de', Math.ceil(messages.length / batchSize));
          const response = await fetch('https://exp.host/--/api/v2/push/send', {
            method: 'POST',
            headers: {
              'Accept': 'application/json',
              'Content-Type': 'application/json',
            },
            body: JSON.stringify(batch),
          });

          const responseData = await response.json().catch(() => null);
          if (!response.ok) {
            console.error('Failed to send push batch:', i / batchSize, responseData);
          } else {
            const errors = responseData?.data?.filter((item: any) => item.status === 'error');
            if (errors?.length) {
              console.error('Errores al enviar push:', errors);
            }
          }
        }
        console.log('Push notifications sent to', tokens.length, 'users');
        if (invalidTokens > 0) {
          console.warn('Tokens inválidos omitidos:', invalidTokens);
        }
      } else {
        console.warn('⚠️ No hay tokens válidos; se guardaron solo notificaciones internas.');
      }
    } catch (error) {
      console.error('Error sending notification:', error);
      Alert.alert('Error', 'No se pudo enviar la notificación');
    } finally {
      setSending(false);
    }
  };

  return (
    <ScrollView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Panel de Administrador</Text>
      </View>

      <View style={styles.form}>
        <Text style={styles.label}>Enviar Notificación a Todos los Usuarios</Text>

        <Text style={styles.inputLabel}>Título</Text>
        <TextInput
          style={styles.textInput}
          placeholder="Título de la notificación"
          value={title}
          onChangeText={setTitle}
          maxLength={100}
        />

        <Text style={styles.inputLabel}>Mensaje</Text>
        <TextInput
          style={[styles.textInput, styles.messageInput]}
          placeholder="Mensaje de la notificación"
          value={message}
          onChangeText={setMessage}
          multiline
          numberOfLines={4}
          maxLength={500}
        />

        <TouchableOpacity
          style={[styles.sendButton, sending && styles.sendButtonDisabled]}
          onPress={sendNotification}
          disabled={sending}
        >
          <Text style={styles.sendButtonText}>
            {sending ? 'Enviando...' : 'Enviar Notificación'}
          </Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f8f9fa',
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
  form: {
    padding: 20,
  },
  label: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 20,
    textAlign: 'center',
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
  messageInput: {
    height: 100,
    textAlignVertical: 'top',
  },
  sendButton: {
    backgroundColor: '#1976d2',
    padding: 15,
    borderRadius: 8,
    alignItems: 'center',
    marginTop: 20,
  },
  sendButtonDisabled: {
    opacity: 0.7,
  },
  sendButtonText: {
    color: '#fff',
    fontWeight: '600',
    fontSize: 16,
  },
});
