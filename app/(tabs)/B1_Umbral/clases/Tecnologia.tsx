import React from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, Image, Alert } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import EjerciciosInteractivos from '../../../components/EjerciciosInteractivos';
import { useUserProgress } from '@/contexts/UserProgressContext';
import { LinearGradient } from 'expo-linear-gradient';

export default function Tecnologia() {
  const router = useRouter();
  const { progress, markUnitCompleted } = useUserProgress();
  const levelProgress = progress.B1;
  const alreadyCompleted = levelProgress?.unitsCompleted?.[3] ?? false;

  const handleFinish = () => {
    if (!alreadyCompleted) {
      markUnitCompleted('B1', 3);
    }
    // Navegar directamente a la siguiente unidad (Transporte)
    router.push('/B1_Umbral/clases/Transporte');
  };

  const ejercicios = [
    // Ejercicio 1: Vocabulario - Dispositivos y funciones
    {
      tipo: 'vocabulario',
      titulo: 'Relaciona cada dispositivo con su función principal',
      pares: [
        { izquierda: '📱 Teléfono móvil', derecha: 'Comunicación y aplicaciones móviles' },
        { izquierda: '💻 Ordenador', derecha: 'Trabajo y procesamiento de datos' },
        { izquierda: '📱 Tablet', derecha: 'Entretenimiento y lectura digital' },
        { izquierda: '📺 Televisor inteligente', derecha: 'Entretenimiento audiovisual' }
      ]
    },

    // Ejercicio 2: Opción múltiple
    {
      tipo: 'opcion_multiple',
      enunciado: '¿Qué dispositivo usas para hacer llamadas y enviar mensajes?',
      opciones: ['Ordenador', 'Teléfono móvil', 'Tablet', 'Televisor'],
      respuesta_correcta: 'Teléfono móvil'
    },

    // Ejercicio 3: Opción múltiple
    {
      tipo: 'opcion_multiple',
      enunciado: '¿Qué significa "descargar"?',
      opciones: ['Borrar', 'Bajar un archivo de internet', 'Subir', 'Comprar'],
      respuesta_correcta: 'Bajar un archivo de internet'
    },

    // Ejercicio 4: Opción múltiple
    {
      tipo: 'opcion_multiple',
      enunciado: '¿Qué aplicación se usa para mensajes de texto?',
      opciones: ['Instagram', 'واتساب', 'YouTube', 'Facebook'],
      respuesta_correcta: 'واتساب'
    },

    // Ejercicio 5: Opción múltiple
    {
      tipo: 'opcion_multiple',
      enunciado: '¿Qué significa "actualizar"?',
      opciones: ['Borrar', 'Mejorar o renovar', 'Comprar', 'Vender'],
      respuesta_correcta: 'Mejorar o renovar'
    },

    // Ejercicio 6: Opción múltiple
    {
      tipo: 'opcion_multiple',
      enunciado: '¿Qué es una "red social"?',
      opciones: ['Un tipo de internet', 'Una plataforma para conectar personas', 'Un dispositivo', 'Un programa'],
      respuesta_correcta: 'Una plataforma para conectar personas'
    },

    // Ejercicio 7: Opción múltiple
    {
      tipo: 'opcion_multiple',
      enunciado: '¿Qué significa "instalar"?',
      opciones: ['Borrar', 'Poner un programa en el dispositivo', 'Comprar', 'Vender'],
      respuesta_correcta: 'Poner un programa en el dispositivo'
    },

    // Ejercicio 8: Opción múltiple
    {
      tipo: 'opcion_multiple',
      enunciado: '¿Qué es "wifi"?',
      opciones: ['Un tipo de teléfono', 'Conexión inalámbrica a internet', 'Un programa', 'Un dispositivo'],
      respuesta_correcta: 'Conexión inalámbrica a internet'
    },

    // Ejercicio 9: Opción múltiple
    {
      tipo: 'opcion_multiple',
      enunciado: '¿Qué significa "compartir"?',
      opciones: ['Borrar', 'Enviar información a otros', 'Comprar', 'Vender'],
      respuesta_correcta: 'Enviar información a otros'
    },

    // Ejercicio 10: Opción múltiple
    {
      tipo: 'opcion_multiple',
      enunciado: '¿Qué es "bluetooth"?',
      opciones: ['Un tipo de internet', 'Conexión inalámbrica entre dispositivos', 'Un programa', 'Una aplicación'],
      respuesta_correcta: 'Conexión inalámbrica entre dispositivos'
    },

    // Ejercicio 11: Opción múltiple
    {
      tipo: 'opcion_multiple',
      enunciado: '¿Qué significa "navegar"?',
      opciones: ['Nadar', 'Buscar información en internet', 'Conducir', 'Caminar'],
      respuesta_correcta: 'Buscar información en internet'
    },

    // Ejercicio 12: Opción múltiple
    {
      tipo: 'opcion_multiple',
      pregunta: '¿Qué es una "aplicación"?',
      opciones: ['Un dispositivo', 'Un programa para hacer tareas específicas', 'Un tipo de internet', 'Una red social'],
      respuestaCorrecta: 1
    },

    // Ejercicio 13: Opción múltiple
    {
      tipo: 'opcion_multiple',
      pregunta: '¿Qué significa "conectar"?',
      opciones: ['Desconectar', 'Unir dispositivos o redes', 'Borrar', 'Comprar'],
      respuestaCorrecta: 1
    },

    // Ejercicio 14: Opción múltiple
    {
      tipo: 'opcion_multiple',
      pregunta: '¿Qué es la "batería"?',
      opciones: ['Un programa', 'Fuente de energía para dispositivos', 'Un tipo de internet', 'Una aplicación'],
      respuestaCorrecta: 1
    },

    // Ejercicio 15: Opción múltiple
    {
      tipo: 'opcion_multiple',
      pregunta: '¿Qué significa "pantalla"?',
      opciones: ['Un programa', 'Superficie donde se muestra información', 'Un tipo de internet', 'Una aplicación'],
      respuestaCorrecta: 1
    },

    // Ejercicio 16: Vocabulario - Aplicaciones
    {
      tipo: 'vocabulario',
      titulo: 'Relaciona cada aplicación con su función',
      pares: [
        { izquierda: '💬 واتساب', derecha: 'Mensajes y llamadas' },
        { izquierda: '📸 إنستغرام', derecha: 'Compartir fotos y videos' },
        { izquierda: '📺 يوتيوب', derecha: 'Ver videos y tutoriales' },
        { izquierda: '🗺️ خرائط جوجل', derecha: 'Navegación y mapas' }
      ]
    },

    // Ejercicio 17: Vocabulario - Conceptos tecnológicos
    {
      tipo: 'vocabulario',
      titulo: 'Relaciona cada concepto tecnológico con su descripción',
      pares: [
        { izquierda: '🌐 الإنترنت', derecha: 'Red global de información' },
        { izquierda: '📶 واي فاي', derecha: 'Conexión inalámbrica a internet' },
        { izquierda: '🔋 البطارية', derecha: 'Energía para dispositivos móviles' },
        { izquierda: '📱 التطبيق', derecha: 'Programa para tareas específicas' }
      ]
    },

    // Ejercicio 18: Vocabulario - Ventajas de la tecnología
    {
      tipo: 'vocabulario',
      titulo: 'Relaciona cada ventaja de la tecnología con su beneficio',
      pares: [
        { izquierda: '⚡ Comunicación rápida', derecha: 'Conectar con personas instantáneamente' },
        { izquierda: '📚 Acceso a información', derecha: 'Aprender y estar informado fácilmente' },
        { izquierda: '💼 Trabajo remoto', derecha: 'Trabajar desde cualquier lugar' },
        { izquierda: '🎓 Educación online', derecha: 'Estudiar sin salir de casa' }
      ]
    },

    // Ejercicio 19: Opción múltiple
    {
      tipo: 'opcion_multiple',
      pregunta: '¿Qué significa "ciberacoso"?',
      opciones: ['Ayudar en internet', 'Acoso o bullying a través de la tecnología', 'Comprar online', 'Navegar en internet'],
      respuestaCorrecta: 1
    },

    // Ejercicio 20: Opción múltiple
    {
      tipo: 'opcion_multiple',
      pregunta: '¿Qué es importante para usar la tecnología de forma responsable?',
      opciones: ['Usar todo el tiempo', 'Equilibrio entre uso y desconexión', 'Solo usar redes sociales', 'Ignorar la privacidad'],
      respuestaCorrecta: 1
    }
  ];

  return (
    <ScrollView style={{ backgroundColor: '#f5f7fa' }} contentContainerStyle={styles.container}>
      <TouchableOpacity
        style={styles.backButton}
        onPress={() => router.replace('/B1_Umbral')}
        accessibilityLabel="Volver al menú B1: Umbral"
      >
        <Ionicons name="arrow-back" size={28} color="#79A890" />
      </TouchableOpacity>
      
      <Image
        source={{ uri: 'https://images.unsplash.com/photo-1518709268805-4e9042af2176?auto=format&fit=crop&w=1170&q=80' }}
        style={styles.heroImage}
        accessibilityLabel="Imagen de tecnología y comunicación"
      />
      
      <Text style={styles.title}>💻 Tecnología y comunicación</Text>
      <Text style={styles.titleAr}>💻 التكنولوجيا والتواصل</Text>
      
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>🌟 Importancia de la tecnología</Text>
        <Text style={styles.sectionText}>
          La tecnología ha revolucionado completamente la forma en que nos comunicamos, 
          trabajamos, aprendemos y vivimos. Se ha convertido en una parte fundamental 
          de nuestra vida cotidiana, facilitando tareas y conectando personas de todo el mundo.
          {"\n\n"}
          Es esencial entender cómo usar la tecnología de manera efectiva, responsable 
          y segura para aprovechar sus beneficios y minimizar sus riesgos.
        </Text>
        <Text style={styles.sectionTextAr}>
          غيرت التكنولوجيا تماماً الطريقة التي نتواصل ونعمل
          ونتعلم ونعيش بها. أصبحت جزءاً أساسياً من حياتنا
          اليومية، مما يسهل المهام ويربط الناس من جميع أنحاء العالم.
          {"\n\n"}
          من الضروري فهم كيفية استخدام التكنولوجيا بفعالية
          ومسؤولية وأمان للاستفادة من فوائدها وتقليل مخاطرها.
        </Text>
      </View>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>📱 Dispositivos tecnológicos</Text>
        <Text style={styles.sectionText}>
          <Text style={styles.subtitle}>📱 Teléfonos móviles:</Text>{"\n"}
          • <Text style={styles.benefit}>Smartphones:</Text> Múltiples funciones en un dispositivo{"\n"}
          • <Text style={styles.benefit}>Cámaras:</Text> Alta calidad para fotos y videos{"\n"}
          • <Text style={styles.benefit}>Aplicaciones:</Text> Herramientas para todo tipo de tareas{"\n"}
          • <Text style={styles.benefit}>GPS:</Text> Navegación y localización
          {"\n\n"}
          <Text style={styles.subtitle}>💻 Ordenadores:</Text>{"\n"}
          • <Text style={styles.benefit}>Portátiles:</Text> Movilidad y trabajo flexible{"\n"}
          • <Text style={styles.benefit}>De escritorio:</Text> Potencia para trabajo intensivo{"\n"}
          • <Text style={styles.benefit}>Procesamiento:</Text> Manejo de datos complejos{"\n"}
          • <Text style={styles.benefit}>Creación:</Text> Diseño, programación, edición
          {"\n\n"}
          <Text style={styles.subtitle}>📱 Tablets:</Text>{"\n"}
          • <Text style={styles.benefit}>Entretenimiento:</Text> Videos, juegos, lectura{"\n"}
          • <Text style={styles.benefit}>Tamaño:</Text> Intermedio entre móvil y ordenador{"\n"}
          • <Text style={styles.benefit}>Portabilidad:</Text> Fácil de transportar{"\n"}
          • <Text style={styles.benefit}>Multimedia:</Text> Ideal para contenido visual
        </Text>
        <Text style={styles.sectionTextAr}>
          <Text style={styles.subtitle}>📱 الهواتف المحمولة:</Text>{"\n"}
          • <Text style={styles.benefit}>هواتف ذكية:</Text> وظائف متعددة في جهاز واحد{"\n"}
          • <Text style={styles.benefit}>كاميرات:</Text> جودة عالية للصور والفيديوهات{"\n"}
          • <Text style={styles.benefit}>تطبيقات:</Text> أدوات لجميع أنواع المهام{"\n"}
          • <Text style={styles.benefit}>GPS:</Text> ملاحة وتحديد المواقع
          {"\n\n"}
          <Text style={styles.subtitle}>💻 الحواسيب:</Text>{"\n"}
          • <Text style={styles.benefit}>محمولة:</Text> تنقل وعمل مرن{"\n"}
          • <Text style={styles.benefit}>مكتبية:</Text> قوة للعمل المكثف{"\n"}
          • <Text style={styles.benefit}>معالجة:</Text> إدارة البيانات المعقدة{"\n"}
          • <Text style={styles.benefit}>إنشاء:</Text> تصميم، برمجة، تحرير
          {"\n\n"}
          <Text style={styles.subtitle}>📱 الأجهزة اللوحية:</Text>{"\n"}
          • <Text style={styles.benefit}>ترفيه:</Text> فيديوهات، ألعاب، قراءة{"\n"}
          • <Text style={styles.benefit}>حجم:</Text> متوسط بين الهاتف والحاسوب{"\n"}
          • <Text style={styles.benefit}>قابلية النقل:</Text> سهلة النقل{"\n"}
          • <Text style={styles.benefit}>وسائط متعددة:</Text> مثالية للمحتوى المرئي
        </Text>
      </View>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>🌐 Internet y conectividad</Text>
        <Text style={styles.sectionText}>
          <Text style={styles.subtitle}>📶 Tipos de conexión:</Text>{"\n"}
          • <Text style={styles.benefit}>WiFi:</Text> Conexión inalámbrica en espacios cerrados{"\n"}
          • <Text style={styles.benefit}>Datos móviles:</Text> Internet a través del teléfono{"\n"}
          • <Text style={styles.benefit}>Fibra óptica:</Text> Conexión de alta velocidad{"\n"}
          • <Text style={styles.benefit}>Bluetooth:</Text> Conexión entre dispositivos cercanos
          {"\n\n"}
          <Text style={styles.subtitle}>🔒 Seguridad en internet:</Text>{"\n"}
          • <Text style={styles.tip}>Contraseñas fuertes:</Text> Combinar letras, números y símbolos{"\n"}
          • <Text style={styles.tip}>Verificación en dos pasos:</Text> Doble protección de cuentas{"\n"}
          • <Text style={styles.tip}>Antivirus:</Text> Protección contra malware{"\n"}
          • <Text style={styles.tip}>Privacidad:</Text> Control de información personal
          {"\n\n"}
          <Text style={styles.subtitle}>🌍 Navegación web:</Text>{"\n"}
          • <Text style={styles.benefit}>Buscadores:</Text> Google, Bing, Yahoo{"\n"}
          • <Text style={styles.benefit}>Navegadores:</Text> Chrome, Firefox, Safari{"\n"}
          • <Text style={styles.benefit}>Marcadores:</Text> Guardar páginas favoritas{"\n"}
          • <Text style={styles.benefit}>Historial:</Text> Registro de páginas visitadas
        </Text>
        <Text style={styles.sectionTextAr}>
          <Text style={styles.subtitle}>📶 أنواع الاتصال:</Text>{"\n"}
          • <Text style={styles.benefit}>واي فاي:</Text> اتصال لاسلكي في الأماكن المغلقة{"\n"}
          • <Text style={styles.benefit}>بيانات محمولة:</Text> إنترنت عبر الهاتف{"\n"}
          • <Text style={styles.benefit}>ألياف بصرية:</Text> اتصال عالي السرعة{"\n"}
          • <Text style={styles.benefit}>بلوتوث:</Text> اتصال بين الأجهزة القريبة
          {"\n\n"}
          <Text style={styles.subtitle}>🔒 الأمان على الإنترنت:</Text>{"\n"}
          • <Text style={styles.tip}>كلمات مرور قوية:</Text> دمج الحروف والأرقام والرموز{"\n"}
          • <Text style={styles.tip}>التحقق بخطوتين:</Text> حماية مزدوجة للحسابات{"\n"}
          • <Text style={styles.tip}>مضاد فيروسات:</Text> حماية من البرامج الضارة{"\n"}
          • <Text style={styles.tip}>خصوصية:</Text> التحكم في المعلومات الشخصية
          {"\n\n"}
          <Text style={styles.subtitle}>🌍 تصفح الويب:</Text>{"\n"}
          • <Text style={styles.benefit}>محركات بحث:</Text> جوجل، بينج، ياهو{"\n"}
          • <Text style={styles.benefit}>متصفحات:</Text> كروم، فايرفوكس، سفاري{"\n"}
          • <Text style={styles.benefit}>علامات مرجعية:</Text> حفظ الصفحات المفضلة{"\n"}
          • <Text style={styles.benefit}>سجل:</Text> تسجيل الصفحات المزورة
        </Text>
      </View>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>📱 Aplicaciones más populares</Text>
        <Text style={styles.sectionText}>
          <Text style={styles.subtitle}>💬 Comunicación:</Text>{"\n"}
          • <Text style={styles.benefit}>WhatsApp:</Text> Mensajes, llamadas y videollamadas{"\n"}
          • <Text style={styles.benefit}>Telegram:</Text> Mensajería segura y grupos{"\n"}
          • <Text style={styles.benefit}>Zoom:</Text> Videoconferencias y reuniones{"\n"}
          • <Text style={styles.benefit}>Skype:</Text> Llamadas internacionales
          {"\n\n"}
          <Text style={styles.subtitle}>📸 Redes sociales:</Text>{"\n"}
          • <Text style={styles.benefit}>Instagram:</Text> Compartir fotos y videos{"\n"}
          • <Text style={styles.benefit}>Facebook:</Text> Red social general{"\n"}
          • <Text style={styles.benefit}>TikTok:</Text> Videos cortos y entretenimiento{"\n"}
          • <Text style={styles.benefit}>Twitter:</Text> Noticias y microblogging
          {"\n\n"}
          <Text style={styles.subtitle}>🎵 Entretenimiento:</Text>{"\n"}
          • <Text style={styles.benefit}>YouTube:</Text> Videos y tutoriales{"\n"}
          • <Text style={styles.benefit}>Spotify:</Text> Música y podcasts{"\n"}
          • <Text style={styles.benefit}>Netflix:</Text> Series y películas{"\n"}
          • <Text style={styles.benefit}>Twitch:</Text> Streaming de videojuegos
        </Text>
        <Text style={styles.sectionTextAr}>
          <Text style={styles.subtitle}>💬 تواصل:</Text>{"\n"}
          • <Text style={styles.benefit}>واتساب:</Text> رسائل ومكالمات ومكالمات فيديو{"\n"}
          • <Text style={styles.benefit}>تليجرام:</Text> رسائل آمنة ومجموعات{"\n"}
          • <Text style={styles.benefit}>زووم:</Text> مؤتمرات فيديو واجتماعات{"\n"}
          • <Text style={styles.benefit}>سكايب:</Text> مكالمات دولية
          {"\n\n"}
          <Text style={styles.subtitle}>📸 وسائل التواصل الاجتماعي:</Text>{"\n"}
          • <Text style={styles.benefit}>إنستغرام:</Text> مشاركة الصور والفيديوهات{"\n"}
          • <Text style={styles.benefit}>فيسبوك:</Text> شبكة اجتماعية عامة{"\n"}
          • <Text style={styles.benefit}>تيك توك:</Text> فيديوهات قصيرة وترفيه{"\n"}
          • <Text style={styles.benefit}>تويتر:</Text> أخبار ومدونات مصغرة
          {"\n\n"}
          <Text style={styles.subtitle}>🎵 ترفيه:</Text>{"\n"}
          • <Text style={styles.benefit}>يوتيوب:</Text> فيديوهات ودروس{"\n"}
          • <Text style={styles.benefit}>سبوتيفاي:</Text> موسيقى وبودكاست{"\n"}
          • <Text style={styles.benefit}>نتفليكس:</Text> مسلسلات وأفلام{"\n"}
          • <Text style={styles.benefit}>تويتش:</Text> بث ألعاب الفيديو
        </Text>
      </View>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>✅ Ventajas y desventajas</Text>
        <Text style={styles.sectionText}>
          <Text style={styles.subtitle}>✅ Ventajas:</Text>{"\n"}
          • <Text style={styles.benefit}>Comunicación instantánea:</Text> Conectar con personas en tiempo real{"\n"}
          • <Text style={styles.benefit}>Acceso a información:</Text> Aprender y estar informado fácilmente{"\n"}
          • <Text style={styles.benefit}>Trabajo remoto:</Text> Trabajar desde cualquier lugar{"\n"}
          • <Text style={styles.benefit}>Educación online:</Text> Estudiar sin salir de casa{"\n"}
          • <Text style={styles.benefit}>Entretenimiento:</Text> Múltiples opciones de ocio{"\n"}
          • <Text style={styles.benefit}>Productividad:</Text> Herramientas para mejorar eficiencia
          {"\n\n"}
          <Text style={styles.subtitle}>❌ Desventajas:</Text>{"\n"}
          • <Text style={styles.tip}>Adicción:</Text> Dependencia excesiva de dispositivos{"\n"}
          • <Text style={styles.tip}>Aislamiento social:</Text> Menos contacto cara a cara{"\n"}
          • <Text style={styles.tip}>Problemas de privacidad:</Text> Exposición de datos personales{"\n"}
          • <Text style={styles.tip}>Desinformación:</Text> Información falsa o manipulada{"\n"}
          • <Text style={styles.tip}>Ciberacoso:</Text> Acoso a través de la tecnología{"\n"}
          • <Text style={styles.tip}>Problemas de salud:</Text> Fatiga visual, sedentarismo
        </Text>
        <Text style={styles.sectionTextAr}>
          <Text style={styles.subtitle}>✅ المزايا:</Text>{"\n"}
          • <Text style={styles.benefit}>تواصل فوري:</Text> التواصل مع الناس في الوقت الفعلي{"\n"}
          • <Text style={styles.benefit}>الوصول للمعلومات:</Text> التعلم والاطلاع بسهولة{"\n"}
          • <Text style={styles.benefit}>عمل عن بعد:</Text> العمل من أي مكان{"\n"}
          • <Text style={styles.benefit}>تعليم عبر الإنترنت:</Text> الدراسة بدون مغادرة المنزل{"\n"}
          • <Text style={styles.benefit}>ترفيه:</Text> خيارات متعددة للترفيه{"\n"}
          • <Text style={styles.benefit}>إنتاجية:</Text> أدوات لتحسين الكفاءة
          {"\n\n"}
          <Text style={styles.subtitle}>❌ العيوب:</Text>{"\n"}
          • <Text style={styles.tip}>إدمان:</Text> اعتماد مفرط على الأجهزة{"\n"}
          • <Text style={styles.tip}>عزلة اجتماعية:</Text> أقل تواصلاً وجهاً لوجه{"\n"}
          • <Text style={styles.tip}>مشاكل الخصوصية:</Text> كشف البيانات الشخصية{"\n"}
          • <Text style={styles.tip}>معلومات مضللة:</Text> معلومات كاذبة أو محرفة{"\n"}
          • <Text style={styles.tip}>تنمر إلكتروني:</Text> مضايقة عبر التكنولوجيا{"\n"}
          • <Text style={styles.tip}>مشاكل صحية:</Text> إرهاق بصري، خمول
        </Text>
      </View>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>🔧 Uso responsable de la tecnología</Text>
        <Text style={styles.sectionText}>
          <Text style={styles.subtitle}>⏰ Gestión del tiempo:</Text>{"\n"}
          • <Text style={styles.tip}>Establecer límites:</Text> Horarios de uso de dispositivos{"\n"}
          • <Text style={styles.tip}>Descansos regulares:</Text> Pausas para evitar fatiga{"\n"}
          • <Text style={styles.tip}>Actividades offline:</Text> Tiempo sin tecnología{"\n"}
          • <Text style={styles.tip}>Priorizar tareas:</Text> Usar tecnología para lo importante
          {"\n\n"}
          <Text style={styles.subtitle}>🔒 Seguridad digital:</Text>{"\n"}
          • <Text style={styles.tip}>Contraseñas seguras:</Text> Únicas y complejas{"\n"}
          • <Text style={styles.tip}>Verificación en dos pasos:</Text> Protección adicional{"\n"}
          • <Text style={styles.tip}>Actualizaciones:</Text> Mantener software actualizado{"\n"}
          • <Text style={styles.tip}>Antivirus:</Text> Protección contra amenazas
          {"\n\n"}
          <Text style={styles.subtitle}>👥 Interacción social:</Text>{"\n"}
          • <Text style={styles.tip}>Equilibrio:</Text> Combinar online y offline{"\n"}
          • <Text style={styles.tip}>Comunicación real:</Text> Mantener contacto personal{"\n"}
          • <Text style={styles.tip}>Respeto digital:</Text> Ser amable en internet{"\n"}
          • <Text style={styles.tip}>Privacidad:</Text> Proteger información personal
        </Text>
        <Text style={styles.sectionTextAr}>
          <Text style={styles.subtitle}>⏰ إدارة الوقت:</Text>{"\n"}
          • <Text style={styles.tip}>وضع حدود:</Text> جداول استخدام الأجهزة{"\n"}
          • <Text style={styles.tip}>استراحات منتظمة:</Text> فترات راحة لتجنب الإرهاق{"\n"}
          • <Text style={styles.tip}>أنشطة بدون إنترنت:</Text> وقت بدون تكنولوجيا{"\n"}
          • <Text style={styles.tip}>أولوية المهام:</Text> استخدام التكنولوجيا لما هو مهم
          {"\n\n"}
          <Text style={styles.subtitle}>🔒 الأمان الرقمي:</Text>{"\n"}
          • <Text style={styles.tip}>كلمات مرور آمنة:</Text> فريدة ومعقدة{"\n"}
          • <Text style={styles.tip}>التحقق بخطوتين:</Text> حماية إضافية{"\n"}
          • <Text style={styles.tip}>تحديثات:</Text> الحفاظ على البرامج محدثة{"\n"}
          • <Text style={styles.tip}>مضاد فيروسات:</Text> حماية من التهديدات
          {"\n\n"}
          <Text style={styles.subtitle}>👥 التفاعل الاجتماعي:</Text>{"\n"}
          • <Text style={styles.tip}>توازن:</Text> دمج الإنترنت والواقع{"\n"}
          • <Text style={styles.tip}>تواصل حقيقي:</Text> الحفاظ على التواصل الشخصي{"\n"}
          • <Text style={styles.tip}>احترام رقمي:</Text> أن تكون لطيفاً على الإنترنت{"\n"}
          • <Text style={styles.tip}>خصوصية:</Text> حماية المعلومات الشخصية
        </Text>
      </View>
      
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>📚 Vocabulario esencial de tecnología</Text>
        <Text style={styles.sectionText}>
          <Text style={styles.subtitle}>💻 Conceptos básicos:</Text>{"\n"}
          tecnología = تكنولوجيا{"\n"}
          dispositivo = جهاز{"\n"}
          aplicación = تطبيق{"\n"}
          internet = إنترنت{"\n"}
          red social = شبكة اجتماعية{"\n"}
          pantalla = شاشة{"\n"}
          batería = بطارية{"\n"}
          wifi = واي فاي
          {"\n\n"}
          <Text style={styles.subtitle}>📱 Acciones tecnológicas:</Text>{"\n"}
          descargar = تحميل{"\n"}
          instalar = تثبيت{"\n"}
          actualizar = تحديث{"\n"}
          compartir = مشاركة{"\n"}
          conectar = ربط{"\n"}
          navegar = تصفح{"\n"}
          buscar = بحث{"\n"}
          guardar = حفظ
          {"\n\n"}
          <Text style={styles.subtitle}>🔧 Herramientas digitales:</Text>{"\n"}
          ordenador = حاسوب{"\n"}
          teléfono = هاتف{"\n"}
          tablet = جهاز لوحي{"\n"}
          auriculares = سماعات{"\n"}
          teclado = لوحة مفاتيح{"\n"}
          ratón = فأرة{"\n"}
          impresora = طابعة{"\n"}
          cámara = كاميرا
          {"\n\n"}
          <Text style={styles.subtitle}>🌐 Conectividad:</Text>{"\n"}
          bluetooth = بلوتوث{"\n"}
          datos móviles = بيانات محمولة{"\n"}
          fibra óptica = ألياف بصرية{"\n"}
          señal = إشارة{"\n"}
          red = شبكة{"\n"}
          servidor = خادم{"\n"}
          nube = سحابة{"\n"}
          streaming = بث مباشر
        </Text>
        <Text style={styles.sectionTextAr}>
          <Text style={styles.subtitle}>💻 المفاهيم الأساسية:</Text>{"\n"}
          تكنولوجيا = tecnología{"\n"}
          جهاز = dispositivo{"\n"}
          تطبيق = aplicación{"\n"}
          إنترنت = internet{"\n"}
          شبكة اجتماعية = red social{"\n"}
          شاشة = pantalla{"\n"}
          بطارية = batería{"\n"}
          واي فاي = wifi
          {"\n\n"}
          <Text style={styles.subtitle}>📱 الإجراءات التكنولوجية:</Text>{"\n"}
          تحميل = descargar{"\n"}
          تثبيت = instalar{"\n"}
          تحديث = actualizar{"\n"}
          مشاركة = compartir{"\n"}
          ربط = conectar{"\n"}
          تصفح = navegar{"\n"}
          بحث = buscar{"\n"}
          حفظ = guardar
          {"\n\n"}
          <Text style={styles.subtitle}>🔧 الأدوات الرقمية:</Text>{"\n"}
          حاسوب = ordenador{"\n"}
          هاتف = teléfono{"\n"}
          جهاز لوحي = tablet{"\n"}
          سماعات = auriculares{"\n"}
          لوحة مفاتيح = teclado{"\n"}
          فأرة = ratón{"\n"}
          طابعة = impresora{"\n"}
          كاميرا = cámara
          {"\n\n"}
          <Text style={styles.subtitle}>🌐 الاتصال:</Text>{"\n"}
          بلوتوث = bluetooth{"\n"}
          بيانات محمولة = datos móviles{"\n"}
          ألياف بصرية = fibra óptica{"\n"}
          إشارة = señal{"\n"}
          شبكة = red{"\n"}
          خادم = servidor{"\n"}
          سحابة = nube{"\n"}
          بث مباشر = streaming
        </Text>
      </View>
      
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>💬 Expresiones útiles sobre tecnología</Text>
        <Text style={styles.sectionText}>
          • "¿Cómo se descarga esta aplicación?" = كيف يتم تحميل هذا التطبيق؟{"\n"}
          • "¿Tienes wifi aquí?" = هل لديك واي فاي هنا؟{"\n"}
          • "Mi teléfono no tiene batería" = هاتفي لا يحتوي على بطارية{"\n"}
          • "¿Puedes ayudarme con el ordenador?" = هل يمكنك مساعدتي مع الحاسوب؟{"\n"}
          • "¿Qué aplicaciones usas más?" = ما التطبيقات التي تستخدمها أكثر؟{"\n"}
          • "¿Cómo se conecta a internet?" = كيف يتم الاتصال بالإنترنت؟{"\n"}
          • "¿Tienes problemas con la tecnología?" = هل لديك مشاكل مع التكنولوجيا؟{"\n"}
          • "¿Qué ventajas tiene la tecnología?" = ما مزايا التكنولوجيا؟
        </Text>
        <Text style={styles.sectionTextAr}>
          • "كيف يتم تحميل هذا التطبيق؟" = ¿Cómo se descarga esta aplicación?{"\n"}
          • "هل لديك واي فاي هنا؟" = ¿Tienes wifi aquí?{"\n"}
          • "هاتفي لا يحتوي على بطارية" = Mi teléfono no tiene batería{"\n"}
          • "هل يمكنك مساعدتي مع الحاسوب؟" = ¿Puedes ayudarme con el ordenador?{"\n"}
          • "ما التطبيقات التي تستخدمها أكثر؟" = ¿Qué aplicaciones usas más?{"\n"}
          • "كيف يتم الاتصال بالإنترنت؟" = ¿Cómo se conecta a internet?{"\n"}
          • "هل لديك مشاكل مع التكنولوجيا؟" = ¿Tienes problemas con la tecnología?{"\n"}
          • "ما مزايا التكنولوجيا؟" = ¿Qué ventajas tiene la tecnología?
        </Text>
      </View>
      
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>🇪🇸 Tecnología en España</Text>
        <Text style={styles.sectionText}>
          <Text style={styles.subtitle}>📱 Uso de tecnología:</Text>{"\n"}
          • <Text style={styles.benefit}>Alta penetración:</Text> 95% de hogares con internet{"\n"}
          • <Text style={styles.benefit}>Smartphones:</Text> Uso masivo de teléfonos inteligentes{"\n"}
          • <Text style={styles.benefit}>Fibra óptica:</Text> Cobertura extensa de alta velocidad{"\n"}
          • <Text style={styles.benefit}>5G:</Text> Implementación de nueva tecnología móvil
          {"\n\n"}
          <Text style={styles.subtitle}>💼 Tecnología en el trabajo:</Text>{"\n"}
          • <Text style={styles.benefit}>Teletrabajo:</Text> Trabajo remoto muy extendido{"\n"}
          • <Text style={styles.benefit}>Herramientas digitales:</Text> Uso de software empresarial{"\n"}
          • <Text style={styles.benefit}>E-commerce:</Text> Comercio electrónico en crecimiento{"\n"}
          • <Text style={styles.benefit}>Startups:</Text> Ecosistema de empresas tecnológicas
          {"\n\n"}
          <Text style={styles.subtitle}>🎓 Educación digital:</Text>{"\n"}
          • <Text style={styles.benefit}>Aulas digitales:</Text> Tecnología en las escuelas{"\n"}
          • <Text style={styles.benefit}>Plataformas online:</Text> Aprendizaje a distancia{"\n"}
          • <Text style={styles.benefit}>Recursos digitales:</Text> Material educativo online{"\n"}
          • <Text style={styles.benefit}>Competencias digitales:</Text> Formación en tecnología
        </Text>
        <Text style={styles.sectionTextAr}>
          <Text style={styles.subtitle}>📱 استخدام التكنولوجيا:</Text>{"\n"}
          • <Text style={styles.benefit}>اختراق عالي:</Text> 95% من المنازل لديها إنترنت{"\n"}
          • <Text style={styles.benefit}>هواتف ذكية:</Text> استخدام واسع للهواتف الذكية{"\n"}
          • <Text style={styles.benefit}>ألياف بصرية:</Text> تغطية واسعة عالية السرعة{"\n"}
          • <Text style={styles.benefit}>5G:</Text> تطبيق تكنولوجيا محمولة جديدة
          {"\n\n"}
          <Text style={styles.subtitle}>💼 التكنولوجيا في العمل:</Text>{"\n"}
          • <Text style={styles.benefit}>عمل عن بعد:</Text> العمل عن بعد منتشر جداً{"\n"}
          • <Text style={styles.benefit}>أدوات رقمية:</Text> استخدام برامج تجارية{"\n"}
          • <Text style={styles.benefit}>تجارة إلكترونية:</Text> تجارة إلكترونية متنامية{"\n"}
          • <Text style={styles.benefit}>شركات ناشئة:</Text> نظام بيئي للشركات التكنولوجية
          {"\n\n"}
          <Text style={styles.subtitle}>🎓 تعليم رقمي:</Text>{"\n"}
          • <Text style={styles.benefit}>فصول رقمية:</Text> تكنولوجيا في المدارس{"\n"}
          • <Text style={styles.benefit}>منصات عبر الإنترنت:</Text> تعلم عن بعد{"\n"}
          • <Text style={styles.benefit}>موارد رقمية:</Text> مواد تعليمية عبر الإنترنت{"\n"}
          • <Text style={styles.benefit}>كفاءات رقمية:</Text> تدريب في التكنولوجيا
        </Text>
      </View>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>✅ Ejercicios de práctica</Text>
        <Text style={styles.sectionText}>Practica lo que has aprendido con estos ejercicios interactivos.</Text>
        <Text style={styles.sectionTextAr}>تدرب على ما تعلمته مع هذه التمارين التفاعلية.</Text>
      </View>

      <EjerciciosInteractivos ejercicios={ejercicios} onComplete={handleFinish} />

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
  heroImage: {
    width: '100%',
    height: 200,
    borderRadius: 12,
    marginBottom: 18,
    resizeMode: 'cover',
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#79A890',
    marginBottom: 4,
    textAlign: 'center',
  },
  titleAr: {
    fontSize: 26,
    fontWeight: 'bold',
    color: '#79A890',
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
    color: '#79A890',
    marginBottom: 6,
  },
  sectionText: {
    fontSize: 16,
    color: '#333',
    marginBottom: 2,
    lineHeight: 24,
  },
  sectionTextAr: {
    fontSize: 16,
    color: '#333',
    writingDirection: 'rtl',
    marginBottom: 2,
    fontFamily: 'System',
    lineHeight: 24,
  },
  subtitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#79A890',
  },
  benefit: {
    fontWeight: 'bold',
    color: '#79A890',
  },
  tip: {
    fontWeight: 'bold',
    color: '#ff6f00',
  },
  dialogueTitle: {
    fontWeight: 'bold',
    color: '#79A890',
    fontSize: 18,
  },
  speaker: {
    fontWeight: 'bold',
    color: '#79A890',
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
