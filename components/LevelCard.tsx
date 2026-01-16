import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Alert } from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';

type LevelCardProps = {
  level: 'A1' | 'A2' | 'B1' | 'B2';
  title: string;
  description: string;
  price: string;
  isLocked: boolean;
  onPress: () => void;
};

export const LevelCard: React.FC<LevelCardProps> = ({
  level,
  title,
  description,
  price,
  isLocked,
  onPress,
}) => {
  const router = useRouter();

  const handlePress = () => {
    if (isLocked) {
      Alert.alert(
        'Nivel Bloqueado',
        level === 'A2' 
          ? 'Debes aprobar el examen A1 para desbloquear este nivel.'
          : level === 'B1'
          ? 'Completa el nivel A2 para desbloquear este nivel.'
          : level === 'B2'
          ? 'Debes aprobar el examen B1 para desbloquear este nivel.'
          : 'Completa los niveles anteriores para desbloquear este nivel.'
      );
      return;
    }
    onPress();
  };

  return (
    <TouchableOpacity
      style={[styles.card, isLocked && styles.cardLocked]}
      onPress={handlePress}
      activeOpacity={0.8}
    >
      <View style={styles.cardHeader}>
        <Text style={styles.level}>{level}</Text>
        {isLocked ? (
          <MaterialIcons name="lock-outline" size={24} color="#666" />
        ) : (
          <MaterialIcons name="lock-open" size={24} color="#4CAF50" />
        )}
      </View>
      
      <Text style={styles.title}>{title}</Text>
      <Text style={styles.description}>{description}</Text>
      
      <View style={styles.footer}>
        <Text style={styles.price}>{price}</Text>
        <View style={styles.iconContainer}>
          {isLocked ? (
            <MaterialIcons name="lock" size={20} color="#666" />
          ) : (
            <MaterialIcons name="arrow-forward" size={24} color="#4CAF50" />
          )}
        </View>
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  card: {
    backgroundColor: '#fff',
    borderRadius: 12,
    padding: 20,
    marginBottom: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  cardLocked: {
    opacity: 0.7,
  },
  cardHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 12,
  },
  level: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333',
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 8,
    color: '#333',
  },
  description: {
    fontSize: 14,
    color: '#666',
    marginBottom: 16,
    lineHeight: 20,
  },
  footer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    borderTopWidth: 1,
    borderTopColor: '#eee',
    paddingTop: 12,
  },
  price: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#4CAF50',
  },
  iconContainer: {
    width: 32,
    alignItems: 'flex-end',
  },
});





