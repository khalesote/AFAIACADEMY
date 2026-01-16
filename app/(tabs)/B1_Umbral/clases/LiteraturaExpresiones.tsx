import React, { useState } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, TextInput, Alert } from 'react-native';

import { Ionicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import EjerciciosInteractivos from '../../../components/EjerciciosInteractivos';
import { useUserProgress } from '@/contexts/UserProgressContext';
import { LinearGradient } from 'expo-linear-gradient';

// Tipos para los ejercicios
type TipoEjercicio = 'opcion_multiple' | 'lectura_comprension' | 'expresion_escrita' | 'relacionar' | 'analisis_literario';
type EjercicioInteractivo = {
  tipo: string;
  enunciado?: string;
  opciones?: string[];
  respuesta_correcta?: string;
};

// Datos de ejercicios para Literatura y Expresiones - Nivel B1
const ejercicios = [
  // Sección 1: Literatura Española
  {
    tipo: "lectura_comprension",
    titulo: "Fragmento de Don Quijote",
    texto: "En un lugar de la Mancha, de cuyo nombre no quiero acordarme, no ha mucho tiempo que vivía un hidalgo de los de lanza en astillero, adarga antigua, rocín flaco y galgo corredor. Una olla de algo más vaca que carnero, salpicón las más noches, duelos y quebrantos los sábados, lentejas los viernes, algún palomino de añadidura los domingos, consumían las tres partes de su hacienda.",
    autor: "Miguel de Cervantes - Don Quijote de la Mancha (1605)",
    preguntas: [
      {
        pregunta: "¿Qué tipo de personaje es Don Quijote según el texto?",
        opciones: [
          "Un hombre rico y poderoso",
          "Un hidalgo de clase media-baja",
          "Un campesino pobre",
          "Un noble adinerado"
        ],
        respuesta_correcta: "Un hidalgo de clase media-baja"
      },
      {
        pregunta: "¿Qué figura literaria predomina en la descripción de la alimentación de Don Quijote?",
        opciones: [
          "Hipérbole",
          "Metáfora",
          "Enumeración",
          "Comparación"
        ],
        respuesta_correcta: "Enumeración"
      }
    ]
  },

  // Sección 2: Gramática - Estilo Indirecto
  {
    tipo: "opcion_multiple",
    titulo: "Estilo Indirecto",
    enunciado: "Transforma al estilo indirecto: 'Voy al cine', dijo Ana.",
    opciones: [
      { texto: "Ana dijo que iba al cine.", esCorrecta: true },
      { texto: "Ana dijo que voy al cine.", esCorrecta: false },
      { texto: "Ana dijo que fue al cine.", esCorrecta: false },
      { texto: "Ana dijo que irá al cine.", esCorrecta: false }
    ],
    explicacion: "En estilo indirecto, el presente de indicativo ('voy') se convierte en imperfecto de indicativo ('iba')."
  },

  // Sección 3: Expresiones Idiomáticas
  {
    tipo: "relacionar",
    titulo: "Expresiones con Comida",
    enunciado: "Relaciona cada expresión con su significado:",
    pares: [
      { "izquierda": "Estar en las nubes", "derecha": "Estar distraído" },
      { "izquierda": "Costar un ojo de la cara", "derecha": "Ser muy caro" },
      { "izquierda": "No tener pelos en la lengua", "derecha": "Decir lo que se piensa" },
      { "izquierda": "Meter la pata", "derecha": "Cometer un error" }
    ]
  },

  // Sección 4: Análisis Literario
  {
    tipo: "analisis_literario",
    titulo: "Poesía de Antonio Machado",
    texto: "Caminante, son tus huellas\nel camino y nada más;\nCaminante, no hay camino,\nse hace camino al andar.\nAl andar se hace el camino,\ny al volver la vista atrás\nse ve la senda que nunca\nse ha de volver a pisar.\nCaminante, no hay camino,\nsino estelas en la mar.",
    autor: "Antonio Machado - Proverbios y cantares XXIX",
    preguntas: [
      {
        pregunta: "¿Qué tema principal trata el poema?",
        opciones: [
          "El amor no correspondido",
          "La vida como camino personal",
          "La naturaleza salvaje",
          "La amistad verdadera"
        ],
        respuesta_correcta: "La vida como camino personal"
      },
      {
        pregunta: "¿Qué recurso literario predomina en el poema?",
        opciones: [
          "Hipérbaton",
          "Anáfora",
          "Metáfora",
          "Hipérbole"
        ],
        respuesta_correcta: "Anáfora"
      }
    ]
  },

  // Sección 5: Expresión Escrita
  {
    tipo: "expresion_escrita",
    titulo: "Redacción Literaria",
    consigna: "Escribe un breve texto (150-200 palabras) que incluya al menos tres de estas expresiones idiomáticas:\n- Estar en las nubes\n- Costar un ojo de la cara\n- No tener pelos en la lengua\n- Meter la pata\n\nContexto: Describe una situación cotidiana donde algo no salió como esperabas.",
    palabras_clave: ["expresiones", "situación", "cotidiana", "problema", "solución"]
  }
];

export default function LiteraturaExpresiones() {
  const router = useRouter();
  const { progress, markUnitCompleted } = useUserProgress();
  const levelProgress = progress.B1;
  const alreadyCompleted = levelProgress?.unitsCompleted?.[17] ?? false;
  const handleFinish = () => {
    if (!alreadyCompleted) {
      markUnitCompleted('B1', 17);
    }
    Alert.alert(
      'Unidad finalizada',
      'Vuelve al menú de B1 para continuar con la siguiente unidad.\nارجع إلى قائمة مستوى B1 لمتابعة الوحدة التالية.',
      [
        { text: 'Seguir estudiando', style: 'cancel' },
        { text: 'Ir al menú B1 / الذهاب إلى قائمة B1', onPress: () => router.replace('/B1_Umbral') }
      ]
    );
  };
  
  // Estados principales
  const [respuestas, setRespuestas] = useState<{[key: number]: any}>({});
  const [retroalimentacion, setRetroalimentacion] = useState<{[key: number]: {texto: string; esCorrecto: boolean | null}}>({});
  const [ejercicioActual, setEjercicioActual] = useState<number>(0);
  const [completado, setCompletado] = useState<boolean>(false);
  const [puntuacion, setPuntuacion] = useState<number>(0);
  const [mostrarSoluciones, setMostrarSoluciones] = useState<boolean>(false);

  const ejerciciosInteractivos: EjercicioInteractivo[] = [
    {
      tipo: 'opcion_multiple',
      enunciado: '¿Quién es el autor de "Don Quijote de la Mancha"?',
      opciones: [
        'Miguel de Cervantes',
        'Gabriel García Márquez',
        'Pablo Neruda',
        'Jorge Luis Borges'
      ],
      respuesta_correcta: 'Miguel de Cervantes',
    },
    {
      tipo: 'opcion_multiple',
      enunciado: '¿Qué figura literaria se repite en el poema "Caminante no hay camino"?',
      opciones: ['Metáfora', 'Anáfora', 'Hipérbole', 'Personificación'],
      respuesta_correcta: 'Anáfora',
    },
    {
      tipo: 'respuesta_corta',
      enunciado: 'Escribe una expresión idiomática española relacionada con las emociones.',
      respuesta_correcta: 'Libre',
    },
  ];

  // Manejadores de eventos
  const handleInput = (idx: number, value: string) => {
    setRespuestas(prev => ({
      ...prev,
      [idx]: value
    }));
  };

  const verificarRespuesta = (idx: number, respuesta: any) => {
    const ejercicio = ejercicios[idx];
    if (!ejercicio) return;
    
    let esCorrecto = false;
    let mensaje = "";

    switch(ejercicio.tipo) {
      case 'opcion_multiple':
        if (ejercicio.opciones && ejercicio.opciones[respuesta]) {
          esCorrecto = ejercicio.opciones[respuesta].esCorrecta;
          mensaje = esCorrecto 
            ? `¡Correcto! ${ejercicio.explicacion || ''}`
            : `Incorrecto. ${ejercicio.explicacion || 'Inténtalo de nuevo.'}`;
        } else {
          mensaje = "Error: No se pudo verificar la respuesta. Inténtalo de nuevo.";
        }
        break;
      
      case 'relacionar':
        // Lógica para verificar relaciones
        esCorrecto = true; // Simplificado para el ejemplo
        mensaje = esCorrecto 
          ? "¡Perfecto! Has relacionado correctamente las expresiones."
          : "Algunas relaciones no son correctas. Revisa tus respuestas.";
        break;
      
      // Otros casos...
    }

    setRetroalimentacion(prev => ({
      ...prev,
      [idx]: {
        texto: mensaje,
        esCorrecto: esCorrecto
      }
    }));

    if (esCorrecto) {
      setPuntuacion(prev => prev + 1);
    }
  };

  const renderEjercicio = (ejercicio: any, idx: number) => {
    switch(ejercicio.tipo) {
      case 'lectura_comprension':
        return (
          <View key={idx} style={styles.ejercicioContainer}>
            <Text style={styles.tituloSeccion}>Literatura Española</Text>
            {ejercicio.autor && <Text style={styles.autor}>{ejercicio.autor}</Text>}
            <Text style={styles.textoLiterario}>"{ejercicio.texto}"</Text>
            
            {ejercicio.preguntas.map((pregunta: any, i: number) => (
              <View key={i} style={styles.preguntaContainer}>
                <Text style={styles.pregunta}>{pregunta.pregunta}</Text>
                {pregunta.opciones.map((opcion: string, j: number) => (
                  <TouchableOpacity 
                    key={j} 
                    style={styles.opcion}
                    onPress={() => verificarRespuesta(idx, j)}
                  >
                    <Text>{opcion}</Text>
                  </TouchableOpacity>
                ))}
                {retroalimentacion[idx] && (
                  <Text style={[
                    styles.retroalimentacion, 
                    retroalimentacion[idx].esCorrecto ? styles.correcto : styles.incorrecto
                  ]}>
                    {retroalimentacion[idx].texto}
                  </Text>
                )}
              </View>
            ))}
          </View>
        );

      case 'opcion_multiple':
        return (
          <View key={idx} style={styles.ejercicioContainer}>
            <Text style={styles.tituloSeccion}>Gramática Española</Text>
            <Text style={styles.ejercicioTitulo}>{ejercicio.titulo}</Text>
            <Text style={styles.ejercicioEnunciado}>{ejercicio.enunciado}</Text>
            {ejercicio.opciones.map((opcion: any, i: number) => (
              <TouchableOpacity
                key={i}
                style={styles.opcion}
                onPress={() => verificarRespuesta(idx, i)}
              >
                <Text>{opcion.texto}</Text>
              </TouchableOpacity>
            ))}
            {retroalimentacion[idx] && (
              <Text style={[
                styles.retroalimentacion, 
                retroalimentacion[idx].esCorrecto ? styles.correcto : styles.incorrecto
              ]}>
                {retroalimentacion[idx].texto}
              </Text>
            )}
          </View>
        );

      case 'relacionar':
        return (
          <View key={idx} style={styles.ejercicioContainer}>
            <Text style={styles.tituloSeccion}>Expresiones Idiomáticas</Text>
            <Text style={styles.ejercicioTitulo}>{ejercicio.titulo}</Text>
            <Text style={styles.ejercicioEnunciado}>{ejercicio.enunciado}</Text>
            {ejercicio.pares.map((par: any, i: number) => (
              <View key={i} style={styles.parContainer}>
                <Text style={styles.parTexto}>{par.izquierda}</Text>
                <Text style={styles.parFlecha}>→</Text>
                <Text style={styles.parTexto}>{par.derecha}</Text>
              </View>
            ))}
            <TouchableOpacity
              style={styles.botonVerificar}
              onPress={() => verificarRespuesta(idx, null)}
            >
              <Text style={styles.textoBoton}>Verificar respuestas</Text>
            </TouchableOpacity>
            {retroalimentacion[idx] && (
              <Text style={[
                styles.retroalimentacion, 
                retroalimentacion[idx].esCorrecto ? styles.correcto : styles.incorrecto
              ]}>
                {retroalimentacion[idx].texto}
              </Text>
            )}
          </View>
        );

      case 'expresion_escrita':
        return (
          <View key={idx} style={styles.ejercicioContainer}>
            <Text style={styles.tituloSeccion}>Expresión Escrita</Text>
            <Text style={styles.ejercicioTitulo}>{ejercicio.titulo}</Text>
            <Text style={styles.ejercicioEnunciado}>{ejercicio.consigna}</Text>
            <TextInput
              style={styles.areaTexto}
              multiline
              numberOfLines={8}
              placeholder="Escribe tu respuesta aquí..."
              value={respuestas[idx] || ''}
              onChangeText={(text) => handleInput(idx, text)}
            />
            <Text style={styles.ayudaTexto}>Palabras clave: {ejercicio.palabras_clave.join(', ')}</Text>
          </View>
        );

      case 'analisis_literario':
        return (
          <View key={idx} style={styles.ejercicioContainer}>
            <Text style={styles.tituloSeccion}>Análisis Literario</Text>
            {ejercicio.autor && <Text style={styles.autor}>{ejercicio.autor}</Text>}
            <Text style={styles.textoPoetico}>"{ejercicio.texto}"</Text>
            
            {ejercicio.preguntas.map((pregunta: any, i: number) => (
              <View key={i} style={styles.preguntaContainer}>
                <Text style={styles.pregunta}>{pregunta.pregunta}</Text>
                {pregunta.opciones.map((opcion: string, j: number) => (
                  <TouchableOpacity 
                    key={j} 
                    style={styles.opcion}
                    onPress={() => verificarRespuesta(idx, j)}
                  >
                    <Text>{opcion}</Text>
                  </TouchableOpacity>
                ))}
                {retroalimentacion[idx] && (
                  <Text style={[
                    styles.retroalimentacion, 
                    retroalimentacion[idx].esCorrecto ? styles.correcto : styles.incorrecto
                  ]}>
                    {retroalimentacion[idx].texto}
                  </Text>
                )}
              </View>
            ))}
          </View>
        );

      default:
        return null;
    }
  };

  return (
    <ScrollView style={styles.contenedor}>
      <View style={styles.encabezado}>
        <TouchableOpacity onPress={() => router.back()} style={styles.botonAtras}>
          <Ionicons name="arrow-back" size={24} color="#79A890" />
        </TouchableOpacity>
        <Text style={styles.titulo}>Literatura y Expresiones</Text>
      </View>

      <View style={styles.contenido}>
        <Text style={styles.descripcion}>
          Explora la riqueza de la literatura española, mejora tu gramática y aprende expresiones idiomáticas útiles.
        </Text>

        {ejercicios.map((ejercicio, idx) => (
          <View key={idx}>
            {renderEjercicio(ejercicio, idx)}
            <View style={styles.separador} />
          </View>
        ))}

        <View style={styles.interactiveSection}>
          <Text style={styles.interactiveTitle}>Ejercicios de práctica</Text>
          <Text style={styles.interactiveText}>Practica lo que has aprendido con estos ejercicios interactivos.</Text>
          <Text style={styles.interactiveTextAr}>تدرب على ما تعلمته مع هذه التمارين التفاعلية.</Text>
        </View>

        <EjerciciosInteractivos ejercicios={ejerciciosInteractivos} onComplete={handleFinish} />

        <View style={styles.finishContainer}>
          <TouchableOpacity style={styles.finishButton} onPress={handleFinish} activeOpacity={0.8}>
            <LinearGradient
              colors={['#9DC3AA', '#79A890']}
              style={styles.finishButtonGradient}
            >
              <Text style={styles.finishButtonText}>Unidad finalizada</Text>
              <Text style={styles.finishButtonTextAr}>انتهت الوحدة</Text>
            </LinearGradient>
          </TouchableOpacity>
        </View>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  contenedor: {
    flex: 1,
    backgroundColor: '#f8f9fa',
  },
  encabezado: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 15,
    backgroundColor: '#fff',
    borderBottomWidth: 1,
    borderBottomColor: '#e1e1e1',
  },
  botonAtras: {
    marginRight: 15,
  },
  titulo: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#333',
  },
  contenido: {
    padding: 15,
  },
  descripcion: {
    fontSize: 16,
    color: '#555',
    marginBottom: 20,
    lineHeight: 24,
  },
  interactiveSection: {
    backgroundColor: '#fff',
    borderRadius: 10,
    padding: 16,
    marginBottom: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.08,
    shadowRadius: 3,
    elevation: 2,
  },
  interactiveTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#79A890',
    marginBottom: 8,
    textAlign: 'center',
  },
  interactiveText: {
    fontSize: 16,
    color: '#333',
    marginBottom: 4,
    textAlign: 'center',
  },
  interactiveTextAr: {
    fontSize: 16,
    color: '#333',
    textAlign: 'right',
    writingDirection: 'rtl',
  },
  ejercicioContainer: {
    backgroundColor: '#fff',
    borderRadius: 10,
    padding: 15,
    marginBottom: 15,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
  },
  tituloSeccion: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#79A890',
    marginBottom: 10,
  },
  ejercicioTitulo: {
    fontSize: 18,
    fontWeight: '600',
    marginBottom: 10,
    color: '#333',
  },
  ejercicioEnunciado: {
    fontSize: 16,
    marginBottom: 15,
    lineHeight: 22,
    color: '#444',
  },
  retroalimentacion: {
    marginTop: 10,
    padding: 10,
    borderRadius: 5,
    fontSize: 14,
  },
  opcion: {
    backgroundColor: '#f5f5f5',
    padding: 12,
    borderRadius: 8,
    marginBottom: 10,
    borderWidth: 1,
    borderColor: '#e0e0e0',
  },
  correcto: {
    backgroundColor: '#e8f5e9',
    color: '#2e7d32',
  },
  incorrecto: {
    backgroundColor: '#ffebee',
    color: '#c62828',
  },
  parContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10,
    padding: 10,
    backgroundColor: '#f5f5f5',
    borderRadius: 5,
  },
  parTexto: {
    flex: 1,
    textAlign: 'center',
  },
  parFlecha: {
    marginHorizontal: 10,
    color: '#666',
  },
  botonVerificar: {
    backgroundColor: '#79A890',
    padding: 12,
    borderRadius: 8,
    alignItems: 'center',
    marginTop: 10,
  },
  textoBoton: {
    color: '#fff',
    fontWeight: 'bold',
  },
  areaTexto: {
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 8,
    padding: 10,
    minHeight: 150,
    textAlignVertical: 'top',
    marginBottom: 10,
    backgroundColor: '#fff',
  },
  ayudaTexto: {
    fontSize: 12,
    color: '#666',
    fontStyle: 'italic',
  },
  textoLiterario: {
    fontStyle: 'italic',
    lineHeight: 24,
    marginBottom: 15,
    color: '#333',
  },
  textoPoetico: {
    fontStyle: 'italic',
    lineHeight: 28,
    marginBottom: 15,
    color: '#333',
    textAlign: 'center',
  },
  autor: {
    textAlign: 'right',
    color: '#666',
    marginBottom: 15,
    fontStyle: 'italic',
  },
  preguntaContainer: {
    marginBottom: 20,
  },
  pregunta: {
    fontSize: 16,
    fontWeight: '500',
    marginBottom: 10,
    color: '#333',
  },
  separador: {
    height: 1,
    backgroundColor: '#e0e0e0',
    marginVertical: 15,
  },
  finishContainer: {
    marginTop: 32,
    marginBottom: 48,
    width: '100%',
    alignItems: 'center',
  },
  finishButton: {
    borderRadius: 18,
    paddingVertical: 18,
    paddingHorizontal: 32,
    width: '100%',
    alignItems: 'center',
    overflow: 'hidden',
  },
  finishButtonText: {
    color: '#fff',
    fontSize: 20,
    fontWeight: 'bold',
  },
  finishButtonGradient: {
    width: '100%',
    alignItems: 'center',
    paddingVertical: 18,
    paddingHorizontal: 32,
  },
  finishButtonTextAr: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
    marginTop: 4,
    writingDirection: 'rtl',
  },
});
