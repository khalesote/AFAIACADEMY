import React from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, Image, Alert } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import EjerciciosInteractivos from '../../../components/EjerciciosInteractivos';
import { useUserProgress } from '@/contexts/UserProgressContext';

// Datos de ejercicios para Economía y Consumo - Nivel B2
const ejercicios = [
  // Ejercicio 1: Opción múltiple
  {
    tipo: "opcion_multiple",
    enunciado: "¿Qué caracteriza el consumo responsable?",
    opciones: ["Comprar solo productos baratos", "Considerar el impacto social y ambiental de las compras", "Evitar todas las compras", "Solo comprar productos de lujo"],
    respuesta_correcta: "Considerar el impacto social y ambiental de las compras"
  },
  
  // Ejercicio 2: Opción múltiple
  {
    tipo: "opcion_multiple",
    enunciado: "¿Qué es la economía circular?",
    opciones: ["Solo reciclar papel", "Modelo que mantiene recursos en uso el mayor tiempo posible", "Solo economía de mercado", "Solo economía planificada"],
    respuesta_correcta: "Modelo que mantiene recursos en uso el mayor tiempo posible"
  },
  
  // Ejercicio 3: Opción múltiple
  {
    tipo: "opcion_multiple",
    enunciado: "¿Qué es la sostenibilidad económica?",
    opciones: ["Solo ahorrar dinero", "Desarrollo que satisface necesidades presentes sin comprometer futuras", "Solo crecimiento económico", "Solo beneficios empresariales"],
    respuesta_correcta: "Desarrollo que satisface necesidades presentes sin comprometer futuras"
  },
  
  // Ejercicio 4: Opción múltiple
  {
    tipo: "opcion_multiple",
    enunciado: "¿Qué es la huella ecológica?",
    opciones: ["Solo contaminación del aire", "Impacto ambiental de las actividades humanas", "Solo residuos plásticos", "Solo emisiones de CO2"],
    respuesta_correcta: "Impacto ambiental de las actividades humanas"
  },
  
  // Ejercicio 5: Opción múltiple
  {
    tipo: "opcion_multiple",
    enunciado: "¿Qué es el comercio justo?",
    opciones: ["Solo vender barato", "Sistema que garantiza condiciones laborales justas y precios equitativos", "Solo importar productos", "Solo exportar productos"],
    respuesta_correcta: "Sistema que garantiza condiciones laborales justas y precios equitativos"
  },
  
  // Ejercicio 6: Opción múltiple
  {
    tipo: "opcion_multiple",
    enunciado: "¿Qué es la obsolescencia programada?",
    opciones: ["Solo productos antiguos", "Diseño de productos para que se vuelvan obsoletos rápidamente", "Solo tecnología avanzada", "Solo productos de calidad"],
    respuesta_correcta: "Diseño de productos para que se vuelvan obsoletos rápidamente"
  },
  
  // Ejercicio 7: Opción múltiple
  {
    tipo: "opcion_multiple",
    enunciado: "¿Qué es la economía colaborativa?",
    opciones: ["Solo compartir coche", "Sistema basado en compartir recursos y servicios", "Solo economía de mercado", "Solo economía digital"],
    respuesta_correcta: "Sistema basado en compartir recursos y servicios"
  },
  
  // Ejercicio 8: Opción múltiple
  {
    tipo: "opcion_multiple",
    enunciado: "¿Qué es el greenwashing?",
    opciones: ["Solo marketing verde", "Práctica de hacer afirmaciones ambientales falsas o engañosas", "Solo productos ecológicos", "Solo publicidad verde"],
    respuesta_correcta: "Práctica de hacer afirmaciones ambientales falsas o engañosas"
  },
  
  // Ejercicio 9: Opción múltiple
  {
    tipo: "opcion_multiple",
    enunciado: "¿Qué es la economía de la funcionalidad?",
    opciones: ["Solo servicios básicos", "Vender servicios en lugar de productos", "Solo economía de servicios", "Solo economía digital"],
    respuesta_correcta: "Vender servicios en lugar de productos"
  },
  
  // Ejercicio 10: Opción múltiple
  {
    tipo: "opcion_multiple",
    enunciado: "¿Qué es el consumo local?",
    opciones: ["Solo comprar en tiendas pequeñas", "Adquirir productos producidos en la región cercana", "Solo productos artesanales", "Solo mercados locales"],
    respuesta_correcta: "Adquirir productos producidos en la región cercana"
  },
  
  // Ejercicio 11: Opción múltiple
  {
    tipo: "opcion_multiple",
    enunciado: "¿Qué es la economía del bien común?",
    opciones: ["Solo economía social", "Modelo económico que prioriza el bienestar colectivo", "Solo economía solidaria", "Solo economía cooperativa"],
    respuesta_correcta: "Modelo económico que prioriza el bienestar colectivo"
  },
  
  // Ejercicio 12: Opción múltiple
  {
    tipo: "opcion_multiple",
    enunciado: "¿Qué es la banca ética?",
    opciones: ["Solo bancos pequeños", "Instituciones financieras que consideran criterios sociales y ambientales", "Solo cooperativas de crédito", "Solo bancos digitales"],
    respuesta_correcta: "Instituciones financieras que consideran criterios sociales y ambientales"
  },
  
  // Ejercicio 13: Opción múltiple
  {
    tipo: "opcion_multiple",
    enunciado: "¿Qué es la inversión socialmente responsable?",
    opciones: ["Solo inversiones rentables", "Inversión que considera criterios sociales, ambientales y de gobernanza", "Solo inversiones en empresas verdes", "Solo inversiones a largo plazo"],
    respuesta_correcta: "Inversión que considera criterios sociales, ambientales y de gobernanza"
  },
  
  // Ejercicio 14: Opción múltiple
  {
    tipo: "opcion_multiple",
    enunciado: "¿Qué es la economía regenerativa?",
    opciones: ["Solo agricultura orgánica", "Sistema que restaura y mejora los ecosistemas", "Solo economía circular", "Solo economía verde"],
    respuesta_correcta: "Sistema que restaura y mejora los ecosistemas"
  },
  
  // Ejercicio 15: Opción múltiple
  {
    tipo: "opcion_multiple",
    enunciado: "¿Qué es el decrecimiento económico?",
    opciones: ["Solo recesión", "Reducción planificada del consumo y producción para la sostenibilidad", "Solo crisis económica", "Solo estancamiento"],
    respuesta_correcta: "Reducción planificada del consumo y producción para la sostenibilidad"
  },
  
  // Ejercicio 16: Opción múltiple
  {
    tipo: "opcion_multiple",
    enunciado: "¿Qué es la economía de la suficiencia?",
    opciones: ["Solo ahorro extremo", "Satisfacer necesidades básicas sin excesos", "Solo minimalismo", "Solo frugalidad"],
    respuesta_correcta: "Satisfacer necesidades básicas sin excesos"
  },
  
  // Ejercicio 17: Opción múltiple
  {
    tipo: "opcion_multiple",
    enunciado: "¿Qué es la economía de la donación?",
    opciones: ["Solo caridad", "Sistema basado en compartir y donar recursos", "Solo voluntariado", "Solo ayuda humanitaria"],
    respuesta_correcta: "Sistema basado en compartir y donar recursos"
  },
  
  // Ejercicio 18: Relacionar conceptos (respuestas desordenadas)
  {
    tipo: "relacionar",
    enunciado: "Relaciona cada concepto económico con su definición correcta:",
    pares: [
      { izquierda: "Economía circular", derecha: "Mantiene recursos en uso" },
      { izquierda: "Consumo responsable", derecha: "Considera impacto social y ambiental" },
      { izquierda: "Comercio justo", derecha: "Garantiza condiciones laborales justas" },
      { izquierda: "Huella ecológica", derecha: "Impacto ambiental de actividades" }
    ]
  },
  
  // Ejercicio 19: Relacionar conceptos (respuestas desordenadas)
  {
    tipo: "relacionar",
    enunciado: "Relaciona cada modelo económico con su característica principal:",
    pares: [
      { izquierda: "Economía colaborativa", derecha: "Compartir recursos y servicios" },
      { izquierda: "Economía del bien común", derecha: "Prioriza bienestar colectivo" },
      { izquierda: "Economía regenerativa", derecha: "Restaura ecosistemas" },
      { izquierda: "Economía de la suficiencia", derecha: "Satisfacer necesidades sin excesos" }
    ]
  },
  
  // Ejercicio 20: Relacionar conceptos (respuestas desordenadas)
  {
    tipo: "relacionar",
    enunciado: "Relaciona cada práctica económica con su objetivo principal:",
    pares: [
      { izquierda: "Consumo local", derecha: "Reducir transporte y apoyar productores cercanos" },
      { izquierda: "Banca ética", derecha: "Considerar criterios sociales y ambientales" },
      { izquierda: "Inversión responsable", derecha: "Criterios ESG en decisiones financieras" },
      { izquierda: "Decrecimiento", derecha: "Reducir consumo para sostenibilidad" }
    ]
  }
];

export default function EconomiaConsumo() {
  const router = useRouter();
  const { progress, markUnitCompleted } = useUserProgress();
  const levelProgress = progress.B2;
  const alreadyCompleted = levelProgress?.unitsCompleted?.[3] ?? false;
  const handleFinish = () => {
    if (!alreadyCompleted) {
      markUnitCompleted('B2', 3);
    }
    Alert.alert(
      'Unidad finalizada',
      'Vuelve al menú de B2 para continuar con la siguiente unidad.\nارجع إلى قائمة مستوى B2 لمتابعة الوحدة التالية.',
      [
        { text: 'Seguir estudiando', style: 'cancel' },
        { text: 'Ir al menú B2 / الذهاب إلى قائمة B2', onPress: () => router.replace('/B2_Avanzado') }
      ]
    );
  };

  return (
    <ScrollView style={styles.container} contentContainerStyle={styles.content}>
      <TouchableOpacity
        style={styles.backButton}
        onPress={() => router.back()}
      >
        <Ionicons name="arrow-back" size={24} color="#79A890" />
        <Text style={styles.backButtonText}>Volver</Text>
      </TouchableOpacity>

      <View style={styles.header}>
        <Text style={styles.title}>💰 Economía y Consumo</Text>
        <Text style={styles.titleAr}>الاقتصاد والاستهلاك</Text>
        <Text style={styles.subtitle}>Consumo responsable y economía sostenible</Text>
        <Text style={styles.subtitleAr}>الاستهلاك المسؤول والاقتصاد المستدام</Text>
      </View>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>🌟 Importancia de la economía y el consumo responsable</Text>
        <Text style={styles.sectionText}>
          La economía y el consumo son fundamentales en nuestras vidas diarias, 
          pero las decisiones que tomamos como consumidores tienen un impacto 
          profundo en la sociedad y el medio ambiente. Cada compra que realizamos 
          es un voto sobre qué tipo de mundo queremos construir.
          {"\n\n"}
          El consumo responsable implica ser conscientes de las consecuencias 
          de nuestras decisiones económicas. No se trata solo de ahorrar dinero, 
          sino de considerar el impacto social, ambiental y ético de nuestros 
          hábitos de consumo. Es una forma de ejercer nuestro poder como 
          ciudadanos para promover cambios positivos.
          {"\n\n"}
          La economía sostenible busca crear un sistema que satisfaga las 
          necesidades del presente sin comprometer la capacidad de las futuras 
          generaciones para satisfacer las suyas. Esto requiere repensar cómo 
          producimos, consumimos y distribuimos los recursos.
        </Text>
        <Text style={styles.sectionTextAr}>
          الاقتصاد والاستهلاك أساسيان في حياتنا اليومية، لكن القرارات التي
          نتخذها كمستهلكين لها تأثير عميق في المجتمع والبيئة. كل شراء نقوم
          به هو تصويت على نوع العالم الذي نريد بناؤه.
          {"\n\n"}
          الاستهلاك المسؤول يعني أن نكون واعين لعواقب قراراتنا الاقتصادية.
          لا يتعلق الأمر فقط بتوفير المال، بل بالنظر في التأثير الاجتماعي
          والبيئي والأخلاقي لعاداتنا الاستهلاكية. إنها وسيلة لممارسة
          قوتنا كمواطنين لتعزيز التغييرات الإيجابية.
          {"\n\n"}
          الاقتصاد المستدام يسعى لخلق نظام يلبي احتياجات الحاضر دون
          المساس بقدرة الأجيال القادمة على تلبية احتياجاتها. هذا يتطلب
          إعادة التفكير في كيفية إنتاجنا واستهلاكنا وتوزيع الموارد.
        </Text>
      </View>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>📚 Vocabulario esencial de economía y consumo</Text>
        <Text style={styles.sectionText}>
          <Text style={styles.sectionSubtitle}>💰 Conceptos económicos básicos:</Text>{"\n"}
          economía = اقتصاد{"\n"}
          mercado = سوق{"\n"}
          oferta = عرض{"\n"}
          demanda = طلب{"\n"}
          precio = سعر{"\n"}
          valor = قيمة{"\n"}
          coste = تكلفة{"\n"}
          beneficio = ربح{"\n"}
          inversión = استثمار{"\n"}
          rentabilidad = ربحية
          {"\n\n"}
          <Text style={styles.sectionSubtitle}>🛒 Consumo y compras:</Text>{"\n"}
          consumo = استهلاك{"\n"}
          compra = شراء{"\n"}
          gasto = إنفاق{"\n"}
          ahorro = توفير{"\n"}
          presupuesto = ميزانية{"\n"}
          deuda = دين{"\n"}
          crédito = ائتمان{"\n"}
          ingresos = دخل{"\n"}
          gastos = مصروفات{"\n"}
          balance = رصيد
          {"\n\n"}
          <Text style={styles.sectionSubtitle}>🌱 Sostenibilidad y responsabilidad:</Text>{"\n"}
          sostenibilidad = استدامة{"\n"}
          responsabilidad = مسؤولية{"\n"}
          impacto = تأثير{"\n"}
          consecuencias = عواقب{"\n"}
          huella ecológica = البصمة البيئية{"\n"}
          reciclaje = إعادة تدوير{"\n"}
          reutilización = إعادة استخدام{"\n"}
          reducción = تقليل{"\n"}
          conservación = حفظ{"\n"}
          regeneración = تجديد
          {"\n\n"}
          <Text style={styles.sectionSubtitle}>🏭 Producción y comercio:</Text>{"\n"}
          producción = إنتاج{"\n"}
          comercio = تجارة{"\n"}
          comercio justo = تجارة عادلة{"\n"}
          cadena de suministro = سلسلة التوريد{"\n"}
          distribución = توزيع{"\n"}
          logística = لوجستية{"\n"}
          transporte = نقل{"\n"}
          almacenamiento = تخزين{"\n"}
          calidad = جودة{"\n"}
          certificación = شهادة
          {"\n\n"}
          <Text style={styles.sectionSubtitle}>💼 Finanzas y banca:</Text>{"\n"}
          banca = مصرفية{"\n"}
          banca ética = مصرفية أخلاقية{"\n"}
          inversión responsable = استثمار مسؤول{"\n"}
          fondos éticos = صناديق أخلاقية{"\n"}
          microcréditos = قروض صغيرة{"\n"}
          cooperativas = تعاونيات{"\n"}
          finanzas solidarias = تمويل تضامني{"\n"}
          crowdfunding = تمويل جماعي{"\n"}
          blockchain = سلسلة الكتل{"\n"}
          criptomonedas = عملات رقمية
        </Text>
        <Text style={styles.sectionTextAr}>
          <Text style={styles.sectionSubtitle}>💰 المفاهيم الاقتصادية الأساسية:</Text>{"\n"}
          اقتصاد = economía{"\n"}
          سوق = mercado{"\n"}
          عرض = oferta{"\n"}
          طلب = demanda{"\n"}
          سعر = سعر{"\n"}
          قيمة = قيمة{"\n"}
          تكلفة = تكلفة{"\n"}
          ربح = ربح{"\n"}
          استثمار = استثمار{"\n"}
          ربحية = ربحية
          {"\n\n"}
          <Text style={styles.sectionSubtitle}>🛒 الاستهلاك والمشتريات:</Text>{"\n"}
          استهلاك = استهلاك{"\n"}
          شراء = شراء{"\n"}
          إنفاق = إنفاق{"\n"}
          توفير = توفير{"\n"}
          ميزانية = ميزانية{"\n"}
          دين = دين{"\n"}
          ائتمان = ائتمان{"\n"}
          دخل = دخل{"\n"}
          مصروفات = مصروفات{"\n"}
          رصيد = رصيد
          {"\n\n"}
          <Text style={styles.sectionSubtitle}>🌱 الاستدامة والمسؤولية:</Text>{"\n"}
          استدامة = استدامة{"\n"}
          مسؤولية = مسؤولية{"\n"}
          تأثير = تأثير{"\n"}
          عواقب = عواقب{"\n"}
          البصمة البيئية = البصمة البيئية{"\n"}
          إعادة تدوير = إعادة تدوير{"\n"}
          إعادة استخدام = إعادة استخدام{"\n"}
          تقليل = تقليل{"\n"}
          حفظ = حفظ{"\n"}
          تجديد = تجديد
          {"\n\n"}
          <Text style={styles.sectionSubtitle}>🏭 الإنتاج والتجارة:</Text>{"\n"}
          إنتاج = إنتاج{"\n"}
          تجارة = تجارة{"\n"}
          تجارة عادلة = تجارة عادلة{"\n"}
          سلسلة التوريد = سلسلة التوريد{"\n"}
          توزيع = توزيع{"\n"}
          لوجستية = لوجستية{"\n"}
          نقل = نقل{"\n"}
          تخزين = تخزين{"\n"}
          جودة = جودة{"\n"}
          شهادة = شهادة
          {"\n\n"}
          <Text style={styles.sectionSubtitle}>💼 المالية والمصرفية:</Text>{"\n"}
          مصرفية = مصرفية{"\n"}
          مصرفية أخلاقية = مصرفية أخلاقية{"\n"}
          استثمار مسؤول = استثمار مسؤول{"\n"}
          صناديق أخلاقية = صناديق أخلاقية{"\n"}
          قروض صغيرة = قروض صغيرة{"\n"}
          تعاونيات = تعاونيات{"\n"}
          تمويل تضامني = تمويل تضامني{"\n"}
          تمويل جماعي = تمويل جماعي{"\n"}
          سلسلة الكتل = سلسلة الكتل{"\n"}
          عملات رقمية = عملات رقمية
        </Text>
      </View>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>🔄 Modelos económicos alternativos</Text>
        <Text style={styles.sectionText}>
          <Text style={styles.sectionSubtitle}>♻️ Economía circular:</Text>{"\n"}
          • <Text style={styles.benefit}>Reducir:</Text> Minimizar el uso de recursos{"\n"}
          • <Text style={styles.benefit}>Reutilizar:</Text> Usar productos múltiples veces{"\n"}
          • <Text style={styles.benefit}>Reciclar:</Text> Transformar residuos en nuevos productos{"\n"}
          • <Text style={styles.benefit}>Reparar:</Text> Mantener productos en uso más tiempo{"\n"}
          • <Text style={styles.benefit}>Rediseñar:</Text> Crear productos más duraderos{"\n"}
          • <Text style={styles.benefit}>Recuperar:</Text> Extraer valor de materiales usados
          {"\n\n"}
          <Text style={styles.sectionSubtitle}>🤝 Economía colaborativa:</Text>{"\n"}
          • <Text style={styles.benefit}>Compartir recursos:</Text> Optimizar el uso de bienes{"\n"}
          • <Text style={styles.benefit}>Plataformas digitales:</Text> Conectar oferta y demanda{"\n"}
          • <Text style={styles.benefit}>Servicios compartidos:</Text> Transporte, alojamiento, herramientas{"\n"}
          • <Text style={styles.benefit}>Redes comunitarias:</Text> Intercambio local de bienes{"\n"}
          • <Text style={styles.benefit}>Economía de acceso:</Text> Usar sin poseer{"\n"}
          • <Text style={styles.benefit}>Cooperación:</Text> Beneficios mutuos entre usuarios
          {"\n\n"}
          <Text style={styles.sectionSubtitle}>🌍 Economía del bien común:</Text>{"\n"}
          • <Text style={styles.benefit}>Valores humanos:</Text> Dignidad, solidaridad, sostenibilidad{"\n"}
          • <Text style={styles.benefit}>Cooperación:</Text> Trabajar juntos por objetivos comunes{"\n"}
          • <Text style={styles.benefit}>Participación:</Text> Involucrar a todos los actores{"\n"}
          • <Text style={styles.benefit}>Transparencia:</Text> Información clara y accesible{"\n"}
          • <Text style={styles.benefit}>Responsabilidad:</Text> Asumir consecuencias de acciones{"\n"}
          • <Text style={styles.benefit}>Sostenibilidad:</Text> Cuidar recursos para el futuro
          {"\n\n"}
          <Text style={styles.sectionSubtitle}>🌱 Economía regenerativa:</Text>{"\n"}
          • <Text style={styles.benefit}>Restauración:</Text> Recuperar ecosistemas dañados{"\n"}
          • <Text style={styles.benefit}>Regeneración:</Text> Mejorar sistemas naturales{"\n"}
          • <Text style={styles.benefit}>Biodiversidad:</Text> Proteger variedad de especies{"\n"}
          • <Text style={styles.benefit}>Suelo saludable:</Text> Mantener fertilidad natural{"\n"}
          • <Text style={styles.benefit}>Agua limpia:</Text> Preservar recursos hídricos{"\n"}
          • <Text style={styles.benefit}>Aire puro:</Text> Reducir contaminación atmosférica
          {"\n\n"}
          <Text style={styles.sectionSubtitle}>📉 Economía del decrecimiento:</Text>{"\n"}
          • <Text style={styles.benefit}>Reducción planificada:</Text> Disminuir consumo conscientemente{"\n"}
          • <Text style={styles.benefit}>Simplicidad voluntaria:</Text> Vivir con menos{"\n"}
          • <Text style={styles.benefit}>Localización:</Text> Producir y consumir localmente{"\n"}
          • <Text style={styles.benefit}>Tiempo libre:</Text> Valorar ocio sobre trabajo{"\n"}
          • <Text style={styles.benefit}>Comunidad:</Text> Fortalecer lazos sociales{"\n"}
          • <Text style={styles.benefit}>Bienestar:</Text> Priorizar felicidad sobre riqueza
        </Text>
        <Text style={styles.sectionTextAr}>
          <Text style={styles.sectionSubtitle}>♻️ الاقتصاد الدائري:</Text>{"\n"}
          • <Text style={styles.benefit}>تقليل:</Text> تقليل استخدام الموارد{"\n"}
          • <Text style={styles.benefit}>إعادة استخدام:</Text> استخدام المنتجات عدة مرات{"\n"}
          • <Text style={styles.benefit}>إعادة تدوير:</Text> تحويل النفايات إلى منتجات جديدة{"\n"}
          • <Text style={styles.benefit}>إصلاح:</Text> الحفاظ على المنتجات في الاستخدام لفترة أطول{"\n"}
          • <Text style={styles.benefit}>إعادة تصميم:</Text> خلق منتجات أكثر دواماً{"\n"}
          • <Text style={styles.benefit}>استرداد:</Text> استخراج قيمة من المواد المستخدمة
          {"\n\n"}
          <Text style={styles.sectionSubtitle}>🤝 الاقتصاد التعاوني:</Text>{"\n"}
          • <Text style={styles.benefit}>مشاركة الموارد:</Text> تحسين استخدام السلع{"\n"}
          • <Text style={styles.benefit}>منصات رقمية:</Text> ربط العرض والطلب{"\n"}
          • <Text style={styles.benefit}>خدمات مشتركة:</Text> نقل، إقامة، أدوات{"\n"}
          • <Text style={styles.benefit}>شبكات مجتمعية:</Text> تبادل محلي للسلع{"\n"}
          • <Text style={styles.benefit}>اقتصاد الوصول:</Text> استخدام دون امتلاك{"\n"}
          • <Text style={styles.benefit}>تعاون:</Text> فوائد متبادلة بين المستخدمين
          {"\n\n"}
          <Text style={styles.sectionSubtitle}>🌍 اقتصاد الخير العام:</Text>{"\n"}
          • <Text style={styles.benefit}>قيم إنسانية:</Text> كرامة، تضامن، استدامة{"\n"}
          • <Text style={styles.benefit}>تعاون:</Text> العمل معاً لأهداف مشتركة{"\n"}
          • <Text style={styles.benefit}>مشاركة:</Text> إشراك جميع الفاعلين{"\n"}
          • <Text style={styles.benefit}>شفافية:</Text> معلومات واضحة ومتاحة{"\n"}
          • <Text style={styles.benefit}>مسؤولية:</Text> تحمل عواقب الأفعال{"\n"}
          • <Text style={styles.benefit}>استدامة:</Text> العناية بالموارد للمستقبل
          {"\n\n"}
          <Text style={styles.sectionSubtitle}>🌱 الاقتصاد التجديدي:</Text>{"\n"}
          • <Text style={styles.benefit}>استعادة:</Text> استرداد النظم البيئية التالفة{"\n"}
          • <Text style={styles.benefit}>تجديد:</Text> تحسين النظم الطبيعية{"\n"}
          • <Text style={styles.benefit}>تنوع بيولوجي:</Text> حماية تنوع الأنواع{"\n"}
          • <Text style={styles.benefit}>تربة صحية:</Text> الحفاظ على الخصوبة الطبيعية{"\n"}
          • <Text style={styles.benefit}>مياه نظيفة:</Text> الحفاظ على الموارد المائية{"\n"}
          • <Text style={styles.benefit}>هواء نقي:</Text> تقليل التلوث الجوي
          {"\n\n"}
          <Text style={styles.sectionSubtitle}>📉 اقتصاد التناقص:</Text>{"\n"}
          • <Text style={styles.benefit}>تقليل مخطط:</Text> تقليل الاستهلاك بوعي{"\n"}
          • <Text style={styles.benefit}>بساطة طوعية:</Text> العيش بأقل{"\n"}
          • <Text style={styles.benefit}>محلية:</Text> إنتاج واستهلاك محلي{"\n"}
          • <Text style={styles.benefit}>وقت فراغ:</Text> تقدير الترفيه على العمل{"\n"}
          • <Text style={styles.benefit}>مجتمع:</Text> تقوية الروابط الاجتماعية{"\n"}
          • <Text style={styles.benefit}>رفاهية:</Text> إعطاء الأولوية للسعادة على الثروة
        </Text>
      </View>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>💬 Ejemplo de diálogo sobre economía y consumo</Text>
        <Text style={styles.dialogo}>
          — ¿Qué opinas sobre la importancia del consumo responsable en la sociedad actual?{"\n\n"}
          — En mi opinión, el consumo responsable es fundamental porque nuestras decisiones de compra tienen un impacto directo en el medio ambiente y en la sociedad. Cada vez que elegimos productos sostenibles, apoyamos prácticas éticas y enviamos un mensaje claro a las empresas sobre qué tipo de producción valoramos. Sin embargo, también entiendo que no siempre es fácil tomar decisiones responsables cuando los productos sostenibles suelen ser más caros.{"\n\n"}
          — ¿Cómo crees que podemos promover una economía más sostenible?{"\n\n"}
          — Creo que necesitamos un enfoque integral. Por un lado, los consumidores debemos educarnos y tomar decisiones más conscientes. Por otro lado, las empresas deben asumir su responsabilidad y ofrecer productos más sostenibles. Y finalmente, los gobiernos deben crear políticas que incentiven prácticas responsables y penalicen las dañinas. La economía circular y el comercio justo son excelentes ejemplos de cómo podemos cambiar el sistema.
        </Text>
        <Text style={styles.dialogoAr}>
          — ما رأيك في أهمية الاستهلاك المسؤول في المجتمع الحالي؟{"\n\n"}
          — في رأيي، الاستهلاك المسؤول أساسي لأن قراراتنا الشرائية لها تأثير مباشر في البيئة والمجتمع. كل مرة نختار فيها منتجات مستدامة، ندعم ممارسات أخلاقية ونرسل رسالة واضحة للشركات حول نوع الإنتاج الذي نقدره. لكنني أفهم أيضاً أنه ليس من السهل دائماً اتخاذ قرارات مسؤولة عندما تكون المنتجات المستدامة أغلى عادة.{"\n\n"}
          — كيف تعتقد أننا يمكن أن نعزز اقتصاداً أكثر استدامة؟{"\n\n"}
          — أعتقد أننا نحتاج نهجاً شاملاً. من ناحية، يجب على المستهلكين أن نتعلم ونتخذ قرارات أكثر وعياً. من ناحية أخرى، يجب على الشركات أن تتحمل مسؤوليتها وتقدم منتجات أكثر استدامة. وأخيراً، يجب على الحكومات أن تخلق سياسات تحفز الممارسات المسؤولة وتعاقب الضارة. الاقتصاد الدائري والتجارة العادلة أمثلة ممتازة على كيفية تغيير النظام.
        </Text>
      </View>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>🎯 Ejercicios Interactivos</Text>
        <EjerciciosInteractivos ejercicios={ejercicios} onComplete={handleFinish} />
      </View>

      <View style={styles.finishContainer}>
        <TouchableOpacity style={styles.finishButton} onPress={handleFinish}>
          <Text style={styles.finishButtonText}>Unidad finalizada</Text>
          <Text style={styles.finishButtonTextAr}>انتهت الوحدة</Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
  },
  content: {
    paddingHorizontal: 16,
    paddingTop: 16,
    paddingBottom: 32,
  },
  backButton: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 20,
    padding: 8,
  },
  backButtonText: {
    marginLeft: 8,
    fontSize: 16,
    color: '#79A890',
  },
  header: {
    alignItems: 'center',
    marginBottom: 24,
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#79A890',
    textAlign: 'center',
    marginBottom: 8,
  },
  titleAr: {
    fontSize: 26,
    fontWeight: 'bold',
    color: '#79A890',
    textAlign: 'center',
    marginBottom: 8,
  },
  subtitle: {
    fontSize: 18,
    color: '#666',
    textAlign: 'center',
    marginBottom: 4,
  },
  subtitleAr: {
    fontSize: 16,
    color: '#666',
    textAlign: 'center',
    marginBottom: 16,
  },
  section: {
    backgroundColor: '#fff',
    borderRadius: 12,
    padding: 20,
    marginBottom: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#79A890',
    marginBottom: 12,
  },
  sectionText: {
    fontSize: 16,
    color: '#333',
    lineHeight: 24,
    marginBottom: 12,
  },
  sectionTextAr: {
    fontSize: 16,
    color: '#333',
    lineHeight: 24,
    marginBottom: 12,
    textAlign: 'right',
    writingDirection: 'rtl',
  },
  benefit: {
    fontWeight: 'bold',
    color: '#79A890',
  },
  sectionSubtitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#79A890',
    marginBottom: 8,
  },
  finishContainer: {
    marginTop: 24,
    marginBottom: 48,
    alignItems: 'center',
  },
  finishButton: {
    backgroundColor: '#79A890',
    paddingVertical: 18,
    paddingHorizontal: 32,
    borderRadius: 16,
    width: '100%',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
    elevation: 4,
  },
  finishButtonText: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#fff',
  },
  finishButtonTextAr: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#fff',
    marginTop: 4,
    writingDirection: 'rtl',
  },
  dialogo: {
    fontSize: 16,
    color: '#79A890',
    fontStyle: 'italic',
    lineHeight: 24,
    marginBottom: 12,
  },
  dialogoAr: {
    fontSize: 16,
    color: '#79A890',
    fontStyle: 'italic',
    lineHeight: 24,
    marginBottom: 12,
    textAlign: 'right',
  },
});
