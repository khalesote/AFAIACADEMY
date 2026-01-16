import React from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, Image, Alert } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import EjerciciosInteractivos from '../../../components/EjerciciosInteractivos';
import { useUserProgress } from '@/contexts/UserProgressContext';
import { LinearGradient } from 'expo-linear-gradient';

export default function Cultura() {
  const router = useRouter();
  const { progress, markUnitCompleted } = useUserProgress();
  const levelProgress = progress.B1;
  const alreadyCompleted = levelProgress?.unitsCompleted?.[5] ?? false;

  const handleFinish = () => {
    if (!alreadyCompleted) {
      markUnitCompleted('B1', 5);
    }
    // Navegar directamente a la siguiente unidad (Estudios)
    router.push('/B1_Umbral/clases/Estudios');
  };

  const ejercicios = [
    // Ejercicio 1: Vocabulario - Relacionar iconos con tradiciones
    {
      tipo: 'vocabulario',
      titulo: 'Relaciona cada tradición española con su descripción:',
      pares: [
        { izquierda: '💃 Flamenco', derecha: 'Baile y música tradicional de Andalucía' },
        { izquierda: '🍚 Paella', derecha: 'Plato típico de arroz de Valencia' },
        { izquierda: '🐂 San Fermín', derecha: 'Fiesta de toros en Pamplona' },
        { izquierda: '🔥 Fallas', derecha: 'Festival de fuego en Valencia' }
      ]
    },

    // Ejercicio 2: Opción múltiple
    {
      tipo: 'opcion_multiple',
      pregunta: '¿Cuál es la mejor definición de tradición cultural?',
      opciones: ['Cultura', 'Tradición', 'Festividad', 'Celebración'],
      respuestaCorrecta: 1,
      explicacion: 'Una tradición cultural es una costumbre o práctica que se transmite de generación en generación',
      explicacionAr: 'التقليد الثقافي هو عادة أو ممارسة تنتقل من جيل إلى جيل'
    },

    // Ejercicio 3: Opción múltiple
    {
      tipo: 'opcion_multiple',
      pregunta: '¿Qué emoción expresa la frase "echar de menos"?',
      opciones: ['Olvidar', 'Extrañar o sentir nostalgia', 'Recordar', 'Celebrar'],
      respuestaCorrecta: 1,
      explicacion: '"Echar de menos" significa sentir nostalgia o extrañar algo o alguien',
      explicacionAr: '"إيتشار دي مينوس" تعني الشعور بالحنين أو الاشتياق لشيء أو شخص ما'
    },

    // Ejercicio 4: Opción múltiple
    {
      tipo: 'opcion_multiple',
      pregunta: '¿Cómo reconocerías una festividad importante?',
      opciones: ['Un día normal', 'Una celebración o fiesta importante', 'Un trabajo', 'Una comida'],
      respuestaCorrecta: 1,
      explicacion: 'Una festividad importante se caracteriza por ser una celebración o fiesta significativa',
      explicacionAr: 'العيد المهم يتميز بكونه احتفالاً أو عيداً ذا أهمية'
    },

    // Ejercicio 5: Opción múltiple
    {
      tipo: 'opcion_multiple',
      pregunta: '¿Qué significa realmente adaptarse a un nuevo país?',
      opciones: ['Cambiar completamente de personalidad', 'Aprender a vivir en la nueva cultura', 'Olvidar la cultura de origen', 'Solo celebrar sus fiestas'],
      respuestaCorrecta: 1,
      explicacion: 'Adaptarse significa aprender a vivir y funcionar en la nueva cultura sin perder la propia identidad',
      explicacionAr: 'التكيف يعني تعلم العيش والعمل في الثقافة الجديدة دون فقدان الهوية الخاصة'
    },

    // Ejercicio 6: Opción múltiple
    {
      tipo: 'opcion_multiple',
      pregunta: '¿Qué actitud muestra respeto cultural?',
      opciones: ['Ignorar las diferencias', 'Aceptar y valorar las diferencias', 'Obligar a otros a cambiar', 'Seguir solo las propias costumbres'],
      respuestaCorrecta: 1,
      explicacion: 'El respeto cultural implica aceptar y valorar las diferencias culturales',
      explicacionAr: 'الاحترام الثقافي يعني قبول وتقدير الاختلافات الثقافية'
    },

    // Ejercicio 7: Opción múltiple
    {
      tipo: 'opcion_multiple',
      pregunta: '¿Qué incluye el patrimonio cultural de un país?',
      opciones: ['Solo monumentos antiguos', 'Toda la herencia cultural', 'Exclusivamente el arte', 'Solo lo que está en museos'],
      respuestaCorrecta: 1,
      explicacion: 'El patrimonio cultural abarca toda la herencia cultural de un país',
      explicacionAr: 'التراث الثقافي يشمل كل الإرث الثقافي للبلد'
    },

    // Ejercicio 8: Opción múltiple
    {
      tipo: 'opcion_multiple',
      pregunta: '¿Cuándo es la Tomatina?',
      opciones: ['En enero', 'El último miércoles de agosto', 'En Navidad', 'Durante las Fallas'],
      respuestaCorrecta: 1,
      explicacion: 'La Tomatina se celebra el último miércoles de agosto en Buñol, Valencia',
      explicacionAr: 'توماتينا تحتفل في آخر أربعاء من أغسطس في بونيول، فالنسيا'
    },

    // Ejercicio 9: Opción múltiple
    {
      tipo: 'opcion_multiple',
      pregunta: '¿Qué es la identidad cultural?',
      opciones: ['El pasaporte que tienes', 'Tu sentido de pertenencia', 'El idioma que hablas', 'La comida que prefieres'],
      respuestaCorrecta: 1,
      explicacion: 'La identidad cultural es el sentido de pertenencia a una cultura específica',
      explicacionAr: 'الهوية الثقافية هي الشعور بالانتماء إلى ثقافة معينة'
    },

    // Ejercicio 10: Opción múltiple
    {
      tipo: 'opcion_multiple',
      pregunta: '¿Qué caracteriza a un ritual cultural?',
      opciones: ['Una simple reunión', 'Una ceremonia con significado', 'Un baile cualquiera', 'Una comida sin más'],
      respuestaCorrecta: 1,
      explicacion: 'Un ritual cultural es una ceremonia que tiene un significado especial y simbólico',
      explicacionAr: 'الطقس الثقافي هو احتفال له معنى خاص ورمزي'
    }
  ];

  return (
    <ScrollView style={styles.container} contentContainerStyle={styles.content}>
      <TouchableOpacity
        style={styles.backButton}
        onPress={() => router.back()}
      >
        <Ionicons name="arrow-back" size={28} color="#79A890" />
      </TouchableOpacity>

      <Image
        source={{ uri: 'https://images.unsplash.com/photo-1534088568595-a066f410bcda?auto=format&fit=crop&w=600&q=80' }}
        style={styles.heroImage}
        accessibilityLabel="Imagen de cultura española"
      />

      <Text style={styles.title}>Cultura y Tradiciones Españolas</Text>
      <Text style={styles.titleAr}>الثقافة والتقاليد الإسبانية</Text>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Contexto y Objetivos</Text>
        <Text style={styles.sectionText}>
          En esta unidad explorarás la rica cultura española, sus tradiciones más arraigadas 
          y cómo estas influyen en la vida cotidiana. Aprenderás a apreciar la diversidad 
          cultural y a entender la importancia de mantener las tradiciones propias mientras 
          te adaptas a una nueva cultura.
        </Text>
        <Text style={styles.sectionTextAr}>
          في هذه الوحدة ستستكشف الثقافة الإسبانية الغنية وتقاليدها المتجذرة 
          وكيف تؤثر على الحياة اليومية. ستتعلم تقدير التنوع الثقافي 
          وفهم أهمية الحفاظ على التقاليد الخاصة بينما تتكيف مع ثقافة جديدة.
        </Text>
      </View>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Tradiciones Principales</Text>
        <Text style={styles.sectionText}>
          <Text style={styles.subtitle}>🎭 Flamenco:</Text> El baile y la música más representativa de Andalucía, 
          declarado Patrimonio Cultural Inmaterial de la Humanidad por la UNESCO.
        </Text>
        <Text style={styles.sectionText}>
          <Text style={styles.subtitle}>🍚 Paella:</Text> Plato emblemático de Valencia, elaborado con arroz, 
          azafrán y diversos ingredientes como pollo, conejo o mariscos.
        </Text>
        <Text style={styles.sectionText}>
          <Text style={styles.subtitle}>🐂 San Fermín:</Text> Fiesta tradicional de Pamplona, famosa por 
          el encierro de toros que se celebra cada 7 de julio.
        </Text>
        <Text style={styles.sectionText}>
          <Text style={styles.subtitle}>🔥 Fallas:</Text> Festival de fuego en Valencia, donde se queman 
          grandes esculturas de cartón piedra en la noche de San José.
        </Text>
      </View>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Festividades Importantes</Text>
        <Text style={styles.sectionText}>
          <Text style={styles.subtitle}>🎄 Navidad:</Text> Se celebra del 24 de diciembre al 6 de enero, 
          con tradiciones como la Nochebuena, el Día de Navidad y la Epifanía (Reyes Magos).
        </Text>
        <Text style={styles.sectionText}>
          <Text style={styles.subtitle}>🌺 Semana Santa:</Text> Conmemoración religiosa con procesiones 
          solemnes en toda España, especialmente en Andalucía.
        </Text>
        <Text style={styles.sectionText}>
          <Text style={styles.subtitle}>🍅 La Tomatina:</Text> Batalla de tomates en Buñol (Valencia) 
          el último miércoles de agosto, una fiesta única en el mundo.
        </Text>
        <Text style={styles.sectionText}>
          <Text style={styles.subtitle}>🎭 Carnaval:</Text> Celebrado en febrero, especialmente en Cádiz 
          y las Islas Canarias, con desfiles, disfraces y música.
        </Text>
      </View>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Adaptación Cultural</Text>
        <Text style={styles.sectionText}>
          Adaptarse a una nueva cultura no significa renunciar a la tuya, sino aprender a 
          navegar entre ambas. Es importante mantener tus tradiciones mientras respetas y 
          aprendes de las nuevas.
        </Text>
        <Text style={styles.sectionTextAr}>
          التكيف مع ثقافة جديدة لا يعني التخلي عن ثقافتك، بل تعلم التنقل بين الاثنتين. 
          من المهم الحفاظ على تقاليدك بينما تحترم وتتعلم من الجديدة.
        </Text>
      </View>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Diálogo Cultural</Text>
        <Text style={styles.dialogueTitle}>Conversación sobre tradiciones:</Text>
        <Text style={styles.sectionText}>
          <Text style={styles.speaker}>María:</Text> ¿Qué tradiciones tienes en tu país?
        </Text>
        <Text style={styles.sectionText}>
          <Text style={styles.speaker}>Ahmed:</Text> Tenemos muchas fiestas religiosas y celebramos el fin del Ramadán.
        </Text>
        <Text style={styles.sectionText}>
          <Text style={styles.speaker}>María:</Text> ¡Qué interesante! ¿Te gustaría que te explique las Fallas?
        </Text>
        <Text style={styles.sectionText}>
          <Text style={styles.speaker}>Ahmed:</Text> Sí, me encantaría. También puedo contarte sobre nuestras tradiciones.
        </Text>
      </View>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Beneficios de la Diversidad Cultural</Text>
        <Text style={styles.sectionText}>
          • <Text style={styles.benefit}>Enriquecimiento personal:</Text> Aprender de otras culturas amplía tu perspectiva
        </Text>
        <Text style={styles.sectionText}>
          • <Text style={styles.benefit}>Tolerancia:</Text> Entender diferentes formas de vida fomenta la empatía
        </Text>
        <Text style={styles.sectionText}>
          • <Text style={styles.benefit}>Innovación:</Text> La diversidad cultural estimula la creatividad y nuevas ideas
        </Text>
        <Text style={styles.sectionText}>
          • <Text style={styles.benefit}>Paz social:</Text> El respeto mutuo reduce conflictos y construye comunidades más fuertes
        </Text>
      </View>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Consejos para la Integración</Text>
        <Text style={styles.sectionText}>
          <Text style={styles.tip}>1. Participa:</Text> Únete a celebraciones locales y comparte las tuyas
        </Text>
        <Text style={styles.sectionText}>
          <Text style={styles.tip}>2. Aprende:</Text> Investiga sobre la historia y costumbres del lugar
        </Text>
        <Text style={styles.sectionText}>
          <Text style={styles.tip}>3. Respeta:</Text> Acepta las diferencias sin juzgar
        </Text>
        <Text style={styles.sectionText}>
          <Text style={styles.tip}>4. Comparte:</Text> Enseña a otros sobre tu cultura
        </Text>
        <Text style={styles.sectionText}>
          <Text style={styles.tip}>5. Sé paciente:</Text> La adaptación cultural lleva tiempo
        </Text>
      </View>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Ejercicios Interactivos</Text>
        <Text style={styles.sectionText}>
          Practica lo que has aprendido sobre la cultura española con estos ejercicios interactivos.
        </Text>

        <EjerciciosInteractivos
          ejercicios={ejercicios}
          onComplete={handleFinish}
        />
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
    fontSize: 16,
    fontWeight: 'bold',
    color: '#79A890',
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

