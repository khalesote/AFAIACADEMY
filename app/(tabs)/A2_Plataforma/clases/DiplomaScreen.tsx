import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Share } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { Ionicons } from '@expo/vector-icons';
import { useLocalSearchParams, useRouter } from 'expo-router';

type DiplomaParams = {
  nivel: string;
  nombre?: string;
  fecha?: string;
};

const DiplomaScreen = () => {
  const router = useRouter();
  const { nivel = 'A2', nombre = 'Estudiante', fecha = new Date().toLocaleDateString() } = useLocalSearchParams<DiplomaParams>();

  const compartirDiploma = async () => {
    try {
      await Share.share({
        message: `¡He aprobado el examen de nivel ${nivel} en la Academia de Inmigrantes! \n\n` +
                  `Nombre: ${nombre}\n` +
                  `Nivel: ${nivel}\n` +
                  `Fecha: ${fecha}\n\n` +
                  `¡Gracias por la enseñanza!`,
        title: `Diploma Nivel ${nivel}`
      });
    } catch (error) {
      console.error('Error al compartir:', error);
    }
  };

  return (
    <LinearGradient colors={['#fffde7', '#ffe0b2', '#ffecb3']} style={styles.container}>
      <View style={styles.diplomaContainer}>
        <Text style={styles.titulo}>¡Felicidades!</Text>
        <Text style={styles.subtitulo}>Has aprobado el examen de nivel {nivel}</Text>
        
        <View style={styles.diploma}>
          <Text style={styles.diplomaTitulo}>Diploma de Aprobación</Text>
          <Text style={styles.diplomaTexto}>Otorgado a:</Text>
          <Text style={styles.nombreEstudiante}>{nombre}</Text>
          <Text style={styles.diplomaTexto}>Por haber aprobado exitosamente el examen de nivel</Text>
          <Text style={styles.nivel}>{nivel}</Text>
          <Text style={styles.fecha}>{fecha}</Text>
        </View>

        <TouchableOpacity 
          style={styles.botonCompartir}
          onPress={compartirDiploma}
        >
          <Ionicons name="share-social" size={24} color="white" />
          <Text style={styles.botonCompartirTexto}>Compartir con el profesor</Text>
        </TouchableOpacity>

        <TouchableOpacity 
          style={styles.botonVolver}
          onPress={() => router.back()}
        >
          <Text style={styles.botonVolverTexto}>Volver al inicio</Text>
        </TouchableOpacity>
      </View>
    </LinearGradient>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    justifyContent: 'center',
    alignItems: 'center',
  },
  diplomaContainer: {
    width: '100%',
    alignItems: 'center',
    padding: 20,
  },
  titulo: {
    fontSize: 32,
    fontWeight: 'bold',
    color: '#212121',
    marginBottom: 10,
    textAlign: 'center',
  },
  subtitulo: {
    fontSize: 20,
    color: '#424242',
    marginBottom: 30,
    textAlign: 'center',
  },
  diploma: {
    backgroundColor: 'white',
    borderRadius: 15,
    padding: 25,
    width: '100%',
    maxWidth: 500,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
    marginBottom: 30,
  },
  diplomaTitulo: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#212121',
    marginBottom: 20,
    textAlign: 'center',
  },
  diplomaTexto: {
    fontSize: 16,
    color: '#424242',
    marginBottom: 10,
    textAlign: 'center',
  },
  nombreEstudiante: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#1976D2',
    marginVertical: 15,
    textAlign: 'center',
    textDecorationLine: 'underline',
  },
  nivel: {
    fontSize: 22,
    fontWeight: 'bold',
    color: '#D32F2F',
    marginVertical: 10,
  },
  fecha: {
    fontSize: 16,
    color: '#757575',
    marginTop: 20,
    fontStyle: 'italic',
  },
  botonCompartir: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#1976D2',
    paddingHorizontal: 25,
    paddingVertical: 12,
    borderRadius: 30,
    marginBottom: 15,
  },
  botonCompartirTexto: {
    color: 'white',
    fontSize: 18,
    fontWeight: 'bold',
    marginLeft: 10,
  },
  botonVolver: {
    padding: 10,
  },
  botonVolverTexto: {
    color: '#1976D2',
    fontSize: 16,
    fontWeight: '500',
  },
});

export default DiplomaScreen;
