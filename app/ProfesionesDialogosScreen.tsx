import React, { useRef } from 'react';
import { ScrollView, Text, View, StyleSheet, TouchableOpacity } from 'react-native';
import MaterialCommunityIcons from '@expo/vector-icons/MaterialCommunityIcons';
import FontAwesome5 from '@expo/vector-icons/FontAwesome5';
import Ionicons from '@expo/vector-icons/Ionicons';

const profesiones = [
  {
    nombre: 'Repartidor/a',
    ar: 'موزع',
    icon: <MaterialCommunityIcons name="truck-delivery" size={20} color="#1976d2" style={{marginRight:6}} />,
    vocabulario: [
      { es: 'Paquete', ar: 'طرد' },
      { es: 'Entrega', ar: 'توصيل' },
      { es: 'Cliente', ar: 'زبون' },
    ],
    ejemplos: [
      { es: '¿Dónde debo dejar el paquete?', ar: 'أين يجب أن أضع الطرد؟' },
      { es: 'He llegado a la dirección.', ar: 'لقد وصلت إلى العنوان.' }
    ],
    herramientas: [
      { es: 'Mochila térmica', ar: 'حقيبة حرارية' },
      { es: 'Teléfono móvil', ar: 'هاتف محمول' },
      { es: 'Bicicleta', ar: 'دراجة' }
    ],
    dialogo: [
      { es: '¿Dónde debo entregar este paquete?', ar: 'أين يجب أن أسلم هذا الطرد؟' },
      { es: '¿Puede firmar aquí, por favor?', ar: 'هل يمكنك التوقيع هنا من فضلك؟' },
      { es: '¿Hay ascensor en el edificio?', ar: 'هل يوجد مصعد في المبنى؟' },
      { es: '¿A qué hora empiezo la ruta?', ar: 'في أي ساعة أبدأ المسار؟' }
    ],
    info: 'El trabajo de repartidor/a requiere puntualidad y conocimiento de la ciudad. Es importante tener permiso de conducir y, en algunos casos, vehículo propio. Siempre pide contrato y alta en la Seguridad Social.'
  },
  {
    nombre: 'Electricista',
    ar: 'كهربائي',
    icon: <MaterialCommunityIcons name="flash" size={20} color="#fbc02d" style={{marginRight:6}} />,
    vocabulario: [
      { es: 'Cable', ar: 'سلك' },
      { es: 'Enchufe', ar: 'مقبس' },
      { es: 'Interruptor', ar: 'مفتاح كهربائي' },
    ],
    ejemplos: [
      { es: '¿Dónde está el cuadro eléctrico?', ar: 'أين لوحة الكهرباء؟' },
      { es: 'Voy a cortar la luz para reparar.', ar: 'سأقطع الكهرباء للإصلاح.' }
    ],
    herramientas: [
      { es: 'Destornillador', ar: 'مفك' },
      { es: 'Alicates', ar: 'كماشة' },
      { es: 'Tester', ar: 'جهاز اختبار كهربائي' }
    ],
    dialogo: [
      { es: '¿Dónde está el cuadro eléctrico?', ar: 'أين لوحة الكهرباء؟' },
      { es: '¿Hay que cortar la luz?', ar: 'هل يجب قطع الكهرباء؟' },
      { es: '¿Qué tipo de avería es?', ar: 'ما نوع العطل؟' },
      { es: '¿Tiene planos de la instalación?', ar: 'هل لديك مخطط التمديدات؟' }
    ],
    info: 'Para trabajar como electricista se requiere formación técnica y, en algunos casos, carnet profesional. Es fundamental respetar las normas de seguridad y tener contrato.'
  },
  {
    nombre: 'Cocinero/a',
    ar: 'طباخ',
    icon: <MaterialCommunityIcons name="chef-hat" size={20} color="#8d6e63" style={{marginRight:6}} />,
    vocabulario: [
      { es: 'Cocina', ar: 'مطبخ' },
      { es: 'Sartén', ar: 'مقلاة' },
      { es: 'Receta', ar: 'وصفة' },
    ],
    ejemplos: [
      { es: '¿Cuánto tiempo necesita este plato?', ar: 'كم يحتاج هذا الطبق من الوقت؟' },
      { es: 'Falta sal en la sopa.', ar: 'الحساء ينقصه الملح.' }
    ],
    herramientas: [
      { es: 'Cuchillo', ar: 'سكين' },
      { es: 'Tabla de cortar', ar: 'لوح تقطيع' },
      { es: 'Cazuela', ar: 'قدر' }
    ],
    dialogo: [
      { es: '¿Qué plato preparo primero?', ar: 'ما الطبق الذي أعده أولاً؟' },
      { es: '¿Dónde están los ingredientes?', ar: 'أين المكونات؟' },
      { es: '¿Hay menú del día?', ar: 'هل هناك قائمة اليوم؟' },
      { es: '¿Quién lava los platos?', ar: 'من يغسل الصحون؟' }
    ],
    info: 'El trabajo de cocina exige rapidez, limpieza y trabajo en equipo. Es importante conocer normas de higiene y manipulación de alimentos. Pide siempre contrato.'
  },
  {
    nombre: 'Jardinero/a',
    ar: 'بستاني',
    icon: <MaterialCommunityIcons name="flower" size={20} color="#388e3c" style={{marginRight:6}} />,
    vocabulario: [
      { es: 'Jardín', ar: 'حديقة' },
      { es: 'Planta', ar: 'نبتة' },
      { es: 'Tijeras de podar', ar: 'مقص تقليم' },
      { es: 'Regadera', ar: 'سقاية' },
      { es: 'Césped', ar: 'عشب' },
      { es: 'Abono', ar: 'سماد' },
      { es: 'Manguera', ar: 'خرطوم' },
      { es: 'Maceta', ar: 'وعاء زراعة' },
      { es: 'Pala', ar: 'مجرفة' }
    ],
    dialogo: [
      { es: '¿Qué zona hay que regar?', ar: 'أي منطقة يجب سقيها؟' },
      { es: '¿Hay que podar los árboles?', ar: 'هل يجب تقليم الأشجار؟' },
      { es: '¿Dónde está el abono?', ar: 'أين السماد؟' },
      { es: '¿A qué hora termino?', ar: 'في أي ساعة أنتهي؟' }
    ],
    info: 'El trabajo de jardinero/a requiere esfuerzo físico y conocimiento de plantas y herramientas. Usa protección y pide contrato.'
  },
  {
    nombre: 'Peluquero/a',
    ar: 'حلاق',
    icon: <MaterialCommunityIcons name="scissors-cutting" size={20} color="#512da8" style={{marginRight:6}} />,
    vocabulario: [
      { es: 'Tijeras', ar: 'مقص' },
      { es: 'Peine', ar: 'مشط' },
      { es: 'Secador', ar: 'مجفف شعر' },
      { es: 'Tinte', ar: 'صبغة' },
      { es: 'Corte', ar: 'قَصّة' },
      { es: 'Cliente', ar: 'زبون' },
      { es: 'Cita', ar: 'موعد' },
      { es: 'Champú', ar: 'شامبو' },
      { es: 'Barbería', ar: 'حلاقة' }
    ],
    dialogo: [
      { es: '¿Cómo quiere el corte?', ar: 'كيف تريد قصة الشعر؟' },
      { es: '¿Le lavo el pelo?', ar: 'هل أغسل لك الشعر؟' },
      { es: '¿Tiene cita?', ar: 'هل لديك موعد؟' },
      { es: '¿Qué tinte prefiere?', ar: 'ما اللون الذي تفضله؟' }
    ],
    info: 'La peluquería requiere trato con el público y destreza manual. Es importante tener formación y pedir contrato. Si eres autónomo/a, infórmate sobre licencias.'
  },
  {
    nombre: 'Conductor/a',
    ar: 'سائق',
    icon: <MaterialCommunityIcons name="car" size={20} color="#1976d2" style={{marginRight:6}} />,
    vocabulario: [
      { es: 'Conductor', ar: 'سائق' },
      { es: 'Vehículo', ar: 'مركبة' },
      { es: 'Permiso de conducir', ar: 'رخصة قيادة' },
      { es: 'Pasajero', ar: 'راكب' },
      { es: 'Ruta', ar: 'مسار' },
      { es: 'Parada', ar: 'محطة' },
      { es: 'Carga', ar: 'حمولة' },
      { es: 'Entrega', ar: 'توصيل' },
      { es: 'Horario', ar: 'جدول' }
    ],
    dialogo: [
      { es: '¿Dónde recojo al pasajero?', ar: 'من أين أستلم الراكب؟' },
      { es: '¿Qué ruta hago hoy?', ar: 'ما المسار الذي أسلكه اليوم؟' },
      { es: '¿Hay que entregar algo?', ar: 'هل يجب توصيل شيء؟' },
      { es: '¿A qué hora termino?', ar: 'في أي ساعة أنتهي؟' }
    ],
    info: 'Para ser conductor/a profesional necesitas permiso de conducir adecuado y, a veces, tarjeta de transporte. Pide contrato y asegúrate de estar dado de alta.'
  },
  {
    nombre: 'Cajero/a',
    ar: 'أمين الصندوق',
    icon: <FontAwesome5 name="cash-register" size={18} color="#ff9800" style={{marginRight:6}} />,
    vocabulario: [
      { es: 'Caja', ar: 'صندوق' },
      { es: 'Dinero', ar: 'مال' },
      { es: 'Cambio', ar: 'صرف' },
      { es: 'Ticket', ar: 'إيصال' },
      { es: 'Cliente', ar: 'زبون' },
      { es: 'Cobrar', ar: 'يقبض' },
      { es: 'Tarjeta', ar: 'بطاقة' },
      { es: 'Precio', ar: 'سعر' },
      { es: 'Descuento', ar: 'خصم' }
    ],
    dialogo: [
      { es: '¿Cómo desea pagar?', ar: 'كيف تريد الدفع؟' },
      { es: '¿Quiere bolsa?', ar: 'هل تريد كيساً؟' },
      { es: '¿Tiene tarjeta de puntos?', ar: 'هل لديك بطاقة نقاط؟' },
      { es: '¿Necesita ticket?', ar: 'هل تحتاج إيصال؟' }
    ],
    info: 'El trabajo de cajero/a requiere atención y honestidad. Es importante conocer el sistema de caja y tratar bien al cliente. Pide contrato y formación básica.'
  },
  {
    nombre: 'Recepcionista',
    ar: 'موظف استقبال',
    icon: <Ionicons name="person-outline" size={20} color="#0097a7" style={{marginRight:6}} />,
    vocabulario: [
      { es: 'Recepción', ar: 'استقبال' },
      { es: 'Reserva', ar: 'حجز' },
      { es: 'Cliente', ar: 'زبون' },
      { es: 'Habitación', ar: 'غرفة' },
      { es: 'Check-in', ar: 'تسجيل الدخول' },
      { es: 'Check-out', ar: 'تسجيل الخروج' },
      { es: 'Documento', ar: 'وثيقة' },
      { es: 'Teléfono', ar: 'هاتف' },
      { es: 'Turno', ar: 'وردية' }
    ],
    dialogo: [
      { es: '¿Tiene reserva?', ar: 'هل لديك حجز؟' },
      { es: '¿Puede mostrar su documento?', ar: 'هل يمكنك إظهار وثيقتك؟' },
      { es: '¿A qué hora es el check-out?', ar: 'في أي ساعة تسجيل الخروج؟' },
      { es: '¿Necesita ayuda con el equipaje?', ar: 'هل تحتاج مساعدة مع الأمتعة؟' }
    ],
    info: 'El trabajo de recepcionista requiere buena presencia, idiomas y trato con el público. Es importante conocer los programas de reservas y tener contrato.'
  },
  {
    nombre: 'Trabajador/a del campo',
    ar: 'عامل زراعي',
    icon: <MaterialCommunityIcons name="food-apple-outline" size={20} color="#8bc34a" style={{marginRight:6}} />,
    vocabulario: [
      { es: 'Campo', ar: 'حقل' },
      { es: 'Cosecha', ar: 'حصاد' },
      { es: 'Semilla', ar: 'بذرة' },
      { es: 'Azada', ar: 'معول' },
      { es: 'Rastrillo', ar: 'مشط' },
      { es: 'Pala', ar: 'مجرفة' },
      { es: 'Guantes', ar: 'قفازات' },
      { es: 'Tractor', ar: 'جرار' },
      { es: 'Fertilizante', ar: 'سماد' },
      { es: 'Invernadero', ar: 'بيت زجاجي' },
      { es: 'Fruta', ar: 'فاكهة' },
      { es: 'Verdura', ar: 'خضار' },
      { es: 'Contrato', ar: 'عقد' },
      { es: 'Temporero', ar: 'عامل موسمي' },
      { es: 'Jornal', ar: 'أجرة يومية' }
    ],
    dialogo: [
      { es: '¿Dónde empiezo hoy?', ar: 'من أين أبدأ اليوم؟' },
      { es: '¿Hay que regar las plantas?', ar: 'هل يجب سقي النباتات؟' },
      { es: '¿Dónde están las herramientas?', ar: 'أين الأدوات؟' },
      { es: '¿Cuándo termina la jornada?', ar: 'متى ينتهي يوم العمل؟' },
      { es: '¿Puedo descansar un momento?', ar: 'هل يمكنني أن أستريح قليلاً؟' },
      { es: '¿Dónde dejo la cosecha?', ar: 'أين أضع المحصول؟' },
      { es: '¿Hay trabajo para la próxima semana?', ar: 'هل يوجد عمل للأسبوع القادم؟' },
      { es: '¿Necesito botas de seguridad?', ar: 'هل أحتاج إلى أحذية أمان؟' }
    ],
    info: 'El trabajo en el campo es muy común entre inmigrantes, sobre todo en campañas de recogida de fruta y verdura. Es fundamental tener un contrato de trabajo, estar dado de alta en la Seguridad Social y, si eres extracomunitario, tener NIE o permiso de residencia/trabajo. Lleva siempre protección (guantes, botas, gorra) y mantente hidratado. Pregunta por tus derechos laborales y no aceptes trabajar sin contrato. El salario suele ser por jornal (día trabajado) y es importante pedir recibo de pago.'
  },
  {
    nombre: 'Trabajador/a de almacén',
    ar: 'عامل مستودع',
    icon: <MaterialCommunityIcons name="warehouse" size={20} color="#616161" style={{marginRight:6}} />,
    vocabulario: [
      { es: 'Almacén', ar: 'مخزن' },
      { es: 'Carretilla', ar: 'عربة' },
      { es: 'Palé', ar: 'منصة نقالة' },
      { es: 'Caja', ar: 'صندوق' },
      { es: 'Inventario', ar: 'جرد' },
      { es: 'Pedido', ar: 'طلبية' },
      { es: 'Montacargas', ar: 'رافعة شوكية' },
      { es: 'Estantería', ar: 'رف' },
      { es: 'Código de barras', ar: 'رمز شريطي' },
      { es: 'Guantes', ar: 'قفازات' },
      { es: 'Turno', ar: 'وردية' },
      { es: 'Supervisor', ar: 'مشرف' }
    ],
    dialogo: [
      { es: '¿Dónde dejo esta caja?', ar: 'أين أضع هذا الصندوق؟' },
      { es: '¿Hay que organizar los palés?', ar: 'هل يجب ترتيب المنصات؟' },
      { es: '¿Puedo usar la carretilla?', ar: 'هل يمكنني استخدام العربة؟' },
      { es: '¿Cuándo llega el siguiente pedido?', ar: 'متى تصل الطلبية التالية؟' },
      { es: '¿Dónde está el supervisor?', ar: 'أين المشرف؟' },
      { es: '¿Hay que hacer inventario hoy?', ar: 'هل يجب عمل الجرد اليوم؟' },
      { es: '¿Cuándo termina mi turno?', ar: 'متى تنتهي ورديتي؟' },
      { es: '¿Dónde están los guantes de seguridad?', ar: 'أين قفازات الأمان؟' }
    ],
    info: 'El trabajo en almacenes suele implicar cargar, descargar, organizar mercancía y preparar pedidos. Es importante usar protección (guantes, botas, chaleco reflectante) y seguir normas de seguridad. Para manejar montacargas se suele requerir carnet específico. Normalmente se trabaja por turnos. Es fundamental tener contrato y estar dado de alta en la Seguridad Social. Pregunta siempre por tus derechos y no aceptes trabajar sin papeles.'
  },
  {
    nombre: 'Trabajador/a de construcción',
    ar: 'عامل بناء',
    icon: <MaterialCommunityIcons name="account-hard-hat" size={20} color="#ffb300" style={{marginRight:6}} />,
    vocabulario: [
      { es: 'Obra', ar: 'ورشة' },
      { es: 'Ladrillo', ar: 'طوب' },
      { es: 'Cemento', ar: 'أسمنت' },
      { es: 'Hormigón', ar: 'خرسانة' },
      { es: 'Andamio', ar: 'سقالة' },
      { es: 'Casco', ar: 'خوذة' },
      { es: 'Chaleco', ar: 'سترة' },
      { es: 'Martillo', ar: 'مطرقة' },
      { es: 'Taladro', ar: 'مثقاب' },
      { es: 'Pala', ar: 'مجرفة' },
      { es: 'Cinta métrica', ar: 'شريط قياس' },
      { es: 'Plano', ar: 'مخطط' },
      { es: 'Jefe de obra', ar: 'رئيس الورشة' },
      { es: 'Albañil', ar: 'بناء' },
      { es: 'Peón', ar: 'عامل' }
    ],
    dialogo: [
      { es: '¿Dónde dejo los materiales?', ar: 'أين أضع المواد؟' },
      { es: '¿Hay que usar casco?', ar: 'هل يجب ارتداء الخوذة؟' },
      { es: '¿Cuándo empieza la obra?', ar: 'متى تبدأ الورشة؟' },
      { es: '¿Dónde está el plano?', ar: 'أين المخطط؟' },
      { es: '¿Quién es el jefe de obra?', ar: 'من هو رئيس الورشة؟' },
      { es: '¿Qué tarea hago hoy?', ar: 'ما هي مهمتي اليوم؟' },
      { es: '¿Dónde están las herramientas?', ar: 'أين الأدوات؟' },
      { es: '¿Puedo tomar un descanso?', ar: 'هل يمكنني أخذ استراحة؟' }
    ],
    info: 'En la construcción es obligatorio usar equipo de protección (casco, chaleco, botas). Para trabajar legalmente necesitas contrato y alta en la Seguridad Social. Muchos puestos requieren formación en prevención de riesgos laborales (PRL). No aceptes trabajar sin papeles ni sin seguro. Si tienes dudas, consulta a tu delegado sindical o a la inspección de trabajo. El salario depende del puesto (albañil, peón, oficial, etc.) y la experiencia.'
  },
  {
    nombre: 'Trabajador/a de limpieza',
    ar: 'عامل نظافة',
    icon: <MaterialCommunityIcons name="broom" size={20} color="#43a047" style={{marginRight:6}} />,
    vocabulario: [
      { es: 'Escoba', ar: 'مكنسة' },
      { es: 'Fregona', ar: 'ممسحة' },
      { es: 'Detergente', ar: 'منظف' },
      { es: 'Cubeta', ar: 'دلو' },
      { es: 'Basura', ar: 'قمامة' },
      { es: 'Guantes', ar: 'قفازات' },
      { es: 'Cristal', ar: 'زجاج' },
      { es: 'Trapo', ar: 'قطعة قماش' },
      { es: 'Desinfectante', ar: 'مطهر' },
      { es: 'Aspiradora', ar: 'مكنسة كهربائية' }
    ],
    dialogo: [
      { es: '¿Qué zona debo limpiar?', ar: 'أي منطقة يجب أن أنظف؟' },
      { es: '¿Dónde tiro la basura?', ar: 'أين أرمي القمامة؟' },
      { es: '¿Hay productos especiales para el suelo?', ar: 'هل هناك منتجات خاصة للأرضية؟' },
      { es: '¿Cuándo termino mi turno?', ar: 'متى أنتهي من ورديتي؟' },
      { es: '¿Dónde están los guantes?', ar: 'أين القفازات؟' },
      { es: '¿Puedo usar la aspiradora?', ar: 'هل يمكنني استخدام المكنسة الكهربائية؟' }
    ],
    info: 'El trabajo de limpieza es accesible para inmigrantes y suele estar regulado por contrato. Es importante usar productos adecuados y protección (guantes, mascarilla). Pregunta por los protocolos de limpieza y los productos autorizados. No aceptes trabajar sin contrato ni alta en la Seguridad Social.'
  },
  {
    nombre: 'Fontanero/a',
    ar: 'سباك',
    icon: <MaterialCommunityIcons name="pipe" size={20} color="#1976d2" style={{marginRight:6}} />,
    vocabulario: [
      { es: 'Tubería', ar: 'أنبوب' },
      { es: 'Llave inglesa', ar: 'مفتاح إنجليزي' },
      { es: 'Fuga', ar: 'تسرب' },
      { es: 'Desagüe', ar: 'مصرف' },
      { es: 'Grifo', ar: 'حنفية' },
      { es: 'Sifón', ar: 'سيفون' },
      { es: 'Obstrucción', ar: 'انسداد' },
      { es: 'Codo', ar: 'كوع' },
      { es: 'Junta', ar: 'وصلة' },
      { es: 'Albañal', ar: 'بالوعة' }
    ],
    dialogo: [
      { es: '¿Dónde está la fuga?', ar: 'أين التسرب؟' },
      { es: '¿Hay que cambiar el grifo?', ar: 'هل يجب تغيير الحنفية؟' },
      { es: '¿Puedo cerrar el agua?', ar: 'هل يمكنني إغلاق الماء؟' },
      { es: '¿Tiene planos de la instalación?', ar: 'هل لديك مخطط التمديدات؟' },
      { es: '¿Dónde está el desagüe?', ar: 'أين المصرف؟' },
      { es: '¿Hay que desatascar?', ar: 'هل يجب فتح الانسداد؟' }
    ],
    info: 'La fontanería requiere conocimientos técnicos. Es importante tener herramientas adecuadas y conocer la normativa local. Para trabajar en empresas, es necesario contrato y alta en la Seguridad Social. Si eres autónomo, infórmate sobre licencias y seguros.'
  },
  {
    nombre: 'Enfermero/a',
    ar: 'ممرض',
    icon: <MaterialCommunityIcons name="medical-bag" size={20} color="#d32f2f" style={{marginRight:6}} />,
    vocabulario: [
      { es: 'Paciente', ar: 'مريض' },
      { es: 'Curar', ar: 'يعالج' },
      { es: 'Inyección', ar: 'حقنة' },
      { es: 'Receta', ar: 'وصفة طبية' },
      { es: 'Urgencias', ar: 'طوارئ' },
    ],
    dialogo: [
      { es: '¿Dónde le duele?', ar: 'أين يؤلمك؟' },
      { es: 'Debe tomar este medicamento.', ar: 'يجب أن تأخذ هذا الدواء.' },
      { es: '¿Tiene alergias?', ar: 'هل لديك حساسية؟' },
    ],
    info: 'En España, los enfermeros/as pueden trabajar en hospitales, centros de salud y residencias. Es importante homologar el título si se obtuvo en el extranjero.'
  },
  {
    nombre: 'Camarero/a',
    ar: 'نادل',
    icon: <MaterialCommunityIcons name="silverware-fork-knife" size={20} color="#795548" style={{marginRight:6}} />,
    vocabulario: [
      { es: 'Mesa', ar: 'طاولة' },
      { es: 'Cuenta', ar: 'الحساب' },
      { es: 'Menú', ar: 'قائمة الطعام' },
      { es: 'Propina', ar: 'بقشيش' },
      { es: 'Reservar', ar: 'يحجز' },
    ],
    dialogo: [
      { es: '¿Qué desea tomar?', ar: 'ماذا ترغب أن تشرب؟' },
      { es: '¿Está todo bien?', ar: 'هل كل شيء جيد؟' },
      { es: 'Aquí tiene la cuenta.', ar: 'تفضل الحساب.' },
    ],
    info: 'El sector de la hostelería ofrece muchas oportunidades. Se recomienda aprender frases básicas y tener buena presencia.'
  },
  {
    nombre: 'Albañil',
    ar: 'بناء',
    icon: <MaterialCommunityIcons name="wall" size={20} color="#a1887f" style={{marginRight:6}} />,
    vocabulario: [
      { es: 'Ladrillo', ar: 'طوب' },
      { es: 'Cemento', ar: 'أسمنت' },
      { es: 'Obra', ar: 'ورشة' },
      { es: 'Andamio', ar: 'سقالة' },
      { es: 'Casco', ar: 'خوذة' },
    ],
    dialogo: [
      { es: '¿Dónde coloco los materiales?', ar: 'أين أضع المواد؟' },
      { es: 'Hay que usar casco.', ar: 'يجب ارتداء الخوذة.' },
      { es: '¿Cuándo empieza la obra?', ar: 'متى تبدأ الورشة؟' },
    ],
    info: 'La construcción es un sector con alta demanda. Es obligatorio usar equipo de protección y, en muchos casos, tener formación en riesgos laborales.'
  },
  {
    nombre: 'Limpiador/a',
    ar: 'عامل نظافة',
    icon: <MaterialCommunityIcons name="broom" size={20} color="#43a047" style={{marginRight:6}} />,
    vocabulario: [
      { es: 'Escoba', ar: 'مكنسة' },
      { es: 'Fregona', ar: 'ممسحة' },
      { es: 'Detergente', ar: 'منظف' },
      { es: 'Cubeta', ar: 'دلو' },
      { es: 'Basura', ar: 'قمامة' },
    ],
    dialogo: [
      { es: '¿Qué zona debo limpiar?', ar: 'أي منطقة يجب أن أنظف؟' },
      { es: '¿Dónde tiro la basura?', ar: 'أين أرمي القمامة؟' },
      { es: '¿Hay productos especiales para el suelo?', ar: 'هل هناك منتجات خاصة للأرضية؟' },
    ],
    info: 'La limpieza es un trabajo accesible para inmigrantes. Es importante conocer los productos y normas de seguridad.'
  },
  {
    nombre: 'Cuidador/a de mayores',
    ar: 'مُعتني بالمسنين',
    icon: <MaterialCommunityIcons name="hand-heart" size={20} color="#ff7043" style={{marginRight:6}} />,
    vocabulario: [
      { es: 'Anciano', ar: 'مسن' },
      { es: 'Medicamento', ar: 'دواء' },
      { es: 'Andador', ar: 'مشاية' },
      { es: 'Silla de ruedas', ar: 'كرسي متحرك' },
      { es: 'Ducha', ar: 'دش' },
    ],
    dialogo: [
      { es: '¿A qué hora toma la medicina?', ar: 'في أي ساعة يتناول الدواء؟' },
      { es: '¿Necesita ayuda para levantarse?', ar: 'هل تحتاج مساعدة للنهوض؟' },
      { es: 'Vamos a dar un paseo.', ar: 'سنذهب في نزهة.' },
    ],
    info: 'Cuidar personas mayores requiere paciencia y empatía. En muchos casos se pide experiencia o referencias.'
  }
];

export default function ProfesionesDialogosScreen() {
  // refs para cada profesión
  const refs = React.useMemo<Record<string, React.RefObject<View | null>>>(() => {
    const obj: Record<string, React.RefObject<View | null>> = {};
    profesiones.forEach((prof) => {
      obj[prof.nombre] = React.createRef<View>() as React.RefObject<View | null>;
    });
    return obj;
  }, []);
  // ref para el ScrollView
  const scrollRef = useRef<ScrollView | null>(null);

  return (
    <ScrollView style={styles.container} ref={scrollRef}>
      <Text style={styles.titulo}>Profesiones para Inmigrantes</Text>
      <Text style={styles.intro}>
        Aquí encontrarás vocabulario, diálogos útiles e información práctica para distintas profesiones habituales entre inmigrantes en España.
      </Text>

      {/* Indice de profesiones */}
      <View style={styles.indiceBox}>
        <Text style={styles.seccion}>Índice:</Text>
        {profesiones.map((prof, idx) => (
          <Text key={"indice-"+idx} style={styles.indiceLink}>
            {prof.icon} {idx+1}. {prof.nombre}  <Text style={{color:'#388e3c', fontSize:16, fontWeight:'bold', writingDirection:'rtl'}}> {prof.ar} </Text>
          </Text>
        ))}
      </View>

      {/* Lista de profesiones */}
      {profesiones.map((prof, idx) => (
        <View key={idx} style={styles.profBox} ref={refs[prof.nombre]}>
          <View style={{flexDirection:'row', alignItems:'center', marginBottom:2}}>
            {prof.icon}
            <Text style={styles.profTitulo}>{prof.nombre}</Text>
            <Text style={{color:'#388e3c', fontSize:18, fontWeight:'bold', marginLeft:8, writingDirection:'rtl'}}>{prof.ar}</Text>
          </View>
          <Text style={styles.seccion}>Vocabulario:</Text>
          {prof.vocabulario.map((v: {es: string, ar: string}, i: number) => (
            <Text key={i} style={styles.vocabulario}>{v.es} — {v.ar}</Text>
          ))}
          {prof.ejemplos && prof.ejemplos.length > 0 && (
            <>
              <Text style={styles.seccion}>Ejemplos:</Text>
              {prof.ejemplos.map((ej: {es: string, ar: string}, i: number) => (
                <Text key={i} style={styles.vocabulario}>{ej.es} — <Text style={{writingDirection:'rtl'}}>{ej.ar}</Text></Text>
              ))}
            </>
          )}
          {prof.herramientas && prof.herramientas.length > 0 && (
            <>
              <Text style={styles.seccion}>Herramientas u objetos:</Text>
              {prof.herramientas.map((h: {es: string, ar: string}, i: number) => (
                <Text key={i} style={styles.vocabulario}>{h.es} — {h.ar}</Text>
              ))}
            </>
          )}
          <Text style={styles.seccion}>Diálogos útiles:</Text>
          {prof.dialogo.map((d: {es: string, ar: string}, i: number) => (
            <Text key={i} style={styles.dialogo}>{d.es} — {d.ar}</Text>
          ))}
          <Text style={styles.seccion}>Información útil:</Text>
          <Text style={styles.info}>{prof.info}</Text>
        </View>
      ))}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#fff', padding: 18 },
  titulo: { fontSize: 24, fontWeight: 'bold', marginBottom: 8, color: '#1976d2' },
  intro: { fontSize: 16, marginBottom: 16, color: '#333' },
  indiceBox: { backgroundColor: '#e3f2fd', borderRadius: 10, padding: 12, marginBottom: 16 },
  indiceLink: { color: '#1565c0', fontSize: 16, marginVertical: 2, textDecorationLine: 'underline' },
  profBox: { backgroundColor: '#f5f5f5', borderRadius: 12, padding: 14, marginBottom: 18, elevation: 2 },
  profTitulo: { fontSize: 20, fontWeight: 'bold', color: '#512da8', marginBottom: 6 },
  seccion: { fontSize: 15, fontWeight: '600', marginTop: 8, color: '#ff9800' },
  vocabulario: { fontSize: 15, color: '#222', marginLeft: 8 },
  dialogo: { fontSize: 15, color: '#1565c0', marginLeft: 8 },
  info: { fontSize: 14, color: '#444', marginTop: 4, fontStyle: 'italic' },
});
