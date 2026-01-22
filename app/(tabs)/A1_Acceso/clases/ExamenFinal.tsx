import React, { useState, useRef, useEffect } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Animated, Easing, Alert, ScrollView, Modal, Linking, AppState } from 'react-native';

import { LinearGradient } from 'expo-linear-gradient';
import { Ionicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import { WebView } from 'react-native-webview';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { requestMicrophonePermission } from '../../../../utils/requestMicrophonePermission';
import { Platform } from 'react-native';
import { useUserProgress } from '@/contexts/UserProgressContext';
import ExamenPresencialForm from '../../../../components/ExamenPresencialForm';

type PreguntaBase = {
  pregunta: string;
  opciones: string[];
  respuestaCorrecta: string;
  tipo?: 'opcion_multiple' | 'relacionar' | 'ordenar';
  pares?: Array<{izquierda: string, derecha: string}>; // Para preguntas de relacionar
  ordenCorrecto?: string[]; // Para preguntas de ordenar
  tiempoSegundos?: number; // Tiempo específico para esta pregunta (por defecto 15)
};

type Pregunta = PreguntaBase & {
  correctaIdx?: number;
};

// Preguntas originales de A1 - preservadas completamente intactas
const preguntasOriginales: PreguntaBase[] = [
  // Unidad 1: Presentaciones
  {
    pregunta: '¿Cómo te llamas?',
    opciones: ['Me llamo María', 'Tengo 25 años', 'Vivo en Madrid', 'Soy estudiante'],
    respuestaCorrecta: 'Me llamo María',
  },
  {
    pregunta: '¿De dónde eres?',
    opciones: ['Soy de España', 'Tengo hambre', 'Me gusta el café', 'Estudio español'],
    respuestaCorrecta: 'Soy de España',
  },
  {
    pregunta: '¿Cuántos años tienes?',
    opciones: ['Tengo 30 años', 'Soy médico', 'Vivo aquí', 'Me llamo Ana'],
    respuestaCorrecta: 'Tengo 30 años',
  },
  {
    pregunta: '¿Cómo saludas en español?',
    opciones: ['Hola', 'Adiós', 'Gracias', 'Por favor'],
    respuestaCorrecta: 'Hola',
  },
  {
    pregunta: '¿Qué significa "mucho gusto"?',
    opciones: ['Encantado de conocerte', 'Hasta luego', 'Buenos días', 'De nada'],
    respuestaCorrecta: 'Encantado de conocerte',
  },
  {
    pregunta: '¿Cómo te presentas?',
    opciones: ['Soy Ana', 'Tengo hambre', 'Voy al trabajo', 'Me gusta el café'],
    respuestaCorrecta: 'Soy Ana',
  },
  {
    pregunta: '¿Cómo se dice "nombre" en árabe?',
    opciones: ['اسم', 'عمر', 'بلد', 'مدينة'],
    respuestaCorrecta: 'اسم',
  },
  {
    pregunta: '¿Qué pregunta usas para saber el nombre?',
    opciones: ['¿Cómo te llamas?', '¿Cuántos años tienes?', '¿De dónde eres?', '¿Qué tal?'],
    respuestaCorrecta: '¿Cómo te llamas?',
  },
  // Unidad 2: La Familia
  {
    pregunta: '¿Cómo se dice "padre" en árabe?',
    opciones: ['أب', 'أم', 'أخ', 'أخت'],
    respuestaCorrecta: 'أب',
  },
  {
    pregunta: '¿Cuál es el plural de "hermano"?',
    opciones: ['hermanos', 'hermanas', 'hermano', 'hermana'],
    respuestaCorrecta: 'hermanos',
  },
  {
    pregunta: '¿Cómo presentas a tu familia?',
    opciones: ['Esta es mi familia', 'Me gusta cocinar', 'Voy al trabajo', 'Tengo sed'],
    respuestaCorrecta: 'Esta es mi familia',
  },
  {
    pregunta: '¿Cómo se dice "madre" en árabe?',
    opciones: ['أم', 'أب', 'أخ', 'أخت'],
    respuestaCorrecta: 'أم',
  },
  {
    pregunta: '¿Qué significa "hermano"?',
    opciones: ['أخ', 'أخت', 'أب', 'أم'],
    respuestaCorrecta: 'أخ',
  },
  {
    pregunta: '¿Cómo describes tu familia?',
    opciones: ['Tengo dos hijos y una hija', 'Tengo dos hermanos', 'Tengo dos padres', 'Tengo dos tíos'],
    respuestaCorrecta: 'Tengo dos hijos y una hija',
  },
  {
    pregunta: '¿Qué significa "familia"?',
    opciones: ['عائلة', 'بيت', 'شقة', 'مدينة'],
    respuestaCorrecta: 'عائلة',
  },
  {
    pregunta: '¿Cómo se dice "hijo" en plural?',
    opciones: ['Hijos', 'Hijas', 'Hijo', 'Hija'],
    respuestaCorrecta: 'Hijos',
  },
  // Unidad 3: La Casa
  {
    pregunta: '¿Dónde cocinas?',
    opciones: ['En la cocina', 'En el baño', 'En el dormitorio', 'En el jardín'],
    respuestaCorrecta: 'En la cocina',
  },
  {
    pregunta: '¿Cómo se dice "sala" en árabe?',
    opciones: ['غرفة جلوس', 'مطبخ', 'حمام', 'غرفة نوم'],
    respuestaCorrecta: 'غرفة جلوس',
  },
  {
    pregunta: '¿Dónde duermes?',
    opciones: ['En el dormitorio', 'En la cocina', 'En el baño', 'En la sala'],
    respuestaCorrecta: 'En el dormitorio',
  },
  {
    pregunta: '¿Cómo se dice "cocina" en árabe?',
    opciones: ['مطبخ', 'غرفة نوم', 'حمام', 'غرفة جلوس'],
    respuestaCorrecta: 'مطبخ',
  },
  {
    pregunta: '¿Dónde comes?',
    opciones: ['En el comedor', 'En el baño', 'En el jardín', 'En la calle'],
    respuestaCorrecta: 'En el comedor',
  },
  {
    pregunta: '¿Qué significa "baño"?',
    opciones: ['حمام', 'مطبخ', 'غرفة نوم', 'غرفة جلوس'],
    respuestaCorrecta: 'حمام',
  },
  {
    pregunta: '¿Dónde guardas la ropa?',
    opciones: ['En el armario', 'En la cocina', 'En el baño', 'En el jardín'],
    respuestaCorrecta: 'En el armario',
  },
  {
    pregunta: '¿Qué significa "casa"?',
    opciones: ['بيت', 'شقة', 'مدينة', 'شارع'],
    respuestaCorrecta: 'بيت',
  },
  // Unidad 4: Tiempo Libre y Comidas
  {
    pregunta: '¿Te gusta la paella?',
    opciones: ['Sí, me gusta mucho', 'No tengo hambre', 'Voy al médico', 'Estoy cansado'],
    respuestaCorrecta: 'Sí, me gusta mucho',
  },
  {
    pregunta: '¿Qué haces en tu tiempo libre?',
    opciones: ['Leo libros', 'Tengo 25 años', 'Soy de Madrid', 'Me llamo Juan'],
    respuestaCorrecta: 'Leo libros',
  },
  {
    pregunta: '¿Cuándo desayunas?',
    opciones: ['Por la mañana', 'Por la noche', 'Mañana', 'Ayer'],
    respuestaCorrecta: 'Por la mañana',
  },
  {
    pregunta: '¿Qué comes en el desayuno?',
    opciones: ['Pan y café', 'Pescado', 'Carne', 'Verduras'],
    respuestaCorrecta: 'Pan y café',
  },
  {
    pregunta: '¿Qué haces los fines de semana?',
    opciones: ['Descanso y salgo', 'Trabajo', 'Estudio', 'Duermo todo el día'],
    respuestaCorrecta: 'Descanso y salgo',
  },
  {
    pregunta: '¿Cómo se dice "comida" en árabe?',
    opciones: ['طعام', 'ماء', 'خبز', 'قهوة'],
    respuestaCorrecta: 'طعام',
  },
  {
    pregunta: '¿Qué significa "me gusta"?',
    opciones: ['أحب', 'أريد', 'أحتاج', 'أفهم'],
    respuestaCorrecta: 'أحب',
  },
  {
    pregunta: '¿Cuándo cenas?',
    opciones: ['Por la noche', 'Por la mañana', 'Al mediodía', 'Por la tarde'],
    respuestaCorrecta: 'Por la noche',
  },
  // Unidad 5: Direcciones
  {
    pregunta: '¿Dónde está el supermercado?',
    opciones: ['Está al lado del banco', 'Son las tres', 'Hace buen tiempo', 'Tengo hermanos'],
    respuestaCorrecta: 'Está al lado del banco',
  },
  {
    pregunta: '¿Cómo llego a la estación?',
    opciones: ['Siga recto y gire a la derecha', 'Tengo hambre', 'Me gusta el fútbol', 'Vivo aquí'],
    respuestaCorrecta: 'Siga recto y gire a la derecha',
  },
  {
    pregunta: '¿Cuál es lo contrario de "cerca"?',
    opciones: ['Lejos', 'Recto', 'Derecha', 'Izquierda'],
    respuestaCorrecta: 'Lejos',
  },
  {
    pregunta: '¿Cómo pides direcciones?',
    opciones: ['¿Dónde está...?', '¿Qué hora es?', '¿Cuánto cuesta?', '¿Cómo estás?'],
    respuestaCorrecta: '¿Dónde está...?',
  },
  {
    pregunta: '¿Qué significa "derecha"?',
    opciones: ['يمين', 'يسار', 'مستقيم', 'قريب'],
    respuestaCorrecta: 'يمين',
  },
  {
    pregunta: '¿Cómo se dice "izquierda" en árabe?',
    opciones: ['يسار', 'يمين', 'مستقيم', 'قريب'],
    respuestaCorrecta: 'يسار',
  },
  {
    pregunta: '¿Qué significa "recto"?',
    opciones: ['مستقيم', 'يمين', 'يسار', 'قريب'],
    respuestaCorrecta: 'مستقيم',
  },
  {
    pregunta: '¿Dónde está el banco?',
    opciones: ['Está cerca', 'Son las tres', 'Hace frío', 'Tengo hambre'],
    respuestaCorrecta: 'Está cerca',
  },
  // Unidad 6: Emociones y Salud
  {
    pregunta: '¿Cómo te sientes hoy?',
    opciones: ['Estoy contento', 'Tengo 25 años', 'Voy al médico', 'Me gusta el café'],
    respuestaCorrecta: 'Estoy contento',
  },
  {
    pregunta: 'Si alguien dice "Me duele la cabeza", ¿qué le pasa?',
    opciones: ['Tiene dolor de cabeza', 'Está contento', 'Tiene hambre', 'Quiere dormir'],
    respuestaCorrecta: 'Tiene dolor de cabeza',
  },
  {
    pregunta: '¿Qué haces cuando estás enfermo?',
    opciones: ['Voy al médico', 'Voy a la playa', 'Hago deporte', 'Voy de compras'],
    respuestaCorrecta: 'Voy al médico',
  },
  {
    pregunta: '¿Cómo te sientes cuando estás contento?',
    opciones: ['Estoy feliz', 'Estoy triste', 'Estoy cansado', 'Estoy enfermo'],
    respuestaCorrecta: 'Estoy feliz',
  },
  {
    pregunta: '¿Qué significa "dolor"?',
    opciones: ['ألم', 'صحة', 'طبيب', 'دواء'],
    respuestaCorrecta: 'ألم',
  },
  {
    pregunta: '¿Cómo se dice "médico" en árabe?',
    opciones: ['طبيب', 'مستشفى', 'دواء', 'صحة'],
    respuestaCorrecta: 'طبيب',
  },
  {
    pregunta: '¿Qué haces cuando tienes sed?',
    opciones: ['Bebo agua', 'Como pan', 'Duermo', 'Salgo'],
    respuestaCorrecta: 'Bebo agua',
  },
  {
    pregunta: '¿Cómo te sientes cuando tienes hambre?',
    opciones: ['Tengo hambre', 'Tengo sed', 'Tengo frío', 'Tengo calor'],
    respuestaCorrecta: 'Tengo hambre',
  },
  // Unidad 7: El Clima y las Estaciones
  {
    pregunta: '¿Cómo se dice "clima" en árabe?',
    opciones: ['طقس', 'مطر', 'شمس', 'ريح'],
    respuestaCorrecta: 'طقس',
  },
  {
    pregunta: '¿Cuál es la estación más calurosa del año?',
    opciones: ['Verano', 'Primavera', 'Otoño', 'Invierno'],
    respuestaCorrecta: 'Verano',
  },
  {
    pregunta: '¿Cómo se dice "lluvia" en árabe?',
    opciones: ['مطر', 'شمس', 'ريح', 'ثلج'],
    respuestaCorrecta: 'مطر',
  },
  {
    pregunta: '¿Qué tiempo hace hoy?',
    opciones: ['Hace buen tiempo', 'Tengo hambre', 'Son las tres', 'Voy al trabajo'],
    respuestaCorrecta: 'Hace buen tiempo',
  },
  {
    pregunta: '¿Cuál es la estación más fría?',
    opciones: ['Invierno', 'Verano', 'Primavera', 'Otoño'],
    respuestaCorrecta: 'Invierno',
  },
  {
    pregunta: '¿Qué significa "calor"?',
    opciones: ['حر', 'برد', 'مطر', 'شمس'],
    respuestaCorrecta: 'حر',
  },
  {
    pregunta: '¿Cómo se dice "frío" en árabe?',
    opciones: ['برد', 'حر', 'مطر', 'شمس'],
    respuestaCorrecta: 'برد',
  },
  // Unidad 8: Números y Tiempo
  {
    pregunta: '¿Cómo se dice "uno" en árabe?',
    opciones: ['واحد', 'اثنان', 'ثلاثة', 'أربعة'],
    respuestaCorrecta: 'واحد',
  },
  {
    pregunta: '¿Qué hora es?',
    opciones: ['Son las tres', 'Tengo hambre', 'Hace frío', 'Voy al trabajo'],
    respuestaCorrecta: 'Son las tres',
  },
  {
    pregunta: '¿Cómo se dice "dos" en árabe?',
    opciones: ['اثنان', 'واحد', 'ثلاثة', 'أربعة'],
    respuestaCorrecta: 'اثنان',
  },
  {
    pregunta: '¿Qué significa "mañana"?',
    opciones: ['غداً', 'أمس', 'اليوم', 'الآن'],
    respuestaCorrecta: 'غداً',
  },
  {
    pregunta: '¿Cómo se dice "ayer" en árabe?',
    opciones: ['أمس', 'غداً', 'اليوم', 'الآن'],
    respuestaCorrecta: 'أمس',
  },
  {
    pregunta: '¿Qué día es hoy?',
    opciones: ['Hoy es lunes', 'Tengo hambre', 'Hace frío', 'Voy al médico'],
    respuestaCorrecta: 'Hoy es lunes',
  },
  {
    pregunta: '¿Cómo se dice "tres" en árabe?',
    opciones: ['ثلاثة', 'واحد', 'اثنان', 'أربعة'],
    respuestaCorrecta: 'ثلاثة',
  },
  {
    pregunta: '¿Qué significa "hoy"?',
    opciones: ['اليوم', 'أمس', 'غداً', 'الآن'],
    respuestaCorrecta: 'اليوم',
  },
  {
    pregunta: '¿Cuántos días tiene la semana?',
    opciones: ['Siete días', 'Cinco días', 'Diez días', 'Tres días'],
    respuestaCorrecta: 'Siete días',
  },
  // Unidad 9: Compras y Tiendas
  {
    pregunta: '¿Dónde compras comida?',
    opciones: ['En el supermercado', 'En el banco', 'En el hospital', 'En la escuela'],
    respuestaCorrecta: 'En el supermercado',
  },
  {
    pregunta: '¿Cómo se dice "tienda" en árabe?',
    opciones: ['متجر', 'سوق', 'مطعم', 'مقهى'],
    respuestaCorrecta: 'متجر',
  },
  {
    pregunta: '¿Qué pregunta usas para saber el precio?',
    opciones: ['¿Cuánto cuesta?', '¿Qué hora es?', '¿Dónde está?', '¿Cómo estás?'],
    respuestaCorrecta: '¿Cuánto cuesta?',
  },
  {
    pregunta: '¿Cómo se dice "dinero" en árabe?',
    opciones: ['مال', 'سعر', 'متجر', 'شراء'],
    respuestaCorrecta: 'مال',
  },
  {
    pregunta: '¿Dónde compras ropa?',
    opciones: ['En una tienda de ropa', 'En el supermercado', 'En el banco', 'En el hospital'],
    respuestaCorrecta: 'En una tienda de ropa',
  },
  {
    pregunta: '¿Qué significa "comprar"?',
    opciones: ['شراء', 'بيع', 'سعر', 'مال'],
    respuestaCorrecta: 'شراء',
  },
  {
    pregunta: '¿Cómo pagas en una tienda?',
    opciones: ['Con dinero', 'Con palabras', 'Con tiempo', 'Con trabajo'],
    respuestaCorrecta: 'Con dinero',
  },
  {
    pregunta: '¿Qué pregunta usas para saber qué hay?',
    opciones: ['¿Qué tienes?', '¿Cuánto cuesta?', '¿Dónde está?', '¿Cómo estás?'],
    respuestaCorrecta: '¿Qué tienes?',
  },
  {
    pregunta: '¿Cómo se dice "barato" en árabe?',
    opciones: ['رخيص', 'غالي', 'جيد', 'سيء'],
    respuestaCorrecta: 'رخيص',
  },
  // Unidad 10: Transporte y Movilidad
  {
    pregunta: '¿Dónde esperas el autobús?',
    opciones: ['En la parada de autobús', 'En el banco', 'En el supermercado', 'En el hospital'],
    respuestaCorrecta: 'En la parada de autobús',
  },
  {
    pregunta: '¿Cómo se dice "coche" en árabe?',
    opciones: ['سيارة', 'حافلة', 'قطار', 'طائرة'],
    respuestaCorrecta: 'سيارة',
  },
  {
    pregunta: '¿Dónde tomas el autobús?',
    opciones: ['En la parada', 'En el banco', 'En el hospital', 'En la escuela'],
    respuestaCorrecta: 'En la parada',
  },
  {
    pregunta: '¿Qué significa "estación"?',
    opciones: ['محطة', 'شارع', 'مدينة', 'بلد'],
    respuestaCorrecta: 'محطة',
  },
  {
    pregunta: '¿Cómo se dice "tren" en árabe?',
    opciones: ['قطار', 'سيارة', 'حافلة', 'طائرة'],
    respuestaCorrecta: 'قطار',
  },
  {
    pregunta: '¿Dónde compras el billete?',
    opciones: ['En la taquilla', 'En el banco', 'En el supermercado', 'En el hospital'],
    respuestaCorrecta: 'En la taquilla',
  },
  {
    pregunta: '¿Qué significa "billete"?',
    opciones: ['تذكرة', 'مال', 'سعر', 'متجر'],
    respuestaCorrecta: 'تذكرة',
  },
  {
    pregunta: '¿Cómo vas a otro país?',
    opciones: ['En avión', 'A pie', 'En coche', 'En bicicleta'],
    respuestaCorrecta: 'En avión',
  },
  {
    pregunta: '¿Cómo se dice "aeropuerto" en árabe?',
    opciones: ['مطار', 'محطة', 'شارع', 'مدينة'],
    respuestaCorrecta: 'مطار',
  },
  // Preguntas adicionales basadas en formato DELE A1 - Instituto Cervantes
  // Gramática y estructuras básicas
  {
    pregunta: 'Completa: "Yo ___ de Marruecos"',
    opciones: ['soy', 'estoy', 'tengo', 'voy'],
    respuestaCorrecta: 'soy',
  },
  {
    pregunta: 'Completa: "Ella ___ 28 años"',
    opciones: ['tiene', 'es', 'está', 'va'],
    respuestaCorrecta: 'tiene',
  },
  {
    pregunta: '¿Cuál es la forma correcta?',
    opciones: ['Yo trabajo en un restaurante', 'Yo trabajas en un restaurante', 'Yo trabajamos en un restaurante', 'Yo trabajan en un restaurante'],
    respuestaCorrecta: 'Yo trabajo en un restaurante',
  },
  {
    pregunta: 'Completa: "Nosotros ___ estudiantes"',
    opciones: ['somos', 'estamos', 'tenemos', 'vamos'],
    respuestaCorrecta: 'somos',
  },
  {
    pregunta: '¿Cuál es la pregunta correcta para saber la profesión?',
    opciones: ['¿A qué te dedicas?', '¿Dónde vives?', '¿Cuántos años tienes?', '¿Cómo estás?'],
    respuestaCorrecta: '¿A qué te dedicas?',
  },
  // Vocabulario y situaciones cotidianas
  {
    pregunta: 'En un restaurante, ¿qué dices para pedir la cuenta?',
    opciones: ['La cuenta, por favor', 'Quiero comer', 'Tengo hambre', '¿Qué hay?'],
    respuestaCorrecta: 'La cuenta, por favor',
  },
  {
    pregunta: 'Si alguien te ayuda, ¿qué respondes?',
    opciones: ['Gracias', 'Por favor', 'Lo siento', 'De nada'],
    respuestaCorrecta: 'Gracias',
  },
  {
    pregunta: '¿Qué dices cuando no entiendes algo?',
    opciones: ['No entiendo', 'Estoy bien', 'Tengo razón', 'Me gusta'],
    respuestaCorrecta: 'No entiendo',
  },
  {
    pregunta: 'En una tienda, ¿cómo pides ayuda?',
    opciones: ['¿Me puede ayudar?', 'Quiero comprar', 'Es caro', 'No me gusta'],
    respuestaCorrecta: '¿Me puede ayudar?',
  },
  {
    pregunta: '¿Qué dices para disculparte?',
    opciones: ['Perdón', 'Gracias', 'Hola', 'Adiós'],
    respuestaCorrecta: 'Perdón',
  },
  // Números y cantidades
  {
    pregunta: '¿Cómo se dice "15" en español?',
    opciones: ['Quince', 'Cincuenta', 'Cinco', 'Ciento cinco'],
    respuestaCorrecta: 'Quince',
  },
  {
    pregunta: '¿Cómo se dice "100" en español?',
    opciones: ['Cien', 'Mil', 'Diez', 'Ciento'],
    respuestaCorrecta: 'Cien',
  },
  {
    pregunta: 'Si algo cuesta 25 euros, ¿cómo lo dices?',
    opciones: ['Veinticinco euros', 'Doscientos cinco euros', 'Veinte y cinco euros', 'Cincuenta euros'],
    respuestaCorrecta: 'Veinticinco euros',
  },
  // Tiempo y fechas
  {
    pregunta: '¿Cómo preguntas por la hora?',
    opciones: ['¿Qué hora es?', '¿Qué día es?', '¿Qué fecha es?', '¿Cuándo?'],
    respuestaCorrecta: '¿Qué hora es?',
  },
  {
    pregunta: 'Si son las 2:30, ¿cómo lo dices?',
    opciones: ['Son las dos y media', 'Son las dos y treinta', 'Son las dos menos treinta', 'Son las tres menos media'],
    respuestaCorrecta: 'Son las dos y media',
  },
  {
    pregunta: '¿Cuál es el primer día de la semana en España?',
    opciones: ['Lunes', 'Domingo', 'Martes', 'Sábado'],
    respuestaCorrecta: 'Lunes',
  },
  // Ordenar meses del año
  {
    tipo: 'ordenar',
    pregunta: 'Ordena los meses del año en el orden correcto',
    opciones: ['Enero', 'Febrero', 'Marzo', 'Abril', 'Mayo', 'Junio', 'Julio', 'Agosto', 'Septiembre', 'Octubre', 'Noviembre', 'Diciembre'],
    respuestaCorrecta: '',
    ordenCorrecto: ['Enero', 'Febrero', 'Marzo', 'Abril', 'Mayo', 'Junio', 'Julio', 'Agosto', 'Septiembre', 'Octubre', 'Noviembre', 'Diciembre'],
    tiempoSegundos: 30,
  },
  // Ordenar días de la semana
  {
    tipo: 'ordenar',
    pregunta: 'Ordena los días de la semana en el orden correcto',
    opciones: ['Lunes', 'Martes', 'Miércoles', 'Jueves', 'Viernes', 'Sábado', 'Domingo'],
    respuestaCorrecta: '',
    ordenCorrecto: ['Lunes', 'Martes', 'Miércoles', 'Jueves', 'Viernes', 'Sábado', 'Domingo'],
    tiempoSegundos: 30,
  },
  // Comida y bebida
  {
    pregunta: '¿Qué comes en el desayuno típico español?',
    opciones: ['Pan con tomate y aceite', 'Pescado', 'Carne', 'Pasta'],
    respuestaCorrecta: 'Pan con tomate y aceite',
  },
  {
    pregunta: '¿Cómo pides agua en un restaurante?',
    opciones: ['Un vaso de agua, por favor', 'Quiero agua', 'Dame agua', 'Agua ahora'],
    respuestaCorrecta: 'Un vaso de agua, por favor',
  },
  {
    pregunta: '¿Qué significa "tengo hambre"?',
    opciones: ['أنا جائع', 'أنا عطشان', 'أنا متعب', 'أنا سعيد'],
    respuestaCorrecta: 'أنا جائع',
  },
  {
    pregunta: '¿Cómo se dice "ملعقة" en español?',
    opciones: ['Cuchara', 'Tenedor', 'Cuchillo', 'Plato'],
    respuestaCorrecta: 'Cuchara',
  },
  // Direcciones y lugares
  {
    pregunta: 'Si alguien pregunta "¿Dónde está el banco?", ¿cómo respondes?',
    opciones: ['Está al lado de la farmacia', 'Tengo dinero', 'Voy al banco', 'Me gusta el banco'],
    respuestaCorrecta: 'Está al lado de la farmacia',
  },
  {
    pregunta: '¿Qué significa "enfrente de"?',
    opciones: ['مقابل', 'بجانب', 'خلف', 'بين'],
    respuestaCorrecta: 'مقابل',
  },
  {
    pregunta: '¿Dónde compras medicamentos?',
    opciones: ['En la farmacia', 'En el banco', 'En el supermercado', 'En la escuela'],
    respuestaCorrecta: 'En la farmacia',
  },
  {
    pregunta: '¿Dónde envías una carta?',
    opciones: ['En la oficina de correos', 'En el banco', 'En el hospital', 'En la escuela'],
    respuestaCorrecta: 'En la oficina de correos',
  },
  // Salud y bienestar
  {
    pregunta: 'Si tienes dolor de cabeza, ¿qué dices?',
    opciones: ['Me duele la cabeza', 'Tengo hambre', 'Estoy cansado', 'Tengo sed'],
    respuestaCorrecta: 'Me duele la cabeza',
  },
  {
    pregunta: '¿Dónde vas cuando estás enfermo?',
    opciones: ['Al médico', 'Al banco', 'Al supermercado', 'A la escuela'],
    respuestaCorrecta: 'Al médico',
  },
  {
    pregunta: '¿Qué significa "fiebre"?',
    opciones: ['حمى', 'صداع', 'سعال', 'برد'],
    respuestaCorrecta: 'حمى',
  },
  // Actividades diarias
  {
    pregunta: '¿Qué haces por la mañana?',
    opciones: ['Me levanto y me ducho', 'Tengo hambre', 'Voy al trabajo', 'Estoy cansado'],
    respuestaCorrecta: 'Me levanto y me ducho',
  },
  {
    pregunta: '¿Qué dices cuando quieres ir a dormir?',
    opciones: ['Me voy a la cama', 'Tengo hambre', 'Voy al trabajo', 'Estoy feliz'],
    respuestaCorrecta: 'Me voy a la cama',
  },
  {
    pregunta: '¿Qué haces los sábados?',
    opciones: ['Descanso y salgo con amigos', 'Trabajo', 'Estudio', 'Voy al médico'],
    respuestaCorrecta: 'Descanso y salgo con amigos',
  },
  // Descripción física y personalidad
  {
    pregunta: '¿Cómo describes a una persona alta?',
    opciones: ['Es alta', 'Es baja', 'Es gorda', 'Es delgada'],
    respuestaCorrecta: 'Es alta',
  },
  {
    pregunta: '¿Qué significa "simpático"?',
    opciones: ['لطيف', 'طويل', 'قصير', 'عجوز'],
    respuestaCorrecta: 'لطيف',
  },
  // Ropa y colores
  {
    pregunta: '¿Qué llevas en invierno?',
    opciones: ['Abrigo y bufanda', 'Bañador', 'Gafas de sol', 'Sombrero'],
    respuestaCorrecta: 'Abrigo y bufanda',
  },
  {
    pregunta: '¿Cómo se dice "zapatos" en árabe?',
    opciones: ['أحذية', 'جوارب', 'بنطلون', 'قميص'],
    respuestaCorrecta: 'أحذية',
  },
  // Compras y precios
  {
    pregunta: 'Si el precio es muy alto, ¿qué dices?',
    opciones: ['Es muy caro', 'Es barato', 'Me gusta', 'No quiero'],
    respuestaCorrecta: 'Es muy caro',
  },
  {
    pregunta: '¿Dónde pagas en una tienda?',
    opciones: ['En la caja', 'En el baño', 'En la calle', 'En la parada'],
    respuestaCorrecta: 'En la caja',
  },
  // Transporte
  {
    pregunta: '¿Dónde compras un billete de autobús?',
    opciones: ['En la taquilla', 'En la farmacia', 'En el banco', 'En la escuela'],
    respuestaCorrecta: 'En la taquilla',
  },
  {
    pregunta: '¿Qué necesitas para viajar en tren?',
    opciones: ['Un billete', 'Un coche', 'Un pasaporte', 'Un mapa'],
    respuestaCorrecta: 'Un billete',
  },
  // Clima
  {
    pregunta: 'Si hace mucho sol, ¿qué estación del año es?',
    opciones: ['Verano', 'Invierno', 'Otoño', 'Primavera'],
    respuestaCorrecta: 'Verano',
  },
  {
    pregunta: '¿Qué ropa llevas cuando hace calor?',
    opciones: ['Camiseta y pantalones cortos', 'Abrigo', 'Bufanda', 'Guantes'],
    respuestaCorrecta: 'Camiseta y pantalones cortos',
  },
  // Expresiones útiles
  {
    pregunta: 'Si alguien estornuda, ¿qué dices?',
    opciones: ['¡Salud!', 'Gracias', 'Perdón', 'De nada'],
    respuestaCorrecta: '¡Salud!',
  },
  {
    pregunta: '¿Cómo respondes a "¿Cómo estás?"?',
    opciones: ['Bien, gracias', 'Hola', 'Adiós', 'Por favor'],
    respuestaCorrecta: 'Bien, gracias',
  },
  {
    pregunta: '¿Qué dices cuando te presentan a alguien?',
    opciones: ['Mucho gusto', 'Hasta luego', 'Buenos días', 'De nada'],
    respuestaCorrecta: 'Mucho gusto',
  },
  // Comprensión de textos cortos
  {
    pregunta: 'Lee: "María tiene 25 años. Es estudiante. Vive en Madrid." ¿Qué estudia María?',
    opciones: ['No se menciona', 'Medicina', 'Derecho', 'Arquitectura'],
    respuestaCorrecta: 'No se menciona',
  },
  {
    pregunta: 'Lee: "Hoy es lunes. Mañana tengo examen." ¿Cuándo es el examen?',
    opciones: ['El martes', 'El lunes', 'El miércoles', 'El jueves'],
    respuestaCorrecta: 'El martes',
  },
];

// Banco de preguntas de relacionar para A1
const preguntasRelacionar: PreguntaBase[] = [
  // Saludos y presentaciones
  {
    tipo: 'relacionar',
    pregunta: 'Relaciona cada saludo en español con su traducción al árabe',
    opciones: [],
    respuestaCorrecta: '',
    pares: [
      { izquierda: 'Hola', derecha: 'مرحبا' },
      { izquierda: 'Buenos días', derecha: 'صباح الخير' },
      { izquierda: 'Buenas tardes', derecha: 'مساء الخير' },
      { izquierda: 'Adiós', derecha: 'وداعا' },
      { izquierda: 'Gracias', derecha: 'شكرا' },
    ],
    tiempoSegundos: 30,
  },
  // Familia
  {
    tipo: 'relacionar',
    pregunta: 'Relaciona cada palabra de familia en español con su traducción al árabe',
    opciones: [],
    respuestaCorrecta: '',
    pares: [
      { izquierda: 'Padre', derecha: 'أب' },
      { izquierda: 'Madre', derecha: 'أم' },
      { izquierda: 'Hermano', derecha: 'أخ' },
      { izquierda: 'Hermana', derecha: 'أخت' },
      { izquierda: 'Hijo', derecha: 'ابن' },
      { izquierda: 'Hija', derecha: 'ابنة' },
    ],
    tiempoSegundos: 30,
  },
  // Números
  {
    tipo: 'relacionar',
    pregunta: 'Relaciona cada número en español con su escritura en árabe',
    opciones: [],
    respuestaCorrecta: '',
    pares: [
      { izquierda: 'Uno', derecha: 'واحد' },
      { izquierda: 'Dos', derecha: 'اثنان' },
      { izquierda: 'Tres', derecha: 'ثلاثة' },
      { izquierda: 'Cuatro', derecha: 'أربعة' },
      { izquierda: 'Cinco', derecha: 'خمسة' },
      { izquierda: 'Seis', derecha: 'ستة' },
    ],
    tiempoSegundos: 30,
  },
  // Partes de la casa
  {
    tipo: 'relacionar',
    pregunta: 'Relaciona cada parte de la casa en español con su traducción al árabe',
    opciones: [],
    respuestaCorrecta: '',
    pares: [
      { izquierda: 'Cocina', derecha: 'مطبخ' },
      { izquierda: 'Dormitorio', derecha: 'غرفة نوم' },
      { izquierda: 'Baño', derecha: 'حمام' },
      { izquierda: 'Sala', derecha: 'غرفة جلوس' },
      { izquierda: 'Puerta', derecha: 'باب' },
      { izquierda: 'Ventana', derecha: 'نافذة' },
    ],
    tiempoSegundos: 30,
  },
  // Días de la semana
  {
    tipo: 'relacionar',
    pregunta: 'Relaciona cada día de la semana en español con su traducción al árabe',
    opciones: [],
    respuestaCorrecta: '',
    pares: [
      { izquierda: 'Lunes', derecha: 'الاثنين' },
      { izquierda: 'Martes', derecha: 'الثلاثاء' },
      { izquierda: 'Miércoles', derecha: 'الأربعاء' },
      { izquierda: 'Jueves', derecha: 'الخميس' },
      { izquierda: 'Viernes', derecha: 'الجمعة' },
      { izquierda: 'Sábado', derecha: 'السبت' },
      { izquierda: 'Domingo', derecha: 'الأحد' },
    ],
    tiempoSegundos: 30,
  },
  // Comida y bebida
  {
    tipo: 'relacionar',
    pregunta: 'Relaciona cada alimento en español con su traducción al árabe',
    opciones: [],
    respuestaCorrecta: '',
    pares: [
      { izquierda: 'Pan', derecha: 'خبز' },
      { izquierda: 'Agua', derecha: 'ماء' },
      { izquierda: 'Leche', derecha: 'حليب' },
      { izquierda: 'Café', derecha: 'قهوة' },
      { izquierda: 'Huevo', derecha: 'بيض' },
      { izquierda: 'Carne', derecha: 'لحم' },
    ],
    tiempoSegundos: 30,
  },
  // Colores
  {
    tipo: 'relacionar',
    pregunta: 'Relaciona cada color en español con su traducción al árabe',
    opciones: [],
    respuestaCorrecta: '',
    pares: [
      { izquierda: 'Rojo', derecha: 'أحمر' },
      { izquierda: 'Azul', derecha: 'أزرق' },
      { izquierda: 'Verde', derecha: 'أخضر' },
      { izquierda: 'Amarillo', derecha: 'أصفر' },
      { izquierda: 'Blanco', derecha: 'أبيض' },
      { izquierda: 'Negro', derecha: 'أسود' },
    ],
    tiempoSegundos: 30,
  },
  // Profesiones
  {
    tipo: 'relacionar',
    pregunta: 'Relaciona cada profesión en español con su traducción al árabe',
    opciones: [],
    respuestaCorrecta: '',
    pares: [
      { izquierda: 'Médico', derecha: 'طبيب' },
      { izquierda: 'Profesor', derecha: 'معلم' },
      { izquierda: 'Estudiante', derecha: 'طالب' },
      { izquierda: 'Cocinero', derecha: 'طباخ' },
      { izquierda: 'Enfermero', derecha: 'ممرض' },
    ],
    tiempoSegundos: 30,
  },
  // Transporte
  {
    tipo: 'relacionar',
    pregunta: 'Relaciona cada medio de transporte en español con su traducción al árabe',
    opciones: [],
    respuestaCorrecta: '',
    pares: [
      { izquierda: 'Coche', derecha: 'سيارة' },
      { izquierda: 'Autobús', derecha: 'حافلة' },
      { izquierda: 'Tren', derecha: 'قطار' },
      { izquierda: 'Bicicleta', derecha: 'دراجة' },
      { izquierda: 'Avión', derecha: 'طائرة' },
    ],
    tiempoSegundos: 30,
  },
  // Verbos comunes
  {
    tipo: 'relacionar',
    pregunta: 'Relaciona cada verbo en español con su traducción al árabe',
    opciones: [],
    respuestaCorrecta: '',
    pares: [
      { izquierda: 'Comer', derecha: 'أكل' },
      { izquierda: 'Beber', derecha: 'شرب' },
      { izquierda: 'Dormir', derecha: 'نام' },
      { izquierda: 'Estudiar', derecha: 'درس' },
      { izquierda: 'Trabajar', derecha: 'عمل' },
      { izquierda: 'Hablar', derecha: 'تكلم' },
    ],
    tiempoSegundos: 30,
  },
];

// Enunciados orales (A1)
const oralPrompts = [
  'Hola, me llamo Ana.',
  'Vivo en Madrid.',
  'Tengo 25 años.',
  'Soy estudiante.',
  'Me gusta el café.'
];

// Gate de oral usará el mismo set de 5 frases
const oralGatePrompts = oralPrompts;

const buildWebSpeechHTML = (promptText: string) => `
  <!DOCTYPE html>
  <html lang="es">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <style>
      body { font-family: system-ui, -apple-system, Segoe UI, Roboto, sans-serif; padding: 16px; }
      .btn { padding: 10px 14px; border-radius: 8px; color: #fff; border: 0; margin-right: 8px; }
      .start { background: #9DC3AA; }
      .stop { background: #e53935; }
      .box { background: #f5f5f5; padding: 12px; border-radius: 8px; margin-top: 12px; }
      .prompt { background: #f0f8f0; border-left: 4px solid #9DC3AA; padding: 10px; border-radius: 8px; margin-bottom: 12px; }
    </style>
  </head>
  <body>
    <h3>Reconocimiento Web (beta)</h3>
    <div style="color:#555; font-size:14px; margin-bottom:8px;">El reconocimiento se inicia automáticamente. Si no empieza, pulsa "Hablar".</div>
    <div class="prompt">
      <div style="font-weight:600; color:#000; margin-bottom:6px;">Texto a leer</div>
      <div id="target">${(promptText || '').replace(/</g,'&lt;')}</div>
    </div>
    <button class="btn start" id="start">Hablar / <span dir="rtl">تحدث</span></button>
    <button class="btn stop" id="stop">Detener / <span dir="rtl">إيقاف</span></button>
    <div class="box">
      <div id="status">Listo</div>
      <div id="out" style="margin-top:8px"></div>
    </div>
    <div style="text-align:center; margin-top:12px;">
      <div id="msg" style="font-size:18px; font-weight:600; color:#c62828"></div>
      <div id="emoji" style="font-size:48px; margin-top:6px;">😐</div>
      <div id="pct" style="font-size:56px; font-weight:bold; color:#c62828;">0%</div>
    </div>
    <script>
      (function(){
        const RN = window.ReactNativeWebView;
        const SR = window.SpeechRecognition || window.webkitSpeechRecognition;
        let rec = null;
        const status = document.getElementById('status');
        const out = document.getElementById('out');
        const pctEl = document.getElementById('pct');
        const msgEl = document.getElementById('msg');
        const norm = (s) => (s||'').toLowerCase().normalize('NFC').replace(/[^a-záéíóúüñ\s]/g,'').trim();
        const target = norm(${JSON.stringify(''+(typeof promptText==='string'?promptText:''))});
        function scoreSimilarity(user, model){
          const u = norm(user).split(/\s+/).filter(Boolean);
          const m = norm(model).split(/\s+/).filter(Boolean);
          if (m.length === 0) return 0;
          const setU = new Set(u);
          let hits = 0; for (const w of m) if (setU.has(w)) hits++;
          return Math.min(100, Math.round((hits / m.length) * 100));
        }
        function renderScore(p){
          pctEl.textContent = p + '%';
          const ok = p === 100;
          pctEl.style.color = ok ? '#2e7d32' : '#c62828';
          msgEl.textContent = ok ? '¡Enhorabuena!' : 'Sigue intentando';
          msgEl.style.color = ok ? '#2e7d32' : '#c62828';
        }
        function send(type, payload){ try { RN.postMessage(JSON.stringify({ type, payload })); } catch(e) {} }
        if (!SR) { status.textContent = 'Web Speech no disponible'; send('error','no-sr'); }
        else {
          rec = new SR(); rec.lang='es-ES'; rec.interimResults=true; rec.maxAlternatives=1;
          rec.onstart=()=>{ status.textContent='Grabando...'; send('status','start'); };
          rec.onend=()=>{ status.textContent='Detenido'; send('status','end'); };
          rec.onerror=(e)=>{ status.textContent='Error: '+(e.error||''); send('error',e.error||'error'); };
          rec.onresult=(e)=>{ let txt=''; for(let i=e.resultIndex;i<e.results.length;i++){ txt += e.results[i][0].transcript+' '; }
            out.textContent=txt.trim(); const p=scoreSimilarity(txt.trim(), target); renderScore(p); send('result',{ text: txt.trim(), percent: p }); };
        }
        document.getElementById('start').onclick=()=>{ try{ rec && rec.start(); }catch(e){} };
        document.getElementById('stop').onclick=()=>{ try{ rec && rec.stop(); }catch(e){} };
        setTimeout(()=>{ try{ rec && rec.start(); }catch(e){} }, 300);
      })();
    </script>
  </body>
  </html>
`;

export default function ExamenFinal() {
  const router = useRouter();
  const { progress, markOralPassed, markWrittenPassed } = useUserProgress();
  const levelProgress = progress.A1;
  const oralPassedFromContext = levelProgress?.oralPassed ?? false;
  const writtenPassedFromContext = levelProgress?.writtenPassed ?? false;

  // Estados del examen escrito
  const [preguntaActual, setPreguntaActual] = useState(0);
  const [respuestas, setRespuestas] = useState<string[]>([]);
  const [respuestasIdx, setRespuestasIdx] = useState<number[]>([]);
  const [correctas, setCorrectas] = useState<boolean[]>([]);
  
  // Estados para preguntas de relacionar
  const [relLeft, setRelLeft] = useState<Record<number, string[]>>({});
  const [relRight, setRelRight] = useState<Record<number, string[]>>({});
  const [relSelectedLeft, setRelSelectedLeft] = useState<Record<number, number | null>>({});
  const [relUserMatches, setRelUserMatches] = useState<Record<number, Record<number, number>>>({});
  
  // Estados para preguntas de ordenar
  const [ordenUsuario, setOrdenUsuario] = useState<Record<number, string[]>>({});
  const [tiempoRestante, setTiempoRestante] = useState(15);
  const [examenTerminado, setExamenTerminado] = useState(false);
  const [puntuacion, setPuntuacion] = useState(0);
  const [preguntas, setPreguntas] = useState<Pregunta[]>([]);
  const [examenIniciado, setExamenIniciado] = useState(false);
  const [examStopped, setExamStopped] = useState(false);
  const [respuestaSeleccionada, setRespuestaSeleccionada] = useState<string | null>(null);
  const [mostrarResultado, setMostrarResultado] = useState(false);

  // Estados del examen oral
  const [oralMode, setOralMode] = useState(false);
  const [oralIdx, setOralIdx] = useState(0);
  const [oralTranscripts, setOralTranscripts] = useState<Record<number, string>>({});
  const [oralFinished, setOralFinished] = useState(false);
  const [oralScore, setOralScore] = useState(0);
  const [oralScores, setOralScores] = useState<number[]>([0,0,0,0,0]);
  const [oralGatePassed, setOralGatePassed] = useState(oralPassedFromContext);
  const [writtenPassed, setWrittenPassed] = useState(writtenPassedFromContext);

  // WebView oral gate
  const [webMode, setWebMode] = useState(false);
  const [oralGateIndex, setOralGateIndex] = useState(0);
  const [webPromptText, setWebPromptText] = useState('');
  const [webPercent, setWebPercent] = useState<number | null>(null);

  const progressAnimation = useRef(new Animated.Value(0)).current;
  const timerRef = useRef<NodeJS.Timeout | null>(null);
  const appStateRef = useRef(AppState.currentState);

  useEffect(() => {
    setOralGatePassed(oralPassedFromContext);
  }, [oralPassedFromContext]);

  useEffect(() => {
    setWrittenPassed(writtenPassedFromContext);
  }, [writtenPassedFromContext]);

  // Función para barajar array con semilla
  const seededShuffle = <T,>(array: T[], seed: number): T[] => {
    const rng = (a: number) => {
      let t = (a += 0x6D2B79F5);
      t = Math.imul(t ^ (t >>> 15), t | 1);
      t ^= t + Math.imul(t ^ (t >>> 7), t | 61);
      return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
    };
    const arr = [...array];
    for (let i = arr.length - 1; i > 0; i--) {
      const j = Math.floor(rng(seed || 1) * (i + 1));
      [arr[i], arr[j]] = [arr[j], arr[i]];
    }
    return arr;
  };

  // Preparar preguntas al iniciar - Sistema de 30 preguntas aleatorias del banco (incluye relacionar)
  useEffect(() => {
    const loadQuestions = async () => {
      try {
        const QUESTIONS_PER_EXAM = 30;
        // Combinar preguntas normales y de relacionar
        const ALL_QUESTIONS = [...preguntasOriginales, ...preguntasRelacionar];
        
        // Obtener índices de preguntas usadas en el intento anterior (si falló)
        const usedIndicesStr = await AsyncStorage.getItem('A1_examen_preguntas_usadas');
        let usedIndices: number[] = [];
        if (usedIndicesStr) {
          try {
            usedIndices = JSON.parse(usedIndicesStr);
          } catch (e) {
            console.error('Error parseando índices usados:', e);
          }
        }

        // Crear array de índices disponibles (excluyendo los usados)
        const availableIndices = ALL_QUESTIONS
          .map((_, idx) => idx)
          .filter(idx => !usedIndices.includes(idx));

        // Si no hay suficientes preguntas disponibles, resetear (usar todas)
        const indicesToUse = availableIndices.length >= QUESTIONS_PER_EXAM
          ? availableIndices
          : ALL_QUESTIONS.map((_, idx) => idx);

        // Seleccionar 30 preguntas aleatorias
        const selectedIndices = seededShuffle(indicesToUse, Date.now()).slice(0, QUESTIONS_PER_EXAM);
        
        // Guardar los índices seleccionados para este intento
        await AsyncStorage.setItem('A1_examen_preguntas_actuales', JSON.stringify(selectedIndices));

        // Obtener las preguntas seleccionadas y prepararlas
        const selectedQuestions = selectedIndices.map(idx => ALL_QUESTIONS[idx]);
        const base: Pregunta[] = selectedQuestions
          .map((pregunta, idx) => {
            if (pregunta.tipo === 'relacionar' && pregunta.pares) {
              // Preparar preguntas de relacionar
              const left = pregunta.pares.map(p => p.izquierda);
              const right = pregunta.pares.map(p => p.derecha);
              const shuffledLeft = seededShuffle(left, 100 + idx * 1013);
              const shuffledRight = seededShuffle(right, 200 + idx * 1013);
              
              // Guardar temporalmente en un objeto para luego asignar con el índice correcto
              // IMPORTANTE: Preservar tiempoSegundos si existe
              const preguntaProcesada = { 
                ...pregunta, 
                opciones: [], 
                respuestaCorrecta: '', 
                correctaIdx: undefined,
                tiempoSegundos: pregunta.tiempoSegundos || 30, // Preservar explícitamente, default 30 para relacionar
                _relLeft: shuffledLeft,
                _relRight: shuffledRight,
              };
              // Debug: verificar que tiempoSegundos se preservó
              if (pregunta.tipo === 'relacionar') {
                console.log('🔧 Procesando pregunta relacionar - tiempoSegundos original:', pregunta.tiempoSegundos, 'preservado:', preguntaProcesada.tiempoSegundos);
              }
              return preguntaProcesada;
            } else {
              // Preparar preguntas de opción múltiple
              const opcionesMezcladas = seededShuffle(pregunta.opciones, 100 + idx * 1013);
              const correctaIdx = opcionesMezcladas.findIndex(
                (o) => (o || '').trim().toLowerCase().normalize('NFC') === (pregunta.respuestaCorrecta || '').trim().toLowerCase().normalize('NFC')
              );
              return { 
                ...pregunta, 
                opciones: opcionesMezcladas, 
                respuestaCorrecta: pregunta.respuestaCorrecta, 
                tiempoSegundos: pregunta.tiempoSegundos, // Preservar explícitamente
                correctaIdx 
              };
            }
          });

        const barajadas = seededShuffle(base, Date.now());
        
        // Ahora asignar los estados de relacionar con el índice correcto después de barajar
        const newRelLeft: Record<number, string[]> = {};
        const newRelRight: Record<number, string[]> = {};
        const newRelSelectedLeft: Record<number, number | null> = {};
        const newRelUserMatches: Record<number, Record<number, number>> = {};
        
        barajadas.forEach((pregunta, finalIdx) => {
          if (pregunta.tipo === 'relacionar' && (pregunta as any)._relLeft) {
            newRelLeft[finalIdx] = (pregunta as any)._relLeft;
            newRelRight[finalIdx] = (pregunta as any)._relRight;
            newRelSelectedLeft[finalIdx] = null;
            newRelUserMatches[finalIdx] = {};
            console.log(`✅ Inicializado relacionar en índice ${finalIdx}:`, {
              left: (pregunta as any)._relLeft,
              right: (pregunta as any)._relRight
            });
            // Limpiar los datos temporales
            delete (pregunta as any)._relLeft;
            delete (pregunta as any)._relRight;
          }
        });
        
        console.log('📦 Estados de relacionar a guardar:', {
          relLeft: newRelLeft,
          relRight: newRelRight
        });
        
        setRelLeft(newRelLeft);
        setRelRight(newRelRight);
        setRelSelectedLeft(newRelSelectedLeft);
        setRelUserMatches(newRelUserMatches);
        
        setPreguntas(barajadas);
        setRespuestas(Array(barajadas.length).fill(''));
        setRespuestasIdx(Array(barajadas.length).fill(-1));
        setCorrectas(Array(barajadas.length).fill(false));
        
        // Inicializar orden para preguntas de ordenar
        const newOrdenUsuario: Record<number, string[]> = {};
        barajadas.forEach((pregunta, idx) => {
          if (pregunta.tipo === 'ordenar' && pregunta.ordenCorrecto) {
            // Inicializar con el orden mezclado
            newOrdenUsuario[idx] = seededShuffle([...pregunta.ordenCorrecto], 300 + idx * 1013);
          }
        });
        setOrdenUsuario(newOrdenUsuario);
        
        // Establecer tiempo inicial de la primera pregunta
        if (barajadas.length > 0) {
          const primeraPregunta = barajadas[0];
          // Para preguntas de relacionar, usar 30 segundos por defecto
          let tiempoInicial = primeraPregunta?.tiempoSegundos;
          if (primeraPregunta?.tipo === 'relacionar') {
            tiempoInicial = tiempoInicial || 30;
          } else {
            tiempoInicial = tiempoInicial || 15;
          }
          setTiempoRestante(tiempoInicial);
        }
      } catch (err) {
        console.error('Error cargando preguntas A1:', err);
        // Fallback a sistema anterior
        const base: Pregunta[] = preguntasOriginales
          .map((pregunta, idx) => {
            const opcionesMezcladas = seededShuffle(pregunta.opciones, 100 + idx * 1013);
            const correctaIdx = opcionesMezcladas.findIndex(
              (o) => (o || '').trim().toLowerCase().normalize('NFC') === (pregunta.respuestaCorrecta || '').trim().toLowerCase().normalize('NFC')
            );
            return { ...pregunta, opciones: opcionesMezcladas, respuestaCorrecta: pregunta.respuestaCorrecta, correctaIdx };
          });
        const barajadas = seededShuffle(base, 1000);
        const seleccion: Pregunta[] = barajadas.slice(0, Math.min(20, barajadas.length));
        setPreguntas(seleccion);
        setRespuestas(Array(seleccion.length).fill(''));
        setRespuestasIdx(Array(seleccion.length).fill(-1));
        setCorrectas(Array(seleccion.length).fill(false));
      }
    };

    loadQuestions();
  }, []);

  // Detectar cuando la app pasa a segundo plano durante el examen
  useEffect(() => {
    if (!examenIniciado) return;

    const subscription = AppState.addEventListener('change', (nextAppState) => {
      if (
        appStateRef.current.match(/active/) &&
        nextAppState.match(/inactive|background/)
      ) {
        // La app pasó a segundo plano durante el examen
        console.warn('⚠️ App pasó a segundo plano durante el examen');
        setExamStopped(true);
        setExamenIniciado(false);
        setExamenTerminado(true);
        
        Alert.alert(
          '❌ Examen Perdido',
          'Has salido de la aplicación durante el examen. El examen ha sido cancelado automáticamente por seguridad.\n\nSi sales de la app durante el examen, pierdes automáticamente.',
          [
            {
              text: 'Entendido',
              onPress: () => {
                router.replace('/(tabs)/A1_Acceso');
              },
            },
          ],
          { cancelable: false }
        );
      }
      appStateRef.current = nextAppState;
    });

    return () => {
      subscription.remove();
    };
  }, [examenIniciado]);

  // Inicializar datos de relacionar cuando cambia la pregunta
  useEffect(() => {
    if (preguntas.length > 0 && preguntaActual < preguntas.length) {
      const pregunta = preguntas[preguntaActual];
      if (pregunta.tipo === 'relacionar' && pregunta.pares) {
        // Si no están inicializados, inicializarlos
        if (!relLeft[preguntaActual] || !relRight[preguntaActual]) {
          console.log('🔧 Inicializando datos de relacionar para pregunta', preguntaActual);
          const left = pregunta.pares.map(p => p.izquierda);
          const right = pregunta.pares.map(p => p.derecha);
          const shuffledLeft = seededShuffle(left, 100 + preguntaActual * 1013);
          const shuffledRight = seededShuffle(right, 200 + preguntaActual * 1013);
          
          console.log('📋 Datos preparados:', { left: shuffledLeft, right: shuffledRight });
          
          setRelLeft(prev => {
            const nuevo = { ...prev, [preguntaActual]: shuffledLeft };
            console.log('✅ relLeft actualizado:', nuevo);
            return nuevo;
          });
          setRelRight(prev => {
            const nuevo = { ...prev, [preguntaActual]: shuffledRight };
            console.log('✅ relRight actualizado:', nuevo);
            return nuevo;
          });
          setRelSelectedLeft(prev => ({ ...prev, [preguntaActual]: null }));
          setRelUserMatches(prev => ({ ...prev, [preguntaActual]: {} }));
        } else {
          console.log('✅ Datos de relacionar ya existen para pregunta', preguntaActual, {
            left: relLeft[preguntaActual],
            right: relRight[preguntaActual]
          });
        }
      }
    }
  }, [preguntaActual, preguntas, relLeft, relRight]);

  // Timer para cada pregunta
  useEffect(() => {
    if (examenIniciado && !examenTerminado && !mostrarResultado && preguntas.length > 0) {
      if (timerRef.current) {
        clearInterval(timerRef.current);
        timerRef.current = null;
      }

      // Obtener tiempo de la pregunta actual ANTES de iniciar el timer
      const preguntaActualObj = preguntas[preguntaActual];
      // Para preguntas de relacionar, SIEMPRE usar 30 segundos
      let tiempoPregunta: number;
      if (preguntaActualObj?.tipo === 'relacionar') {
        tiempoPregunta = 30; // SIEMPRE 30 segundos para relacionar
      } else {
        tiempoPregunta = preguntaActualObj?.tiempoSegundos || 15;
      }
      
      // Debug: verificar tiempo de preguntas de relacionar
      if (preguntaActualObj?.tipo === 'relacionar') {
        console.log('🔍 Pregunta relacionar - FORZANDO 30 segundos. tiempoSegundos en objeto:', preguntaActualObj.tiempoSegundos, 'tiempoPregunta final:', tiempoPregunta);
      }
      
      // Actualizar tiempo restante con el tiempo de la pregunta actual
      setTiempoRestante(tiempoPregunta);

      timerRef.current = setInterval(() => {
        setTiempoRestante((prev) => {
          if (prev <= 1) {
            if (timerRef.current) {
              clearInterval(timerRef.current);
              timerRef.current = null;
            }
            // Obtener tiempo de la siguiente pregunta
            const siguienteIdx = preguntaActual < preguntas.length - 1 ? preguntaActual + 1 : preguntaActual;
            const siguientePregunta = preguntas[siguienteIdx];
            // Para preguntas de relacionar, SIEMPRE usar 30 segundos
            let tiempoSiguiente: number;
            if (siguientePregunta?.tipo === 'relacionar') {
              tiempoSiguiente = 30; // SIEMPRE 30 segundos para relacionar
            } else {
              tiempoSiguiente = siguientePregunta?.tiempoSegundos || 15;
            }
            
            if (preguntaActual < preguntas.length - 1) {
              const nuevaPregunta = preguntaActual + 1;
              setPreguntaActual(nuevaPregunta);
              setTiempoRestante(tiempoSiguiente);
              setRespuestaSeleccionada(null);
              setMostrarResultado(false);
              progressAnimation.setValue(0);
            } else {
              finalizarExamen(respuestas);
            }
            return tiempoSiguiente;
          }
          return prev - 1;
        });
      }, 1000);
      
      Animated.timing(progressAnimation, {
        toValue: 1,
        duration: tiempoPregunta * 1000,
        easing: Easing.linear,
        useNativeDriver: false,
      }).start();
    }

    return () => {
      if (timerRef.current) {
        clearInterval(timerRef.current);
        timerRef.current = null;
      }
    };
  }, [preguntaActual, examenIniciado, examenTerminado, mostrarResultado, preguntas]);

  const iniciarExamen = () => {
    if (!oralGatePassed && !oralMode) {
      Alert.alert(
        'Examen Bloqueado',
        'Debes aprobar primero el examen oral antes de realizar el examen escrito.',
        [{ text: 'Entendido' }]
      );
      return;
    }
    setExamenIniciado(true);
    // Establecer tiempo de la primera pregunta si existe
    if (preguntas.length > 0) {
      const primeraPregunta = preguntas[0];
      // Para preguntas de relacionar, SIEMPRE usar 30 segundos
      let tiempoInicial: number;
      if (primeraPregunta?.tipo === 'relacionar') {
        tiempoInicial = 30; // SIEMPRE 30 segundos para relacionar
      } else {
        tiempoInicial = primeraPregunta?.tiempoSegundos || 15;
      }
      setTiempoRestante(tiempoInicial);
    }
    setMostrarResultado(false);
    setRespuestaSeleccionada(null);
  };

  const handleTabChange = (tab: 'escrito' | 'oral') => {
    if (tab === 'escrito' && !oralGatePassed) {
      Alert.alert(
        'Examen Bloqueado',
        'Debes aprobar primero el examen oral antes de realizar el examen escrito.',
        [{ text: 'Entendido' }]
      );
      return;
    }
    setOralMode(tab === 'oral');
  };

  const resetExamen = async () => {
    setExamenIniciado(false);
    setExamenTerminado(false);
    setPreguntaActual(0);
    setRespuestas([]);
    setRespuestasIdx([]);
    setCorrectas([]);
    setPuntuacion(0);
    // El tiempo se establecerá automáticamente cuando se carguen las preguntas
    setRespuestaSeleccionada(null);
    setMostrarResultado(false);
    progressAnimation.setValue(0);
    if (timerRef.current) {
      clearInterval(timerRef.current);
      timerRef.current = null;
    }
    
    // Recargar las preguntas para el nuevo intento
    try {
      const QUESTIONS_PER_EXAM = 30;
      // Combinar preguntas normales y de relacionar
      const ALL_QUESTIONS = [...preguntasOriginales, ...preguntasRelacionar];
      
      // Obtener índices de preguntas usadas en intentos anteriores
      const usedIndicesStr = await AsyncStorage.getItem('A1_examen_preguntas_usadas');
      let usedIndices: number[] = [];
      if (usedIndicesStr) {
        try {
          usedIndices = JSON.parse(usedIndicesStr);
        } catch (e) {
          console.error('Error parseando índices usados:', e);
        }
      }

      // Crear array de índices disponibles (excluyendo los usados)
      const availableIndices = ALL_QUESTIONS
        .map((_, idx) => idx)
        .filter(idx => !usedIndices.includes(idx));

      // Si no hay suficientes preguntas disponibles, resetear las preguntas usadas (usar todas)
      let indicesToUse = availableIndices;
      if (availableIndices.length < QUESTIONS_PER_EXAM) {
        // Limpiar las preguntas usadas para permitir reintentos
        await AsyncStorage.removeItem('A1_examen_preguntas_usadas');
        indicesToUse = ALL_QUESTIONS.map((_, idx) => idx);
      }

      // Seleccionar 30 preguntas aleatorias
      const selectedIndices = seededShuffle(indicesToUse, Date.now()).slice(0, QUESTIONS_PER_EXAM);
      
      // Guardar los índices seleccionados para este intento
      await AsyncStorage.setItem('A1_examen_preguntas_actuales', JSON.stringify(selectedIndices));

      // Obtener las preguntas seleccionadas y prepararlas
      const selectedQuestions = selectedIndices.map(idx => ALL_QUESTIONS[idx]);
      const base: Pregunta[] = selectedQuestions
        .map((pregunta, idx) => {
          if (pregunta.tipo === 'relacionar' && pregunta.pares) {
            // Preparar preguntas de relacionar
            const left = pregunta.pares.map(p => p.izquierda);
            const right = pregunta.pares.map(p => p.derecha);
            const shuffledLeft = seededShuffle(left, 100 + idx * 1013);
            const shuffledRight = seededShuffle(right, 200 + idx * 1013);
            
            // Guardar temporalmente en un objeto para luego asignar con el índice correcto
            return { 
              ...pregunta, 
              opciones: [], 
              respuestaCorrecta: '', 
              correctaIdx: undefined,
              _relLeft: shuffledLeft,
              _relRight: shuffledRight,
            };
          } else {
            // Preparar preguntas de opción múltiple
            const opcionesMezcladas = seededShuffle(pregunta.opciones, 100 + idx * 1013);
            const correctaIdx = opcionesMezcladas.findIndex(
              (o) => (o || '').trim().toLowerCase().normalize('NFC') === (pregunta.respuestaCorrecta || '').trim().toLowerCase().normalize('NFC')
            );
            return { ...pregunta, opciones: opcionesMezcladas, respuestaCorrecta: pregunta.respuestaCorrecta, correctaIdx };
          }
        });

      const barajadas = seededShuffle(base, Date.now());
      
      // Ahora asignar los estados de relacionar con el índice correcto después de barajar
      const newRelLeft: Record<number, string[]> = {};
      const newRelRight: Record<number, string[]> = {};
      const newRelSelectedLeft: Record<number, number | null> = {};
      const newRelUserMatches: Record<number, Record<number, number>> = {};
      
      barajadas.forEach((pregunta, finalIdx) => {
        if (pregunta.tipo === 'relacionar' && (pregunta as any)._relLeft) {
          newRelLeft[finalIdx] = (pregunta as any)._relLeft;
          newRelRight[finalIdx] = (pregunta as any)._relRight;
          newRelSelectedLeft[finalIdx] = null;
          newRelUserMatches[finalIdx] = {};
          // Limpiar los datos temporales
          delete (pregunta as any)._relLeft;
          delete (pregunta as any)._relRight;
        }
      });
      
      setRelLeft(newRelLeft);
      setRelRight(newRelRight);
      setRelSelectedLeft(newRelSelectedLeft);
      setRelUserMatches(newRelUserMatches);
      
      setPreguntas(barajadas);
      setRespuestas(Array(barajadas.length).fill(''));
      setRespuestasIdx(Array(barajadas.length).fill(-1));
      setCorrectas(Array(barajadas.length).fill(false));
      
      // Inicializar orden para preguntas de ordenar
      const newOrdenUsuario: Record<number, string[]> = {};
      barajadas.forEach((pregunta, idx) => {
        if (pregunta.tipo === 'ordenar' && pregunta.ordenCorrecto) {
          // Inicializar con el orden mezclado
          newOrdenUsuario[idx] = seededShuffle([...pregunta.ordenCorrecto], 300 + idx * 1013);
        }
      });
      setOrdenUsuario(newOrdenUsuario);
      
      // Establecer tiempo inicial de la primera pregunta
      if (barajadas.length > 0) {
        const primeraPregunta = barajadas[0];
          // Para preguntas de relacionar, SIEMPRE usar 30 segundos
          let tiempoInicial: number;
          if (primeraPregunta?.tipo === 'relacionar') {
            tiempoInicial = 30; // SIEMPRE 30 segundos para relacionar
          } else {
            tiempoInicial = primeraPregunta?.tiempoSegundos || 15;
          }
        setTiempoRestante(tiempoInicial);
      }
    } catch (err) {
      console.error('Error recargando preguntas al reintentar:', err);
      // Fallback: usar preguntas originales
      const base: Pregunta[] = preguntasOriginales
        .map((pregunta, idx) => {
          const opcionesMezcladas = seededShuffle(pregunta.opciones, 100 + idx * 1013);
          const correctaIdx = opcionesMezcladas.findIndex(
            (o) => (o || '').trim().toLowerCase().normalize('NFC') === (pregunta.respuestaCorrecta || '').trim().toLowerCase().normalize('NFC')
          );
          return { ...pregunta, opciones: opcionesMezcladas, respuestaCorrecta: pregunta.respuestaCorrecta, correctaIdx };
        });
      const barajadas = seededShuffle(base, 1000);
      const seleccion: Pregunta[] = barajadas.slice(0, Math.min(30, barajadas.length));
      setPreguntas(seleccion);
      setRespuestas(Array(seleccion.length).fill(''));
      setRespuestasIdx(Array(seleccion.length).fill(-1));
      setCorrectas(Array(seleccion.length).fill(false));
    }
  };

  const totalPreguntas = preguntas.length;
  const minimoAprobar = Math.ceil(totalPreguntas * 0.7);

  // Función para manejar selección en preguntas de relacionar
  const handleRelacionarSelection = (lado: 'izquierda' | 'derecha', idx: number) => {
    const preguntaActualObj = preguntas[preguntaActual];
    if (preguntaActualObj.tipo !== 'relacionar') return;

    if (lado === 'izquierda') {
      setRelSelectedLeft(prev => ({ ...prev, [preguntaActual]: idx }));
    } else {
      // Si hay una selección en la izquierda, hacer el emparejamiento
      const leftIdx = relSelectedLeft[preguntaActual];
      if (leftIdx !== null && leftIdx !== undefined) {
        setRelUserMatches(prev => ({
          ...prev,
          [preguntaActual]: {
            ...(prev[preguntaActual] || {}),
            [leftIdx]: idx
          }
        }));
        setRelSelectedLeft(prev => ({ ...prev, [preguntaActual]: null }));
      }
    }
  };

  const seleccionarRespuesta = (respuesta: string) => {
    if (respuestaSeleccionada) return;

    const preguntaActualObj = preguntas[preguntaActual];
    
    // Si es pregunta de relacionar, no usar esta función
    if (preguntaActualObj.tipo === 'relacionar') return;

    // Normalizar tanto la respuesta del usuario como las opciones para comparación
    const normalizarTexto = (texto: string) =>
      (texto || '').toString().trim().toLowerCase().normalize('NFC').replace(/\s+/g, ' ');

    const respuestaNormalizada = normalizarTexto(respuesta);

    // Buscar la opción que coincida con la respuesta
    const idxSeleccionado = preguntaActualObj.opciones.findIndex((opcion: string) =>
      normalizarTexto(opcion) === respuestaNormalizada
    );

    // Verificar si la respuesta es correcta comparando con respuestaCorrecta
    const esCorrecta = normalizarTexto(respuesta) === normalizarTexto(preguntaActualObj.respuestaCorrecta);

    console.log('Respuesta seleccionada:', {
      pregunta: preguntaActualObj.pregunta,
      respuestaSeleccionada: respuesta,
      respuestaCorrecta: preguntaActualObj.respuestaCorrecta,
      esCorrecta,
      idxSeleccionado,
      opciones: preguntaActualObj.opciones
    });

    // Actualizar el estado de respuestas primero
    const nuevasRespuestas = [...respuestas];
    nuevasRespuestas[preguntaActual] = respuesta;

    // Luego actualizar el estado de índices y correctas
    const nuevasRespuestasIdx = [...respuestasIdx];
    nuevasRespuestasIdx[preguntaActual] = idxSeleccionado;

    const nuevasCorrectas = [...correctas];
    nuevasCorrectas[preguntaActual] = esCorrecta;

    // Actualizar todos los estados juntos para evitar problemas de sincronización
    setRespuestas(nuevasRespuestas);
    setRespuestasIdx(nuevasRespuestasIdx);
    setCorrectas(nuevasCorrectas);
    setRespuestaSeleccionada(respuesta);
    setMostrarResultado(true);

    // Detener el temporizador
    if (timerRef.current) {
      clearInterval(timerRef.current);
      timerRef.current = null;
    }

    // Pasar a la siguiente pregunta después de un breve retraso
    setTimeout(() => {
      // Usar las respuestas actualizadas directamente
      if (preguntaActual < preguntas.length - 1) {
        const nuevaPregunta = preguntaActual + 1;
        const siguientePregunta = preguntas[nuevaPregunta];
        // Para preguntas de relacionar, SIEMPRE usar 30 segundos
        let tiempoSiguiente: number;
        if (siguientePregunta?.tipo === 'relacionar') {
          tiempoSiguiente = 30; // SIEMPRE 30 segundos para relacionar
        } else {
          tiempoSiguiente = siguientePregunta?.tiempoSegundos || 15;
        }
        setPreguntaActual(nuevaPregunta);
        setTiempoRestante(tiempoSiguiente);
        setRespuestaSeleccionada(nuevasRespuestas[nuevaPregunta] || null);
        setMostrarResultado(false);
        progressAnimation.setValue(0);
      } else {
        // Si es la última pregunta, finalizar el examen
        finalizarExamen(nuevasRespuestas);
      }
    }, 1000);
  };

  // Función para confirmar orden en preguntas de ordenar
  const confirmarOrdenar = () => {
    const preguntaActualObj = preguntas[preguntaActual];
    if (preguntaActualObj.tipo !== 'ordenar' || !preguntaActualObj.ordenCorrecto) return;

    const ordenUsuarioActual = ordenUsuario[preguntaActual] || [];
    const ordenCorrecto = preguntaActualObj.ordenCorrecto;
    
    // Verificar si el orden es correcto
    const esCorrecta = ordenUsuarioActual.length === ordenCorrecto.length &&
      ordenUsuarioActual.every((item, idx) => item === ordenCorrecto[idx]);

    // Actualizar estado
    const nuevasCorrectas = [...correctas];
    nuevasCorrectas[preguntaActual] = esCorrecta;
    setCorrectas(nuevasCorrectas);
    setMostrarResultado(true);

    // Detener el temporizador
    if (timerRef.current) {
      clearInterval(timerRef.current);
      timerRef.current = null;
    }

    // Pasar a la siguiente pregunta
    setTimeout(() => {
      if (preguntaActual < preguntas.length - 1) {
        const nuevaPregunta = preguntaActual + 1;
        const siguientePregunta = preguntas[nuevaPregunta];
        // Para preguntas de relacionar, SIEMPRE usar 30 segundos
        let tiempoSiguiente: number;
        if (siguientePregunta?.tipo === 'relacionar') {
          tiempoSiguiente = 30; // SIEMPRE 30 segundos para relacionar
        } else {
          tiempoSiguiente = siguientePregunta?.tiempoSegundos || 15;
        }
        setPreguntaActual(nuevaPregunta);
        setTiempoRestante(tiempoSiguiente);
        setMostrarResultado(false);
        progressAnimation.setValue(0);
      } else {
        finalizarExamen(respuestas);
      }
    }, 2000);
  };

  // Función para confirmar respuesta en preguntas de relacionar
  const confirmarRelacionar = () => {
    const preguntaActualObj = preguntas[preguntaActual];
    if (preguntaActualObj.tipo !== 'relacionar' || !preguntaActualObj.pares) return;

    const matches = relUserMatches[preguntaActual] || {};
    const leftItems = relLeft[preguntaActual] || [];
    const rightItems = relRight[preguntaActual] || [];
    
    // Verificar si todos los pares están completos
    const allMatched = leftItems.every((_, leftIdx) => matches[leftIdx] !== undefined);
    if (!allMatched) {
      Alert.alert('Pregunta incompleta', 'Debes relacionar todos los elementos antes de continuar.');
      return;
    }

    // Evaluar si todos los pares son correctos
    const esCorrecta = leftItems.every((leftText, leftIdx) => {
      const rightIdx = matches[leftIdx];
      const rightText = rightItems[rightIdx];
      return preguntaActualObj.pares?.some(p => p.izquierda === leftText && p.derecha === rightText);
    });

    // Actualizar estado
    const nuevasCorrectas = [...correctas];
    nuevasCorrectas[preguntaActual] = esCorrecta;
    setCorrectas(nuevasCorrectas);
    setMostrarResultado(true);

    // Detener el temporizador
    if (timerRef.current) {
      clearInterval(timerRef.current);
      timerRef.current = null;
    }

    // Pasar a la siguiente pregunta
    setTimeout(() => {
      if (preguntaActual < preguntas.length - 1) {
        const nuevaPregunta = preguntaActual + 1;
        const siguientePregunta = preguntas[nuevaPregunta];
        // Para preguntas de relacionar, SIEMPRE usar 30 segundos
        let tiempoSiguiente: number;
        if (siguientePregunta?.tipo === 'relacionar') {
          tiempoSiguiente = 30; // SIEMPRE 30 segundos para relacionar
        } else {
          tiempoSiguiente = siguientePregunta?.tiempoSegundos || 15;
        }
        setPreguntaActual(nuevaPregunta);
        setTiempoRestante(tiempoSiguiente);
        setMostrarResultado(false);
        progressAnimation.setValue(0);
      } else {
        finalizarExamen(respuestas);
      }
    }, 2000);
  };

  const siguientePregunta = () => {
    console.warn('siguientePregunta no debería ser llamado directamente');
  };

  const finalizarExamen = async (respuestasFinales: string[]) => {
    setExamenTerminado(true);

    // Función de normalización consistente
    const normalizarTexto = (texto: string) =>
      (texto || '').toString().trim().toLowerCase().normalize('NFC').replace(/\s+/g, ' ');

    // Calcular puntuación
    let puntos = 0;
    const nuevasCorrectas: boolean[] = [];

    // Asegurarse de que tenemos un array con la longitud correcta
    const respuestasParaRevisar = [...respuestasFinales];
    while (respuestasParaRevisar.length < preguntas.length) {
      respuestasParaRevisar.push('');
    }

    console.log('=== REVISIÓN DE RESPUESTAS ===');
    console.log('📊 Total de preguntas:', preguntas.length);
    console.log('📊 Estado correctas actual:', correctas);
    console.log('📊 relUserMatches:', relUserMatches);
    console.log('📊 ordenUsuario:', ordenUsuario);
    console.log('📊 Total de preguntas:', preguntas.length);
    console.log('📊 Estado correctas actual:', correctas);
    console.log('📊 relUserMatches:', relUserMatches);
    console.log('📊 ordenUsuario:', ordenUsuario);
    
    // Contar respuestas correctas
    for (let i = 0; i < preguntas.length; i++) {
      const pregunta = preguntas[i];
      
      let esCorrecta = false;
      let respuestaUsuario = '';
      let respuestaCorrecta = '';
      
      if (pregunta.tipo === 'ordenar' && pregunta.ordenCorrecto) {
        // Evaluar pregunta de ordenar
        const ordenUsuarioActual = ordenUsuario[i] || [];
        const ordenCorrecto = pregunta.ordenCorrecto;
        esCorrecta = ordenUsuarioActual.length === ordenCorrecto.length &&
          ordenUsuarioActual.every((item, idx) => item === ordenCorrecto[idx]);
        respuestaUsuario = ordenUsuarioActual.join(', ');
        respuestaCorrecta = ordenCorrecto.join(', ');
        console.log(`Pregunta ${i + 1} (ordenar):`, {
          ordenUsuario: ordenUsuarioActual,
          ordenCorrecto,
          esCorrecta
        });
      } else if (pregunta.tipo === 'relacionar' && pregunta.pares) {
        // Evaluar pregunta de relacionar
        const matches = relUserMatches[i] || {};
        const leftItems = relLeft[i] || [];
        const rightItems = relRight[i] || [];
        
        console.log(`Pregunta ${i + 1} (relacionar):`, {
          matches,
          leftItems,
          rightItems,
          pares: pregunta.pares
        });
        
        // Verificar que todos los elementos de la izquierda estén emparejados
        const todosEmparejados = leftItems.every((_, leftIdx) => matches[leftIdx] !== undefined);
        
        if (todosEmparejados) {
          esCorrecta = leftItems.every((leftText, leftIdx) => {
            const rightIdx = matches[leftIdx];
            if (rightIdx === undefined) return false;
            const rightText = rightItems[rightIdx];
            return pregunta.pares?.some(p => p.izquierda === leftText && p.derecha === rightText);
          });
        } else {
          esCorrecta = false;
        }
        
        respuestaUsuario = `Relacionados: ${Object.keys(matches).length}/${leftItems.length}`;
        respuestaCorrecta = `Todos relacionados`;
        console.log(`Pregunta ${i + 1} (relacionar) resultado:`, esCorrecta);
      } else {
        // Evaluar pregunta de opción múltiple
        respuestaUsuario = respuestasParaRevisar[i] || '';
        respuestaCorrecta = pregunta.respuestaCorrecta || '';
        esCorrecta = normalizarTexto(respuestaUsuario) === normalizarTexto(respuestaCorrecta);
        console.log(`Pregunta ${i + 1} (opción múltiple):`, {
          respuestaUsuario,
          respuestaCorrecta,
          esCorrecta
        });
      }

      // Guardar en el array local
      nuevasCorrectas[i] = esCorrecta;

      console.log(`Pregunta ${i + 1}:`, {
        tipo: pregunta.tipo,
        pregunta: pregunta.pregunta,
        respuestaUsuario,
        respuestaCorrecta,
        esCorrecta,
      });

      if (esCorrecta) {
        puntos++;
      } else {
        console.log(`❌ Pregunta ${i + 1} incorrecta`);
      }
    }

    // Actualizar el estado de respuestas correctas con todos los resultados
    setCorrectas(nuevasCorrectas);

    console.log('=== RESUMEN DE RESPUESTAS ===');
    console.log('Respuestas guardadas:', respuestas);
    console.log('Respuestas finales pasadas:', respuestasFinales);
    console.log('Estado correctas calculado:', nuevasCorrectas);
    console.log(`=== PUNTUACIÓN FINAL: ${puntos}/${preguntas.length} ===`);
    console.log(`✅ Correctas: ${nuevasCorrectas.filter(Boolean).length}`);
    console.log(`❌ Incorrectas: ${nuevasCorrectas.filter(c => !c).length}`);

    setPuntuacion(puntos);

    // Guardar preguntas usadas si el usuario falla (menos de 16/30 correctas)
    const REQUIRED_CORRECT = minimoAprobar;
    if (puntos < REQUIRED_CORRECT) {
      try {
        const currentIndicesStr = await AsyncStorage.getItem('A1_examen_preguntas_actuales');
        if (currentIndicesStr) {
          const currentIndices: number[] = JSON.parse(currentIndicesStr);
          // Guardar estos índices como usados
          await AsyncStorage.setItem('A1_examen_preguntas_usadas', JSON.stringify(currentIndices));
        }
      } catch (error) {
        console.error('Error guardando preguntas usadas:', error);
      }
    } else {
      // Si aprueba, limpiar las preguntas usadas
      try {
        await AsyncStorage.removeItem('A1_examen_preguntas_usadas');
        await AsyncStorage.removeItem('A1_examen_preguntas_actuales');
      } catch (error) {
        console.error('Error limpiando preguntas usadas:', error);
      }
    }

    // Verificar si el examen está aprobado
    if (puntos >= minimoAprobar) {
      await markWrittenPassed('A1');
    } else {
      // Si no aprueba, mostrar mensaje de reintento
      Alert.alert(
        'Examen no aprobado 😔',
        `Has obtenido ${puntos}/${preguntas.length} puntos (necesitas ${minimoAprobar}).\n¡Sigue estudiando y vuelve a intentarlo!`,
        [
          {
            text: 'Reintentar',
            onPress: async () => {
              await resetExamen();
            },
          },
          {
            text: 'Volver al menú',
            onPress: () => {
              router.replace('/(tabs)/A1_Acceso');
            },
            style: 'cancel',
          },
        ]
      );
    }
  };

  const handleStartOralGate = async () => {
    try {
      const granted = await requestMicrophonePermission();
      if (!granted) {
        Alert.alert('Permiso requerido', 'Concede acceso al micrófono para realizar el Examen Oral.');
        return;
      }
      setOralGateIndex(0);
      setOralScores([0,0,0,0,0]);
      setWebPercent(null);
      setWebPromptText(oralGatePrompts[0]);
      setWebMode(true);
      Alert.alert('Examen Oral', 'Se abrió el Examen Oral. Si no ves el modal, recarga la pantalla.');
    } catch (e) {
      Alert.alert('Micrófono', 'No se pudo iniciar el reconocimiento.');
    }
  };

  const handleOralGateNext = async () => {
    const percent = typeof webPercent === 'number' ? Math.round(webPercent) : 0;
    const updatedScores = oralScores.map((score, idx) => (idx === oralGateIndex ? percent : score));
    setOralScores(updatedScores);

    const passedCount = updatedScores.filter((score) => score === 100).length;

    if (oralGateIndex < oralGatePrompts.length - 1) {
      const nextIndex = oralGateIndex + 1;
      setOralGateIndex(nextIndex);
      setWebPromptText(oralGatePrompts[nextIndex]);
      setWebPercent(null);
    } else {
      const passed = passedCount >= 3;
      setOralGatePassed(passed);
      if (passed) {
        await markOralPassed('A1');
      }
      setWebMode(false);
      setWebPercent(null);
      if (passed) {
        Alert.alert('Oral aprobado', 'Has alcanzado 3 de 5 lecturas con 100%. Ya puedes continuar.');
      } else {
        Alert.alert('Oral no aprobado', 'Necesitas 3 de 5 lecturas al 100%. Puedes intentarlo de nuevo.');
      }
    }
  };

  // Utilidades para comparar frase objetivo vs transcripción (lectura completa)
  const normalizar = (s: string) => (s || '')
    .toLowerCase()
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .replace(/[^a-z\dáéíóúüñ\s]/gi, ' ')
    .replace(/\s+/g, ' ')
    .trim();
  const compararFrase = (objetivo: string, transcripcion: string) => {
    const obj = normalizar(objetivo);
    const tra = normalizar(transcripcion);
    if (!obj) return 0;
    const objTokens = obj.split(' ').filter(Boolean);
    const traTokens = new Set(tra.split(' ').filter(Boolean));
    if (objTokens.length === 0) return 0;
    let aciertos = 0;
    objTokens.forEach(tok => { if (traTokens.has(tok)) aciertos++; });
    return aciertos / objTokens.length;
  };

  // Pantalla inicial (estilo A2)
  if (!examenIniciado && !oralMode) {
    return (
      <LinearGradient colors={['#000', '#000']} style={styles.background}>
        <View style={styles.container}>
          <View style={{ position: 'absolute', left: 10, top: 16 }}>
            <TouchableOpacity style={{ backgroundColor: '#fff', borderRadius: 20, padding: 3 }} onPress={() => router.replace('/(tabs)/A1_Acceso')}>
              <Ionicons name="arrow-back" size={28} color="#FFD700" />
            </TouchableOpacity>
          </View>
          <View style={{ alignItems: 'center', gap: 16 }}>
            <Ionicons name="school" size={80} color="#FFD700" />
            <Text style={{ fontSize: 28, fontWeight: 'bold', color: '#FFD700' }}>Examen Final A1</Text>
            <View style={{ backgroundColor: 'rgba(255,255,255,0.2)', padding: 16, borderRadius: 12, width: '100%' }}>
              <Text style={{ color: '#FFD700', fontWeight: 'bold', marginBottom: 6 }}>Instrucciones</Text>
              <Text style={{ color: '#FFD700' }}>15 segundos por pregunta</Text>
              <Text style={{ color: '#FFD700' }}>{totalPreguntas} preguntas totales</Text>
              <Text style={{ color: '#FFD700', marginTop: 6 }}>Para superar: pasar el examen oral (3 de 5 lecturas al 100%) y mínimo 75% en el test.</Text>
              <Text style={{ color: '#FFD700', marginTop: 6 }}>Estado del examen oral: {oralGatePassed ? 'Aprobado ✅' : 'Pendiente 🔒'}</Text>
            </View>
            <View style={{ backgroundColor: 'rgba(255, 152, 0, 0.3)', padding: 12, borderRadius: 12, width: '100%', borderWidth: 2, borderColor: '#FF9800' }}>
              <View style={{ flexDirection: 'row', alignItems: 'center', marginBottom: 6 }}>
                <Ionicons name="warning" size={20} color="#FF9800" />
                <Text style={{ color: '#FFD700', fontWeight: 'bold', marginLeft: 8, fontSize: 16 }}>⚠️ Advertencia Importante</Text>
              </View>
              <Text style={{ color: '#FFD700', fontSize: 14, lineHeight: 20 }}>
                Si sales de la aplicación durante el examen (cambiar de app, cerrar la app, etc.), el examen se cancelará automáticamente y lo perderás.
              </Text>
              <Text style={{ color: '#FFD700', fontSize: 14, lineHeight: 20, marginTop: 4, fontWeight: 'bold' }}>
                Mantén la aplicación abierta durante todo el examen.
              </Text>
            </View>
            <TouchableOpacity
              style={[styles.siguienteBtn, { backgroundColor: oralGatePassed ? '#fff' : 'rgba(255,255,255,0.6)' }]}
              onPress={() => {
                if (!oralGatePassed) {
                  Alert.alert('Examen oral pendiente', 'Primero completa el examen oral (3 de 5 lecturas al 100%).');
                  return;
                }
                setExamenIniciado(true);
                setExamStopped(false);
              }}
              disabled={!oralGatePassed}
            >
              <Text style={{ color: '#FFD700', fontSize: 18, fontWeight: 'bold' }}>Comenzar Examen</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={[styles.siguienteBtn, { backgroundColor: 'rgba(255,255,255,0.6)' }]}
              onPress={handleStartOralGate}
            >
              <Text style={{ color: '#FFD700', fontSize: 18, fontWeight: 'bold' }}>Examen Oral (Reconocimiento Web)</Text>
            </TouchableOpacity>
            {webMode && (
              <Modal visible transparent animationType="fade" onRequestClose={() => setWebMode(false)}>
                <View style={{ flex:1, backgroundColor:'rgba(0,0,0,0.5)', justifyContent:'center', alignItems:'center' }}>
                  <View style={{ backgroundColor:'#fff', borderRadius:12, width:'92%', maxHeight:'86%', overflow:'hidden' }}>
                      <View style={{ padding:12, backgroundColor:'#000', borderWidth: 1, borderColor: '#FFD700' }}>
                      <Text style={{ color:'#FFD700', fontWeight:'bold', textAlign:'center' }}>Examen Oral A1 (3 de 5 al 100%)</Text>
                    </View>
                    <View style={{ height: 380 }}>
                      <WebView
                        originWhitelist={["*"]}
                        source={{ html: buildWebSpeechHTML(webPromptText) }}
                        onMessage={(event) => {
                          try {
                            const data = JSON.parse(event.nativeEvent.data);
                            if (data?.type === 'result' && typeof data?.payload?.percent === 'number') {
                              setWebPercent(Math.round(data.payload.percent));
                            }
                          } catch {}
                        }}
                      />
                    </View>
                    <View style={{ padding:12 }}>
                      <Text style={{ textAlign:'center', marginBottom:8 }}>Lecturas aprobadas: {oralScores.filter(s => s === 100).length} / 5</Text>
                      <View style={{ flexDirection:'row', justifyContent:'space-between' }}>
                        <TouchableOpacity style={[styles.siguienteBtn, { backgroundColor:'#e0e0e0', flex:1, marginRight:6 }]} onPress={() => {
                          if (oralGateIndex > 0) {
                            const prev = oralGateIndex - 1; setOralGateIndex(prev); setWebPromptText(oralGatePrompts[prev]); setWebPercent(null);
                          }
                        }}>
                          <Text style={{ color:'#333', fontWeight:'bold' }}>Anterior</Text>
                        </TouchableOpacity>
                        <TouchableOpacity style={[styles.siguienteBtn, { backgroundColor:'#000', flex:1, marginLeft:6, borderWidth: 1, borderColor: '#FFD700' }]} onPress={handleOralGateNext}>
                          <Text style={{ color:'#FFD700', fontWeight:'bold' }}>{oralGateIndex < oralGatePrompts.length - 1 ? 'Siguiente' : 'Finalizar'}</Text>
                        </TouchableOpacity>
                      </View>
                      <TouchableOpacity onPress={() => setWebMode(false)} style={{ marginTop:8, alignSelf:'center' }}>
                        <Text style={{ color:'#FFD700' }}>Cerrar</Text>
                      </TouchableOpacity>
                    </View>
                  </View>
                </View>
              </Modal>
            )}
          </View>
        </View>
      </LinearGradient>
    );
  }

  // UI Modo Oral (estilo A2)
  if (oralMode) {
    const trans = oralTranscripts[oralIdx] || '';
    const parcial = Math.round(compararFrase(oralPrompts[oralIdx], trans) * 100);
    return (
      <LinearGradient colors={['#000', '#000']} style={styles.background}>
        <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', padding: 16 }}>
          <TouchableOpacity onPress={() => handleTabChange('escrito')}>
            <Ionicons name="arrow-back" size={24} color="#FFD700" />
          </TouchableOpacity>
          <Text style={{ color: '#FFD700', fontWeight: 'bold' }}>Oral {oralIdx + 1}/{oralPrompts.length}</Text>
          <View style={{ width: 24 }} />
        </View>
        <ScrollView contentContainerStyle={{ padding: 16 }}>
          <Text style={{ color: '#FFD700', fontSize: 20, fontWeight: 'bold', marginBottom: 12 }}>{oralPrompts[oralIdx]}</Text>
          <TouchableOpacity
            style={[styles.siguienteBtn, { backgroundColor: '#fff' }]}
            onPress={() => {
              setOralTranscripts(prev => ({ ...prev, [oralIdx]: '' }));
              handleStartOralGate();
            }}
          >
                  <Text style={{ color: '#FFD700', fontWeight: 'bold' }}>Hablar</Text>
          </TouchableOpacity>
          <View style={{ backgroundColor: 'rgba(255,255,255,0.9)', borderRadius: 12, padding: 12, marginTop: 12 }}>
            <Text style={{ color: '#FFD700', fontWeight: 'bold', marginBottom: 6 }}>Transcripción</Text>
            <Text style={{ color: '#333' }}>{trans || '—'}</Text>
          </View>
          <View style={{ backgroundColor: 'rgba(255,255,255,0.15)', borderRadius: 12, padding: 12, marginTop: 12 }}>
            <Text style={{ color: '#FFD700' }}>Coincidencia con la frase: {parcial}%</Text>
            <Text style={{ color: '#FFD700', marginTop: 4 }}>Lecturas aprobadas al 100%: {oralScores.filter(s => s === 100).length} / 5</Text>
          </View>
          <View style={{ flexDirection: 'row', gap: 10, marginTop: 12 }}>
            {oralIdx < oralPrompts.length - 1 ? (
              <TouchableOpacity style={[styles.siguienteBtn, { backgroundColor: '#fff' }]} onPress={() => setOralIdx(oralIdx + 1)}>
                <Text style={{ color: '#FFD700', fontWeight: 'bold' }}>Siguiente</Text>
              </TouchableOpacity>
            ) : (
              <TouchableOpacity style={[styles.siguienteBtn, { backgroundColor: '#fff' }]} onPress={() => {
                // Aprobar si al menos 3 de 5 están al 100%
                const scores = oralScores.map((v, i) => (i === oralIdx ? Math.round(compararFrase(oralPrompts[i], oralTranscripts[i] || '') * 100) : v));
                const aprobadas = scores.filter(v => v === 100).length >= 3;
                setOralScore(aprobadas ? 100 : 0);
                setOralFinished(true);
                setOralScores(scores);
              }}>
                <Text style={{ color: '#FFD700', fontWeight: 'bold' }}>Finalizar</Text>
              </TouchableOpacity>
            )}
          </View>
          {oralFinished && (
            <View style={{ alignItems: 'center', marginTop: 10 }}>
              <Text style={{ color: '#fff', fontSize: 22, fontWeight: 'bold' }}>{oralScore === 100 ? 'Oral aprobado' : 'Oral no aprobado'}</Text>
              <Text style={{ color: '#fff', marginTop: 6 }}>{oralScore === 100 ? 'Has completado 3 de 5 lecturas al 100%.' : 'Necesitas 3 de 5 lecturas al 100%.'}</Text>
              {oralScore === 100 ? (
                <TouchableOpacity
                  style={[styles.siguienteBtn, { backgroundColor: '#fff', marginTop: 12 }]}
                  onPress={async () => {
                    try {
                      setOralGatePassed(true);
                      await markOralPassed('A1');
                      Alert.alert('Oral aprobado', 'Ya puedes realizar el test del examen.');
                      setOralMode(false);
                    } catch {}
                  }}
                >
                  <Text style={{ color: '#FFD700', fontWeight: 'bold' }}>Continuar</Text>
                </TouchableOpacity>
              ) : (
                <TouchableOpacity
                  style={[styles.siguienteBtn, { backgroundColor: '#fff', marginTop: 12 }]}
                  onPress={() => {
                    setOralIdx(0);
                    setOralTranscripts({});
                    setOralScores([0,0,0,0,0]);
                    setOralFinished(false);
                  }}
                >
                  <Text style={{ color: '#FFD700', fontWeight: 'bold' }}>Reintentar oral</Text>
                </TouchableOpacity>
              )}
            </View>
          )}
        </ScrollView>
      </LinearGradient>
    );
  }

  if (examenTerminado) {
    return (
      <LinearGradient
        colors={puntuacion >= minimoAprobar ? ['#000', '#000'] : ['#f44336', '#ef5350']}
        style={styles.background}
      >
        <View style={styles.resultadoContainer}>
          <Ionicons
            name={puntuacion >= minimoAprobar ? "checkmark-circle" : "close-circle"}
            size={100}
            color="#fff"
          />

          <Text style={styles.resultadoTexto}>
            {puntuacion >= minimoAprobar ? '¡Aprobado!' : 'No aprobado'}
          </Text>

          <Text style={styles.scoreText}>{puntuacion}/{totalPreguntas}</Text>

          <View style={styles.resultButtons}>
            {puntuacion >= minimoAprobar && (
              <>
                <ExamenPresencialForm nivel="A1" />
                <Text style={styles.resultHint}>¿Quieres obtener tu certificado? Apúntate al examen presencial.</Text>
              </>
            )}
            {puntuacion >= minimoAprobar ? (
              <TouchableOpacity
                style={styles.menuButton}
                onPress={() => router.replace('/(tabs)/SchoolScreen')}
              >
                <Text style={styles.menuButtonText}>Menú Principal</Text>
              </TouchableOpacity>
            ) : (
              <>
                <TouchableOpacity
                  style={styles.retryButton}
                  onPress={async () => {
                    await resetExamen();
                  }}
                >
                  <Text style={styles.retryButtonText}>Reintentar</Text>
                </TouchableOpacity>
                <TouchableOpacity
                  style={styles.menuButton}
                  onPress={() => router.replace('/(tabs)/A1_Acceso')}
                >
                  <Text style={styles.menuButtonText}>Volver a A1</Text>
                </TouchableOpacity>
              </>
            )}
          </View>
        </View>
      </LinearGradient>
    );
  }

  const pregunta = preguntas[preguntaActual] as Pregunta;
  const idxSeleccionadoActual = pregunta?.opciones?.findIndex((o: string) =>
    (o || '').trim().toLowerCase().normalize('NFC') === (respuestaSeleccionada || '').trim().toLowerCase().normalize('NFC')
  );
  const esRespuestaCorrecta = idxSeleccionadoActual !== undefined && idxSeleccionadoActual === pregunta?.correctaIdx;

  return (
      <LinearGradient colors={['#000', '#000']} style={styles.background}>

      <View style={styles.container}>
        <View style={styles.examHeader}>
          <TouchableOpacity
            style={styles.backButton}
            onPress={resetExamen}
          >
            <Ionicons name="arrow-back" size={24} color="#FFD700" />
          </TouchableOpacity>

          <Text style={styles.questionCounter}>
            {preguntaActual + 1}/{totalPreguntas}
          </Text>

          <Text style={styles.questionCounter}>
            Aciertos: {correctas.filter(Boolean).length}/{totalPreguntas}
          </Text>

          <View style={styles.timerContainer}>
            <Ionicons name="time" size={20} color="#FFD700" />
            <Text style={styles.timerText}>{tiempoRestante}s</Text>
          </View>
        </View>

        <View style={styles.progressBarContainer}>
          <Animated.View
            style={[
              styles.progressBar,
              {
                width: progressAnimation.interpolate({
                  inputRange: [0, 1],
                  outputRange: ['0%', '100%'],
                }),
              },
            ]}
          />
        </View>

        <ScrollView style={styles.questionContainer} showsVerticalScrollIndicator={false}>
          <Text style={styles.questionText}>{pregunta.pregunta}</Text>

          {pregunta.tipo === 'relacionar' && pregunta.pares ? (
            // Renderizar pregunta de relacionar
            <View style={styles.relacionarContainer}>
              {(() => {
                // Inicializar inmediatamente si no existen
                if (!relLeft[preguntaActual] || !relRight[preguntaActual] || relLeft[preguntaActual].length === 0 || relRight[preguntaActual].length === 0) {
                  console.log('⚠️ Datos de relacionar no encontrados, inicializando...');
                  const left = pregunta.pares.map(p => p.izquierda);
                  const right = pregunta.pares.map(p => p.derecha);
                  const shuffledLeft = seededShuffle(left, 100 + preguntaActual * 1013);
                  const shuffledRight = seededShuffle(right, 200 + preguntaActual * 1013);
                  
                  // Actualizar estados inmediatamente
                  setRelLeft(prev => ({ ...prev, [preguntaActual]: shuffledLeft }));
                  setRelRight(prev => ({ ...prev, [preguntaActual]: shuffledRight }));
                  setRelSelectedLeft(prev => ({ ...prev, [preguntaActual]: null }));
                  setRelUserMatches(prev => ({ ...prev, [preguntaActual]: {} }));
                  
                  // Usar los datos recién creados
                  return (
                    <>
                      <View style={styles.relacionarTable}>
                        <View style={styles.relacionarColumn}>
                          <Text style={styles.relacionarHeader}>Español</Text>
                          {shuffledLeft.map((text, idx) => (
                            <TouchableOpacity
                              key={idx}
                              style={styles.relacionarButton}
                              onPress={() => handleRelacionarSelection('izquierda', idx)}
                              disabled={mostrarResultado}
                            >
                              <Text style={styles.relacionarButtonText}>{text}</Text>
                            </TouchableOpacity>
                          ))}
                        </View>
                        <View style={styles.relacionarColumn}>
                          <Text style={styles.relacionarHeader}>Árabe</Text>
                          {shuffledRight.map((text, idx) => (
                            <TouchableOpacity
                              key={idx}
                              style={styles.relacionarButton}
                              onPress={() => handleRelacionarSelection('derecha', idx)}
                              disabled={mostrarResultado}
                            >
                              <Text style={styles.relacionarButtonText}>{text}</Text>
                            </TouchableOpacity>
                          ))}
                        </View>
                      </View>
                      {!mostrarResultado && (
                        <TouchableOpacity
                          style={styles.confirmButton}
                          onPress={confirmarRelacionar}
                        >
                          <Text style={styles.confirmButtonText}>Confirmar respuesta</Text>
                        </TouchableOpacity>
                      )}
                    </>
                  );
                }
                return null;
              })()}
              {relLeft[preguntaActual] && relRight[preguntaActual] && relLeft[preguntaActual].length > 0 && relRight[preguntaActual].length > 0 ? (
                <>
                  <View style={styles.relacionarTable}>
                    <View style={styles.relacionarColumn}>
                  <Text style={styles.relacionarHeader}>Español</Text>
                  {(relLeft[preguntaActual] || []).map((text, idx) => {
                    const isSelected = relSelectedLeft[preguntaActual] === idx;
                    const isMatched = relUserMatches[preguntaActual]?.[idx] !== undefined;
                    return (
                      <TouchableOpacity
                        key={idx}
                        style={[
                          styles.relacionarButton,
                          isSelected && styles.relacionarButtonSelected,
                          isMatched && styles.relacionarButtonMatched,
                        ]}
                        onPress={() => handleRelacionarSelection('izquierda', idx)}
                        disabled={mostrarResultado || isMatched}
                      >
                        <Text style={styles.relacionarButtonText}>{text}</Text>
                      </TouchableOpacity>
                    );
                  })}
                </View>
                <View style={styles.relacionarColumn}>
                  <Text style={styles.relacionarHeader}>Árabe</Text>
                  {(relRight[preguntaActual] || []).map((text, idx) => {
                    const leftIdx = Object.values(relUserMatches[preguntaActual] || {}).findIndex(v => v === idx);
                    const isMatched = leftIdx !== -1;
                    return (
                      <TouchableOpacity
                        key={idx}
                        style={[
                          styles.relacionarButton,
                          isMatched && styles.relacionarButtonMatched,
                        ]}
                        onPress={() => handleRelacionarSelection('derecha', idx)}
                        disabled={mostrarResultado || isMatched}
                      >
                        <Text style={styles.relacionarButtonText}>{text}</Text>
                      </TouchableOpacity>
                    );
                  })}
                    </View>
                  </View>
                  
                  {/* Mostrar pares emparejados */}
                  {Object.keys(relUserMatches[preguntaActual] || {}).length > 0 && (
                    <View style={styles.relacionarPairsContainer}>
                      {Object.entries(relUserMatches[preguntaActual] || {}).map(([leftIdxStr, rightIdx]) => {
                        const leftIdx = Number(leftIdxStr);
                        const leftText = relLeft[preguntaActual]?.[leftIdx];
                        const rightText = relRight[preguntaActual]?.[rightIdx];
                        const isCorrect = pregunta.pares?.some(p => p.izquierda === leftText && p.derecha === rightText);
                        return (
                          <View key={leftIdx} style={styles.relacionarPairRow}>
                            <Text style={[styles.relacionarPairText, isCorrect && styles.relacionarPairCorrect]}>
                              {leftText} → {rightText} {mostrarResultado && (isCorrect ? '✓' : '✗')}
                            </Text>
                          </View>
                        );
                      })}
                    </View>
                  )}
                  
                  {/* Botón para confirmar respuesta en relacionar */}
                  {!mostrarResultado && (
                    <TouchableOpacity
                      style={styles.confirmButton}
                      onPress={confirmarRelacionar}
                    >
                      <Text style={styles.confirmButtonText}>Confirmar respuesta</Text>
                    </TouchableOpacity>
                  )}
                </>
              ) : (
                <View style={{ padding: 20, alignItems: 'center' }}>
                  <Text style={{ color: '#666', fontSize: 16 }}>Cargando elementos...</Text>
                </View>
              )}
            </View>
          ) : pregunta.tipo === 'ordenar' && pregunta.ordenCorrecto ? (
            // Renderizar pregunta de ordenar
            <View style={styles.ordenarContainer}>
              <Text style={styles.ordenarInstrucciones}>
                Arrastra los elementos para ordenarlos correctamente
              </Text>
              <View style={styles.ordenarLista}>
                {(ordenUsuario[preguntaActual] || []).map((item, idx) => (
                  <TouchableOpacity
                    key={`${item}-${idx}`}
                    style={styles.ordenarItem}
                    onPress={() => {
                      // Mover elemento hacia arriba o abajo
                      const nuevoOrden = [...(ordenUsuario[preguntaActual] || [])];
                      if (idx > 0) {
                        // Intercambiar con el anterior
                        [nuevoOrden[idx - 1], nuevoOrden[idx]] = [nuevoOrden[idx], nuevoOrden[idx - 1]];
                        setOrdenUsuario(prev => ({ ...prev, [preguntaActual]: nuevoOrden }));
                      }
                    }}
                    disabled={mostrarResultado}
                  >
                    <View style={styles.ordenarItemContent}>
                      <Ionicons name="reorder-three-outline" size={24} color="#FFD700" />
                      <Text style={styles.ordenarItemText}>{item}</Text>
                      {idx > 0 && (
                        <TouchableOpacity
                          onPress={() => {
                            const nuevoOrden = [...(ordenUsuario[preguntaActual] || [])];
                            [nuevoOrden[idx - 1], nuevoOrden[idx]] = [nuevoOrden[idx], nuevoOrden[idx - 1]];
                            setOrdenUsuario(prev => ({ ...prev, [preguntaActual]: nuevoOrden }));
                          }}
                          style={styles.ordenarArrowButton}
                        >
                          <Ionicons name="arrow-up" size={20} color="#FFD700" />
                        </TouchableOpacity>
                      )}
                      {idx < (ordenUsuario[preguntaActual]?.length || 0) - 1 && (
                        <TouchableOpacity
                          onPress={() => {
                            const nuevoOrden = [...(ordenUsuario[preguntaActual] || [])];
                            [nuevoOrden[idx], nuevoOrden[idx + 1]] = [nuevoOrden[idx + 1], nuevoOrden[idx]];
                            setOrdenUsuario(prev => ({ ...prev, [preguntaActual]: nuevoOrden }));
                          }}
                          style={styles.ordenarArrowButton}
                        >
                          <Ionicons name="arrow-down" size={20} color="#FFD700" />
                        </TouchableOpacity>
                      )}
                    </View>
                  </TouchableOpacity>
                ))}
              </View>
              
              {/* Botón para confirmar orden */}
              {!mostrarResultado && (
                <TouchableOpacity
                  style={styles.confirmButton}
                  onPress={confirmarOrdenar}
                >
                  <Text style={styles.confirmButtonText}>Confirmar orden</Text>
                </TouchableOpacity>
              )}
              
              {/* Mostrar resultado */}
              {mostrarResultado && (
                <View style={styles.ordenarResultado}>
                  <Text style={styles.ordenarResultadoText}>
                    {correctas[preguntaActual] ? '✓ Orden correcto' : '✗ Orden incorrecto'}
                  </Text>
                </View>
              )}
            </View>
          ) : pregunta.tipo === 'relacionar' && pregunta.pares ? (
            // Renderizar pregunta de relacionar
            <View style={styles.relacionarContainer}>
              <View style={styles.relacionarTable}>
                <View style={styles.relacionarColumn}>
                  <Text style={styles.relacionarHeader}>Español</Text>
                  {relLeft[preguntaActual]?.map((text, idx) => {
                    const isSelected = relSelectedLeft[preguntaActual] === idx;
                    const isMatched = relUserMatches[preguntaActual]?.[idx] !== undefined;
                    return (
                      <TouchableOpacity
                        key={idx}
                        style={[
                          styles.relacionarButton,
                          isSelected && styles.relacionarButtonSelected,
                          isMatched && styles.relacionarButtonMatched,
                        ]}
                        onPress={() => handleRelacionarSelection('izquierda', idx)}
                        disabled={mostrarResultado || isMatched}
                      >
                        <Text style={styles.relacionarButtonText}>{text}</Text>
                      </TouchableOpacity>
                    );
                  })}
                </View>
                <View style={styles.relacionarColumn}>
                  <Text style={styles.relacionarHeader}>Árabe</Text>
                  {relRight[preguntaActual]?.map((text, idx) => {
                    const leftIdx = Object.values(relUserMatches[preguntaActual] || {}).findIndex(v => v === idx);
                    const isMatched = leftIdx !== -1;
                    return (
                      <TouchableOpacity
                        key={idx}
                        style={[
                          styles.relacionarButton,
                          isMatched && styles.relacionarButtonMatched,
                        ]}
                        onPress={() => handleRelacionarSelection('derecha', idx)}
                        disabled={mostrarResultado || isMatched}
                      >
                        <Text style={styles.relacionarButtonText}>{text}</Text>
                      </TouchableOpacity>
                    );
                  })}
                </View>
              </View>
              
              {/* Mostrar pares emparejados */}
              {Object.keys(relUserMatches[preguntaActual] || {}).length > 0 && (
                <View style={styles.relacionarPairsContainer}>
                  {Object.entries(relUserMatches[preguntaActual] || {}).map(([leftIdxStr, rightIdx]) => {
                    const leftIdx = Number(leftIdxStr);
                    const leftText = relLeft[preguntaActual]?.[leftIdx];
                    const rightText = relRight[preguntaActual]?.[rightIdx];
                    const isCorrect = pregunta.pares?.some(p => p.izquierda === leftText && p.derecha === rightText);
                    return (
                      <View key={leftIdx} style={styles.relacionarPairRow}>
                        <Text style={[styles.relacionarPairText, isCorrect && styles.relacionarPairCorrect]}>
                          {leftText} → {rightText} {mostrarResultado && (isCorrect ? '✓' : '✗')}
                        </Text>
                      </View>
                    );
                  })}
                </View>
              )}
              
              {/* Botón para confirmar respuesta en relacionar */}
              {!mostrarResultado && (
                <TouchableOpacity
                  style={styles.confirmButton}
                  onPress={confirmarRelacionar}
                >
                  <Text style={styles.confirmButtonText}>Confirmar respuesta</Text>
                </TouchableOpacity>
              )}
            </View>
          ) : (
            // Renderizar pregunta de opción múltiple
            <View style={styles.optionsContainer}>
              {pregunta.opciones.map((opcion: string, index: number) => {
              let buttonStyle = styles.optionButton;
              let textStyle = styles.optionText;

              if (mostrarResultado && respuestaSeleccionada) {
                if (index === pregunta.correctaIdx) {
                  buttonStyle = {
                    ...styles.optionButton,
                    ...styles.correctOption,
                  };
                  textStyle = {
                    ...styles.optionText,
                    ...styles.correctOptionText,
                  };
                } else if (index === idxSeleccionadoActual && !esRespuestaCorrecta) {
                  buttonStyle = {
                    ...styles.optionButton,
                    ...styles.incorrectOption,
                  };
                  textStyle = {
                    ...styles.optionText,
                    ...styles.incorrectOptionText,
                  };
                }
              }

              return (
                <TouchableOpacity
                  key={index}
                  style={buttonStyle}
                  onPress={() => seleccionarRespuesta(opcion)}
                  disabled={mostrarResultado}
                >
                  <Text style={textStyle}>{opcion}</Text>
                  {mostrarResultado && index === pregunta.correctaIdx && (
                    <Ionicons name="checkmark-circle" size={24} color="#fff" />
                  )}
                  {mostrarResultado && index === idxSeleccionadoActual && !esRespuestaCorrecta && (
                    <Ionicons name="close-circle" size={24} color="#fff" />
                  )}
                </TouchableOpacity>
              );
            })}
          </View>
          )}
        </ScrollView>
      </View>
    </LinearGradient>
  );
}

const styles = StyleSheet.create({
  background: {
    flex: 1,
  },
  container: {
    flex: 1,
    padding: 20,
    justifyContent: 'center',
  },
  examHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 14,
  },
  backButton: {
    backgroundColor: '#fff',
    borderRadius: 20,
    padding: 8,
  },
  questionCounter: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#FFD700',
  },
  timerContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  timerText: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#FFD700',
    marginLeft: 5,
  },
  progressBarContainer: {
    height: 4,
    backgroundColor: 'rgba(255,255,255,0.3)',
    marginBottom: 20,
  },
  progressBar: {
    height: '100%',
    backgroundColor: '#fff',
  },
  questionContainer: {
    flex: 1,
  },
  questionText: {
    fontSize: 22,
    marginBottom: 20,
    fontWeight: 'bold',
    color: '#FFD700',
    textAlign: 'center',
  },
  optionsContainer: {
    gap: 15,
  },
  optionButton: {
    backgroundColor: 'rgba(255,255,255,0.8)',
    padding: 15,
    borderRadius: 10,
    marginBottom: 10,
  },
  optionText: {
    fontSize: 18,
    color: 'black',
    textAlign: 'center',
  },
  correctOption: {
    backgroundColor: 'rgba(0, 200, 0, 0.7)',
  },
  incorrectOption: {
    backgroundColor: 'rgba(200, 0, 0, 0.7)',
  },
  correctOptionText: {
    color: '#fff',
  },
  incorrectOptionText: {
    color: '#fff',
  },
  resultadoContainer: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  resultadoTexto: {
    fontSize: 36,
    fontWeight: 'bold',
    color: '#fff',
    textAlign: 'center',
    marginTop: 20,
    marginBottom: 8,
  },
  scoreText: {
    fontSize: 48,
    fontWeight: 'bold',
    color: '#fff',
    marginBottom: 30,
  },
  resultHint: {
    color: '#fff',
    textAlign: 'center',
    marginTop: -10,
    marginBottom: 10,
  },
  resultButtons: {
    width: '100%',
    gap: 15,
  },
  continueButton: {
    backgroundColor: '#fff',
    paddingVertical: 15,
    paddingHorizontal: 30,
    borderRadius: 25,
    elevation: 3,
  },
  continueButtonText: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#4caf50',
    textAlign: 'center',
  },
  retryButton: {
    backgroundColor: '#fff',
    paddingVertical: 15,
    paddingHorizontal: 30,
    borderRadius: 25,
    elevation: 3,
  },
  retryButtonText: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#f44336',
    textAlign: 'center',
  },
  menuButton: {
    backgroundColor: 'rgba(255,255,255,0.2)',
    paddingVertical: 15,
    paddingHorizontal: 30,
    borderRadius: 25,
    borderWidth: 2,
    borderColor: '#fff',
  },
  menuButtonText: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#fff',
    textAlign: 'center',
  },
  siguienteBtn: {
    paddingVertical: 14,
    paddingHorizontal: 38,
    borderRadius: 25,
    alignItems: 'center',
    marginTop: 10,
    marginBottom: 10,
    shadowColor: '#000',
    shadowOpacity: 0.08,
    shadowRadius: 4,
    elevation: 2,
  },
  relacionarContainer: {
    marginTop: 20,
  },
  relacionarTable: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 20,
  },
  relacionarColumn: {
    flex: 1,
    marginHorizontal: 5,
  },
  relacionarHeader: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 10,
    textAlign: 'center',
  },
  relacionarButton: {
    backgroundColor: 'rgba(255,255,255,0.8)',
    padding: 15,
    borderRadius: 10,
    marginBottom: 10,
    borderWidth: 2,
    borderColor: 'transparent',
  },
  relacionarButtonSelected: {
    borderColor: '#FFD700',
    backgroundColor: 'rgba(255, 215, 0, 0.3)',
  },
  relacionarButtonMatched: {
    backgroundColor: 'rgba(76, 175, 80, 0.3)',
    borderColor: '#4CAF50',
  },
  relacionarButtonText: {
    fontSize: 16,
    color: '#333',
    textAlign: 'center',
  },
  relacionarPairsContainer: {
    marginTop: 20,
    padding: 15,
    backgroundColor: 'rgba(255,255,255,0.8)',
    borderRadius: 10,
  },
  relacionarPairRow: {
    paddingVertical: 8,
    borderBottomWidth: 1,
    borderBottomColor: '#ddd',
  },
  relacionarPairText: {
    fontSize: 16,
    color: '#333',
  },
  relacionarPairCorrect: {
    color: '#4CAF50',
    fontWeight: 'bold',
  },
  confirmButton: {
    backgroundColor: '#000',
    borderWidth: 1,
    borderColor: '#FFD700',
    padding: 15,
    borderRadius: 10,
    marginTop: 20,
    alignItems: 'center',
  },
  confirmButtonText: {
    color: '#FFD700',
    fontSize: 18,
    fontWeight: 'bold',
  },
  ordenarContainer: {
    marginTop: 20,
  },
  ordenarInstrucciones: {
    fontSize: 16,
    color: '#666',
    marginBottom: 15,
    textAlign: 'center',
    fontStyle: 'italic',
  },
  ordenarLista: {
    gap: 10,
  },
  ordenarItem: {
    backgroundColor: 'rgba(255,255,255,0.8)',
    padding: 15,
    borderRadius: 10,
    marginBottom: 10,
    borderWidth: 2,
    borderColor: '#ddd',
  },
  ordenarItemContent: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  ordenarItemText: {
    fontSize: 16,
    color: '#333',
    flex: 1,
    marginLeft: 10,
  },
  ordenarArrowButton: {
    padding: 5,
    marginLeft: 5,
  },
  ordenarResultado: {
    marginTop: 20,
    padding: 15,
    borderRadius: 10,
    backgroundColor: 'rgba(255,255,255,0.9)',
    alignItems: 'center',
  },
  ordenarResultadoText: {
    fontSize: 18,
    fontWeight: 'bold',
  },
});

export { ExamenFinal };
