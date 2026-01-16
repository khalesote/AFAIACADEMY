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
    shadowRadius: 6,
    elevation: 2,
    width: '92%',
    alignSelf: 'center',
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10,
  },
  icon: {
    width: 44,
    height: 44,
    marginRight: 12,
    resizeMode: 'contain',
  },
  title: {
    fontSize: 22,
    fontWeight: 'bold',
    color: '#9DC3AA',
    flexShrink: 1,
  },
  image: {
    width: 180,
    height: 120,
    borderRadius: 12,
    marginBottom: 10,
    resizeMode: 'contain',
  },
  description: {
    fontSize: 16,
    color: '#444',
    marginBottom: 10,
    textAlign: 'center',
  },
  activityContainer: {
    backgroundColor: '#e8f5e8',
    padding: 10,
    borderRadius: 8,
    width: '100%',
    marginTop: 8,
  },
  activityTitle: {
    fontWeight: 'bold',
    fontSize: 15,
    color: '#1565c0',
    marginBottom: 3,
  },
  activity: {
    fontSize: 15,
    color: '#444',
    textAlign: 'left',
  },
});

export default UnidadCard;
