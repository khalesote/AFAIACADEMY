import React from "react";
import { View, Text, StyleSheet, ScrollView, TouchableOpacity } from "react-native";
import { useLocalSearchParams, useRouter } from "expo-router";
import * as Speech from "expo-speech";
import { Ionicons } from "@expo/vector-icons";
import { MaterialCommunityIcons } from "@expo/vector-icons";

// Diálogos por categoría
const DIALOGOS: Record<string, { es: string; ar: string }[]> = {
  "buscar-trabajo": [
    { es: "¿Dónde puedo buscar trabajo?", ar: "أين يمكنني البحث عن عمل؟" },
    { es: "¿Tiene ofertas de empleo?", ar: "هل لديك عروض عمل؟" },
    { es: "Quiero dejar mi currículum.", ar: "أريد ترك سيرتي الذاتية." },
    { es: "¿Cuándo es la entrevista?", ar: "متى موعد المقابلة؟" },
    { es: "¿Cuáles son las condiciones del trabajo?", ar: "ما هي شروط العمل؟" },
    { es: "Gracias", ar: "شكراً" },
  ],
  "escuela-hijos": [
    { es: "Quiero matricular a mi hijo.", ar: "أريد تسجيل ابني." },
    { es: "¿Cuáles son los horarios?", ar: "ما هي أوقات الدوام؟" },
    { es: "¿Dónde está la clase?", ar: "أين الصف؟" },
    { es: "¿Puedo hablar con el profesor?", ar: "هل يمكنني التحدث مع المعلم؟" },
    { es: "Gracias", ar: "شكراً" },
  ],
  "buscar-vivienda": [
    { es: "Busco piso para alquilar.", ar: "أبحث عن شقة للإيجار." },
    { es: "¿Cuánto cuesta el alquiler?", ar: "كم الإيجار؟" },
    { es: "¿Está amueblado?", ar: "هل هو مفروش؟" },
    { es: "¿Puedo ver el piso?", ar: "هل يمكنني رؤية الشقة؟" },
    { es: "Gracias", ar: "شكراً" },
  ],
  "tramites-extranjeria": [
    { es: "Quiero renovar mi NIE.", ar: "أريد تجديد بطاقة الإقامة." },
    { es: "¿Qué documentos necesito?", ar: "ما هي الوثائق المطلوبة؟" },
    { es: "¿Dónde pido cita?", ar: "أين أطلب موعداً؟" },
    { es: "¿Cuánto tarda el trámite?", ar: "كم يستغرق الإجراء؟" },
    { es: "Gracias", ar: "شكراً" },
  ],
  "ir-comisaria": [
    { es: "Quiero poner una denuncia.", ar: "أريد تقديم بلاغ." },
    { es: "He perdido mi documento.", ar: "فقدت وثيقتي." },
    { es: "¿Dónde está la comisaría?", ar: "أين مركز الشرطة؟" },
    { es: "¿Cuánto hay que esperar?", ar: "كم يجب أن أنتظر؟" },
    { es: "Gracias", ar: "شكراً" },
  ],
  "abrir-cuenta": [
    { es: "Quiero abrir una cuenta bancaria.", ar: "أريد فتح حساب بنكي." },
    { es: "¿Qué documentos necesito?", ar: "ما هي الوثائق المطلوبة؟" },
    { es: "¿Hay comisiones?", ar: "هل توجد عمولات؟" },
    { es: "¿Dónde está el cajero?", ar: "أين الصراف الآلي؟" },
    { es: "Gracias", ar: "شكراً" },
  ],
  "transporte-publico": [
    { es: "¿Dónde se compra el billete?", ar: "أين يمكن شراء التذكرة؟" },
    { es: "¿Qué línea debo tomar?", ar: "أي خط يجب أن أستقل؟" },
    { es: "¿Dónde está la parada?", ar: "أين الموقف؟" },
    { es: "¿Cuánto cuesta el viaje?", ar: "كم ثمن الرحلة؟" },
    { es: "Gracias", ar: "شكراً" },
  ],
  "ir-correos": [
    { es: "Quiero enviar un paquete.", ar: "أريد إرسال طرد." },
    { es: "¿Dónde recojo mi carta?", ar: "أين أستلم رسالتي؟" },
    { es: "¿Cuánto cuesta el envío?", ar: "كم ثمن الإرسال؟" },
    { es: "¿Cuánto tarda?", ar: "كم يستغرق؟" },
    { es: "Gracias", ar: "شكراً" },
  ],
  "compras-online": [
    { es: "He hecho una compra online.", ar: "قمت بشراء عبر الإنترنت." },
    { es: "¿Dónde recojo el pedido?", ar: "أين أستلم الطلب؟" },
    { es: "Quiero devolver un producto.", ar: "أريد إرجاع منتج." },
    { es: "¿Cuánto tarda el reembolso?", ar: "كم يستغرق استرداد المال؟" },
    { es: "Gracias", ar: "شكراً" },
  ],
  "clases-espanol": [
    {
      es: "Quiero inscribirme en clases de español.",
      ar: "أريد التسجيل في دروس اللغة الإسبانية.",
    },
    { es: "¿Cuáles son los horarios?", ar: "ما هي أوقات الدروس؟" },
    { es: "¿Qué material necesito?", ar: "ما هي الأدوات المطلوبة؟" },
    { es: "¿Dónde está el aula?", ar: "أين الفصل؟" },
    { es: "Gracias", ar: "شكراً" },
  ],
  "ayuda-social": [
    { es: "Busco ayuda social.", ar: "أبحث عن مساعدة اجتماعية." },
    {
      es: "¿Dónde está la oficina de servicios sociales?",
      ar: "أين مكتب الخدمات الاجتماعية؟",
    },
    { es: "¿Qué ayudas existen?", ar: "ما هي أنواع المساعدات؟" },
    { es: "¿Qué documentos necesito?", ar: "ما هي الوثائق المطلوبة؟" },
    { es: "Gracias", ar: "شكراً" },
  ],
  "ir-farmacia": [
    { es: "Necesito comprar un medicamento.", ar: "أحتاج لشراء دواء." },
    { es: "¿Tiene receta?", ar: "هل لديك وصفة طبية؟" },
    { es: "¿Dónde está la farmacia más cercana?", ar: "أين أقرب صيدلية؟" },
    { es: "¿Cómo debo tomar el medicamento?", ar: "كيف أتناول الدواء؟" },
    { es: "Gracias", ar: "شكراً" },
  ],
  empadronamiento: [
    { es: "Quiero empadronarme.", ar: "أريد التسجيل في البلدية." },
    { es: "¿Qué documentos necesito?", ar: "ما هي الوثائق المطلوبة؟" },
    { es: "¿Dónde está la oficina?", ar: "أين المكتب؟" },
    { es: "¿Cuánto tarda el trámite?", ar: "كم يستغرق الإجراء؟" },
    { es: "Gracias", ar: "شكراً" },
  ],
  vecinos: [
    { es: "Hola, soy tu nuevo vecino.", ar: "مرحباً، أنا جاركم الجديد." },
    { es: "¿Dónde se tira la basura?", ar: "أين يتم رمي القمامة؟" },
    { es: "¿Hay normas en la comunidad?", ar: "هل هناك قواعد في المجتمع؟" },
    { es: "¿Necesitas ayuda?", ar: "هل تحتاج إلى مساعدة؟" },
    { es: "Gracias", ar: "شكراً" },
  ],
  emergencias: [
    { es: "¡Ayuda! Es una emergencia.", ar: "النجدة! إنها حالة طارئة." },
    { es: "Llame al 112, por favor.", ar: "اتصل بـ 112 من فضلك." },
    { es: "¿Dónde está el hospital?", ar: "أين المستشفى؟" },
    { es: "He tenido un accidente.", ar: "تعرضت لحادث." },
    { es: "Gracias", ar: "شكراً" },
  ],
  "trabajar-campo": [
    {
      es: "¡Buenos días! ¿Listo para empezar?",
      ar: "صباح الخير! هل أنت مستعد للبدء؟",
    },
    {
      es: "Sí, jefe. ¿Qué tareas tengo hoy?",
      ar: "نعم، يا رئيس. ما هي المهام اليوم؟",
    },
    {
      es: "Hoy vamos a recoger manzanas. Ten cuidado con las ramas.",
      ar: "اليوم سنقوم بجمع التفاح. انتبه للأغصان.",
    },
    { es: "¿Dónde dejo las cajas llenas?", ar: "أين أضع الصناديق الممتلئة؟" },
    {
      es: "Déjalas junto al tractor, por favor.",
      ar: "ضعها بجانب الجرار من فضلك.",
    },
    { es: "¿Puedo tomar un descanso?", ar: "هل يمكنني أخذ استراحة؟" },
    { es: "Sí, descansa 15 minutos.", ar: "نعم، استرح لمدة 15 دقيقة." },
    { es: "Gracias, jefe.", ar: "شكراً يا رئيس." },
  ],
  "viajar-tren": [
    { es: "¿Dónde está la estación de tren?", ar: "أين محطة القطار؟" },
    {
      es: "¿A qué hora sale el tren a Madrid?",
      ar: "في أي وقت يغادر القطار إلى مدريد؟",
    },
    { es: "¿Cuánto cuesta el billete?", ar: "كم ثمن التذكرة؟" },
    { es: "¿De qué vía sale?", ar: "من أي سكة يغادر؟" },
    { es: "Gracias", ar: "شكرا" },
  ],
  "ir-mercado": [
    { es: "¿Cuánto cuesta esto?", ar: "بكم هذا؟" },
    { es: "¿Tiene frutas frescas?", ar: "هل لديك فواكه طازجة؟" },
    {
      es: "Quiero un kilo de tomates, por favor.",
      ar: "أريد كيلو طماطم من فضلك.",
    },
    { es: "¿Dónde está la caja?", ar: "أين الصندوق؟" },
    { es: "Gracias", ar: "شكرا" },
  ],
  "ir-ayuntamiento": [
    { es: "¿Dónde está el ayuntamiento?", ar: "أين البلدية؟" },
    { es: "Quiero pedir información.", ar: "أريد طلب معلومات." },
    {
      es: "¿Dónde puedo obtener un certificado?",
      ar: "أين يمكنني الحصول على شهادة؟",
    },
    { es: "¿Cuál es el horario de atención?", ar: "ما هي ساعات العمل؟" },
    { es: "Gracias", ar: "شكرا" },
  ],
  "ir-hospital": [
    { es: "Necesito ver a un médico.", ar: "أحتاج إلى رؤية طبيب." },
    { es: "Me duele la cabeza.", ar: "أشعر بألم في رأسي." },
    { es: "¿Dónde está la sala de urgencias?", ar: "أين غرفة الطوارئ؟" },
    { es: "¿Cuánto hay que esperar?", ar: "كم يجب أن أنتظر؟" },
    {
      es: "Quiero pedir cita con un especialista.",
      ar: "أريد تحديد موعد مع أخصائي.",
    },
    {
      es: "¿Qué especialistas hay disponibles?",
      ar: "ما هي التخصصات المتوفرة؟",
    },
    { es: "Tengo una cita con el cardiólogo.", ar: "لدي موعد مع طبيب القلب." },
    {
      es: "¿Dónde está la consulta de pediatría?",
      ar: "أين عيادة طب الأطفال؟",
    },
    {
      es: "¿Cuándo estarán los resultados de la prueba?",
      ar: "متى ستكون نتائج التحليل جاهزة؟",
    },
    { es: "¿Dónde recojo mis análisis?", ar: "أين أستلم نتائج التحاليل؟" },
    {
      es: "¿Puede alguien ayudarme con la traducción?",
      ar: "هل يمكن لأحد مساعدتي في الترجمة؟",
    },
    { es: "¿A qué hora es mi cita?", ar: "في أي ساعة موعدي؟" },
    { es: "¿Dónde está la farmacia?", ar: "أين الصيدلية؟" },
    { es: "Gracias", ar: "شكرا" },
  ],
};

// Objetos y herramientas por situación
export const OBJETOS: Record<
  string,
  {
    es: string;
    ar: string;
    icon: string;
    color: string;
    iconLib?: "Ionicons" | "MaterialCommunityIcons";
  }[]
> = {
  "buscar-trabajo": [
    {
      es: "Currículum",
      ar: "السيرة الذاتية",
      icon: "document-text-outline",
      color: "#1976d2",
      iconLib: "Ionicons",
    },
    {
      es: "Contrato",
      ar: "عقد العمل",
      icon: "file-document-outline",
      color: "#388e3c",
      iconLib: "MaterialCommunityIcons",
    },
    {
      es: "Ofertas de empleo",
      ar: "عروض العمل",
      icon: "briefcase-outline",
      color: "#512da8",
      iconLib: "Ionicons",
    },
    {
      es: "Entrevista",
      ar: "مقابلة",
      icon: "account-tie-outline",
      color: "#fbc02d",
      iconLib: "MaterialCommunityIcons",
    },
  ],
  "escuela-hijos": [
    {
      es: "Matrícula",
      ar: "تسجيل",
      icon: "clipboard-list-outline",
      color: "#1976d2",
      iconLib: "MaterialCommunityIcons",
    },
    {
      es: "Profesor",
      ar: "معلم",
      icon: "school-outline",
      color: "#388e3c",
      iconLib: "Ionicons",
    },
    {
      es: "Clase",
      ar: "صف",
      icon: "door",
      color: "#512da8",
      iconLib: "MaterialCommunityIcons",
    },
    {
      es: "Horario",
      ar: "جدول",
      icon: "clock-outline",
      color: "#fbc02d",
      iconLib: "MaterialCommunityIcons",
    },
  ],
  "buscar-vivienda": [
    {
      es: "Piso",
      ar: "شقة",
      icon: "home-outline",
      color: "#388e3c",
      iconLib: "Ionicons",
    },
    {
      es: "Contrato de alquiler",
      ar: "عقد الإيجار",
      icon: "file-document-outline",
      color: "#1976d2",
      iconLib: "MaterialCommunityIcons",
    },
    {
      es: "Agencia inmobiliaria",
      ar: "وكالة عقارية",
      icon: "office-building-outline",
      color: "#512da8",
      iconLib: "MaterialCommunityIcons",
    },
    {
      es: "Fianza",
      ar: "تأمين",
      icon: "cash-multiple",
      color: "#fbc02d",
      iconLib: "MaterialCommunityIcons",
    },
  ],
  "tramites-extranjeria": [
    {
      es: "NIE",
      ar: "بطاقة الإقامة",
      icon: "card-account-details-outline",
      color: "#512da8",
      iconLib: "MaterialCommunityIcons",
    },
    {
      es: "Cita previa",
      ar: "موعد مسبق",
      icon: "calendar-outline",
      color: "#1976d2",
      iconLib: "Ionicons",
    },
    {
      es: "Documentos",
      ar: "وثائق",
      icon: "document-outline",
      color: "#388e3c",
      iconLib: "Ionicons",
    },
    {
      es: "Oficina de extranjería",
      ar: "مكتب الهجرة",
      icon: "domain",
      color: "#fbc02d",
      iconLib: "MaterialCommunityIcons",
    },
  ],
  "ir-comisaria": [
    {
      es: "Denuncia",
      ar: "بلاغ",
      icon: "alert-outline",
      color: "#d32f2f",
      iconLib: "MaterialCommunityIcons",
    },
    {
      es: "Policía",
      ar: "شرطة",
      icon: "shield-outline",
      color: "#388e3c",
      iconLib: "Ionicons",
    },
    {
      es: "Documento",
      ar: "وثيقة",
      icon: "document-outline",
      color: "#1976d2",
      iconLib: "Ionicons",
    },
    {
      es: "Cita",
      ar: "موعد",
      icon: "calendar-outline",
      color: "#512da8",
      iconLib: "Ionicons",
    },
  ],
  "abrir-cuenta": [
    {
      es: "Cuenta bancaria",
      ar: "حساب بنكي",
      icon: "card-outline",
      color: "#43a047",
      iconLib: "Ionicons",
    },
    {
      es: "DNI/NIE",
      ar: "بطاقة الهوية/الإقامة",
      icon: "card-account-details-outline",
      color: "#1976d2",
      iconLib: "MaterialCommunityIcons",
    },
    {
      es: "Cajero",
      ar: "صراف آلي",
      icon: "atm",
      color: "#388e3c",
      iconLib: "MaterialCommunityIcons",
    },
    {
      es: "Contrato",
      ar: "عقد",
      icon: "file-document-outline",
      color: "#512da8",
      iconLib: "MaterialCommunityIcons",
    },
  ],
  "transporte-publico": [
    {
      es: "Billete",
      ar: "تذكرة",
      icon: "ticket-outline",
      color: "#1976d2",
      iconLib: "MaterialCommunityIcons",
    },
    {
      es: "Tarjeta de transporte",
      ar: "بطاقة النقل",
      icon: "card-outline",
      color: "#512da8",
      iconLib: "Ionicons",
    },
    {
      es: "Parada",
      ar: "موقف",
      icon: "bus-stop-covered",
      color: "#388e3c",
      iconLib: "MaterialCommunityIcons",
    },
    {
      es: "Plano",
      ar: "خريطة",
      icon: "map-outline",
      color: "#fbc02d",
      iconLib: "MaterialCommunityIcons",
    },
  ],
  "ir-correos": [
    {
      es: "Paquete",
      ar: "طرد",
      icon: "cube-outline",
      color: "#512da8",
      iconLib: "Ionicons",
    },
    {
      es: "Carta",
      ar: "رسالة",
      icon: "mail-outline",
      color: "#1976d2",
      iconLib: "Ionicons",
    },
    {
      es: "Recibo",
      ar: "إيصال",
      icon: "receipt-outline",
      color: "#388e3c",
      iconLib: "Ionicons",
    },
    {
      es: "Ventana de atención",
      ar: "شباك الخدمة",
      icon: "window-closed",
      color: "#fbc02d",
      iconLib: "MaterialCommunityIcons",
    },
  ],
  "compras-online": [
    {
      es: "Pedido",
      ar: "طلب",
      icon: "cart-arrow-down",
      color: "#fbc02d",
      iconLib: "MaterialCommunityIcons",
    },
    {
      es: "Producto",
      ar: "منتج",
      icon: "cube-outline",
      color: "#388e3c",
      iconLib: "Ionicons",
    },
    {
      es: "Reembolso",
      ar: "استرداد",
      icon: "cash-refund",
      color: "#1976d2",
      iconLib: "MaterialCommunityIcons",
    },
    {
      es: "Tienda online",
      ar: "متجر إلكتروني",
      icon: "web",
      color: "#512da8",
      iconLib: "MaterialCommunityIcons",
    },
  ],
  "clases-espanol": [
    {
      es: "Libro",
      ar: "كتاب",
      icon: "book-outline",
      color: "#d32f2f",
      iconLib: "Ionicons",
    },
    {
      es: "Cuaderno",
      ar: "دفتر",
      icon: "notebook-outline",
      color: "#388e3c",
      iconLib: "MaterialCommunityIcons",
    },
    {
      es: "Bolígrafo",
      ar: "قلم",
      icon: "pen",
      color: "#1976d2",
      iconLib: "MaterialCommunityIcons",
    },
    {
      es: "Profesor",
      ar: "معلم",
      icon: "account-outline",
      color: "#512da8",
      iconLib: "MaterialCommunityIcons",
    },
  ],
  "ayuda-social": [
    {
      es: "Asistente social",
      ar: "مساعد اجتماعي",
      icon: "hand-heart-outline",
      color: "#43a047",
      iconLib: "MaterialCommunityIcons",
    },
    {
      es: "Solicitud",
      ar: "طلب",
      icon: "file-document-outline",
      color: "#1976d2",
      iconLib: "MaterialCommunityIcons",
    },
    {
      es: "Oficina",
      ar: "مكتب",
      icon: "domain",
      color: "#388e3c",
      iconLib: "MaterialCommunityIcons",
    },
    {
      es: "Ayuda económica",
      ar: "مساعدة مالية",
      icon: "cash-multiple",
      color: "#fbc02d",
      iconLib: "MaterialCommunityIcons",
    },
  ],
  "ir-farmacia": [
    {
      es: "Medicamento",
      ar: "دواء",
      icon: "pill",
      color: "#512da8",
      iconLib: "MaterialCommunityIcons",
    },
    {
      es: "Receta",
      ar: "وصفة طبية",
      icon: "file-document-outline",
      color: "#1976d2",
      iconLib: "MaterialCommunityIcons",
    },
    {
      es: "Farmacéutico",
      ar: "صيدلي",
      icon: "account-outline",
      color: "#388e3c",
      iconLib: "MaterialCommunityIcons",
    },
    {
      es: "Mostrador",
      ar: "كاونتر",
      icon: "counter",
      color: "#512da8",
      iconLib: "MaterialCommunityIcons",
    },
  ],
  empadronamiento: [
    {
      es: "Oficina de empadronamiento",
      ar: "مكتب التسجيل",
      icon: "domain",
      color: "#1976d2",
      iconLib: "MaterialCommunityIcons",
    },
    {
      es: "Certificado de empadronamiento",
      ar: "شهادة التسجيل",
      icon: "certificate",
      color: "#388e3c",
      iconLib: "MaterialCommunityIcons",
    },
    {
      es: "Formulario",
      ar: "استمارة",
      icon: "file-document-outline",
      color: "#512da8",
      iconLib: "MaterialCommunityIcons",
    },
    {
      es: "Turno",
      ar: "دور",
      icon: "clock-outline",
      color: "#fbc02d",
      iconLib: "MaterialCommunityIcons",
    },
  ],
  vecinos: [
    {
      es: "Comunidad",
      ar: "الجيران",
      icon: "people-outline",
      color: "#388e3c",
      iconLib: "Ionicons",
    },
    {
      es: "Normas",
      ar: "قواعد",
      icon: "clipboard-list-outline",
      color: "#1976d2",
      iconLib: "MaterialCommunityIcons",
    },
    {
      es: "Ayuda",
      ar: "مساعدة",
      icon: "hand-heart-outline",
      color: "#43a047",
      iconLib: "MaterialCommunityIcons",
    },
    {
      es: "Basura",
      ar: "قمامة",
      icon: "trash-can-outline",
      color: "#d32f2f",
      iconLib: "MaterialCommunityIcons",
    },
  ],
  emergencias: [
    {
      es: "Teléfono de emergencias",
      ar: "رقم الطوارئ",
      icon: "phone-outline",
      color: "#d32f2f",
      iconLib: "Ionicons",
    },
    {
      es: "Ambulancia",
      ar: "سيارة إسعاف",
      icon: "ambulance",
      color: "#388e3c",
      iconLib: "MaterialCommunityIcons",
    },
    {
      es: "Policía",
      ar: "شرطة",
      icon: "shield-outline",
      color: "#1976d2",
      iconLib: "Ionicons",
    },
    {
      es: "Incendio",
      ar: "حريق",
      icon: "fire-truck",
      color: "#fbc02d",
      iconLib: "MaterialCommunityIcons",
    },
  ],
  "trabajar-campo": [
    {
      es: "Caja de fruta",
      ar: "صندوق الفاكهة",
      icon: "cube-outline",
      color: "#fbc02d",
      iconLib: "Ionicons",
    },
    {
      es: "Tijeras de podar",
      ar: "مقص التقليم",
      icon: "scissors-cutting",
      color: "#388e3c",
      iconLib: "MaterialCommunityIcons",
    },
    {
      es: "Guantes",
      ar: "قفازات",
      icon: "hand-left-outline",
      color: "#1976d2",
      iconLib: "MaterialCommunityIcons",
    },
    {
      es: "Escalera",
      ar: "سلم",
      icon: "stairs-up",
      color: "#512da8",
      iconLib: "MaterialCommunityIcons",
    },
    {
      es: "Tractor",
      ar: "جرار",
      icon: "tractor-variant",
      color: "#43a047",
      iconLib: "MaterialCommunityIcons",
    },
    {
      es: "Sombrero",
      ar: "قبعة",
      icon: "hat-fedora",
      color: "#d32f2f",
      iconLib: "MaterialCommunityIcons",
    },
    {
      es: "Cesta",
      ar: "سلة",
      icon: "basket-outline",
      color: "#ff9800",
      iconLib: "Ionicons",
    },
    {
      es: "Botas",
      ar: "أحذية طويلة",
      icon: "boot",
      color: "#795548",
      iconLib: "MaterialCommunityIcons",
    },
  ],
  "viajar-tren": [
    {
      es: "Maleta",
      ar: "حقيبة سفر",
      icon: "briefcase",
      color: "#1976d2",
      iconLib: "Ionicons",
    },
    {
      es: "Billete",
      ar: "تذكرة",
      icon: "ticket-confirmation",
      color: "#fbc02d",
      iconLib: "MaterialCommunityIcons",
    },
    {
      es: "Andén / Vía",
      ar: "رصيف / سكة",
      icon: "train-track",
      color: "#388e3c",
      iconLib: "MaterialCommunityIcons",
    },
    {
      es: "Asiento",
      ar: "مقعد",
      icon: "seat",
      color: "#d32f2f",
      iconLib: "MaterialCommunityIcons",
    },
    {
      es: "Pasaporte",
      ar: "جواز السفر",
      icon: "passport",
      color: "#512da8",
      iconLib: "MaterialCommunityIcons",
    },
    {
      es: "Horario",
      ar: "جدول المواعيد",
      icon: "clock-outline",
      color: "#0288d1",
      iconLib: "MaterialCommunityIcons",
    },
  ],
  "ir-mercado": [
    {
      es: "Bolsa",
      ar: "كيس",
      icon: "bag-outline",
      color: "#388e3c",
      iconLib: "Ionicons",
    },
    {
      es: "Dinero",
      ar: "مال",
      icon: "cash-multiple",
      color: "#fbc02d",
      iconLib: "MaterialCommunityIcons",
    },
    {
      es: "Frutas",
      ar: "فواكه",
      icon: "food-apple",
      color: "#d32f2f",
      iconLib: "MaterialCommunityIcons",
    },
    {
      es: "Verduras",
      ar: "خضروات",
      icon: "leaf",
      color: "#388e3c",
      iconLib: "Ionicons",
    },
    {
      es: "Carro de la compra",
      ar: "عربة التسوق",
      icon: "cart-outline",
      color: "#1976d2",
      iconLib: "Ionicons",
    },
    {
      es: "Balanza",
      ar: "ميزان",
      icon: "scale-balance",
      color: "#512da8",
      iconLib: "MaterialCommunityIcons",
    },
  ],
  "ir-ayuntamiento": [
    {
      es: "Documento",
      ar: "وثيقة",
      icon: "document-outline",
      color: "#1976d2",
      iconLib: "Ionicons",
    },
    {
      es: "Certificado",
      ar: "شهادة",
      icon: "certificate",
      color: "#388e3c",
      iconLib: "MaterialCommunityIcons",
    },
    {
      es: "Ventanilla",
      ar: "شباك الخدمة",
      icon: "window-closed",
      color: "#fbc02d",
      iconLib: "MaterialCommunityIcons",
    },
    {
      es: "Formulario",
      ar: "استمارة",
      icon: "form-select",
      color: "#0288d1",
      iconLib: "MaterialCommunityIcons",
    },
    {
      es: "Cola",
      ar: "طابور",
      icon: "account-group-outline",
      color: "#d32f2f",
      iconLib: "MaterialCommunityIcons",
    },
  ],
  "ir-hospital": [
    {
      es: "Tarjeta sanitaria",
      ar: "بطاقة صحية",
      icon: "card-account-details-outline",
      color: "#1976d2",
      iconLib: "MaterialCommunityIcons",
    },
    {
      es: "Médico",
      ar: "طبيب",
      icon: "doctor",
      color: "#388e3c",
      iconLib: "MaterialCommunityIcons",
    },
    {
      es: "Enfermero/a",
      ar: "ممرض/ممرضة",
      icon: "nurse",
      color: "#fbc02d",
      iconLib: "MaterialCommunityIcons",
    },
    {
      es: "Sala de espera",
      ar: "غرفة الانتظار",
      icon: "sofa",
      color: "#512da8",
      iconLib: "MaterialCommunityIcons",
    },
    {
      es: "Receta",
      ar: "وصفة طبية",
      icon: "file-document-outline",
      color: "#d32f2f",
      iconLib: "MaterialCommunityIcons",
    },
    {
      es: "Medicamento",
      ar: "دواء",
      icon: "pill",
      color: "#1976d2",
      iconLib: "MaterialCommunityIcons",
    },
    // Especialistas médicos
    {
      es: "Médico de familia",
      ar: "طبيب الأسرة",
      icon: "account-outline",
      color: "#388e3c",
      iconLib: "MaterialCommunityIcons",
    },
    {
      es: "Pediatra",
      ar: "طبيب أطفال",
      icon: "baby-face-outline",
      color: "#fbc02d",
      iconLib: "MaterialCommunityIcons",
    },
    {
      es: "Cardiólogo",
      ar: "طبيب القلب",
      icon: "heart-pulse",
      color: "#d32f2f",
      iconLib: "MaterialCommunityIcons",
    },
    {
      es: "Ginecólogo",
      ar: "طبيب النساء",
      icon: "gender-female",
      color: "#512da8",
      iconLib: "MaterialCommunityIcons",
    },
    {
      es: "Traumatólogo",
      ar: "طبيب العظام",
      icon: "bone",
      color: "#1976d2",
      iconLib: "MaterialCommunityIcons",
    },
    {
      es: "Dermatólogo",
      ar: "طبيب الجلد",
      icon: "face-man",
      color: "#43a047",
      iconLib: "MaterialCommunityIcons",
    },
    {
      es: "Oftalmólogo",
      ar: "طبيب العيون",
      icon: "eye-outline",
      color: "#0288d1",
      iconLib: "MaterialCommunityIcons",
    },
    {
      es: "Otorrino",
      ar: "طبيب الأنف والأذن والحنجرة",
      icon: "ear-hearing",
      color: "#795548",
      iconLib: "MaterialCommunityIcons",
    },
    {
      es: "Psiquiatra",
      ar: "طبيب نفسي",
      icon: "emoticon-neutral-outline",
      color: "#7e57c2",
      iconLib: "MaterialCommunityIcons",
    },
    {
      es: "Neurólogo",
      ar: "طبيب الأعصاب",
      icon: "brain",
      color: "#fbc02d",
      iconLib: "MaterialCommunityIcons",
    },
    {
      es: "Dentista",
      ar: "طبيب الأسنان",
      icon: "tooth-outline",
      color: "#d32f2f",
      iconLib: "MaterialCommunityIcons",
    },
  ],
};

const TITULOS: Record<string, string> = {
  "viajar-tren": "Viajar en tren",
  "ir-mercado": "Ir al mercado",
  "ir-ayuntamiento": "Ir al ayuntamiento",
};

export default function DialogoScreen() {
  const { categoria } = useLocalSearchParams();
  const router = useRouter();
  const dialogo = DIALOGOS[categoria as string] || [];
  const titulo = TITULOS[categoria as string] || "Diálogo";

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <TouchableOpacity
        style={styles.volverBtn}
        onPress={() => router.replace("/SituacionesScreen")}
      >
        <Text style={styles.volverTxt}>⬅ Volver a categorías</Text>
      </TouchableOpacity>
      <Text style={styles.titulo}>{titulo}</Text>
      {dialogo.map((linea, idx) => (
        <View key={idx} style={styles.linea}>
          <Text style={styles.textoEs}>{linea.es}</Text>
          <TouchableOpacity
            style={{ backgroundColor: '#1976d2', borderRadius: 8, paddingVertical: 6, paddingHorizontal: 16, marginVertical: 4 }}
            onPress={() => Speech.speak(linea.es, { language: "es-ES" })}
          >
            <Text style={{ color: '#fff', fontWeight: 'bold', fontSize: 16 }}>🔊 Español</Text>
          </TouchableOpacity>
          <Text style={styles.textoAr}>{linea.ar}</Text>
          <TouchableOpacity
            style={{ backgroundColor: '#1976d2', borderRadius: 8, paddingVertical: 6, paddingHorizontal: 16, marginVertical: 4 }}
            onPress={() => Speech.speak(linea.ar, { language: "ar-SA" })}
          >
            <Text style={{ color: '#fff', fontWeight: 'bold', fontSize: 16 }}>🔊 Árabe</Text>
          </TouchableOpacity>
        </View>
      ))}
      {dialogo.length === 0 && (
        <Text style={styles.textoEs}>No hay diálogo disponible para esta categoría.</Text>
      )}

      {/* Objetos y herramientas */}
      <Text style={[styles.titulo, { fontSize: 20, marginTop: 24, color: "#388e3c" }]}>
        Objetos y herramientas
      </Text>
      {(OBJETOS[categoria as string] || []).map((obj, idx) => (
        <View key={idx} style={styles.objetoRow}>
          {/* Icono representativo */}
          {obj.iconLib === "MaterialCommunityIcons" ? (
            <MaterialCommunityIcons
              name={obj.icon as any}
              size={28}
              color={obj.color}
              style={{ marginRight: 10 }}
            />
          ) : (
            <Ionicons
              name={obj.icon as any}
              size={28}
              color={obj.color}
              style={{ marginRight: 10 }}
            />
          )}
          <Text style={[styles.objetoEs, { color: obj.color }]}>{obj.es}</Text>
          <Text style={[styles.objetoAr, { color: obj.color }]}>{obj.ar}</Text>
        </View>
      ))}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 24,
    alignItems: "center",
    backgroundColor: "#fff",
  },
  titulo: {
    fontSize: 26,
    fontWeight: "bold",
    marginBottom: 24,
    color: "#1976d2",
  },
  linea: {
    backgroundColor: "#e3e3e3",
    borderRadius: 12,
    padding: 16,
    marginVertical: 8,
    width: "100%",
    alignItems: "center",
  },
  textoEs: {
    fontSize: 18,
    color: "#333",
    fontWeight: "bold",
    marginBottom: 6,
    textAlign: "center",
  },
  textoAr: {
    fontSize: 18,
    color: "#388e3c",
    fontWeight: "bold",
    fontFamily: "System",
    writingDirection: "rtl",
    textAlign: "center",
  },

  volverBtn: {
    alignSelf: "flex-start",
    backgroundColor: "#e3e3e3",
    borderRadius: 8,
    paddingVertical: 6,
    paddingHorizontal: 16,
    marginBottom: 12,
  },
  volverTxt: {
    color: "#1976d2",
    fontWeight: "bold",
    fontSize: 16,
  },
  objetoRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    backgroundColor: "#f5f5f5",
    borderRadius: 8,
    marginBottom: 4,
    paddingVertical: 8,
    paddingHorizontal: 12,
  },
  objetoEs: {
    fontSize: 16,
    color: "#222",
    flex: 1,
    fontWeight: "bold",
  },
  objetoAr: {
    fontSize: 16,
    color: "#1976d2",
    flex: 1,
    fontWeight: "bold",
    textAlign: "right",
    writingDirection: "rtl",
    fontFamily: "System",
  },
});
