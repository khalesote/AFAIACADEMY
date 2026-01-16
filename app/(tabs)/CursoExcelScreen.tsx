import React from 'react';
import { ScrollView, View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { useRouter } from 'expo-router';
import { LinearGradient } from 'expo-linear-gradient';
import Ionicons from '@expo/vector-icons/Ionicons';

export default function CursoExcelScreen() {
  const router = useRouter();
  
  return (
    <View style={styles.container}>
      {/* Header */}
      <LinearGradient
        colors={['#000', '#000']}
        style={styles.header}
      >
        <View style={styles.headerContent}>
          <TouchableOpacity
            style={styles.backButton}
            onPress={() => router.back()}
          >
            <Ionicons name="arrow-back" size={24} color="#FFD700" />
          </TouchableOpacity>
          <View style={styles.headerInfo}>
            <Text style={styles.headerTitle}>Curso de Microsoft Excel</Text>
            <Text style={styles.headerTitleAr}>دورة مايكروسوفت إكسل</Text>
          </View>
        </View>
      </LinearGradient>

      <ScrollView contentContainerStyle={styles.scrollContent}>
        <Text style={styles.sectionTitle}>📌 ¿Qué aprenderás? / ما الذي ستتعلمه؟</Text>
        <View style={styles.textBlock}>
          <Text style={styles.bulletPoint}>• Fundamentos de hojas de cálculo</Text>
          <Text style={styles.arabicText}>أساسيات جداول البيانات</Text>
          
          <Text style={styles.bulletPoint}>• Fórmulas y funciones avanzadas</Text>
          <Text style={styles.arabicText}>الصيغ والدوال المتقدمة</Text>
          
          <Text style={styles.bulletPoint}>• Análisis y visualización de datos</Text>
          <Text style={styles.arabicText}>تحليل وتصور البيانات</Text>
          
          <Text style={styles.bulletPoint}>• Tablas dinámicas y gráficos</Text>
          <Text style={styles.arabicText}>الجداول المحورية والرسوم البيانية</Text>
          
          <Text style={styles.bulletPoint}>• Automatización de tareas</Text>
          <Text style={styles.arabicText}>أتمتة المهام</Text>
        </View>

        <Text style={styles.sectionTitle}>📚 Módulos del Curso / وحدات الدورة</Text>
        
        <Text style={styles.subsectionTitle}>MÓDULO 1: INTRODUCCIÓN A EXCEL / الوحدة 1: مقدمة في إكسل</Text>
        <View style={styles.textBlock}>
          <Text style={styles.bulletPoint}>• Interfaz de Excel y conceptos básicos</Text>
          <Text style={styles.arabicText}>واجهة إكسل والمفاهيم الأساسية</Text>
          
          <Text style={styles.bulletPoint}>• Navegación por celdas, filas y columnas</Text>
          <Text style={styles.arabicText}>التنقل بين الخلايا والأعمدة والصفوف</Text>
          
          <Text style={styles.bulletPoint}>• Formato básico de celdas</Text>
          <Text style={styles.arabicText}>تنسيق الخلايا الأساسي</Text>
          
          <Text style={styles.bulletPoint}>• Guardar y abrir archivos</Text>
          <Text style={styles.arabicText}>حفظ وفتح الملفات</Text>
        </View>

        <Text style={styles.subsectionTitle}>MÓDULO 2: FÓRMULAS BÁSICAS / الوحدة 2: الصيغ الأساسية</Text>
        <View style={styles.textBlock}>
          <Text style={styles.bulletPoint}>• Operadores matemáticos básicos (+, -, *, /, ^)</Text>
          <Text style={styles.arabicText}>العوامل الرياضية الأساسية (+, -, *, /, ^)</Text>
          <Text style={styles.exampleText}>Ejemplo: =A1+B1, =C2*D2, =E3^2</Text>
          
          <Text style={styles.bulletPoint}>• Funciones esenciales:</Text>
          <Text style={styles.subBulletPoint}>- SUMA: =SUMA(A1:A10)</Text>
          <Text style={styles.subBulletPoint}>- PROMEDIO: =PROMEDIO(B1:B10)</Text>
          <Text style={styles.subBulletPoint}>- CONTAR: =CONTAR(A1:A10)</Text>
          <Text style={styles.subBulletPoint}>- MÁX/MÍN: =MÁX(C1:C10), =MÍN(D1:D10)</Text>
          <Text style={styles.arabicText}>الدوال الأساسية: المجموع، المتوسط، العد، القيم القصوى والدنيا</Text>
          
          <Text style={styles.bulletPoint}>• Referencias de celdas:</Text>
          <Text style={styles.subBulletPoint}>- Relativas: A1 (cambian al copiar la fórmula)</Text>
          <Text style={styles.subBulletPoint}>- Absolutas: $A$1 (fijas al copiar)</Text>
          <Text style={styles.subBulletPoint}>- Mixtas: A$1 o $A1</Text>
          <Text style={styles.arabicText}>المراجع النسبية والمطلقة</Text>
          
          <Text style={styles.bulletPoint}>• Trabajar con rangos con nombre</Text>
          <Text style={styles.subBulletPoint}>1. Selecciona un rango</Text>
          <Text style={styles.subBulletPoint}>2. Ve a Fórmulas {'>'} Definir nombre</Text>
          <Text style={styles.subBulletPoint}>3. Usa el nombre en fórmulas: =SUMA(Ventas)</Text>
          <Text style={styles.arabicText}>العمل مع النطاقات المسماة</Text>

          <View style={styles.tableExample}>
            <Text style={styles.tableTitle}>Tabla ejemplo: Gastos Mensuales</Text>
            <Text style={styles.tableHeader}>Mes | Alimentación | Transporte | Total</Text>
            <Text style={styles.tableRow}>Enero | 120 € | 45 € | =SUMA(B2:C2)</Text>
            <Text style={styles.tableRow}>Febrero | 110 € | 50 € | Fórmula similar en fila 3</Text>
            <Text style={styles.tableNote}>Aplica formato de moneda para todo el rango B2:D3.</Text>
          </View>

          <Text style={styles.exampleText}>Uso práctico: =SUMA(TablaGastos[Alimentación]) calcula el total de la columna si la tabla tiene un nombre estructurado.</Text>

          <Text style={styles.exampleText}>Promedio mensual: =PROMEDIO(D2:D13) brinda una visión rápida del gasto total por mes.</Text>
        </View>

        <Text style={styles.subsectionTitle}>MÓDULO 3: FUNCIONES AVANZADAS / الوحدة 3: دوال متقدمة</Text>
        <View style={styles.textBlock}>
          <Text style={styles.bulletPoint}>• Funciones lógicas:</Text>
          <Text style={styles.subBulletPoint}>- SI (IF): =SI(condición, valor_si_verdadero, valor_si_falso)</Text>
          <Text style={styles.subBulletPoint}>- Y (AND): =Y(condición1, condición2, ...)</Text>
          <Text style={styles.subBulletPoint}>- O (OR): =O(condición1, condición2, ...)</Text>
          <Text style={styles.exampleText}>Ejemplo: =SI(Y(nota{'>'}=5, asistencia{'>'}=80%), "Aprobado", "Suspenso")</Text>
          <Text style={styles.arabicText}>الدوال المنطقية: IF, AND, OR</Text>
          
          <Text style={styles.bulletPoint}>• Búsqueda y referencia:</Text>
          <Text style={styles.subBulletPoint}>- BUSCARV: =BUSCARV(valor_buscado, rango, columna, [ordenado])</Text>
          <Text style={styles.subBulletPoint}>- INDICE + COINCIDIR: =INDICE(col_resultado, COINCIDIR(valor, col_busqueda, 0))</Text>
          <Text style={styles.subBulletPoint}>- INDICE: =INDICE(rango, fila, columna)</Text>
          <Text style={styles.exampleText}>Ejemplo: =BUSCARV("Juan", A2:B10, 2, FALSO) busca "Juan" en A2:A10 y devuelve valor de B</Text>
          <Text style={styles.arabicText}>دوال البحث والمرجع</Text>

          <View style={styles.tableExample}>
            <Text style={styles.tableTitle}>Tabla ejemplo: Nómina Empleados</Text>
            <Text style={styles.tableHeader}>ID | Nombre | Departamento | Salario | Fecha ingreso</Text>
            <Text style={styles.tableRow}>101 | Juan Pérez | Ventas | 1.850 € | 12/05/2018</Text>
            <Text style={styles.tableRow}>102 | Sara López | Finanzas | 2.100 € | 03/02/2016</Text>
            <Text style={styles.tableRow}>103 | Ahmed Ali | Ventas | 1.950 € | 25/08/2019</Text>
            <Text style={styles.tableNote}>Usa =BUSCARV("Sara López",B2:E4,4,FALSO) para traer el salario.</Text>
          </View>

          <Text style={styles.exampleText}>Cálculo de antigüedad: =DATEDIF(E2,HOY(),"Y") devuelve los años de servicio del empleado.</Text>

          <Text style={styles.bulletPoint}>• Funciones de texto:</Text>
          <Text style={styles.subBulletPoint}>- IZQUIERDA: =IZQUIERDA("Hola", 2) → "Ho"</Text>
          <Text style={styles.subBulletPoint}>- DERECHA: =DERECHA("Hola", 3) → "ola"</Text>
          <Text style={styles.subBulletPoint}>- EXTRAE: =EXTRAE("Hola", 2, 2) → "ol"</Text>
          <Text style={styles.subBulletPoint}>- ENCONTRAR: =ENCONTRAR("a", "casa") → 2</Text>
          <Text style={styles.arabicText}>دوال النصوص</Text>
          
          <Text style={styles.bulletPoint}>• Funciones de fecha y hora:</Text>
          <Text style={styles.subBulletPoint}>- HOY(): Devuelve la fecha actual</Text>
          <Text style={styles.subBulletPoint}>- AHORA(): Fecha y hora actual</Text>
          <Text style={styles.subBulletPoint}>- DIA(A1): Extrae el día de una fecha</Text>
          <Text style={styles.subBulletPoint}>- MES(A1): Extrae el mes de una fecha</Text>
          <Text style={styles.subBulletPoint}>- AÑO(A1): Extrae el año de una fecha</Text>
          <Text style={styles.exampleText}>Ejemplo: =FECHA(AÑO(HOY()), MES(HOY())+1, 1) - devuelve el primer día del mes siguiente</Text>
          <Text style={styles.arabicText}>دوال التاريخ والوقت</Text>
          
          <Text style={styles.exampleText}>Bono condicional: =SI(C2="Ventas",Salario*1,1,Salario) aplica un 10% extra al salario base.</Text>
        </View>

        <Text style={styles.subsectionTitle}>MÓDULO 4: TABLAS DINÁMICAS / الوحدة 4: الجداول المحورية</Text>
        <View style={styles.textBlock}>
          <Text style={styles.bulletPoint}>• Crear y formatear tablas dinámicas</Text>
          <Text style={styles.arabicText}>إنشاء وتنسيق الجداول المحورية</Text>
          
          <Text style={styles.bulletPoint}>• Agrupar y filtrar datos</Text>
          <Text style={styles.arabicText}>تصفية وتجميع البيانات</Text>
          
          <Text style={styles.bulletPoint}>• Campos calculados</Text>
          <Text style={styles.arabicText}>الحقول المحسوبة</Text>
          
          <Text style={styles.bulletPoint}>• Gráficos dinámicos</Text>
          <Text style={styles.arabicText}>الرسوم البيانية المحورية</Text>

          <View style={styles.tableExample}>
            <Text style={styles.tableTitle}>Escenario: Ventas por región</Text>
            <Text style={styles.tableRow}>• Arrastra “Región” a filas y “Producto” a columnas.</Text>
            <Text style={styles.tableRow}>• Coloca “ImporteVenta” en valores (suma).</Text>
            <Text style={styles.tableRow}>• Agrega un campo calculado “Margen” = ImporteVenta * 0,18.</Text>
            <Text style={styles.tableNote}>Activa “Segmentación de datos” para filtrar por año o comercial.</Text>
          </View>

          <Text style={styles.exampleText}>Gráfico dinámico recomendado: columnas agrupadas para comparar ventas por región y producto en un mismo panel.</Text>
        </View>

        <Text style={styles.subsectionTitle}>MÓDULO 5: ANÁLISIS DE DATOS / الوحدة 5: تحليل البيانات</Text>
        <View style={styles.textBlock}>
          <Text style={styles.bulletPoint}>• Ordenar y filtrar datos</Text>
          <Text style={styles.arabicText}>فرز وتصفية البيانات</Text>
          
          <Text style={styles.bulletPoint}>• Validación de datos</Text>
          <Text style={styles.arabicText}>التحقق من صحة البيانات</Text>
          
          <Text style={styles.bulletPoint}>• Tablas de datos y escenarios</Text>
          <Text style={styles.arabicText}>جداول البيانات والسيناريوهات</Text>
          
          <Text style={styles.bulletPoint}>• Análisis de hipótesis</Text>
          <Text style={styles.arabicText}>تحليل ماذا-لو</Text>

          <View style={styles.tableExample}>
            <Text style={styles.tableTitle}>Ejemplo: tabla de datos para proyecciones</Text>
            <Text style={styles.tableRow}>• Crea un escenario con tasa de interés en B2 y años en C2.</Text>
            <Text style={styles.tableRow}>• Usa Tabla de datos (dos variables) para ver pagos mensuales.</Text>
            <Text style={styles.tableRow}>• Combínalo con Formato condicional para resaltar los valores más altos.</Text>
            <Text style={styles.tableNote}>Complementa con “Buscar objetivo” para obtener el pago deseado.</Text>
          </View>

          <Text style={styles.exampleText}>Herramienta “Administrador de escenarios”: crea escenarios “Optimista” y “Conservador” y genera un resumen automático.</Text>
        </View>

        <Text style={styles.subsectionTitle}>MÓDULO 6: AUTOMATIZACIÓN / الوحدة 6: الأتمتة</Text>
        <View style={styles.textBlock}>
          <Text style={styles.bulletPoint}>• Grabadora de macros</Text>
          <Text style={styles.arabicText}>مسجل وحدات الماكرو</Text>
          
          <Text style={styles.bulletPoint}>• Introducción a VBA</Text>
          <Text style={styles.arabicText}>مقدمة في VBA</Text>
          
          <Text style={styles.bulletPoint}>• Crear formularios de entrada</Text>
          <Text style={styles.arabicText}>إنشاء نماذج الإدخال</Text>
          
          <Text style={styles.bulletPoint}>• Proteger y compartir hojas de cálculo</Text>
          <Text style={styles.arabicText}>حماية ومشاركة جداول البيانات</Text>
        </View>

        <Text style={styles.subsectionTitle}>MÓDULO 7: POWER QUERY / الوحدة 7: باور كويري</Text>
        <View style={styles.textBlock}>
          <Text style={styles.bulletPoint}>• Conectar Excel con múltiples fuentes de datos</Text>
          <Text style={styles.arabicText}>ربط إكسل بعدة مصادر بيانات</Text>
          
          <Text style={styles.bulletPoint}>• Limpiar, transformar y combinar tablas</Text>
          <Text style={styles.arabicText}>تنظيف وتحويل ودمج الجداول</Text>
          
          <Text style={styles.bulletPoint}>• Crear consultas parametrizadas reutilizables</Text>
          <Text style={styles.arabicText}>إنشاء استعلامات قابلة لإعادة الاستخدام</Text>
          
          <Text style={styles.bulletPoint}>• Actualizar datos con un solo clic</Text>
          <Text style={styles.arabicText}>تحديث البيانات بنقرة واحدة</Text>

          <View style={styles.tableExample}>
            <Text style={styles.tableTitle}>Escenario: Consolidar archivos CSV</Text>
            <Text style={styles.tableRow}>1. Datos {'>'} Obtener datos {'>'} Desde carpeta.</Text>
            <Text style={styles.tableRow}>2. Combina archivos y elimina columnas innecesarias.</Text>
            <Text style={styles.tableRow}>3. Cambia tipos de datos y agrega columna personalizada.</Text>
            <Text style={styles.tableNote}>Puedes aplicar “Cerrar y cargar” para refrescar automáticamente.</Text>
          </View>
        </View>

        <Text style={styles.subsectionTitle}>MÓDULO 8: POWER PIVOT Y MODELOS / الوحدة 8: باور بايفوت والنماذج</Text>
        <View style={styles.textBlock}>
          <Text style={styles.bulletPoint}>• Activar y configurar el complemento Power Pivot</Text>
          <Text style={styles.arabicText}>تفعيل وإعداد إضافة باور بايفوت</Text>
          
          <Text style={styles.bulletPoint}>• Crear modelos de datos con relaciones</Text>
          <Text style={styles.arabicText}>إنشاء نماذج بيانات بعلاقات</Text>
          
          <Text style={styles.bulletPoint}>• Medidas DAX básicas para cálculos personalizados</Text>
          <Text style={styles.arabicText}>أساسيات معادلات DAX للحسابات المخصصة</Text>
          
          <Text style={styles.bulletPoint}>• Optimizar el rendimiento de grandes volúmenes</Text>
          <Text style={styles.arabicText}>تحسين الأداء مع أحجام بيانات كبيرة</Text>

          <View style={styles.tableExample}>
            <Text style={styles.tableTitle}>Modelo de datos: Ventas y clientes</Text>
            <Text style={styles.tableRow}>• Tabla Ventas con columnas Fecha, ID_Cliente, Importe.</Text>
            <Text style={styles.tableRow}>• Tabla Clientes con columnas ID_Cliente, País, Segmento.</Text>
            <Text style={styles.tableRow}>• Relación uno-a-muchos por ID_Cliente.</Text>
            <Text style={styles.tableNote}>Medida DAX ejemplo: Total Ventas = SUM(Ventas[Importe]).</Text>
          </View>
        </View>

        <Text style={styles.subsectionTitle}>MÓDULO 9: DASHBOARDS INTERACTIVOS / الوحدة 9: لوحات معلومات تفاعلية</Text>
        <View style={styles.textBlock}>
          <Text style={styles.bulletPoint}>• Diseñar paneles con tablas y gráficos vinculados</Text>
          <Text style={styles.arabicText}>تصميم لوحات باستخدام جداول ورسوم مرتبطة</Text>
          
          <Text style={styles.bulletPoint}>• Utilizar segmentaciones y cronogramas</Text>
          <Text style={styles.arabicText}>استخدام أدوات التصفية والزمن</Text>
          
          <Text style={styles.bulletPoint}>• Aplicar formatos condicionales avanzados</Text>
          <Text style={styles.arabicText}>تطبيق تنسيقات شرطية متقدمة</Text>
          
          <Text style={styles.bulletPoint}>• Publicar paneles en Excel Online o SharePoint</Text>
          <Text style={styles.arabicText}>نشر اللوحات في إكسل أونلاين أو شيربوينت</Text>

          <View style={styles.tableExample}>
            <Text style={styles.tableTitle}>Componentes clave de un dashboard</Text>
            <Text style={styles.tableRow}>• Indicadores KPI con formato condicional.</Text>
            <Text style={styles.tableRow}>• Gráficos combinados (columnas + línea) para tendencias.</Text>
            <Text style={styles.tableRow}>• Segmentadores de fecha y categoría.</Text>
            <Text style={styles.tableNote}>Ordena los elementos en una cuadrícula utilizando “Vista {'>'} Cuadrícula”.</Text>
          </View>
        </View>

        <Text style={styles.subsectionTitle}>MÓDULO 10: COLABORACIÓN Y SEGURIDAD / الوحدة 10: التعاون والأمان</Text>
        <View style={styles.textBlock}>
          <Text style={styles.bulletPoint}>• Compartir libros en la nube y trabajar en coautoría</Text>
          <Text style={styles.arabicText}>مشاركة المصنفات والعمل بالتعاون عبر السحابة</Text>
          
          <Text style={styles.bulletPoint}>• Controlar versiones y seguimiento de cambios</Text>
          <Text style={styles.arabicText}>التحكم في الإصدارات وتتبع التغييرات</Text>
          
          <Text style={styles.bulletPoint}>• Firmas digitales y protección con contraseña</Text>
          <Text style={styles.arabicText}>التواقيع الرقمية والحماية بكلمة مرور</Text>
          
          <Text style={styles.bulletPoint}>• Preparar libros para exportación y publicación</Text>
          <Text style={styles.arabicText}>تهيئة المصنفات للتصدير والنشر</Text>

          <View style={styles.tableExample}>
            <Text style={styles.tableTitle}>Buenas prácticas de seguridad</Text>
            <Text style={styles.tableRow}>• Usa “Archivo {'>'} Información” para administrar permisos.</Text>
            <Text style={styles.tableRow}>• Protege hojas críticas con contraseña y restringe edición.</Text>
            <Text style={styles.tableRow}>• Habilita recuperación de versiones en OneDrive o SharePoint.</Text>
            <Text style={styles.tableNote}>Agrega firmas digitales al final para garantizar integridad.</Text>
          </View>
        </View>

        <Text style={styles.sectionTitle}>💡 Beneficios del Curso / فوائد الدورة</Text>
        <View style={styles.textBlock}>
          <Text style={styles.bulletPoint}>• Aprenderás desde lo básico hasta nivel avanzado</Text>
          <Text style={styles.arabicText}>سوف تتعلم من المستوى الأساسي إلى المتقدم</Text>
          
          <Text style={styles.bulletPoint}>• Ejercicios prácticos con casos reales</Text>
          <Text style={styles.arabicText}>تمارين عملية بحالات حقيقية</Text>
          
          <Text style={styles.bulletPoint}>• Plantillas útiles para tu trabajo</Text>
          <Text style={styles.arabicText}>قوالب مفيدة لعملك</Text>
          
          <Text style={styles.bulletPoint}>• Certificado de finalización</Text>
          <Text style={styles.arabicText}>شهادة إتمام الدورة</Text>
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
    borderBottomLeftRadius: 20,
    borderBottomRightRadius: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 10,
    elevation: 5,
  },
  headerContent: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 10,
  },
  backButton: {
    padding: 8,
    marginRight: 15,
  },
  headerInfo: {
    flex: 1,
  },
  headerTitle: {
    fontSize: 22,
    fontWeight: 'bold',
    color: '#FFD700',
    marginBottom: 5,
    textAlign: 'left',
  },
  headerTitleAr: {
    fontSize: 18,
    color: '#FFD700',
    textAlign: 'right',
    writingDirection: 'rtl',
  },
  scrollContent: {
    padding: 20,
    paddingBottom: 40,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#000',
    marginTop: 20,
  },
  subsectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#000',
    marginTop: 15,
    marginBottom: 10,
    backgroundColor: '#E8F5E9',
    padding: 10,
    borderRadius: 8,
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
    fontSize: 15,
    color: '#555',
    marginBottom: 12,
    textAlign: 'right',
    writingDirection: 'rtl',
    fontFamily: 'Arial',
    lineHeight: 24,
  },
  exampleText: {
    fontSize: 14,
    color: '#666',
    fontStyle: 'italic',
    marginBottom: 12,
    backgroundColor: '#f8f9fa',
    padding: 8,
    borderRadius: 4,
    borderLeftWidth: 3,
    borderLeftColor: '#1D6F42',
  },
  subBulletPoint: {
    fontSize: 14,
    color: '#444',
    marginLeft: 20,
    marginBottom: 6,
    lineHeight: 20,
  },
  tableExample: {
    backgroundColor: '#F1F8E9',
    padding: 12,
    borderRadius: 8,
    marginBottom: 12,
    borderLeftWidth: 3,
    borderLeftColor: '#1B5E20',
  },
  tableTitle: {
    fontSize: 15,
    fontWeight: '600',
    color: '#1B5E20',
    marginBottom: 6,
  },
  tableHeader: {
    fontSize: 14,
    color: '#2E7D32',
    marginBottom: 4,
  },
  tableRow: {
    fontSize: 14,
    color: '#2F4F4F',
    marginBottom: 3,
    lineHeight: 20,
  },
  tableNote: {
    fontSize: 13,
    color: '#33691E',
    fontStyle: 'italic',
    marginTop: 6,
  },
  imageContainer: {
    backgroundColor: '#f8f9fa',
    padding: 15,
    borderRadius: 8,
    marginVertical: 15,
    alignItems: 'center',
  },
  imageCaption: {
    fontSize: 14,
    color: '#666',
    fontStyle: 'italic',
    textAlign: 'center',
    marginTop: 8,
  },
  imageCaptionAr: {
    fontSize: 14,
    color: '#666',
    fontStyle: 'italic',
    textAlign: 'center',
    writingDirection: 'rtl',
  },
});
