import React from 'react';
import { View, Text, StyleSheet, ScrollView } from 'react-native';
import { useUserProgress } from '@/contexts/UserProgressContext';
import { LevelCard } from '@/components/LevelCard';
import { useRouter } from 'expo-router';

export default function NivelesScreen() {
  const { progress } = useUserProgress();
  const router = useRouter();

  const handleLevelPress = (level: 'A1' | 'A2' | 'B1' | 'B2') => {
    // Navegar a la pantalla correspondiente según el nivel
    switch(level) {
      case 'A1':
        router.push('/(tabs)/A1_Acceso');
        break;
      case 'A2':
        router.push('/(tabs)/A2_Plataforma');
        break;
      case 'B1':
        router.push('/(tabs)/B1_Umbral');
        break;
      case 'B2':
        router.push('/(tabs)/B2_Avanzado');
        break;
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Niveles de Aprendizaje</Text>
      <Text style={styles.subtitle}>Completa los niveles en orden para desbloquear el siguiente</Text>
      
      <ScrollView style={styles.levelsContainer}>
        <LevelCard
          level="A1"
          title="Acceso"
          description="Nivel inicial de español. Aprende los conceptos básicos."
          price={progress.A1.unlocked ? '¡Desbloqueado!' : '20,00 €'}
          isLocked={!progress.A1.unlocked}
          onPress={() => handleLevelPress('A1')}
        />
        
        <LevelCard
          level="A2"
          title="Plataforma"
          description="Amplía tus conocimientos básicos de español."
          price={progress.A2.unlocked ? '¡Desbloqueado!' : 'Examen A1 requerido'}
          isLocked={!progress.A2.unlocked}
          onPress={() => handleLevelPress('A2')}
        />
        
        <LevelCard
          level="B1"
          title="Umbral"
          description="Desarrolla un nivel intermedio de español."
          price={progress.B1.unlocked ? '¡Desbloqueado!' : '20,00 €'}
          isLocked={!progress.B1.unlocked}
          onPress={() => handleLevelPress('B1')}
        />
        
        <LevelCard
          level="B2"
          title="Avanzado"
          description="Alcanza un nivel avanzado de español."
          price={progress.B2.unlocked ? '¡Desbloqueado!' : '20,00 €'}
          isLocked={!progress.B2.unlocked}
          onPress={() => handleLevelPress('B2')}
        />
      </ScrollView>
      
      <View style={styles.footer}>
        <Text style={styles.footerText}>
          Cada nivel tiene un costo de 20,00 €. Debes aprobar el examen del nivel actual para desbloquear el siguiente.
        </Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
    padding: 16,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 8,
    color: '#333',
    textAlign: 'center',
  },
  subtitle: {
    fontSize: 14,
    color: '#666',
    marginBottom: 24,
    textAlign: 'center',
  },
  levelsContainer: {
    flex: 1,
  },
  footer: {
    marginTop: 16,
    padding: 16,
    backgroundColor: '#f0f7ff',
    borderRadius: 8,
    borderLeftWidth: 4,
    borderLeftColor: '#4CAF50',
  },
  footerText: {
    fontSize: 14,
    color: '#333',
    lineHeight: 20,
  },
});
