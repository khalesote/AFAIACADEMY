import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ScrollView, TextInput, Image, ViewStyle, TextStyle, ImageStyle, Alert } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { Link, useRouter } from 'expo-router';
import { useUserProgress } from '@/contexts/UserProgressContext';
import { LinearGradient } from 'expo-linear-gradient';

// Definir los tipos para los ejercicios
type EjercicioRelacionar = {
  tipo: 'relacionar_ingredientes';
  titulo: string;
  instruccion: string;
  pares: Array<{
    id: number;
    ingrediente: string;
    descripcion: string;
  }>;
};

type Ejercicio = EjercicioRelacionar;

// Definir el tipo para los países y sus platos
type Plato = {
  nombre: string;
  descripcion: string;
  ingredientes: string[];
  imagen: string;
};

type Pais = {
  id: string;
  nombre: string;
  descripcion: string;
  color: string; // Agregado
  platos: Plato[];
};

const paises: Pais[] = [
  {
    id: 'es',
    nombre: 'España',
    descripcion: 'Cocina mediterránea con influencias de diversas regiones',
    color: '#FF6B35',
    platos: [
      {
        nombre: 'Paella Valenciana',
        descripcion: 'Arroz con mariscos, pollo, conejo y verduras. Se cocina en paellera y se sazona con azafrán.',
        ingredientes: ['arroz', 'azafrán', 'mariscos', 'pollo', 'conejo', 'judías verdes', 'garrofón'],
        imagen: 'https://via.placeholder.com/150'
      },
      {
        nombre: 'Tortilla Española',
        descripcion: 'Tortilla de huevos con patatas y cebolla. Es uno de los platos más populares de España.',
        ingredientes: ['huevos', 'patatas', 'cebolla', 'aceite de oliva', 'sal'],
        imagen: 'https://via.placeholder.com/150'
      },
      {
        nombre: 'Gazpacho Andaluz',
        descripcion: 'Sopa fría de tomate, pepino, pimiento y ajo. Perfecta para el verano.',
        ingredientes: ['tomate', 'pepino', 'pimiento', 'ajo', 'aceite de oliva', 'vinagre', 'pan'],
        imagen: 'https://via.placeholder.com/150'
      },
      {
        nombre: 'Jamón Ibérico',
        descripcion: 'Jamón curado de cerdo ibérico. Se considera uno de los mejores jamones del mundo.',
        ingredientes: ['cerdo ibérico', 'sal', 'tiempo de curación'],
        imagen: 'https://via.placeholder.com/150'
      },
      {
        nombre: 'Pulpo a la Gallega',
        descripcion: 'Pulpo cocido con patatas, aceite de oliva y pimentón. Típico de Galicia.',
        ingredientes: ['pulpo', 'patatas', 'aceite de oliva', 'pimentón', 'sal'],
        imagen: 'https://via.placeholder.com/150'
      }
    ]
  },
  {
    id: 'mx',
    nombre: 'México',
    descripcion: 'Cocina rica en sabores picantes y especias',
    color: '#00A86B',
    platos: [
      {
        nombre: 'Tacos al Pastor',
        descripcion: 'Tacos de carne de cerdo adobada con piña, cebolla y cilantro.',
        ingredientes: ['carne de cerdo', 'achiote', 'piña', 'cebolla', 'cilantro', 'tortillas'],
        imagen: 'https://via.placeholder.com/150'
      },
      {
        nombre: 'Mole Poblano',
        descripcion: 'Salsa compleja con chocolate y chiles. Típica de Puebla.',
        ingredientes: ['chocolate', 'chiles', 'especias', 'pollo', 'almendras'],
        imagen: 'https://via.placeholder.com/150'
      },
      {
        nombre: 'Guacamole',
        descripcion: 'Salsa de aguacate con tomate, cebolla y limón.',
        ingredientes: ['aguacate', 'tomate', 'cebolla', 'limón', 'cilantro', 'sal'],
        imagen: 'https://via.placeholder.com/150'
      },
      {
        nombre: 'Chiles en Nogada',
        descripcion: 'Chiles rellenos con salsa de nueces. Plato festivo.',
        ingredientes: ['chiles poblanos', 'nueces', 'granada', 'carne picada'],
        imagen: 'https://via.placeholder.com/150'
      }
    ]
  },
  {
    id: 'ar',
    nombre: 'Argentina',
    descripcion: 'Famosa por sus carnes a la parrilla y vinos',
    color: '#87CEEB',
    platos: [
      {
        nombre: 'Asado',
        descripcion: 'Parrillada de diferentes cortes de carne. Evento social importante.',
        ingredientes: ['carne de res', 'sal gruesa', 'carbón o leña', 'chorizo', 'morcilla'],
        imagen: 'https://via.placeholder.com/150'
      },
      {
        nombre: 'Empanadas',
        descripcion: 'Pasteles rellenos de carne, pollo o verduras.',
        ingredientes: ['masa', 'carne picada', 'cebolla', 'huevo duro', 'aceitunas'],
        imagen: 'https://via.placeholder.com/150'
      },
      {
        nombre: 'Dulce de Leche',
        descripcion: 'Caramelo de leche condensada. Muy popular en postres.',
        ingredientes: ['leche', 'azúcar', 'bicarbonato', 'vainilla'],
        imagen: 'https://via.placeholder.com/150'
      },
      {
        nombre: 'Mate',
        descripcion: 'Infusión tradicional de yerba mate. Bebida social.',
        ingredientes: ['yerba mate', 'agua caliente', 'azúcar (opcional)'],
        imagen: 'https://via.placeholder.com/150'
      }
    ]
  },
  {
    id: 'pe',
    nombre: 'Perú',
    descripcion: 'Cocina fusión con influencias indígenas, españolas y asiáticas',
    color: '#FFD700',
    platos: [
      {
        nombre: 'Ceviche',
        descripcion: 'Pescado crudo marinado en limón y ají. Plato nacional.',
        ingredientes: ['pescado blanco', 'limón', 'ají', 'cebolla', 'cilantro'],
        imagen: 'https://via.placeholder.com/150'
      },
      {
        nombre: 'Lomo Saltado',
        descripcion: 'Carne salteada con cebolla, tomate y papas fritas.',
        ingredientes: ['carne de res', 'cebolla', 'tomate', 'papas', 'ají amarillo'],
        imagen: 'https://via.placeholder.com/150'
      },
      {
        nombre: 'Pisco Sour',
        descripcion: 'Cóctel nacional con pisco, limón, clara de huevo y amargo de angostura.',
        ingredientes: ['pisco', 'limón', 'clara de huevo', 'azúcar', 'amargo de angostura'],
        imagen: 'https://via.placeholder.com/150'
      }
    ]
  },
  {
    id: 'co',
    nombre: 'Colombia',
    descripcion: 'Cocina diversa con influencias caribeñas y andinas',
    color: '#FF6B6B',
    platos: [
      {
        nombre: 'Bandeja Paisa',
        descripcion: 'Plato completo con arroz, frijoles, carne, plátano y aguacate.',
        ingredientes: ['arroz', 'frijoles', 'carne', 'plátano', 'aguacate', 'huevo'],
        imagen: 'https://via.placeholder.com/150'
      },
      {
        nombre: 'Arepas',
        descripcion: 'Tortillas de maíz rellenas. Base de la alimentación.',
        ingredientes: ['harina de maíz', 'agua', 'sal', 'queso', 'mantequilla'],
        imagen: 'https://via.placeholder.com/150'
      },
      {
        nombre: 'Ajiaco',
        descripcion: 'Sopa de pollo con tres tipos de papa. Típico de Bogotá.',
        ingredientes: ['pollo', 'papas', 'maíz', 'guascas', 'crema de leche'],
        imagen: 'https://via.placeholder.com/150'
      }
    ]
  }
];

// Crear platosPorPais basado en el array paises
const platosPorPais = paises.reduce((acc, pais) => {
  acc[pais.id] = pais.platos;
  return acc;
}, {} as Record<string, Plato[]>);

// Definir los ejercicios
const ejerciciosIniciales: Ejercicio[] = [
  {
    tipo: 'relacionar_ingredientes',
    titulo: 'Relaciona los ingredientes con sus descripciones',
    instruccion: 'Relaciona cada ingrediente con su descripción correspondiente',
    pares: [
      {
        id: 1,
        ingrediente: 'Aceitunas',
        descripcion: 'Fruto del olivo, muy típico en la dieta mediterránea'
      },
      {
        id: 2,
        ingrediente: 'Pimentón',
        descripcion: 'Condimento hecho de pimientos rojos secos y molidos'
      },
      {
        id: 3,
        ingrediente: 'Azafrán',
        descripcion: 'Especia muy valorada por su color y sabor'
      },
      {
        id: 4,
        ingrediente: 'Chorizo',
        descripcion: 'Embutido curado con pimentón'
      },
      {
        id: 5,
        ingrediente: 'Achiote',
        descripcion: 'Condimento de color rojo usado en la cocina mexicana'
      },
      {
        id: 6,
        ingrediente: 'Yerba Mate',
        descripcion: 'Planta usada para hacer la infusión tradicional argentina'
      }
    ]
  }
];

export default function GastronomiaHispana() {
  const router = useRouter();
  const { progress, markUnitCompleted } = useUserProgress();
  const levelProgress = progress.B1;
  const alreadyCompleted = levelProgress?.unitsCompleted?.[9] ?? false;
  const [paisSeleccionado, setPaisSeleccionado] = useState<string>('es');
  const [ejercicioActual, setEjercicioActual] = useState<number>(0);
  const [respuestas, setRespuestas] = useState<Record<number, any>>({});
  const [feedback, setFeedback] = useState<{mensaje: string; esCorrecto: boolean} | null>(null);

  // Obtener el país seleccionado actualmente
  const paisActual = paises.find(p => p.id === paisSeleccionado) || paises[0];

  const handleInput = (idx: number, value: string) => {
    setRespuestas(prev => ({
      ...prev,
      [idx]: value
    }));
  };

  // Function to verify user answers
  const verificarRespuesta = (): void => {
    const ejercicio = ejerciciosIniciales[ejercicioActual];
    if (!ejercicio) return;

    if (ejercicio.tipo === 'relacionar_ingredientes') {
      // Verificar si todas las relaciones son correctas
      const todasCorrectas = ejercicio.pares.every(par => 
        respuestas[par.id] === par.descripcion
      );
      
      setFeedback({
        mensaje: todasCorrectas ? 
          '¡Correcto! Has relacionado bien todos los ingredientes.' : 
          'Algunas relaciones no son correctas. Inténtalo de nuevo.',
        esCorrecto: todasCorrectas
      });
    }
  };

  const handleFinish = () => {
    if (!alreadyCompleted) {
      markUnitCompleted('B1', 9);
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

  const renderEjercicio = () => {
    const ejercicio = ejerciciosIniciales[ejercicioActual];

    if (!ejercicio) {
      return null;
    }

    if (ejercicio.tipo === 'relacionar_ingredientes') {
      return (
        <View style={styles.relacionarContainer}>
          <Text style={styles.instruccion}>{ejercicio.instruccion}</Text>

          {ejercicio.pares.map((par) => (
            <View key={par.id} style={styles.relacionItem}>
              <View style={styles.relacionTextoContainer}>
                <Text style={styles.relacionIngrediente}>{par.ingrediente}</Text>
                <Text style={styles.relacionDescripcion}>{par.descripcion}</Text>
              </View>

              <TouchableOpacity
                style={[styles.selectorRespuesta, respuestas[par.id] === par.descripcion && styles.selectorRespuestaActivo]}
                onPress={() => {
                  setRespuestas((prev) => ({
                    ...prev,
                    [par.id]: par.descripcion,
                  }));
                }}
              >
                <Text style={styles.selectorRespuestaTexto}>
                  {respuestas[par.id] ? 'Seleccionado' : 'Seleccionar'}
                </Text>
              </TouchableOpacity>
            </View>
          ))}

          <TouchableOpacity style={styles.botonVerificar} onPress={verificarRespuesta}>
            <Text style={styles.textoBotonVerificar}>Verificar respuestas</Text>
          </TouchableOpacity>

          {feedback && (
            <View
              style={[
                styles.feedback,
                feedback.esCorrecto ? styles.feedbackCorrecto : styles.feedbackIncorrecto,
              ]}
            >
              <Text style={styles.textoFeedback}>{feedback.mensaje}</Text>
            </View>
          )}
        </View>
      );
    }

    return null;
  };

  return (
    <ScrollView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.titulo}>Gastronomía Hispana</Text>
        <Text style={styles.subtitulo}>Nivel B1 - Cultura y Alimentación</Text>
      </View>

      <View style={styles.contenido}>
        <Text style={styles.descripcion}>
          Explora la rica diversidad culinaria del mundo hispanohablante, desde las tapas españolas 
          hasta los sabores picantes de México, pasando por los asados argentinos.
        </Text>

        <View style={styles.seccionPaises}>
          <Text style={styles.tituloSeccion}>Platos por país</Text>
          <ScrollView 
            horizontal 
            showsHorizontalScrollIndicator={false}
            contentContainerStyle={styles.selectorPaises}
          >
            {paises.map((pais) => (
              <TouchableOpacity
                key={pais.id}
                style={[
                  styles.botonPais,
                  paisSeleccionado === pais.id && {
                    backgroundColor: pais.color,
                    borderColor: pais.color,
                  }
                ]}
                onPress={() => setPaisSeleccionado(pais.id)}
              >
                <Text style={[
                  styles.textoBotonPais,
                  paisSeleccionado === pais.id && styles.textoBotonPaisSeleccionado
                ]}>
                  {pais.nombre}
                </Text>
              </TouchableOpacity>
            ))}
          </ScrollView>

          {paisSeleccionado && (
            <View style={styles.listaPlatos}>
              {platosPorPais[paisSeleccionado]?.map((plato, i) => (
                <View key={i} style={styles.platoContainer}>
                  <Text style={styles.nombrePlato}>{plato.nombre}</Text>
                  <Text style={styles.ingredientes}>
                    <Text style={styles.etiqueta}>Ingredientes: </Text>
                    {plato.ingredientes.join(', ')}.
                  </Text>
                  <Text style={styles.descripcionPlato}>{plato.descripcion}</Text>
                  {plato.imagen && (
                    <Image 
                      source={{ uri: plato.imagen }} 
                      style={styles.imagenPlato}
                      resizeMode="cover"
                    />
                  )}
                </View>
              ))}
            </View>
          )}
        </View>

        {/* Sección de ejercicios */}
        <View style={styles.seccionEjercicios}>
          <Text style={styles.tituloSeccion}>Ejercicios</Text>
          {renderEjercicio()}
          
          <View style={styles.navegacionEjercicios}>
            <TouchableOpacity
              style={[styles.botonNavegacion, ejercicioActual === 0 && styles.botonDeshabilitado]}
              onPress={() => {
                if (ejercicioActual > 0) {
                  setEjercicioActual(ejercicioActual - 1);
                  setFeedback(null);
                  setRespuestas({});
                }
              }}
              disabled={ejercicioActual === 0}
            >
              <Text style={styles.textoBotonNavegacion}>Anterior</Text>
            </TouchableOpacity>
            
            <Text style={styles.indicadorEjercicio}>
              {ejercicioActual + 1} / {ejerciciosIniciales.length}
            </Text>
            
            <TouchableOpacity
              style={[
                styles.botonNavegacion, 
                ejercicioActual === ejerciciosIniciales.length - 1 && styles.botonDeshabilitado
              ]}
              onPress={() => {
                if (ejercicioActual < ejerciciosIniciales.length - 1) {
                  setEjercicioActual(ejercicioActual + 1);
                  setFeedback(null);
                  setRespuestas({});
                }
              }}
              disabled={ejercicioActual === ejerciciosIniciales.length - 1}
            >
              <Text style={styles.textoBotonNavegacion}>Siguiente</Text>
            </TouchableOpacity>
          </View>
        </View>

        {/* Contenido educativo adicional */}
        <View style={styles.seccionContenido}>
          <Text style={styles.tituloSeccion}>Cultura gastronómica hispana</Text>
          
          <View style={styles.subseccion}>
            <Text style={styles.subtituloSeccion}>Influencias históricas</Text>
            <Text style={styles.textoContenido}>
              La gastronomía hispana es el resultado de siglos de influencias culturales:
              {"\n\n"}
              • <Text style={styles.textoDestacado}>Árabe:</Text> Introdujo el azafrán, las almendras, el arroz y las especias
              {"\n"}
              • <Text style={styles.textoDestacado}>Romana:</Text> Trajo el aceite de oliva, el vino y técnicas de conservación
              {"\n"}
              • <Text style={styles.textoDestacado}>Indígena americana:</Text> Contribuyó con el maíz, la papa, el tomate y el chocolate
              {"\n"}
              • <Text style={styles.textoDestacado}>Africana:</Text> Añadió sabores y técnicas de cocción
            </Text>
          </View>

          <View style={styles.subseccion}>
            <Text style={styles.subtituloSeccion}>Técnicas culinarias</Text>
            <Text style={styles.textoContenido}>
              • <Text style={styles.textoDestacado}>Sofreír:</Text> Cocinar a fuego lento con aceite
              {"\n"}
              • <Text style={styles.textoDestacado}>Guisar:</Text> Cocinar en líquido a fuego bajo
              {"\n"}
              • <Text style={styles.textoDestacado}>Asar:</Text> Cocinar con calor seco
              {"\n"}
              • <Text style={styles.textoDestacado}>Marinar:</Text> Conservar en líquido ácido
              {"\n"}
              • <Text style={styles.textoDestacado}>Curar:</Text> Conservar con sal y tiempo
            </Text>
          </View>

          <View style={styles.subseccion}>
            <Text style={styles.subtituloSeccion}>Ingredientes fundamentales</Text>
            <Text style={styles.textoContenido}>
              • <Text style={styles.textoDestacado}>Aceite de oliva:</Text> Base de la cocina mediterránea
              {"\n"}
              • <Text style={styles.textoDestacado}>Ajo:</Text> Aromatizante esencial
              {"\n"}
              • <Text style={styles.textoDestacado}>Cebolla:</Text> Base de muchos sofritos
              {"\n"}
              • <Text style={styles.textoDestacado}>Tomate:</Text> Ingrediente versátil
              {"\n"}
              • <Text style={styles.textoDestacado}>Especias:</Text> Azafrán, pimentón, comino
            </Text>
          </View>

          <View style={styles.subseccion}>
            <Text style={styles.subtituloSeccion}>Consejos para cocinar</Text>
            <Text style={styles.textoContenido}>
              • Usa ingredientes frescos y de temporada
              {"\n"}
              • Respeta los tiempos de cocción
              {"\n"}
              • Prueba y ajusta la sal al final
              {"\n"}
              • No tengas miedo de experimentar
              {"\n"}
              • Cocina con paciencia y amor
            </Text>
          </View>
        </View>
      </View>
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
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f7fa',
  },
  header: {
    padding: 24,
    alignItems: 'center',
    backgroundColor: '#fff',
    borderBottomWidth: 1,
    borderBottomColor: '#e0e0e0',
  },
  titulo: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#2c3e50',
    marginBottom: 6,
  },
  subtitulo: {
    fontSize: 16,
    color: '#607d8b',
  },
  contenido: {
    padding: 20,
    gap: 28,
  },
  descripcion: {
    fontSize: 16,
    lineHeight: 24,
    color: '#37474f',
    textAlign: 'center',
  },
  seccionPaises: {
    backgroundColor: '#fff',
    borderRadius: 16,
    padding: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.06,
    shadowRadius: 4,
    elevation: 2,
  },
  tituloSeccion: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#263238',
    marginBottom: 12,
  },
  selectorPaises: {
    flexDirection: 'row',
    gap: 12,
    paddingVertical: 6,
    paddingHorizontal: 4,
  },
  botonPais: {
    paddingVertical: 10,
    paddingHorizontal: 18,
    borderWidth: 2,
    borderColor: '#cfd8dc',
    borderRadius: 24,
    backgroundColor: '#fff',
  },
  textoBotonPais: {
    fontSize: 14,
    fontWeight: '600',
    color: '#37474f',
  },
  textoBotonPaisSeleccionado: {
    color: '#fff',
  },
  listaPlatos: {
    marginTop: 16,
    gap: 16,
  },
  platoContainer: {
    backgroundColor: '#f7fafc',
    borderRadius: 12,
    padding: 16,
    borderWidth: 1,
    borderColor: '#e3f2fd',
    gap: 8,
  },
  nombrePlato: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#1a237e',
  },
  ingredientes: {
    fontSize: 14,
    color: '#546e7a',
    lineHeight: 20,
  },
  etiqueta: {
    fontWeight: 'bold',
    color: '#0d47a1',
  },
  descripcionPlato: {
    fontSize: 14,
    color: '#37474f',
    lineHeight: 21,
  },
  imagenPlato: {
    width: '100%',
    height: 160,
    borderRadius: 12,
    marginTop: 8,
  },
  seccionEjercicios: {
    backgroundColor: '#fff',
    borderRadius: 16,
    padding: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.06,
    shadowRadius: 4,
    elevation: 2,
    gap: 16,
  },
  instruccion: {
    fontSize: 16,
    color: '#37474f',
    marginBottom: 12,
  },
  relacionarContainer: {
    gap: 16,
  },
  relacionItem: {
    flexDirection: 'row',
    backgroundColor: '#f9fbff',
    padding: 12,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: '#e3f2fd',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  relacionTextoContainer: {
    flex: 1,
    marginRight: 12,
  },
  relacionIngrediente: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#1a237e',
  },
  relacionDescripcion: {
    fontSize: 14,
    color: '#455a64',
    marginTop: 4,
  },
  selectorRespuesta: {
    paddingVertical: 8,
    paddingHorizontal: 12,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#bbdefb',
    backgroundColor: '#e3f2fd',
  },
  selectorRespuestaActivo: {
    borderColor: '#79A890',
    backgroundColor: '#bbdefb',
  },
  selectorRespuestaTexto: {
    color: '#0d47a1',
    fontWeight: '600',
    fontSize: 13,
  },
  recetaContainer: {
    gap: 16,
  },
  tituloReceta: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#1a237e',
    textAlign: 'center',
  },
  pasoReceta: {
    backgroundColor: '#f7fafc',
    borderRadius: 12,
    padding: 14,
    borderWidth: 1,
    borderColor: '#e3f2fd',
    gap: 6,
  },
  pasoNumero: {
    fontSize: 14,
    fontWeight: '600',
    color: '#79A890',
  },
  pasoTexto: {
    fontSize: 14,
    lineHeight: 22,
    color: '#37474f',
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
  inputReceta: {
    minWidth: 80,
    borderBottomWidth: 1,
    borderBottomColor: '#79A890',
    marginHorizontal: 3,
    paddingHorizontal: 3,
    textAlign: 'center',
    color: '#2c3e50',
    fontWeight: '500',
  },
  inputIncorrecto: {
    borderBottomColor: '#ff6b6b',
    backgroundColor: '#fff5f5',
  },
  botonVerificar: {
    backgroundColor: '#79A890',
    padding: 12,
    borderRadius: 8,
    alignItems: 'center',
    marginTop: 10,
  },
  textoBotonVerificar: {
    color: '#fff',
    fontWeight: '600',
    fontSize: 14,
  },
  feedback: {
    marginTop: 10,
    padding: 10,
    borderRadius: 6,
  },
  feedbackCorrecto: {
    backgroundColor: '#e8f5e9',
  },
  feedbackIncorrecto: {
    backgroundColor: '#ffebee',
  },
  textoFeedback: {
    fontSize: 14,
    lineHeight: 20,
    textAlign: 'center',
  },
  navegacionEjercicios: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: 20,
  },
  botonNavegacion: {
    backgroundColor: '#79A890',
    paddingVertical: 8,
    paddingHorizontal: 15,
    borderRadius: 6,
  },
  botonDeshabilitado: {
    backgroundColor: '#ccc',
  },
  textoBotonNavegacion: {
    color: '#fff',
    fontSize: 14,
  },
  indicadorEjercicio: {
    fontSize: 16,
    color: '#333',
    fontWeight: '600',
  },
  seccionContenido: {
    marginTop: 30,
    backgroundColor: '#fff',
    borderRadius: 12,
    padding: 20,
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.07,
    shadowRadius: 2,
  },
  subseccion: {
    marginBottom: 20,
  },
  subtituloSeccion: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#2c3e50',
    marginBottom: 10,
  },
  textoContenido: {
    fontSize: 16,
    lineHeight: 24,
    color: '#333',
  },
  textoDestacado: {
    fontWeight: 'bold',
    color: '#79A890',
  },
  sectionText: {
    fontSize: 16,
    lineHeight: 24,
    color: '#37474f',
  },
  sectionTextAr: {
    fontSize: 16,
    lineHeight: 24,
    color: '#37474f',
    writingDirection: 'rtl',
    textAlign: 'right',
  },
  subtitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#1a237e',
  },
  benefit: {
    fontWeight: 'bold',
    color: '#79A890',
  },
  tip: {
    fontWeight: 'bold',
    color: '#ef6c00',
  },
  section: {
    backgroundColor: '#fff',
    borderRadius: 16,
    padding: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.06,
    shadowRadius: 4,
    elevation: 2,
    marginBottom: 20,
    gap: 12,
  },
})
;
