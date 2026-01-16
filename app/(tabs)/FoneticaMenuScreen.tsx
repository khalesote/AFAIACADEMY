import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet, ScrollView } from 'react-native';
import { useRouter } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';

export default function FoneticaMenuScreen() {
  const router = useRouter();
  return (
    <ScrollView contentContainerStyle={styles.container}>
      {/* Botón de regreso al menú de unidades A1 */}
      <TouchableOpacity
        style={{ marginBottom: 16, alignSelf: 'flex-start', padding: 8 }}
        onPress={() => router.replace('/A1_Acceso')}
        accessibilityLabel="Volver al menú A1"
      >
        <Ionicons name="arrow-back" size={28} color="#FFD700" />
      </TouchableOpacity>
      <Text style={styles.title}>Menú de Fonética</Text>
      <TouchableOpacity
        style={styles.menuButton}
        onPress={() => router.push('/(tabs)/FoneticaJuegoReconocimientoScreen')}
        activeOpacity={0.8}
      >
        <LinearGradient
          colors={['#000', '#000']}
          style={styles.menuButtonGradient}
        >
          <Ionicons name="game-controller-outline" size={20} color="#FFD700" style={{ marginRight: 10 }} />
          <View style={{ alignItems: 'center' }}>
            <Text style={styles.menuButtonText}>Juego Fonética</Text>
            <Text style={styles.menuButtonTextAr}>لعبة الصوتيات</Text>
          </View>
        </LinearGradient>
      </TouchableOpacity>

      {/* Botón Fonética Vocales */}
      <TouchableOpacity
        style={styles.menuButton}
        onPress={() => router.push('/(tabs)/FoneticaVocalesScreen')}
        activeOpacity={0.8}
      >
        <LinearGradient
          colors={['#000', '#000']}
          style={styles.menuButtonGradient}
        >
          <Ionicons name="musical-notes-outline" size={20} color="#FFD700" style={{ marginRight: 10 }} />
          <View style={{ alignItems: 'center' }}>
            <Text style={styles.menuButtonText}>Fonética Vocales</Text>
            <Text style={styles.menuButtonTextAr}>صوتيات الحروف المتحركة</Text>
          </View>
        </LinearGradient>
      </TouchableOpacity>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 24,
    backgroundColor: '#fff',
  },
  title: {
    fontSize: 26,
    fontWeight: 'bold',
    marginBottom: 36,
    color: '#000',
    textAlign: 'center',
  },
  menuButton: {
    borderRadius: 24,
    marginVertical: 12,
    width: '100%',
    elevation: 2,
    shadowColor: '#000',
    shadowOpacity: 0.15,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 4,
    overflow: 'hidden',
  },
  menuButtonGradient: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 18,
    paddingHorizontal: 32,
    justifyContent: 'center',
  },
  menuButtonText: {
    fontSize: 20,
    color: '#FFD700',
    fontWeight: 'bold',
  },
  menuButtonTextAr: {
    color: '#FFD700',
    fontSize: 18,
    fontWeight: 'bold',
    marginLeft: 10,
    textAlign: 'right',
    writingDirection: 'rtl',
    fontFamily: 'System',
    marginTop: 2,
  },
});
