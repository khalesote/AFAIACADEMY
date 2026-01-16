import React from 'react';
import { ScrollView, View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { useRouter } from 'expo-router';
import { LinearGradient } from 'expo-linear-gradient';
import Ionicons from '@expo/vector-icons/Ionicons';

export default function CursoMecanicaScreen() {
  const router = useRouter();

  return (
    <View style={styles.container}>
      <LinearGradient colors={['#000', '#000']} style={styles.header}>
        <View style={styles.headerContent}>
          <TouchableOpacity style={styles.backButton} onPress={() => router.back()}>
            <Ionicons name="arrow-back" size={24} color="#fff" />
          </TouchableOpacity>
          <View style={styles.headerInfo}>
            <Text style={styles.headerTitle}>Curso de Mecánica Básica</Text>
            <Text style={styles.headerTitleAr}>دورة الميكانيكا الأساسية</Text>
          </View>
        </View>
      </LinearGradient>

      <ScrollView contentContainerStyle={styles.scrollContent}>
        <Text style={styles.sectionTitle}>🎯 Objetivos del curso / أهداف الدورة</Text>
        <View style={styles.textBlock}>
          <Text style={styles.bulletPoint}>• Comprender los principios básicos de funcionamiento de un vehículo.</Text>
          <Text style={styles.arabicText}>فهم المبادئ الأساسية لعمل السيارة.</Text>
          <Text style={styles.bulletPoint}>• Aprender a usar herramientas manuales y eléctricas de manera segura.</Text>
          <Text style={styles.arabicText}>تعلم استخدام الأدوات اليدوية والكهربائية بأمان.</Text>
          <Text style={styles.bulletPoint}>• Diagnosticar y solucionar problemas comunes en motores, frenos y suspensión.</Text>
          <Text style={styles.arabicText}>تشخيص وحل المشاكل الشائعة في المحركات والفرامل والتعليق.</Text>
          <Text style={styles.bulletPoint}>• Aplicar normas de seguridad y mantenimiento preventivo.</Text>
          <Text style={styles.arabicText}>تطبيق معايير السلامة والصيانة الوقائية.</Text>
        </View>

        <Text style={styles.sectionTitle}>📚 Módulos del Curso / وحدات الدورة</Text>

        <Text style={styles.subsectionTitle}>MÓDULO 1: HERRAMIENTAS Y EQUIPOS / الوحدة 1: الأدوات والمعدات</Text>
        <View style={styles.textBlock}>
          <Text style={styles.bulletPoint}>• Herramientas manuales: llaves, destornilladores, alicates.</Text>
          <Text style={styles.arabicText}>الأدوات اليدوية: المفاتيح، البراغي، الكماشات.</Text>
          <Text style={styles.bulletPoint}>• Equipos eléctricos: taladros, lijadoras, compresores.</Text>
          <Text style={styles.arabicText}>المعدات الكهربائية: المثاقب، الرمليات، الضواغط.</Text>
          <Text style={styles.bulletPoint}>• Medición y calibración: calibres, niveles, multímetros.</Text>
          <Text style={styles.arabicText}>القياس والمعايرة: المقاييس، المستويات، متعدد الأمتار.</Text>
          <View style={styles.tableExample}>
            <Text style={styles.tableTitle}>Kit básico de herramientas</Text>
            <Text style={styles.tableHeader}>Herramienta | Uso | Seguridad</Text>
            <Text style={styles.tableRow}>Llave inglesa | Ajuste tuercas | Usar guantes</Text>
            <Text style={styles.tableRow}>Destornillador | Tornillos | Punta adecuada</Text>
            <Text style={styles.tableRow}>Alicates | Cables | No sobrecargar</Text>
            <Text style={styles.tableNote}>Mantén las herramientas limpias y organizadas en una caja.</Text>
          </View>
        </View>

        <Text style={styles.subsectionTitle}>MÓDULO 2: PRINCIPIOS DEL MOTOR / الوحدة 2: مبادئ المحرك</Text>
        <View style={styles.textBlock}>
          <Text style={styles.bulletPoint}>• Ciclo Otto y ciclo diésel: combustión interna.</Text>
          <Text style={styles.arabicText}>دورة أوتو ودورة الديزل: الاحتراق الداخلي.</Text>
          <Text style={styles.bulletPoint}>• Componentes principales: pistones, válvulas, cigüeñal.</Text>
          <Text style={styles.arabicText}>المكونات الرئيسية: المكابس، الصمامات، عمود المرفق.</Text>
          <Text style={styles.bulletPoint}>• Sistemas auxiliares: refrigeración, lubricación, admisión/escape.</Text>
          <Text style={styles.arabicText}>الأنظمة المساعدة: التبريد، التشحيم، السحب/الإخراج.</Text>
          <Text style={styles.exampleText}>Ejemplo: en un motor de 4 tiempos, el pistón realiza 4 movimientos por ciclo completo.</Text>
        </View>

        <Text style={styles.subsectionTitle}>MÓDULO 3: SISTEMA DE FRENOS / الوحدة 3: نظام الفرامل</Text>
        <View style={styles.textBlock}>
          <Text style={styles.bulletPoint}>• Frenos de tambor y de disco: funcionamiento y mantenimiento.</Text>
          <Text style={styles.arabicText}>فرامل الطبل والأقراص: العمل والصيانة.</Text>
          <Text style={styles.bulletPoint}>• Líquido de frenos y pastillas: reemplazo y purga.</Text>
          <Text style={styles.arabicText}>سائل الفرامل والأحذية: الاستبدال والتطهير.</Text>
          <Text style={styles.bulletPoint}>• ABS y ESP: sistemas avanzados de seguridad.</Text>
          <Text style={styles.arabicText}>ABS و ESP: أنظمة الأمان المتقدمة.</Text>
          <View style={styles.tableExample}>
            <Text style={styles.tableTitle}>Mantenimiento de frenos</Text>
            <Text style={styles.tableHeader}>Componente | Frecuencia | Síntomas de falla</Text>
            <Text style={styles.tableRow}>Pastillas | 20,000 km | Chillido, vibración</Text>
            <Text style={styles.tableRow}>Discos | 60,000 km | Rayones, deformación</Text>
            <Text style={styles.tableRow}>Líquido | Anual | Color oscuro, baja ebullición</Text>
            <Text style={styles.tableNote}>Inspecciona los frenos cada 10,000 km o antes de viajes largos.</Text>
          </View>
        </View>

        <Text style={styles.subsectionTitle}>MÓDULO 4: TRANSMISIÓN Y SUSPENSIÓN / الوحدة 4: النقل والتعليق</Text>
        <View style={styles.textBlock}>
          <Text style={styles.bulletPoint}>• Caja de cambios manual y automática: engranajes y sincronizadores.</Text>
          <Text style={styles.arabicText}>صندوق التروس اليدوي والآلي: التروس والمزامنات.</Text>
          <Text style={styles.bulletPoint}>• Eje de transmisión y diferencial: reparto de potencia.</Text>
          <Text style={styles.arabicText}>عمود النقل والدفرنس: توزيع الطاقة.</Text>
          <Text style={styles.bulletPoint}>• Suspensión: amortiguadores, ballestas, brazos de control.</Text>
          <Text style={styles.arabicText}>التعليق: الممتصات، النوابض، ذراع التحكم.</Text>
          <Text style={styles.exampleText}>Ejemplo: los amortiguadores absorben las vibraciones para una conducción suave.</Text>
        </View>

        <Text style={styles.subsectionTitle}>MÓDULO 5: SISTEMA ELÉCTRICO / الوحدة 5: النظام الكهربائي</Text>
        <View style={styles.textBlock}>
          <Text style={styles.bulletPoint}>• Batería, alternador y motor de arranque: carga y arranque.</Text>
          <Text style={styles.arabicText}>البطارية، المولد الكهربائي ومحرك البدء: الشحن والبدء.</Text>
          <Text style={styles.bulletPoint}>• Luces, sensores y computadora de a bordo.</Text>
          <Text style={styles.arabicText}>الأضواء، المستشعرات والحاسوب على متن السيارة.</Text>
          <Text style={styles.bulletPoint}>• Diagnóstico con escáner OBD-II.</Text>
          <Text style={styles.arabicText}>التشخيص باستخدام ماسح OBD-II.</Text>
        </View>

        <Text style={styles.subsectionTitle}>MÓDULO 6: MANTENIMIENTO PREVENTIVO / الوحدة 6: الصيانة الوقائية</Text>
        <View style={styles.textBlock}>
          <Text style={styles.bulletPoint}>• Cambio de aceite y filtros: intervalos recomendados.</Text>
          <Text style={styles.arabicText}>تغيير الزيت والفلاتر: الفواصل الموصى بها.</Text>
          <Text style={styles.bulletPoint}>• Revisión de neumáticos: presión, rotación, alineación.</Text>
          <Text style={styles.arabicText}>فحص الإطارات: الضغط، الدوران، المحاذاة.</Text>
          <Text style={styles.bulletPoint}>• Inspección general: correas, mangueras, fluidos.</Text>
          <Text style={styles.arabicText}>الفحص العام: الأحزمة، الخراطيم، السوائل.</Text>
          <View style={styles.tableExample}>
            <Text style={styles.tableTitle}>Calendario de mantenimiento</Text>
            <Text style={styles.tableHeader}>Servicio | Kilometraje | Notas</Text>
            <Text style={styles.tableRow}>Cambio aceite | 5,000-10,000 km | Según fabricante</Text>
            <Text style={styles.tableRow}>Filtros aire/aceite | 15,000 km | Ver manual</Text>
            <Text style={styles.tableRow}>Revisión general | 20,000 km | En taller certificado</Text>
            <Text style={styles.tableNote}>Registra todos los servicios en el libro de mantenimiento del vehículo.</Text>
          </View>
        </View>

        <Text style={styles.subsectionTitle}>MÓDULO 7: SEGURIDAD EN EL TALLER / الوحدة 7: السلامة في الورشة</Text>
        <View style={styles.textBlock}>
          <Text style={styles.bulletPoint}>• Equipo de protección personal (EPP): guantes, gafas, botas.</Text>
          <Text style={styles.arabicText}>معدات الحماية الشخصية: القفازات، النظارات، الأحذية.</Text>
          <Text style={styles.bulletPoint}>• Prevención de accidentes: manejo de herramientas, levantamiento de cargas.</Text>
          <Text style={styles.arabicText}>منع الحوادث: التعامل مع الأدوات، رفع الأحمال.</Text>
          <Text style={styles.bulletPoint}>• Primeros auxilios básicos y extintores.</Text>
          <Text style={styles.arabicText}>الإسعافات الأولية الأساسية ومطفآت الحريق.</Text>
          <View style={styles.tableExample}>
            <Text style={styles.tableTitle}>Protocolos de seguridad</Text>
            <Text style={styles.tableHeader}>Situación | Acción | Equipo necesario</Text>
            <Text style={styles.tableRow}>Corte con herramienta | Aplicar presión, buscar ayuda | Vendaje estéril</Text>
            <Text style={styles.tableRow}>Contacto eléctrico | Desconectar fuente | Guantes aislantes</Text>
            <Text style={styles.tableRow}>Incendio | Evacuar, usar extintor | Extintor CO2</Text>
            <Text style={styles.tableNote}>Mantén un botiquín de primeros auxilios siempre accesible.</Text>
          </View>
        </View>

        <Text style={styles.subsectionTitle}>MÓDULO 8: DIAGNÓSTICO Y REPARACIONES COMUNES / الوحدة 8: التشخيص والإصلاحات الشائعة</Text>
        <View style={styles.textBlock}>
          <Text style={styles.bulletPoint}>• Identificación de síntomas: ruidos, olores, indicadores del tablero.</Text>
          <Text style={styles.arabicText}>تحديد الأعراض: الأصوات، الروائح، مؤشرات لوحة القيادة.</Text>
          <Text style={styles.bulletPoint}>• Procedimientos de reparación: cambio de bujías, alineación de ruedas.</Text>
          <Text style={styles.arabicText}>إجراءات الإصلاح: تغيير الشموع، محاذاة العجلات.</Text>
          <Text style={styles.bulletPoint}>• Uso de manuales técnicos y diagramas.</Text>
          <Text style={styles.arabicText}>استخدام الدليل الفني والرسوم البيانية.</Text>
          <View style={styles.tableExample}>
            <Text style={styles.tableTitle}>Averías comunes y soluciones</Text>
            <Text style={styles.tableHeader}>Problema | Causa probable | Solución</Text>
            <Text style={styles.tableRow}>Motor no arranca | Batería descargada | Cargar o reemplazar</Text>
            <Text style={styles.tableRow}>Ruido en frenos | Pastillas desgastadas | Reemplazar pastillas</Text>
            <Text style={styles.tableRow}>Consumo alto aceite | Anillos desgastados | Revisar motor</Text>
            <Text style={styles.tableNote}>Siempre verifica códigos de error con escáner antes de reparar.</Text>
          </View>
        </View>

        <Text style={styles.subsectionTitle}>MÓDULO 9: ELECTRICIDAD AVANZADA / الوحدة 9: الكهرباء المتقدمة</Text>
        <View style={styles.textBlock}>
          <Text style={styles.bulletPoint}>• Circuitos eléctricos: relés, fusibles, sensores.</Text>
          <Text style={styles.arabicText}>الدوائر الكهربائية: الترحيلات، المصاهر، المستشعرات.</Text>
          <Text style={styles.bulletPoint}>• Sistemas de inyección: gasolina y diésel.</Text>
          <Text style={styles.arabicText}>أنظمة الحقن: البنزين والديزل.</Text>
          <Text style={styles.bulletPoint}>• Diagnóstico electrónico: uso de multímetro y osciloscopio.</Text>
          <Text style={styles.arabicText}>التشخيص الإلكتروني: استخدام متعدد الأمتار والمذبذب.</Text>
          <Text style={styles.exampleText}>Ejemplo: para diagnosticar un sensor defectuoso, mide la resistencia con multímetro.</Text>
        </View>

        <Text style={styles.subsectionTitle}>MÓDULO 10: PRÁCTICAS Y EJERCICIOS / الوحدة 10: التدريبات والتمارين</Text>
        <View style={styles.textBlock}>
          <Text style={styles.bulletPoint}>• Ejercicios teóricos: cuestionarios sobre componentes.</Text>
          <Text style={styles.arabicText}>التمارين النظرية: استبيانات حول المكونات.</Text>
          <Text style={styles.bulletPoint}>• Prácticas simuladas: ensamblaje de sistemas.</Text>
          <Text style={styles.arabicText}>التدريبات المحاكاة: تجميع الأنظمة.</Text>
          <Text style={styles.bulletPoint}>• Proyectos finales: diagnóstico completo de vehículo.</Text>
          <Text style={styles.arabicText}>المشاريع النهائية: تشخيص شامل للسيارة.</Text>
        </View>

        <Text style={styles.sectionTitle}>💼 Recursos y plantillas / الموارد والقوالب</Text>
        <View style={styles.textBlock}>
          <Text style={styles.bulletPoint}>• Lista de verificación de inspección pre-reparación.</Text>
          <Text style={styles.bulletPoint}>• Ficha de diagnóstico de averías comunes.</Text>
          <Text style={styles.bulletPoint}>• Tabla de torque para tuercas y tornillos (Nm).</Text>
          <View style={styles.tableExample}>
            <Text style={styles.tableTitle}>Torque recomendado para motores</Text>
            <Text style={styles.tableHeader}>Componente | Torque (Nm)</Text>
            <Text style={styles.tableRow}>Bujías | 25-30</Text>
            <Text style={styles.tableRow}>Ruedas | 90-110</Text>
            <Text style={styles.tableRow}>Cabezas cilindro | 60-80</Text>
            <Text style={styles.tableNote}>Usa siempre una llave dinamométrica para evitar daños.</Text>
          </View>
          <Text style={styles.arabicText}>نماذج لقوائم التحقق، بطاقات التشخيص، وجداول العزم.</Text>
        </View>

        <Text style={styles.sectionTitle}>🎓 Certificación / الشهادة</Text>
        <View style={styles.textBlock}>
          <Text style={styles.bulletPoint}>• Al finalizar todos los módulos, recibirás un certificado de mecánico básico.</Text>
          <Text style={styles.arabicText}>عند إكمال جميع الوحدات ستحصل على شهادة ميكانيكي أساسي.</Text>
          <Text style={styles.bulletPoint}>• Recomendamos practicar en un taller supervisado.</Text>
          <Text style={styles.arabicText}>ننصح بالتدريب في ورشة تحت إشراف.</Text>
          <Text style={styles.exampleText}>Certificación ideal: incluye teoría, práctica y evaluación final.</Text>
        </View>
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
    justifyContent: 'space-between',
  },
  backButton: {
    padding: 8,
  },
  headerInfo: {
    flex: 1,
    alignItems: 'center',
  },
  headerTitle: {
    fontSize: 22,
    fontWeight: 'bold',
    color: '#FFD700',
    textAlign: 'center',
  },
  headerTitleAr: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#FFD700',
    textAlign: 'center',
    writingDirection: 'rtl',
  },
  scrollContent: {
    padding: 20,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#000',
    marginTop: 20,
    marginBottom: 10,
  },
  subsectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#000',
    marginTop: 15,
    marginBottom: 8,
  },
  textBlock: {
    marginBottom: 15,
  },
  bulletPoint: {
    fontSize: 16,
    color: '#333',
    marginBottom: 5,
    lineHeight: 24,
  },
  arabicText: {
    fontSize: 16,
    color: '#666',
    marginBottom: 5,
    lineHeight: 24,
    writingDirection: 'rtl',
  },
  exampleText: {
    fontSize: 14,
    color: '#555',
    fontStyle: 'italic',
    lineHeight: 20,
  },
  tableExample: {
    backgroundColor: '#f9f9f9',
    padding: 10,
    borderRadius: 8,
    marginTop: 10,
    marginBottom: 10,
  },
  tableTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 8,
  },
  tableHeader: {
    fontSize: 14,
    fontWeight: 'bold',
    color: '#555',
    marginBottom: 5,
  },
  tableRow: {
    fontSize: 14,
    color: '#333',
    marginBottom: 3,
  },
  tableNote: {
    fontSize: 12,
    color: '#777',
    fontStyle: 'italic',
    marginTop: 5,
  },
});
