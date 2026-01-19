import { Tabs, useRouter } from "expo-router";
import React, { useEffect, useCallback } from "react";
import { View, StyleSheet, Alert } from "react-native";
import { Ionicons } from '@expo/vector-icons';
import { collection, query, where, onSnapshot, doc, updateDoc, DocumentReference, Timestamp } from 'firebase/firestore';
import { firestore, auth } from '../../config/firebase';

const db = firestore;

const styles = StyleSheet.create({
  sceneContainer: {
    backgroundColor: '#f8f9fa',
  },
  tabBar: {
    backgroundColor: '#fff',
    borderTopWidth: 1,
    borderTopColor: '#eee',
    height: 60,
  },
  tabItem: {
    minWidth: 100,
    height: 60,
    paddingVertical: 5,
  },
  tabLabel: {
    fontSize: 11,
    margin: 0,
    padding: 0,
  },
});

export default function TabLayout() {
  const router = useRouter();

  const handlePrivateChatResponse = useCallback(async (
    notificationRef: DocumentReference,
    chatId: string,
    accept: boolean
  ) => {
    if (!chatId) {
      return;
    }
    try {
      const chatRef = doc(db, 'privateChats', chatId);
      const chatUpdates: Record<string, Timestamp | string> = {
        status: accept ? 'active' : 'declined',
        lastActivity: Timestamp.now(),
      };

      if (accept) {
        chatUpdates['activatedAt'] = Timestamp.now();
      } else {
        chatUpdates['declinedAt'] = Timestamp.now();
      }

      await updateDoc(chatRef, chatUpdates);
      await updateDoc(notificationRef, {
        read: true,
        respondedAt: Timestamp.now(),
      });

      if (accept) {
        router.push({ pathname: '/(tabs)/PrivateChatScreen', params: { chatId } });
      }
    } catch (error) {
      console.error('Error handling private chat response:', error);
    }
  }, [router]);

  // Global notification listener
  useEffect(() => {
    if (auth.currentUser) {
      const q = query(
        collection(db, 'notifications'),
        where('toUserId', '==', auth.currentUser.uid),
        where('read', '==', false)
      );
      const unsubscribe = onSnapshot(q, (querySnapshot) => {
        querySnapshot.docChanges().forEach((change) => {
          if (change.type === 'added') {
            const data = change.doc.data();
            if (data.type === 'private_chat_request' && data.chatId) {
              Alert.alert(
                'Solicitud de chat privado',
                data.message,
                [
                  {
                    text: 'Rechazar',
                    style: 'cancel',
                    onPress: () => handlePrivateChatResponse(change.doc.ref, data.chatId, false),
                  },
                  {
                    text: 'Aceptar',
                    onPress: () => handlePrivateChatResponse(change.doc.ref, data.chatId, true),
                  },
                ],
                { cancelable: false }
              );
            } else {
              Alert.alert('Nueva notificación', data.message);
              updateDoc(change.doc.ref, { read: true });
            }
          }
        });
      });

      return unsubscribe;
    }
  }, [handlePrivateChatResponse]);

  return (
    <Tabs
      screenOptions={{
        headerShown: false,
        tabBarShowLabel: false,
        tabBarActiveTintColor: '#1976d2',
        tabBarInactiveTintColor: '#666',
        tabBarItemStyle: { height: 0, width: 0 },
        tabBarStyle: { display: 'none' },
        tabBarLabelStyle: styles.tabLabel,
      }}
    >
      <Tabs.Screen
        name="index"
        options={{
          title: "Inicio",
          tabBarIcon: ({ color }) => <Ionicons name="home" size={28} color={color} />,
        }}
      />
      <Tabs.Screen
        name="SchoolScreen"
        options={{
          title: "Escuela Virtual",
          tabBarIcon: ({ color }) => <Ionicons name="school" size={28} color={color} />,
        }}
      />
      <Tabs.Screen
        name="DiccionarioScreen"
        options={{
          title: "Diccionario",
          tabBarIcon: ({ color }) => <Ionicons name="book" size={28} color={color} />,
        }}
      />
      <Tabs.Screen
        name="VocabularioScreen"
        options={{
          title: "Vocabulario",
          tabBarIcon: ({ color }) => <Ionicons name="language" size={28} color={color} />,
        }}
      />
      <Tabs.Screen
        name="AsesoriaScreen"
        options={{
          title: "Asesoría",
          tabBarIcon: ({ color }) => <Ionicons name="people" size={28} color={color} />,
          tabBarStyle: { display: 'none' }, // Hide tab bar for this screen
        }}
      />
      <Tabs.Screen
        name="JuegosDeTareasScreen"
        options={{
          title: "Juegos",
          tabBarIcon: ({ color }) => <Ionicons name="game-controller" size={28} color={color} />,
        }}
      />
      <Tabs.Screen
        name="SituacionesScreen"
        options={{
          title: "Situaciones",
          tabBarIcon: ({ color }) => <Ionicons name="chatbubbles" size={28} color={color} />,
        }}
      />
      <Tabs.Screen
        name="GramaticaScreen"
        options={{
          title: "Gramática",
          tabBarIcon: ({ color }) => <Ionicons name="book-outline" size={28} color={color} />,
        }}
      />
      <Tabs.Screen
        name="CuentosPopularesScreen"
        options={{
          title: "Cuentos",
          tabBarIcon: ({ color }) => <Ionicons name="book" size={28} color={color} />,
        }}
      />
      <Tabs.Screen
        name="DiplomaGeneradoScreen"
        options={{
          title: "Diploma",
          tabBarIcon: ({ color }) => <Ionicons name="school" size={28} color={color} />,
          tabBarStyle: { display: 'none' }, // Hide tab bar for diploma screen
        }}
      />
      <Tabs.Screen
        name="ForumScreen"
        options={{
          title: "Foro",
          tabBarIcon: ({ color }) => <Ionicons name="chatbubbles" size={28} color={color} />,
          tabBarStyle: { display: 'none' }, // Hide tab bar for forum screen
        }}
      />
      <Tabs.Screen
        name="ChatScreen"
        options={{
          title: "Chat",
          tabBarIcon: ({ color }) => <Ionicons name="chatbubble-ellipses" size={28} color={color} />,
          tabBarStyle: { display: 'none' }, // Hide tab bar for chat screen
        }}
      />
      <Tabs.Screen
        name="PrivateChatScreen"
        options={{
          title: "Chat Privado",
          tabBarIcon: ({ color }) => <Ionicons name="chatbubble" size={28} color={color} />,
          tabBarStyle: { display: 'none' },
        }}
      />
    </Tabs>
  );
}
