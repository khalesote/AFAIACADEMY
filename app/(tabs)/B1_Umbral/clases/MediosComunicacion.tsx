import React from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, Image, Alert } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import EjerciciosInteractivos from '../../../components/EjerciciosInteractivos';
import { useUserProgress } from '@/contexts/UserProgressContext';
import { LinearGradient } from 'expo-linear-gradient';

export default function MediosComunicacion() {
  const router = useRouter();
  const { progress, markUnitCompleted } = useUserProgress();
  const levelProgress = progress.B1;
  const alreadyCompleted = levelProgress?.unitsCompleted?.[10] ?? false;
  const handleFinish = () => {
    if (!alreadyCompleted) {
      markUnitCompleted('B1', 10);
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

  const ejercicios = [
    // Ejercicio 1: Vocabulario - Relacionar medios de comunicación con sus características
    {
      tipo: 'vocabulario',
      titulo: 'Relaciona cada medio de comunicación con su característica principal:',
      pares: [
        { izquierda: '📰 Periódico', derecha: 'Información escrita diaria' },
        { izquierda: '📺 Televisión', derecha: 'Información audiovisual' },
        { izquierda: '📻 Radio', derecha: 'Información solo auditiva' },
        { izquierda: '💻 Internet', derecha: 'Información digital interactiva' }
      ]
    },

    // Ejercicio 2: Opción múltiple
    {
      tipo: 'opcion_multiple',
      pregunta: '¿Qué significa "medios de comunicación"?',
      opciones: ['Solo internet', 'Canales para transmitir información', 'Solo televisión', 'Solo radio'],
      respuestaCorrecta: 1
    },

    // Ejercicio 3: Opción múltiple
    {
      tipo: 'opcion_multiple',
      pregunta: '¿Qué es una "noticia"?',
      opciones: ['Solo una historia', 'Información reciente sobre un hecho', 'Solo un cuento', 'Solo una opinión'],
      respuestaCorrecta: 1
    },

    // Ejercicio 4: Opción múltiple
    {
      tipo: 'opcion_multiple',
      pregunta: '¿Qué significa "prensa"?',
      opciones: ['Solo periódicos', 'Medios de comunicación escritos', 'Solo revistas', 'Solo libros'],
      respuestaCorrecta: 1
    },

    // Ejercicio 5: Opción múltiple
    {
      tipo: 'opcion_multiple',
      pregunta: '¿Qué es un "periodista"?',
      opciones: ['Solo un escritor', 'Profesional que investiga y reporta noticias', 'Solo un fotógrafo', 'Solo un editor'],
      respuestaCorrecta: 1
    },

    // Ejercicio 6: Opción múltiple
    {
      tipo: 'opcion_multiple',
      pregunta: '¿Qué significa "digital"?',
      opciones: ['Solo papel', 'Relacionado con tecnología informática', 'Solo analógico', 'Solo manual'],
      respuestaCorrecta: 1
    },

    // Ejercicio 7: Opción múltiple
    {
      tipo: 'opcion_multiple',
      pregunta: '¿Qué es la "información"?',
      opciones: ['Solo datos', 'Datos organizados que transmiten conocimiento', 'Solo números', 'Solo letras'],
      respuestaCorrecta: 1
    },

    // Ejercicio 8: Opción múltiple
    {
      tipo: 'opcion_multiple',
      pregunta: '¿Qué significa "actualidad"?',
      opciones: ['Solo el pasado', 'Lo que está sucediendo ahora', 'Solo el futuro', 'Solo historia'],
      respuestaCorrecta: 1
    },

    // Ejercicio 9: Opción múltiple
    {
      tipo: 'opcion_multiple',
      pregunta: '¿Qué es una "entrevista"?',
      opciones: ['Solo una conversación', 'Conversación para obtener información', 'Solo una charla', 'Solo una discusión'],
      respuestaCorrecta: 1
    },

    // Ejercicio 10: Opción múltiple
    {
      tipo: 'opcion_multiple',
      pregunta: '¿Qué significa "reportaje"?',
      opciones: ['Solo una noticia', 'Investigación periodística detallada', 'Solo una foto', 'Solo un video'],
      respuestaCorrecta: 1
    },

    // Ejercicio 11: Opción múltiple
    {
      tipo: 'opcion_multiple',
      pregunta: '¿Qué es la "libertad de prensa"?',
      opciones: ['Solo libertad de expresión', 'Derecho a informar sin censura', 'Solo libertad de opinión', 'Solo libertad de reunión'],
      respuestaCorrecta: 1
    },

    // Ejercicio 12: Opción múltiple
    {
      tipo: 'opcion_multiple',
      pregunta: '¿Qué significa "objetividad"?',
      opciones: ['Solo dar opiniones', 'Presentar hechos sin prejuicios', 'Solo ser subjetivo', 'Solo ser parcial'],
      respuestaCorrecta: 1
    },

    // Ejercicio 13: Opción múltiple
    {
      tipo: 'opcion_multiple',
      pregunta: '¿Qué es la "desinformación"?',
      opciones: ['Solo información falsa', 'Información falsa o engañosa', 'Solo información verdadera', 'Solo información neutral'],
      respuestaCorrecta: 1
    },

    // Ejercicio 14: Opción múltiple
    {
      tipo: 'opcion_multiple',
      pregunta: '¿Qué significa "verificar" una noticia?',
      opciones: ['Solo leerla', 'Comprobar que la información es correcta', 'Solo creerla', 'Solo ignorarla'],
      respuestaCorrecta: 1
    },

    // Ejercicio 15: Opción múltiple
    {
      tipo: 'opcion_multiple',
      pregunta: '¿Qué son las "redes sociales"?',
      opciones: ['Solo internet', 'Plataformas para compartir contenido', 'Solo televisión', 'Solo radio'],
      respuestaCorrecta: 1
    },

    // Ejercicio 16: Vocabulario - Tipos de contenido
    {
      tipo: 'vocabulario',
      titulo: 'Relaciona cada tipo de contenido con su medio:',
      pares: [
        { izquierda: '📱 Apps móviles', derecha: 'Noticias en tiempo real' },
        { izquierda: '📺 Programas de TV', derecha: 'Entretenimiento e información' },
        { izquierda: '📻 Podcasts', derecha: 'Contenido auditivo especializado' },
        { izquierda: '💻 Blogs', derecha: 'Contenido personal en internet' }
      ]
    },

    // Ejercicio 17: Vocabulario - Secciones periodísticas
    {
      tipo: 'vocabulario',
      titulo: 'Relaciona cada sección periodística con su contenido:',
      pares: [
        { izquierda: '🏛️ Política', derecha: 'Noticias sobre gobierno y leyes' },
        { izquierda: '💰 Economía', derecha: 'Noticias sobre dinero y negocios' },
        { izquierda: '⚽ Deportes', derecha: 'Noticias sobre competiciones' },
        { izquierda: '🎭 Cultura', derecha: 'Noticias sobre arte y entretenimiento' }
      ]
    },

    // Ejercicio 18: Vocabulario - Herramientas periodísticas
    {
      tipo: 'vocabulario',
      titulo: 'Relaciona cada herramienta con su función periodística:',
      pares: [
        { izquierda: '📷 Cámara', derecha: 'Capturar imágenes' },
        { izquierda: '🎤 Micrófono', derecha: 'Grabar audio' },
        { izquierda: '💻 Computadora', derecha: 'Escribir y editar' },
        { izquierda: '📱 Teléfono', derecha: 'Comunicación rápida' }
      ]
    },

    // Ejercicio 19: Opción múltiple
    {
      tipo: 'opcion_multiple',
      pregunta: '¿Qué significa "periodismo ciudadano"?',
      opciones: ['Solo periodismo profesional', 'Información compartida por ciudadanos comunes', 'Solo periodismo digital', 'Solo periodismo tradicional'],
      respuestaCorrecta: 1
    },

    // Ejercicio 20: Opción múltiple
    {
      tipo: 'opcion_multiple',
      pregunta: '¿Qué es importante al consumir medios de comunicación?',
      opciones: ['Solo creer todo', 'Ser crítico y verificar la información', 'Solo ignorar todo', 'Solo compartir todo'],
      respuestaCorrecta: 1
    }
  ];

  return (
    <ScrollView style={styles.container} contentContainerStyle={styles.content}>
      <TouchableOpacity
        style={styles.backButton}
        onPress={() => router.replace('/B1_Umbral')}
        accessibilityLabel="Volver al menú B1: Umbral"
      >
        <Ionicons name="arrow-back" size={28} color="#79A890" />
      </TouchableOpacity>

      <Image
        source={{ uri: 'https://images.unsplash.com/photo-1519389950473-47ba0277781c?auto=format&fit=crop&w=600&q=80' }}
        style={styles.heroImage}
        accessibilityLabel="Imagen de medios de comunicación y prensa"
      />

      <Text style={styles.title}>📰 Medios de comunicación y prensa</Text>
      <Text style={styles.titleAr}>📰 وسائل الإعلام والصحافة</Text>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>📡 Importancia de los medios de comunicación</Text>
        <Text style={styles.sectionText}>
          Los medios de comunicación son canales fundamentales para transmitir información,
          noticias y entretenimiento a la sociedad. Juegan un papel crucial en mantener
          informada a la población sobre eventos locales, nacionales e internacionales.
          {"\n\n"}
          En la era digital, los medios de comunicación han evolucionado significativamente,
          ofreciendo múltiples plataformas para acceder a la información de manera instantánea
          y desde cualquier lugar del mundo.
        </Text>
        <Text style={styles.sectionTextAr}>
          وسائل الإعلام هي قنوات أساسية لنقل المعلومات
          والأخبار والترفيه للمجتمع. تلعب دوراً حاسماً في إبقاء
          السكان على اطلاع بالأحداث المحلية والوطنية والدولية.
          {"\n\n"}
          في العصر الرقمي، تطورت وسائل الإعلام بشكل كبير،
          مقدمة منصات متعددة للوصول إلى المعلومات بشكل فوري
          ومن أي مكان في العالم.
        </Text>
      </View>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>📺 Tipos de medios de comunicación</Text>
        <Text style={styles.sectionText}>
          <Text style={styles.subtitle}>📰 Medios impresos:</Text>{"\n"}
          • <Text style={styles.benefit}>Periódicos:</Text> Información diaria en papel{"\n"}
          • <Text style={styles.benefit}>Revistas:</Text> Publicaciones especializadas{"\n"}
          • <Text style={styles.benefit}>Libros:</Text> Información detallada y profunda{"\n"}
          • <Text style={styles.benefit}>Folletos:</Text> Información promocional
          {"\n\n"}
          <Text style={styles.subtitle}>📺 Medios audiovisuales:</Text>{"\n"}
          • <Text style={styles.benefit}>Televisión:</Text> Información con imagen y sonido{"\n"}
          • <Text style={styles.benefit}>Radio:</Text> Información solo auditiva{"\n"}
          • <Text style={styles.benefit}>Cine:</Text> Entretenimiento y documentales{"\n"}
          • <Text style={styles.benefit}>Videos:</Text> Contenido grabado
          {"\n\n"}
          <Text style={styles.subtitle}>💻 Medios digitales:</Text>{"\n"}
          • <Text style={styles.benefit}>Internet:</Text> Información global y accesible{"\n"}
          • <Text style={styles.benefit}>Redes sociales:</Text> Contenido compartido{"\n"}
          • <Text style={styles.benefit}>Apps móviles:</Text> Información portátil{"\n"}
          • <Text style={styles.benefit}>Podcasts:</Text> Contenido auditivo digital
        </Text>
        <Text style={styles.sectionTextAr}>
          <Text style={styles.subtitle}>📰 وسائل الإعلام المطبوعة:</Text>{"\n"}
          • <Text style={styles.benefit}>الصحف:</Text> معلومات يومية على الورق{"\n"}
          • <Text style={styles.benefit}>المجلات:</Text> منشورات متخصصة{"\n"}
          • <Text style={styles.benefit}>الكتب:</Text> معلومات مفصلة وعميقة{"\n"}
          • <Text style={styles.benefit}>المنشورات:</Text> معلومات ترويجية
          {"\n\n"}
          <Text style={styles.subtitle}>📺 وسائل الإعلام السمعية البصرية:</Text>{"\n"}
          • <Text style={styles.benefit}>التلفزيون:</Text> معلومات بالصورة والصوت{"\n"}
          • <Text style={styles.benefit}>الراديو:</Text> معلومات سمعية فقط{"\n"}
          • <Text style={styles.benefit}>السينما:</Text> ترفيه وأفلام وثائقية{"\n"}
          • <Text style={styles.benefit}>الفيديو:</Text> محتوى مسجل
          {"\n\n"}
          <Text style={styles.subtitle}>💻 وسائل الإعلام الرقمية:</Text>{"\n"}
          • <Text style={styles.benefit}>الإنترنت:</Text> معلومات عالمية وقابلة للوصول{"\n"}
          • <Text style={styles.benefit}>وسائل التواصل الاجتماعي:</Text> محتوى مشترك{"\n"}
          • <Text style={styles.benefit}>تطبيقات الهاتف:</Text> معلومات محمولة{"\n"}
          • <Text style={styles.benefit}>البودكاست:</Text> محتوى سمعي رقمي
        </Text>
      </View>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>💡 Consejos para consumir información</Text>
        <Text style={styles.sectionText}>
          1. <Text style={styles.tip}>Verifica las fuentes:</Text> Asegúrate de que la información provenga de medios confiables
          {"\n"}
          2. <Text style={styles.tip}>Contrasta datos:</Text> Consulta varias fuentes antes de compartir información
          {"\n"}
          3. <Text style={styles.tip}>Analiza el contenido:</Text> Identifica si se trata de una noticia, opinión o publicidad
          {"\n"}
          4. <Text style={styles.tip}>Evita la desinformación:</Text> No compartas información sin confirmarla
          {"\n"}
          5. <Text style={styles.tip}>Utiliza diferentes medios:</Text> Diversifica tus fuentes de información
        </Text>
        <Text style={styles.sectionTextAr}>
          1. <Text style={styles.tip}>تحقق من المصادر:</Text> تأكد من أن المعلومات من وسائل موثوقة
          {"\n"}
          2. <Text style={styles.tip}>قارن البيانات:</Text> استشر عدة مصادر قبل مشاركة المعلومات
          {"\n"}
          3. <Text style={styles.tip}>حلل المحتوى:</Text> حدد ما إذا كان الخبر أو رأي أو إعلان
          {"\n"}
          4. <Text style={styles.tip}>تجنب التضليل:</Text> لا تشارك المعلومات دون التأكد منها
          {"\n"}
          5. <Text style={styles.tip}>استخدم وسائل مختلفة:</Text> نوّع مصادر معلوماتك
        </Text>
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
    flex: 1,
    backgroundColor: '#f5f7fa',
  },
  content: {
    padding: 24,
    alignItems: 'center',
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
    color: '#ff7043',
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
