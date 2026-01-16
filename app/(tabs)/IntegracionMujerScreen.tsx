import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  Linking,
  TouchableOpacity,
  LayoutAnimation,
  Platform,
  UIManager,
  ActivityIndicator,
  RefreshControl,
  Image,
} from "react-native";
import { Ionicons, MaterialCommunityIcons, FontAwesome5 } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import { LinearGradient } from "expo-linear-gradient";
import { useFocusEffect } from '@react-navigation/native';
import { fetchRevistaArticles, groupArticlesByCategory, RevistaArticle } from "../../services/mujeresRevistaService";

// Habilitar animaciones en Android
if (Platform.OS === "android" && UIManager.setLayoutAnimationEnabledExperimental) {
  UIManager.setLayoutAnimationEnabledExperimental(true);
}

// Datos de recursos y organizaciones
const EMERGENCY_CONTACTS = [
  {
    name: "016 - Violencia de Género",
    nameAr: "016 - العنف ضد المرأة",
    phone: "016",
    desc: "Línea de atención gratuita y confidencial 24h. No deja rastro en la factura.",
    descAr: "خط مساعدة مجاني وسري على مدار 24 ساعة. لا يترك أثراً في الفاتورة.",
    icon: "call",
    color: "#d32f2f",
  },
  {
    name: "112 - Emergencias",
    nameAr: "112 - الطوارئ",
    phone: "112",
    desc: "Número de emergencias general para cualquier situación de peligro.",
    descAr: "رقم الطوارئ العام لأي حالة خطر.",
    icon: "warning",
    color: "#f57c00",
  },
  {
    name: "900 116 016 - WhatsApp",
    nameAr: "900 116 016 - واتساب",
    phone: "900116016",
    desc: "Atención por WhatsApp para víctimas de violencia de género.",
    descAr: "خدمة واتساب لضحايا العنف ضد المرأة.",
    icon: "logo-whatsapp",
    color: "#25D366",
  },
];

const WOMEN_RIGHTS = [
  {
    title: "Igualdad de Género",
    titleAr: "المساواة بين الجنسين",
    content: "En España, mujeres y hombres tienen los mismos derechos. La Constitución garantiza la igualdad ante la ley sin discriminación por sexo.",
    contentAr: "في إسبانيا، للنساء والرجال نفس الحقوق. يضمن الدستور المساواة أمام القانون دون تمييز بسبب الجنس.",
    icon: "people",
  },
  {
    title: "Derecho al Trabajo",
    titleAr: "الحق في العمل",
    content: "Las mujeres tienen derecho a trabajar en cualquier profesión, recibir el mismo salario que los hombres y no ser discriminadas en el empleo.",
    contentAr: "للنساء الحق في العمل في أي مهنة، والحصول على نفس الراتب الذي يحصل عليه الرجال، وعدم التعرض للتمييز في العمل.",
    icon: "briefcase",
  },
  {
    title: "Protección contra la Violencia",
    titleAr: "الحماية من العنف",
    content: "La violencia de género es un delito grave. Las víctimas tienen derecho a protección, asistencia jurídica gratuita y ayudas económicas.",
    contentAr: "العنف ضد المرأة جريمة خطيرة. للضحايا الحق في الحماية والمساعدة القانونية المجانية والمساعدات المالية.",
    icon: "shield-checkmark",
  },
  {
    title: "Libertad Personal",
    titleAr: "الحرية الشخصية",
    content: "Tienes derecho a decidir sobre tu vida: estudiar, trabajar, elegir pareja, divorciarte, y tomar tus propias decisiones.",
    contentAr: "لديك الحق في اتخاذ قرارات حياتك: الدراسة، العمل، اختيار الشريك، الطلاق، واتخاذ قراراتك الخاصة.",
    icon: "heart",
  },
  {
    title: "Derecho a la Educación",
    titleAr: "الحق في التعليم",
    content: "Todas las mujeres tienen derecho a estudiar y formarse. Existen programas gratuitos de alfabetización y formación profesional.",
    contentAr: "لجميع النساء الحق في الدراسة والتدريب. توجد برامج مجانية لمحو الأمية والتدريب المهني.",
    icon: "school",
  },
  {
    title: "Derecho a la Salud",
    titleAr: "الحق في الصحة",
    content: "Acceso gratuito a atención sanitaria, incluyendo ginecología, embarazo y salud mental. No necesitas permiso de nadie.",
    contentAr: "الوصول المجاني للرعاية الصحية، بما في ذلك أمراض النساء والحمل والصحة النفسية. لا تحتاجين إذن أحد.",
    icon: "medical",
  },
  {
    title: "Derecho a la Vivienda",
    titleAr: "الحق في السكن",
    content: "Puedes alquilar o comprar vivienda a tu nombre. Existen ayudas especiales para mujeres víctimas de violencia.",
    contentAr: "يمكنك استئجار أو شراء منزل باسمك. توجد مساعدات خاصة للنساء ضحايا العنف.",
    icon: "home",
  },
  {
    title: "Custodia de los Hijos",
    titleAr: "حضانة الأطفال",
    content: "En caso de separación, tienes derecho a la custodia de tus hijos. Los tribunales priorizan el bienestar de los menores.",
    contentAr: "في حالة الانفصال، لديك الحق في حضانة أطفالك. تعطي المحاكم الأولوية لرفاهية القاصرين.",
    icon: "people-circle",
  },
  {
    title: "Autonomía Económica",
    titleAr: "الاستقلال الاقتصادي",
    content: "Tienes derecho a tener tu propia cuenta bancaria, administrar tu dinero y tomar decisiones financieras sin permiso de nadie.",
    contentAr: "لديك الحق في امتلاك حسابك البنكي الخاص، وإدارة أموالك، واتخاذ قرارات مالية دون إذن أحد.",
    icon: "card",
  },
  {
    title: "Derecho al Divorcio",
    titleAr: "الحق في الطلاق",
    content: "Puedes solicitar el divorcio sin necesidad del consentimiento de tu pareja. El proceso es accesible y existen ayudas legales gratuitas.",
    contentAr: "يمكنك طلب الطلاق دون الحاجة إلى موافقة شريكك. العملية متاحة وتوجد مساعدات قانونية مجانية.",
    icon: "document",
  },
  {
    title: "Libertad de Movimiento",
    titleAr: "حرية التنقل",
    content: "Tienes derecho a moverte libremente, viajar y salir de casa sin pedir permiso. Nadie puede retenerte contra tu voluntad.",
    contentAr: "لديك الحق في التنقل بحرية، والسفر، والخروج من المنزل دون طلب إذن. لا يمكن لأحد احتجازك ضد إرادتك.",
    icon: "airplane",
  },
  {
    title: "Derecho a la Herencia",
    titleAr: "الحق في الميراث",
    content: "Las mujeres tienen los mismos derechos de herencia que los hombres. Puedes heredar y dejar herencia según la ley española.",
    contentAr: "للنساء نفس حقوق الميراث التي للرجال. يمكنك أن ترثي وتتركي ميراثاً وفقاً للقانون الإسباني.",
    icon: "gift",
  },
  {
    title: "Participación Política",
    titleAr: "المشاركة السياسية",
    content: "Tienes derecho a votar, ser candidata y participar en la vida política de tu comunidad y del país.",
    contentAr: "لديك الحق في التصويت، والترشح، والمشاركة في الحياة السياسية لمجتمعك وبلدك.",
    icon: "hand-left",
  },
];

const PRACTICAL_GUIDES = [
  {
    title: "Cómo denunciar violencia de género",
    titleAr: "كيفية الإبلاغ عن العنف ضد المرأة",
    steps: [
      { es: "Llama al 016 (gratuito y confidencial)", ar: "اتصلي بـ 016 (مجاني وسري)" },
      { es: "Acude a la policía o Guardia Civil", ar: "اذهبي إلى الشرطة أو الحرس المدني" },
      { es: "Ve al hospital si tienes lesiones", ar: "اذهبي إلى المستشفى إذا كانت لديك إصابات" },
      { es: "Solicita orden de protección", ar: "اطلبي أمر حماية" },
      { es: "Pide abogado de oficio gratuito", ar: "اطلبي محامياً مجانياً" },
    ],
    icon: "shield",
  },
  {
    title: "Cómo obtener la tarjeta sanitaria",
    titleAr: "كيفية الحصول على البطاقة الصحية",
    steps: [
      { es: "Acude al centro de salud más cercano", ar: "اذهبي إلى أقرب مركز صحي" },
      { es: "Lleva tu NIE o pasaporte", ar: "أحضري NIE أو جواز السفر" },
      { es: "Lleva certificado de empadronamiento", ar: "أحضري شهادة التسجيل في البلدية" },
      { es: "Rellena el formulario de solicitud", ar: "املئي نموذج الطلب" },
      { es: "Recibirás la tarjeta en 2-3 semanas", ar: "ستستلمين البطاقة خلال 2-3 أسابيع" },
    ],
    icon: "medical",
  },
  {
    title: "Cómo empadronarse",
    titleAr: "كيفية التسجيل في البلدية",
    steps: [
      { es: "Acude al Ayuntamiento de tu ciudad", ar: "اذهبي إلى بلدية مدينتك" },
      { es: "Lleva pasaporte o NIE", ar: "أحضري جواز السفر أو NIE" },
      { es: "Lleva contrato de alquiler o autorización del propietario", ar: "أحضري عقد الإيجار أو إذن المالك" },
      { es: "Rellena el formulario de empadronamiento", ar: "املئي نموذج التسجيل" },
      { es: "El certificado es inmediato y gratuito", ar: "الشهادة فورية ومجانية" },
    ],
    icon: "document-text",
  },
  {
    title: "Cómo buscar trabajo",
    titleAr: "كيفية البحث عن عمل",
    steps: [
      { es: "Inscríbete en el SEPE (oficina de empleo)", ar: "سجلي في SEPE (مكتب التوظيف)" },
      { es: "Prepara tu currículum en español", ar: "جهزي سيرتك الذاتية بالإسبانية" },
      { es: "Busca ofertas en InfoJobs, Indeed, LinkedIn", ar: "ابحثي عن عروض في InfoJobs, Indeed, LinkedIn" },
      { es: "Acude a ONGs que ayudan con empleo", ar: "اذهبي إلى منظمات تساعد في التوظيف" },
      { es: "Haz cursos de formación gratuitos", ar: "احضري دورات تدريبية مجانية" },
    ],
    icon: "briefcase",
  },
  {
    title: "Cómo abrir una cuenta bancaria",
    titleAr: "كيفية فتح حساب بنكي",
    steps: [
      { es: "Elige un banco (Santander, BBVA, CaixaBank, etc.)", ar: "اختاري بنكاً (Santander, BBVA, CaixaBank, إلخ)" },
      { es: "Lleva tu NIE o pasaporte", ar: "أحضري NIE أو جواز السفر" },
      { es: "Lleva certificado de empadronamiento", ar: "أحضري شهادة التسجيل في البلدية" },
      { es: "Rellena el formulario de apertura", ar: "املئي نموذج فتح الحساب" },
      { es: "Recibirás la tarjeta en 7-10 días", ar: "ستستلمين البطاقة خلال 7-10 أيام" },
    ],
    icon: "card",
  },
  {
    title: "Cómo solicitar el divorcio",
    titleAr: "كيفية طلب الطلاق",
    steps: [
      { es: "Consulta con un abogado (gratuito en Colegio de Abogados)", ar: "استشيري محامياً (مجاني في نقابة المحامين)" },
      { es: "Reúne documentación: libro de familia, DNI/NIE", ar: "اجمعي الوثائق: دفتر العائلة، DNI/NIE" },
      { es: "Presenta demanda en el juzgado de familia", ar: "قدمي الطلب في محكمة الأسرة" },
      { es: "Espera la citación judicial", ar: "انتظري الاستدعاء القضائي" },
      { es: "El proceso dura entre 3-6 meses", ar: "تستغرق العملية من 3-6 أشهر" },
    ],
    icon: "document",
  },
  {
    title: "Cómo matricular a tus hijos en el colegio",
    titleAr: "كيفية تسجيل أطفالك في المدرسة",
    steps: [
      { es: "Acude al colegio público más cercano", ar: "اذهبي إلى أقرب مدرسة عامة" },
      { es: "Lleva NIE/pasaporte de los niños y tuyo", ar: "أحضري NIE/جواز سفر الأطفال وجوازك" },
      { es: "Lleva certificado de empadronamiento", ar: "أحضري شهادة التسجيل في البلدية" },
      { es: "Rellena el formulario de matrícula", ar: "املئي نموذج التسجيل" },
      { es: "La educación es gratuita y obligatoria hasta los 16 años", ar: "التعليم مجاني وإلزامي حتى سن 16" },
    ],
    icon: "school",
  },
  {
    title: "Cómo solicitar ayudas sociales",
    titleAr: "كيفية طلب المساعدات الاجتماعية",
    steps: [
      { es: "Acude a Servicios Sociales de tu ayuntamiento", ar: "اذهبي إلى الخدمات الاجتماعية في بلديتك" },
      { es: "Pide cita previa (presencial o telefónica)", ar: "اطلبي موعداً مسبقاً (حضورياً أو هاتفياً)" },
      { es: "Lleva toda tu documentación", ar: "أحضري جميع وثائقك" },
      { es: "Explica tu situación al trabajador social", ar: "اشرحي وضعك للأخصائي الاجتماعي" },
      { es: "Te informarán de las ayudas disponibles", ar: "سيخبرونك بالمساعدات المتاحة" },
    ],
    icon: "hand-left",
  },
  {
    title: "Cómo aprender español gratis",
    titleAr: "كيفية تعلم الإسبانية مجاناً",
    steps: [
      { es: "Inscríbete en cursos del ayuntamiento", ar: "سجلي في دورات البلدية" },
      { es: "Busca clases en ONGs (Cruz Roja, Cáritas)", ar: "ابحثي عن دروس في المنظمات (الصليب الأحمر، كاريتاس)" },
      { es: "Usa apps gratuitas: Duolingo, Babbel", ar: "استخدمي تطبيقات مجانية: Duolingo, Babbel" },
      { es: "Practica con vecinos y en tiendas", ar: "تدربي مع الجيران وفي المتاجر" },
      { es: "Ve televisión española con subtítulos", ar: "شاهدي التلفزيون الإسباني مع ترجمة" },
    ],
    icon: "language",
  },
  {
    title: "Cómo obtener el permiso de conducir",
    titleAr: "كيفية الحصول على رخصة القيادة",
    steps: [
      { es: "Inscríbete en una autoescuela", ar: "سجلي في مدرسة لتعليم القيادة" },
      { es: "Obtén el certificado médico", ar: "احصلي على الشهادة الطبية" },
      { es: "Estudia para el examen teórico", ar: "ادرسي للامتحان النظري" },
      { es: "Practica las clases prácticas", ar: "تدربي على الدروس العملية" },
      { es: "Aprueba los exámenes teórico y práctico", ar: "اجتازي الامتحانين النظري والعملي" },
    ],
    icon: "car",
  },
];

const TESTIMONIALS = [
  {
    name: "Fátima",
    country: "Marruecos",
    countryAr: "المغرب",
    text: "Llegué sin hablar español y ahora trabajo como auxiliar de enfermería. Las clases gratuitas del ayuntamiento me cambiaron la vida.",
    textAr: "وصلت دون أن أتحدث الإسبانية والآن أعمل كمساعدة تمريض. الدروس المجانية في البلدية غيرت حياتي.",
  },
  {
    name: "Amina",
    country: "Siria",
    countryAr: "سوريا",
    text: "Después de huir de la guerra, encontré apoyo en España. Ahora tengo mi propio negocio de costura.",
    textAr: "بعد الهروب من الحرب، وجدت الدعم في إسبانيا. الآن لدي مشروعي الخاص للخياطة.",
  },
  {
    name: "Layla",
    country: "Argelia",
    countryAr: "الجزائر",
    text: "El 016 me salvó la vida. Ahora vivo tranquila con mis hijos y tengo trabajo estable.",
    textAr: "الرقم 016 أنقذ حياتي. الآن أعيش بسلام مع أطفالي ولدي عمل مستقر.",
  },
  {
    name: "Nadia",
    country: "Egipto",
    countryAr: "مصر",
    text: "Empecé vendiendo comida árabe en mercadillos. Ahora tengo mi restaurante propio gracias a las ayudas para emprendedoras.",
    textAr: "بدأت ببيع الطعام العربي في الأسواق. الآن لدي مطعمي الخاص بفضل المساعدات للرائدات.",
  },
  {
    name: "Salma",
    country: "Palestina",
    countryAr: "فلسطين",
    text: "A los 45 años aprendí a leer y escribir en español. Nunca es tarde para empezar de nuevo.",
    textAr: "في سن 45 تعلمت القراءة والكتابة بالإسبانية. لم يفت الأوان أبداً للبدء من جديد.",
  },
  {
    name: "Hana",
    country: "Iraq",
    countryAr: "العراق",
    text: "Conseguí homologar mi título de enfermera. Ahora trabajo en un hospital público ayudando a otros.",
    textAr: "نجحت في معادلة شهادتي كممرضة. الآن أعمل في مستشفى عام وأساعد الآخرين.",
  },
  {
    name: "Yasmin",
    country: "Jordania",
    countryAr: "الأردن",
    text: "Me divorcié y pude quedarme con la custodia de mis hijos. La justicia española protege a las madres.",
    textAr: "طلقت وتمكنت من الحصول على حضانة أطفالي. العدالة الإسبانية تحمي الأمهات.",
  },
];

const ECONOMIC_AIDS = [
  {
    name: "Ingreso Mínimo Vital (IMV)",
    nameAr: "الحد الأدنى للدخل الحيوي",
    desc: "Ayuda económica mensual para familias con bajos ingresos. Entre 500€ y 1.000€ según situación.",
    descAr: "مساعدة مالية شهرية للعائلات ذات الدخل المنخفض. بين 500 و 1000 يورو حسب الوضع.",
    requirements: "Residir en España, ingresos bajos, empadronamiento.",
    requirementsAr: "الإقامة في إسبانيا، دخل منخفض، التسجيل في البلدية.",
    web: "https://www.seg-social.es/",
  },
  {
    name: "Renta Activa de Inserción (RAI)",
    nameAr: "دخل الإدماج النشط",
    desc: "480€/mes para mujeres víctimas de violencia de género desempleadas.",
    descAr: "480 يورو شهرياً للنساء ضحايا العنف العاطلات عن العمل.",
    requirements: "Ser víctima de violencia de género, estar desempleada.",
    requirementsAr: "أن تكوني ضحية عنف، أن تكوني عاطلة عن العمل.",
    web: "https://www.sepe.es/",
  },
  {
    name: "Ayuda por Hijo a Cargo",
    nameAr: "مساعدة الطفل المعال",
    desc: "Prestación mensual por cada hijo menor de 18 años. Mayor cuantía para familias monoparentales.",
    descAr: "إعانة شهرية لكل طفل أقل من 18 سنة. مبلغ أكبر للعائلات ذات الوالد الواحد.",
    requirements: "Tener hijos menores, residir en España, ingresos limitados.",
    requirementsAr: "وجود أطفال قاصرين، الإقامة في إسبانيا، دخل محدود.",
    web: "https://www.seg-social.es/",
  },
  {
    name: "Ayuda de Emergencia Social",
    nameAr: "مساعدة الطوارئ الاجتماعية",
    desc: "Ayuda puntual para situaciones de emergencia: alquiler, luz, comida.",
    descAr: "مساعدة طارئة لحالات الطوارئ: الإيجار، الكهرباء، الطعام.",
    requirements: "Situación de emergencia demostrable, empadronamiento.",
    requirementsAr: "حالة طوارئ قابلة للإثبات، التسجيل في البلدية.",
    web: "",
  },
  {
    name: "Bono Social Eléctrico",
    nameAr: "بونو الكهرباء الاجتماعي",
    desc: "Descuento del 25-40% en la factura de la luz para familias vulnerables.",
    descAr: "خصم 25-40% على فاتورة الكهرباء للعائلات الضعيفة.",
    requirements: "Ingresos bajos, familia numerosa o monoparental.",
    requirementsAr: "دخل منخفض، عائلة كبيرة أو ذات والد واحد.",
    web: "https://www.bonosocial.gob.es/",
  },
  {
    name: "Ayuda al Alquiler",
    nameAr: "مساعدة الإيجار",
    desc: "Hasta 40% del alquiler mensual (máximo 600€) para familias con ingresos limitados.",
    descAr: "حتى 40% من الإيجار الشهري (بحد أقصى 600 يورو) للعائلات ذات الدخل المحدود.",
    requirements: "Contrato de alquiler, ingresos limitados, empadronamiento.",
    requirementsAr: "عقد إيجار، دخل محدود، التسجيل في البلدية.",
    web: "https://www.mitma.gob.es/",
  },
  {
    name: "Ayuda para Emprendedoras",
    nameAr: "مساعدة الرائدات",
    desc: "Subvenciones y microcréditos para mujeres que quieren iniciar su propio negocio.",
    descAr: "منح وقروض صغيرة للنساء اللواتي يرغبن في بدء مشروعهن الخاص.",
    requirements: "Proyecto de negocio viable, residencia legal.",
    requirementsAr: "مشروع تجاري قابل للتطبيق، إقامة قانونية.",
    web: "https://www.ipyme.org/",
  },
  {
    name: "Beca Comedor Escolar",
    nameAr: "منحة المقصف المدرسي",
    desc: "Ayuda para pagar el comedor escolar de tus hijos. Puede cubrir hasta el 100%.",
    descAr: "مساعدة لدفع تكاليف مقصف المدرسة لأطفالك. يمكن أن تغطي حتى 100%.",
    requirements: "Hijos escolarizados, ingresos limitados.",
    requirementsAr: "أطفال مسجلون في المدرسة، دخل محدود.",
    web: "",
  },
  {
    name: "Cheque Guardería",
    nameAr: "شيك الحضانة",
    desc: "Ayuda mensual para pagar la guardería de niños de 0-3 años.",
    descAr: "مساعدة شهرية لدفع تكاليف حضانة الأطفال من 0-3 سنوات.",
    requirements: "Hijos menores de 3 años, madre trabajadora o buscando empleo.",
    requirementsAr: "أطفال أقل من 3 سنوات، أم عاملة أو تبحث عن عمل.",
    web: "",
  },
];

const USEFUL_VOCABULARY = [
  { es: "Ayuda", ar: "مساعدة", pronunciation: "a-YU-da" },
  { es: "Policía", ar: "شرطة", pronunciation: "po-li-THI-a" },
  { es: "Hospital", ar: "مستشفى", pronunciation: "os-pi-TAL" },
  { es: "Emergencia", ar: "طوارئ", pronunciation: "e-mer-HEN-thia" },
  { es: "Denuncia", ar: "شكوى", pronunciation: "de-NUN-thia" },
  { es: "Abogado", ar: "محامي", pronunciation: "a-bo-GA-do" },
  { es: "Trabajo", ar: "عمل", pronunciation: "tra-BA-ho" },
  { es: "Médico", ar: "طبيب", pronunciation: "ME-di-ko" },
  { es: "Documento", ar: "وثيقة", pronunciation: "do-ku-MEN-to" },
  { es: "Permiso", ar: "تصريح", pronunciation: "per-MI-so" },
  { es: "Cita", ar: "موعد", pronunciation: "THI-ta" },
  { es: "Formulario", ar: "استمارة", pronunciation: "for-mu-LA-rio" },
  { es: "Derechos", ar: "حقوق", pronunciation: "de-RE-chos" },
  { es: "Protección", ar: "حماية", pronunciation: "pro-tek-THION" },
  { es: "Seguro", ar: "تأمين", pronunciation: "se-GU-ro" },
  { es: "Contrato", ar: "عقد", pronunciation: "kon-TRA-to" },
  { es: "Alquiler", ar: "إيجار", pronunciation: "al-ki-LER" },
  { es: "Ayuntamiento", ar: "بلدية", pronunciation: "a-yun-ta-MIEN-to" },
  { es: "Guardería", ar: "حضانة", pronunciation: "guar-de-RI-a" },
  { es: "Colegio", ar: "مدرسة", pronunciation: "ko-LE-hio" },
  { es: "Banco", ar: "بنك", pronunciation: "BAN-ko" },
  { es: "Dinero", ar: "مال", pronunciation: "di-NE-ro" },
  { es: "Factura", ar: "فاتورة", pronunciation: "fak-TU-ra" },
  { es: "Recibo", ar: "إيصال", pronunciation: "re-THI-bo" },
];

const RESOURCES = [
  {
    category: "Empleo y Formación",
    categoryAr: "العمل والتدريب",
    icon: "school",
    items: [
      {
        name: "Programa SARA",
        nameAr: "برنامج سارا",
        desc: "Servicio de atención y recuperación para mujeres víctimas de violencia.",
        descAr: "خدمة الرعاية والتعافي للنساء ضحايا العنف.",
        web: "https://www.migualdad.gob.es/",
      },
      {
        name: "Cursos SEPE para Mujeres",
        nameAr: "دورات SEPE للنساء",
        desc: "Formación profesional gratuita con prioridad para mujeres.",
        descAr: "تدريب مهني مجاني مع أولوية للنساء.",
        web: "https://www.sepe.es/",
      },
      {
        name: "Programa Emplea",
        nameAr: "برنامج إمبليا",
        desc: "Inserción laboral para mujeres en situación de vulnerabilidad.",
        descAr: "الإدماج المهني للنساء في وضع هش.",
        web: "https://www.cruzroja.es/",
      },
    ],
  },
  {
    category: "Salud y Bienestar",
    categoryAr: "الصحة والرفاهية",
    icon: "fitness",
    items: [
      {
        name: "Centros de Salud",
        nameAr: "المراكز الصحية",
        desc: "Atención sanitaria gratuita con tarjeta sanitaria. Incluye ginecología y salud reproductiva.",
        descAr: "رعاية صحية مجانية بالبطاقة الصحية. تشمل أمراض النساء والصحة الإنجابية.",
        web: "",
      },
      {
        name: "Planificación Familiar",
        nameAr: "تنظيم الأسرة",
        desc: "Información y acceso a métodos anticonceptivos de forma gratuita.",
        descAr: "معلومات والوصول إلى وسائل منع الحمل مجاناً.",
        web: "",
      },
      {
        name: "Apoyo Psicológico",
        nameAr: "الدعم النفسي",
        desc: "Servicios de salud mental gratuitos a través del sistema público de salud.",
        descAr: "خدمات الصحة النفسية المجانية من خلال نظام الصحة العامة.",
        web: "",
      },
    ],
  },
  {
    category: "Conciliación Familiar",
    categoryAr: "التوفيق العائلي",
    icon: "home",
    items: [
      {
        name: "Permiso de Maternidad",
        nameAr: "إجازة الأمومة",
        desc: "16 semanas de permiso remunerado por nacimiento o adopción.",
        descAr: "16 أسبوعاً من الإجازة مدفوعة الأجر للولادة أو التبني.",
        web: "https://www.seg-social.es/",
      },
      {
        name: "Guarderías Públicas",
        nameAr: "الحضانات العامة",
        desc: "Escuelas infantiles públicas con precios reducidos según ingresos.",
        descAr: "مدارس أطفال عامة بأسعار مخفضة حسب الدخل.",
        web: "",
      },
      {
        name: "Ayuda por Hijo a Cargo",
        nameAr: "مساعدة الطفل المعال",
        desc: "Prestaciones económicas para familias con hijos menores.",
        descAr: "مساعدات مالية للعائلات التي لديها أطفال قاصرون.",
        web: "https://www.seg-social.es/",
      },
    ],
  },
];

const RECETAS = [
  {
    nombre: "Tortilla de Patatas",
    nombreAr: "عجة البطاطس",
    tiempo: "30 min",
    tiempoAr: "30 دقيقة",
    personas: "4 personas",
    personasAr: "4 أشخاص",
    imagen: "https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=400&h=300&fit=crop",
    ingredientes: [
      { es: "6 huevos", ar: "6 بيضات" },
      { es: "4 patatas grandes", ar: "4 بطاطس كبيرة" },
      { es: "1 cebolla (opcional)", ar: "1 بصل (اختياري)" },
      { es: "Aceite de oliva", ar: "زيت زيتون" },
      { es: "Sal", ar: "ملح" },
    ],
    pasos: [
      { es: "Pelar y cortar las patatas en rodajas finas", ar: "قشر البطاطس وقطّعها شرائح رفيعة" },
      { es: "Freír las patatas en aceite hasta que estén doradas", ar: "اقلي البطاطس في الزيت حتى تصبح ذهبية" },
      { es: "Batir los huevos en un bowl y añadir sal", ar: "اخفقي البيض في وعاء وأضيفي الملح" },
      { es: "Mezclar las patatas fritas con los huevos batidos", ar: "امزجي البطاطس المقلية مع البيض المخفوق" },
      { es: "Verter en una sartén caliente y cocinar por ambos lados", ar: "اسكبي في مقلاة ساخنة واطبخي من كلا الجانبين" },
    ],
  },
  {
    nombre: "Gazpacho",
    nombreAr: "غازباتشو",
    tiempo: "20 min",
    tiempoAr: "20 دقيقة",
    personas: "4 personas",
    personasAr: "4 أشخاص",
    imagen: "https://images.unsplash.com/photo-1547592166-23ac45744acd?w=400&h=300&fit=crop",
    ingredientes: [
      { es: "1 kg de tomates maduros", ar: "1 كيلو من الطماطم الناضجة" },
      { es: "1 pepino", ar: "1 خيار" },
      { es: "1 pimiento verde", ar: "1 فلفل أخضر" },
      { es: "1 diente de ajo", ar: "1 فص ثوم" },
      { es: "Aceite de oliva", ar: "زيت زيتون" },
      { es: "Vinagre", ar: "خل" },
      { es: "Sal", ar: "ملح" },
      { es: "Pan duro (opcional)", ar: "خبز يابس (اختياري)" },
    ],
    pasos: [
      { es: "Lavar y cortar todos los vegetales", ar: "اغسلي وقطّعي جميع الخضروات" },
      { es: "Triturar todo en una batidora", ar: "اهرسي كل شيء في الخلاط" },
      { es: "Añadir aceite, vinagre y sal al gusto", ar: "أضيفي الزيت والخل والملح حسب الذوق" },
      { es: "Pasar por un colador fino", ar: "مرري من خلال مصفاة ناعمة" },
      { es: "Enfriar en la nevera antes de servir", ar: "بردي في الثلاجة قبل التقديم" },
    ],
  },
  {
    nombre: "Paella de Verduras",
    nombreAr: "باييا الخضار",
    tiempo: "45 min",
    tiempoAr: "45 دقيقة",
    personas: "4 personas",
    personasAr: "4 أشخاص",
    imagen: "https://images.unsplash.com/photo-1626700051175-6818013e1d4f?w=400&h=300&fit=crop",
    ingredientes: [
      { es: "300 g de arroz", ar: "300 غرام أرز" },
      { es: "1 pimiento rojo", ar: "1 فلفل أحمر" },
      { es: "1 pimiento verde", ar: "1 فلفل أخضر" },
      { es: "2 tomates", ar: "2 طماطم" },
      { es: "200 g de judías verdes", ar: "200 غرام فاصوليا خضراء" },
      { es: "1 cebolla", ar: "1 بصل" },
      { es: "Aceite de oliva", ar: "زيت زيتون" },
      { es: "Azafrán o colorante", ar: "زعفران أو صبغة" },
      { es: "Caldo de verduras", ar: "مرق الخضار" },
      { es: "Sal", ar: "ملح" },
    ],
    pasos: [
      { es: "Cortar todos los vegetales en trozos pequeños", ar: "قطّعي جميع الخضروات إلى قطع صغيرة" },
      { es: "Sofreír los vegetales en una paellera con aceite", ar: "اقلي الخضروات في مقلاة الباييا بالزيت" },
      { es: "Añadir el arroz y sofreír 2 minutos", ar: "أضيفي الأرز واقلي لمدة دقيقتين" },
      { es: "Añadir el caldo caliente, azafrán y sal", ar: "أضيفي المرق الساخن والزعفران والملح" },
      { es: "Cocinar a fuego medio durante 18-20 minutos", ar: "اطبخي على نار متوسطة لمدة 18-20 دقيقة" },
      { es: "Dejar reposar 5 minutos antes de servir", ar: "اتركيه يرتاح 5 دقائق قبل التقديم" },
    ],
  },
  {
    nombre: "Ensalada Mediterránea",
    nombreAr: "سلطة البحر الأبيض المتوسط",
    tiempo: "15 min",
    tiempoAr: "15 دقيقة",
    personas: "4 personas",
    personasAr: "4 أشخاص",
    imagen: "https://images.unsplash.com/photo-1540189549336-e6e99c3679fe?w=400&h=300&fit=crop",
    ingredientes: [
      { es: "Lechuga", ar: "خس" },
      { es: "Tomate", ar: "طماطم" },
      { es: "Pepino", ar: "خيار" },
      { es: "Cebolla morada", ar: "بصل أحمر" },
      { es: "Aceitunas", ar: "زيتون" },
      { es: "Queso feta (opcional)", ar: "جبنة فيتا (اختياري)" },
      { es: "Aceite de oliva", ar: "زيت زيتون" },
      { es: "Vinagre o limón", ar: "خل أو ليمون" },
      { es: "Orégano", ar: "زعتر" },
      { es: "Sal", ar: "ملح" },
    ],
    pasos: [
      { es: "Lavar y cortar todas las verduras", ar: "اغسلي وقطّعي جميع الخضروات" },
      { es: "Cortar el tomate y pepino en rodajas", ar: "قطّعي الطماطم والخيار شرائح" },
      { es: "Cortar la cebolla en aros finos", ar: "قطّعي البصل حلقات رفيعة" },
      { es: "Mezclar todo en un bowl grande", ar: "امزجي كل شيء في وعاء كبير" },
      { es: "Aliñar con aceite, vinagre, orégano y sal", ar: "تبلي بالزيت والخل والزعتر والملح" },
      { es: "Servir inmediatamente", ar: "قدّمي فوراً" },
    ],
  },
  {
    nombre: "Crema de Calabacín",
    nombreAr: "كريمة الكوسة",
    tiempo: "25 min",
    tiempoAr: "25 دقيقة",
    personas: "4 personas",
    personasAr: "4 أشخاص",
    imagen: "https://images.unsplash.com/photo-1547592166-23ac45744acd?w=400&h=300&fit=crop",
    ingredientes: [
      { es: "4 calabacines medianos", ar: "4 كوسا متوسطة" },
      { es: "1 cebolla", ar: "1 بصل" },
      { es: "2 dientes de ajo", ar: "2 فص ثوم" },
      { es: "Caldo de verduras", ar: "مرق الخضار" },
      { es: "Aceite de oliva", ar: "زيت زيتون" },
      { es: "Sal y pimienta", ar: "ملح وفلفل" },
      { es: "Nata para cocinar (opcional)", ar: "كريمة الطبخ (اختياري)" },
    ],
    pasos: [
      { es: "Pelar y cortar los calabacines y la cebolla", ar: "قشري وقطّعي الكوسا والبصل" },
      { es: "Sofreír la cebolla y el ajo en una olla", ar: "اقلي البصل والثوم في قدر" },
      { es: "Añadir los calabacines y cocinar 5 minutos", ar: "أضيفي الكوسا واطبخي 5 دقائق" },
      { es: "Añadir el caldo y cocinar 15 minutos", ar: "أضيفي المرق واطبخي 15 دقيقة" },
      { es: "Triturar todo hasta conseguir una crema suave", ar: "اهرسي كل شيء حتى تحصلي على كريمة ناعمة" },
      { es: "Añadir nata si se desea y rectificar de sal", ar: "أضيفي الكريمة إذا رغبتي وصحّحي الملح" },
    ],
  },
  {
    nombre: "Patatas Bravas",
    nombreAr: "بطاطس برافاس",
    tiempo: "30 min",
    tiempoAr: "30 دقيقة",
    personas: "4 personas",
    personasAr: "4 أشخاص",
    imagen: "https://images.unsplash.com/photo-1573080496219-bb080dd4f877?w=400&h=300&fit=crop",
    ingredientes: [
      { es: "1 kg de patatas", ar: "1 كيلو بطاطس" },
      { es: "Aceite de oliva", ar: "زيت زيتون" },
      { es: "Tomate triturado", ar: "طماطم مهروسة" },
      { es: "Pimentón dulce", ar: "فلفل أحمر حلو" },
      { es: "Pimentón picante", ar: "فلفل أحمر حار" },
      { es: "Ajo en polvo", ar: "ثوم بودرة" },
      { es: "Sal", ar: "ملح" },
    ],
    pasos: [
      { es: "Pelar y cortar las patatas en trozos", ar: "قشري وقطّعي البطاطس قطع" },
      { es: "Freír las patatas en aceite caliente", ar: "اقلي البطاطس في زيت ساخن" },
      { es: "Escurrir y salar", ar: "صفّي وملّحي" },
      { es: "Para la salsa: sofreír el tomate con los pimentones", ar: "للصلصة: اقلي الطماطم مع الفلفل الأحمر" },
      { es: "Añadir ajo en polvo y un poco de agua", ar: "أضيفي الثوم البودرة وقليل من الماء" },
      { es: "Verter la salsa sobre las patatas", ar: "اسكبي الصلصة على البطاطس" },
    ],
  },
  {
    nombre: "Espaguetis con Tomate",
    nombreAr: "معكرونة بالطماطم",
    tiempo: "20 min",
    tiempoAr: "20 دقيقة",
    personas: "4 personas",
    personasAr: "4 أشخاص",
    imagen: "https://images.unsplash.com/photo-1551892374-ecf8754cf8b0?w=400&h=300&fit=crop",
    ingredientes: [
      { es: "400 g de espaguetis", ar: "400 غرام معكرونة" },
      { es: "4 tomates maduros", ar: "4 طماطم ناضجة" },
      { es: "2 dientes de ajo", ar: "2 فص ثوم" },
      { es: "Albahaca fresca", ar: "ريحان طازج" },
      { es: "Aceite de oliva", ar: "زيت زيتون" },
      { es: "Sal", ar: "ملح" },
    ],
    pasos: [
      { es: "Hervir los espaguetis según las instrucciones del paquete", ar: "اغلي المعكرونة حسب تعليمات العبوة" },
      { es: "Pelar y triturar los tomates", ar: "قشري واهرسي الطماطم" },
      { es: "Sofreír el ajo en aceite", ar: "اقلي الثوم في الزيت" },
      { es: "Añadir los tomates triturados y cocinar 10 minutos", ar: "أضيفي الطماطم المهروسة واطبخي 10 دقائق" },
      { es: "Añadir la albahaca y sal", ar: "أضيفي الريحان والملح" },
      { es: "Mezclar la salsa con los espaguetis cocidos", ar: "امزجي الصلصة مع المعكرونة المطبوخة" },
    ],
  },
  {
    nombre: "Tortilla de Verduras",
    nombreAr: "عجة الخضار",
    tiempo: "25 min",
    tiempoAr: "25 دقيقة",
    personas: "4 personas",
    personasAr: "4 أشخاص",
    imagen: "https://images.unsplash.com/photo-1543076445-2156e0f8d3a7?w=400&h=300&fit=crop",
    ingredientes: [
      { es: "6 huevos", ar: "6 بيضات" },
      { es: "1 calabacín", ar: "1 كوسا" },
      { es: "1 pimiento rojo", ar: "1 فلفل أحمر" },
      { es: "1 cebolla", ar: "1 بصل" },
      { es: "Aceite de oliva", ar: "زيت زيتون" },
      { es: "Sal", ar: "ملح" },
    ],
    pasos: [
      { es: "Cortar todas las verduras en trozos pequeños", ar: "قطّعي جميع الخضروات قطع صغيرة" },
      { es: "Sofreír las verduras en una sartén", ar: "اقلي الخضروات في مقلاة" },
      { es: "Batir los huevos en un bowl", ar: "اخفقي البيض في وعاء" },
      { es: "Mezclar las verduras sofritas con los huevos", ar: "امزجي الخضروات المقلية مع البيض" },
      { es: "Verter en la sartén y cocinar por ambos lados", ar: "اسكبي في المقلاة واطبخي من كلا الجانبين" },
    ],
  },
  {
    nombre: "Pisto Manchego",
    nombreAr: "بيستو مانشيجو",
    tiempo: "40 min",
    tiempoAr: "40 دقيقة",
    personas: "4 personas",
    personasAr: "4 أشخاص",
    imagen: "https://images.unsplash.com/photo-1542838132-92c53300491e?w=400&h=300&fit=crop",
    ingredientes: [
      { es: "2 calabacines", ar: "2 كوسا" },
      { es: "2 berenjenas", ar: "2 باذنجان" },
      { es: "2 pimientos rojos", ar: "2 فلفل أحمر" },
      { es: "2 pimientos verdes", ar: "2 فلفل أخضر" },
      { es: "4 tomates", ar: "4 طماطم" },
      { es: "1 cebolla", ar: "1 بصل" },
      { es: "Aceite de oliva", ar: "زيت زيتون" },
      { es: "Sal", ar: "ملح" },
    ],
    pasos: [
      { es: "Cortar todas las verduras en dados pequeños", ar: "قطّعي جميع الخضروات مكعبات صغيرة" },
      { es: "Sofreír la cebolla en aceite hasta que esté transparente", ar: "اقلي البصل في الزيت حتى يصبح شفافاً" },
      { es: "Añadir los pimientos y cocinar 10 minutos", ar: "أضيفي الفلفل واطبخي 10 دقائق" },
      { es: "Añadir berenjenas y calabacines, cocinar 15 minutos", ar: "أضيفي الباذنجان والكوسا، اطبخي 15 دقيقة" },
      { es: "Añadir los tomates pelados y cocinar 15 minutos más", ar: "أضيفي الطماطم المقشرة واطبخي 15 دقيقة أخرى" },
      { es: "Sazonar con sal y servir caliente o frío", ar: "تبلي بالملح وقدمي ساخناً أو بارداً" },
    ],
  },
  {
    nombre: "Lentejas Estofadas",
    nombreAr: "عدس مطبوخ",
    tiempo: "50 min",
    tiempoAr: "50 دقيقة",
    personas: "4 personas",
    personasAr: "4 أشخاص",
    imagen: "https://images.unsplash.com/photo-1542838132-92c53300491e?w=400&h=300&fit=crop",
    ingredientes: [
      { es: "400 g de lentejas", ar: "400 غرام عدس" },
      { es: "1 cebolla", ar: "1 بصل" },
      { es: "2 zanahorias", ar: "2 جزر" },
      { es: "2 tomates", ar: "2 طماطم" },
      { es: "1 pimiento verde", ar: "1 فلفل أخضر" },
      { es: "2 dientes de ajo", ar: "2 فص ثوم" },
      { es: "Pimentón dulce", ar: "فلفل أحمر حلو" },
      { es: "Caldo de verduras", ar: "مرق الخضار" },
      { es: "Aceite de oliva", ar: "زيت زيتون" },
      { es: "Sal", ar: "ملح" },
    ],
    pasos: [
      { es: "Remojar las lentejas durante 2 horas", ar: "نقع العدس لمدة ساعتين" },
      { es: "Cortar todas las verduras en trozos pequeños", ar: "قطّعي جميع الخضروات قطع صغيرة" },
      { es: "Sofreír la cebolla, ajo y pimiento en aceite", ar: "اقلي البصل والثوم والفلفل في الزيت" },
      { es: "Añadir las zanahorias y tomates, cocinar 5 minutos", ar: "أضيفي الجزر والطماطم، اطبخي 5 دقائق" },
      { es: "Añadir las lentejas escurridas y el caldo", ar: "أضيفي العدس المصفى والمرق" },
      { es: "Cocinar a fuego medio-bajo durante 40 minutos", ar: "اطبخي على نار متوسطة-منخفضة لمدة 40 دقيقة" },
      { es: "Añadir pimentón y sal al final", ar: "أضيفي الفلفل الأحمر والملح في النهاية" },
    ],
  },
  {
    nombre: "Ensaladilla Rusa",
    nombreAr: "سلطة روسية",
    tiempo: "30 min",
    tiempoAr: "30 دقيقة",
    personas: "4 personas",
    personasAr: "4 أشخاص",
    imagen: "https://images.unsplash.com/photo-1540189549336-e6e99c3679fe?w=400&h=300&fit=crop",
    ingredientes: [
      { es: "4 patatas medianas", ar: "4 بطاطس متوسطة" },
      { es: "2 zanahorias", ar: "2 جزر" },
      { es: "200 g de guisantes", ar: "200 غرام بازلاء" },
      { es: "4 huevos duros", ar: "4 بيض مسلوق" },
      { es: "Mayonesa", ar: "مايونيز" },
      { es: "Sal", ar: "ملح" },
    ],
    pasos: [
      { es: "Hervir las patatas y zanahorias hasta que estén tiernas", ar: "اغلي البطاطس والجزر حتى تصبح طرية" },
      { es: "Hervir los guisantes por separado", ar: "اغلي البازلاء منفصلة" },
      { es: "Cocer los huevos hasta que estén duros", ar: "اطبخي البيض حتى يصبح صلباً" },
      { es: "Dejar enfriar todo y cortar en dados pequeños", ar: "اتركي كل شيء يبرد وقطّعي مكعبات صغيرة" },
      { es: "Mezclar todo en un bowl grande", ar: "امزجي كل شيء في وعاء كبير" },
      { es: "Añadir mayonesa y sal al gusto", ar: "أضيفي المايونيز والملح حسب الذوق" },
      { es: "Enfriar en la nevera antes de servir", ar: "بردي في الثلاجة قبل التقديم" },
    ],
  },
  {
    nombre: "Sopa de Ajo",
    nombreAr: "شوربة الثوم",
    tiempo: "25 min",
    tiempoAr: "25 دقيقة",
    personas: "4 personas",
    personasAr: "4 أشخاص",
    imagen: "https://images.unsplash.com/photo-1547592166-23ac45744acd?w=400&h=300&fit=crop",
    ingredientes: [
      { es: "8 dientes de ajo", ar: "8 فص ثوم" },
      { es: "4 rebanadas de pan duro", ar: "4 شرائح خبز يابس" },
      { es: "1 litro de caldo de verduras", ar: "1 لتر مرق خضار" },
      { es: "Pimentón dulce", ar: "فلفل أحمر حلو" },
      { es: "Aceite de oliva", ar: "زيت زيتون" },
      { es: "Sal", ar: "ملح" },
      { es: "2 huevos (opcional)", ar: "2 بيضة (اختياري)" },
    ],
    pasos: [
      { es: "Pelar y cortar los ajos en láminas", ar: "قشري وقطّعي الثوم شرائح" },
      { es: "Freír el pan en aceite hasta que esté dorado", ar: "اقلي الخبز في الزيت حتى يصبح ذهبياً" },
      { es: "En el mismo aceite, sofreír los ajos", ar: "في نفس الزيت، اقلي الثوم" },
      { es: "Añadir el pimentón y remover rápidamente", ar: "أضيفي الفلفل الأحمر وحركي بسرعة" },
      { es: "Añadir el caldo caliente y cocinar 15 minutos", ar: "أضيفي المرق الساخن واطبخي 15 دقيقة" },
      { es: "Añadir el pan frito y triturar ligeramente", ar: "أضيفي الخبز المقلية واهرسي قليلاً" },
      { es: "Si se desea, añadir huevos escalfados al servir", ar: "إذا رغبتي، أضيفي بيض مسلوق عند التقديم" },
    ],
  },
  {
    nombre: "Arroz con Verduras",
    nombreAr: "أرز بالخضار",
    tiempo: "35 min",
    tiempoAr: "35 دقيقة",
    personas: "4 personas",
    personasAr: "4 أشخاص",
    imagen: "https://images.unsplash.com/photo-1626700051175-6818013e1d4f?w=400&h=300&fit=crop",
    ingredientes: [
      { es: "300 g de arroz", ar: "300 غرام أرز" },
      { es: "1 cebolla", ar: "1 بصل" },
      { es: "1 pimiento rojo", ar: "1 فلفل أحمر" },
      { es: "1 pimiento verde", ar: "1 فلفل أخضر" },
      { es: "2 tomates", ar: "2 طماطم" },
      { es: "200 g de judías verdes", ar: "200 غرام فاصوليا خضراء" },
      { es: "Caldo de verduras", ar: "مرق الخضار" },
      { es: "Azafrán", ar: "زعفران" },
      { es: "Aceite de oliva", ar: "زيت زيتون" },
      { es: "Sal", ar: "ملح" },
    ],
    pasos: [
      { es: "Cortar todas las verduras en trozos pequeños", ar: "قطّعي جميع الخضروات قطع صغيرة" },
      { es: "Sofreír la cebolla y los pimientos en aceite", ar: "اقلي البصل والفلفل في الزيت" },
      { es: "Añadir los tomates y judías verdes", ar: "أضيفي الطماطم والفاصوليا الخضراء" },
      { es: "Añadir el arroz y sofreír 2 minutos", ar: "أضيفي الأرز واقلي دقيقتين" },
      { es: "Añadir el caldo caliente con azafrán", ar: "أضيفي المرق الساخن مع الزعفران" },
      { es: "Cocinar a fuego medio durante 18 minutos", ar: "اطبخي على نار متوسطة لمدة 18 دقيقة" },
      { es: "Dejar reposar 5 minutos antes de servir", ar: "اتركيه يرتاح 5 دقائق قبل التقديم" },
    ],
  },
  {
    nombre: "Tortilla de Espinacas",
    nombreAr: "عجة السبانخ",
    tiempo: "20 min",
    tiempoAr: "20 دقيقة",
    personas: "4 personas",
    personasAr: "4 أشخاص",
    imagen: "https://images.unsplash.com/photo-1543076445-2156e0f8d3a7?w=400&h=300&fit=crop",
    ingredientes: [
      { es: "6 huevos", ar: "6 بيضات" },
      { es: "300 g de espinacas frescas", ar: "300 غرام سبانخ طازجة" },
      { es: "1 cebolla", ar: "1 بصل" },
      { es: "Aceite de oliva", ar: "زيت زيتون" },
      { es: "Sal y pimienta", ar: "ملح وفلفل" },
    ],
    pasos: [
      { es: "Lavar bien las espinacas", ar: "اغسلي السبانخ جيداً" },
      { es: "Sofreír la cebolla en aceite", ar: "اقلي البصل في الزيت" },
      { es: "Añadir las espinacas y cocinar hasta que se reduzcan", ar: "أضيفي السبانخ واطبخي حتى تنكمش" },
      { es: "Batir los huevos en un bowl", ar: "اخفقي البيض في وعاء" },
      { es: "Mezclar las espinacas con los huevos", ar: "امزجي السبانخ مع البيض" },
      { es: "Verter en sartén y cocinar por ambos lados", ar: "اسكبي في مقلاة واطبخي من كلا الجانبين" },
    ],
  },
  {
    nombre: "Ensalada de Tomate y Cebolla",
    nombreAr: "سلطة الطماطم والبصل",
    tiempo: "10 min",
    tiempoAr: "10 دقائق",
    personas: "4 personas",
    personasAr: "4 أشخاص",
    imagen: "https://images.unsplash.com/photo-1540189549336-e6e99c3679fe?w=400&h=300&fit=crop",
    ingredientes: [
      { es: "4 tomates grandes", ar: "4 طماطم كبيرة" },
      { es: "1 cebolla morada", ar: "1 بصل أحمر" },
      { es: "Aceite de oliva", ar: "زيت زيتون" },
      { es: "Vinagre", ar: "خل" },
      { es: "Orégano", ar: "زعتر" },
      { es: "Sal", ar: "ملح" },
    ],
    pasos: [
      { es: "Cortar los tomates en rodajas", ar: "قطّعي الطماطم شرائح" },
      { es: "Cortar la cebolla en aros finos", ar: "قطّعي البصل حلقات رفيعة" },
      { es: "Colocar en un plato alternando tomate y cebolla", ar: "ضعي في طبق بالتناوب بين الطماطم والبصل" },
      { es: "Aliñar con aceite, vinagre, orégano y sal", ar: "تبلي بالزيت والخل والزعتر والملح" },
      { es: "Dejar reposar 10 minutos antes de servir", ar: "اتركيه يرتاح 10 دقائق قبل التقديم" },
    ],
  },
  {
    nombre: "Crema de Verduras",
    nombreAr: "كريمة الخضار",
    tiempo: "30 min",
    tiempoAr: "30 دقيقة",
    personas: "4 personas",
    personasAr: "4 أشخاص",
    imagen: "https://images.unsplash.com/photo-1547592166-23ac45744acd?w=400&h=300&fit=crop",
    ingredientes: [
      { es: "2 zanahorias", ar: "2 جزر" },
      { es: "1 calabacín", ar: "1 كوسا" },
      { es: "1 cebolla", ar: "1 بصل" },
      { es: "2 patatas", ar: "2 بطاطس" },
      { es: "Caldo de verduras", ar: "مرق الخضار" },
      { es: "Aceite de oliva", ar: "زيت زيتون" },
      { es: "Sal y pimienta", ar: "ملح وفلفل" },
    ],
    pasos: [
      { es: "Pelar y cortar todas las verduras", ar: "قشري وقطّعي جميع الخضروات" },
      { es: "Sofreír la cebolla en aceite", ar: "اقلي البصل في الزيت" },
      { es: "Añadir el resto de verduras y cocinar 5 minutos", ar: "أضيفي باقي الخضروات واطبخي 5 دقائق" },
      { es: "Añadir el caldo y cocinar 20 minutos", ar: "أضيفي المرق واطبخي 20 دقيقة" },
      { es: "Triturar todo hasta conseguir una crema suave", ar: "اهرسي كل شيء حتى تحصلي على كريمة ناعمة" },
      { es: "Rectificar de sal y servir caliente", ar: "صحّحي الملح وقدمي ساخناً" },
    ],
  },
  {
    nombre: "Patatas al Horno",
    nombreAr: "بطاطس بالفرن",
    tiempo: "45 min",
    tiempoAr: "45 دقيقة",
    personas: "4 personas",
    personasAr: "4 أشخاص",
    imagen: "https://images.unsplash.com/photo-1573080496219-bb080dd4f877?w=400&h=300&fit=crop",
    ingredientes: [
      { es: "1 kg de patatas", ar: "1 كيلو بطاطس" },
      { es: "Aceite de oliva", ar: "زيت زيتون" },
      { es: "Romero fresco", ar: "إكليل الجبل الطازج" },
      { es: "Ajo", ar: "ثوم" },
      { es: "Sal", ar: "ملح" },
    ],
    pasos: [
      { es: "Precalentar el horno a 200°C", ar: "سخني الفرن على 200 درجة" },
      { es: "Pelar y cortar las patatas en rodajas", ar: "قشري وقطّعي البطاطس شرائح" },
      { es: "Colocar en una bandeja de horno", ar: "ضعي في صينية فرن" },
      { es: "Aliñar con aceite, ajo, romero y sal", ar: "تبلي بالزيت والثوم وإكليل الجبل والملح" },
      { es: "Hornear durante 40 minutos hasta que estén doradas", ar: "اخبزي لمدة 40 دقيقة حتى تصبح ذهبية" },
      { es: "Servir caliente", ar: "قدمي ساخناً" },
    ],
  },
];

const ORGANIZATIONS = [
  {
    name: "Instituto de la Mujer",
    nameAr: "معهد المرأة",
    desc: "Organismo oficial para la igualdad de oportunidades entre mujeres y hombres.",
    descAr: "الهيئة الرسمية لتكافؤ الفرص بين النساء والرجال.",
    web: "https://www.inmujeres.gob.es/",
    phone: "900 19 10 10",
  },
  {
    name: "Federación de Mujeres Progresistas",
    nameAr: "اتحاد النساء التقدميات",
    desc: "Defensa de los derechos de las mujeres y lucha contra la violencia de género.",
    descAr: "الدفاع عن حقوق المرأة ومكافحة العنف ضد المرأة.",
    web: "https://fmujeresprogresistas.org/",
    phone: "91 539 02 38",
  },
  {
    name: "Fundación Mujeres",
    nameAr: "مؤسسة النساء",
    desc: "Promoción de la igualdad de oportunidades y empoderamiento de las mujeres.",
    descAr: "تعزيز تكافؤ الفرص وتمكين المرأة.",
    web: "https://fundacionmujeres.es/",
    phone: "91 591 24 20",
  },
  {
    name: "Asociación de Mujeres Inmigrantes",
    nameAr: "جمعية النساء المهاجرات",
    desc: "Apoyo específico para mujeres inmigrantes: asesoría legal, formación e integración.",
    descAr: "دعم خاص للنساء المهاجرات: استشارات قانونية، تدريب واندماج.",
    web: "https://mujeresinmigrantes.org/",
    phone: "",
  },
];

interface ExpandableSectionProps {
  title: string;
  titleAr: string;
  icon: string;
  children: React.ReactNode;
  defaultExpanded?: boolean;
}

const ExpandableSection: React.FC<ExpandableSectionProps> = ({
  title,
  titleAr,
  icon,
  children,
  defaultExpanded = false,
}) => {
  const [expanded, setExpanded] = useState(defaultExpanded);

  const toggleExpand = () => {
    LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut);
    setExpanded(!expanded);
  };

  return (
    <View style={styles.sectionContainer}>
      <TouchableOpacity style={styles.sectionHeader} onPress={toggleExpand} activeOpacity={0.7}>
        <View style={styles.sectionHeaderLeft}>
          <Ionicons name={icon as any} size={24} color="#000" />
          <View style={styles.sectionTitles}>
            <Text style={styles.sectionTitle}>{title}</Text>
            <Text style={styles.sectionTitleAr}>{titleAr}</Text>
          </View>
        </View>
        <Ionicons
          name={expanded ? "chevron-up" : "chevron-down"}
          size={24}
          color="#000"
        />
      </TouchableOpacity>
      {expanded && <View style={styles.sectionContent}>{children}</View>}
    </View>
  );
};

export default function IntegracionMujerScreen() {
  const router = useRouter();
  const [revistaArticles, setRevistaArticles] = useState<RevistaArticle[]>([]);
  const [revistaLoading, setRevistaLoading] = useState(false);
  const [refreshing, setRefreshing] = useState(false);

  const handleCall = (phone: string) => {
    Linking.openURL(`tel:${phone}`);
  };

  const handleWeb = (url: string) => {
    if (url) {
      Linking.openURL(url);
    }
  };

  const loadRevistaArticles = async () => {
    setRevistaLoading(true);
    try {
      const articles = await fetchRevistaArticles(15);
      setRevistaArticles(articles);
    } catch (error) {
      console.error('Error cargando artículos:', error);
    } finally {
      setRevistaLoading(false);
      setRefreshing(false);
    }
  };

  useFocusEffect(
    React.useCallback(() => {
      loadRevistaArticles();
    }, [])
  );

  const onRefresh = () => {
    setRefreshing(true);
    loadRevistaArticles();
  };

  return (
    <ScrollView
      style={styles.container}
      contentContainerStyle={styles.contentContainer}
      showsVerticalScrollIndicator={false}
      refreshControl={
        <RefreshControl refreshing={refreshing} onRefresh={onRefresh} tintColor="#FFD700" />
      }
    >
      {/* Header */}
      <TouchableOpacity style={styles.backBtn} onPress={() => router.back()}>
        <Ionicons name="arrow-back" size={26} color="#FFD700" />
        <Text style={styles.backText}>Volver</Text>
      </TouchableOpacity>

      {/* Título Principal */}
      <LinearGradient
        colors={["#000", "#000"]}
        style={[styles.headerGradient, { borderWidth: 1, borderColor: "#FFD700" }]}
      >
        <MaterialCommunityIcons name="human-female" size={48} color="#FFD700" />
        <View style={styles.headerTextContainer}>
          <Text style={styles.mainTitle}>Integración de la Mujer</Text>
          <Text style={styles.mainTitleAr}>اندماج المرأة</Text>
          <Text style={styles.subtitle}>Recursos, derechos y apoyo</Text>
          <Text style={styles.subtitleAr}>الموارد والحقوق والدعم</Text>
        </View>
      </LinearGradient>

      {/* Teléfonos de Emergencia */}
      <View style={styles.emergencySection}>
        <Text style={styles.emergencyTitle}>
          <Ionicons name="warning" size={20} color="#d32f2f" /> Teléfonos de Emergencia
        </Text>
        <Text style={styles.emergencyTitleAr}>هواتف الطوارئ</Text>
        {EMERGENCY_CONTACTS.map((contact, idx) => (
          <TouchableOpacity
            key={idx}
            style={[styles.emergencyCard, { borderLeftColor: "#000" }]}
            onPress={() => handleCall(contact.phone)}
            activeOpacity={0.7}
          >
            <View style={[styles.emergencyIcon, { backgroundColor: "#000" }]}>
              <Ionicons name={contact.icon as any} size={24} color="#FFD700" />
            </View>
            <View style={styles.emergencyInfo}>
              <Text style={styles.emergencyName}>{contact.name}</Text>
              <Text style={styles.emergencyNameAr}>{contact.nameAr}</Text>
              <Text style={styles.emergencyDesc}>{contact.desc}</Text>
              <Text style={styles.emergencyDescAr}>{contact.descAr}</Text>
            </View>
            <Ionicons name="call" size={24} color="#FFD700" />
          </TouchableOpacity>
        ))}
      </View>

      {/* Derechos de la Mujer */}
      <ExpandableSection
        title="Derechos de la Mujer en España"
        titleAr="حقوق المرأة في إسبانيا"
        icon="document-text"
        defaultExpanded={true}
      >
        {WOMEN_RIGHTS.map((right, idx) => (
          <View key={idx} style={styles.rightCard}>
            <View style={styles.rightHeader}>
              <Ionicons name={right.icon as any} size={22} color="#000" />
              <View style={styles.rightTitles}>
                <Text style={styles.rightTitle}>{right.title}</Text>
                <Text style={styles.rightTitleAr}>{right.titleAr}</Text>
              </View>
            </View>
            <Text style={styles.rightContent}>{right.content}</Text>
            <Text style={styles.rightContentAr}>{right.contentAr}</Text>
          </View>
        ))}
      </ExpandableSection>

      {/* Recursos y Ayudas */}
      <ExpandableSection
        title="Recursos y Ayudas"
        titleAr="الموارد والمساعدات"
        icon="heart"
      >
        {RESOURCES.map((category, catIdx) => (
          <View key={catIdx} style={styles.resourceCategory}>
            <View style={styles.categoryHeader}>
              <Ionicons name={category.icon as any} size={20} color="#000" />
              <Text style={styles.categoryTitle}>{category.category}</Text>
              <Text style={styles.categoryTitleAr}>{category.categoryAr}</Text>
            </View>
            {category.items.map((item, itemIdx) => (
              <TouchableOpacity
                key={itemIdx}
                style={styles.resourceItem}
                onPress={() => item.web && handleWeb(item.web)}
                disabled={!item.web}
                activeOpacity={item.web ? 0.7 : 1}
              >
                <View style={styles.resourceInfo}>
                  <Text style={styles.resourceName}>{item.name}</Text>
                  <Text style={styles.resourceNameAr}>{item.nameAr}</Text>
                  <Text style={styles.resourceDesc}>{item.desc}</Text>
                  <Text style={styles.resourceDescAr}>{item.descAr}</Text>
                </View>
                {item.web && (
                  <Ionicons name="open-outline" size={20} color="#000" />
                )}
              </TouchableOpacity>
            ))}
          </View>
        ))}
      </ExpandableSection>

      {/* Guías Prácticas */}
      <ExpandableSection
        title="Guías Prácticas Paso a Paso"
        titleAr="أدلة عملية خطوة بخطوة"
        icon="list"
      >
        {PRACTICAL_GUIDES.map((guide, idx) => (
          <View key={idx} style={styles.guideCard}>
            <View style={styles.guideHeader}>
              <Ionicons name={guide.icon as any} size={22} color="#000" />
              <View style={styles.guideTitles}>
                <Text style={styles.guideTitle}>{guide.title}</Text>
                <Text style={styles.guideTitleAr}>{guide.titleAr}</Text>
              </View>
            </View>
            {guide.steps.map((step, stepIdx) => (
              <View key={stepIdx} style={styles.stepRow}>
                <View style={styles.stepNumber}>
                  <Text style={styles.stepNumberText}>{stepIdx + 1}</Text>
                </View>
                <View style={styles.stepContent}>
                  <Text style={styles.stepTextEs}>{step.es}</Text>
                  <Text style={styles.stepTextAr}>{step.ar}</Text>
                </View>
              </View>
            ))}
          </View>
        ))}
      </ExpandableSection>

      {/* Ayudas Económicas */}
      <ExpandableSection
        title="Ayudas Económicas Disponibles"
        titleAr="المساعدات المالية المتاحة"
        icon="cash"
      >
        {ECONOMIC_AIDS.map((aid, idx) => (
          <View key={idx} style={styles.aidCard}>
            <Text style={styles.aidName}>{aid.name}</Text>
            <Text style={styles.aidNameAr}>{aid.nameAr}</Text>
            <Text style={styles.aidDesc}>{aid.desc}</Text>
            <Text style={styles.aidDescAr}>{aid.descAr}</Text>
            <View style={styles.aidRequirements}>
              <Text style={styles.aidReqLabel}>Requisitos:</Text>
              <Text style={styles.aidReqText}>{aid.requirements}</Text>
              <Text style={styles.aidReqTextAr}>{aid.requirementsAr}</Text>
            </View>
            {aid.web && (
              <TouchableOpacity
                style={styles.aidButton}
                onPress={() => handleWeb(aid.web)}
              >
                <Ionicons name="open-outline" size={16} color="#fff" />
                <Text style={styles.aidButtonText}>Más información</Text>
              </TouchableOpacity>
            )}
          </View>
        ))}
      </ExpandableSection>

      {/* Vocabulario Útil */}
      <ExpandableSection
        title="Vocabulario Útil de Emergencia"
        titleAr="مفردات مفيدة للطوارئ"
        icon="language"
      >
        <View style={styles.vocabGrid}>
          {USEFUL_VOCABULARY.map((word, idx) => (
            <View key={idx} style={styles.vocabCard}>
              <Text style={styles.vocabEs}>{word.es}</Text>
              <Text style={styles.vocabPronunciation}>[{word.pronunciation}]</Text>
              <Text style={styles.vocabAr}>{word.ar}</Text>
            </View>
          ))}
        </View>
      </ExpandableSection>

      {/* Testimonios */}
      <ExpandableSection
        title="Historias de Éxito"
        titleAr="قصص نجاح"
        icon="star"
      >
        {TESTIMONIALS.map((testimony, idx) => (
          <View key={idx} style={styles.testimonyCard}>
            <View style={styles.testimonyHeader}>
              <View style={styles.testimonyAvatar}>
                <Text style={styles.testimonyAvatarText}>{testimony.name[0]}</Text>
              </View>
              <View>
                <Text style={styles.testimonyName}>{testimony.name}</Text>
                <Text style={styles.testimonyCountry}>{testimony.country} / {testimony.countryAr}</Text>
              </View>
            </View>
            <Text style={styles.testimonyText}>"{testimony.text}"</Text>
            <Text style={styles.testimonyTextAr}>"{testimony.textAr}"</Text>
          </View>
        ))}
      </ExpandableSection>

      {/* Cocina y Recetas */}
      <ExpandableSection
        title="Cocina y Recetas Españolas"
        titleAr="المطبخ والوصفات الإسبانية"
        icon="restaurant"
      >
        <View style={styles.recetasIntro}>
          <Text style={styles.recetasIntroText}>
            Recetas tradicionales españolas sin cerdo, adaptadas para todos los gustos.
          </Text>
          <Text style={styles.recetasIntroTextAr}>
            وصفات إسبانية تقليدية بدون لحم الخنزير، مناسبة لجميع الأذواق.
          </Text>
        </View>
        {RECETAS.map((receta, idx) => (
          <View key={idx} style={styles.recetaCard}>
            <View style={styles.recetaHeader}>
              <View style={styles.recetaHeaderText}>
                <Text style={styles.recetaNombre}>{receta.nombre}</Text>
                <Text style={styles.recetaNombreAr}>{receta.nombreAr}</Text>
              </View>
              <View style={styles.recetaInfo}>
                <Ionicons name="time-outline" size={16} color="#000" />
                <Text style={styles.recetaTiempo}>{receta.tiempo}</Text>
                <Text style={styles.recetaTiempoAr}>{receta.tiempoAr}</Text>
              </View>
              <View style={styles.recetaInfo}>
                <Ionicons name="people-outline" size={16} color="#000" />
                <Text style={styles.recetaPersonas}>{receta.personas}</Text>
                <Text style={styles.recetaPersonasAr}>{receta.personasAr}</Text>
              </View>
            </View>
            <View style={styles.recetaImagenContainer}>
              <Image
                source={{ uri: receta.imagen }}
                style={styles.recetaImagen}
                resizeMode="cover"
              />
            </View>
            <View style={styles.recetaIngredientes}>
              <Text style={styles.recetaSubtitulo}>
                <Ionicons name="list-outline" size={18} color="#000" /> Ingredientes / المكونات:
              </Text>
              {receta.ingredientes.map((ing, ingIdx) => (
                <View key={ingIdx} style={styles.ingredienteItem}>
                  <Text style={styles.ingredienteText}>• {ing.es}</Text>
                  <Text style={styles.ingredienteTextAr}>{ing.ar}</Text>
                </View>
              ))}
            </View>
            <View style={styles.recetaPasos}>
              <Text style={styles.recetaSubtitulo}>
                <Ionicons name="restaurant-outline" size={18} color="#000" /> Preparación / التحضير:
              </Text>
              {receta.pasos.map((paso, pasoIdx) => (
                <View key={pasoIdx} style={styles.pasoItem}>
                  <View style={styles.pasoNumero}>
                    <Text style={styles.pasoNumeroText}>{pasoIdx + 1}</Text>
                  </View>
                  <View style={styles.pasoContenido}>
                    <Text style={styles.pasoTexto}>{paso.es}</Text>
                    <Text style={styles.pasoTextoAr}>{paso.ar}</Text>
                  </View>
                </View>
              ))}
            </View>
          </View>
        ))}
      </ExpandableSection>

      {/* Digitalízate */}
      <ExpandableSection
        title="Digitalízate - Aprende a Usar la Tecnología"
        titleAr="رقمن - تعلمي استخدام التكنولوجيا"
        icon="laptop"
        defaultExpanded={false}
      >
        <View style={styles.digitalIntro}>
          <Text style={styles.digitalIntroText}>
            Aprende sobre las Sedes Electrónicas, cómo crear tu clave digital y certificado digital para realizar trámites online con las administraciones públicas.
          </Text>
          <Text style={styles.digitalIntroTextAr}>
            تعلمي عن المقار الإلكترونية وكيفية إنشاء المفتاح الرقمي والشهادة الرقمية لإجراء المعاملات عبر الإنترنت مع الإدارات العامة.
          </Text>
        </View>

        {/* Sede Electrónica */}
        <View style={styles.digitalSection}>
          <View style={styles.digitalSectionHeader}>
            <Ionicons name="globe-outline" size={24} color="#000" />
            <Text style={styles.digitalSectionTitle}>Sede Electrónica / المقر الإلكتروني</Text>
            <Text style={styles.digitalSectionTitleAr}>المقر الإلكتروني</Text>
          </View>
          <View style={styles.digitalContent}>
            <Text style={styles.digitalSubtitle}>¿Qué es una Sede Electrónica? / ما هو المقر الإلكتروني؟</Text>
            <Text style={styles.digitalText}>
              Una Sede Electrónica es la página web oficial de una administración pública (gobierno, ayuntamiento, ministerio) donde puedes realizar trámites y gestiones sin necesidad de acudir presencialmente a las oficinas.
            </Text>
            <Text style={styles.digitalTextAr}>
              المقر الإلكتروني هو الموقع الرسمي لإدارة عامة (حكومة، بلدية، وزارة) حيث يمكنك إجراء المعاملات والإجراءات دون الحاجة للذهاب شخصياً إلى المكاتب.
            </Text>

            <Text style={styles.digitalSubtitle}>¿Para qué sirve? / ما فائدتها؟</Text>
            <View style={styles.digitalList}>
              <View style={styles.digitalListItem}>
                <Ionicons name="checkmark-circle" size={18} color="#000" />
                <View style={styles.digitalListItemContent}>
                  <Text style={styles.digitalListItemText}>Realizar trámites las 24 horas, todos los días</Text>
                  <Text style={styles.digitalListItemTextAr}>إجراء المعاملات على مدار الساعة طوال أيام الأسبوع</Text>
                </View>
              </View>
              <View style={styles.digitalListItem}>
                <Ionicons name="checkmark-circle" size={18} color="#000" />
                <View style={styles.digitalListItemContent}>
                  <Text style={styles.digitalListItemText}>Ahorrar tiempo y desplazamientos</Text>
                  <Text style={styles.digitalListItemTextAr}>توفير الوقت والتنقل</Text>
                </View>
              </View>
              <View style={styles.digitalListItem}>
                <Ionicons name="checkmark-circle" size={18} color="#000" />
                <View style={styles.digitalListItemContent}>
                  <Text style={styles.digitalListItemText}>Consultar el estado de tus trámites en tiempo real</Text>
                  <Text style={styles.digitalListItemTextAr}>الاستعلام عن حالة معاملاتك في الوقت الفعلي</Text>
                </View>
              </View>
              <View style={styles.digitalListItem}>
                <Ionicons name="checkmark-circle" size={18} color="#000" />
                <View style={styles.digitalListItemContent}>
                  <Text style={styles.digitalListItemText}>Descargar certificados y documentos oficiales</Text>
                  <Text style={styles.digitalListItemTextAr}>تحميل الشهادات والمستندات الرسمية</Text>
                </View>
              </View>
              <View style={styles.digitalListItem}>
                <Ionicons name="checkmark-circle" size={18} color="#000" />
                <View style={styles.digitalListItemContent}>
                  <Text style={styles.digitalListItemText}>Presentar solicitudes y recibir notificaciones</Text>
                  <Text style={styles.digitalListItemTextAr}>تقديم الطلبات واستلام الإشعارات</Text>
                </View>
              </View>
            </View>

            <Text style={styles.digitalSubtitle}>Administraciones con Sede Electrónica / الإدارات التي لديها مقر إلكتروني:</Text>
            <Text style={styles.digitalText}>
              Todas las administraciones públicas en España tienen su Sede Electrónica. Las más importantes son:
            </Text>
            <Text style={styles.digitalTextAr}>
              جميع الإدارات العامة في إسبانيا لديها مقرها الإلكتروني. أهمها:
            </Text>

            <View style={styles.digitalAdminList}>
              {/* Administración General del Estado */}
              <TouchableOpacity
                style={styles.digitalAdminCard}
                onPress={() => handleWeb("https://administracion.gob.es/")}
              >
                <Ionicons name="business-outline" size={24} color="#000" />
                <View style={styles.digitalAdminContent}>
                  <Text style={styles.digitalAdminTitle}>Administración General del Estado</Text>
                  <Text style={styles.digitalAdminTitleAr}>الإدارة العامة للدولة</Text>
                  <Text style={styles.digitalAdminDesc}>Trámites del gobierno central</Text>
                  <Text style={styles.digitalAdminDescAr}>معاملات الحكومة المركزية</Text>
                  <Text style={styles.digitalAdminLink}>administracion.gob.es</Text>
                </View>
                <Ionicons name="open-outline" size={20} color="#000" />
              </TouchableOpacity>

              {/* Seguridad Social */}
              <TouchableOpacity
                style={styles.digitalAdminCard}
                onPress={() => handleWeb("https://sede.seg-social.gob.es/")}
              >
                <Ionicons name="shield-checkmark-outline" size={24} color="#000" />
                <View style={styles.digitalAdminContent}>
                  <Text style={styles.digitalAdminTitle}>Seguridad Social</Text>
                  <Text style={styles.digitalAdminTitleAr}>الضمان الاجتماعي</Text>
                  <Text style={styles.digitalAdminDesc}>Pensiones, prestaciones, vida laboral</Text>
                  <Text style={styles.digitalAdminDescAr}>المعاشات والمزايا والتاريخ المهني</Text>
                  <Text style={styles.digitalAdminLink}>sede.seg-social.gob.es</Text>
                </View>
                <Ionicons name="open-outline" size={20} color="#000" />
              </TouchableOpacity>

              {/* Hacienda (AEAT) */}
              <TouchableOpacity
                style={styles.digitalAdminCard}
                onPress={() => handleWeb("https://sede.agenciatributaria.gob.es/")}
              >
                <Ionicons name="cash-outline" size={24} color="#000" />
                <View style={styles.digitalAdminContent}>
                  <Text style={styles.digitalAdminTitle}>Agencia Tributaria (Hacienda)</Text>
                  <Text style={styles.digitalAdminTitleAr}>وكالة الضرائب</Text>
                  <Text style={styles.digitalAdminDesc}>Declaración de la renta, impuestos</Text>
                  <Text style={styles.digitalAdminDescAr}>الإقرار الضريبي والضرائب</Text>
                  <Text style={styles.digitalAdminLink}>sede.agenciatributaria.gob.es</Text>
                </View>
                <Ionicons name="open-outline" size={20} color="#000" />
              </TouchableOpacity>

              {/* SEPE */}
              <TouchableOpacity
                style={styles.digitalAdminCard}
                onPress={() => handleWeb("https://sede.sepe.gob.es/")}
              >
                <Ionicons name="briefcase-outline" size={24} color="#000" />
                <View style={styles.digitalAdminContent}>
                  <Text style={styles.digitalAdminTitle}>SEPE (Servicio de Empleo)</Text>
                  <Text style={styles.digitalAdminTitleAr}>SEPE (خدمة التوظيف)</Text>
                  <Text style={styles.digitalAdminDesc}>Prestaciones por desempleo, ofertas de trabajo</Text>
                  <Text style={styles.digitalAdminDescAr}>مزايا البطالة وعروض العمل</Text>
                  <Text style={styles.digitalAdminLink}>sede.sepe.gob.es</Text>
                </View>
                <Ionicons name="open-outline" size={20} color="#000" />
              </TouchableOpacity>

              {/* Ministerio de Inclusión */}
              <TouchableOpacity
                style={styles.digitalAdminCard}
                onPress={() => handleWeb("https://sede.administracionespublicas.gob.es/")}
              >
                <Ionicons name="people-outline" size={24} color="#000" />
                <View style={styles.digitalAdminContent}>
                  <Text style={styles.digitalAdminTitle}>Ministerio de Inclusión</Text>
                  <Text style={styles.digitalAdminTitleAr}>وزارة الإدماج</Text>
                  <Text style={styles.digitalAdminDesc}>Trámites de extranjería e inmigración</Text>
                  <Text style={styles.digitalAdminDescAr}>معاملات الأجانب والهجرة</Text>
                  <Text style={styles.digitalAdminLink}>sede.administracionespublicas.gob.es</Text>
                </View>
                <Ionicons name="open-outline" size={20} color="#000" />
              </TouchableOpacity>

              {/* Dirección General de Tráfico */}
              <TouchableOpacity
                style={styles.digitalAdminCard}
                onPress={() => handleWeb("https://sede.dgt.gob.es/")}
              >
                <Ionicons name="car-outline" size={24} color="#000" />
                <View style={styles.digitalAdminContent}>
                  <Text style={styles.digitalAdminTitle}>DGT (Tráfico)</Text>
                  <Text style={styles.digitalAdminTitleAr}>DGT (المرور)</Text>
                  <Text style={styles.digitalAdminDesc}>Multas, permiso de conducir, vehículos</Text>
                  <Text style={styles.digitalAdminDescAr}>المخالفات ورخصة القيادة والمركبات</Text>
                  <Text style={styles.digitalAdminLink}>sede.dgt.gob.es</Text>
                </View>
                <Ionicons name="open-outline" size={20} color="#000" />
              </TouchableOpacity>

              {/* Ministerio de Justicia */}
              <TouchableOpacity
                style={styles.digitalAdminCard}
                onPress={() => handleWeb("https://sede.mjusticia.gob.es/")}
              >
                <Ionicons name="scale-outline" size={24} color="#000" />
                <View style={styles.digitalAdminContent}>
                  <Text style={styles.digitalAdminTitle}>Ministerio de Justicia</Text>
                  <Text style={styles.digitalAdminTitleAr}>وزارة العدل</Text>
                  <Text style={styles.digitalAdminDesc}>Registro civil, certificados de nacimiento, matrimonio</Text>
                  <Text style={styles.digitalAdminDescAr}>السجل المدني وشهادات الميلاد والزواج</Text>
                  <Text style={styles.digitalAdminLink}>sede.mjusticia.gob.es</Text>
                </View>
                <Ionicons name="open-outline" size={20} color="#000" />
              </TouchableOpacity>

              {/* Portal de Administración Electrónica */}
              <TouchableOpacity
                style={styles.digitalAdminCard}
                onPress={() => handleWeb("https://administracion.gob.es/")}
              >
                <Ionicons name="grid-outline" size={24} color="#000" />
                <View style={styles.digitalAdminContent}>
                  <Text style={styles.digitalAdminTitle}>Portal Administración Electrónica</Text>
                  <Text style={styles.digitalAdminTitleAr}>بوابة الإدارة الإلكترونية</Text>
                  <Text style={styles.digitalAdminDesc}>Acceso a todas las sedes electrónicas</Text>
                  <Text style={styles.digitalAdminDescAr}>الوصول إلى جميع المقار الإلكترونية</Text>
                  <Text style={styles.digitalAdminLink}>administracion.gob.es</Text>
                </View>
                <Ionicons name="open-outline" size={20} color="#000" />
              </TouchableOpacity>
            </View>

            <Text style={styles.digitalSubtitle}>Ayuntamientos / البلديات:</Text>
            <Text style={styles.digitalText}>
              Cada ayuntamiento tiene su propia Sede Electrónica. Busca en internet: "Sede Electrónica [nombre de tu ciudad]"
            </Text>
            <Text style={styles.digitalTextAr}>
              كل بلدية لديها مقرها الإلكتروني الخاص. ابحثي على الإنترنت: "Sede Electrónica [اسم مدينتك]"
            </Text>
          </View>
        </View>

        {/* Clave Digital */}
        <View style={styles.digitalSection}>
          <View style={styles.digitalSectionHeader}>
            <Ionicons name="key-outline" size={24} color="#000" />
            <Text style={styles.digitalSectionTitle}>Clave Digital / المفتاح الرقمي</Text>
            <Text style={styles.digitalSectionTitleAr}>المفتاح الرقمي</Text>
          </View>
          <View style={styles.digitalContent}>
            <Text style={styles.digitalSubtitle}>¿Qué es la Clave Digital? / ما هو المفتاح الرقمي؟</Text>
            <Text style={styles.digitalText}>
              La Clave Digital es un sistema del Gobierno de España que te permite identificarte de forma segura en las páginas web oficiales sin necesidad de acudir presencialmente a las oficinas.
            </Text>
            <Text style={styles.digitalTextAr}>
              المفتاح الرقمي هو نظام من حكومة إسبانيا يسمح لك بالتعريف بنفسك بشكل آمن على المواقع الرسمية دون الحاجة للذهاب شخصياً إلى المكاتب.
            </Text>

            <Text style={styles.digitalSubtitle}>¿Cómo crear tu Clave Digital? / كيف تنشئين مفتاحك الرقمي؟</Text>
            <View style={styles.digitalSteps}>
              <View style={styles.digitalStep}>
                <View style={styles.digitalStepNumber}>
                  <Text style={styles.digitalStepNumberText}>1</Text>
                </View>
                <View style={styles.digitalStepContent}>
                  <Text style={styles.digitalStepText}>Ve a la página: www.clave.gob.es</Text>
                  <Text style={styles.digitalStepTextAr}>اذهبي إلى الموقع: www.clave.gob.es</Text>
                </View>
              </View>
              <View style={styles.digitalStep}>
                <View style={styles.digitalStepNumber}>
                  <Text style={styles.digitalStepNumberText}>2</Text>
                </View>
                <View style={styles.digitalStepContent}>
                  <Text style={styles.digitalStepText}>Haz clic en "Registrarse" o "Crear cuenta"</Text>
                  <Text style={styles.digitalStepTextAr}>انقري على "تسجيل" أو "إنشاء حساب"</Text>
                </View>
              </View>
              <View style={styles.digitalStep}>
                <View style={styles.digitalStepNumber}>
                  <Text style={styles.digitalStepNumberText}>3</Text>
                </View>
                <View style={styles.digitalStepContent}>
                  <Text style={styles.digitalStepText}>Introduce tu DNI o NIE y fecha de nacimiento</Text>
                  <Text style={styles.digitalStepTextAr}>أدخلي رقم DNI أو NIE وتاريخ الميلاد</Text>
                </View>
              </View>
              <View style={styles.digitalStep}>
                <View style={styles.digitalStepNumber}>
                  <Text style={styles.digitalStepNumberText}>4</Text>
                </View>
                <View style={styles.digitalStepContent}>
                  <Text style={styles.digitalStepText}>Elige un número de teléfono móvil o correo electrónico</Text>
                  <Text style={styles.digitalStepTextAr}>اختاري رقم هاتف محمول أو بريد إلكتروني</Text>
                </View>
              </View>
              <View style={styles.digitalStep}>
                <View style={styles.digitalStepNumber}>
                  <Text style={styles.digitalStepNumberText}>5</Text>
                </View>
                <View style={styles.digitalStepContent}>
                  <Text style={styles.digitalStepText}>Recibirás un código por SMS o email. Introdúcelo</Text>
                  <Text style={styles.digitalStepTextAr}>ستتلقين رمزاً عبر الرسائل النصية أو البريد الإلكتروني. أدخليه</Text>
                </View>
              </View>
              <View style={styles.digitalStep}>
                <View style={styles.digitalStepNumber}>
                  <Text style={styles.digitalStepNumberText}>6</Text>
                </View>
                <View style={styles.digitalStepContent}>
                  <Text style={styles.digitalStepText}>Crea una contraseña segura (mínimo 8 caracteres, con mayúsculas, minúsculas y números)</Text>
                  <Text style={styles.digitalStepTextAr}>أنشئي كلمة مرور آمنة (8 أحرف على الأقل، بأحرف كبيرة وصغيرة وأرقام)</Text>
                </View>
              </View>
              <View style={styles.digitalStep}>
                <View style={styles.digitalStepNumber}>
                  <Text style={styles.digitalStepNumberText}>7</Text>
                </View>
                <View style={styles.digitalStepContent}>
                  <Text style={styles.digitalStepText}>¡Ya tienes tu Clave Digital! Puedes usarla en todas las páginas oficiales</Text>
                  <Text style={styles.digitalStepTextAr}>الآن لديك مفتاحك الرقمي! يمكنك استخدامه في جميع المواقع الرسمية</Text>
                </View>
              </View>
            </View>

            <TouchableOpacity
              style={styles.digitalButton}
              onPress={() => handleWeb("https://www.clave.gob.es/")}
            >
              <Ionicons name="open-outline" size={18} color="#fff" />
              <Text style={styles.digitalButtonText}>Ir a Clave Digital</Text>
              <Text style={styles.digitalButtonTextAr}>اذهبي إلى المفتاح الرقمي</Text>
            </TouchableOpacity>
          </View>
        </View>

        {/* Certificado Digital */}
        <View style={styles.digitalSection}>
          <View style={styles.digitalSectionHeader}>
            <Ionicons name="document-text-outline" size={24} color="#000" />
            <Text style={styles.digitalSectionTitle}>Certificado Digital / الشهادة الرقمية</Text>
            <Text style={styles.digitalSectionTitleAr}>الشهادة الرقمية</Text>
          </View>
          <View style={styles.digitalContent}>
            <Text style={styles.digitalSubtitle}>¿Qué es un Certificado Digital? / ما هي الشهادة الرقمية؟</Text>
            <Text style={styles.digitalText}>
              El Certificado Digital es como tu DNI electrónico. Es un archivo que instalas en tu ordenador que te permite identificarte de forma segura en internet y firmar documentos digitales sin estar presente físicamente.
            </Text>
            <Text style={styles.digitalTextAr}>
              الشهادة الرقمية مثل بطاقة الهوية الإلكترونية. هي ملف تقومين بتثبيته على الكمبيوتر يسمح لك بالتعريف بنفسك بشكل آمن على الإنترنت والتوقيع على المستندات الرقمية دون الحضور جسدياً.
            </Text>

            <Text style={styles.digitalSubtitle}>¿Para qué sirve? / ما فائدتها؟</Text>
            <View style={styles.digitalList}>
              <View style={styles.digitalListItem}>
                <Text style={styles.digitalBullet}>✓</Text>
                <View style={styles.digitalListItemContent}>
                  <Text style={styles.digitalListItemText}>Realizar trámites online sin ir a oficinas</Text>
                  <Text style={styles.digitalListItemTextAr}>إجراء المعاملات عبر الإنترنت دون الذهاب إلى المكاتب</Text>
                </View>
              </View>
              <View style={styles.digitalListItem}>
                <Text style={styles.digitalBullet}>✓</Text>
                <View style={styles.digitalListItemContent}>
                  <Text style={styles.digitalListItemText}>Firmar documentos digitales</Text>
                  <Text style={styles.digitalListItemTextAr}>التوقيع على المستندات الرقمية</Text>
                </View>
              </View>
              <View style={styles.digitalListItem}>
                <Text style={styles.digitalBullet}>✓</Text>
                <View style={styles.digitalListItemContent}>
                  <Text style={styles.digitalListItemText}>Acceder a tu historial laboral y seguridad social</Text>
                  <Text style={styles.digitalListItemTextAr}>الوصول إلى تاريخك المهني والضمان الاجتماعي</Text>
                </View>
              </View>
              <View style={styles.digitalListItem}>
                <Text style={styles.digitalBullet}>✓</Text>
                <View style={styles.digitalListItemContent}>
                  <Text style={styles.digitalListItemText}>Presentar la declaración de la renta online</Text>
                  <Text style={styles.digitalListItemTextAr}>تقديم الإقرار الضريبي عبر الإنترنت</Text>
                </View>
              </View>
            </View>

            <Text style={styles.digitalSubtitle}>Etapas para crear un Certificado Digital / مراحل إنشاء الشهادة الرقمية:</Text>
            <View style={styles.digitalSteps}>
              <View style={styles.digitalStep}>
                <View style={styles.digitalStepNumber}>
                  <Text style={styles.digitalStepNumberText}>1</Text>
                </View>
                <View style={styles.digitalStepContent}>
                  <Text style={styles.digitalStepText}>Ve a la página: www.sede.fnmt.gob.es</Text>
                  <Text style={styles.digitalStepTextAr}>اذهبي إلى الموقع: www.sede.fnmt.gob.es</Text>
                </View>
              </View>
              <View style={styles.digitalStep}>
                <View style={styles.digitalStepNumber}>
                  <Text style={styles.digitalStepNumberText}>2</Text>
                </View>
                <View style={styles.digitalStepContent}>
                  <Text style={styles.digitalStepText}>Haz clic en "Solicitar Certificado" o "Obtener Certificado Software"</Text>
                  <Text style={styles.digitalStepTextAr}>انقري على "طلب الشهادة" أو "الحصول على شهادة برمجية"</Text>
                </View>
              </View>
              <View style={styles.digitalStep}>
                <View style={styles.digitalStepNumber}>
                  <Text style={styles.digitalStepNumberText}>3</Text>
                </View>
                <View style={styles.digitalStepContent}>
                  <Text style={styles.digitalStepText}>Introduce tu DNI o NIE y datos personales (nombre, apellidos, email)</Text>
                  <Text style={styles.digitalStepTextAr}>أدخلي رقم DNI أو NIE والبيانات الشخصية (الاسم، اللقب، البريد الإلكتروني)</Text>
                </View>
              </View>
              <View style={styles.digitalStep}>
                <View style={styles.digitalStepNumber}>
                  <Text style={styles.digitalStepNumberText}>4</Text>
                </View>
                <View style={styles.digitalStepContent}>
                  <Text style={styles.digitalStepText}>Recibirás un código de solicitud por email. Guárdalo</Text>
                  <Text style={styles.digitalStepTextAr}>ستتلقين رمز طلب عبر البريد الإلكتروني. احتفظي به</Text>
                </View>
              </View>
              <View style={styles.digitalStep}>
                <View style={styles.digitalStepNumber}>
                  <Text style={styles.digitalStepNumberText}>5</Text>
                </View>
                <View style={styles.digitalStepContent}>
                  <Text style={styles.digitalStepText}>Debes ir personalmente a una oficina de acreditación (Registro Civil, Ayuntamiento, Oficinas de la FNMT) con tu DNI/NIE y el código</Text>
                  <Text style={styles.digitalStepTextAr}>يجب أن تذهبي شخصياً إلى مكتب اعتماد (السجل المدني، البلدية، مكاتب FNMT) مع DNI/NIE والرمز</Text>
                </View>
              </View>
              <View style={styles.digitalStep}>
                <View style={styles.digitalStepNumber}>
                  <Text style={styles.digitalStepNumberText}>6</Text>
                </View>
                <View style={styles.digitalStepContent}>
                  <Text style={styles.digitalStepText}>En la oficina, te identifican y activan tu solicitud</Text>
                  <Text style={styles.digitalStepTextAr}>في المكتب، يقومون بتعريفك وتفعيل طلبك</Text>
                </View>
              </View>
              <View style={styles.digitalStep}>
                <View style={styles.digitalStepNumber}>
                  <Text style={styles.digitalStepNumberText}>7</Text>
                </View>
                <View style={styles.digitalStepContent}>
                  <Text style={styles.digitalStepText}>Espera 1-2 horas y vuelve a la página web. Haz clic en "Descargar Certificado"</Text>
                  <Text style={styles.digitalStepTextAr}>انتظري 1-2 ساعة وارجعي إلى الموقع. انقري على "تحميل الشهادة"</Text>
                </View>
              </View>
              <View style={styles.digitalStep}>
                <View style={styles.digitalStepNumber}>
                  <Text style={styles.digitalStepNumberText}>8</Text>
                </View>
                <View style={styles.digitalStepContent}>
                  <Text style={styles.digitalStepText}>El certificado se instalará en tu navegador automáticamente. ¡Listo!</Text>
                  <Text style={styles.digitalStepTextAr}>ستتم تثبيت الشهادة في متصفحك تلقائياً. جاهز!</Text>
                </View>
              </View>
            </View>

            <Text style={styles.digitalSubtitle}>Trámites donde puedes usar el Certificado Digital / المعاملات التي يمكنك استخدام الشهادة الرقمية فيها:</Text>
            <View style={styles.digitalList}>
              <View style={styles.digitalListItem}>
                <Ionicons name="checkmark-circle" size={18} color="#000" />
                <View style={styles.digitalListItemContent}>
                  <Text style={styles.digitalListItemText}>Declaración de la Renta (Hacienda)</Text>
                  <Text style={styles.digitalListItemTextAr}>الإقرار الضريبي (الضرائب)</Text>
                </View>
              </View>
              <View style={styles.digitalListItem}>
                <Ionicons name="checkmark-circle" size={18} color="#000" />
                <View style={styles.digitalListItemContent}>
                  <Text style={styles.digitalListItemText}>Consulta de vida laboral (SEPE)</Text>
                  <Text style={styles.digitalListItemTextAr}>الاستعلام عن التاريخ المهني (SEPE)</Text>
                </View>
              </View>
              <View style={styles.digitalListItem}>
                <Ionicons name="checkmark-circle" size={18} color="#000" />
                <View style={styles.digitalListItemContent}>
                  <Text style={styles.digitalListItemText}>Certificados de empadronamiento</Text>
                  <Text style={styles.digitalListItemTextAr}>شهادات التسجيل في البلدية</Text>
                </View>
              </View>
              <View style={styles.digitalListItem}>
                <Ionicons name="checkmark-circle" size={18} color="#000" />
                <View style={styles.digitalListItemContent}>
                  <Text style={styles.digitalListItemText}>Solicitud de ayudas y prestaciones</Text>
                  <Text style={styles.digitalListItemTextAr}>طلب المساعدات والمزايا</Text>
                </View>
              </View>
              <View style={styles.digitalListItem}>
                <Ionicons name="checkmark-circle" size={18} color="#000" />
                <View style={styles.digitalListItemContent}>
                  <Text style={styles.digitalListItemText}>Trámites con Seguridad Social</Text>
                  <Text style={styles.digitalListItemTextAr}>المعاملات مع الضمان الاجتماعي</Text>
                </View>
              </View>
              <View style={styles.digitalListItem}>
                <Ionicons name="checkmark-circle" size={18} color="#000" />
                <View style={styles.digitalListItemContent}>
                  <Text style={styles.digitalListItemText}>Consulta de multas de tráfico</Text>
                  <Text style={styles.digitalListItemTextAr}>الاستعلام عن مخالفات المرور</Text>
                </View>
              </View>
              <View style={styles.digitalListItem}>
                <Ionicons name="checkmark-circle" size={18} color="#000" />
                <View style={styles.digitalListItemContent}>
                  <Text style={styles.digitalListItemText}>Firma de documentos oficiales</Text>
                  <Text style={styles.digitalListItemTextAr}>التوقيع على المستندات الرسمية</Text>
                </View>
              </View>
            </View>

            <TouchableOpacity
              style={styles.digitalButton}
              onPress={() => handleWeb("https://www.sede.fnmt.gob.es/")}
            >
              <Ionicons name="open-outline" size={18} color="#fff" />
              <Text style={styles.digitalButtonText}>Obtener Certificado Digital</Text>
              <Text style={styles.digitalButtonTextAr}>الحصول على الشهادة الرقمية</Text>
            </TouchableOpacity>
          </View>
        </View>
      </ExpandableSection>

      {/* Organizaciones de Apoyo */}
      <ExpandableSection
        title="Organizaciones de Apoyo"
        titleAr="منظمات الدعم"
        icon="people"
      >
        {ORGANIZATIONS.map((org, idx) => (
          <View key={idx} style={styles.orgCard}>
            <Text style={styles.orgName}>{org.name}</Text>
            <Text style={styles.orgNameAr}>{org.nameAr}</Text>
            <Text style={styles.orgDesc}>{org.desc}</Text>
            <Text style={styles.orgDescAr}>{org.descAr}</Text>
            <View style={styles.orgActions}>
              {org.web && (
                <TouchableOpacity
                  style={styles.orgButton}
                  onPress={() => handleWeb(org.web)}
                >
                  <Ionicons name="globe-outline" size={18} color="#fff" />
                  <Text style={styles.orgButtonText}>Web</Text>
                </TouchableOpacity>
              )}
              {org.phone && (
                <TouchableOpacity
                  style={[styles.orgButton, { backgroundColor: "#4caf50" }]}
                  onPress={() => handleCall(org.phone)}
                >
                  <Ionicons name="call-outline" size={18} color="#fff" />
                  <Text style={styles.orgButtonText}>{org.phone}</Text>
                </TouchableOpacity>
              )}
            </View>
          </View>
        ))}
      </ExpandableSection>

      {/* Revista para Mujeres Inmigrantes */}
      <ExpandableSection
        title="Revista Digital - Noticias y Artículos"
        titleAr="مجلة رقمية - أخبار ومقالات"
        icon="newspaper"
        defaultExpanded={true}
      >
        <View style={styles.revistaHeader}>
          <Text style={styles.revistaDescription}>
            Artículos y noticias actualizadas sobre mujeres, inmigración y derechos.
          </Text>
          <Text style={styles.revistaDescriptionAr}>
            مقالات وأخبار محدثة حول النساء والهجرة والحقوق.
          </Text>
          <TouchableOpacity
            style={styles.refreshButton}
            onPress={onRefresh}
            disabled={refreshing}
          >
            <Ionicons name={refreshing ? "hourglass" : "refresh"} size={18} color="#fff" />
            <Text style={styles.refreshButtonText}>
              {refreshing ? "Actualizando..." : "Actualizar"}
            </Text>
          </TouchableOpacity>
        </View>

        {revistaLoading && !refreshing && (
          <View style={styles.loadingContainer}>
            <ActivityIndicator size="large" color="#79A890" />
            <Text style={styles.loadingText}>Cargando artículos...</Text>
          </View>
        )}

        {!revistaLoading && revistaArticles.length === 0 && (
          <View style={styles.emptyContainer}>
            <Ionicons name="newspaper-outline" size={48} color="#ccc" />
            <Text style={styles.emptyText}>No hay artículos disponibles en este momento</Text>
            <Text style={styles.emptyTextAr}>لا توجد مقالات متاحة في الوقت الحالي</Text>
          </View>
        )}

        {revistaArticles.length > 0 && (
          <View style={styles.articlesContainer}>
            {revistaArticles.map((article, idx) => (
              <TouchableOpacity
                key={idx}
                style={styles.articleCard}
                onPress={() => handleWeb(article.link)}
                activeOpacity={0.7}
              >
                <View style={styles.articleHeader}>
                  <View style={styles.articleCategory}>
                    <Text style={styles.articleCategoryText}>{article.categoria}</Text>
                    <Text style={styles.articleCategoryTextAr}>{article.categoriaAr}</Text>
                  </View>
                  <Ionicons name="open-outline" size={20} color="#000" />
                </View>
                <Text style={styles.articleTitle}>{article.title}</Text>
                <Text style={styles.articleSummary}>{article.summary}</Text>
                <View style={styles.articleFooter}>
                  <Text style={styles.articleSource}>{article.source}</Text>
                  {article.publishedAt && (
                    <Text style={styles.articleDate}>
                      {new Date(article.publishedAt).toLocaleDateString('es-ES', {
                        day: 'numeric',
                        month: 'short',
                        year: 'numeric',
                      })}
                    </Text>
                  )}
                </View>
              </TouchableOpacity>
            ))}
          </View>
        )}
      </ExpandableSection>

      {/* Mensaje de apoyo */}
      <View style={styles.supportMessage}>
        <Ionicons name="heart" size={24} color="#79A890" />
        <Text style={styles.supportText}>
          No estás sola. Hay recursos y personas dispuestas a ayudarte.
        </Text>
        <Text style={styles.supportTextAr}>
          أنتِ لستِ وحدك. هناك موارد وأشخاص مستعدون لمساعدتك.
        </Text>
      </View>

      <View style={{ height: 40 }} />
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#E8F5E9",
  },
  contentContainer: {
    padding: 18,
    paddingBottom: 40,
  },
  backBtn: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 14,
  },
  backText: {
    color: "#FFD700",
    fontWeight: "bold",
    fontSize: 16,
    marginLeft: 8,
  },
  headerGradient: {
    flexDirection: "row",
    alignItems: "center",
    padding: 20,
    borderRadius: 16,
    marginBottom: 20,
  },
  headerTextContainer: {
    marginLeft: 16,
    flex: 1,
  },
  mainTitle: {
    fontSize: 22,
    fontWeight: "bold",
    color: "#FFD700",
  },
  mainTitleAr: {
    fontSize: 20,
    fontWeight: "bold",
    color: "#FFD700",
    textAlign: "right",
    writingDirection: "rtl",
  },
  subtitle: {
    fontSize: 14,
    color: "#FFD700",
    marginTop: 4,
  },
  subtitleAr: {
    fontSize: 13,
    color: "#FFD700",
    textAlign: "right",
    writingDirection: "rtl",
  },
  emergencySection: {
    backgroundColor: "#fff",
    borderRadius: 12,
    padding: 16,
    marginBottom: 16,
    shadowColor: "#000",
    shadowOpacity: 0.08,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 8,
    elevation: 2,
  },
  emergencyTitle: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#d32f2f",
    marginBottom: 2,
  },
  emergencyTitleAr: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#d32f2f",
    textAlign: "right",
    writingDirection: "rtl",
    marginBottom: 12,
  },
  emergencyCard: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#000",
    borderRadius: 10,
    padding: 12,
    marginBottom: 10,
    borderLeftWidth: 4,
    borderWidth: 1,
    borderColor: "#FFD700",
  },
  emergencyIcon: {
    width: 44,
    height: 44,
    borderRadius: 22,
    justifyContent: "center",
    alignItems: "center",
    marginRight: 12,
  },
  emergencyInfo: {
    flex: 1,
  },
  emergencyName: {
    fontSize: 15,
    fontWeight: "bold",
    color: "#FFD700",
  },
  emergencyNameAr: {
    fontSize: 14,
    fontWeight: "bold",
    color: "#FFD700",
    textAlign: "right",
    writingDirection: "rtl",
  },
  emergencyDesc: {
    fontSize: 12,
    color: "#FFD700",
    marginTop: 2,
  },
  emergencyDescAr: {
    fontSize: 11,
    color: "#FFD700",
    textAlign: "right",
    writingDirection: "rtl",
  },
  sectionContainer: {
    backgroundColor: "#fff",
    borderRadius: 12,
    marginBottom: 16,
    shadowColor: "#000",
    shadowOpacity: 0.06,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 6,
    elevation: 1,
    overflow: "hidden",
  },
  sectionHeader: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    padding: 16,
    backgroundColor: "#fff",
  },
  sectionHeaderLeft: {
    flexDirection: "row",
    alignItems: "center",
    flex: 1,
  },
  sectionTitles: {
    marginLeft: 12,
    flex: 1,
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#000",
  },
  sectionTitleAr: {
    fontSize: 14,
    color: "#000",
    textAlign: "right",
    writingDirection: "rtl",
  },
  sectionContent: {
    padding: 16,
  },
  rightCard: {
    backgroundColor: "#F1F8F2",
    borderRadius: 10,
    padding: 14,
    marginBottom: 12,
  },
  rightHeader: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 8,
  },
  rightTitles: {
    marginLeft: 10,
    flex: 1,
  },
  rightTitle: {
    fontSize: 15,
    fontWeight: "bold",
    color: "#7b1fa2",
  },
  rightTitleAr: {
    fontSize: 14,
    color: "#000",
    textAlign: "right",
    writingDirection: "rtl",
  },
  rightContent: {
    fontSize: 14,
    color: "#333",
    lineHeight: 20,
  },
  rightContentAr: {
    fontSize: 13,
    color: "#666",
    textAlign: "right",
    writingDirection: "rtl",
    lineHeight: 20,
    marginTop: 4,
  },
  resourceCategory: {
    marginBottom: 16,
  },
  categoryHeader: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 10,
    flexWrap: "wrap",
  },
  categoryTitle: {
    fontSize: 15,
    fontWeight: "bold",
    color: "#7b1fa2",
    marginLeft: 8,
  },
  categoryTitleAr: {
    fontSize: 14,
    color: "#000",
    marginLeft: 8,
  },
  resourceItem: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#F1F8F2",
    borderRadius: 8,
    padding: 12,
    marginBottom: 8,
  },
  resourceInfo: {
    flex: 1,
  },
  resourceName: {
    fontSize: 14,
    fontWeight: "600",
    color: "#333",
  },
  resourceNameAr: {
    fontSize: 13,
    color: "#666",
    textAlign: "right",
    writingDirection: "rtl",
  },
  resourceDesc: {
    fontSize: 12,
    color: "#666",
    marginTop: 2,
  },
  resourceDescAr: {
    fontSize: 11,
    color: "#888",
    textAlign: "right",
    writingDirection: "rtl",
  },
  orgCard: {
    backgroundColor: "#F1F8F2",
    borderRadius: 10,
    padding: 14,
    marginBottom: 12,
  },
  orgName: {
    fontSize: 15,
    fontWeight: "bold",
    color: "#7b1fa2",
  },
  orgNameAr: {
    fontSize: 14,
    color: "#9DC3AA",
    textAlign: "right",
    writingDirection: "rtl",
  },
  orgDesc: {
    fontSize: 13,
    color: "#333",
    marginTop: 4,
  },
  orgDescAr: {
    fontSize: 12,
    color: "#666",
    textAlign: "right",
    writingDirection: "rtl",
    marginTop: 2,
  },
  orgActions: {
    flexDirection: "row",
    marginTop: 10,
    gap: 10,
  },
  orgButton: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#000",
    borderWidth: 1,
    borderColor: "#FFD700",
    paddingHorizontal: 12,
    paddingVertical: 8,
    borderRadius: 6,
    gap: 6,
  },
  orgButtonText: {
    color: "#FFD700",
    fontSize: 13,
    fontWeight: "600",
  },
  supportMessage: {
    backgroundColor: "#E8F5E9",
    borderRadius: 12,
    padding: 20,
    alignItems: "center",
    marginTop: 8,
  },
  supportText: {
    fontSize: 15,
    color: "#7b1fa2",
    textAlign: "center",
    marginTop: 8,
    fontWeight: "500",
  },
  supportTextAr: {
    fontSize: 14,
    color: "#000",
    textAlign: "center",
    marginTop: 4,
    writingDirection: "rtl",
  },
  guideCard: {
    backgroundColor: "#F1F8F2",
    borderRadius: 10,
    padding: 14,
    marginBottom: 16,
  },
  guideHeader: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 12,
  },
  guideTitles: {
    marginLeft: 10,
    flex: 1,
  },
  guideTitle: {
    fontSize: 15,
    fontWeight: "bold",
    color: "#7b1fa2",
  },
  guideTitleAr: {
    fontSize: 14,
    color: "#000",
    textAlign: "right",
    writingDirection: "rtl",
  },
  stepRow: {
    flexDirection: "row",
    alignItems: "flex-start",
    marginBottom: 10,
  },
  stepNumber: {
    width: 28,
    height: 28,
    borderRadius: 14,
    backgroundColor: "#000",
    justifyContent: "center",
    alignItems: "center",
    marginRight: 12,
  },
  stepNumberText: {
    color: "#FFD700",
    fontWeight: "bold",
    fontSize: 14,
  },
  stepContent: {
    flex: 1,
  },
  stepTextEs: {
    fontSize: 14,
    color: "#333",
  },
  stepTextAr: {
    fontSize: 13,
    color: "#666",
    textAlign: "right",
    writingDirection: "rtl",
    marginTop: 2,
  },
  aidCard: {
    backgroundColor: "#F1F8F2",
    borderRadius: 10,
    padding: 14,
    marginBottom: 12,
  },
  aidName: {
    fontSize: 15,
    fontWeight: "bold",
    color: "#7b1fa2",
  },
  aidNameAr: {
    fontSize: 14,
    color: "#9DC3AA",
    textAlign: "right",
    writingDirection: "rtl",
  },
  aidDesc: {
    fontSize: 13,
    color: "#333",
    marginTop: 6,
  },
  aidDescAr: {
    fontSize: 12,
    color: "#666",
    textAlign: "right",
    writingDirection: "rtl",
    marginTop: 2,
  },
  aidRequirements: {
    backgroundColor: "#E8F5E9",
    borderRadius: 8,
    padding: 10,
    marginTop: 10,
  },
  aidReqLabel: {
    fontSize: 12,
    fontWeight: "bold",
    color: "#7b1fa2",
    marginBottom: 4,
  },
  aidReqText: {
    fontSize: 12,
    color: "#333",
  },
  aidReqTextAr: {
    fontSize: 11,
    color: "#666",
    textAlign: "right",
    writingDirection: "rtl",
    marginTop: 2,
  },
  aidButton: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#000",
    borderWidth: 1,
    borderColor: "#FFD700",
    paddingHorizontal: 12,
    paddingVertical: 8,
    borderRadius: 6,
    marginTop: 10,
    alignSelf: "flex-start",
    gap: 6,
  },
  aidButtonText: {
    color: "#FFD700",
    fontSize: 13,
    fontWeight: "600",
  },
  vocabGrid: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "space-between",
  },
  vocabCard: {
    width: "48%",
    backgroundColor: "#F1F8F2",
    borderRadius: 10,
    padding: 12,
    marginBottom: 10,
    alignItems: "center",
  },
  vocabEs: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#7b1fa2",
  },
  vocabPronunciation: {
    fontSize: 11,
    color: "#888",
    fontStyle: "italic",
    marginTop: 2,
  },
  vocabAr: {
    fontSize: 15,
    color: "#d32f2f",
    fontWeight: "600",
    marginTop: 4,
    writingDirection: "rtl",
  },
  testimonyCard: {
    backgroundColor: "#F1F8F2",
    borderRadius: 10,
    padding: 14,
    marginBottom: 12,
  },
  testimonyHeader: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 10,
  },
  testimonyAvatar: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: "#000",
    justifyContent: "center",
    alignItems: "center",
    marginRight: 12,
  },
  testimonyAvatarText: {
    color: "#FFD700",
    fontWeight: "bold",
    fontSize: 18,
  },
  testimonyName: {
    fontSize: 15,
    fontWeight: "bold",
    color: "#333",
  },
  testimonyCountry: {
    fontSize: 12,
    color: "#666",
  },
  testimonyText: {
    fontSize: 14,
    color: "#333",
    fontStyle: "italic",
    lineHeight: 20,
  },
  testimonyTextAr: {
    fontSize: 13,
    color: "#666",
    fontStyle: "italic",
    textAlign: "right",
    writingDirection: "rtl",
    lineHeight: 20,
    marginTop: 6,
  },
  revistaHeader: {
    marginBottom: 16,
    paddingBottom: 16,
    borderBottomWidth: 1,
    borderBottomColor: "#e0e0e0",
  },
  revistaDescription: {
    fontSize: 14,
    color: "#333",
    marginBottom: 8,
    lineHeight: 20,
  },
  revistaDescriptionAr: {
    fontSize: 13,
    color: "#666",
    textAlign: "right",
    writingDirection: "rtl",
    marginBottom: 12,
  },
  refreshButton: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#000",
    borderWidth: 1,
    borderColor: "#FFD700",
    paddingHorizontal: 16,
    paddingVertical: 10,
    borderRadius: 8,
    alignSelf: "flex-start",
    gap: 8,
  },
  refreshButtonText: {
    color: "#FFD700",
    fontSize: 14,
    fontWeight: "600",
  },
  loadingContainer: {
    alignItems: "center",
    padding: 32,
  },
  loadingText: {
    marginTop: 12,
    fontSize: 14,
    color: "#666",
  },
  emptyContainer: {
    alignItems: "center",
    padding: 32,
  },
  emptyText: {
    marginTop: 12,
    fontSize: 14,
    color: "#999",
    textAlign: "center",
  },
  emptyTextAr: {
    marginTop: 8,
    fontSize: 13,
    color: "#aaa",
    textAlign: "center",
    writingDirection: "rtl",
  },
  articlesContainer: {
    gap: 12,
  },
  articleCard: {
    backgroundColor: "#F1F8F2",
    borderRadius: 10,
    padding: 14,
    borderLeftWidth: 4,
    borderLeftColor: "#000",
  },
  articleHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 8,
  },
  articleCategory: {
    backgroundColor: "#000",
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 6,
  },
  articleCategoryText: {
    color: "#FFD700",
    fontSize: 11,
    fontWeight: "600",
  },
  articleCategoryTextAr: {
    color: "#FFD700",
    fontSize: 10,
    textAlign: "right",
    writingDirection: "rtl",
  },
  articleTitle: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#7b1fa2",
    marginBottom: 8,
    lineHeight: 22,
  },
  articleSummary: {
    fontSize: 14,
    color: "#333",
    lineHeight: 20,
    marginBottom: 10,
  },
  articleFooter: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginTop: 8,
    paddingTop: 8,
    borderTopWidth: 1,
    borderTopColor: "#e0e0e0",
  },
  articleSource: {
    fontSize: 12,
    color: "#666",
    fontWeight: "500",
  },
  articleDate: {
    fontSize: 12,
    color: "#999",
  },
  recetasIntro: {
    backgroundColor: "#E8F5E9",
    borderRadius: 10,
    padding: 14,
    marginBottom: 16,
  },
  recetasIntroText: {
    fontSize: 14,
    color: "#333",
    lineHeight: 20,
    marginBottom: 6,
  },
  recetasIntroTextAr: {
    fontSize: 13,
    color: "#666",
    textAlign: "right",
    writingDirection: "rtl",
  },
  recetaCard: {
    backgroundColor: "#F1F8F2",
    borderRadius: 12,
    padding: 16,
    marginBottom: 20,
    borderWidth: 1,
    borderColor: "#e0e0e0",
  },
  recetaHeader: {
    marginBottom: 12,
  },
  recetaHeaderText: {
    marginBottom: 8,
  },
  recetaNombre: {
    fontSize: 20,
    fontWeight: "bold",
    color: "#7b1fa2",
    marginBottom: 4,
  },
  recetaNombreAr: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#000",
    textAlign: "right",
    writingDirection: "rtl",
  },
  recetaInfo: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 4,
  },
  recetaTiempo: {
    fontSize: 13,
    color: "#666",
    marginLeft: 6,
  },
  recetaTiempoAr: {
    fontSize: 12,
    color: "#888",
    marginLeft: 6,
    textAlign: "right",
  },
  recetaPersonas: {
    fontSize: 13,
    color: "#666",
    marginLeft: 6,
  },
  recetaPersonasAr: {
    fontSize: 12,
    color: "#888",
    marginLeft: 6,
  },
  recetaImagenContainer: {
    width: "100%",
    height: 200,
    borderRadius: 10,
    marginBottom: 16,
    overflow: "hidden",
    backgroundColor: "#f0f0f0",
  },
  recetaImagen: {
    width: "100%",
    height: "100%",
  },
  recetaIngredientes: {
    marginBottom: 16,
  },
  recetaSubtitulo: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#000",
    marginBottom: 10,
  },
  ingredienteItem: {
    marginBottom: 6,
    paddingLeft: 8,
  },
  ingredienteText: {
    fontSize: 14,
    color: "#333",
    marginBottom: 2,
  },
  ingredienteTextAr: {
    fontSize: 13,
    color: "#666",
    textAlign: "right",
    writingDirection: "rtl",
  },
  recetaPasos: {
    marginTop: 8,
  },
  pasoItem: {
    flexDirection: "row",
    alignItems: "flex-start",
    marginBottom: 12,
  },
  pasoNumero: {
    width: 28,
    height: 28,
    borderRadius: 14,
    backgroundColor: "#000",
    justifyContent: "center",
    alignItems: "center",
    marginRight: 12,
    flexShrink: 0,
  },
  pasoNumeroText: {
    color: "#FFD700",
    fontWeight: "bold",
    fontSize: 14,
  },
  pasoContenido: {
    flex: 1,
  },
  pasoTexto: {
    fontSize: 14,
    color: "#333",
    lineHeight: 20,
    marginBottom: 4,
  },
  pasoTextoAr: {
    fontSize: 13,
    color: "#666",
    textAlign: "right",
    writingDirection: "rtl",
    lineHeight: 20,
  },
  digitalIntro: {
    backgroundColor: "#E8F5E9",
    borderRadius: 10,
    padding: 14,
    marginBottom: 20,
  },
  digitalIntroText: {
    fontSize: 14,
    color: "#333",
    lineHeight: 20,
    marginBottom: 6,
  },
  digitalIntroTextAr: {
    fontSize: 13,
    color: "#666",
    textAlign: "right",
    writingDirection: "rtl",
  },
  digitalSection: {
    backgroundColor: "#F1F8F2",
    borderRadius: 12,
    padding: 16,
    marginBottom: 20,
    borderWidth: 1,
    borderColor: "#e0e0e0",
  },
  digitalSectionHeader: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 12,
    flexWrap: "wrap",
  },
  digitalSectionTitle: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#7b1fa2",
    marginLeft: 8,
    flex: 1,
  },
  digitalSectionTitleAr: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#9DC3AA",
    marginLeft: 8,
    textAlign: "right",
    writingDirection: "rtl",
    width: "100%",
    marginTop: 4,
  },
  digitalContent: {
    marginTop: 8,
  },
  digitalSubtitle: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#000",
    marginTop: 16,
    marginBottom: 10,
  },
  digitalText: {
    fontSize: 14,
    color: "#333",
    lineHeight: 22,
    marginBottom: 10,
  },
  digitalTextAr: {
    fontSize: 13,
    color: "#666",
    textAlign: "right",
    writingDirection: "rtl",
    lineHeight: 20,
    marginBottom: 12,
  },
  digitalList: {
    marginTop: 8,
  },
  digitalListItem: {
    flexDirection: "row",
    alignItems: "flex-start",
    marginBottom: 12,
  },
  digitalBullet: {
    fontSize: 18,
    color: "#79A890",
    fontWeight: "bold",
    marginRight: 10,
    marginTop: 2,
  },
  digitalListItemContent: {
    flex: 1,
  },
  digitalListItemText: {
    fontSize: 14,
    color: "#333",
    lineHeight: 20,
    marginBottom: 4,
  },
  digitalListItemTextAr: {
    fontSize: 13,
    color: "#666",
    textAlign: "right",
    writingDirection: "rtl",
    lineHeight: 18,
  },
  digitalSteps: {
    marginTop: 12,
  },
  digitalStep: {
    flexDirection: "row",
    alignItems: "flex-start",
    marginBottom: 16,
  },
  digitalStepNumber: {
    width: 32,
    height: 32,
    borderRadius: 16,
    backgroundColor: "#000",
    justifyContent: "center",
    alignItems: "center",
    marginRight: 12,
    flexShrink: 0,
  },
  digitalStepNumberText: {
    color: "#FFD700",
    fontWeight: "bold",
    fontSize: 16,
  },
  digitalStepContent: {
    flex: 1,
  },
  digitalStepText: {
    fontSize: 14,
    color: "#333",
    lineHeight: 22,
    marginBottom: 6,
  },
  digitalStepTextAr: {
    fontSize: 13,
    color: "#666",
    textAlign: "right",
    writingDirection: "rtl",
    lineHeight: 20,
  },
  digitalButton: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#000",
    borderWidth: 1,
    borderColor: "#FFD700",
    paddingHorizontal: 16,
    paddingVertical: 12,
    borderRadius: 8,
    marginTop: 16,
    alignSelf: "flex-start",
    gap: 8,
  },
  digitalButtonText: {
    color: "#FFD700",
    fontSize: 14,
    fontWeight: "600",
  },
  digitalButtonTextAr: {
    color: "#FFD700",
    fontSize: 12,
    fontWeight: "500",
    textAlign: "right",
  },
  digitalAdminList: {
    marginTop: 16,
    gap: 12,
  },
  digitalAdminCard: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#fff",
    borderRadius: 10,
    padding: 14,
    borderWidth: 1,
    borderColor: "#e0e0e0",
    marginBottom: 12,
  },
  digitalAdminContent: {
    flex: 1,
    marginLeft: 12,
  },
  digitalAdminTitle: {
    fontSize: 15,
    fontWeight: "bold",
    color: "#7b1fa2",
    marginBottom: 4,
  },
  digitalAdminTitleAr: {
    fontSize: 14,
    fontWeight: "600",
    color: "#000",
    textAlign: "right",
    writingDirection: "rtl",
    marginBottom: 4,
  },
  digitalAdminDesc: {
    fontSize: 13,
    color: "#666",
    marginBottom: 2,
  },
  digitalAdminDescAr: {
    fontSize: 12,
    color: "#888",
    textAlign: "right",
    writingDirection: "rtl",
    marginBottom: 4,
  },
  digitalAdminLink: {
    fontSize: 12,
    color: "#000",
    fontStyle: "italic",
    marginTop: 4,
  },
});
