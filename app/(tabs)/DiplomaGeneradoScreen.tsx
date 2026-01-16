import React, { useRef } from 'react';
import { View, Text, ImageBackground, StyleSheet, TouchableOpacity, Alert } from 'react-native';
import { useLocalSearchParams, useRouter } from 'expo-router';
import AsyncStorage from '@react-native-async-storage/async-storage';
import ViewShot from 'react-native-view-shot';
import * as Sharing from 'expo-sharing';
import * as Print from 'expo-print';
import * as FileSystem from 'expo-file-system';
import { useUser } from '../../contexts/UserContext';

const fondos = {
  A2: require('../../assets/diploma_a2.jpg'),
  B2: require('../../assets/diploma_b2.jpg'),
}; // Asegúrate de que diploma_b2.jpg existe en assets y es la imagen correcta para B2.

export default function DiplomaGeneradoScreen() {
  const params = useLocalSearchParams();
  const router = useRouter();
  const viewShotRef = useRef<ViewShot>(null);
  const { user } = useUser();
  const [datos, setDatos] = React.useState({ nombre: '', apellido1: '', apellido2: '', documento: '' });
  const [nivelValido, setNivelValido] = React.useState<'A2' | 'B2'>('A2');
  const [advertencia, setAdvertencia] = React.useState<string | null>(null);

  React.useEffect(() => {
    // Normalizar y validar el nivel
    let nivelParam = (params.nivel || '').toString().toUpperCase();
    if (nivelParam === 'B2') {
      setNivelValido('B2');
    } else if (nivelParam === 'A2') {
      setNivelValido('A2');
    } else {
      setNivelValido('A2');
      if (nivelParam) {
        setAdvertencia((prev) => {
          const nivelWarning = `Nivel recibido no válido ('${nivelParam}'). Mostrando diploma A2.`;
          return prev ? `${prev}\n\n${nivelWarning}` : nivelWarning;
        });
      }
    }
  }, [params.nivel]);

  React.useEffect(() => {
    (async () => {
      // Intentar obtener datos desde AsyncStorage primero
      let nombre = await AsyncStorage.getItem('nombreParticipante') || '';
      let apellido1 = await AsyncStorage.getItem('apellido1Participante') || '';
      let apellido2 = await AsyncStorage.getItem('apellido2Participante') || '';
      // Fallback legacy (un solo apellido)
      const apellidoLegacy = await AsyncStorage.getItem('apellidoParticipante') || '';
      let documento = await AsyncStorage.getItem('documentoParticipante') || '';
      
      // Si no hay datos en AsyncStorage, intentar obtenerlos desde UserContext (Firebase)
      if ((!nombre && !apellido1 && !apellidoLegacy) || !documento) {
        if (user) {
          // Usar datos del perfil de Firebase
          if (!nombre && user.firstName) {
            nombre = user.firstName;
          }
          if (!apellido1 && !apellidoLegacy && user.lastName) {
            // Intentar dividir el lastName en apellido1 y apellido2 si es necesario
            const partesApellido = user.lastName?.split(' ') || [];
            if (partesApellido.length > 0) {
              apellido1 = partesApellido[0];
              if (partesApellido.length > 1) {
                apellido2 = partesApellido.slice(1).join(' ');
              }
            } else {
              apellido1 = user.lastName || '';
            }
          }
          if (!documento && user.documento) {
            documento = user.documento;
          }
        }
      }
      
      const ap1 = apellido1 || apellidoLegacy;
      setDatos({ nombre, apellido1: ap1, apellido2, documento });
      
      // Mostrar advertencia si no hay datos suficientes
      if (!nombre && !apellido1 && !apellidoLegacy) {
        setAdvertencia((prev) => {
          const datosWarning = '⚠️ No se encontraron datos del participante. Por favor, completa tu perfil en la aplicación.';
          return prev ? `${prev}\n\n${datosWarning}` : datosWarning;
        });
      } else {
        // Si hay datos, limpiar advertencia de datos (pero mantener otras advertencias)
        setAdvertencia((prev) => {
          if (prev && prev.includes('No se encontraron datos del participante')) {
            return prev.replace(/⚠️ No se encontraron datos del participante[^\n]*/g, '').trim();
          }
          return prev;
        });
      }
    })();
  }, [user]);

  // Texto personalizado según nivel
  const nombreCompleto = (() => {
    const partes = [datos.nombre, datos.apellido1, datos.apellido2].filter(Boolean);
    if (partes.length === 0) {
      return 'Participante sin registrar';
    }
    return partes.join(' ');
  })();
  const textoDiploma = nivelValido === 'B2'
    ? `La Academia de Inmigrantes tiene el honor de otorgar a ${nombreCompleto} (Documento: ${datos.documento || 'sin documento registrado'}) un diploma por haber superado el nivel B2 (Avanzado) con aprovechamiento de nuestra escuela virtual.`
    : `La Academia de Inmigrantes tiene el honor de otorgar a ${nombreCompleto} (Documento: ${datos.documento || 'sin documento registrado'}) un diploma por haber superado el nivel A2 con aprovechamiento de nuestra escuela virtual.`;

  const handleDescargarJPG = async () => {
    if (!viewShotRef.current || typeof viewShotRef.current.capture !== 'function') {
      Alert.alert('Error', 'No se puede capturar la imagen del diploma. ¿Está cargado el diploma en pantalla?');
      return;
    }
    try {
      const uri = await viewShotRef.current.capture();
      if (uri) {
        await Sharing.shareAsync(uri, { dialogTitle: 'Compartir diploma JPG' });
      } else {
        Alert.alert('Error', 'No se pudo capturar la imagen del diploma.');
      }
    } catch (err) {
      Alert.alert('Error', 'Ocurrió un problema al capturar la imagen.');
    }
  };

  const handleDescargarPDF = async () => {
    setTimeout(async () => {
      if (!viewShotRef.current || typeof viewShotRef.current.capture !== 'function') {
        Alert.alert('Error', 'No se puede capturar la imagen del diploma. ¿Está cargado el diploma en pantalla?');
        return;
      }
      try {
        const uri = await viewShotRef.current.capture();
        if (uri) {
          const base64 = await FileSystem.readAsStringAsync(uri, { encoding: FileSystem.EncodingType.Base64 });
          const html = `
            <html>
              <body style='margin:0;padding:0;'>
                <img src="data:image/png;base64,${base64}" style="width:100vw;height:auto;" />
              </body>
            </html>
          `;
          const { uri: pdfUri } = await Print.printToFileAsync({ html });
          await Sharing.shareAsync(pdfUri, { dialogTitle: 'Compartir diploma PDF' });
        } else {
          Alert.alert('Error', 'No se pudo capturar la imagen del diploma.');
        }
      } catch (err) {
        Alert.alert('Error', 'Ocurrió un problema al capturar la imagen.');
      }
    }, 300);
  };

  return (
    <View style={styles.container}>
      {advertencia && (
        <View style={{ marginBottom: 10, backgroundColor: '#ffe082', padding: 8, borderRadius: 8 }}>
          <Text style={{ color: '#b26a00', fontWeight: 'bold', textAlign: 'center' }}>{advertencia}</Text>
        </View>
      )}
      <ViewShot ref={viewShotRef} options={{ format: 'jpg', quality: 1.0 }} style={styles.diplomaContainer}>
        <ImageBackground source={fondos[nivelValido]} style={styles.background} imageStyle={{ borderRadius: 22 }}>
          <View style={styles.textOverlay}>
            <Text style={styles.textoDiploma}>{textoDiploma}</Text>
          </View>
        </ImageBackground>
      </ViewShot>
      <View style={styles.botonesDescarga}>
        <TouchableOpacity style={styles.botonDescarga} onPress={handleDescargarJPG}>
          <Text style={styles.textoBoton}>Descargar JPG</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.botonDescarga} onPress={handleDescargarPDF}>
          <Text style={styles.textoBoton}>Descargar PDF</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  diplomaContainer: {
    width: 340,
    height: 240,
    borderRadius: 22,
    overflow: 'hidden',
    alignSelf: 'center',
    marginTop: 16,
    marginBottom: 24,
  },
  background: {
    flex: 1,
    resizeMode: 'cover',
    justifyContent: 'center',
    alignItems: 'center',
  },
  textOverlay: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 18,
  },
  textoDiploma: {
    color: '#222',
    fontSize: 13,
    fontWeight: 'bold',
    borderRadius: 8,
    padding: 8,
    textAlign: 'center',
    marginTop: 8,
  },
  botonesDescarga: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginTop: 12,
    gap: 16,
  },
  botonDescarga: {
    backgroundColor: '#1976d2',
    paddingVertical: 12,
    paddingHorizontal: 22,
    borderRadius: 8,
    marginHorizontal: 8,
    elevation: 2,
  },
  textoBoton: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 16,
  },
});
