import React, { useEffect, useRef, useState } from 'react';
import { View, Text, StyleSheet, ImageBackground, TouchableOpacity } from 'react-native';
import ViewShot from 'react-native-view-shot';
import * as FileSystem from 'expo-file-system';
import * as Sharing from 'expo-sharing';
import * as Print from 'expo-print';
import AsyncStorage from '@react-native-async-storage/async-storage';

export default function DiplomaSoloProfesorA2() {
  const viewShotRef = useRef<any>(null);
  const [nombre, setNombre] = useState('');
  const [apellido, setApellido] = useState('');
  const [documento, setDocumento] = useState('');
  const [fecha, setFecha] = useState('');

  useEffect(() => {
    (async () => {
      try {
        const [n, a, d] = await Promise.all([
          AsyncStorage.getItem('nombreParticipante'),
          AsyncStorage.getItem('apellidoParticipante'),
          AsyncStorage.getItem('documentoParticipante'),
        ]);
        setNombre(n || '');
        setApellido(a || '');
        setDocumento(d || '');
        const hoy = new Date();
        setFecha(hoy.toLocaleDateString());
      } catch {}
    })();
  }, []);

  // Captura la imagen y la convierte a PDF
  const handleDescargarPDF = async () => {
  setTimeout(async () => {
    const uri = await viewShotRef.current?.capture();
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
      await Sharing.shareAsync(pdfUri);
    }
  }, 300);
};

  return (
    <View style={styles.container}>
      <ViewShot ref={viewShotRef} options={{ format: 'png', quality: 1, width: 800, height: 560 }} style={styles.diploma}>
        <ImageBackground
          source={require('../../assets/diploma_a2.jpg')}
          style={styles.diploma}
          imageStyle={{ resizeMode: 'stretch' }}
        >
          {/* Nivel grande arriba */}
          <Text style={styles.nivel}>Nivel A2</Text>
          {/* Datos del participante */}
          <View style={styles.participanteBox}>
            <Text style={styles.participanteNombre}>{(nombre + ' ' + apellido).trim() || 'Nombre del participante'}</Text>
            <Text style={styles.participanteDocumento}>{documento ? `Documento: ${documento}` : ''}</Text>
            <Text style={styles.participanteFecha}>{fecha ? `Fecha: ${fecha}` : ''}</Text>
          </View>
          {/* SOLO nombre del profesor y espacio para firma */}
          <View style={styles.profesorFirmaRow}>
            <View style={{ flex: 1 }} />
            <View style={{ alignItems: 'flex-end' }}>
              <Text style={styles.profesor}>Profesor: Khaled Mersaoui</Text>
              <View style={styles.firmaEspacio} />
              <Text style={styles.firmaLabel}>Firma</Text>
            </View>
          </View>
          {/* Nota legal pequeña */}
          <Text style={styles.notaLegal}>Este diploma es un certificado de evaluación de la academia y no se considera oficial en ningún caso.</Text>
        </ImageBackground>
      </ViewShot>
      <TouchableOpacity style={[styles.button, { backgroundColor: '#388e3c', marginTop: 24 }]} onPress={handleDescargarPDF}>
        <Text style={styles.buttonText}>Descargar PDF</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, alignItems: 'center', justifyContent: 'center', backgroundColor: '#fff' },
  diploma: { width: 800, height: 560, alignItems: 'center', justifyContent: 'center' },
  nivel: {
    position: 'absolute',
    top: 36,
    left: 0,
    right: 0,
    textAlign: 'center',
    fontSize: 32,
    fontWeight: 'bold',
    color: '#1976d2',
    letterSpacing: 2,
    fontFamily: 'serif',
    textShadowColor: '#fff',
    textShadowOffset: { width: 1, height: 1 },
    textShadowRadius: 2,
  },
  participanteBox: {
    position: 'absolute',
    top: 140,
    left: 60,
    right: 60,
    alignItems: 'center',
  },
  participanteNombre: {
    fontSize: 26,
    fontWeight: 'bold',
    color: '#3e2d0a',
    fontFamily: 'serif',
    textAlign: 'center',
  },
  participanteDocumento: {
    fontSize: 16,
    color: '#5d4037',
    marginTop: 6,
    fontFamily: 'serif',
  },
  participanteFecha: {
    fontSize: 16,
    color: '#5d4037',
    marginTop: 2,
    fontFamily: 'serif',
  },
  profesorFirmaRow: {
    position: 'absolute',
    flexDirection: 'row',
    right: 40,
    bottom: 90,
    width: '100%',
    alignItems: 'flex-end',
    justifyContent: 'flex-end',
  },
  profesor: {
    fontSize: 18,
    color: '#3e2d0a',
    fontFamily: 'serif',
    fontWeight: 'bold',
    marginBottom: 2,
    textAlign: 'right',
  },
  firmaEspacio: {
    width: 120,
    height: 40,
    borderBottomWidth: 1.5,
    borderColor: '#888',
    marginTop: 12,
    marginBottom: 2,
  },
  firmaLabel: {
    fontSize: 12,
    color: '#888',
    textAlign: 'right',
  },
  notaLegal: {
    position: 'absolute',
    bottom: 20,
    left: 30,
    right: 30,
    textAlign: 'center',
    fontSize: 11,
    color: '#a68c4a',
    fontFamily: 'serif',
  },
  button: {
    paddingVertical: 12,
    paddingHorizontal: 20,
    borderRadius: 8,
    backgroundColor: '#1976d2',
    marginHorizontal: 6,
    marginTop: 4,
  },
  buttonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
    textAlign: 'center',
  },
});
