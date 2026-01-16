import React, { useState, useRef, useEffect } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Animated, Easing, Alert, Share, ScrollView, KeyboardAvoidingView, Platform, Modal, Linking, AppState } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { Ionicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import { WebView } from 'react-native-webview';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { requestMicrophonePermission } from '../../../../utils/requestMicrophonePermission';
import { useUserProgress } from '@/contexts/UserProgressContext';
import ExamenPresencialForm from '../../../../components/ExamenPresencialForm';

interface Question {
  type: 'choice';
  question: string;
  options?: string[];
  answer?: number;
  color?: string[];
  icon?: string;
}

// Preguntas del examen A2 - Inspiradas en las unidades pero diferentes a los ejercicios
const preguntasA2: Question[] = [
  // Unidad 1: La biografía y experiencias personales
  {
    type: 'choice',
    question: '¿Qué tiempo verbal usas para hablar de acciones que empezaron en el pasado y continúan?',
    options: ['Pretérito perfecto', 'Pretérito imperfecto', 'Presente', 'Futuro'],
    answer: 0,
    color: ['#1976d2', '#64b5f6'],
    icon: 'help-circle'
  },
  {
    type: 'choice',
    question: 'Si alguien dice "Vivo en España desde hace tres años", ¿qué significa?',
    options: ['Vivió tres años y se fue', 'Lleva tres años viviendo y sigue viviendo', 'Vivirá tres años', 'Vivió hace tres años'],
    answer: 1,
    color: ['#1976d2', '#64b5f6'],
    icon: 'help-circle'
  },
  {
    type: 'choice',
    question: '¿Qué palabra completa la frase: "Antes ___ en mi país, pero ahora vivo en España"?',
    options: ['vivo', 'vivía', 'viviré', 'he vivido'],
    answer: 1,
    color: ['#1976d2', '#64b5f6'],
    icon: 'help-circle'
  },
  {
    type: 'choice',
    question: '¿Qué conectores temporales usas para hablar del pasado?',
    options: ['Antes, después, cuando', 'Mañana, luego, después', 'Ahora, hoy, mañana', 'Siempre, nunca, a veces'],
    answer: 0,
    color: ['#1976d2', '#64b5f6'],
    icon: 'help-circle'
  },
  {
    type: 'choice',
    question: 'Si dices "He trabajado aquí durante dos años", ¿qué tiempo verbal usas?',
    options: ['Pretérito perfecto', 'Pretérito imperfecto', 'Futuro', 'Condicional'],
    answer: 0,
    color: ['#1976d2', '#64b5f6'],
    icon: 'help-circle'
  },
  {
    type: 'choice',
    question: '¿Qué significa "mudarse"?',
    options: ['Cambiar de trabajo', 'Cambiar de casa', 'Cambiar de país', 'Cambiar de nombre'],
    answer: 1,
    color: ['#1976d2', '#64b5f6'],
    icon: 'help-circle'
  },
  {
    type: 'choice',
    question: '¿Cómo preguntas por experiencias pasadas?',
    options: ['¿Has viajado?', '¿Viajarás?', '¿Viajas?', '¿Viajabas?'],
    answer: 0,
    color: ['#1976d2', '#64b5f6'],
    icon: 'help-circle'
  },
  {
    type: 'choice',
    question: 'Si alguien dice "Recuerdo mi infancia", ¿de qué habla?',
    options: ['Del futuro', 'Del pasado', 'Del presente', 'De planes'],
    answer: 1,
    color: ['#1976d2', '#64b5f6'],
    icon: 'help-circle'
  },
  {
    type: 'choice',
    question: '¿Qué expresión completa: "___ nací en Marruecos"?',
    options: ['Yo', 'Me', 'Mi', 'Con'],
    answer: 0,
    color: ['#1976d2', '#64b5f6'],
    icon: 'help-circle'
  },
  {
    type: 'choice',
    question: '¿Qué significa "adolescencia"?',
    options: ['Edad adulta', 'Edad entre la infancia y la juventud', 'Vejez', 'Niñez'],
    answer: 1,
    color: ['#1976d2', '#64b5f6'],
    icon: 'help-circle'
  },
  {
    type: 'choice',
    question: 'Si dices "Vivía en mi país antes", ¿qué tiempo verbal usas?',
    options: ['Pretérito imperfecto', 'Pretérito perfecto', 'Presente', 'Futuro'],
    answer: 0,
    color: ['#1976d2', '#64b5f6'],
    icon: 'help-circle'
  },
  // Unidad 2: La salud y el bienestar
  {
    type: 'choice',
    question: '¿Qué expresión usas para dar un consejo sobre salud?',
    options: ['Deberías descansar más', 'Descansaste más', 'Descansarás más', 'Has descansado más'],
    answer: 0,
    color: ['#1976d2', '#64b5f6'],
    icon: 'help-circle'
  },
  {
    type: 'choice',
    question: 'Si alguien tiene "fiebre", ¿qué tiene?',
    options: ['Temperatura normal', 'Temperatura alta', 'Dolor de cabeza', 'Tos'],
    answer: 1,
    color: ['#1976d2', '#64b5f6'],
    icon: 'help-circle'
  },
  {
    type: 'choice',
    question: '¿Dónde compras medicamentos con receta médica?',
    options: ['En el supermercado', 'En la farmacia', 'En el banco', 'En la escuela'],
    answer: 1,
    color: ['#1976d2', '#64b5f6'],
    icon: 'help-circle'
  },
  {
    type: 'choice',
    question: '¿Qué expresión usas para decir que algo te duele?',
    options: ['Me duele la cabeza', 'Tengo hambre', 'Tengo sed', 'Estoy cansado'],
    answer: 0,
    color: ['#1976d2', '#64b5f6'],
    icon: 'help-circle'
  },
  {
    type: 'choice',
    question: '¿Qué significa "relajación"?',
    options: ['Estrés', 'Descanso y tranquilidad', 'Dolor', 'Enfermedad'],
    answer: 1,
    color: ['#1976d2', '#64b5f6'],
    icon: 'help-circle'
  },
  {
    type: 'choice',
    question: '¿Qué haces cuando tienes un resfriado?',
    options: ['Voy al banco', 'Tomo medicina y descanso', 'Voy a trabajar', 'Hago ejercicio'],
    answer: 1,
    color: ['#1976d2', '#64b5f6'],
    icon: 'help-circle'
  },
  {
    type: 'choice',
    question: '¿Qué significa "bienestar"?',
    options: ['Enfermedad', 'Estado de salud y comodidad', 'Dolor', 'Estrés'],
    answer: 1,
    color: ['#1976d2', '#64b5f6'],
    icon: 'help-circle'
  },
  {
    type: 'choice',
    question: '¿Qué expresión usas para hablar de síntomas?',
    options: ['Tengo dolor de cabeza', 'Tengo hambre', 'Tengo sed', 'Tengo frío'],
    answer: 0,
    color: ['#1976d2', '#64b5f6'],
    icon: 'help-circle'
  },
  {
    type: 'choice',
    question: '¿Dónde trabajan los médicos?',
    options: ['En el hospital', 'En el supermercado', 'En la escuela', 'En el banco'],
    answer: 0,
    color: ['#1976d2', '#64b5f6'],
    icon: 'help-circle'
  },
  {
    type: 'choice',
    question: '¿Qué significa "medicamento"?',
    options: ['Comida', 'Droga para curar enfermedades', 'Bebida', 'Ropa'],
    answer: 1,
    color: ['#1976d2', '#64b5f6'],
    icon: 'help-circle'
  },
  // Unidad 3: El trabajo y la vida profesional
  {
    type: 'choice',
    question: '¿Qué significa "llevo cinco años trabajando aquí"?',
    options: ['Trabajaré cinco años', 'Trabajé cinco años y me fui', 'Llevo cinco años y sigo trabajando', 'Trabajé hace cinco años'],
    answer: 2,
    color: ['#1976d2', '#64b5f6'],
    icon: 'help-circle'
  },
  {
    type: 'choice',
    question: '¿Qué documento necesitas para una entrevista de trabajo?',
    options: ['Pasaporte', 'Currículum vitae', 'Carnet de conducir', 'Tarjeta de crédito'],
    answer: 1,
    color: ['#1976d2', '#64b5f6'],
    icon: 'help-circle'
  },
  {
    type: 'choice',
    question: '¿Qué significa "horario laboral"?',
    options: ['El salario', 'Las horas de trabajo', 'El contrato', 'Las vacaciones'],
    answer: 1,
    color: ['#1976d2', '#64b5f6'],
    icon: 'help-circle'
  },
  {
    type: 'choice',
    question: '¿Qué significa "empresa"?',
    options: ['Un trabajo', 'Una organización que ofrece servicios o productos', 'Un salario', 'Una entrevista'],
    answer: 1,
    color: ['#1976d2', '#64b5f6'],
    icon: 'help-circle'
  },
  {
    type: 'choice',
    question: '¿Qué expresión usas para hablar de tu profesión?',
    options: ['Soy ingeniero', 'Tengo hambre', 'Voy al trabajo', 'Me gusta trabajar'],
    answer: 0,
    color: ['#1976d2', '#64b5f6'],
    icon: 'help-circle'
  },
  {
    type: 'choice',
    question: '¿Qué significa "salario"?',
    options: ['El trabajo', 'El dinero que recibes por trabajar', 'El horario', 'Las vacaciones'],
    answer: 1,
    color: ['#1976d2', '#64b5f6'],
    icon: 'help-circle'
  },
  {
    type: 'choice',
    question: '¿Qué significa "compañero de trabajo"?',
    options: ['El jefe', 'Persona que trabaja contigo', 'El cliente', 'El vecino'],
    answer: 1,
    color: ['#1976d2', '#64b5f6'],
    icon: 'help-circle'
  },
  {
    type: 'choice',
    question: '¿Qué expresión usas para decir que buscas trabajo?',
    options: ['Estoy buscando trabajo', 'Tengo trabajo', 'Dejé el trabajo', 'Me gusta trabajar'],
    answer: 0,
    color: ['#1976d2', '#64b5f6'],
    icon: 'help-circle'
  },
  // Unidad 4: Viajes y turismo
  {
    type: 'choice',
    question: '¿Qué tiempo verbal usas para hablar de experiencias de viaje?',
    options: ['Pretérito perfecto', 'Futuro', 'Condicional', 'Presente'],
    answer: 0,
    color: ['#1976d2', '#64b5f6'],
    icon: 'help-circle'
  },
  {
    type: 'choice',
    question: 'Si dices "He estado en Francia", ¿qué significa?',
    options: ['Estaré en Francia', 'Estoy en Francia ahora', 'Estuve en Francia alguna vez', 'Estaba en Francia'],
    answer: 2,
    color: ['#1976d2', '#64b5f6'],
    icon: 'help-circle'
  },
  {
    type: 'choice',
    question: '¿Qué necesitas para reservar una habitación de hotel?',
    options: ['Billete de avión', 'Pasaporte y tarjeta', 'Carnet de conducir', 'Receta médica'],
    answer: 1,
    color: ['#1976d2', '#64b5f6'],
    icon: 'help-circle'
  },
  {
    type: 'choice',
    question: '¿Qué significa "turismo"?',
    options: ['Trabajo', 'Actividad de viajar por placer', 'Estudio', 'Comida'],
    answer: 1,
    color: ['#1976d2', '#64b5f6'],
    icon: 'help-circle'
  },
  {
    type: 'choice',
    question: '¿Qué expresión usas para hablar de lugares visitados?',
    options: ['He visitado museos', 'Visitaré museos', 'Visito museos', 'Visitaba museos'],
    answer: 0,
    color: ['#1976d2', '#64b5f6'],
    icon: 'help-circle'
  },
  {
    type: 'choice',
    question: '¿Qué significa "monumento"?',
    options: ['Un hotel', 'Una construcción histórica importante', 'Un billete', 'Una maleta'],
    answer: 1,
    color: ['#1976d2', '#64b5f6'],
    icon: 'help-circle'
  },
  {
    type: 'choice',
    question: '¿Qué necesitas para viajar en avión?',
    options: ['Billete de avión', 'Carnet de conducir', 'Receta médica', 'Libro'],
    answer: 0,
    color: ['#1976d2', '#64b5f6'],
    icon: 'help-circle'
  },
  {
    type: 'choice',
    question: '¿Qué expresión usas para describir un viaje?',
    options: ['Fue increíble', 'Será increíble', 'Es increíble', 'Era increíble'],
    answer: 0,
    color: ['#1976d2', '#64b5f6'],
    icon: 'help-circle'
  },
  // Unidad 5: La tecnología y los medios de comunicación
  {
    type: 'choice',
    question: '¿Qué significa "red social"?',
    options: ['Internet', 'Plataforma para comunicarse en línea', 'Teléfono móvil', 'Televisión'],
    answer: 1,
    color: ['#1976d2', '#64b5f6'],
    icon: 'help-circle'
  },
  {
    type: 'choice',
    question: 'Si dices "Uso mucho las aplicaciones", ¿qué haces?',
    options: ['Compro aplicaciones', 'Utilizo programas en el móvil', 'Vendo aplicaciones', 'Creo aplicaciones'],
    answer: 1,
    color: ['#1976d2', '#64b5f6'],
    icon: 'help-circle'
  },
  {
    type: 'choice',
    question: '¿Qué expresión usas para dar tu opinión sobre tecnología?',
    options: ['Opino que es útil', 'Opinaré que es útil', 'Opinaba que es útil', 'He opinado que es útil'],
    answer: 0,
    color: ['#1976d2', '#64b5f6'],
    icon: 'help-circle'
  },
  {
    type: 'choice',
    question: '¿Qué significa "aplicación" en tecnología?',
    options: ['Un teléfono', 'Un programa para móvil u ordenador', 'Internet', 'Una pantalla'],
    answer: 1,
    color: ['#1976d2', '#64b5f6'],
    icon: 'help-circle'
  },
  {
    type: 'choice',
    question: '¿Qué expresión usas para hablar de frecuencia de uso de tecnología?',
    options: ['Uso mucho el móvil', 'Usé el móvil', 'Usaré el móvil', 'Usaba el móvil'],
    answer: 0,
    color: ['#1976d2', '#64b5f6'],
    icon: 'help-circle'
  },
  {
    type: 'choice',
    question: '¿Qué significa "navegador"?',
    options: ['Un programa para ver páginas web', 'Un teléfono', 'Una aplicación', 'Internet'],
    answer: 0,
    color: ['#1976d2', '#64b5f6'],
    icon: 'help-circle'
  },
  {
    type: 'choice',
    question: '¿Qué expresión usas para hablar de ventajas y desventajas?',
    options: ['Es útil pero adictivo', 'Fue útil', 'Será útil', 'Era útil'],
    answer: 0,
    color: ['#1976d2', '#64b5f6'],
    icon: 'help-circle'
  },
  {
    type: 'choice',
    question: '¿Qué significa "correo electrónico"?',
    options: ['Una carta', 'Mensaje enviado por internet', 'Un teléfono', 'Una aplicación'],
    answer: 1,
    color: ['#1976d2', '#64b5f6'],
    icon: 'help-circle'
  },
  // Unidad 6: La vida en sociedad / La sociedad y la convivencia
  {
    type: 'choice',
    question: '¿Qué significa "convivencia"?',
    options: ['Vivir solo', 'Vivir juntos en armonía', 'Vivir en otro país', 'Vivir temporalmente'],
    answer: 1,
    color: ['#1976d2', '#64b5f6'],
    icon: 'help-circle'
  },
  {
    type: 'choice',
    question: '¿Qué expresión usas para comparar culturas?',
    options: ['En mi país es igual', 'En mi país es más tradicional', 'En mi país será igual', 'En mi país era igual'],
    answer: 1,
    color: ['#1976d2', '#64b5f6'],
    icon: 'help-circle'
  },
  {
    type: 'choice',
    question: '¿Qué valor es importante para la integración?',
    options: ['El dinero', 'El respeto', 'El trabajo', 'La casa'],
    answer: 1,
    color: ['#1976d2', '#64b5f6'],
    icon: 'help-circle'
  },
  {
    type: 'choice',
    question: '¿Qué significa "tolerancia"?',
    options: ['Aceptar diferencias', 'Rechazar diferencias', 'Ignorar', 'Luchar'],
    answer: 0,
    color: ['#1976d2', '#64b5f6'],
    icon: 'help-circle'
  },
  {
    type: 'choice',
    question: '¿Qué expresión usas para hablar de adaptación?',
    options: ['Me adapté a la cultura', 'Me adaptaré', 'Me adapto', 'Me adaptaba'],
    answer: 0,
    color: ['#1976d2', '#64b5f6'],
    icon: 'help-circle'
  },
  {
    type: 'choice',
    question: '¿Qué significa "diversidad"?',
    options: ['Igualdad', 'Variedad de personas y culturas', 'Unidad', 'Similitud'],
    answer: 1,
    color: ['#1976d2', '#64b5f6'],
    icon: 'help-circle'
  },
  {
    type: 'choice',
    question: '¿Qué expresión usas para expresar sorpresa cultural?',
    options: ['Me sorprende', 'Me sorprendió', 'Me sorprenderá', 'Me sorprendía'],
    answer: 0,
    color: ['#1976d2', '#64b5f6'],
    icon: 'help-circle'
  },
  {
    type: 'choice',
    question: '¿Qué significa "normas sociales"?',
    options: ['Leyes', 'Reglas de comportamiento en sociedad', 'Costumbres personales', 'Opiniones'],
    answer: 1,
    color: ['#1976d2', '#64b5f6'],
    icon: 'help-circle'
  },
  // Unidad 7: Anuncios y carteles
  {
    type: 'choice',
    question: '¿Qué significa el cartel "Prohibido fumar"?',
    options: ['Se puede fumar', 'No se puede fumar', 'Hay humo', 'Zona de fumadores'],
    answer: 1,
    color: ['#1976d2', '#64b5f6'],
    icon: 'help-circle'
  },
  {
    type: 'choice',
    question: '¿Qué quiere decir "Se ruega silencio"?',
    options: ['Se pide hablar', 'Se pide silencio', 'Se puede cantar', 'Se puede gritar'],
    answer: 1,
    color: ['#1976d2', '#64b5f6'],
    icon: 'help-circle'
  },
  {
    type: 'choice',
    question: '¿Qué significa "Aforo completo"?',
    options: ['Hay plazas libres', 'No hay más plazas', 'Se puede entrar gratis', 'Solo con tarjeta'],
    answer: 1,
    color: ['#1976d2', '#64b5f6'],
    icon: 'help-circle'
  },
  {
    type: 'choice',
    question: '¿Qué significa "Solo tarjeta"?',
    options: ['Solo se paga con tarjeta', 'Solo se paga en efectivo', 'No se paga', 'Solo se paga en línea'],
    answer: 0,
    color: ['#1976d2', '#64b5f6'],
    icon: 'help-circle'
  },
  {
    type: 'choice',
    question: '¿Qué significa "Cerrado por vacaciones"?',
    options: ['Abierto todo el día', 'No abre por vacaciones', 'Abre solo por la mañana', 'Abre con cita previa'],
    answer: 1,
    color: ['#1976d2', '#64b5f6'],
    icon: 'help-circle'
  },
  {
    type: 'choice',
    question: '¿Qué significa "Oferta 2x1"?',
    options: ['Pagas uno y llevas dos', 'Pagas dos y llevas uno', 'Solo un producto', 'Sin descuento'],
    answer: 0,
    color: ['#1976d2', '#64b5f6'],
    icon: 'help-circle'
  },
  {
    type: 'choice',
    question: '¿Qué significa "Se necesita cita previa"?',
    options: ['Ir sin avisar', 'Pedir cita antes de ir', 'Comprar en línea', 'Firmar un contrato'],
    answer: 1,
    color: ['#1976d2', '#64b5f6'],
    icon: 'help-circle'
  },
  {
    type: 'choice',
    question: '¿Qué significa "Entrada gratuita"?',
    options: ['Hay que pagar', 'No cuesta dinero', 'Solo con invitación', 'Solo para socios'],
    answer: 1,
    color: ['#1976d2', '#64b5f6'],
    icon: 'help-circle'
  },
  // Unidad 8: Menús y horarios
  {
    type: 'choice',
    question: '¿Qué significa "menú del día"?',
    options: ['Carta completa', 'Plato especial diario a precio fijo', 'Solo postres', 'Solo bebidas'],
    answer: 1,
    color: ['#1976d2', '#64b5f6'],
    icon: 'help-circle'
  },
  {
    type: 'choice',
    question: '¿Qué es un "primer plato"?',
    options: ['El postre', 'El plato que se sirve primero', 'La bebida', 'El café'],
    answer: 1,
    color: ['#1976d2', '#64b5f6'],
    icon: 'help-circle'
  },
  {
    type: 'choice',
    question: '¿Qué es un "segundo plato"?',
    options: ['El plato principal después del primero', 'El entrante', 'La bebida', 'El postre'],
    answer: 0,
    color: ['#1976d2', '#64b5f6'],
    icon: 'help-circle'
  },
  {
    type: 'choice',
    question: '¿Qué significa "horario de mañana"?',
    options: ['Se atiende por la mañana', 'Se atiende por la noche', 'Se atiende los domingos', 'Se atiende solo online'],
    answer: 0,
    color: ['#1976d2', '#64b5f6'],
    icon: 'help-circle'
  },
  {
    type: 'choice',
    question: '¿Qué significa "turno de tarde"?',
    options: ['Atención por la tarde', 'Atención por la mañana', 'Atención de madrugada', 'Atención 24 horas'],
    answer: 0,
    color: ['#1976d2', '#64b5f6'],
    icon: 'help-circle'
  },
  {
    type: 'choice',
    question: '¿Qué significa "reservar mesa"?',
    options: ['Pedir mesa con antelación', 'Pedir la cuenta', 'Cambiar de mesa', 'Pedir comida para llevar'],
    answer: 0,
    color: ['#1976d2', '#64b5f6'],
    icon: 'help-circle'
  },
  {
    type: 'choice',
    question: '¿Qué significa "sin gluten"?',
    options: ['Comida apta para celíacos', 'Comida con mucha sal', 'Comida muy picante', 'Comida congelada'],
    answer: 0,
    color: ['#1976d2', '#64b5f6'],
    icon: 'help-circle'
  },
  {
    type: 'choice',
    question: '¿Qué significa "cerrado a mediodía"?',
    options: ['No abre al mediodía', 'Abre solo de madrugada', 'Abre todo el día', 'Abre solo los sábados'],
    answer: 0,
    color: ['#1976d2', '#64b5f6'],
    icon: 'help-circle'
  },
  // Unidad 9: Trámites y documentación
  {
    type: 'choice',
    question: '¿Qué es el "empadronamiento"?',
    options: ['Registro del domicilio en el ayuntamiento', 'Un examen', 'Un contrato de trabajo', 'Un billete de viaje'],
    answer: 0,
    color: ['#1976d2', '#64b5f6'],
    icon: 'help-circle'
  },
  {
    type: 'choice',
    question: '¿Qué significa "documento en vigor"?',
    options: ['Documento válido', 'Documento vencido', 'Documento roto', 'Documento falso'],
    answer: 0,
    color: ['#1976d2', '#64b5f6'],
    icon: 'help-circle'
  },
  {
    type: 'choice',
    question: '¿Qué es una "tasa administrativa"?',
    options: ['Pago por un trámite', 'Una multa', 'Un salario', 'Un descuento'],
    answer: 0,
    color: ['#1976d2', '#64b5f6'],
    icon: 'help-circle'
  },
  {
    type: 'choice',
    question: '¿Qué significa "fotocopia compulsada"?',
    options: ['Copia sellada como válida', 'Copia borrosa', 'Copia a color', 'Copia sin firma'],
    answer: 0,
    color: ['#1976d2', '#64b5f6'],
    icon: 'help-circle'
  },
  {
    type: 'choice',
    question: '¿Qué significa "presentar un formulario"?',
    options: ['Entregar un documento rellenado', 'Romper un papel', 'Comprar un formulario', 'Guardar un documento'],
    answer: 0,
    color: ['#1976d2', '#64b5f6'],
    icon: 'help-circle'
  },
  {
    type: 'choice',
    question: '¿Qué significa "firma"?',
    options: ['Escribir tu nombre para validar', 'Pagar en efectivo', 'Pedir cita', 'Hacer una foto'],
    answer: 0,
    color: ['#1976d2', '#64b5f6'],
    icon: 'help-circle'
  },
  {
    type: 'choice',
    question: '¿Qué es un "sello" en un documento?',
    options: ['Marca oficial que valida', 'Un dibujo decorativo', 'Una firma personal', 'Un código secreto'],
    answer: 0,
    color: ['#1976d2', '#64b5f6'],
    icon: 'help-circle'
  },
  {
    type: 'choice',
    question: '¿Qué significa "aportación de documentos"?',
    options: ['Entregar los documentos requeridos', 'Guardar documentos', 'Romper documentos', 'Traducir documentos'],
    answer: 0,
    color: ['#1976d2', '#64b5f6'],
    icon: 'help-circle'
  },
  // Unidad 10: El futuro y los proyectos
  {
    type: 'choice',
    question: '¿Qué expresión usas para hablar de planes futuros?',
    options: ['Voy a mejorar mi español', 'Mejoré mi español', 'Mejoraba mi español', 'He mejorado mi español'],
    answer: 0,
    color: ['#1976d2', '#64b5f6'],
    icon: 'help-circle'
  },
  {
    type: 'choice',
    question: '¿Qué significa "objetivo"?',
    options: ['Un sueño', 'Una meta a alcanzar', 'Un problema', 'Una dificultad'],
    answer: 1,
    color: ['#1976d2', '#64b5f6'],
    icon: 'help-circle'
  },
  {
    type: 'choice',
    question: '¿Qué expresión usas para hablar de expectativas?',
    options: ['Espero tener éxito', 'Tuve éxito', 'Tendré éxito', 'He tenido éxito'],
    answer: 0,
    color: ['#1976d2', '#64b5f6'],
    icon: 'help-circle'
  },
  {
    type: 'choice',
    question: '¿Qué significa "proyecto"?',
    options: ['Un plan', 'Un plan o idea para realizar algo', 'Un problema', 'Una dificultad'],
    answer: 1,
    color: ['#1976d2', '#64b5f6'],
    icon: 'help-circle'
  },
  {
    type: 'choice',
    question: '¿Qué expresión usas para hablar de planes a largo plazo?',
    options: ['A largo plazo quiero', 'A largo plazo quise', 'A largo plazo querré', 'A largo plazo quería'],
    answer: 0,
    color: ['#1976d2', '#64b5f6'],
    icon: 'help-circle'
  },
  {
    type: 'choice',
    question: '¿Qué significa "motivación"?',
    options: ['Desánimo', 'Razón o impulso para hacer algo', 'Pereza', 'Miedo'],
    answer: 1,
    color: ['#1976d2', '#64b5f6'],
    icon: 'help-circle'
  },
  {
    type: 'choice',
    question: '¿Qué expresión usas para hablar de condiciones futuras?',
    options: ['Si estudio, aprobaré', 'Estudié y aprobé', 'Estudio y apruebo', 'Estudiaba y aprobaba'],
    answer: 0,
    color: ['#1976d2', '#64b5f6'],
    icon: 'help-circle'
  },
  {
    type: 'choice',
    question: '¿Qué significa "aspiración"?',
    options: ['Un problema', 'Deseo o meta que quieres alcanzar', 'Un fracaso', 'Una dificultad'],
    answer: 1,
    color: ['#1976d2', '#64b5f6'],
    icon: 'help-circle'
  },
];

function shuffle<T>(array: T[]): T[] {
  let arr = [...array];
  let currentIndex = arr.length, randomIndex;
  while (currentIndex !== 0) {
    randomIndex = Math.floor(Math.random() * currentIndex);
    currentIndex--;
    [arr[currentIndex], arr[randomIndex]] = [arr[randomIndex], arr[currentIndex]];
  }
  return arr;
}

const TIEMPO_POR_PREGUNTA = 20;

const ExamenScreen = () => {
  const router = useRouter();
  const { progress, markOralPassed, markWrittenPassed } = useUserProgress();
  const levelProgress = progress.A2;
  const oralPassedFromContext = levelProgress?.oralPassed ?? false;
  const writtenPassedFromContext = levelProgress?.writtenPassed ?? false;
  // Examen siempre accesible (sin guard de unidades completadas)
  const [sourceQuestions, setSourceQuestions] = useState<Question[]>([]);
  const [shuffledQuestions, setShuffledQuestions] = useState<Question[]>([]);
  const [current, setCurrent] = useState<number>(0);
  const [answers, setAnswers] = useState<(number | null)[]>([]);
  const [showResult, setShowResult] = useState<boolean>(false);
  const [timer, setTimer] = useState<number>(15);
  const [started, setStarted] = useState<boolean>(false);
  const [examStopped, setExamStopped] = useState<boolean>(false);

  const [oralMode, setOralMode] = useState(false);
  const [oralIdx, setOralIdx] = useState(0);
  const [oralTranscripts, setOralTranscripts] = useState<Record<number, string>>({});
  const [oralFinished, setOralFinished] = useState(false);
  const [oralScore, setOralScore] = useState(0);
  const [oralScores, setOralScores] = useState<number[]>([0,0,0,0,0]);
  const [oralGatePassed, setOralGatePassed] = useState(oralPassedFromContext);
  const [webMode, setWebMode] = useState(false);
  const [oralGateIndex, setOralGateIndex] = useState(0);
  const [webPromptText, setWebPromptText] = useState('');
  const [webPercent, setWebPercent] = useState<number | null>(null);

  const rotation = useRef(new Animated.Value(0)).current;
  const appStateRef = useRef(AppState.currentState);

  const [testPassed, setTestPassed] = useState(false);
  const [oralApproved, setOralApproved] = useState(oralPassedFromContext);

  useEffect(() => {
    setOralGatePassed(oralPassedFromContext);
    setOralApproved(oralPassedFromContext);
  }, [oralPassedFromContext]);

  useEffect(() => {
    if (writtenPassedFromContext) {
      setTestPassed(true);
    }
  }, [writtenPassedFromContext]);

  // Animación del reloj
  useEffect(() => {
    Animated.loop(
      Animated.timing(rotation, {
        toValue: 1,
        duration: 1000,
        useNativeDriver: true,
        easing: Easing.linear,
      })
    ).start();
  }, [rotation]);

  const correct = shuffledQuestions.filter((q, idx) => q.type === 'choice' && answers[idx] === q.answer).length;

  // Detectar cuando la app pasa a segundo plano durante el examen
  useEffect(() => {
    if (!started) return;

    const subscription = AppState.addEventListener('change', (nextAppState) => {
      if (
        appStateRef.current.match(/active/) &&
        nextAppState.match(/inactive|background/)
      ) {
        // La app pasó a segundo plano durante el examen
        console.warn('⚠️ App pasó a segundo plano durante el examen');
        setExamStopped(true);
        setStarted(false);
        setShowResult(true);
        
        Alert.alert(
          '❌ Examen Perdido',
          'Has salido de la aplicación durante el examen. El examen ha sido cancelado automáticamente por seguridad.\n\nSi sales de la app durante el examen, pierdes automáticamente.',
          [
            {
              text: 'Entendido',
              onPress: () => {
                router.replace('/(tabs)/A2_Plataforma');
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
  }, [started]);

  // Efecto para manejar el temporizador y la lógica de aprobación
  useEffect(() => {
    if (!started || showResult) return;
    
    const interval = setInterval(() => {
      setTimer(prev => {
        if (prev <= 1) {
          clearInterval(interval);
          next();
          return 15;
        }
        return prev - 1;
      });
    }, 1000);

    // No navegar automáticamente - dejar que el usuario presione el botón
    // Esto permite que el usuario vea su resultado antes de ir al diploma
    if (showResult && correct >= 16 && oralGatePassed) {
      setTestPassed(true);
    }

    return () => clearInterval(interval);
  }, [showResult, correct, oralGatePassed, router, markWrittenPassed]);

  useEffect(() => {
    // Sistema de selección de 30 preguntas aleatorias del banco de 90
    // Si el usuario falló, excluir las preguntas del intento anterior
    const loadQuestions = async () => {
      try {
        const QUESTIONS_PER_EXAM = 30;
        const ALL_QUESTIONS = preguntasA2;
        
        // Obtener índices de preguntas usadas en el intento anterior (si falló)
        const usedIndicesStr = await AsyncStorage.getItem('A2_examen_preguntas_usadas');
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
        const selectedIndices = shuffle(indicesToUse).slice(0, QUESTIONS_PER_EXAM);
        
        // Guardar los índices seleccionados para este intento
        await AsyncStorage.setItem('A2_examen_preguntas_actuales', JSON.stringify(selectedIndices));

        // Obtener las preguntas seleccionadas
        const selectedQuestions = selectedIndices.map(idx => ALL_QUESTIONS[idx]);

        // Barajar opciones de cada pregunta
        const barajadas = selectedQuestions.map((q) => {
        if (q.type === 'choice' && Array.isArray(q.options) && typeof q.answer === 'number') {
          const optionsBarajadas = shuffle(q.options);
          const idxCorrecta = optionsBarajadas.indexOf(q.options[q.answer]);
          return { ...q, options: optionsBarajadas, answer: idxCorrecta };
        }
        return { ...q };
      });

        setSourceQuestions(selectedQuestions);
      setShuffledQuestions(shuffle(barajadas));
        setAnswers(Array(selectedQuestions.length).fill(null));
      setCurrent(0);
      setShowResult(false);
    } catch (err) {
      console.error('Error cargando preguntas A2:', err);
      setSourceQuestions([]);
      setShuffledQuestions([]);
      setAnswers([]);
    }
    };

    loadQuestions();
  }, []);

  const handleSelect = (idx: number) => {
    const nuevas = [...answers];
    nuevas[current] = idx;
    setAnswers(nuevas);
  };

  // Eliminado soporte de respuestas de texto; solo opción múltiple

  const next = async () => {
    if (current < shuffledQuestions.length - 1) {
      setCurrent(current + 1);
    } else if (!showResult) {
      setShowResult(true);
      
      // Si el usuario falla, guardar las preguntas usadas para excluirlas en el siguiente intento
      const correctCount = shuffledQuestions.filter((q, idx) => q.type === 'choice' && answers[idx] === q.answer).length;
      if (correctCount < 16) {
        try {
          const currentIndicesStr = await AsyncStorage.getItem('A2_examen_preguntas_actuales');
          if (currentIndicesStr) {
            const currentIndices: number[] = JSON.parse(currentIndicesStr);
            // Guardar estos índices como usados
            await AsyncStorage.setItem('A2_examen_preguntas_usadas', JSON.stringify(currentIndices));
          }
        } catch (error) {
          console.error('Error guardando preguntas usadas:', error);
        }
      } else {
        // Si aprueba, limpiar las preguntas usadas
        try {
          await AsyncStorage.removeItem('A2_examen_preguntas_usadas');
          await AsyncStorage.removeItem('A2_examen_preguntas_actuales');
        } catch (error) {
          console.error('Error limpiando preguntas usadas:', error);
        }
      }
    }
  };
  const prev = () => {
    if (current > 0) setCurrent(current - 1);
  };

  const resetExam = async () => {
    // Recargar preguntas excluyendo las usadas anteriormente
    try {
      const QUESTIONS_PER_EXAM = 30;
      const ALL_QUESTIONS = preguntasA2;
      
      const usedIndicesStr = await AsyncStorage.getItem('A2_examen_preguntas_usadas');
      let usedIndices: number[] = [];
      if (usedIndicesStr) {
        try {
          usedIndices = JSON.parse(usedIndicesStr);
        } catch (e) {
          console.error('Error parseando índices usados:', e);
        }
      }

      const availableIndices = ALL_QUESTIONS
        .map((_, idx) => idx)
        .filter(idx => !usedIndices.includes(idx));

      const indicesToUse = availableIndices.length >= QUESTIONS_PER_EXAM
        ? availableIndices
        : ALL_QUESTIONS.map((_, idx) => idx);

      const selectedIndices = shuffle(indicesToUse).slice(0, QUESTIONS_PER_EXAM);
      await AsyncStorage.setItem('A2_examen_preguntas_actuales', JSON.stringify(selectedIndices));

      const selectedQuestions = selectedIndices.map(idx => ALL_QUESTIONS[idx]);
      const barajadas = selectedQuestions.map((q) => {
        if (q.type === 'choice' && Array.isArray(q.options) && typeof q.answer === 'number') {
          const optionsBarajadas = shuffle(q.options);
          const idxCorrecta = optionsBarajadas.indexOf(q.options[q.answer]);
          return { ...q, options: optionsBarajadas, answer: idxCorrecta };
        }
        return { ...q };
      });

      setSourceQuestions(selectedQuestions);
      setShuffledQuestions(shuffle(barajadas));
      setAnswers(Array(selectedQuestions.length).fill(null));
      setCurrent(0);
      setShowResult(false);
      setStarted(false);
    } catch (error) {
      console.error('Error recargando preguntas:', error);
      // Fallback: solo reiniciar con las preguntas actuales
    const barajadas = sourceQuestions.map((q) => {
      if (q.type === 'choice' && Array.isArray(q.options) && typeof q.answer === 'number') {
        const optionsBarajadas = shuffle(q.options || []);
        const idxCorrecta = optionsBarajadas.indexOf((q.options || [])[q.answer]);
        return { ...q, options: optionsBarajadas, answer: idxCorrecta };
      }
      return { ...q };
    });
    setShuffledQuestions(shuffle(barajadas));
    setAnswers(Array(sourceQuestions.length).fill(null));
    setCurrent(0);
    setShowResult(false);
    setStarted(false);
    }
  };

  const resetCompleteExam = async () => {
    try {
      // Limpiar preguntas usadas para permitir todas las preguntas de nuevo
      await AsyncStorage.removeItem('A2_examen_preguntas_usadas');
      await AsyncStorage.removeItem('A2_examen_preguntas_actuales');
      
      // Resetear todos los estados locales
      setOralGatePassed(false);
      setStarted(false);
      setShowResult(false);
      setOralMode(false);
      setOralFinished(false);
      setOralScore(0);
      setOralScores([0,0,0,0,0]);
      setOralTranscripts({});
      setOralIdx(0);
      setCurrent(0);
      setAnswers([]);
      setTestPassed(false);
      setOralApproved(false);

      // Recargar preguntas (esto seleccionará nuevas 30 preguntas)
      const QUESTIONS_PER_EXAM = 30;
      const ALL_QUESTIONS = preguntasA2;
      const selectedIndices = shuffle(ALL_QUESTIONS.map((_, idx) => idx)).slice(0, QUESTIONS_PER_EXAM);
      await AsyncStorage.setItem('A2_examen_preguntas_actuales', JSON.stringify(selectedIndices));
      
      const selectedQuestions = selectedIndices.map(idx => ALL_QUESTIONS[idx]);
      const barajadas = selectedQuestions.map((q) => {
        if (q.type === 'choice' && Array.isArray(q.options) && typeof q.answer === 'number') {
          const optionsBarajadas = shuffle(q.options);
          const idxCorrecta = optionsBarajadas.indexOf(q.options[q.answer]);
          return { ...q, options: optionsBarajadas, answer: idxCorrecta };
        }
        return { ...q };
      });
      
      setSourceQuestions(selectedQuestions);
      setShuffledQuestions(shuffle(barajadas));
      setAnswers(Array(selectedQuestions.length).fill(null));

      Alert.alert(
        'Examen Reiniciado Completamente',
        'Todos los datos del examen han sido eliminados. Se han seleccionado nuevas preguntas. Puedes comenzar de nuevo.',
        [{ text: 'OK' }]
      );
    } catch (error) {
      console.error('Error reiniciando examen:', error);
      Alert.alert('Error', 'No se pudo reiniciar el examen completamente.');
    }
  };

  const compartirResultado = async () => {
    try {
      await Share.share({
        message: `¡He aprobado el examen de nivel A2 con ${correct} de ${shuffledQuestions.length} respuestas correctas!`,
        title: 'Resultado del Examen A2',
      });
    } catch (error) {
      console.error('Error al compartir:', error);
    }
  };

  // Enunciados orales (A2)
  const oralPrompts = [
    'Hola, me llamo Ana y vivo en Madrid.',
    'Para llegar al centro de salud, siga todo recto y gire a la derecha.',
    'Ayer compré pan y leche en el supermercado.',
    'Trabajo de lunes a viernes en una oficina cerca de mi casa.',
    'El fin de semana me gusta pasear por el parque con mi familia.'
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
        .start { background: #1976d2; }
        .stop { background: #e53935; }
        .box { background: #f5f5f5; padding: 12px; border-radius: 8px; margin-top: 12px; }
        .prompt { background: #fff3e0; border-left: 4px solid #ff9800; padding: 10px; border-radius: 8px; margin-bottom: 12px; }
      </style>
    </head>
    <body>
      <h3>Reconocimiento Web (beta)</h3>
      <div style="color:#555; font-size:14px; margin-bottom:8px;">El reconocimiento se inicia automáticamente. Si no empieza, pulsa "Hablar".</div>
      <div class="prompt">
        <div style="font-weight:600; color:#ff9800; margin-bottom:6px;">Texto a leer</div>
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
        markOralPassed('A2');
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
    return aciertos / objTokens.length; // 0..1
  };

  // Bienvenida estilo A1
  if (!started && !oralMode) {
    return (
      <LinearGradient colors={['#000', '#000']} style={styles.background}>
        <KeyboardAvoidingView style={styles.container} behavior={Platform.OS === 'ios' ? 'padding' : 'height'} keyboardVerticalOffset={64}>
          <View style={{ position: 'absolute', left: 10, top: 16 }}>
            <TouchableOpacity style={{ backgroundColor: '#fff', borderRadius: 20, padding: 3 }} onPress={() => router.replace('/(tabs)/A2_Plataforma')}>
              <Ionicons name="arrow-back" size={28} color="#FFD700" />
            </TouchableOpacity>
          </View>
          <View style={{ alignItems: 'center', gap: 16 }}>
            <Ionicons name="school" size={80} color="#FFD700" />
            <Text style={{ fontSize: 28, fontWeight: 'bold', color: '#FFD700' }}>Examen Final A2</Text>
            <View style={{ backgroundColor: 'rgba(255,255,255,0.2)', padding: 16, borderRadius: 12, width: '100%' }}>
              <Text style={{ color: '#FFD700', fontWeight: 'bold', marginBottom: 6 }}>Instrucciones</Text>
              <Text style={{ color: '#FFD700' }}>15 segundos por pregunta</Text>
              <Text style={{ color: '#FFD700' }}>{sourceQuestions.length} preguntas totales (2 por unidad)</Text>
              <Text style={{ color: '#FFD700', marginTop: 6 }}>Para superar: pasar el examen oral (3 de 5 lecturas al 100%) y mínimo 16/20 en el test.</Text>
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
                setStarted(true);
              }}
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
                      <Text style={{ color:'#FFD700', fontWeight:'bold', textAlign:'center' }}>Examen Oral A2 (3 de 5 al 100%)</Text>
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
        </KeyboardAvoidingView>
      </LinearGradient>
    );
  }

  // UI Modo Oral (estilo A1)
  if (oralMode) {
    const trans = oralTranscripts[oralIdx] || '';
    const parcial = Math.round(compararFrase(oralPrompts[oralIdx], trans) * 100);
    return (
      <LinearGradient colors={['#000', '#000']} style={styles.background}>
        <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', padding: 16 }}>
          <TouchableOpacity onPress={() => setOralMode(false)}>
            <Ionicons name="arrow-back" size={24} color="#FFD700" />
          </TouchableOpacity>
          <Text style={{ color: '#FFD700', fontWeight: 'bold' }}>Oral {oralIdx + 1}/{oralPrompts.length}</Text>
          <View style={{ width: 24 }} />
        </View>
        <ScrollView contentContainerStyle={{ padding: 16 }}>
          <Text style={{ color: '#FFD700', fontSize: 20, fontWeight: 'bold', marginBottom: 12 }}>{oralPrompts[oralIdx]}</Text>
          <TouchableOpacity
            style={[styles.siguienteBtn, { backgroundColor: '#fff' }]}
            onPress={handleStartOralGate}
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
              <Text style={{ color: '#FFD700', fontSize: 22, fontWeight: 'bold' }}>{oralScore === 100 ? 'Oral aprobado' : 'Oral no aprobado'}</Text>
              <Text style={{ color: '#FFD700', marginTop: 6 }}>{oralScore === 100 ? 'Has completado 3 de 5 lecturas al 100%.' : 'Necesitas 3 de 5 lecturas al 100%.'}</Text>
              {oralScore === 100 ? (
                <TouchableOpacity
                  style={[styles.siguienteBtn, { backgroundColor: '#fff', marginTop: 12 }]}
                  onPress={async () => {
                    try {
                      setOralApproved(true);
                      setOralGatePassed(true);
                      markOralPassed('A2');
                      Alert.alert('Oral aprobado', 'Ya puedes realizar el test del examen.');
                      setOralMode(false);
                    } catch {}
                  }}
                >
                  <Text style={{ color: '#1976d2', fontWeight: 'bold' }}>Continuar</Text>
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

  return (
    <LinearGradient colors={['#1976d2', '#42a5f5']} style={styles.background}>
      <KeyboardAvoidingView
        style={styles.container}
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        keyboardVerticalOffset={64}
      >

        {!showResult && started && !examStopped && shuffledQuestions[current] ? (
          <>
            <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'center', marginBottom: 14 }}>
              <Animated.View style={{ transform: [{ rotate: rotation.interpolate({ inputRange: [0, 1], outputRange: ['0deg', '360deg'] }) }], marginRight: 8 }}>
                <Ionicons name="time-outline" size={28} color="#fff" />
              </Animated.View>
              <Text style={{ fontSize: 22, fontWeight: 'bold', color: '#fff' }}>{timer}s</Text>
            </View>
            <Text style={styles.indicadorPregunta}>Pregunta {current + 1} de {shuffledQuestions.length}</Text>
            <Text style={styles.pregunta}>{shuffledQuestions[current].question}</Text>
            {Array.isArray(shuffledQuestions[current]?.options) && shuffledQuestions[current].options.map((option, idx) => (
              <TouchableOpacity
                key={idx}
                style={[
                  styles.opcion,
                  answers[current] === idx &&
                    (idx === shuffledQuestions[current].answer
                      ? styles.correcta
                      : styles.incorrecta),
                ]}
                onPress={() => handleSelect(idx)}
                disabled={answers[current] != null}
              >
                <Text style={styles.opcionTexto}>{option}</Text>
              </TouchableOpacity>
            ))}
            <View style={{ alignItems: 'center', marginTop: 24 }}>
              <TouchableOpacity
                style={[
                  styles.siguienteBtn,
                  { backgroundColor: answers[current] == null ? '#bdbdbd' : '#212121' }
                ]}
                onPress={next}
                disabled={answers[current] == null}
              >
                <Text style={{ color: answers[current] == null ? '#757575' : '#fff', fontSize: 18, fontWeight: 'bold' }}>Siguiente</Text>
              </TouchableOpacity>
            </View>
        </>
      ) : (
        <View style={styles.resultadoContainer}>
          <Ionicons
            name={correct >= 16 ? 'trophy' : 'checkmark-circle'}
            size={80}
            color={correct >= 16 ? 'gold' : 'green'}
            style={{ marginBottom: 20 }}
          />
          <Text style={styles.resultadoTexto}>
            Has respondido correctamente {correct} de {shuffledQuestions.length} preguntas.
          </Text>
          {(correct >= 16 && oralGatePassed) ? (
            <View style={{ alignItems: 'center', width: '100%', marginTop: 20 }}>
              <ExamenPresencialForm nivel="A2" />
              <TouchableOpacity
                style={[styles.compartirBtn, { backgroundColor: '#79A890', marginBottom: 15, paddingVertical: 16, paddingHorizontal: 32 }]}
                onPress={async () => {
                  try {
                    await markWrittenPassed('A2');
                    router.replace({
                      pathname: '/(tabs)/DiplomaGeneradoScreen',
                      params: { nivel: 'A2' }
                    });
                  } catch (error) {
                    console.error('Error al actualizar progreso A2:', error);
                    Alert.alert('Error', 'No se pudo actualizar el estado del examen. Intenta nuevamente.');
                  }
                }}
              >
                <Text style={{ color: '#fff', fontWeight: 'bold', fontSize: 18 }}>🎉 Felicidades, obtén tu diploma</Text>
              </TouchableOpacity>
            </View>
          ) : (
            <>
              <TouchableOpacity style={styles.botonReiniciar} onPress={resetExam}>
                <Text style={styles.botonReiniciarTexto}>Reintentar</Text>
              </TouchableOpacity>

              <TouchableOpacity
                style={[styles.botonReiniciar, { backgroundColor: '#f44336', marginTop: 10 }]}
                onPress={resetCompleteExam}
              >
                <Text style={[styles.botonReiniciarTexto, { color: '#fff' }]}>Reiniciar Todo</Text>
              </TouchableOpacity>
            </>
          )}
        </View>
      )}
    </KeyboardAvoidingView>
  </LinearGradient>
);
};

const styles = StyleSheet.create({
  background: {
    flex: 1,
  },
  container: {
    flex: 1,
    padding: 20,
    justifyContent: 'center',
  },
  pregunta: {
    fontSize: 22,
    marginBottom: 20,
    fontWeight: 'bold',
    color: '#333',
    textAlign: 'center',
  },
  opcion: {
    backgroundColor: 'rgba(255,255,255,0.8)',
    padding: 15,
    borderRadius: 10,
    marginBottom: 10,
  },
  opcionTexto: {
    fontSize: 18,
    color: 'black',
    textAlign: 'center',
  },
  correcta: {
    backgroundColor: 'rgba(0, 200, 0, 0.7)',
  },
  incorrecta: {
    backgroundColor: 'rgba(200, 0, 0, 0.7)',
  },
  textInput: {
    backgroundColor: '#fffde7',
    borderRadius: 10,
    padding: 12,
    fontSize: 17,
    marginBottom: 16,
    color: '#333',
    borderColor: '#ffe082',
    borderWidth: 2,
    textAlign: 'center',
  },
  resultadoContainer: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  resultadoTexto: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#222',
    marginBottom: 20,
    textAlign: 'center',
  },
  botonReiniciar: {
    backgroundColor: '#fffde7',
    paddingVertical: 12,
    paddingHorizontal: 30,
    borderRadius: 25,
    marginTop: 18,
  },
  botonReiniciarTexto: {
    color: '#333',
    fontSize: 18,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  indicadorPregunta: {
    fontSize: 18,
    color: '#757575',
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 6,
  },
  diplomaBtn: {
    backgroundColor: '#212121',
    paddingVertical: 16,
    paddingHorizontal: 38,
    borderRadius: 30,
    alignItems: 'center',
    marginTop: 16,
    marginBottom: 10,
    shadowColor: '#000',
    shadowOpacity: 0.12,
    shadowRadius: 6,
    elevation: 3,
  },
  diplomaBtnTexto: {
    color: '#fff',
    fontSize: 20,
    fontWeight: 'bold',
    textAlign: 'center',
    letterSpacing: 1,
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
  compartirBtn: {
    backgroundColor: '#1976D2',
    padding: 15,
    borderRadius: 10,
    marginTop: 20,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  compartirBtnTexto: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
    marginLeft: 10,
  },
});

export default ExamenScreen;

