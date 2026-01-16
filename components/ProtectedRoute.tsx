import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { useUserProgress } from '@/contexts/UserProgressContext';
import { useRouter } from 'expo-router';
import { MaterialIcons } from '@expo/vector-icons';

type Level = 'A1' | 'A2' | 'B1' | 'B2';

interface ProtectedRouteProps {
  children: React.ReactNode;
  requiredLevel: Level;
}

const levelRequirements: Record<Level, { previousLevel?: Level; requiresPayment: boolean }> = {
  'A1': { requiresPayment: false },
  'A2': { previousLevel: 'A1', requiresPayment: false },
  'B1': { requiresPayment: true },
  'B2': { requiresPayment: false },
};

export const ProtectedRoute: React.FC<ProtectedRouteProps> = ({ children, requiredLevel }) => {
  const { progress } = useUserProgress();
  const router = useRouter();
  const requirements = levelRequirements[requiredLevel];
  
  // Si el nivel no requiere pago ni nivel anterior (como A1 y B2), siempre permitir acceso
  if (!requirements.requiresPayment && !requirements.previousLevel) {
    return <>{children}</>;
  }
  
  // Verificar si el progreso está cargado y el nivel está desbloqueado
  const isUnlocked = progress && progress[requiredLevel]?.unlocked || false;
  
  // Verificar si se aprobó el nivel anterior si es necesario
  const previousLevelPassed = !requirements.previousLevel || 
    (progress && progress[requirements.previousLevel]?.examPassed) || false;
  
  // Si el nivel está desbloqueado, mostrar el contenido
  if (isUnlocked) {
    return <>{children}</>;
  }

  // Si no está desbloqueado, mostrar pantalla de bloqueo
  return (
    <View style={styles.container}>
      <MaterialIcons name="lock" size={64} color="#666" style={styles.icon} />
      <Text style={styles.title}>Nivel Bloqueado</Text>
      
      {!previousLevelPassed && requirements.previousLevel && (
        <Text style={styles.message}>
          Debes aprobar el nivel {requirements.previousLevel} para desbloquear este contenido.
        </Text>
      )}
      
      {requirements.requiresPayment && (!progress || !progress[requiredLevel]?.unlocked) && (
        <Text style={styles.message}>
          Debes completar el proceso de matrícula para acceder a este nivel.
        </Text>
      )}
      
      <TouchableOpacity 
        style={styles.button}
        onPress={() => {
          if (requirements.requiresPayment) {
            router.push('/(tabs)/matricula');
          } else {
            router.back();
          }
        }}
      >
        <Text style={styles.buttonText}>
          {requirements.requiresPayment ? 'Ir a Matrícula' : 'Volver'}
        </Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
    backgroundColor: '#fff',
  },
  icon: {
    marginBottom: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 16,
    textAlign: 'center',
    color: '#333',
  },
  message: {
    fontSize: 16,
    textAlign: 'center',
    marginBottom: 24,
    color: '#666',
    lineHeight: 24,
  },
  button: {
    backgroundColor: '#4CAF50',
    paddingHorizontal: 24,
    paddingVertical: 12,
    borderRadius: 8,
    minWidth: 200,
    alignItems: 'center',
  },
  buttonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: '600',
  },
});
