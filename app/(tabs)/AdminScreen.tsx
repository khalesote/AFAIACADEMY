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
import { collection, addDoc, getDocs, query, where, Timestamp } from 'firebase/firestore';
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
      await addDoc(collection(firestore, 'notifications'), {
        title: title.trim(),
        message: message.trim(),
        sentBy: user.name || user.email,
        sentByEmail: user.email,
        createdAt: Timestamp.now(),
      });

      Alert.alert('Éxito', 'Notificación enviada a todos los usuarios');
      setTitle('');
      setMessage('');
    } catch (error) {
      console.error('Error sending notification:', error);
      Alert.alert('Error', 'No se pudo enviar la notificación');
    } finally {
      setSending(false);
    }

    // Send push notifications
    try {
      const usersQuery = query(collection(firestore, 'users'), where('pushToken', '!=', null));
      const usersSnapshot = await getDocs(usersQuery);
      const tokens: string[] = [];
      usersSnapshot.forEach(doc => {
        const data = doc.data();
        if (data.pushToken) tokens.push(data.pushToken);
      });

      if (tokens.length > 0) {
        const messages = tokens.map(token => ({
          to: token,
          title: title.trim(),
          body: message.trim(),
          data: { type: 'admin_notification' },
        }));

        // Send in batches of 100 (Expo limit)
        const batchSize = 100;
        for (let i = 0; i < messages.length; i += batchSize) {
          const batch = messages.slice(i, i + batchSize);
          const response = await fetch('https://exp.host/--/api/v2/push/send', {
            method: 'POST',
            headers: {
              'Accept': 'application/json',
              'Content-Type': 'application/json',
            },
            body: JSON.stringify(batch),
          });
          if (!response.ok) {
            console.error('Failed to send push batch:', i / batchSize);
          }
        }
        console.log('Push notifications sent to', tokens.length, 'users');
      }
    } catch (pushError) {
      console.error('Error sending push notifications:', pushError);
      // Don't show alert for push failure, as in-app notification was sent
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
