import React from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, Image, Alert } from 'react-native';
import { useRouter } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
import AudioButton from '@/app/components/AudioButton';
import EjerciciosInteractivos from '@/app/components/EjerciciosInteractivos';
import { useUserProgress } from '@/contexts/UserProgressContext';
import { LinearGradient } from 'expo-linear-gradient';

function Unidad3() {
  const router = useRouter();
  const { progress, markUnitCompleted } = useUserProgress();
  const unitIndex = 2;
  const levelProgress = progress.A2;
  const alreadyCompleted = levelProgress?.unitsCompleted?.[unitIndex] ?? false;

  const handleFinish = () => {
    if (!alreadyCompleted) {
      markUnitCompleted('A2', unitIndex);
    }
    // Navegar directamente a la siguiente unidad (Unidad4)
    router.push('/A2_Plataforma/clases/Unidad4');
  };

  const ejercicios = [
    // Ejercicios de opción múltiple (17)
    {
      tipo: 'opcion_multiple',
      enunciado: 'ما الذي تحتاجه لقياس الملابس في المتجر؟',
      opciones: [
        'Un probador',
        'Un carrito',
        'Una cesta',
        'Un espejo'
      ],
      respuesta_correcta: 'Un probador'
    },
    {
      tipo: 'opcion_multiple',
      enunciado: '¿Cómo se llama el documento que te dan al pagar?',
      opciones: [
        'El ticket',
        'El menú',
        'El catálogo',
        'El escaparate'
      ],
      respuesta_correcta: 'El ticket'
    },
    {
      tipo: 'opcion_multiple',
      enunciado: '¿Qué significa la etiqueta "50% de descuento"?',
      opciones: [
        'Pagas la mitad del precio',
        'Pagas el doble',
        'Es gratis',
        'No hay oferta'
      ],
      respuesta_correcta: 'Pagas la mitad del precio'
    },
    {
      tipo: 'opcion_multiple',
      enunciado: 'ما ترجمة "camiseta" إلى العربية؟',
      opciones: [
        'قميص',
        'بنطال',
        'حقيبة',
        'قبعة'
      ],
      respuesta_correcta: 'قميص'
    },
    {
      tipo: 'opcion_multiple',
      enunciado: 'ما معنى كلمة "talla"؟',
      opciones: [
        'المقاس',
        'اللون',
        'السعر',
        'الخامة'
      ],
      respuesta_correcta: 'المقاس'
    },
    {
      tipo: 'opcion_multiple',
      enunciado: '¿Cómo se pide ayuda en una tienda?',
      opciones: [
        '¿En qué puedo ayudarle?',
        '¿Qué hora es?',
        '¿Dónde está el baño?',
        '¿Cuánto cuesta?'
      ],
      respuesta_correcta: '¿En qué puedo ayudarle?'
    },
    {
      tipo: 'opcion_multiple',
      enunciado: 'ما معنى كلمة "probador"؟',
      opciones: [
        'غرفة القياس',
        'صندوق الدفع',
        'عربة التسوق',
        'بطاقة السعر'
      ],
      respuesta_correcta: 'غرفة القياس'
    },
    {
      tipo: 'opcion_multiple',
      enunciado: 'ما ترجمة "pantalón" إلى العربية؟',
      opciones: [
        'بنطال',
        'قميص',
        'حذاء',
        'تنورة'
      ],
      respuesta_correcta: 'بنطال'
    },
    {
      tipo: 'opcion_multiple',
      enunciado: '¿Qué significa "rebajas"?',
      opciones: [
        'Descuentos',
        'Novedades',
        'Productos caros',
        'Agotado'
      ],
      respuesta_correcta: 'Descuentos'
    },
    {
      tipo: 'opcion_multiple',
      enunciado: 'ما معنى كلمة "zapatos"؟',
      opciones: [
        'أحذية',
        'قبعات',
        'قمصان',
        'حقائب'
      ],
      respuesta_correcta: 'أحذية'
    },
    {
      tipo: 'opcion_multiple',
      enunciado: 'ما معنى كلمة "precio"؟',
      opciones: [
        'السعر',
        'المقاس',
        'اللون',
        'الخامة'
      ],
      respuesta_correcta: 'السعر'
    },
    {
      tipo: 'opcion_multiple',
      enunciado: '¿Con qué pagas si no usas tarjeta?',
      opciones: [
        'Efectivo',
        'Cheque',
        'Transferencia',
        'Cuotas'
      ],
      respuesta_correcta: 'Efectivo'
    },
    {
      tipo: 'opcion_multiple',
      enunciado: '¿Cuál de estos es una fibra natural?',
      opciones: [
        'Algodón',
        'Poliéster',
        'Nylon',
        'Acrílico'
      ],
      respuesta_correcta: 'Algodón'
    },
    {
      tipo: 'opcion_multiple',
      enunciado: 'ما ترجمة "vestido" إلى العربية؟',
      opciones: [
        'فستان',
        'بنطال',
        'قميص',
        'معطف'
      ],
      respuesta_correcta: 'فستان'
    },
    {
      tipo: 'opcion_multiple',
      enunciado: 'ما معنى كلمة "oferta"؟',
      opciones: [
        'عرض',
        'السعر',
        'المقاس',
        'اللون'
      ],
      respuesta_correcta: 'عرض'
    },
    {
      tipo: 'opcion_multiple',
      enunciado: 'ما ترجمة "chaqueta" إلى العربية؟',
      opciones: [
        'سترة',
        'تنورة',
        'قميص',
        'حقيبة'
      ],
      respuesta_correcta: 'سترة'
    },
    {
      tipo: 'opcion_multiple',
      enunciado: 'ما معنى كلمة "descuento"؟',
      opciones: [
        'خصم',
        'السعر',
        'عرض',
        'تنزيلات'
      ],
      respuesta_correcta: 'خصم'
    },
    // Ejercicios de relacionar (3)
    {
      tipo: 'vocabulario',
      titulo: 'اربط الملابس بأسمائها',
      pares: [
        { "izquierda": "Camiseta", "derecha": "قميص" },
        { "izquierda": "Pantalón", "derecha": "بنطلون" },
        { "izquierda": "Vestido", "derecha": "فستان" },
        { "izquierda": "Zapatos", "derecha": "أحذية" },
        { "izquierda": "Chaqueta", "derecha": "جاكيت" }
      ],
      opciones: [
        "Camiseta", "Pantalón", "Vestido", "Zapatos", "Chaqueta",
        "قميص", "بنطلون", "فستان", "أحذية", "جاكيت"
      ]
    },
    {
      tipo: 'vocabulario',
      titulo: 'اربط الخامات بمعانيها',
      pares: [
        { "izquierda": "Algodón", "derecha": "قطن" },
        { "izquierda": "Lana", "derecha": "صوف" },
        { "izquierda": "Cuero", "derecha": "جلد" },
        { "izquierda": "Seda", "derecha": "حرير" },
        { "izquierda": "Lino", "derecha": "كتان" }
      ],
      opciones: [
        "Algodón", "Lana", "Cuero", "Seda", "Lino",
        "قطن", "صوف", "جلد", "حرير", "كتان"
      ]
    },
    {
      tipo: 'vocabulario',
      titulo: 'اربط مصطلحات التسوق',
      pares: [
        { "izquierda": "Probador", "derecha": "غرفة القياس" },
        { "izquierda": "Oferta", "derecha": "عرض خاص" },
        { "izquierda": "Rebajas", "derecha": "تخفيضات" },
        { "izquierda": "Talla", "derecha": "المقاس" },
        { "izquierda": "Precio", "derecha": "السعر" }
      ],
      opciones: [
        "Probador", "Oferta", "Rebajas", "Talla", "Precio",
        "غرفة القياس", "عرض خاص", "تخفيضات", "المقاس", "السعر"
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
        source={{ uri: 'https://images.unsplash.com/photo-1485462537746-965f33f7f6a7?auto=format&fit=crop&w=800&q=80' }}
        style={styles.heroImage}
        accessibilityLabel="Imagen de ropa y compras"
      />

      <Text style={styles.title}>🛍️ Unidad 3: Compras y Ropa</Text>
      <View style={{ alignItems: 'center', marginBottom: 8 }}>
        <AudioButton text="Unidad 3: Compras y Ropa" size="small" showText={false} color="#79A890" />
      </View>
      <Text style={styles.titleAr}>الوحدة 3: التسوق والملابس</Text>

      <View style={styles.card}>
        <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' }}>
          <Text style={styles.sectionTitle}>🌟 Comprando con Confianza</Text>
          <AudioButton text="Comprando con confianza" size="small" showText={false} color="#79A890" />
        </View>
        <Text style={styles.sectionText}>
          En esta unidad aprenderás a navegar por tiendas españolas con confianza. Descubrirás cómo pedir tallas, probarte ropa, entender ofertas y hacer compras efectivas. Es esencial para desenvolverse en el comercio español.
        </Text>
        <Text style={styles.sectionTextAr}>
          في هذه الوحدة ستتعلم التنقل في المتاجر الإسبانية بثقة. ستكتشف كيفية طلب المقاسات وقياس الملابس وفهم العروض وإجراء مشتريات فعالة. هذا أساسي للتعامل في التجارة الإسبانية.
        </Text>
      </View>

      {/* Diálogo (por líneas) con audio y traducción */}
      <View style={styles.card}>
        <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' }}>
          <Text style={styles.sectionTitle}>💬 Diálogo (por líneas): En la Tienda</Text>
          <AudioButton text="Diálogo por líneas: En la tienda" size="small" showText={false} color="#79A890" />
        </View>

        {/* Audio global del diálogo */}
        <View style={{ alignItems: 'flex-start', marginBottom: 8 }}>
          <AudioButton 
            text="Buenos días, ¿en qué puedo ayudarle? Busco un vestido negro en talla M. Tenemos este modelo, ¿quiere probárselo? Sí, por favor. Los probadores están al fondo, a la izquierda. Gracias. De nada." 
            size="medium" 
            showText={false} 
            color="#79A890" 
          />
        </View>

        <View style={{ backgroundColor: '#f8f9fa', padding: 12, borderRadius: 8 }}>
          <View style={{ marginBottom: 12 }}>
            <View style={{ flexDirection: 'row', alignItems: 'flex-start', marginBottom: 6 }}>
              <Text style={[styles.benefit, { minWidth: 90 }]}>Vendedor:</Text>
              <Text style={{ flex: 1, fontSize: 16, color: '#333' }}>Buenos días, ¿en qué puedo ayudarle?</Text>
              <AudioButton text="Buenos días, ¿en qué puedo ayudarle?" size="small" showText={false} color="#79A890" />
            </View>
            <Text style={[styles.sectionTextAr, { backgroundColor: '#e3f2fd', padding: 8, borderRadius: 6 }]}>صباح الخير، كيف يمكنني مساعدتك؟</Text>
          </View>

          <View style={{ marginBottom: 12 }}>
            <View style={{ flexDirection: 'row', alignItems: 'flex-start', marginBottom: 6 }}>
              <Text style={[styles.benefit, { minWidth: 90 }]}>Cliente:</Text>
              <Text style={{ flex: 1, fontSize: 16, color: '#333' }}>Busco un vestido negro en talla M.</Text>
              <AudioButton text="Busco un vestido negro en talla M." size="small" showText={false} color="#79A890" />
            </View>
            <Text style={[styles.sectionTextAr, { backgroundColor: '#e3f2fd', padding: 8, borderRadius: 6 }]}>أبحث عن فستان أسود بمقاس M.</Text>
          </View>

          <View style={{ marginBottom: 12 }}>
            <View style={{ flexDirection: 'row', alignItems: 'flex-start', marginBottom: 6 }}>
              <Text style={[styles.benefit, { minWidth: 90 }]}>Vendedor:</Text>
              <Text style={{ flex: 1, fontSize: 16, color: '#333' }}>Tenemos este modelo, ¿quiere probárselo?</Text>
              <AudioButton text="Tenemos este modelo, ¿quiere probárselo?" size="small" showText={false} color="#79A890" />
            </View>
            <Text style={[styles.sectionTextAr, { backgroundColor: '#e3f2fd', padding: 8, borderRadius: 6 }]}>لدينا هذا الموديل، هل تريدين قياسه؟</Text>
          </View>

          <View style={{ marginBottom: 12 }}>
            <View style={{ flexDirection: 'row', alignItems: 'flex-start', marginBottom: 6 }}>
              <Text style={[styles.benefit, { minWidth: 90 }]}>Cliente:</Text>
              <Text style={{ flex: 1, fontSize: 16, color: '#333' }}>Sí, por favor.</Text>
              <AudioButton text="Sí, por favor." size="small" showText={false} color="#79A890" />
            </View>
            <Text style={[styles.sectionTextAr, { backgroundColor: '#e3f2fd', padding: 8, borderRadius: 6 }]}>نعم، من فضلك.</Text>
          </View>

          <View style={{ marginBottom: 4 }}>
            <View style={{ flexDirection: 'row', alignItems: 'flex-start', marginBottom: 6 }}>
              <Text style={[styles.benefit, { minWidth: 90 }]}>Vendedor:</Text>
              <Text style={{ flex: 1, fontSize: 16, color: '#333' }}>Los probadores están al fondo, a la izquierda.</Text>
              <AudioButton text="Los probadores están al fondo, a la izquierda." size="small" showText={false} color="#79A890" />
            </View>
            <Text style={[styles.sectionTextAr, { backgroundColor: '#e3f2fd', padding: 8, borderRadius: 6 }]}>غرف القياس في الخلف، على اليسار.</Text>
          </View>
        </View>
      </View>

      <View style={styles.card}>
        <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' }}>
          <Text style={styles.sectionTitle}>📚 Vocabulario Esencial</Text>
          <AudioButton text="Vocabulario esencial" size="small" showText={false} color="#79A890" />
        </View>
        
        <Text style={styles.sectionSubtitle}>👕 Prendas de Vestir</Text>
        <Text style={styles.sectionText}>
          • <Text style={styles.benefit}>Camiseta</Text> = تيشرت - T-shirt{'\n'}
          • <Text style={styles.benefit}>Pantalón</Text> = بنطلون - Pants{'\n'}
          • <Text style={styles.benefit}>Vestido</Text> = فستان - Dress{'\n'}
          • <Text style={styles.benefit}>Chaqueta</Text> = سترة - Jacket{'\n'}
          • <Text style={styles.benefit}>Zapatos</Text> = أحذية - Shoes{'\n'}
          • <Text style={styles.benefit}>Calcetines</Text> = جوارب - Socks
        </Text>

        <Text style={styles.sectionSubtitle}>🎨 Colores y Tallas</Text>
        <Text style={styles.sectionText}>
          • <Text style={styles.benefit}>Azul</Text> = أزرق - Blue{'\n'}
          • <Text style={styles.benefit}>Rojo</Text> = أحمر - Red{'\n'}
          • <Text style={styles.benefit}>Verde</Text> = أخضر - Green{'\n'}
          • <Text style={styles.benefit}>Negro</Text> = أسود - Black{'\n'}
          • <Text style={styles.benefit}>Blanco</Text> = أبيض - White{'\n'}
          • <Text style={styles.benefit}>Talla S/M/L</Text> = مقاس صغير/متوسط/كبير - Size S/M/L
        </Text>

        <Text style={styles.sectionSubtitle}>🧵 Materiales</Text>
        <Text style={styles.sectionText}>
          • <Text style={styles.benefit}>Algodón</Text> = قطن - Cotton{'\n'}
          • <Text style={styles.benefit}>Lana</Text> = صوف - Wool{'\n'}
          • <Text style={styles.benefit}>Cuero</Text> = جلد - Leather{'\n'}
          • <Text style={styles.benefit}>Seda</Text> = حرير - Silk{'\n'}
          • <Text style={styles.benefit}>Lino</Text> = كتان - Linen{'\n'}
          • <Text style={styles.benefit}>Poliéster</Text> = بوليستر - Polyester
        </Text>

        <Text style={styles.sectionSubtitle}>💰 Precios y Pagos</Text>
        <Text style={styles.sectionText}>
          • <Text style={styles.benefit}>Precio</Text> = سعر - Price{'\n'}
          • <Text style={styles.benefit}>Descuento</Text> = خصم - Discount{'\n'}
          • <Text style={styles.benefit}>Oferta</Text> = عرض - Offer{'\n'}
          • <Text style={styles.benefit}>Efectivo</Text> = نقداً - Cash{'\n'}
          • <Text style={styles.benefit}>Tarjeta</Text> = بطاقة - Card{'\n'}
          • <Text style={styles.benefit}>Ticket</Text> = إيصال - Receipt
        </Text>

        <Text style={styles.sectionSubtitle}>🏪 Lugares de Compra</Text>
        <Text style={styles.sectionText}>
          • <Text style={styles.benefit}>Tienda</Text> = متجر - Store{'\n'}
          • <Text style={styles.benefit}>Centro comercial</Text> = مركز تجاري - Shopping center{'\n'}
          • <Text style={styles.benefit}>Mercado</Text> = سوق - Market{'\n'}
          • <Text style={styles.benefit}>Boutique</Text> = بوتيك - Boutique{'\n'}
          • <Text style={styles.benefit}>Escaparate</Text> = واجهة المتجر - Shop window{'\n'}
          • <Text style={styles.benefit}>Probador</Text> = غرفة القياس - Fitting room
        </Text>
      </View>

      <View style={styles.card}>
        <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' }}>
          <Text style={styles.sectionTitle}>🎯 Gramática Básica</Text>
          <AudioButton text="Gramática básica" size="small" showText={false} color="#79A890" />
        </View>
        
        <Text style={styles.sectionSubtitle}>📊 Comparativos</Text>
        <Text style={styles.sectionText}>
          Para comparar prendas y precios:{'\n\n'}
          • <Text style={styles.benefit}>Más que</Text> = أكثر من - More than{'\n'}
          • <Text style={styles.benefit}>Menos que</Text> = أقل من - Less than{'\n'}
          • <Text style={styles.benefit}>Tan... como</Text> = بنفس... مثل - As... as{'\n'}
          • <Text style={styles.benefit}>Mejor que</Text> = أفضل من - Better than{'\n'}
          • <Text style={styles.benefit}>Peor que</Text> = أسوأ من - Worse than
        </Text>

        <Text style={styles.sectionSubtitle}>🏆 Superlativos</Text>
        <Text style={styles.sectionText}>
          Para expresar el grado máximo:{'\n\n'}
          • <Text style={styles.benefit}>El/la más</Text> = الأكثر - The most{'\n'}
          • <Text style={styles.benefit}>El/la menos</Text> = الأقل - The least{'\n'}
          • <Text style={styles.benefit}>El/la mejor</Text> = الأفضل - The best{'\n'}
          • <Text style={styles.benefit}>El/la peor</Text> = الأسوأ - The worst{'\n'}
          • <Text style={styles.benefit}>El/la más barato/a</Text> = الأرخص - The cheapest
        </Text>

        <Text style={styles.sectionSubtitle}>❤️ Verbos de Preferencia</Text>
        <Text style={styles.sectionText}>
          Para expresar gustos y preferencias:{'\n\n'}
          • <Text style={styles.benefit}>Gustar</Text> = يعجب - To like{'\n'}
          • <Text style={styles.benefit}>Encantar</Text> = يعشق - To love{'\n'}
          • <Text style={styles.benefit}>Preferir</Text> = يفضل - To prefer{'\n'}
          • <Text style={styles.benefit}>Interesar</Text> = يهتم - To interest{'\n'}
          • <Text style={styles.benefit}>Parecer</Text> = يبدو - To seem
        </Text>
      </View>

      <View style={styles.card}>
        <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' }}>
          <Text style={styles.sectionTitle}>🗣️ Expresiones Útiles</Text>
          <AudioButton text="Expresiones útiles" size="small" showText={false} color="#79A890" />
        </View>
        
        <Text style={styles.sectionSubtitle}>🛒 En la Tienda</Text>
        <Text style={styles.sectionText}>
          Frases para interactuar con vendedores:{'\n\n'}
          • <Text style={styles.benefit}>¿En qué puedo ayudarle?</Text> = كيف يمكنني مساعدتك؟{'\n'}
          • <Text style={styles.benefit}>Busco...</Text> = أبحث عن... - I'm looking for...{'\n'}
          • <Text style={styles.benefit}>¿Tiene esto en talla...?</Text> = هل لديك هذا بمقاس...؟{'\n'}
          • <Text style={styles.benefit}>¿Puedo probármelo?</Text> = هل يمكنني قياسه؟{'\n'}
          • <Text style={styles.benefit}>¿Dónde están los probadores?</Text> = أين غرف القياس؟
        </Text>

        <Text style={styles.sectionSubtitle}>👗 Probarse Ropa</Text>
        <Text style={styles.sectionText}>
          Expresiones para el probador:{'\n\n'}
          • <Text style={styles.benefit}>¿Me queda bien?</Text> = هل يناسبني؟{'\n'}
          • <Text style={styles.benefit}>Es muy grande/pequeño</Text> = كبير/صغير جداً{'\n'}
          • <Text style={styles.benefit}>¿Tiene una talla más grande?</Text> = هل لديك مقاس أكبر؟{'\n'}
          • <Text style={styles.benefit}>¿Me lo puedo probar?</Text> = هل يمكنني قياسه؟{'\n'}
          • <Text style={styles.benefit}>¿Qué opinas?</Text> = ما رأيك؟
        </Text>

        <Text style={styles.sectionSubtitle}>💳 Pagar</Text>
        <Text style={styles.sectionText}>
          Expresiones para el pago:{'\n\n'}
          • <Text style={styles.benefit}>¿Cuánto cuesta?</Text> = كم ثمنه؟{'\n'}
          • <Text style={styles.benefit}>¿Aceptan tarjetas?</Text> = هل تقبلون البطاقات؟{'\n'}
          • <Text style={styles.benefit}>Voy a pagar con efectivo</Text> = سأدفع نقداً{'\n'}
          • <Text style={styles.benefit}>¿Puede darme la factura?</Text> = هل يمكنك إعطائي الفاتورة؟{'\n'}
          • <Text style={styles.benefit}>¿Tiene cambio?</Text> = هل لديك فكة؟
        </Text>
      </View>

      <View style={styles.card}>
        <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' }}>
          <Text style={styles.sectionTitle}>🇪🇸 Compras en España</Text>
          <AudioButton text="Compras en España" size="small" showText={false} color="#79A890" />
        </View>
        
        <Text style={styles.sectionSubtitle}>🛍️ Tipos de Tiendas</Text>
        <Text style={styles.sectionText}>
          España tiene una gran variedad de opciones de compra:{'\n\n'}
          • <Text style={styles.benefit}>Grandes almacenes</Text>: El Corte Inglés, FNAC{'\n'}
          • <Text style={styles.benefit}>Cadenas de moda</Text>: Zara, H&M, Mango{'\n'}
          • <Text style={styles.benefit}>Mercados tradicionales</Text>: Para productos locales{'\n'}
          • <Text style={styles.benefit}>Boutiques</Text>: Tiendas pequeñas y exclusivas{'\n'}
          • <Text style={styles.benefit}>Centros comerciales</Text>: Todo en un lugar
        </Text>

        <Text style={styles.sectionSubtitle}>📅 Temporadas de Rebajas</Text>
        <Text style={styles.sectionText}>
          Las mejores épocas para comprar:{'\n\n'}
          • <Text style={styles.benefit}>Rebajas de enero</Text>: Después de Navidad{'\n'}
          • <Text style={styles.benefit}>Rebajas de julio</Text>: Antes del verano{'\n'}
          • <Text style={styles.benefit}>Black Friday</Text>: Noviembre{'\n'}
          • <Text style={styles.benefit}>Cyber Monday</Text>: Lunes después del Black Friday{'\n'}
          • <Text style={styles.benefit}>Ofertas especiales</Text>: Durante todo el año
        </Text>

        <Text style={styles.sectionSubtitle}>💳 Métodos de Pago</Text>
        <Text style={styles.sectionText}>
          Opciones de pago en España:{'\n\n'}
          • <Text style={styles.benefit}>Efectivo</Text>: Aceptado en todas partes{'\n'}
          • <Text style={styles.benefit}>Tarjetas</Text>: Visa, Mastercard, American Express{'\n'}
          • <Text style={styles.benefit}>Pago móvil</Text>: Apple Pay, Google Pay{'\n'}
          • <Text style={styles.benefit}>Transferencias</Text>: Para compras online{'\n'}
          • <Text style={styles.benefit}>Plazos</Text>: En algunas tiendas grandes
        </Text>
      </View>

      <View style={styles.card}>
        <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' }}>
          <Text style={styles.sectionTitle}>💬 Diálogo de Ejemplo: En la Tienda</Text>
          <AudioButton text="Diálogo de ejemplo: En la tienda" size="small" showText={false} color="#79A890" />
        </View>
        <View style={{ alignItems: 'flex-start', marginBottom: 6 }}>
          <AudioButton text="Hola, busco unos pantalones azules. ¿Qué talla usa? Talla 40, por favor. Aquí tiene. ¿Quiere probárselos? Sí, ¿dónde están los probadores? Al final del pasillo, a la derecha." size="small" showText={false} color="#79A890" />
        </View>
        <Text style={styles.dialogo}>
          <Text style={styles.benefit}>Cliente:</Text> "Hola, busco unos pantalones azules."{'\n\n'}
          <Text style={styles.benefit}>Vendedor:</Text> "¿Qué talla usa?"{'\n\n'}
          <Text style={styles.benefit}>Cliente:</Text> "Talla 40, por favor."{'\n\n'}
          <Text style={styles.benefit}>Vendedor:</Text> "Aquí tiene. ¿Quiere probárselos?"{'\n\n'}
          <Text style={styles.benefit}>Cliente:</Text> "Sí, ¿dónde están los probadores?"{'\n\n'}
          <Text style={styles.benefit}>Vendedor:</Text> "Al final del pasillo, a la derecha."
        </Text>
        <Text style={styles.dialogoAr}>
          <Text style={styles.benefit}>العميل:</Text> "مرحباً، أبحث عن بنطلون أزرق."{'\n\n'}
          <Text style={styles.benefit}>البائع:</Text> "ما المقاس الذي تستخدمه؟"{'\n\n'}
          <Text style={styles.benefit}>العميل:</Text> "مقاس 40 من فضلك."{'\n\n'}
          <Text style={styles.benefit}>البائع:</Text> "هنا هو. هل تريد قياسه؟"{'\n\n'}
          <Text style={styles.benefit}>العميل:</Text> "نعم، أين غرف القياس؟"{'\n\n'}
          <Text style={styles.benefit}>البائع:</Text> "في نهاية الممر، على اليمين."
        </Text>
      </View>

      <View style={styles.card}>
        <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' }}>
          <Text style={styles.sectionTitle}>🎯 Consejos Prácticos</Text>
          <AudioButton text="Consejos prácticos" size="small" showText={false} color="#79A890" />
        </View>
        <Text style={styles.sectionText}>
          • <Text style={styles.benefit}>Compara precios</Text>: Entre diferentes tiendas{'\n'}
          • <Text style={styles.benefit}>Revisa las etiquetas</Text>: Para tallas y materiales{'\n'}
          • <Text style={styles.benefit}>Prueba siempre</Text>: Antes de comprar{'\n'}
          • <Text style={styles.benefit}>Guarda los tickets</Text>: Para cambios o devoluciones{'\n'}
          • <Text style={styles.benefit}>Aprovecha las rebajas</Text>: Para ahorrar dinero
        </Text>
        <Text style={styles.sectionTextAr}>
          • <Text style={styles.benefit}>قارن الأسعار</Text>: بين المتاجر المختلفة{'\n'}
          • <Text style={styles.benefit}>راجع الملصقات</Text>: للمقاسات والخامات{'\n'}
          • <Text style={styles.benefit}>قياس دائماً</Text>: قبل الشراء{'\n'}
          • <Text style={styles.benefit}>احتفظ بالإيصالات</Text>: للتبديل أو الاسترجاع{'\n'}
          • <Text style={styles.benefit}>استفد من التخفيضات</Text>: لتوفير المال
        </Text>
      </View>

      {/* Ejemplos escritos */}
      <View style={styles.card}>
        <Text style={styles.sectionTitle}>✍️ Ejemplos escritos</Text>
        <View style={{ gap: 10 }}>
          <View>
            <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' }}>
              <Text style={styles.sectionText}>Busco una camiseta azul, talla M.</Text>
              <AudioButton text="Busco una camiseta azul, talla M." size="small" showText={false} color="#79A890" />
            </View>
            <Text style={styles.sectionTextAr}>أبحث عن قميص أزرق، مقاس M.</Text>
          </View>
          <View>
            <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' }}>
              <Text style={styles.sectionText}>¿Puedo probármelo?</Text>
              <AudioButton text="¿Puedo probármelo?" size="small" showText={false} color="#79A890" />
            </View>
            <Text style={styles.sectionTextAr}>هل يمكنني قياسه؟</Text>
          </View>
          <View>
            <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' }}>
              <Text style={styles.sectionText}>¿Tiene una talla más grande?</Text>
              <AudioButton text="¿Tiene una talla más grande?" size="small" showText={false} color="#79A890" />
            </View>
            <Text style={styles.sectionTextAr}>هل لديك مقاس أكبر؟</Text>
          </View>
          <View>
            <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' }}>
              <Text style={styles.sectionText}>¿Aceptan tarjetas?</Text>
              <AudioButton text="¿Aceptan tarjetas?" size="small" showText={false} color="#79A890" />
            </View>
            <Text style={styles.sectionTextAr}>هل تقبلون البطاقات؟</Text>
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
  },
  benefit: {
    fontWeight: 'bold',
    color: '#79A890',
  },
  finishContainer: {
    marginTop: 32,
    marginBottom: 48,
    alignItems: 'center'
  },
  finishButton: {
    borderRadius: 18,
    paddingVertical: 18,
    paddingHorizontal: 32,
    width: '100%',
    alignItems: 'center',
    overflow: 'hidden'
  },
  finishButtonText: {
    color: '#fff',
    fontSize: 20,
    fontWeight: 'bold'
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
    writingDirection: 'rtl'
  }
});

export default Unidad3;
