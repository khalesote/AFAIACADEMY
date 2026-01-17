import React from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, Image, Alert } from 'react-native';
import { useRouter } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
import AudioButton from '@/app/components/AudioButton';
import EjerciciosInteractivos from '@/app/components/EjerciciosInteractivos';
import { useUserProgress } from '@/contexts/UserProgressContext';
import { LinearGradient } from 'expo-linear-gradient';

function Unidad1() {
  const router = useRouter();
  const { progress, markUnitCompleted } = useUserProgress();
  const unitIndex = 0;
  const levelProgress = progress.A2;
  const alreadyCompleted = levelProgress?.unitsCompleted?.[unitIndex] ?? false;

  const handleFinish = () => {
    if (!alreadyCompleted) {
      markUnitCompleted('A2', unitIndex);
    }
    // Navegar directamente a la siguiente unidad (Unidad2)
    router.push('/A2_Plataforma/clases/Unidad2');
  };

  const ejercicios = [
    // Opción múltiple (todo en español; árabe solo como apoyo entre paréntesis)
    {
      tipo: 'opcion_multiple',
      enunciado: '¿Qué transporte va bajo tierra en la ciudad? (ما هو وسيلة النقل التي تسير تحت الأرض في المدينة؟)',
      opciones: ['El autobús', 'El metro', 'El tranvía', 'El taxi'],
      respuesta_correcta: 'El metro'
    },
    {
      tipo: 'opcion_multiple',
      enunciado: '¿Qué necesitas para subir al autobús? (ما الذي تحتاجه للصعود إلى الحافلة؟)',
      opciones: ['Un billete', 'Un coche', 'Una bicicleta', 'Un mapa'],
      respuesta_correcta: 'Un billete'
    },
    {
      tipo: 'opcion_multiple',
      enunciado: '¿Qué preposición se usa para indicar ubicación?',
      opciones: ['En', 'A', 'De', 'Con'],
      respuesta_correcta: 'En'
    },
    {
      tipo: 'opcion_multiple',
      enunciado: '¿Cómo se pregunta por direcciones en español?',
      opciones: ['¿Dónde está...?', '¿Qué hora es?', '¿Cuánto cuesta?', '¿Cómo te llamas?'],
      respuesta_correcta: '¿Dónde está...?'
    },
    {
      tipo: 'opcion_multiple',
      enunciado: 'ما معنى "انعطف يميناً"؟',
      opciones: ['Gire a la derecha', 'Gire a la izquierda', 'Siga recto', 'Vuelva atrás'],
      respuesta_correcta: 'Gire a la derecha'
    },
    {
      tipo: 'opcion_multiple',
      enunciado: 'كيف نقول "محطة مترو" بالإسبانية؟',
      opciones: ['Estación de metro', 'Parada de metro', 'Terminal de metro', 'Centro de metro'],
      respuesta_correcta: 'Estación de metro'
    },
    {
      tipo: 'opcion_multiple',
      enunciado: 'ما الفعل الذي يُستخدم لركوب وسائل النقل؟',
      opciones: ['Tomar', 'Ir', 'Venir', 'Llegar'],
      respuesta_correcta: 'Tomar'
    },
    {
      tipo: 'opcion_multiple',
      enunciado: 'كيف نقول "تذكرة" بالإسبانية؟',
      opciones: ['Billete', 'Tarjeta', 'Pase', 'Entrada'],
      respuesta_correcta: 'Billete'
    },
    {
      tipo: 'opcion_multiple',
      enunciado: 'ما معنى "بجانب"؟',
      opciones: ['Al lado de', 'Detrás de', 'Delante de', 'Entre'],
      respuesta_correcta: 'Al lado de'
    },
    {
      tipo: 'opcion_multiple',
      enunciado: '¿Cómo se pregunta por el precio del billete?',
      opciones: ['¿Cuánto cuesta el billete?', '¿Dónde está el billete?', '¿Qué hora es?', '¿Cómo llego?'],
      respuesta_correcta: '¿Cuánto cuesta el billete?'
    },
    {
      tipo: 'opcion_multiple',
      enunciado: 'ما معنى "أمام"؟',
      opciones: ['Delante de', 'Detrás de', 'Al lado de', 'Entre'],
      respuesta_correcta: 'Delante de'
    },
    {
      tipo: 'opcion_multiple',
      enunciado: 'ما الكلمة الصحيحة لـ "الجدول الزمني" بالإسبانية؟',
      opciones: ['Horario', 'Tiempo', 'Hora', 'Programa'],
      respuesta_correcta: 'Horario'
    },
    {
      tipo: 'opcion_multiple',
      enunciado: 'ما الفعل الذي يُستخدم للنزول من وسيلة النقل؟',
      opciones: ['Bajar', 'Subir', 'Entrar', 'Salir'],
      respuesta_correcta: 'Bajar'
    },

    // Relacionar (se mantienen; están bien para práctica bilingüe)
    {
      tipo: 'vocabulario',
      titulo: 'اربط وسائل النقل بأسمائها',
      pares: [
        { izquierda: 'المترو', derecha: 'Transporte subterráneo' },
        { izquierda: 'الحافلة', derecha: 'Transporte en superficie' },
        { izquierda: 'التاكسي', derecha: 'Transporte privado' },
        { izquierda: 'الترام', derecha: 'Transporte sobre rieles' },
        { izquierda: 'الدراجة', derecha: 'Transporte personal' }
      ],
      opciones: [
        'Transporte subterráneo', 'Transporte en superficie', 'Transporte privado',
        'Transporte sobre rieles', 'Transporte personal',
        'المترو', 'الحافلة', 'التاكسي', 'الترام', 'الدراجة'
      ]
    },
    {
      tipo: 'vocabulario',
      titulo: 'اربط حروف الجر بمعانيها',
      pares: [
        { izquierda: 'بجانب', derecha: 'Al lado de' },
        { izquierda: 'أمام', derecha: 'Enfrente de' },
        { izquierda: 'خلف', derecha: 'Detrás de' },
        { izquierda: 'بين', derecha: 'Entre' },
        { izquierda: 'في', derecha: 'En' }
      ],
      opciones: [
        'Al lado de', 'Enfrente de', 'Detrás de', 'Entre', 'En',
        'بجانب', 'أمام', 'خلف', 'بين', 'في'
      ]
    },
    {
      tipo: 'vocabulario',
      titulo: 'اربط الأماكن بوظائفها',
      pares: [
        { izquierda: 'Banco', derecha: 'البنك' },
        { izquierda: 'Farmacia', derecha: 'صيدلية' },
        { izquierda: 'Hospital', derecha: 'مستشفى' },
        { izquierda: 'Supermercado', derecha: 'سوبرماركت' },
        { izquierda: 'Parque', derecha: 'حديقة' }
      ],
      opciones: [
        'Banco', 'Farmacia', 'Hospital', 'Supermercado', 'Parque',
        'البنك', 'صيدلية', 'مستشفى', 'سوبرماركت', 'حديقة'
      ]
    }
  ];

  return (
    <ScrollView style={styles.container}>
      <TouchableOpacity
        style={styles.backButton}
          onPress={() => router.replace('/(tabs)/A2_Plataforma')}
        accessibilityLabel="Volver al menú A2: Plataforma"
      >
        <Ionicons name="arrow-back" size={28} color="#79A890" />
      </TouchableOpacity>

      <Image
        source={{ uri: 'https://images.unsplash.com/photo-1449824913935-59a10b8b200c?auto=format&fit=crop&w=800&q=80' }}
        style={styles.heroImage}
        accessibilityLabel="Imagen de una ciudad moderna"
      />

      <Text style={styles.title}>🏙️ Unidad 1: En la Ciudad</Text>
      <View style={{ alignItems: 'center', marginBottom: 8 }}>
        <AudioButton text="Unidad 1: En la Ciudad" size="small" showText={false} color="#79A890" />
      </View>
      <Text style={styles.titleAr}>الوحدة 1: في المدينة</Text>

      <View style={styles.card}>
        <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' }}>
          <Text style={styles.sectionTitle}>🌟 Navegando por la Ciudad</Text>
          <AudioButton text="Navegando por la ciudad" size="small" showText={false} color="#79A890" />
        </View>
        <Text style={styles.sectionText}>
          En esta unidad aprenderás a moverte por la ciudad de manera independiente. Descubrirás cómo usar el transporte público, encontrar lugares importantes y pedir direcciones. Es fundamental para desenvolverse en cualquier ciudad española.
        </Text>
        <Text style={styles.sectionTextAr}>
          في هذه الوحدة ستتعلم كيفية التنقل في المدينة بشكل مستقل. ستكتشف كيفية استخدام وسائل النقل العام والعثور على الأماكن المهمة وطلب الاتجاهات. هذا أساسي للتعامل في أي مدينة إسبانية.
        </Text>
      </View>

      <View style={styles.card}>
        <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' }}>
          <Text style={styles.sectionTitle}>📚 Vocabulario Esencial</Text>
          <AudioButton text="Vocabulario Esencial" size="small" showText={false} color="#79A890" />
        </View>
        
        <Text style={styles.sectionSubtitle}>🚇 Transporte Público</Text>
        <Text style={styles.sectionText}>
          • <Text style={styles.benefit}>Metro</Text> = مترو - Transporte subterráneo{'\n'}
          • <Text style={styles.benefit}>Autobús</Text> = حافلة - Transporte en superficie{'\n'}
          • <Text style={styles.benefit}>Tranvía</Text> = ترام - Transporte sobre rieles{'\n'}
          • <Text style={styles.benefit}>Taxi</Text> = تاكسي - Transporte privado{'\n'}
          • <Text style={styles.benefit}>Billete</Text> = تذكرة - Documento para viajar{'\n'}
          • <Text style={styles.benefit}>Horario</Text> = جدول - Horarios de salida
        </Text>

        <Text style={styles.sectionSubtitle}>🏢 Lugares Importantes</Text>
        <Text style={styles.sectionText}>
          • <Text style={styles.benefit}>Banco</Text> = بنك - Servicios financieros{'\n'}
          • <Text style={styles.benefit}>Farmacia</Text> = صيدلية - Medicamentos{'\n'}
          • <Text style={styles.benefit}>Supermercado</Text> = سوبرماركت - Compras{'\n'}
          • <Text style={styles.benefit}>Hospital</Text> = مستشفى - Atención médica{'\n'}
          • <Text style={styles.benefit}>Parque</Text> = حديقة - Espacio recreativo{'\n'}
          • <Text style={styles.benefit}>Museo</Text> = متحف - Exposiciones culturales
        </Text>

        <Text style={styles.sectionSubtitle}>📍 Preposiciones de Lugar</Text>
        <Text style={styles.sectionText}>
          • <Text style={styles.benefit}>En</Text> = في - Dentro de un lugar{'\n'}
          • <Text style={styles.benefit}>Al lado de</Text> = بجانب - Junto a algo{'\n'}
          • <Text style={styles.benefit}>Enfrente de</Text> = أمام - Frente a algo{'\n'}
          • <Text style={styles.benefit}>Detrás de</Text> = خلف - Atrás de algo{'\n'}
          • <Text style={styles.benefit}>Entre</Text> = بين - En medio de dos cosas
        </Text>

        <Text style={styles.sectionSubtitle}>🗣️ Expresiones Útiles</Text>
        <Text style={styles.sectionText}>
          • <Text style={styles.benefit}>¿Dónde está...?</Text> = أين يوجد...؟ - Preguntar ubicación{'\n'}
          • <Text style={styles.benefit}>¿Cómo llego a...?</Text> = كيف أصل إلى...؟ - Preguntar camino{'\n'}
          • <Text style={styles.benefit}>¿Cuánto cuesta el billete?</Text> = كم ثمن التذكرة؟ - Preguntar precio{'\n'}
          • <Text style={styles.benefit}>¿A qué hora pasa el próximo...?</Text> = في أي ساعة يمر القادم...؟ - Preguntar horario
        </Text>
      </View>

      <View style={styles.card}>
        <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' }}>
          <Text style={styles.sectionTitle}>🎯 Gramática Básica</Text>
          <AudioButton text="Gramática Básica" size="small" showText={false} color="#79A890" />
        </View>
        
        <Text style={styles.sectionSubtitle}>🚶 Verbos de Movimiento</Text>
        <Text style={styles.sectionText}>
          Los verbos más importantes para moverse por la ciudad:{'\n\n'}
          • <Text style={styles.benefit}>Ir</Text> = يذهب - Movimiento hacia un lugar{'\n'}
          • <Text style={styles.benefit}>Venir</Text> = يأتي - Movimiento hacia el hablante{'\n'}
          • <Text style={styles.benefit}>Tomar</Text> = يأخذ - Usar un transporte{'\n'}
          • <Text style={styles.benefit}>Bajar</Text> = ينزل - Salir del transporte{'\n'}
          • <Text style={styles.benefit}>Cambiar</Text> = يغير - Cambiar de transporte
        </Text>

        <Text style={styles.sectionSubtitle}>❓ Preguntar Direcciones</Text>
        <Text style={styles.sectionText}>
          Estructuras básicas para preguntar:{'\n\n'}
          • <Text style={styles.benefit}>¿Dónde está + lugar?</Text> = أين يوجد + مكان؟{'\n'}
          • <Text style={styles.benefit}>¿Cómo llego a + lugar?</Text> = كيف أصل إلى + مكان؟{'\n'}
          • <Text style={styles.benefit}>¿Puede indicarme el camino a + lugar?</Text> = هل يمكنك إرشادي إلى + مكان؟{'\n'}
          • <Text style={styles.benefit}>¿Está lejos de aquí?</Text> = هل هو بعيد من هنا؟
        </Text>

        <Text style={styles.sectionSubtitle}>📍 Dar Direcciones</Text>
        <Text style={styles.sectionText}>
          Expresiones para dar indicaciones:{'\n\n'}
          • <Text style={styles.benefit}>Siga todo recto</Text> = اذهب مباشرة{'\n'}
          • <Text style={styles.benefit}>Gire a la derecha/izquierda</Text> = انعطف يميناً/يساراً{'\n'}
          • <Text style={styles.benefit}>Está al final de la calle</Text> = في نهاية الشارع{'\n'}
          • <Text style={styles.benefit}>Tome la primera/segunda calle</Text> = خذ الشارع الأول/الثاني
        </Text>
      </View>

      <View style={styles.card}>
        <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' }}>
          <Text style={styles.sectionTitle}>🗺️ Señales de Tráfico</Text>
          <AudioButton text="Señales de tráfico" size="small" showText={false} color="#79A890" />
        </View>
        
        <Text style={styles.sectionSubtitle}>🚦 Señales Importantes</Text>
        <Text style={styles.sectionText}>
          Conocer las señales básicas te ayuda a navegar mejor:{'\n\n'}
          • <Text style={styles.benefit}>Señal redonda con borde rojo</Text> = Prohibición{'\n'}
          • <Text style={styles.benefit}>Señal triangular</Text> = Advertencia{'\n'}
          • <Text style={styles.benefit}>Señal azul cuadrada</Text> = Información{'\n'}
          • <Text style={styles.benefit}>Semáforo rojo</Text> = Parar{'\n'}
          • <Text style={styles.benefit}>Semáforo verde</Text> = Continuar
        </Text>

        <Text style={styles.sectionSubtitle}>🚶 Cruces Peatonales</Text>
        <Text style={styles.sectionText}>
          Para cruzar la calle de forma segura:{'\n\n'}
          • <Text style={styles.benefit}>Busca el paso de peatones</Text> = ابحث عن ممر المشاة{'\n'}
          • <Text style={styles.benefit}>Espera la señal verde</Text> = انتظر الإشارة الخضراء{'\n'}
          • <Text style={styles.benefit}>Mira a ambos lados</Text> = انظر إلى الجانبين{'\n'}
          • <Text style={styles.benefit}>Cruza con cuidado</Text> = اعبر بحذر
        </Text>
      </View>

      <View style={styles.card}>
        <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' }}>
          <Text style={styles.sectionTitle}>🇪🇸 Transporte en España</Text>
          <AudioButton text="Transporte en España" size="small" showText={false} color="#79A890" />
        </View>
        
        <Text style={styles.sectionSubtitle}>🚇 Metro en las Ciudades Españolas</Text>
        <Text style={styles.sectionText}>
          El metro es muy eficiente en las grandes ciudades:{'\n\n'}
          • <Text style={styles.benefit}>Madrid</Text>: Red extensa con 12 líneas{'\n'}
          • <Text style={styles.benefit}>Barcelona</Text>: Metro moderno y limpio{'\n'}
          • <Text style={styles.benefit}>Valencia</Text>: Metro y tranvía integrados{'\n'}
          • <Text style={styles.benefit}>Bilbao</Text>: Metro elegante y funcional{'\n'}
          • <Text style={styles.benefit}>Horarios</Text>: Generalmente de 6:00 a 1:30
        </Text>

        <Text style={styles.sectionSubtitle}>🚌 Autobuses Urbanos</Text>
        <Text style={styles.sectionText}>
          Los autobuses complementan el metro:{'\n\n'}
          • <Text style={styles.benefit}>Frecuencia</Text>: Cada 10-15 minutos{'\n'}
          • <Text style={styles.benefit}>Horarios</Text>: De 6:00 a 24:00{'\n'}
          • <Text style={styles.benefit}>Billetes</Text>: Se compran en máquinas o al conductor{'\n'}
          • <Text style={styles.benefit}>Tarjetas</Text>: Más económicas para uso frecuente{'\n'}
          • <Text style={styles.benefit}>Aplicaciones</Text>: Para consultar horarios en tiempo real
        </Text>

        <Text style={styles.sectionSubtitle}>🚕 Taxis y Transporte Privado</Text>
        <Text style={styles.sectionText}>
          Opciones para viajes más cómodos:{'\n\n'}
          • <Text style={styles.benefit}>Taxis oficiales</Text>: Con taxímetro y licencia{'\n'}
          • <Text style={styles.benefit}>Aplicaciones</Text>: Uber, Cabify, Bolt{'\n'}
          • <Text style={styles.benefit}>Tarifas</Text>: Varían según la ciudad{'\n'}
          • <Text style={styles.benefit}>Propinas</Text>: No obligatorias pero apreciadas{'\n'}
          • <Text style={styles.benefit}>Reservas</Text>: Posibles por teléfono o app
        </Text>
      </View>

      <View style={styles.card}>
        <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' }}>
          <Text style={styles.sectionTitle}>💬 Diálogo de Ejemplo: Pidiendo Direcciones</Text>
          <AudioButton text="Diálogo de ejemplo: Pidiendo direcciones" size="small" showText={false} color="#79A890" />
        </View>
        <View style={{ alignItems: 'flex-start', marginBottom: 6 }}>
          <AudioButton text="Disculpe, ¿dónde está la estación de metro más cercana? Está a dos calles de aquí. Siga todo recto y gire a la derecha. ¿Qué línea va al centro de la ciudad? La línea azul, pero tiene que hacer transbordo en Plaza de España. ¿Cuánto cuesta el billete? Un viaje cuesta 1,50 euros. Es mejor comprar una tarjeta de 10 viajes." size="small" showText={false} color="#79A890" />
        </View>
        <Text style={styles.dialogo}>
          <Text style={styles.benefit}>Turista:</Text> "Disculpe, ¿dónde está la estación de metro más cercana?"{'\n\n'}
          <Text style={styles.benefit}>Local:</Text> "Está a dos calles de aquí. Siga todo recto y gire a la derecha."{'\n\n'}
          <Text style={styles.benefit}>Turista:</Text> "¿Qué línea va al centro de la ciudad?"{'\n\n'}
          <Text style={styles.benefit}>Local:</Text> "La línea azul, pero tiene que hacer transbordo en Plaza de España."{'\n\n'}
          <Text style={styles.benefit}>Turista:</Text> "¿Cuánto cuesta el billete?"{'\n\n'}
          <Text style={styles.benefit}>Local:</Text> "Un viaje cuesta 1,50 euros. Es mejor comprar una tarjeta de 10 viajes."
        </Text>
        <Text style={styles.dialogoAr}>
          <Text style={styles.benefit}>السائح:</Text> "عذراً، أين توجد أقرب محطة مترو؟"{'\n\n'}
          <Text style={styles.benefit}>المحلي:</Text> "على بعد شارعين من هنا. اذهب مباشرة وانعطف يميناً."{'\n\n'}
          <Text style={styles.benefit}>السائح:</Text> "أي خط يذهب إلى مركز المدينة؟"{'\n\n'}
          <Text style={styles.benefit}>المحلي:</Text> "الخط الأزرق، لكن عليك التغيير في ساحة إسبانيا."{'\n\n'}
          <Text style={styles.benefit}>السائح:</Text> "كم ثمن التذكرة؟"{'\n\n'}
          <Text style={styles.benefit}>المحلي:</Text> "الرحلة الواحدة 1,50 يورو. من الأفضل شراء بطاقة 10 رحلات."
        </Text>
      </View>

      {/* Diálogo con líneas y audio por línea (estilo A1) */}
      <View style={styles.card}>
        <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' }}>
          <Text style={styles.sectionTitle}>💬 Diálogo (por líneas)</Text>
          <AudioButton text="Diálogo por líneas: Pidiendo direcciones" size="small" showText={false} color="#79A890" />
        </View>

        {/* Audio global del diálogo */}
        <View style={{ alignItems: 'flex-start', marginBottom: 6 }}>
          <AudioButton text="Disculpe, ¿dónde está la estación de metro más cercana? Está a dos calles de aquí. Siga todo recto y gire a la derecha. ¿Qué línea va al centro de la ciudad? La línea azul, pero tiene que hacer transbordo en Plaza de España. ¿Cuánto cuesta el billete? Un viaje cuesta 1,50 euros. Es mejor comprar una tarjeta de 10 viajes." size="medium" showText={false} color="#79A890" />
        </View>

        {/* Líneas con botones de audio y traducción */}
        <View style={{ backgroundColor: '#f8f9fa', padding: 12, borderRadius: 8 }}>
          <View style={{ marginBottom: 12 }}>
            <View style={{ flexDirection: 'row', alignItems: 'flex-start', marginBottom: 6 }}>
              <Text style={[styles.benefit, { minWidth: 76 }]}>Turista:</Text>
              <Text style={{ flex: 1, fontSize: 16, color: '#333' }}>Disculpe, ¿dónde está la estación de metro más cercana?</Text>
              <AudioButton text="Disculpe, ¿dónde está la estación de metro más cercana?" size="small" showText={false} color="#79A890" />
            </View>
            <Text style={[styles.sectionTextAr, { backgroundColor: '#e3f2fd', padding: 8, borderRadius: 6 }]}>عذراً، أين توجد أقرب محطة مترو؟</Text>
          </View>

          <View style={{ marginBottom: 12 }}>
            <View style={{ flexDirection: 'row', alignItems: 'flex-start', marginBottom: 6 }}>
              <Text style={[styles.benefit, { minWidth: 76 }]}>Local:</Text>
              <Text style={{ flex: 1, fontSize: 16, color: '#333' }}>Está a dos calles de aquí. Siga todo recto y gire a la derecha.</Text>
              <AudioButton text="Está a dos calles de aquí. Siga todo recto y gire a la derecha." size="small" showText={false} color="#79A890" />
            </View>
            <Text style={[styles.sectionTextAr, { backgroundColor: '#e3f2fd', padding: 8, borderRadius: 6 }]}>على بعد شارعين من هنا. اذهب مباشرة وانعطف يميناً.</Text>
          </View>

          <View style={{ marginBottom: 12 }}>
            <View style={{ flexDirection: 'row', alignItems: 'flex-start', marginBottom: 6 }}>
              <Text style={[styles.benefit, { minWidth: 76 }]}>Turista:</Text>
              <Text style={{ flex: 1, fontSize: 16, color: '#333' }}>¿Qué línea va al centro de la ciudad?</Text>
              <AudioButton text="¿Qué línea va al centro de la ciudad?" size="small" showText={false} color="#79A890" />
            </View>
            <Text style={[styles.sectionTextAr, { backgroundColor: '#e3f2fd', padding: 8, borderRadius: 6 }]}>أي خط يذهب إلى مركز المدينة؟</Text>
          </View>

          <View style={{ marginBottom: 12 }}>
            <View style={{ flexDirection: 'row', alignItems: 'flex-start', marginBottom: 6 }}>
              <Text style={[styles.benefit, { minWidth: 76 }]}>Local:</Text>
              <Text style={{ flex: 1, fontSize: 16, color: '#333' }}>La línea azul, pero tiene que hacer transbordo en Plaza de España.</Text>
              <AudioButton text="La línea azul, pero tiene que hacer transbordo en Plaza de España." size="small" showText={false} color="#79A890" />
            </View>
            <Text style={[styles.sectionTextAr, { backgroundColor: '#e3f2fd', padding: 8, borderRadius: 6 }]}>الخط الأزرق، لكن عليك التغيير في ساحة إسبانيا.</Text>
          </View>

          <View style={{ marginBottom: 12 }}>
            <View style={{ flexDirection: 'row', alignItems: 'flex-start', marginBottom: 6 }}>
              <Text style={[styles.benefit, { minWidth: 76 }]}>Turista:</Text>
              <Text style={{ flex: 1, fontSize: 16, color: '#333' }}>¿Cuánto cuesta el billete?</Text>
              <AudioButton text="¿Cuánto cuesta el billete?" size="small" showText={false} color="#79A890" />
            </View>
            <Text style={[styles.sectionTextAr, { backgroundColor: '#e3f2fd', padding: 8, borderRadius: 6 }]}>كم ثمن التذكرة؟</Text>
          </View>

          <View style={{ marginBottom: 4 }}>
            <View style={{ flexDirection: 'row', alignItems: 'flex-start', marginBottom: 6 }}>
              <Text style={[styles.benefit, { minWidth: 76 }]}>Local:</Text>
              <Text style={{ flex: 1, fontSize: 16, color: '#333' }}>Un viaje cuesta 1,50 euros. Es mejor comprar una tarjeta de 10 viajes.</Text>
              <AudioButton text="Un viaje cuesta 1,50 euros. Es mejor comprar una tarjeta de 10 viajes." size="small" showText={false} color="#79A890" />
            </View>
            <Text style={[styles.sectionTextAr, { backgroundColor: '#e3f2fd', padding: 8, borderRadius: 6 }]}>الرحلة الواحدة 1,50 يورو. من الأفضل شراء بطاقة 10 رحلات.</Text>
          </View>
        </View>
      </View>

      <View style={styles.card}>
        <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' }}>
          <Text style={styles.sectionTitle}>🎯 Consejos Prácticos</Text>
          <AudioButton text="Consejos prácticos" size="small" showText={false} color="#79A890" />
        </View>
        <Text style={styles.sectionText}>
          • <Text style={styles.benefit}>Lleva siempre un mapa</Text>: Te ayuda a orientarte{'\n'}
          • <Text style={styles.benefit}>Aprende los números</Text>: Para entender horarios{'\n'}
          • <Text style={styles.benefit}>Ten cambio pequeño</Text>: Para comprar billetes{'\n'}
          • <Text style={styles.benefit}>Descarga aplicaciones</Text>: De transporte público{'\n'}
          • <Text style={styles.benefit}>Observa a los locales</Text>: Para aprender costumbres
        </Text>
        <Text style={styles.sectionTextAr}>
          • <Text style={styles.benefit}>احمل دائماً خريطة</Text>: تساعدك على التوجه{'\n'}
          • <Text style={styles.benefit}>تعلم الأرقام</Text>: لفهم الجداول الزمنية{'\n'}
          • <Text style={styles.benefit}>احمل فكة صغيرة</Text>: لشراء التذاكر{'\n'}
          • <Text style={styles.benefit}>حمل تطبيقات</Text>: وسائل النقل العام{'\n'}
          • <Text style={styles.benefit}>راقب السكان المحليين</Text>: لتعلم العادات
        </Text>
      </View>

      {/* Ejemplos escritos */}
      <View style={styles.card}>
        <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' }}>
          <Text style={styles.sectionTitle}>✍️ Ejemplos escritos</Text>
          <AudioButton text="Ejemplos escritos" size="small" showText={false} color="#79A890" />
        </View>
        <View style={{ gap: 10 }}>
          <View>
            <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' }}>
              <Text style={styles.sectionText}>¿Dónde está la estación?</Text>
              <AudioButton text="¿Dónde está la estación?" size="small" showText={false} color="#79A890" />
            </View>
            <Text style={styles.sectionTextAr}>أين توجد المحطة؟</Text>
          </View>
          <View>
            <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' }}>
              <Text style={styles.sectionText}>Siga recto y gire a la derecha.</Text>
              <AudioButton text="Siga recto y gire a la derecha." size="small" showText={false} color="#79A890" />
            </View>
            <Text style={styles.sectionTextAr}>سرْ مباشرة ثم انعطف يميناً.</Text>
          </View>
          <View>
            <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' }}>
              <Text style={styles.sectionText}>Está al lado del banco.</Text>
              <AudioButton text="Está al lado del banco." size="small" showText={false} color="#79A890" />
            </View>
            <Text style={styles.sectionTextAr}>بجانب البنك.</Text>
          </View>
          <View>
            <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' }}>
              <Text style={styles.sectionText}>¿Está lejos de aquí?</Text>
              <AudioButton text="¿Está lejos de aquí?" size="small" showText={false} color="#79A890" />
            </View>
            <Text style={styles.sectionTextAr}>هل هو بعيد من هنا؟</Text>
          </View>
        </View>
      </View>

      <EjerciciosInteractivos ejercicios={ejercicios} />

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
  backButton: {
    position: 'absolute',
    left: 10,
    top: 16,
    zIndex: 10,
    backgroundColor: '#fff',
    borderRadius: 20,
    padding: 3,
    elevation: 3,
  },
  heroImage: {
    width: '100%',
    height: 200,
    marginBottom: 20,
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#79A890',
    textAlign: 'center',
    marginBottom: 8,
    paddingHorizontal: 20,
  },
  titleAr: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#79A890',
    textAlign: 'center',
    marginBottom: 20,
    paddingHorizontal: 20,
    writingDirection: 'rtl',
  },
  card: {
    backgroundColor: '#fff',
    borderRadius: 12,
    padding: 20,
    marginHorizontal: 20,
    marginBottom: 16,
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  sectionTitle: {
    fontSize: 22,
    fontWeight: 'bold',
    color: '#79A890',
    marginBottom: 12,
  },
  sectionSubtitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#79A890',
    marginTop: 16,
    marginBottom: 8,
  },
  sectionText: {
    fontSize: 16,
    color: '#333',
    lineHeight: 24,
    marginBottom: 8,
  },
  sectionTextAr: {
    fontSize: 16,
    color: '#333',
    lineHeight: 24,
    marginBottom: 8,
    writingDirection: 'rtl',
    textAlign: 'right',
  },
  dialogo: {
    fontSize: 16,
    color: '#333',
    lineHeight: 24,
    fontStyle: 'italic',
    marginBottom: 8,
  },
  dialogoAr: {
    fontSize: 16,
    color: '#333',
    lineHeight: 24,
    fontStyle: 'italic',
    marginBottom: 8,
    writingDirection: 'rtl',
    textAlign: 'right',
    backgroundColor: '#f1f8e9',
    padding: 10,
    borderRadius: 8,
  },
  benefit: {
    fontWeight: 'bold',
    color: '#79A890',
  },
  finishContainer: {
    marginTop: 32,
    marginBottom: 48,
    alignItems: 'center',
  },
  finishButton: {
    borderRadius: 18,
    paddingVertical: 18,
    paddingHorizontal: 32,
    overflow: 'hidden',
    width: '100%',
    alignItems: 'center',
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

export default Unidad1;
