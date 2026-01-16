import React, { useState } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, TextInput } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';

// Datos de ejercicios para Compras
const ejercicios = [
  {
    tipo: "rellenar_huecos",
    enunciado: "Completa: Voy a ______ al supermercado. (ترجمة: سأذهب إلى السوبر ماركت)",
    solucion: ["ir"]
  },
  {
    tipo: "rellenar_huecos",
    enunciado: "Completa: Necesito ______ leche y pan. (ترجمة: أحتاج شراء حليب وخبز)",
    solucion: ["comprar"]
  },
  {
    tipo: "opcion_multiple",
    enunciado: "¿Dónde compras la comida? (أين تشتري الطعام؟)",
    opciones: ["Supermercado", "Hospital", "Escuela", "Oficina"],
    respuesta_correcta: "Supermercado"
  },
  {
    tipo: "opcion_multiple",
    enunciado: "¿Qué significa 'oferta' en árabe? (ماذا تعني 'عرض' بالعربية؟)",
    opciones: ["سعر", "عرض", "جودة", "كمية"],
    respuesta_correcta: "عرض"
  },
  {
    tipo: "escribir",
    enunciado: "Describe tu experiencia de compras en España y las diferencias con tu país. (صف تجربتك في التسوق في إسبانيا والاختلافات مع بلدك)"
  },
  {
    tipo: "relacionar",
    enunciado: "Relaciona las palabras de compras con su traducción (صل كلمات التسوق بترجمتها):",
    pares: [
      {"izquierda": "Supermercado", "derecha": "سوبر ماركت"},
      {"izquierda": "Oferta", "derecha": "عرض"},
      {"izquierda": "Precio", "derecha": "سعر"}
    ]
  }
];

export default function Compras() {
  const router = useRouter();
  const [respuestas, setRespuestas] = useState<any>({});
  const [feedback, setFeedback] = useState<any>({});

  const handleInput = (idx: number, value: string | string[]) => {
    setRespuestas((prev: any) => ({ ...prev, [idx]: value }));
  };

  const checkRellenarHuecos = (idx: number, solucion: string[]) => {
    const user = respuestas[idx] || [];
    const ok = Array.isArray(user) && user.length === solucion.length && user.every((v, i) => v.trim().toLowerCase() === solucion[i].toLowerCase());
    setFeedback((prev: any) => ({ ...prev, [idx]: ok ? '¡Correcto!' : 'Incorrecto' }));
  };

  const checkOpcionMultiple = (idx: number, correcta: string, seleccion: string) => {
    setRespuestas((prev: any) => ({ ...prev, [idx]: seleccion }));
    setFeedback((prev: any) => ({ ...prev, [idx]: seleccion === correcta ? '¡Correcto!' : 'Incorrecto' }));
  };

  const renderEjercicio = (ejercicio: any, idx: number) => {
    switch (ejercicio.tipo) {
      case "rellenar_huecos":
        return (
          <View key={idx} style={styles.ejercicioContainer}>
            <Text style={styles.ejercicioTitulo}>Ejercicio {idx + 1}: Rellenar huecos</Text>
            <Text style={styles.ejercicioEnunciado}>{ejercicio.enunciado}</Text>
            <View style={styles.inputContainer}>
              {ejercicio.solucion.map((_: any, i: number) => (
                <TextInput
                  key={i}
                  style={styles.textInput}
                  placeholder={`Hueco ${i + 1}`}
                  value={respuestas[idx]?.[i] || ''}
                  onChangeText={(text) => {
                    const newRespuestas = [...(respuestas[idx] || [])];
                    newRespuestas[i] = text;
                    handleInput(idx, newRespuestas);
                  }}
                />
              ))}
            </View>
            <TouchableOpacity
              style={styles.checkButton}
              onPress={() => checkRellenarHuecos(idx, ejercicio.solucion)}
            >
              <Text style={styles.checkButtonText}>Comprobar</Text>
            </TouchableOpacity>
            {feedback[idx] && (
              <Text style={[styles.feedback, { color: feedback[idx] === '¡Correcto!' ? '#4CAF50' : '#f44336' }]}>
                {feedback[idx]}
              </Text>
            )}
          </View>
        );

      case "opcion_multiple":
        return (
          <View key={idx} style={styles.ejercicioContainer}>
            <Text style={styles.ejercicioTitulo}>Ejercicio {idx + 1}: Opción múltiple</Text>
            <Text style={styles.ejercicioEnunciado}>{ejercicio.enunciado}</Text>
            {ejercicio.opciones.map((opcion: string, i: number) => (
              <TouchableOpacity
                key={i}
                style={[
                  styles.opcionButton,
                  respuestas[idx] === opcion && styles.opcionSeleccionada
                ]}
                onPress={() => checkOpcionMultiple(idx, ejercicio.respuesta_correcta, opcion)}
              >
                <Text style={[
                  styles.opcionText,
                  respuestas[idx] === opcion && styles.opcionTextSeleccionada
                ]}>
                  {opcion}
                </Text>
              </TouchableOpacity>
            ))}
            {feedback[idx] && (
              <Text style={[styles.feedback, { color: feedback[idx] === '¡Correcto!' ? '#4CAF50' : '#f44336' }]}>
                {feedback[idx]}
              </Text>
            )}
          </View>
        );

      case "escribir":
        return (
          <View key={idx} style={styles.ejercicioContainer}>
            <Text style={styles.ejercicioTitulo}>Ejercicio {idx + 1}: Escribir</Text>
            <Text style={styles.ejercicioEnunciado}>{ejercicio.enunciado}</Text>
            <TextInput
              style={styles.textArea}
              placeholder="Escribe tu respuesta aquí..."
              multiline
              numberOfLines={4}
              value={respuestas[idx] || ''}
              onChangeText={(text) => handleInput(idx, text)}
            />
          </View>
        );

      case "relacionar":
        return (
          <View key={idx} style={styles.ejercicioContainer}>
            <Text style={styles.ejercicioTitulo}>Ejercicio {idx + 1}: Relacionar</Text>
            <Text style={styles.ejercicioEnunciado}>{ejercicio.enunciado}</Text>
            {ejercicio.pares.map((par: any, i: number) => (
              <View key={i} style={styles.parContainer}>
                <Text style={styles.parTexto}>{par.izquierda}</Text>
                <Text style={styles.parFlecha}>→</Text>
                <Text style={styles.parTexto}>{par.derecha}</Text>
              </View>
            ))}
          </View>
        );

      default:
        return null;
    }
  };

  return (
    <ScrollView style={{ backgroundColor: '#f5f7fa' }} contentContainerStyle={styles.container}>
      <TouchableOpacity
        style={styles.backButton}
        onPress={() => router.replace('/B1_Umbral')}
        accessibilityLabel="Volver al menú B1: Umbral"
      >
        <Ionicons name="arrow-back" size={28} color="#1976d2" />
      </TouchableOpacity>
      <Text style={styles.title}>Compras y consumo</Text>
      <Text style={styles.titleAr}>التسوق والاستهلاك</Text>
      
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Contexto</Text>
        <Text style={styles.sectionText}>Conversación sobre compras, precios, ofertas y hábitos de consumo.</Text>
        <Text style={styles.sectionTextAr}>محادثة حول التسوق والأسعار والعروض وعادات الاستهلاك.</Text>
      </View>
      
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Vocabulario clave</Text>
        <Text style={styles.sectionText}>supermercado = سوبر ماركت{"\n"}precio = سعر{"\n"}oferta = عرض{"\n"}descuento = خصم{"\n"}calidad = جودة{"\n"}barato = رخيص</Text>
      </View>
      
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Ejemplo de interacción</Text>
        <Text style={styles.sectionText}>¿Dónde sueles hacer la compra? ¿Buscas ofertas?{"\n"}Voy al supermercado cerca de casa y siempre busco las ofertas.</Text>
        <Text style={styles.sectionTextAr}>أين عادة تقوم بالتسوق؟ هل تبحث عن العروض؟{"\n"}أذهب إلى السوبر ماركت القريب من البيت ودائمًا أبحث عن العروض.</Text>
      </View>

      {/* Sección de Ejercicios */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Ejercicios de práctica</Text>
        <Text style={styles.sectionText}>Practica lo que has aprendido con estos ejercicios interactivos.</Text>
        <Text style={styles.sectionTextAr}>تدرب على ما تعلمته مع هذه التمارين التفاعلية.</Text>
      </View>

      {ejercicios.map((ejercicio, idx) => renderEjercicio(ejercicio, idx))}

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Actividad</Text>
        <Text style={styles.sectionText}>Haz una lista de compras semanal y calcula el presupuesto.</Text>
        <Text style={styles.sectionTextAr}>اصنع قائمة تسوق أسبوعية واحسب الميزانية.</Text>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    alignItems: 'center',
    padding: 24,
    backgroundColor: '#f5f7fa',
  },
  backButton: {
    alignSelf: 'flex-start',
    backgroundColor: '#e0e0e0',
    paddingVertical: 8,
    paddingHorizontal: 16,
    borderRadius: 8,
    marginBottom: 16,
    marginTop: 16,
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#388e3c',
    marginBottom: 4,
    textAlign: 'center',
  },
  titleAr: {
    fontSize: 26,
    fontWeight: 'bold',
    color: '#388e3c',
    marginBottom: 16,
    textAlign: 'center',
    writingDirection: 'rtl',
  },
  section: {
    backgroundColor: '#fff',
    borderRadius: 12,
    padding: 18,
    marginBottom: 16,
    width: '100%',
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.07,
    shadowRadius: 2,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#1976d2',
    marginBottom: 6,
  },
  sectionText: {
    fontSize: 16,
    color: '#333',
    marginBottom: 2,
  },
  sectionTextAr: {
    fontSize: 16,
    color: '#333',
    writingDirection: 'rtl',
    marginBottom: 2,
    fontFamily: 'System',
  },
  // Estilos para ejercicios
  ejercicioContainer: {
    backgroundColor: '#fff',
    borderRadius: 12,
    padding: 18,
    marginBottom: 16,
    width: '100%',
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.07,
    shadowRadius: 2,
  },
  ejercicioTitulo: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#1976d2',
    marginBottom: 8,
  },
  ejercicioEnunciado: {
    fontSize: 16,
    color: '#333',
    marginBottom: 12,
    lineHeight: 22,
  },
  inputContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 8,
    marginBottom: 12,
  },
  textInput: {
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 8,
    padding: 12,
    fontSize: 16,
    minWidth: 120,
    backgroundColor: '#f9f9f9',
  },
  textArea: {
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 8,
    padding: 12,
    fontSize: 16,
    minHeight: 100,
    backgroundColor: '#f9f9f9',
    textAlignVertical: 'top',
  },
  checkButton: {
    backgroundColor: '#1976d2',
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 8,
    alignSelf: 'flex-start',
  },
  checkButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
  feedback: {
    fontSize: 16,
    fontWeight: 'bold',
    marginTop: 8,
  },
  opcionButton: {
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 8,
    padding: 12,
    marginBottom: 8,
    backgroundColor: '#f9f9f9',
  },
  opcionSeleccionada: {
    backgroundColor: '#1976d2',
    borderColor: '#1976d2',
  },
  opcionText: {
    fontSize: 16,
    color: '#333',
  },
  opcionTextSeleccionada: {
    color: '#fff',
    fontWeight: 'bold',
  },
  parContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingVertical: 8,
    borderBottomWidth: 1,
    borderBottomColor: '#eee',
  },
  parTexto: {
    fontSize: 16,
    color: '#333',
    flex: 1,
  },
  parFlecha: {
    fontSize: 18,
    color: '#1976d2',
    marginHorizontal: 12,
  },
});
