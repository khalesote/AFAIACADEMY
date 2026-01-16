import React, { useState, useEffect } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, ActivityIndicator } from 'react-native';
import { Audio } from 'expo-av';
import { Ionicons } from '@expo/vector-icons';

type PreguntaAudio = {
  id: number;
  audio: any; // Ruta al archivo de audio
  pregunta: string;
  opciones: string[];
  respuestaCorrecta: number;
  explicacion: string;
};

type Props = {
  preguntas: PreguntaAudio[];
  onComplete: (puntaje: number) => void;
};

export default function ComprensionAuditiva({ preguntas, onComplete }: Props) {
  const [preguntaActual, setPreguntaActual] = useState(0);
  const [respuestas, setRespuestas] = useState<number[]>([]);
  const [sonando, setSonando] = useState(false);
  const [cargando, setCargando] = useState(false);
  const [mostrarRetroalimentacion, setMostrarRetroalimentacion] = useState(false);
  const [puntaje, setPuntaje] = useState(0);
  const [sound, setSound] = useState<Audio.Sound | null>(null);

  const cargarAudio = async () => {
    try {
      setCargando(true);
      const { sound } = await Audio.Sound.createAsync(
        preguntas[preguntaActual].audio
      );
      setSound(sound);
      setCargando(false);
    } catch (error) {
      console.error('Error al cargar el audio:', error);
      setCargando(false);
    }
  };

  useEffect(() => {
    cargarAudio();
    return () => {
      if (sound) {
        sound.unloadAsync();
      }
    };
  }, [preguntaActual]);

  const reproducirAudio = async () => {
    try {
      if (sound) {
        setSonando(true);
        await sound.replayAsync();
        setSonando(false);
      }
    } catch (error) {
      console.error('Error al reproducir el audio:', error);
      setSonando(false);
    }
  };

  const manejarRespuesta = (opcionIndex: number) => {
    const nuevasRespuestas = [...respuestas];
    nuevasRespuestas[preguntaActual] = opcionIndex;
    setRespuestas(nuevasRespuestas);
    
    // Calcular si la respuesta es correcta
    const esCorrecta = opcionIndex === preguntas[preguntaActual].respuestaCorrecta;
    if (esCorrecta) {
      setPuntaje(puntaje + 1);
    }
    
    setMostrarRetroalimentacion(true);
    
    // Pasar a la siguiente pregunta después de 2 segundos
    setTimeout(() => {
      if (preguntaActual < preguntas.length - 1) {
        setPreguntaActual(preguntaActual + 1);
        setMostrarRetroalimentacion(false);
      } else {
        // Calcular puntaje final y enviar al componente padre
        const puntajeFinal = (puntaje + (esCorrecta ? 1 : 0)) / preguntas.length * 100;
        onComplete(puntajeFinal);
      }
    }, 2000);
  };

  const pregunta = preguntas[preguntaActual];

  return (
    <View style={styles.contenedor}>
      <Text style={styles.titulo}>Comprensión Auditiva</Text>
      <Text style={styles.instrucciones}>
        Escucha atentamente el audio y responde las preguntas.
      </Text>
      
      <View style={styles.audioContainer}>
        <TouchableOpacity 
          style={[styles.botonAudio, sonando && styles.botonActivo]}
          onPress={reproducirAudio}
          disabled={cargando || sonando}
        >
          {cargando ? (
            <ActivityIndicator color="#fff" />
          ) : (
            <Ionicons 
              name={sonando ? "volume-high" : "play"} 
              size={32} 
              color="#fff" 
            />
          )}
        </TouchableOpacity>
        <Text style={styles.contador}>
          Pregunta {preguntaActual + 1} de {preguntas.length}
        </Text>
      </View>
      
      <Text style={styles.pregunta}>{pregunta.pregunta}</Text>
      
      <View style={styles.opcionesContainer}>
        {pregunta.opciones.map((opcion, index) => {
          const seleccionada = respuestas[preguntaActual] === index;
          let estiloBoton = styles.botonOpcion;
          let estiloTexto = styles.textoOpcion;
          
          if (mostrarRetroalimentacion) {
            if (index === pregunta.respuestaCorrecta) {
              estiloBoton = {...estiloBoton, ...styles.opcionCorrecta};
              estiloTexto = {...estiloTexto, ...styles.textoOpcionCorrecta};
            } else if (seleccionada && index !== pregunta.respuestaCorrecta) {
              estiloBoton = {...estiloBoton, ...styles.opcionIncorrecta};
              estiloTexto = {...estiloTexto, ...styles.textoOpcionIncorrecta};
            }
          }
          
          return (
            <TouchableOpacity
              key={index}
              style={[estiloBoton, seleccionada && styles.opcionSeleccionada]}
              onPress={() => !mostrarRetroalimentacion && manejarRespuesta(index)}
              disabled={mostrarRetroalimentacion}
            >
              <Text style={estiloTexto}>{opcion}</Text>
            </TouchableOpacity>
          );
        })}
      </View>
      
      {mostrarRetroalimentacion && (
        <View style={styles.retroalimentacionContainer}>
          <Text style={styles.retroalimentacionTitulo}>
            {respuestas[preguntaActual] === pregunta.respuestaCorrecta 
              ? '¡Correcto!' 
              : 'Respuesta incorrecta'}
          </Text>
          <Text style={styles.retroalimentacionTexto}>
            {pregunta.explicacion}
          </Text>
        </View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  contenedor: {
    flex: 1,
    padding: 20,
    backgroundColor: '#f5f5f5',
  },
  titulo: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 10,
    color: '#333',
    textAlign: 'center',
  },
  instrucciones: {
    fontSize: 16,
    color: '#666',
    marginBottom: 20,
    textAlign: 'center',
  },
  audioContainer: {
    alignItems: 'center',
    marginVertical: 20,
  },
  botonAudio: {
    backgroundColor: '#3498db',
    width: 80,
    height: 80,
    borderRadius: 40,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 10,
    elevation: 5,
  },
  botonActivo: {
    backgroundColor: '#2980b9',
  },
  contador: {
    fontSize: 16,
    color: '#666',
  },
  pregunta: {
    fontSize: 18,
    fontWeight: '600',
    marginBottom: 20,
    color: '#2c3e50',
    textAlign: 'center',
  },
  opcionesContainer: {
    marginTop: 10,
  },
  botonOpcion: {
    backgroundColor: '#fff',
    padding: 15,
    borderRadius: 10,
    marginVertical: 8,
    borderWidth: 1,
    borderColor: '#ddd',
  },
  opcionSeleccionada: {
    borderColor: '#3498db',
    borderWidth: 2,
  },
  opcionCorrecta: {
    backgroundColor: '#d4edda',
    borderColor: '#c3e6cb',
  },
  opcionIncorrecta: {
    backgroundColor: '#f8d7da',
    borderColor: '#f5c6cb',
  },
  textoOpcion: {
    fontSize: 16,
    color: '#333',
  },
  textoOpcionCorrecta: {
    color: '#155724',
    fontWeight: 'bold',
  },
  textoOpcionIncorrecta: {
    color: '#721c24',
    textDecorationLine: 'line-through',
  },
  retroalimentacionContainer: {
    marginTop: 20,
    padding: 15,
    borderRadius: 10,
    backgroundColor: '#f8f9fa',
    borderLeftWidth: 5,
    borderLeftColor: '#3498db',
  },
  retroalimentacionTitulo: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 10,
    color: '#2c3e50',
  },
  retroalimentacionTexto: {
    fontSize: 16,
    color: '#495057',
    lineHeight: 22,
  },
});
