import React from 'react';
import { ScrollView, View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { useRouter } from 'expo-router';
import { LinearGradient } from 'expo-linear-gradient';
import Ionicons from '@expo/vector-icons/Ionicons';

export default function CursoSeguridadLaboralScreen() {
  const router = useRouter();

  return (
    <View style={styles.container}>
      {/* Header con botón de regreso */}
      <LinearGradient
        colors={['#000', '#000']}
        style={styles.header}
      >
        <View style={styles.headerContent}>
          <TouchableOpacity
            style={styles.backButton}
            onPress={() => router.push("/PreFormacionScreen")}
          >
            <Ionicons name="arrow-back" size={24} color="#FFD700" />
          </TouchableOpacity>

          <View style={styles.headerInfo}>
            <Text style={styles.headerTitle}>Seguridad Laboral</Text>
            <Text style={styles.headerTitleAr}>السلامة في العمل</Text>
          </View>
        </View>
      </LinearGradient>

      <ScrollView contentContainerStyle={styles.scrollContent}>
        <Text style={styles.sectionTitle}>📌 ¿Qué aprenderás?</Text>
        <Text style={styles.textBlock}>{`
1. Principios básicos de prevención de riesgos laborales.
2. Identificación y evaluación de peligros en el trabajo.
3. Medidas de protección y equipos de seguridad personal.
4. Protocolos de actuación en emergencias y primeros auxilios.
5. Normativas legales sobre seguridad y salud laboral.
6. Ergonomía y prevención de enfermedades profesionales.
7. Gestión de la seguridad en el lugar de trabajo.
8. Derechos y responsabilidades de trabajadores y empresarios.`}</Text>

        <Text style={styles.sectionTitle}>📚 Módulos del Curso:</Text>
        <Text style={styles.textBlock}>{`MÓDULO 1: CONCEPTOS BÁSICOS
- Definición y objetivos de la seguridad laboral
- Legislación española en materia de prevención
- Derechos y deberes de trabajadores y empresarios
- Cultura preventiva en el trabajo

MÓDULO 2: IDENTIFICACIÓN DE RIESGOS
- Tipos de riesgos laborales (físicos, químicos, biológicos, psicosociales)
- Evaluación de riesgos en el puesto de trabajo
- Análisis de accidentes y enfermedades profesionales
- Metodologías de evaluación de riesgos

MÓDULO 3: MEDIDAS DE PROTECCIÓN
- Equipos de protección personal (EPP)
- Medidas de protección colectiva
- Señalización de seguridad
- Procedimientos de trabajo seguro

MÓDULO 4: ERGONOMÍA Y SALUD
- Principios de ergonomía en el trabajo
- Prevención de trastornos musculoesqueléticos
- Salud mental en el trabajo
- Factores psicosociales y estrés laboral

MÓDULO 5: EMERGENCIAS Y PRIMEROS AUXILIOS
- Planes de emergencia y evacuación
- Técnicas básicas de primeros auxilios
- Uso de extintores y equipos contra incendios
- Simulacros y formación en emergencias

MÓDULO 6: GESTIÓN DE LA SEGURIDAD
- Comités de seguridad y salud
- Investigación de accidentes
- Formación y sensibilización
- Mejora continua de la seguridad`}</Text>

        <Text style={styles.sectionTitle}>⚠️ Tipos de Riesgos Laborales:</Text>
        <Text style={styles.textBlock}>{`RIESGOS FÍSICOS:
- Ruido / ضوضاء
- Vibraciones / اهتزازات
- Temperaturas extremas / درجات حرارة قصوى
- Radiaciones / إشعاعات
- Iluminación inadecuada / إضاءة غير مناسبة

RIESGOS QUÍMICOS:
- Sustancias tóxicas / مواد سامة
- Gases y vapores / غازات وأبخرة
- Líquidos inflamables / سوائل قابلة للاشتعال
- Polvos y aerosoles / غبار ورذاذ

RIESGOS BIOLÓGICOS:
- Virus y bacterias / فيروسات وبكتيريا
- Hongos y parásitos / فطريات وطفيليات
- Alergenos / مواد مسببة للحساسية

RIESGOS PSICOSOCIALES:
- Estrés laboral / التوتر المهني
- Acoso laboral / التحرش المهني
- Sobrecarga de trabajo / الإرهاق من العمل
- Falta de autonomía / نقص الاستقلالية`}</Text>

        <Text style={styles.sectionTitle}>🛡️ Equipos de Protección Personal:</Text>
        <Text style={styles.textBlock}>{`PROTECCIÓN DE CABEZA:
- Cascos de seguridad / خوذات الأمان
- Gorros y redes para cabello / قبعات وشبكات للشعر

PROTECCIÓN OCULAR Y FACIAL:
- Gafas de seguridad / نظارات الأمان
- Pantallas faciales / واقيات الوجه
- Caretas soldador / أقنعة اللحام

PROTECCIÓN RESPIRATORIA:
- Máscaras antipolvo / أقنعة مضادة للغبار
- Respiradores con filtro / أجهزة تنفس مع مرشح
- Máscaras de gas / أقنعة الغاز

PROTECCIÓN DE MANOS:
- Guantes de nitrilo / قفازات النيتريل
- Guantes de cuero / قفازات الجلد
- Guantes térmicos / قفازات حرارية

PROTECCIÓN CORPORAL:
- Chalecos reflectantes / سترات عاكسة
- Overoles de protección / بدلات واقية
- Delantales ignífugos / مآزر مقاومة للنار

PROTECCIÓN DE PIES:
- Botas de seguridad / أحذية الأمان
- Zapatos antideslizantes / أحذية مضادة للانزلاق
- Cubrezapatos / غطاء الأحذية`}</Text>

        <Text style={styles.sectionTitle}>🚨 Plan de Emergencias:</Text>
        <Text style={styles.textBlock}>{`ELEMENTOS DEL PLAN:
- Identificación de riesgos / تحديد المخاطر
- Medidas de prevención / تدابير الوقاية
- Procedimientos de actuación / إجراءات العمل
- Medios de protección / وسائل الحماية

ROLES Y RESPONSABILIDADES:
- Jefe de emergencia / رئيس الطوارئ
- Equipo de primeros auxilios / فريق الإسعافات الأولية
- Equipo de evacuación / فريق الإخلاء
- Coordinador externo / منسق خارجي

PROCEDIMIENTOS DE EVACUACIÓN:
- Alarmas y señales / إنذارات وإشارات
- Rutas de evacuación / طرق الإخلاء
- Puntos de reunión / نقاط التجمع
- Conteo de personal / عد الأشخاص`}</Text>

        <Text style={styles.sectionTitle}>🏥 Primeros Auxilios:</Text>
        <Text style={styles.textBlock}>{`TÉCNICAS BÁSICAS:
- Evaluación inicial de la víctima / التقييم الأولي للضحية
- Posición lateral de seguridad / الوضع الجانبي الآمن
- Reanimación cardiopulmonar (RCP) / الإنعاش القلبي الرئوي
- Control de hemorragias / السيطرة على النزيف

TRATAMIENTO DE HERIDAS:
- Limpieza de heridas / تنظيف الجروح
- Aplicación de vendajes / تطبيق الضمادات
- Inmovilización de fracturas / تثبيت الكسور
- Tratamiento de quemaduras / علاج الحروق

ATENCIÓN A ENFERMEDADES:
- Desmayos y lipotimias / الإغماء والدوخة
- Ataques epilépticos / نوبات الصرع
- Infartos y accidentes cerebrovasculares / النوبات القلبية والسكتات الدماغية
- Reacciones alérgicas / ردود الفعل التحسسية`}</Text>

        <Text style={styles.sectionTitle}>📋 Legislación Española:</Text>
        <Text style={styles.textBlock}>{`LEY DE PREVENCIÓN DE RIESGOS LABORALES:
- Obligaciones del empresario / واجبات صاحب العمل
- Derechos del trabajador / حقوق العامل
- Servicios de prevención / خدمات الوقاية
- Sanciones por incumplimiento / العقوبات لعدم الامتثال

EVALUACIÓN DE RIESGOS:
- Identificación de peligros / تحديد الأخطار
- Evaluación de probabilidades / تقييم الاحتمالات
- Medidas preventivas / التدابير الوقائية
- Planes de acción / خطط العمل

COMITÉS DE SEGURIDAD:
- Composición y funciones / التركيب والوظائف
- Reuniones periódicas / اجتماعات دورية
- Participación de trabajadores / مشاركة العمال
- Registro de acuerdos / تسجيل الاتفاقات`}</Text>

        <Text style={styles.sectionTitle}>🏢 Ergonomía en el Trabajo:</Text>
        <Text style={styles.textBlock}>{`POSTURAS CORRECTAS:
- Alineación de columna vertebral / محاذاة العمود الفقري
- Posición de brazos y hombros / وضع الذراعين والكتفين
- Altura adecuada del puesto de trabajo / ارتفاع مناسب لمكان العمل
- Descansos periódicos / فترات راحة دورية

PREVENCIÓN DE LESIONES:
- Levantamiento de cargas / رفع الأحمال
- Movimientos repetitivos / الحركات المتكررة
- Posturas estáticas prolongadas / الوضعيات الساكنة المطولة
- Diseño ergonómico del puesto / تصميم مريح للمكان

SALUD VISUAL:
- Distancia adecuada a pantallas / مسافة مناسبة من الشاشات
- Iluminación correcta / إضاءة صحيحة
- Pausas para descanso visual / فترات راحة للعينين
- Corrección visual adecuada / تصحيح بصري مناسب`}</Text>

        <Text style={styles.sectionTitle}>🔍 Investigación de Accidentes:</Text>
        <Text style={styles.textBlock}>{`METODOLOGÍA DE INVESTIGACIÓN:
- Recopilación de información / جمع المعلومات
- Análisis de causas raíz / تحليل الأسباب الجذرية
- Determinación de factores contribuyentes / تحديد العوامل المساهمة
- Elaboración de conclusiones / صياغة الاستنتاجات

TIPOS DE ACCIDENTES:
- Accidentes con baja / إصابات مع إجازة
- Accidentes in itinere / حوادث في الطريق
- Enfermedades profesionales / أمراض مهنية
- Accidentes mortales / حوادث مميتة

MEDIDAS CORRECTIVAS:
- Implementación de barreras / تنفيذ الحواجز
- Modificación de procedimientos / تعديل الإجراءات
- Formación adicional / تدريب إضافي
- Mejora de equipos / تحسين المعدات`}</Text>

        <Text style={styles.sectionTitle}>💼 Oportunidades Laborales:</Text>
        <Text style={styles.textBlock}>{`PUESTOS RELACIONADOS:
- Técnico de prevención de riesgos / فني الوقاية من المخاطر
- Coordinador de seguridad / منسق السلامة
- Formador en seguridad laboral / مدرب في السلامة المهنية
- Auditor de seguridad / مدقق السلامة
- Responsable de PRL / مسؤول عن الوقاية من المخاطر
- Delegado de prevención / مندوب الوقاية

SECTORES DE APLICACIÓN:
- Construcción / البناء
- Industria manufacturera / الصناعة التحويلية
- Servicios / الخدمات
- Hostelería / الضيافة
- Sanidad / الصحة
- Educación / التعليم

COMPETENCIAS CLAVE:
- Conocimiento normativo / المعرفة التنظيمية
- Habilidades de evaluación / مهارات التقييم
- Comunicación efectiva / تواصل فعال
- Trabajo en equipo / العمل الجماعي
- Resolución de problemas / حل المشكلات

CERTIFICACIONES:
- Técnico Superior en PRL / فني عليا في الوقاية من المخاطر
- Auditor de sistemas de gestión / مدقق أنظمة الإدارة
- Formador ocupacional / مدرب مهني
- Especialista en emergencias / متخصص في الطوارئ
- Coordinador de seguridad / منسق السلامة`}</Text>

        <Text style={styles.sectionTitleAr}>📚 الوحدات المفصلة:</Text>
        <Text style={styles.textBlockAr}>{`الوحدة الأولى: المفاهيم الأساسية
- تعريف وأهداف السلامة المهنية
- التشريعات الإسبانية في مجال الوقاية
- حقوق وواجبات العمال وأصحاب العمل
- ثقافة الوقاية في العمل

الوحدة الثانية: تحديد المخاطر
- أنواع المخاطر المهنية (فيزيائية، كيميائية، بيولوجية، نفسية اجتماعية)
- تقييم المخاطر في مكان العمل
- تحليل الحوادث والأمراض المهنية
- منهجيات تقييم المخاطر

الوحدة الثالثة: تدابير الحماية
- معدات الحماية الشخصية
- تدابير الحماية الجماعية
- إشارات السلامة
- إجراءات العمل الآمن

الوحدة الرابعة: الإرجونوميا والصحة
- مبادئ الإرجونوميا في العمل
- الوقاية من الاضطرابات العضلية الهيكلية
- الصحة النفسية في العمل
- العوامل النفسية الاجتماعية والتوتر المهني

الوحدة الخامسة: الطوارئ والإسعافات الأولية
- خطط الطوارئ والإخلاء
- تقنيات الإسعافات الأولية الأساسية
- استخدام المطفآت ومعدات مكافحة الحريق
- التدريبات والتكوين في الطوارئ

الوحدة السادسة: إدارة السلامة
- لجان السلامة والصحة
- التحقيق في الحوادث
- التدريب والتوعية
- التحسين المستمر للسلامة`}</Text>

        <Text style={styles.sectionTitleAr}>⚠️ أنواع المخاطر المهنية:</Text>
        <Text style={styles.textBlockAr}>{`المخاطر الفيزيائية:
- الضوضاء
- الاهتزازات
- درجات الحرارة القصوى
- الإشعاعات
- الإضاءة غير المناسبة

المخاطر الكيميائية:
- المواد السامة
- الغازات والأبخرة
- السوائل القابلة للاشتعال
- الغبار والرذاذ

المخاطر البيولوجية:
- الفيروسات والبكتيريا
- الفطريات والطفيليات
- المواد المسببة للحساسية

المخاطر النفسية الاجتماعية:
- التوتر المهني
- التحرش المهني
- الإرهاق من العمل
- نقص الاستقلالية`}</Text>

        <Text style={styles.sectionTitleAr}>🚨 خطة الطوارئ:</Text>
        <Text style={styles.textBlockAr}>{`عناصر الخطة:
- تحديد المخاطر
- تدابير الوقاية
- إجراءات العمل
- وسائل الحماية

الأدوار والمسؤوليات:
- رئيس الطوارئ
- فريق الإسعافات الأولية
- فريق الإخلاء
- منسق خارجي

إجراءات الإخلاء:
- الإنذارات والإشارات
- طرق الإخلاء
- نقاط التجمع
- عد الأشخاص`}</Text>

        <Text style={styles.sectionTitleAr}>💼 فرص العمل:</Text>
        <Text style={styles.textBlockAr}>{`الوظائف ذات الصلة:
- فني الوقاية من المخاطر
- منسق السلامة
- مدرب في السلامة المهنية
- مدقق السلامة
- مسؤول عن الوقاية من المخاطر
- مندوب الوقاية

قطاعات التطبيق:
- البناء
- الصناعة التحويلية
- الخدمات
- الضيافة
- الصحة
- التعليم

الكفاءات الرئيسية:
- المعرفة التنظيمية
- مهارات التقييم
- تواصل فعال
- العمل الجماعي
- حل المشكلات

الشهادات:
- فني عليا في الوقاية من المخاطر
- مدقق أنظمة الإدارة
- مدرب مهني
- متخصص في الطوارئ
- منسق السلامة`}</Text>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  header: {
    paddingTop: 50,
    paddingBottom: 20,
    paddingHorizontal: 20,
  },
  headerContent: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  backButton: {
    padding: 8,
    marginRight: 16,
  },
  headerInfo: {
    flex: 1,
  },
  headerTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#FFD700',
    marginBottom: 4,
  },
  headerTitleAr: {
    fontSize: 16,
    color: '#FFD700',
    opacity: 0.9,
    textAlign: 'right',
  },
  scrollContent: {
    padding: 24,
    paddingBottom: 48,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#000',
    marginTop: 18,
    marginBottom: 6,
    textAlign: 'left',
    alignSelf: 'flex-start',
  },
  sectionTitleAr: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#000',
    marginTop: 18,
    marginBottom: 6,
    textAlign: 'right',
    alignSelf: 'flex-end',
    writingDirection: 'rtl',
    fontFamily: 'System',
  },
  textBlock: {
    fontSize: 16,
    color: '#444',
    marginBottom: 8,
    textAlign: 'left',
    alignSelf: 'flex-start',
    lineHeight: 22,
  },
  textBlockAr: {
    fontSize: 16,
    color: '#444',
    marginBottom: 8,
    textAlign: 'right',
    alignSelf: 'flex-end',
    writingDirection: 'rtl',
    fontFamily: 'System',
    lineHeight: 22,
  },
});

export default CursoSeguridadLaboralScreen;
