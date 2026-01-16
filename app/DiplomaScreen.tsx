import React, { useRef, useState, useEffect } from "react";
import { useRouter } from 'expo-router';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { View, Text, StyleSheet, TouchableOpacity, TextInput, Image } from "react-native";
import ViewShot from "react-native-view-shot";
import * as FileSystem from 'expo-file-system';
import * as Sharing from 'expo-sharing';
import * as Print from 'expo-print';


export default function DiplomaScreen({ route }: any) {
  const router = useRouter();
  const [nombre, setNombre] = useState(route?.params?.nombre || "");
  const [documento, setDocumento] = useState<string>("");
  const [mostrarDiploma, setMostrarDiploma] = useState(false);
  // Detectar el nivel CEFR desde los parámetros de navegación (por defecto B2 si no se pasa)
  // Determinar automáticamente el nivel máximo aprobado
  const [nivel, setNivel] = useState<'A2' | 'B2' | null>(null);
  const [cargando, setCargando] = useState(true);
  const viewShotRef = useRef<any>(null);

  useEffect(() => {
    const checkNivelAprobado = async () => {
      // Si viene nivel por parámetros (p.ej., desde Examen A2), honrar ese nivel
      const nivelParam = (route?.params?.nivel || '').toString().toUpperCase();
      if (nivelParam === 'A2' || nivelParam === 'B2') {
        setNivel(nivelParam as 'A2' | 'B2');
        setCargando(false);
        return;
      }
      try {
        const aprobadoB2 = await AsyncStorage.getItem('nivelB2');
        const aprobadoA2 = await AsyncStorage.getItem('nivelA2');
        if (aprobadoB2 === 'true') {
          setNivel('B2');
        } else if (aprobadoA2 === 'true') {
          setNivel('A2');
        } else {
          setNivel(null);
        }
      } catch (e) {
        setNivel(null);
      }
      setCargando(false);
    };
    checkNivelAprobado();
  }, []);

  // Cargar automáticamente nombre y documento del registro
  useEffect(() => {
    (async () => {
      try {
        const nombreReg = await AsyncStorage.getItem('nombreParticipante');
        const apellidoReg = await AsyncStorage.getItem('apellidoParticipante');
        const docReg = await AsyncStorage.getItem('documentoParticipante');
        const fullName = `${nombreReg || ''} ${apellidoReg || ''}`.trim();
        if (fullName) setNombre(fullName);
        if (docReg) setDocumento(docReg);
      } catch {}
    })();
  }, []);

  const nivelTexto = nivel === 'A2' ? 'A2 (Plataforma)' : nivel === 'B2' ? 'B2 (Avanzado)' : '';

  // Cambia esto por tu nombre real si lo deseas
  const nombreProfesor = "Tu Nombre";

  const handleGenerarDiploma = () => {
    // Ir a la pantalla de diploma unificada (usa plantilla A2 o B2 según nivel)
    if (!nivel) return;
    router.push({ pathname: '/(tabs)/DiplomaGeneradoScreen', params: { nivel } });
  };

  const handleDescargar = async () => {
    if (viewShotRef.current) {
      const uri = await viewShotRef.current.capture();
      const fileUri = FileSystem.documentDirectory + `Diploma_${nivel}_${nombre}.png`;
      await FileSystem.moveAsync({ from: uri, to: fileUri });
      await Sharing.shareAsync(fileUri);
    }
  };

  // Descargar como PDF
  const handleDescargarPDF = async () => {
    if (viewShotRef.current) {
      const uri = await viewShotRef.current.capture();
      // Convertir imagen a base64
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
  };


  return (
    <View style={styles.container}>
      {cargando ? (
        <View style={styles.inputBox}>
          <Text style={styles.label}>Cargando progreso...</Text>
        </View>
      ) : !nivel ? (
        <View style={styles.inputBox}>
          <Text style={styles.label}>No has aprobado ningún nivel aún.</Text>
        </View>
      ) : (
        <View style={styles.inputBox}>
          <Text style={styles.label}>Diploma para:</Text>
          <TextInput
            style={[styles.input, { backgroundColor: '#f5f5f5' }]}
            value={nombre}
            editable={false}
            placeholder="Nombre y Apellido"
          />
          {!!documento && (
            <Text style={[styles.label, { marginTop: 6, fontWeight: 'normal' }]}>Documento (NIE/Pasaporte): {documento}</Text>
          )}
          <Text style={[styles.label, { marginTop: 18 }]}>Diploma disponible: {nivelTexto}</Text>
          <TouchableOpacity
            style={[styles.button, {marginTop: 18}]}
            onPress={handleGenerarDiploma}
            disabled={!nivel}
          >
            <Text style={styles.buttonText}>Ver Diploma Generado</Text>
          </TouchableOpacity>
        </View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  // Estilos originales
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#e3f2fd"
  },
  inputBox: {
    backgroundColor: '#fff',
    padding: 28,
    borderRadius: 16,
    elevation: 4,
    alignItems: 'center',
  },
  label: {
    fontSize: 18,
    marginBottom: 10,
    color: '#1976d2',
    fontWeight: 'bold'
  },
  input: {
    borderWidth: 1,
    borderColor: '#bdbdbd',
    borderRadius: 8,
    padding: 10,
    width: 250,
    fontSize: 16,
    marginBottom: 8
  },
  button: {
    backgroundColor: '#388e3c',
    padding: 14,
    borderRadius: 10,
    alignItems: 'center',
    width: 200
  },
  buttonText: {
    color: '#fff',
    fontSize: 17,
    fontWeight: 'bold',
    textAlign: 'center'
  },
});
