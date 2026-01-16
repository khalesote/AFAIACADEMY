import React from 'react';
import { View, Text, Image, StyleSheet } from 'react-native';

interface UnidadCardProps {
  icon: any;
  image: any;
  title: string;
  description: string;
  activity: string;
}

const UnidadCard: React.FC<UnidadCardProps> = ({ icon, image, title, description, activity }) => {
  return (
    <View style={styles.card}>
      <View style={styles.header}>
        <Image source={icon} style={styles.icon} />
        <Text style={styles.title}>{title}</Text>
      </View>
      <Image source={image} style={styles.image} />
      <Text style={styles.description}>{description}</Text>
      <View style={styles.activityContainer}>
        <Text style={styles.activityTitle}>Ejemplo de actividad:</Text>
        <Text style={styles.activity}>{activity}</Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  card: {
    backgroundColor: '#f8f9fa',
    borderRadius: 16,
    padding: 18,
    marginVertical: 14,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOpacity: 0.08,
    shadowRadius: 8,
    elevation: 2,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 8,
  },
  icon: {
    width: 36,
    height: 36,
    marginRight: 10,
  },
  title: {
    fontSize: 22,
    fontWeight: 'bold',
    color: '#1976d2',
  },
  image: {
    width: 180,
    height: 120,
    borderRadius: 10,
    marginVertical: 12,
    resizeMode: 'cover',
  },
  description: {
    fontSize: 16,
    color: '#333',
    marginBottom: 10,
    textAlign: 'center',
  },
  activityContainer: {
    backgroundColor: '#e3f2fd',
    padding: 10,
    borderRadius: 8,
    width: '100%',
    marginTop: 8,
  },
  activityTitle: {
    fontWeight: 'bold',
    fontSize: 15,
    color: '#1976d2',
    marginBottom: 3,
  },
  activity: {
    fontSize: 15,
    color: '#444',
  },
});

export default UnidadCard;
