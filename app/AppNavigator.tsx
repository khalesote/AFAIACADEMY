import React from 'react';
import { View, Text } from 'react-native';
import { createStackNavigator } from '@react-navigation/stack';
import SchoolScreen from './(tabs)/SchoolScreen';
import MatriculaScreen from './(tabs)/MatriculaScreen';
import AgendaScreen from './AgendaScreen';
// import ChatScreen from './ChatScreen';
// import B2AvanzadoScreen from './(tabs)/B2AvanzadoScreen';

export type RootStackParamList = {
  School: undefined;
  MatriculaScreen: undefined;
  A1_Acceso: undefined;
  A2_Plataforma: undefined;
  B1_Umbral: undefined;
  B2_Avanzado: undefined;
  AgendaScreen: undefined;
  ForgotPassword: undefined;
  // Agrega aquí otras pantallas según las necesites
};

import ForgotPasswordScreen from '../ForgotPasswordScreen';
const Stack = createStackNavigator<RootStackParamList>();

export default function AppNavigator() {
  return (
    <Stack.Navigator>
      <Stack.Screen name="School" component={SchoolScreen} options={{ title: 'Inicio' }} />
      <Stack.Screen name="MatriculaScreen" component={MatriculaScreen} options={{ title: 'Matrícula' }} />
      {/* Pantalla A1 Acceso */}
      <Stack.Screen name="A1_Acceso" component={() => <View><Text>Pantalla A1 Acceso (placeholder)</Text></View>} options={{ title: 'A1 Acceso' }} />
      {/* Pantalla B2 Avanzado */}
      <Stack.Screen 
        name="B2_Avanzado" 
        component={require('app/(tabs)/B2_Avanzado').default} 
        options={{ 
          title: 'B2 Avanzado',
          headerShown: false
        }} 
      />
      <Stack.Screen name="AgendaScreen" component={AgendaScreen} options={{ title: 'Agenda de Contactos' }} />
      <Stack.Screen name="ForgotPassword" component={ForgotPasswordScreen} options={{ title: 'Recuperar Contraseña' }} />
    </Stack.Navigator>
  );
}
