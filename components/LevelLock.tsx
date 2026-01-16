import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';

type Level = 'A1' | 'A2' | 'B1' | 'B2';

interface LevelLockProps {
  requiredLevel: Level;
  currentLevel?: string;
  onUnlock: () => void;
}

const levelNames: Record<Level, { es: string; ar: string }> = {
  'A1': { es: 'A1: Acceso', ar: 'A1: الوصول' },
  'A2': { es: 'A2: Plataforma', ar: 'A2: المنصة' },
  'B1': { es: 'B1: Umbral', ar: 'B1: العتبة' },
  'B2': { es: 'B2: Avanzado', ar: 'B2: المتقدم' },
};

const levelRequirements: Record<Level, { previousLevel?: Level; requiresPayment: boolean }> = {
  'A1': { requiresPayment: false },
  'A2': { previousLevel: 'A1', requiresPayment: false },
  'B1': { requiresPayment: true },
  'B2': { requiresPayment: false },
};

export const LevelLock: React.FC<LevelLockProps> = ({ requiredLevel, currentLevel, onUnlock }) => {
  const requirements = levelRequirements[requiredLevel];
  const levelName = levelNames[requiredLevel];

  return (
    <View style={styles.container}>
      <MaterialIcons name="lock" size={64} color="#666" style={styles.icon} />
      <Text style={styles.title}>Nivel Bloqueado</Text>
      <Text style={styles.subtitle}>{levelName.es}</Text>
      <Text style={styles.subtitleAr}>{levelName.ar}</Text>
      
      {requirements.previousLevel && (
        <Text style={styles.message}>
          Debes aprobar el nivel {requirements.previousLevel} para desbloquear este contenido.
          {'\n'}يجب عليك اجتياز المستوى {requirements.previousLevel} لفتح هذا المحتوى.
        </Text>
      )}
      
      {requirements.requiresPayment && (
        <Text style={styles.message}>
          Debes completar el proceso de matrícula para acceder a este nivel.
          {'\n'}يجب عليك إكمال عملية التسجيل للوصول إلى هذا المستوى.
        </Text>
      )}
      
      <TouchableOpacity 
        style={styles.button}
        onPress={onUnlock}
      >
        <Text style={styles.buttonText}>
          {requirements.requiresPayment ? 'Ir a Matrícula' : 'Volver'}
        </Text>
        <Text style={styles.buttonTextAr}>
          {requirements.requiresPayment ? 'الذهاب إلى التسجيل' : 'رجوع'}
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
    marginBottom: 8,
    textAlign: 'center',
    color: '#333',
  },
  subtitle: {
    fontSize: 20,
    fontWeight: '600',
    marginBottom: 4,
    textAlign: 'center',
    color: '#1976d2',
  },
  subtitleAr: {
    fontSize: 18,
    fontWeight: '600',
    marginBottom: 16,
    textAlign: 'center',
    color: '#1976d2',
    writingDirection: 'rtl',
  },
  message: {
    fontSize: 16,
    textAlign: 'center',
    marginBottom: 24,
    color: '#666',
    lineHeight: 24,
    paddingHorizontal: 20,
  },
  button: {
    backgroundColor: '#4CAF50',
    paddingHorizontal: 24,
    paddingVertical: 16,
    borderRadius: 8,
    minWidth: 200,
    alignItems: 'center',
    elevation: 2,
  },
  buttonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: '600',
    marginBottom: 4,
  },
  buttonTextAr: {
    color: 'white',
    fontSize: 14,
    fontWeight: '500',
    writingDirection: 'rtl',
  },
});





