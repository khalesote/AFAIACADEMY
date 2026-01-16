import React, { useState } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, TextInput } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import EjerciciosInteractivos from '../../../components/EjerciciosInteractivos';
import { LinearGradient } from 'expo-linear-gradient';

// Datos de ejercicios para Compras - Nivel B1
const ejercicios = [
  // Ejercicio 1: Vocabulario - Tiendas y productos
  {
    tipo: "vocabulario",
    titulo: "Relaciona cada producto con el tipo de tienda donde se vende",
    pares: [
      {"izquierda": "Pan recién horneado y cruasanes", "derecha": "Panadería"},
      {"izquierda": "Filete de ternera y pollo entero", "derecha": "Carnicería"},
      {"izquierda": "Paracetamol y medicamentos", "derecha": "Farmacia"},
      {"izquierda": "Leche, huevos y productos básicos", "derecha": "Supermercado"},
      {"izquierda": "Merluza y calamares frescos", "derecha": "Pescadería"},
      {"izquierda": "Manzanas y lechuga fresca", "derecha": "Frutería"}
    ],
    opciones: [
      "Panadería", "Carnicería", "Farmacia", "Supermercado", "Pescadería", "Frutería",
      "Pan recién horneado y cruasanes", "Filete de ternera y pollo entero", 
      "Paracetamol y medicamentos", "Leche, huevos y productos básicos",
      "Merluza y calamares frescos", "Manzanas y lechuga fresca"
    ]
  },
  
  // Ejercicio 2: Opción múltiple - Expresiones cotidianas
  {
    tipo: "opcion_multiple",
    pregunta: "¿Cómo completarías esta frase común?",
    enunciado: "Voy a ______ al supermercado a hacer la compra semanal.",
    opciones: ["ir", "vamos", "vamos a", "vamos a ir"],
    respuesta_correcta: "ir"
  },
  
  // Ejercicio 3: Opción múltiple - Vocabulario básico
  {
    tipo: "opcion_multiple",
    pregunta: "¿Qué verbo usarías para esta acción?",
    enunciado: "Necesito ______ leche, pan y frutas para el desayuno.",
    opciones: ["comprar", "vender", "cocinar", "preparar"],
    respuesta_correcta: "comprar"
  },
  
  // Ejercicio 4: Comparar precios - Habilidad matemática
  {
    tipo: "opcion_multiple",
    pregunta: "¿Dónde sale más económico el arroz?",
    enunciado: "Compara estos precios de arroz y elige la opción más barata por kilo:\n\n- Supermercado A: 1kg por 1.20€\n- Supermercado B: 500g por 0.75€\n- Supermercado C: 2kg por 2.10€",
    opciones: [
      "Supermercado A (1.20€/kg)",
      "Supermercado B (1.50€/kg)",
      "Supermercado C (1.05€/kg)",
      "Todos tienen el mismo precio"
    ],
    respuesta_correcta: "Supermercado C (1.05€/kg)"
  },

  // Ejercicio 5: Opción múltiple - Términos de ofertas
  {
    tipo: "opcion_multiple",
    pregunta: "¿Qué significa esta etiqueta de descuento?",
    imagen: "https://ejemplo.com/etiqueta-20-descuento.png",
    enunciado: "Si ves una etiqueta roja con '20% DTO' en una tienda, significa que el producto está en:",
    opciones: [
      "Oferta especial (20% más barato)", 
      "Precio normal (sin descuento)", 
      "Liquidación (últimas unidades)", 
      "Temporada alta (precio incrementado)"
    ],
    respuesta_correcta: "Oferta especial (20% más barato)",
    explicacion: "La etiqueta '20% DTO' significa que el producto tiene un 20% de descuento sobre su precio original."
  },

  // Ejercicio 6: Opción múltiple - Calidad de productos
  {
    tipo: "opcion_multiple",
    pregunta: "¿Qué característica es más importante al evaluar un producto?",
    enunciado: "Cuando dices que un producto tiene buena ______, te refieres a que está bien hecho y cumple su función.",
    opciones: ["calidad", "marca", "presentación", "publicidad"],
    respuesta_correcta: "calidad"
  },

  // Ejercicio 7: Opción múltiple - Preguntar precios
  {
    tipo: "opcion_multiple",
    pregunta: "¿Qué información estás pidiendo?",
    enunciado: "Cuando preguntas en una tienda: '¿Cuánto cuesta esta camisa?', estás preguntando por su:",
    opciones: ["precio", "talla", "color", "marca"],
    respuesta_correcta: "precio"
  },

  // Ejercicio 8: Opción múltiple - Estrategias de compra
  {
    tipo: "opcion_multiple",
    pregunta: "¿Qué haces cuando quieres ahorrar?",
    enunciado: "Siempre ______ los precios en diferentes tiendas antes de comprar algo caro.",
    opciones: ["comparo", "pregunto", "veo", "mido"],
    respuesta_correcta: "comparo"
  },

  // Ejercicio 9: Opción múltiple - Términos de compra
  {
    tipo: "opcion_multiple",
    pregunta: "¿Qué significa esta palabra?",
    enunciado: "Si ves un cartel que dice 'rebajas', significa que los precios han tenido una:",
    opciones: ["Subida", "Bajada", "Congelación", "Estabilidad"],
    respuesta_correcta: "Bajada"
  },

  // Ejercicio 10: Opción múltiple - Secciones del supermercado
  {
    tipo: "opcion_multiple",
    pregunta: "En un supermercado, ¿dónde encontrarías estos productos juntos en la misma sección?",
    imagen: "https://ejemplo.com/seccion-embutidos.jpg",
    enunciado: "Imagina que buscas: jamón cocido, salchichón y chorizo.",
    opciones: [
      "Carnes y embutidos (sección de carnes frías y fiambres)",
      "Lácteos y huevos (leche, queso, yogures)",
      "Panadería y repostería (pan, bollería, pasteles)",
      "Limpieza del hogar (productos de limpieza)"
    ],
    respuesta_correcta: "Carnes y embutidos (sección de carnes frías y fiambres)",
    explicacion: "La sección de 'Carnes y embutidos' es donde se encuentran los fiambres, embutidos y carnes frías como el jamón cocido, salchichón y chorizo. Es diferente de la sección de carnes frescas."
  },

  // Ejercicio 11: Opción múltiple - Derechos del consumidor
  {
    tipo: "opcion_multiple",
    pregunta: "¿Qué cubre la garantía de un producto?",
    enunciado: "Si un producto nuevo se estropea, la garantía te da derecho a:",
    opciones: ["Devolución del dinero", "Reparación gratuita", "Descuento en otra compra", "Ninguna de las anteriores"],
    respuesta_correcta: "Reparación gratuita"
  },

  // Ejercicio 12: Opción múltiple - Temporadas de rebajas
  {
    tipo: "opcion_multiple",
    pregunta: "¿Cuándo son las mejores ofertas?",
    enunciado: "En España, las rebajas más importantes del año suelen ser en:",
    opciones: ["Enero y julio", "Abril y octubre", "Mayo y noviembre", "Agosto y diciembre"],
    respuesta_correcta: "Enero y julio"
  },

  // Ejercicio 13: Opción múltiple - Documentos de compra
  {
    tipo: "opcion_multiple",
    pregunta: "¿Qué documento necesitas para una devolución?",
    enunciado: "Para devolver un producto en una tienda, normalmente te piden la:",
    opciones: ["Tarjeta de crédito", "Factura de compra", "Carné de identidad", "Tarjeta de fidelización"],
    respuesta_correcta: "Factura de compra"
  },

  // Ejercicio 14: Opción múltiple - Farmacias
  {
    tipo: "opcion_multiple",
    pregunta: "¿Dónde comprarías esto?",
    enunciado: "Para comprar un medicamento que te ha recetado el médico, debes ir a la:",
    opciones: ["Óptica", "Farmacia", "Perfumería", "Herbolario"],
    respuesta_correcta: "Farmacia"
  },

  // Ejercicio 15: Vocabulario - Términos de compra
  {
    tipo: "vocabulario",
    titulo: "Relaciona cada término de compra con su significado",
    pares: [
      { "izquierda": "Factura", "derecha": "Documento que detalla tu compra y garantías" },
      { "izquierda": "Garantía", "derecha": "Derecho a reparación si el producto falla" },
      { "izquierda": "Devolución", "derecha": "Derecho a devolver un producto en buen estado" },
      { "izquierda": "Rebaja", "derecha": "Descuento temporal en el precio" },
      { "izquierda": "TPV", "derecha": "Máquina para pagar con tarjeta" },
      { "izquierda": "Pedido a domicilio", "derecha": "Compra que te envían a casa" }
    ],
    opciones: [
      "Factura", "Garantía", "Devolución", "Rebaja", "TPV", "Pedido a domicilio",
      "Documento que detalla tu compra y garantías", "Derecho a reparación si el producto falla",
      "Derecho a devolver un producto en buen estado", "Descuento temporal en el precio",
      "Máquina para pagar con tarjeta", "Compra que te envían a casa"
    ]
  },

  // Ejercicio 16: Vocabulario - Secciones del supermercado
  {
    tipo: "vocabulario",
    titulo: "Relaciona cada sección del supermercado con sus productos típicos",
    pares: [
      { "izquierda": "Conservas y enlatados", "derecha": "Atún, legumbres cocidas, maíz" },
      { "izquierda": "Bebidas", "derecha": "Refrescos, agua, zumos y vinos" },
      { "izquierda": "Limpieza del hogar", "derecha": "Lejía, lavavajillas, bayetas" },
      { "izquierda": "Higiene personal", "derecha": "Champú, pasta de dientes, jabón" },
      { "izquierda": "Congelados", "derecha": "Verduras congeladas, helados, pizzas" },
      { "izquierda": "Desayunos", "derecha": "Galletas, cereales, mermeladas" }
    ],
    opciones: [
      "Conservas y enlatados", "Bebidas", "Limpieza del hogar", "Higiene personal", "Congelados", "Desayunos",
      "Atún, legumbres cocidas, maíz", "Refrescos, agua, zumos y vinos", "Lejía, lavavajillas, bayetas",
      "Champú, pasta de dientes, jabón", "Verduras congeladas, helados, pizzas", "Galletas, cereales, mermeladas"
    ]
  },

  // Ejercicio 17: Vocabulario - Expresiones en tiendas
  {
    tipo: "vocabulario",
    titulo: "Relaciona cada expresión con su significado en una tienda",
    pares: [
      { "izquierda": "¿Tiene cambio de 20 euros?", "derecha": "¿Me puede cambiar un billete de 20?" },
      { "izquierda": "¿Aceptan tarjeta?", "derecha": "¿Puedo pagar con tarjeta bancaria?" },
      { "izquierda": "¿Tienen talla más grande?", "derecha": "¿Venden este artículo en una talla mayor?" },
      { "izquierda": "¿Hasta cuándo tienen rebajas?", "derecha": "¿Cuándo terminan los descuentos?" },
      { "izquierda": "¿Puedo probármelo?", "derecha": "¿Dónde están los probadores?" },
      { "izquierda": "¿Hacen envíos a domicilio?", "derecha": "¿Pueden mandarme la compra a casa?" }
    ],
    opciones: [
      "¿Tiene cambio de 20 euros?", "¿Aceptan tarjeta?", "¿Tienen talla más grande?",
      "¿Hasta cuándo tienen rebajas?", "¿Puedo probármelo?", "¿Hacen envíos a domicilio?",
      "¿Me puede cambiar un billete de 20?", "¿Puedo pagar con tarjeta bancaria?",
      "¿Venden este artículo en una talla mayor?", "¿Cuándo terminan los descuentos?",
      "¿Dónde están los probadores?", "¿Pueden mandarme la compra a casa?"
    ]
  },

  // Ejercicio 18: Vocabulario - Métodos de pago
  {
    tipo: "vocabulario",
    titulo: "Relaciona cada método de pago con su descripción",
    pares: [
      { "izquierda": "Efectivo", "derecha": "Pago en billetes y monedas (común en pequeños comercios)" },
      { "izquierda": "Tarjeta", "derecha": "Pago con tarjeta de crédito/débito (aceptado en la mayoría de sitios)" },
      { "izquierda": "Bizum", "derecha": "Pago entre particulares o en algunos comercios a través del móvil" },
      { "izquierda": "Apple/Google Pay", "derecha": "Pago con el móvil sin contacto en tiendas físicas" },
      { "izquierda": "Pago en efectivo en cajero", "derecha": "Para compras online, pagas al recoger el pedido" },
      { "izquierda": "Contra reembolso", "derecha": "Pagas cuando recibes el paquete en casa" }
    ],
    opciones: [
      "Efectivo", "Tarjeta", "Bizum", "Apple/Google Pay", "Pago en efectivo en cajero", "Contra reembolso",
      "Pago en billetes y monedas (común en pequeños comercios)",
      "Pago con tarjeta de crédito/débito (aceptado en la mayoría de sitios)",
      "Pago entre particulares o en algunos comercios a través del móvil",
      "Pago con el móvil sin contacto en tiendas físicas",
      "Para compras online, pagas al recoger el pedido",
      "Pagas cuando recibes el paquete en casa"
    ]
  },

  // Ejercicio 19: Opción múltiple - Marcas blancas
  {
    tipo: "opcion_multiple",
    pregunta: "¿Qué son los productos de marca blanca?",
    enunciado: "Los productos de 'marca blanca' o 'marca del supermercado' son:",
    opciones: [
      "Productos de lujo y alta calidad",
      "Productos genéricos de la propia cadena",
      "Productos importados de otros países",
      "Productos ecológicos certificados"
    ],
    respuesta_correcta: "Productos genéricos de la propia cadena"
  },

  // Ejercicio 20: Opción múltiple - Ahorro en compras
  {
    tipo: "opcion_multiple",
    pregunta: "¿Cómo ahorrar en el supermercado?",
    enunciado: "La mejor estrategia para ahorrar dinero cuando haces la compra es:",
    opciones: [
      "Comprar sin planificación previa",
      "Llevar una lista y comparar precios",
      "Comprar siempre marcas caras",
      "Ir de compras con hambre"
    ],
    respuesta_correcta: "Llevar una lista y comparar precios"
  },

  // Ejercicio 21: Opción múltiple - Pescado fresco
  {
    tipo: "opcion_multiple",
    pregunta: "¿Dónde comprarías pescado fresco?",
    enunciado: "Para comprar pescado fresco recién traído del mar, debes ir a la:",
    opciones: ["Carnicería", "Pescadería", "Charcutería", "Pastelería"],
    respuesta_correcta: "Pescadería"
  },

  // Ejercicio 22: Opción múltiple
  {
    tipo: "opcion_multiple",
    enunciado: "¿Qué significa 'devolver' un producto?",
    opciones: ["Comprarlo", "Llevarlo de vuelta a la tienda", "Regalarlo", "Venderlo"],
    respuesta_correcta: "Llevarlo de vuelta a la tienda"
  }
];

export default function Compras() {
  const router = useRouter();

  return (
    <ScrollView style={{ backgroundColor: '#f5f7fa' }} contentContainerStyle={styles.container}>
      <TouchableOpacity
        style={styles.backButton}
        onPress={() => router.replace('/B1_Umbral')}
        accessibilityLabel="Volver al menú B1: Umbral"
      >
        <Ionicons name="arrow-back" size={28} color="#79A890" />
      </TouchableOpacity>
      
      <Text style={styles.title}>Compras y consumo inteligente</Text>
      <Text style={styles.titleAr}>التسوق والاستهلاك الذكي</Text>
      
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Contexto cultural</Text>
        <Text style={styles.sectionText}>
          Las compras en España son una actividad social y cultural importante. Los españoles valoran la calidad, 
          buscan ofertas y comparan precios. Los mercados tradicionales coexisten con supermercados modernos, 
          ofreciendo diferentes experiencias de compra.
          {"\n\n"}
          Los horarios de compra suelen ser por la mañana o tarde, y es común hacer la compra semanal en familia.
        </Text>
        <Text style={styles.sectionTextAr}>
          التسوق في إسبانيا نشاط اجتماعي وثقافي مهم. الإسبان يقدرون الجودة، يبحثون عن العروض ويقارنون الأسعار.
          الأسواق التقليدية تتعايش مع السوبر ماركت الحديثة، مما يوفر تجارب تسوق مختلفة.
          {"\n\n"}
          أوقات التسوق عادة تكون في الصباح أو المساء، ومن الشائع القيام بالتسوق الأسبوعي مع العائلة.
        </Text>
      </View>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Tipos de establecimientos</Text>
        <Text style={styles.sectionText}>
          <Text style={styles.subtitle}>Supermercados:</Text>{"\n"}
          • Mercadona, Carrefour, Lidl, Día{"\n"}
          • Productos variados, precios competitivos{"\n"}
          • Horarios amplios, parking gratuito
          {"\n\n"}
          <Text style={styles.subtitle}>Mercados tradicionales:</Text>{"\n"}
          • Productos frescos y de calidad{"\n"}
          • Ambiente social y cultural{"\n"}
          • Precios variables según el vendedor
          {"\n\n"}
          <Text style={styles.subtitle}>Tiendas especializadas:</Text>{"\n"}
          • Panaderías, carnicerías, pescaderías{"\n"}
          • Productos de alta calidad{"\n"}
          • Asesoramiento especializado
        </Text>
        <Text style={styles.sectionTextAr}>
          <Text style={styles.subtitle}>السوبر ماركت:</Text>{"\n"}
          • مركادونا، كارفور، ليدل، ديا{"\n"}
          • منتجات متنوعة، أسعار تنافسية{"\n"}
          • أوقات عمل طويلة، موقف سيارات مجاني
          {"\n\n"}
          <Text style={styles.subtitle}>الأسواق التقليدية:</Text>{"\n"}
          • منتجات طازجة وعالية الجودة{"\n"}
          • جو اجتماعي وثقافي{"\n"}
          • أسعار متغيرة حسب البائع
          {"\n\n"}
          <Text style={styles.subtitle}>المتاجر المتخصصة:</Text>{"\n"}
          • مخابز، جزارات، أسماك{"\n"}
          • منتجات عالية الجودة{"\n"}
          • استشارة متخصصة
        </Text>
      </View>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Estrategias de compra inteligente</Text>
        <Text style={styles.sectionText}>
          <Text style={styles.subtitle}>Comparar precios:</Text>{"\n"}
          • Revisar precios por kilo/litro{"\n"}
          • Comparar entre diferentes tiendas{"\n"}
          • Usar aplicaciones de comparación
          {"\n\n"}
          <Text style={styles.subtitle}>Buscar ofertas:</Text>{"\n"}
          • Revisar folletos semanales{"\n"}
          • Aprovechar rebajas de temporada{"\n"}
          • Usar cupones y descuentos
          {"\n\n"}
          <Text style={styles.subtitle}>Hacer listas:</Text>{"\n"}
          • Planificar las comidas semanales{"\n"}
          • Evitar compras impulsivas{"\n"}
          • Controlar el presupuesto
        </Text>
        <Text style={styles.sectionTextAr}>
          <Text style={styles.subtitle}>مقارنة الأسعار:</Text>{"\n"}
          • مراجعة الأسعار بالكيلو/اللتر{"\n"}
          • المقارنة بين المتاجر المختلفة{"\n"}
          • استخدام تطبيقات المقارنة
          {"\n\n"}
          <Text style={styles.subtitle}>البحث عن العروض:</Text>{"\n"}
          • مراجعة النشرات الأسبوعية{"\n"}
          • الاستفادة من خصومات الموسم{"\n"}
          • استخدام القسائم والخصومات
          {"\n\n"}
          <Text style={styles.subtitle}>صنع القوائم:</Text>{"\n"}
          • تخطيط الوجبات الأسبوعية{"\n"}
          • تجنب المشتريات الاندفاعية{"\n"}
          • التحكم في الميزانية
        </Text>
      </View>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Vocabulario esencial</Text>
        <Text style={styles.sectionText}>
          <Text style={styles.subtitle}>Establecimientos:</Text>{"\n"}
          supermercado = سوبر ماركت{"\n"}
          mercado = سوق{"\n"}
          panadería = مخبز{"\n"}
          carnicería = جزارة{"\n"}
          pescadería = سمك{"\n"}
          frutería = فواكه وخضروات{"\n"}
          farmacia = صيدلية
          {"\n\n"}
          <Text style={styles.subtitle}>Precios y ofertas:</Text>{"\n"}
          precio = سعر{"\n"}
          oferta = عرض{"\n"}
          descuento = خصم{"\n"}
          rebaja = تخفيض{"\n"}
          ganga = صفقة{"\n"}
          caro = غالي{"\n"}
          barato = رخيص
          {"\n\n"}
          <Text style={styles.subtitle}>Productos:</Text>{"\n"}
          producto = منتج{"\n"}
          marca = علامة تجارية{"\n"}
          calidad = جودة{"\n"}
          garantía = ضمان{"\n"}
          factura = فاتورة{"\n"}
          ticket = إيصال{"\n"}
          devolución = إرجاع
        </Text>
        <Text style={styles.sectionTextAr}>
          <Text style={styles.subtitle}>المؤسسات:</Text>{"\n"}
          سوبر ماركت = supermercado{"\n"}
          سوق = mercado{"\n"}
          مخبز = panadería{"\n"}
          جزارة = carnicería{"\n"}
          سمك = pescadería{"\n"}
          فواكه وخضروات = frutería{"\n"}
          صيدلية = farmacia
          {"\n\n"}
          <Text style={styles.subtitle}>الأسعار والعروض:</Text>{"\n"}
          سعر = precio{"\n"}
          عرض = oferta{"\n"}
          خصم = descuento{"\n"}
          تخفيض = rebaja{"\n"}
          صفقة = ganga{"\n"}
          غالي = caro{"\n"}
          رخيص = barato
          {"\n\n"}
          <Text style={styles.subtitle}>المنتجات:</Text>{"\n"}
          منتج = producto{"\n"}
          علامة تجارية = marca{"\n"}
          جودة = calidad{"\n"}
          ضمان = garantía{"\n"}
          فاتورة = factura{"\n"}
          إيصال = ticket{"\n"}
          إرجاع = devolución
        </Text>
      </View>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Expresiones útiles</Text>
        <Text style={styles.sectionText}>
          • "¿Cuánto cuesta?" = كم يكلف؟{"\n"}
          • "¿Está de oferta?" = هل هو في عرض؟{"\n"}
          • "¿Tiene descuento?" = هل له خصم؟{"\n"}
          • "¿Puedo probármelo?" = هل يمكنني تجربته؟{"\n"}
          • "¿Aceptan tarjeta?" = هل تقبلون البطاقة؟{"\n"}
          • "¿Dónde está la caja?" = أين الصندوق؟{"\n"}
          • "¿Puede envolverlo?" = هل يمكنك تغليفه؟{"\n"}
          • "¿Tiene garantía?" = هل له ضمان؟{"\n"}
          • "¿Puedo devolverlo?" = هل يمكنني إرجاعه؟{"\n"}
          • "¿Hay algo más barato?" = هل هناك شيء أرخص؟
        </Text>
        <Text style={styles.sectionTextAr}>
          • "كم يكلف؟" = ¿Cuánto cuesta?{"\n"}
          • "هل هو في عرض؟" = ¿Está de oferta?{"\n"}
          • "هل له خصم؟" = ¿Tiene descuento?{"\n"}
          • "هل يمكنني تجربته؟" = ¿Puedo probármelo?{"\n"}
          • "هل تقبلون البطاقة؟" = ¿Aceptan tarjeta?{"\n"}
          • "أين الصندوق؟" = ¿Dónde está la caja?{"\n"}
          • "هل يمكنك تغليفه؟" = ¿Puede envolverlo?{"\n"}
          • "هل له ضمان؟" = ¿Tiene garantía?{"\n"}
          • "هل يمكنني إرجاعه؟" = ¿Puedo devolverlo?{"\n"}
          • "هل هناك شيء أرخص؟" = ¿Hay algo más barato?
        </Text>
      </View>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Diferencias culturales</Text>
        <Text style={styles.sectionText}>
          <Text style={styles.subtitle}>Horarios:</Text>{"\n"}
          En España, las tiendas suelen cerrar para comer (14:00-17:00) y abren hasta tarde.
          {"\n\n"}
          <Text style={styles.subtitle}>Regateo:</Text>{"\n"}
          En mercados tradicionales es común regatear, pero no en supermercados.
          {"\n\n"}
          <Text style={styles.subtitle}>Propinas:</Text>{"\n"}
          No es obligatorio dar propina en tiendas, pero es común en mercados.
          {"\n\n"}
          <Text style={styles.subtitle}>Calidad vs precio:</Text>{"\n"}
          Los españoles valoran la calidad, pero también buscan buenos precios.
        </Text>
        <Text style={styles.sectionTextAr}>
          <Text style={styles.subtitle}>الأوقات:</Text>{"\n"}
          في إسبانيا، المتاجر عادة تغلق لتناول الطعام (14:00-17:00) وتفتح حتى وقت متأخر.
          {"\n\n"}
          <Text style={styles.subtitle}>المساومة:</Text>{"\n"}
          في الأسواق التقليدية من الشائع المساومة، لكن ليس في السوبر ماركت.
          {"\n\n"}
          <Text style={styles.subtitle}>البقشيش:</Text>{"\n"}
          ليس إلزاميًا إعطاء بقشيش في المتاجر، لكنه شائع في الأسواق.
          {"\n\n"}
          <Text style={styles.subtitle}>الجودة مقابل السعر:</Text>{"\n"}
          الإسبان يقدرون الجودة، لكنهم يبحثون أيضًا عن أسعار جيدة.
        </Text>
      </View>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Compras online vs presenciales</Text>
        <Text style={styles.sectionText}>
          <Text style={styles.subtitle}>Ventajas del comercio online:</Text>{"\n"}
          • Comodidad y ahorro de tiempo{"\n"}
          • Comparación fácil de precios{"\n"}
          • Entrega a domicilio{"\n"}
          • Más opciones de productos
          {"\n\n"}
          <Text style={styles.subtitle}>Ventajas del comercio presencial:</Text>{"\n"}
          • Ver y tocar los productos{"\n"}
          • Asesoramiento personal{"\n"}
          • Compras inmediatas{"\n"}
          • Experiencia social
        </Text>
        <Text style={styles.sectionTextAr}>
          <Text style={styles.subtitle}>مزايا التجارة الإلكترونية:</Text>{"\n"}
          • الراحة وتوفير الوقت{"\n"}
          • مقارنة سهلة للأسعار{"\n"}
          • التوصيل للمنزل{"\n"}
          • المزيد من خيارات المنتجات
          {"\n\n"}
          <Text style={styles.subtitle}>مزايا التجارة الحضورية:</Text>{"\n"}
          • رؤية ولمس المنتجات{"\n"}
          • استشارة شخصية{"\n"}
          • مشتريات فورية{"\n"}
          • تجربة اجتماعية
        </Text>
      </View>

      {/* Sección de Ejercicios */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Ejercicios de práctica</Text>
        <Text style={styles.sectionText}>Practica lo que has aprendido con estos ejercicios interactivos.</Text>
        <Text style={styles.sectionTextAr}>تدرب على ما تعلمته مع هذه التمارين التفاعلية.</Text>
      </View>

      <EjerciciosInteractivos ejercicios={ejercicios} />

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Consejos para ahorrar dinero</Text>
        <Text style={styles.sectionText}>
          • Haz una lista de compras antes de salir{"\n"}
          • Compara precios entre diferentes tiendas{"\n"}
          • Aprovecha las ofertas de temporada{"\n"}
          • Compra productos de marca blanca{"\n"}
          • Usa cupones y descuentos{"\n"}
          • Compra productos de temporada{"\n"}
          • Evita compras impulsivas{"\n"}
          • Revisa las fechas de caducidad
        </Text>
        <Text style={styles.sectionTextAr}>
          • اصنع قائمة تسوق قبل الخروج{"\n"}
          • قارن الأسعار بين المتاجر المختلفة{"\n"}
          • استفد من عروض الموسم{"\n"}
          • اشتر منتجات العلامة البيضاء{"\n"}
          • استخدم القسائم والخصومات{"\n"}
          • اشتر منتجات الموسم{"\n"}
          • تجنب المشتريات الاندفاعية{"\n"}
          • راجع تواريخ انتهاء الصلاحية
        </Text>
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
  subtitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#79A890',
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
  // Estilos para ejercicios
  ejercicioContainer: {
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
  ejercicioTitulo: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#79A890',
    marginBottom: 8,
  },
  ejercicioEnunciado: {
    fontSize: 16,
    color: '#333',
    marginBottom: 12,
    lineHeight: 22,
  },
  inputContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 8,
    marginBottom: 12,
  },
  textInput: {
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 8,
    padding: 12,
    fontSize: 16,
    minWidth: 120,
    backgroundColor: '#f9f9f9',
  },
  textArea: {
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 8,
    padding: 12,
    fontSize: 16,
    minHeight: 100,
    backgroundColor: '#f9f9f9',
    textAlignVertical: 'top',
  },
  checkButton: {
    backgroundColor: '#79A890',
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 8,
    alignSelf: 'flex-start',
  },
  checkButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
  feedback: {
    fontSize: 16,
    fontWeight: 'bold',
    marginTop: 8,
  },
  opcionButton: {
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 8,
    padding: 12,
    marginBottom: 8,
    backgroundColor: '#f9f9f9',
  },
  opcionSeleccionada: {
    backgroundColor: '#79A890',
    borderColor: '#79A890',
  },
  opcionText: {
    fontSize: 16,
    color: '#333',
  },
  opcionTextSeleccionada: {
    color: '#fff',
    fontWeight: 'bold',
  },
  parContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingVertical: 8,
    borderBottomWidth: 1,
    borderBottomColor: '#eee',
  },
  parTexto: {
    fontSize: 16,
    color: '#333',
    flex: 1,
  },
  parFlecha: {
    fontSize: 18,
    color: '#79A890',
    marginHorizontal: 12,
  },
});
