import React from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, Image, Alert } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import EjerciciosInteractivos from '../../../components/EjerciciosInteractivos';
import { useUserProgress } from '@/contexts/UserProgressContext';
import { LinearGradient } from 'expo-linear-gradient';

export default function ProblemasSociales() {
  const router = useRouter();
  const { progress, markUnitCompleted } = useUserProgress();
  const levelProgress = progress.B1;
  const alreadyCompleted = levelProgress?.unitsCompleted?.[11] ?? false;
  const handleFinish = () => {
    if (!alreadyCompleted) {
      markUnitCompleted('B1', 11);
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
    // Ejercicio 1: Relacionar problemas sociales con sus características
    {
      tipo: 'relacionar',
      enunciado: 'Relaciona cada problema social con su característica principal:',
      pares: [
        { izquierda: '💰 Desigualdad económica', derecha: 'Diferencias en ingresos y riqueza' },
        { izquierda: '🚫 Discriminación', derecha: 'Trato injusto por diferencias' },
        { izquierda: '🏠 Pobreza', derecha: 'Falta de recursos básicos' },
        { izquierda: '🌍 Racismo', derecha: 'Discriminación por raza o etnia' }
      ]
    },

    // Ejercicio 2: Opción múltiple
    {
      tipo: 'opcion_multiple',
      enunciado: '¿Qué significa "igualdad"?',
      opciones: ['Ser diferente', 'Tener los mismos derechos y oportunidades', 'Ser mejor', 'Ser peor'],
      respuesta_correcta: 'Tener los mismos derechos y oportunidades'
    },

    // Ejercicio 3: Opción múltiple
    {
      tipo: 'opcion_multiple',
      enunciado: '¿Qué es la "diversidad"?',
      opciones: ['Ser igual', 'Variedad de personas, culturas y perspectivas', 'Ser mejor', 'Ser peor'],
      respuesta_correcta: 'Variedad de personas, culturas y perspectivas'
    },

    // Ejercicio 4: Opción múltiple
    {
      tipo: 'opcion_multiple',
      enunciado: '¿Qué significa "discriminación"?',
      opciones: ['Tratar bien a todos', 'Tratar mal a alguien por ser diferente', 'Ser igual', 'Respetar'],
      respuesta_correcta: 'Tratar mal a alguien por ser diferente'
    },

    // Ejercicio 5: Opción múltiple
    {
      tipo: 'opcion_multiple',
      enunciado: '¿Qué es la "inmigración"?',
      opciones: ['Quedarse en casa', 'Mudarse a otro país para vivir', 'Viajar de vacaciones', 'Estudiar'],
      respuesta_correcta: 'Mudarse a otro país para vivir'
    },

    // Ejercicio 6: Opción múltiple
    {
      tipo: 'opcion_multiple',
      enunciado: '¿Qué significa "tolerancia"?',
      opciones: ['Discriminar', 'Respetar y aceptar las diferencias', 'Ignorar', 'Ser igual'],
      respuesta_correcta: 'Respetar y aceptar las diferencias'
    },

    // Ejercicio 7: Opción múltiple
    {
      tipo: 'opcion_multiple',
      enunciado: '¿Qué es la "pobreza"?',
      opciones: ['Tener mucho dinero', 'Falta de recursos económicos básicos', 'Ser rico', 'Tener todo'],
      respuesta_correcta: 'Falta de recursos económicos básicos'
    },

    // Ejercicio 8: Opción múltiple
    {
      tipo: 'opcion_multiple',
      enunciado: '¿Qué significa "justicia social"?',
      opciones: ['Solo leyes', 'Distribución justa de recursos y oportunidades', 'Solo castigos', 'Solo premios'],
      respuesta_correcta: 'Distribución justa de recursos y oportunidades'
    },

    // Ejercicio 9: Opción múltiple
    {
      tipo: 'opcion_multiple',
      enunciado: '¿Qué es la "inclusión"?',
      opciones: ['Excluir personas', 'Incluir a todas las personas en la sociedad', 'Solo algunos', 'Nadie'],
      respuesta_correcta: 'Incluir a todas las personas en la sociedad'
    },

    // Ejercicio 10: Opción múltiple
    {
      tipo: 'opcion_multiple',
      enunciado: '¿Qué significa "derechos humanos"?',
      opciones: ['Solo privilegios', 'Derechos básicos que tiene toda persona', 'Solo leyes', 'Solo deberes'],
      respuesta_correcta: 'Derechos básicos que tiene toda persona'
    },

    // Ejercicio 11: Opción múltiple
    {
      tipo: 'opcion_multiple',
      enunciado: '¿Qué es el "racismo"?',
      opciones: ['Respetar razas', 'Discriminación basada en raza o etnia', 'Igualdad racial', 'Diversidad'],
      respuesta_correcta: 'Discriminación basada en raza o etnia'
    },

    // Ejercicio 12: Opción múltiple
    {
      tipo: 'opcion_multiple',
      enunciado: '¿Qué significa "solidaridad"?',
      opciones: ['Solo individualismo', 'Apoyo mutuo entre personas', 'Solo egoísmo', 'Solo competencia'],
      respuesta_correcta: 'Apoyo mutuo entre personas'
    },

    // Ejercicio 13: Opción múltiple
    {
      tipo: 'opcion_multiple',
      enunciado: '¿Qué es la "exclusión social"?',
      opciones: ['Incluir a todos', 'Dejar fuera a personas de la sociedad', 'Integración', 'Inclusión'],
      respuesta_correcta: 'Dejar fuera a personas de la sociedad'
    },

    // Ejercicio 14: Opción múltiple
    {
      tipo: 'opcion_multiple',
      enunciado: '¿Qué significa "empoderamiento"?',
      opciones: ['Debilitar', 'Dar poder y confianza a las personas', 'Controlar', 'Limitar'],
      respuesta_correcta: 'Dar poder y confianza a las personas'
    },

    // Ejercicio 15: Opción múltiple
    {
      tipo: 'opcion_multiple',
      enunciado: '¿Qué es la "igualdad de género"?',
      opciones: ['Solo derechos de hombres', 'Que hombres y mujeres tengan los mismos derechos', 'Solo derechos de mujeres', 'Desigualdad'],
      respuesta_correcta: 'Que hombres y mujeres tengan los mismos derechos'
    },

    // Ejercicio 16: Relacionar
    {
      tipo: 'relacionar',
      enunciado: 'Relaciona cada derecho humano con su descripción:',
      pares: [
        { izquierda: '📚 Derecho a la educación', derecha: 'Poder estudiar y aprender' },
        { izquierda: '💼 Derecho al trabajo', derecha: 'Poder tener un empleo digno' },
        { izquierda: '🏥 Derecho a la salud', derecha: 'Recibir atención médica' },
        { izquierda: '🏠 Derecho a la vivienda', derecha: 'Tener un lugar donde vivir' }
      ]
    },

    // Ejercicio 17: Relacionar
    {
      tipo: 'relacionar',
      enunciado: 'Relaciona cada acción con su beneficio social:',
      pares: [
        { izquierda: '🤝 Respetar diferencias', derecha: 'Promover la tolerancia' },
        { izquierda: '📖 Educarse', derecha: 'Entender mejor los problemas' },
        { izquierda: '🗳️ Votar', derecha: 'Participar en decisiones' },
        { izquierda: '❤️ Ayudar a otros', derecha: 'Crear solidaridad' }
      ]
    },

    // Ejercicio 18: Relacionar
    {
      tipo: 'relacionar',
      enunciado: 'Relaciona cada problema con su posible solución:',
      pares: [
        { izquierda: '💰 Desigualdad económica', derecha: 'Políticas de redistribución' },
        { izquierda: '🚫 Discriminación', derecha: 'Educación y sensibilización' },
        { izquierda: '🏠 Pobreza', derecha: 'Programas de ayuda social' },
        { izquierda: '🌍 Racismo', derecha: 'Promover la diversidad' }
      ]
    },

    // Ejercicio 19: Opción múltiple
    {
      tipo: 'opcion_multiple',
      enunciado: '¿Qué significa "participación ciudadana"?',
      opciones: ['Solo votar', 'Participar activamente en la sociedad', 'Solo quejarse', 'Solo observar'],
      respuesta_correcta: 'Participar activamente en la sociedad'
    },

    // Ejercicio 20: Opción múltiple
    {
      tipo: 'opcion_multiple',
      enunciado: '¿Qué es importante para resolver problemas sociales?',
      opciones: ['Solo ignorarlos', 'Trabajo conjunto y participación de todos', 'Solo quejarse', 'Solo esperar'],
      respuesta_correcta: 'Trabajo conjunto y participación de todos'
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
        source={{ uri: 'https://images.unsplash.com/photo-1503676382389-4809596d5290?auto=format&fit=crop&w=600&q=80' }}
        style={styles.heroImage}
        accessibilityLabel="Imagen de problemas sociales y actualidad"
      />

      <Text style={styles.title}>🌍 Problemas sociales y actualidad</Text>
      <Text style={styles.titleAr}>🌍 القضايا الاجتماعية والراهنة</Text>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>⚖️ Importancia de los problemas sociales</Text>
        <Text style={styles.sectionText}>
          Los problemas sociales son desafíos que afectan a toda la sociedad y requieren
          atención colectiva y soluciones compartidas. Estos problemas impactan la calidad
          de vida de las personas y el desarrollo de las comunidades.
          {"\n\n"}
          Entender estos temas es fundamental para participar activamente en la sociedad,
          expresar opiniones informadas y contribuir a crear un mundo más justo,
          inclusivo y equitativo para todas las personas.
        </Text>
        <Text style={styles.sectionTextAr}>
          المشاكل الاجتماعية هي تحديات تؤثر على المجتمع بأكمله وتتطلب
          اهتمامًا جماعيًا وحلولاً مشتركة. هذه المشاكل تؤثر على جودة
          حياة الناس وتطور المجتمعات.
          {"\n\n"}
          فهم هذه المواضيع أساسي للمشاركة النشطة في المجتمع،
          والتعبير عن آراء مستنيرة والمساهمة في خلق عالم أكثر عدالة،
          شمولية وإنصافاً لجميع الناس.
        </Text>
      </View>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>🚨 Principales problemas sociales actuales</Text>
        <Text style={styles.sectionText}>
          <Text style={styles.subtitle}>💰 Desigualdad económica:</Text>{"\n"}
          • <Text style={styles.benefit}>Diferencias de ingresos:</Text> Brecha entre ricos y pobres{"\n"}
          • <Text style={styles.benefit}>Acceso desigual:</Text> A recursos, educación y salud{"\n"}
          • <Text style={styles.benefit}>Pobreza:</Text> Falta de recursos económicos básicos{"\n"}
          • <Text style={styles.benefit}>Exclusión financiera:</Text> Sin acceso a servicios bancarios
          {"\n\n"}
          <Text style={styles.subtitle}>🚫 Discriminación y prejuicios:</Text>{"\n"}
          • <Text style={styles.benefit}>Racismo:</Text> Discriminación por raza o etnia{"\n"}
          • <Text style={styles.benefit}>Sexismo:</Text> Discriminación por género{"\n"}
          • <Text style={styles.benefit}>Edadismo:</Text> Discriminación por edad{"\n"}
          • <Text style={styles.benefit}>Xenofobia:</Text> Miedo o rechazo a extranjeros
          {"\n\n"}
          <Text style={styles.subtitle}>🌍 Inmigración y refugiados:</Text>{"\n"}
          • <Text style={styles.benefit}>Migración forzada:</Text> Por conflictos o crisis{"\n"}
          • <Text style={styles.benefit}>Integración cultural:</Text> Adaptación a nuevas sociedades{"\n"}
          • <Text style={styles.benefit}>Derechos de inmigrantes:</Text> Acceso a servicios básicos{"\n"}
          • <Text style={styles.benefit}>Refugiados:</Text> Personas que huyen de peligros
        </Text>
        <Text style={styles.sectionTextAr}>
          <Text style={styles.subtitle}>💰 عدم المساواة الاقتصادية:</Text>{"\n"}
          • <Text style={styles.benefit}>اختلافات الدخل:</Text> فجوة بين الأغنياء والفقراء{"\n"}
          • <Text style={styles.benefit}>وصول غير متساوٍ:</Text> للموارد والتعليم والصحة{"\n"}
          • <Text style={styles.benefit}>فقر:</Text> نقص الموارد الاقتصادية الأساسية{"\n"}
          • <Text style={styles.benefit}>إقصاء مالي:</Text> بدون وصول للخدمات المصرفية
          {"\n\n"}
          <Text style={styles.subtitle}>🚫 التمييز والتحيزات:</Text>{"\n"}
          • <Text style={styles.benefit}>عنصرية:</Text> تمييز على أساس العرق أو الإثنية{"\n"}
          • <Text style={styles.benefit}>تمييز جنسي:</Text> تمييز على أساس الجنس{"\n"}
          • <Text style={styles.benefit}>تمييز عمري:</Text> تمييز على أساس العمر{"\n"}
          • <Text style={styles.benefit}>كراهية الأجانب:</Text> خوف أو رفض للأجانب
          {"\n\n"}
          <Text style={styles.subtitle}>🌍 الهجرة واللاجئين:</Text>{"\n"}
          • <Text style={styles.benefit}>هجرة قسرية:</Text> بسبب نزاعات أو أزمات{"\n"}
          • <Text style={styles.benefit}>تكامل ثقافي:</Text> التكيف مع مجتمعات جديدة{"\n"}
          • <Text style={styles.benefit}>حقوق المهاجرين:</Text> الوصول للخدمات الأساسية{"\n"}
          • <Text style={styles.benefit}>لاجئين:</Text> أشخاص يفرون من مخاطر
        </Text>
      </View>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>🌟 ¿Cómo podemos ayudar?</Text>
        <Text style={styles.sectionText}>
          <Text style={styles.tip}>Educarse:</Text> Informarse sobre los problemas para comprenderlos mejor
          {"\n"}
          <Text style={styles.tip}>Respetar la diversidad:</Text> Valorar las diferencias culturales y personales
          {"\n"}
          <Text style={styles.tip}>Participar:</Text> Involucrarse en proyectos comunitarios y voluntariados
          {"\n"}
          <Text style={styles.tip}>Apoyar causas:</Text> Contribuir a organizaciones que trabajan por la justicia social
        </Text>
        <Text style={styles.sectionTextAr}>
          <Text style={styles.tip}>التعلم:</Text> الاطلاع على المشاكل لفهمها بشكل أفضل
          {"\n"}
          <Text style={styles.tip}>احترام التنوع:</Text> تقدير الاختلافات الثقافية والشخصية
          {"\n"}
          <Text style={styles.tip}>المشاركة:</Text> الانخراط في مشاريع مجتمعية وأعمال تطوعية
          {"\n"}
          <Text style={styles.tip}>دعم القضايا:</Text> المساهمة في منظمات تعمل من أجل العدالة الاجتماعية
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
