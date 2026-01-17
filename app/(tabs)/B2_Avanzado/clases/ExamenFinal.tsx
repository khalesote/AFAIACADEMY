import React, { useEffect, useRef, useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, ScrollView, Animated, Easing, Alert, AppState, Modal } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { Ionicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import { WebView } from 'react-native-webview';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { requestMicrophonePermission } from '../../../../utils/requestMicrophonePermission';
import { useUserProgress } from '@/contexts/UserProgressContext';
import ExamenPresencialForm from '../../../../components/ExamenPresencialForm';

type Pregunta = {
  id: string;
  unidad: string;
  pregunta: string;
  opciones: string[];
  respuestaCorrecta: string;
  correctaIdx?: number;
};

// Banco de preguntas B2: 2 por unidad + 10 gramática
const preguntasBase: Pregunta[] = [
  // Trabajo (2)
  { id: 'trabajo_1', unidad: 'Mundo Laboral Avanzado', pregunta: '¿Qué significa "conciliar la vida laboral y familiar"?', opciones: ['Trabajar desde casa', 'Equilibrar tiempo de trabajo y familia', 'Cambiar de empleo', 'Trabajar en familia'], respuestaCorrecta: 'Equilibrar tiempo de trabajo y familia' },
  { id: 'trabajo_2', unidad: 'Mundo Laboral Avanzado', pregunta: '¿Qué es el "teletrabajo"?', opciones: ['Trabajar por teléfono', 'Trabajar a distancia usando tecnología', 'Trabajar en televisión', 'Trabajar de noche'], respuestaCorrecta: 'Trabajar a distancia usando tecnología' },
  { id: 'trabajo_3', unidad: 'Mundo Laboral Avanzado', pregunta: '¿Qué significa "jornada laboral"?', opciones: ['El salario', 'Las horas de trabajo diarias', 'Las vacaciones', 'El contrato'], respuestaCorrecta: 'Las horas de trabajo diarias' },
  { id: 'trabajo_4', unidad: 'Mundo Laboral Avanzado', pregunta: '¿Qué es un "despido"?', opciones: ['Contratar', 'Terminar el contrato de trabajo', 'Promocionar', 'Ascender'], respuestaCorrecta: 'Terminar el contrato de trabajo' },
  { id: 'trabajo_5', unidad: 'Mundo Laboral Avanzado', pregunta: '¿Qué significa "promoción"?', opciones: ['Subir de puesto', 'Bajar de puesto', 'Dejar el trabajo', 'Cambiar de empresa'], respuestaCorrecta: 'Subir de puesto' },
  { id: 'trabajo_6', unidad: 'Mundo Laboral Avanzado', pregunta: '¿Qué es un "compañero de trabajo"?', opciones: ['El jefe', 'Persona que trabaja contigo', 'El cliente', 'El vecino'], respuestaCorrecta: 'Persona que trabaja contigo' },
  { id: 'trabajo_7', unidad: 'Mundo Laboral Avanzado', pregunta: '¿Qué significa "ambiente laboral"?', opciones: ['El clima', 'El entorno de trabajo', 'La temperatura', 'El horario'], respuestaCorrecta: 'El entorno de trabajo' },
  { id: 'trabajo_8', unidad: 'Mundo Laboral Avanzado', pregunta: '¿Qué es una "jornada partida"?', opciones: ['Trabajar medio día', 'Trabajar con descanso al mediodía', 'Trabajar de noche', 'Trabajar fines de semana'], respuestaCorrecta: 'Trabajar con descanso al mediodía' },
  { id: 'trabajo_9', unidad: 'Mundo Laboral Avanzado', pregunta: '¿Qué significa "motivación laboral"?', opciones: ['Desánimo', 'Impulso para trabajar bien', 'Estrés', 'Cansancio'], respuestaCorrecta: 'Impulso para trabajar bien' },
  // Vivienda (2)
  { id: 'vivienda_1', unidad: 'Mercado Inmobiliario', pregunta: '¿Qué es una "hipoteca"?', opciones: ['Un tipo de casa', 'Un préstamo para comprar vivienda', 'Un contrato de alquiler', 'Una reforma'], respuestaCorrecta: 'Un préstamo para comprar vivienda' },
  { id: 'vivienda_2', unidad: 'Mercado Inmobiliario', pregunta: '¿Qué significa "plusvalía" en el contexto inmobiliario?', opciones: ['Impuesto municipal', 'Aumento del valor de la propiedad', 'Gastos de comunidad', 'Seguro de hogar'], respuestaCorrecta: 'Aumento del valor de la propiedad' },
  { id: 'vivienda_3', unidad: 'Mercado Inmobiliario', pregunta: '¿Qué es un "alquiler"?', opciones: ['Comprar casa', 'Pagar por vivir en una vivienda', 'Vender casa', 'Construir casa'], respuestaCorrecta: 'Pagar por vivir en una vivienda' },
  { id: 'vivienda_4', unidad: 'Mercado Inmobiliario', pregunta: '¿Qué significa "fianza"?', opciones: ['Dinero de garantía', 'Pago mensual', 'Impuesto', 'Seguro'], respuestaCorrecta: 'Dinero de garantía' },
  { id: 'vivienda_5', unidad: 'Mercado Inmobiliario', pregunta: '¿Qué significa "subarrendar" una vivienda?', opciones: ['Vivir gratis', 'Alquilar una vivienda a otra persona', 'Comprar una vivienda', 'Reformar una vivienda'], respuestaCorrecta: 'Alquilar una vivienda a otra persona' },
  { id: 'vivienda_6', unidad: 'Mercado Inmobiliario', pregunta: '¿Qué significa "reforma"?', opciones: ['Comprar', 'Mejorar o arreglar la vivienda', 'Vender', 'Alquilar'], respuestaCorrecta: 'Mejorar o arreglar la vivienda' },
  { id: 'vivienda_7', unidad: 'Mercado Inmobiliario', pregunta: '¿Qué son los "gastos de comunidad"?', opciones: ['Impuestos', 'Gastos compartidos del edificio', 'Alquiler', 'Hipoteca'], respuestaCorrecta: 'Gastos compartidos del edificio' },
  { id: 'vivienda_8', unidad: 'Mercado Inmobiliario', pregunta: '¿Qué significa "amueblado"?', opciones: ['Sin muebles', 'Con muebles incluidos', 'Nuevo', 'Viejo'], respuestaCorrecta: 'Con muebles incluidos' },
  { id: 'vivienda_9', unidad: 'Mercado Inmobiliario', pregunta: '¿Qué es una "garantía" en alquiler?', opciones: ['Seguro', 'Dinero de seguridad', 'Contrato', 'Recibo'], respuestaCorrecta: 'Dinero de seguridad' },
  // Salud (2)
  { id: 'salud_1', unidad: 'Salud Publica y Mental', pregunta: '¿Qué es la "medicina preventiva"?', opciones: ['Curar enfermedades', 'Prevenir enfermedades antes de que aparezcan', 'Medicina alternativa', 'Cirugía'], respuestaCorrecta: 'Prevenir enfermedades antes de que aparezcan' },
  { id: 'salud_2', unidad: 'Salud Publica y Mental', pregunta: '¿Qué significa "síntoma"?', opciones: ['Causa de enfermedad', 'Manifestación de una enfermedad', 'Tratamiento médico', 'Tipo de medicina'], respuestaCorrecta: 'Manifestación de una enfermedad' },
  { id: 'salud_3', unidad: 'Salud Publica y Mental', pregunta: '¿Qué es un "diagnóstico"?', opciones: ['Tratamiento', 'Identificación de una enfermedad', 'Medicina', 'Cirugía'], respuestaCorrecta: 'Identificación de una enfermedad' },
  { id: 'salud_4', unidad: 'Salud Publica y Mental', pregunta: '¿Qué significa "tratamiento"?', opciones: ['Enfermedad', 'Proceso para curar', 'Síntoma', 'Diagnóstico'], respuestaCorrecta: 'Proceso para curar' },
  { id: 'salud_5', unidad: 'Salud Publica y Mental', pregunta: '¿Qué es una "receta médica"?', opciones: ['Documento para comprar medicinas', 'Documento de identidad', 'Contrato', 'Factura'], respuestaCorrecta: 'Documento para comprar medicinas' },
  { id: 'salud_6', unidad: 'Salud Publica y Mental', pregunta: '¿Qué significa "cirugía"?', opciones: ['Medicina oral', 'Operación médica', 'Consulta', 'Análisis'], respuestaCorrecta: 'Operación médica' },
  { id: 'salud_7', unidad: 'Salud Publica y Mental', pregunta: '¿Qué es un "hospital"?', opciones: ['Farmacia', 'Centro médico para tratamientos complejos', 'Clínica pequeña', 'Laboratorio'], respuestaCorrecta: 'Centro médico para tratamientos complejos' },
  { id: 'salud_8', unidad: 'Salud Publica y Mental', pregunta: '¿Qué significa "rehabilitación"?', opciones: ['Enfermarse', 'Recuperación de capacidades', 'Operar', 'Diagnosticar'], respuestaCorrecta: 'Recuperación de capacidades' },
  { id: 'salud_9', unidad: 'Salud Publica y Mental', pregunta: '¿Qué es la "salud mental"?', opciones: ['Salud física', 'Bienestar psicológico y emocional', 'Salud dental', 'Salud visual'], respuestaCorrecta: 'Bienestar psicológico y emocional' },
  // Tecnología (2)
  { id: 'tecnologia_1', unidad: 'Innovacion y Ciberseguridad', pregunta: '¿Qué es la "inteligencia artificial"?', opciones: ['Un tipo de ordenador', 'Tecnología que simula inteligencia humana', 'Internet rápido', 'Programa antivirus'], respuestaCorrecta: 'Tecnología que simula inteligencia humana' },
  { id: 'tecnologia_2', unidad: 'Innovacion y Ciberseguridad', pregunta: '¿Qué significa "ciberseguridad"?', opciones: ['Velocidad de internet', 'Protección contra amenazas digitales', 'Tipo de software', 'Red social'], respuestaCorrecta: 'Protección contra amenazas digitales' },
  { id: 'tecnologia_3', unidad: 'Innovacion y Ciberseguridad', pregunta: '¿Qué es un "algoritmo"?', opciones: ['Un programa', 'Conjunto de pasos para resolver un problema', 'Un virus', 'Una aplicación'], respuestaCorrecta: 'Conjunto de pasos para resolver un problema' },
  { id: 'tecnologia_4', unidad: 'Innovacion y Ciberseguridad', pregunta: '¿Qué significa "big data"?', opciones: ['Datos pequeños', 'Grandes volúmenes de datos', 'Internet lento', 'Software antiguo'], respuestaCorrecta: 'Grandes volúmenes de datos' },
  { id: 'tecnologia_5', unidad: 'Innovacion y Ciberseguridad', pregunta: '¿Qué es la "nube" en tecnología?', opciones: ['El cielo', 'Almacenamiento en servidores remotos', 'Un disco duro', 'Una aplicación'], respuestaCorrecta: 'Almacenamiento en servidores remotos' },
  { id: 'tecnologia_6', unidad: 'Innovacion y Ciberseguridad', pregunta: '¿Qué significa "hacker"?', opciones: ['Programador experto', 'Persona que accede ilegalmente a sistemas', 'Usuario normal', 'Técnico'], respuestaCorrecta: 'Persona que accede ilegalmente a sistemas' },
  { id: 'tecnologia_7', unidad: 'Innovacion y Ciberseguridad', pregunta: '¿Qué es un "virus informático"?', opciones: ['Programa útil', 'Programa malicioso que daña sistemas', 'Antivirus', 'Sistema operativo'], respuestaCorrecta: 'Programa malicioso que daña sistemas' },
  { id: 'tecnologia_8', unidad: 'Innovacion y Ciberseguridad', pregunta: '¿Qué significa "actualizar"?', opciones: ['Borrar', 'Mejorar o renovar software', 'Comprar nuevo', 'Eliminar'], respuestaCorrecta: 'Mejorar o renovar software' },
  { id: 'tecnologia_9', unidad: 'Innovacion y Ciberseguridad', pregunta: '¿Qué es la "realidad virtual"?', opciones: ['Mundo real', 'Entorno simulado por ordenador', 'Televisión', 'Radio'], respuestaCorrecta: 'Entorno simulado por ordenador' },
  // Educación (2)
  { id: 'educacion_1', unidad: 'Educacion Superior', pregunta: '¿Qué es la "educación a distancia"?', opciones: ['Estudiar en otro país', 'Aprender sin estar físicamente presente', 'Educación cara', 'Estudiar idiomas'], respuestaCorrecta: 'Aprender sin estar físicamente presente' },
  { id: 'educacion_2', unidad: 'Educacion Superior', pregunta: '¿Qué significa "formación continua"?', opciones: ['Estudiar sin parar', 'Actualizar conocimientos a lo largo de la vida', 'Educación obligatoria', 'Estudios universitarios'], respuestaCorrecta: 'Actualizar conocimientos a lo largo de la vida' },
  { id: 'educacion_3', unidad: 'Educacion Superior', pregunta: '¿Qué es una "universidad"?', opciones: ['Escuela primaria', 'Institución de educación superior', 'Guardería', 'Academia'], respuestaCorrecta: 'Institución de educación superior' },
  { id: 'educacion_4', unidad: 'Educacion Superior', pregunta: '¿Qué significa "grado universitario"?', opciones: ['Diploma de secundaria', 'Título universitario de primer ciclo', 'Máster', 'Doctorado'], respuestaCorrecta: 'Título universitario de primer ciclo' },
  { id: 'educacion_5', unidad: 'Educacion Superior', pregunta: '¿Qué es un "máster"?', opciones: ['Grado', 'Estudios de posgrado', 'Bachillerato', 'Primaria'], respuestaCorrecta: 'Estudios de posgrado' },
  { id: 'educacion_6', unidad: 'Educacion Superior', pregunta: '¿Qué significa "beca"?', opciones: ['Préstamo', 'Ayuda económica para estudiar', 'Trabajo', 'Examen'], respuestaCorrecta: 'Ayuda económica para estudiar' },
  { id: 'educacion_7', unidad: 'Educacion Superior', pregunta: '¿Qué es un "profesor"?', opciones: ['Estudiante', 'Persona que enseña', 'Director', 'Secretario'], respuestaCorrecta: 'Persona que enseña' },
  { id: 'educacion_8', unidad: 'Educacion Superior', pregunta: '¿Qué significa "investigación"?', opciones: ['Estudiar', 'Búsqueda sistemática de conocimiento', 'Leer', 'Memorizar'], respuestaCorrecta: 'Búsqueda sistemática de conocimiento' },
  { id: 'educacion_9', unidad: 'Educacion Superior', pregunta: '¿Qué es una "tesis"?', opciones: ['Examen', 'Trabajo de investigación para obtener título', 'Tarea', 'Práctica'], respuestaCorrecta: 'Trabajo de investigación para obtener título' },
  // Medio Ambiente (2)
  { id: 'medioambiente_1', unidad: 'Sostenibilidad y Clima', pregunta: '¿Qué es la "sostenibilidad"?', opciones: ['Usar recursos sin comprometer el futuro', 'Reciclar papel', 'Plantar árboles', 'Ahorrar dinero'], respuestaCorrecta: 'Usar recursos sin comprometer el futuro' },
  { id: 'medioambiente_2', unidad: 'Sostenibilidad y Clima', pregunta: '¿Qué significa "huella de carbono"?', opciones: ['Pisada en el suelo', 'Cantidad de CO2 que genera una actividad', 'Tipo de combustible', 'Marca de zapato'], respuestaCorrecta: 'Cantidad de CO2 que genera una actividad' },
  { id: 'medioambiente_3', unidad: 'Sostenibilidad y Clima', pregunta: '¿Qué es el "cambio climático"?', opciones: ['Cambio de estación', 'Alteración del clima global', 'Cambio de temperatura diario', 'Cambio de viento'], respuestaCorrecta: 'Alteración del clima global' },
  { id: 'medioambiente_4', unidad: 'Sostenibilidad y Clima', pregunta: '¿Qué es la "economía circular"?', opciones: ['Modelo de usar y tirar', 'Modelo que reduce, reutiliza y recicla', 'Comprar más productos', 'Producir sin límites'], respuestaCorrecta: 'Modelo que reduce, reutiliza y recicla' },
  { id: 'medioambiente_5', unidad: 'Sostenibilidad y Clima', pregunta: '¿Qué es la "contaminación"?', opciones: ['Limpieza', 'Daño al medio ambiente', 'Protección', 'Conservación'], respuestaCorrecta: 'Daño al medio ambiente' },
  { id: 'medioambiente_6', unidad: 'Sostenibilidad y Clima', pregunta: '¿Qué es la "huella de carbono"?', opciones: ['Cantidad de emisiones de CO2 de una actividad', 'Energía del sol', 'Impuesto municipal', 'Consumo de agua'], respuestaCorrecta: 'Cantidad de emisiones de CO2 de una actividad' },
  { id: 'medioambiente_7', unidad: 'Sostenibilidad y Clima', pregunta: '¿Qué es la "biodiversidad"?', opciones: ['Pocas especies', 'Variedad de especies vivas', 'Una especie', 'Extinción'], respuestaCorrecta: 'Variedad de especies vivas' },
  { id: 'medioambiente_8', unidad: 'Sostenibilidad y Clima', pregunta: '¿Qué significa "conservación"?', opciones: ['Destruir', 'Proteger y mantener', 'Desperdiciar', 'Contaminar'], respuestaCorrecta: 'Proteger y mantener' },
  { id: 'medioambiente_9', unidad: 'Sostenibilidad y Clima', pregunta: '¿Qué es la "deforestación"?', opciones: ['Plantar árboles', 'Tala excesiva de bosques', 'Cuidar bosques', 'Proteger árboles'], respuestaCorrecta: 'Tala excesiva de bosques' },
  // Economía (2)
  { id: 'economia_1', unidad: 'Economia y Consumo', pregunta: '¿Qué es la "inflación"?', opciones: ['Aumento general de precios', 'Bajada de salarios', 'Tipo de moneda', 'Crisis económica'], respuestaCorrecta: 'Aumento general de precios' },
  { id: 'economia_2', unidad: 'Economia y Consumo', pregunta: '¿Qué significa "PIB"?', opciones: ['Producto Interior Bruto', 'Precio Inicial Base', 'Programa de Inversión', 'Plan de Incentivos'], respuestaCorrecta: 'Producto Interior Bruto' },
  { id: 'economia_3', unidad: 'Economia y Consumo', pregunta: '¿Qué es el "desempleo"?', opciones: ['Tener trabajo', 'Falta de trabajo', 'Trabajar mucho', 'Trabajar poco'], respuestaCorrecta: 'Falta de trabajo' },
  { id: 'economia_4', unidad: 'Economia y Consumo', pregunta: '¿Qué significa "crisis económica"?', opciones: ['Buen momento económico', 'Período de dificultades económicas', 'Crecimiento', 'Estabilidad'], respuestaCorrecta: 'Período de dificultades económicas' },
  { id: 'economia_5', unidad: 'Economia y Consumo', pregunta: '¿Qué es un "presupuesto"?', opciones: ['Gasto ilimitado', 'Plan de ingresos y gastos', 'Deuda', 'Ahorro'], respuestaCorrecta: 'Plan de ingresos y gastos' },
  { id: 'economia_6', unidad: 'Economia y Consumo', pregunta: '¿Qué significa "ahorro"?', opciones: ['Gastar', 'Guardar dinero', 'Pedir prestado', 'Invertir todo'], respuestaCorrecta: 'Guardar dinero' },
  { id: 'economia_7', unidad: 'Economia y Consumo', pregunta: '¿Qué es una "inversión"?', opciones: ['Gasto', 'Colocar dinero para obtener beneficios', 'Pérdida', 'Deuda'], respuestaCorrecta: 'Colocar dinero para obtener beneficios' },
  { id: 'economia_8', unidad: 'Economia y Consumo', pregunta: '¿Qué significa "salario mínimo"?', opciones: ['Salario máximo', 'Salario legal mínimo permitido', 'Salario medio', 'Sin salario'], respuestaCorrecta: 'Salario legal mínimo permitido' },
  { id: 'economia_9', unidad: 'Economia y Consumo', pregunta: '¿Qué es el "mercado laboral"?', opciones: ['Supermercado', 'Oferta y demanda de trabajo', 'Tienda', 'Banco'], respuestaCorrecta: 'Oferta y demanda de trabajo' },
  // Política (2)
  { id: 'politica_1', unidad: 'Instituciones Democraticas', pregunta: '¿Qué es la "democracia"?', opciones: ['Gobierno del pueblo', 'Gobierno de los ricos', 'Gobierno militar', 'Gobierno religioso'], respuestaCorrecta: 'Gobierno del pueblo' },
  { id: 'politica_2', unidad: 'Instituciones Democraticas', pregunta: '¿Qué significa "sufragio universal"?', opciones: ['Voto obligatorio', 'Derecho a votar de todos los ciudadanos', 'Voto secreto', 'Elecciones cada 4 años'], respuestaCorrecta: 'Derecho a votar de todos los ciudadanos' },
  { id: 'politica_3', unidad: 'Instituciones Democraticas', pregunta: '¿Qué es un "gobierno"?', opciones: ['Partido político', 'Conjunto de personas que dirigen un país', 'Elección', 'Voto'], respuestaCorrecta: 'Conjunto de personas que dirigen un país' },
  { id: 'politica_4', unidad: 'Instituciones Democraticas', pregunta: '¿Qué significa "parlamento"?', opciones: ['Gobierno', 'Órgano legislativo', 'Tribunal', 'Ejército'], respuestaCorrecta: 'Órgano legislativo' },
  { id: 'politica_5', unidad: 'Instituciones Democraticas', pregunta: '¿Qué es un "partido político"?', opciones: ['Fiesta', 'Organización con ideas políticas', 'Gobierno', 'Elección'], respuestaCorrecta: 'Organización con ideas políticas' },
  { id: 'politica_6', unidad: 'Instituciones Democraticas', pregunta: '¿Qué significa "elecciones"?', opciones: ['Gobierno', 'Proceso de votación para elegir representantes', 'Ley', 'Constitución'], respuestaCorrecta: 'Proceso de votación para elegir representantes' },
  { id: 'politica_7', unidad: 'Instituciones Democraticas', pregunta: '¿Qué es la "constitución"?', opciones: ['Ley específica', 'Ley fundamental de un país', 'Reglamento', 'Norma'], respuestaCorrecta: 'Ley fundamental de un país' },
  { id: 'politica_8', unidad: 'Instituciones Democraticas', pregunta: '¿Qué significa "derechos humanos"?', opciones: ['Derechos de algunos', 'Derechos fundamentales de todas las personas', 'Derechos políticos', 'Derechos económicos'], respuestaCorrecta: 'Derechos fundamentales de todas las personas' },
  { id: 'politica_9', unidad: 'Instituciones Democraticas', pregunta: '¿Qué es la "justicia"?', opciones: ['Injusticia', 'Aplicación de la ley de forma equitativa', 'Corrupción', 'Abuso'], respuestaCorrecta: 'Aplicación de la ley de forma equitativa' },
  // Cultura (2)
  { id: 'cultura_1', unidad: 'Cultura y Arte', pregunta: '¿Qué es el "patrimonio cultural"?', opciones: ['Dinero de la cultura', 'Bienes culturales heredados', 'Museos modernos', 'Arte contemporáneo'], respuestaCorrecta: 'Bienes culturales heredados' },
  { id: 'cultura_2', unidad: 'Cultura y Arte', pregunta: '¿Qué significa "diversidad cultural"?', opciones: ['Muchos idiomas', 'Coexistencia de diferentes culturas', 'Turismo cultural', 'Festivales'], respuestaCorrecta: 'Coexistencia de diferentes culturas' },
  { id: 'cultura_3', unidad: 'Cultura y Arte', pregunta: '¿Qué es un "museo"?', opciones: ['Tienda', 'Lugar donde se exhiben obras y objetos', 'Restaurante', 'Teatro'], respuestaCorrecta: 'Lugar donde se exhiben obras y objetos' },
  { id: 'cultura_4', unidad: 'Cultura y Arte', pregunta: '¿Qué significa "tradición"?', opciones: ['Innovación', 'Costumbre transmitida de generación en generación', 'Moda', 'Tendencia'], respuestaCorrecta: 'Costumbre transmitida de generación en generación' },
  { id: 'cultura_5', unidad: 'Cultura y Arte', pregunta: '¿Qué es un "festival"?', opciones: ['Museo', 'Evento cultural o artístico', 'Teatro', 'Biblioteca'], respuestaCorrecta: 'Evento cultural o artístico' },
  { id: 'cultura_6', unidad: 'Cultura y Arte', pregunta: '¿Qué caracteriza al "realismo mágico"?', opciones: ['Relatos con elementos fantásticos en lo cotidiano', 'Solo hechos históricos', 'Textos científicos', 'Poesía clásica exclusivamente'], respuestaCorrecta: 'Relatos con elementos fantásticos en lo cotidiano' },
  { id: 'cultura_7', unidad: 'Cultura y Arte', pregunta: '¿Qué es el "arte"?', opciones: ['Ciencia', 'Expresión creativa humana', 'Tecnología', 'Deporte'], respuestaCorrecta: 'Expresión creativa humana' },
  { id: 'cultura_8', unidad: 'Cultura y Arte', pregunta: '¿Qué significa "folclore"?', opciones: ['Arte moderno', 'Tradiciones populares', 'Cultura urbana', 'Tecnología'], respuestaCorrecta: 'Tradiciones populares' },
  { id: 'cultura_9', unidad: 'Cultura y Arte', pregunta: '¿Qué es una "exposición"?', opciones: ['Película', 'Muestra de arte u objetos', 'Concierto', 'Libro'], respuestaCorrecta: 'Muestra de arte u objetos' },
  // Ciencia (2)
  { id: 'ciencia_1', unidad: 'Ciencia e Investigacion', pregunta: '¿Qué es la "biotecnología"?', opciones: ['Estudio de la vida', 'Tecnología aplicada a seres vivos', 'Medicina natural', 'Agricultura'], respuestaCorrecta: 'Tecnología aplicada a seres vivos' },
  { id: 'ciencia_2', unidad: 'Ciencia e Investigacion', pregunta: '¿Qué significa "investigación científica"?', opciones: ['Leer libros', 'Proceso sistemático para obtener conocimiento', 'Experimentos peligrosos', 'Estudiar en universidad'], respuestaCorrecta: 'Proceso sistemático para obtener conocimiento' },
  { id: 'ciencia_3', unidad: 'Ciencia e Investigacion', pregunta: '¿Qué es un "experimento"?', opciones: ['Teoría', 'Prueba controlada para verificar hipótesis', 'Observación', 'Conclusión'], respuestaCorrecta: 'Prueba controlada para verificar hipótesis' },
  { id: 'ciencia_4', unidad: 'Ciencia e Investigacion', pregunta: '¿Qué significa "hipótesis"?', opciones: ['Hecho probado', 'Suposición a verificar', 'Ley científica', 'Teoría confirmada'], respuestaCorrecta: 'Suposición a verificar' },
  { id: 'ciencia_5', unidad: 'Ciencia e Investigacion', pregunta: '¿Qué es una "teoría científica"?', opciones: ['Opinión', 'Explicación fundamentada de fenómenos', 'Creencia', 'Suposición'], respuestaCorrecta: 'Explicación fundamentada de fenómenos' },
  { id: 'ciencia_6', unidad: 'Ciencia e Investigacion', pregunta: '¿Qué significa "innovación"?', opciones: ['Repetir', 'Crear algo nuevo o mejorar', 'Copiar', 'Destruir'], respuestaCorrecta: 'Crear algo nuevo o mejorar' },
  { id: 'ciencia_7', unidad: 'Ciencia e Investigacion', pregunta: '¿Qué es un "descubrimiento"?', opciones: ['Invención', 'Hallazgo de algo que ya existía', 'Creación', 'Diseño'], respuestaCorrecta: 'Hallazgo de algo que ya existía' },
  { id: 'ciencia_8', unidad: 'Ciencia e Investigacion', pregunta: '¿Qué significa "tecnología"?', opciones: ['Ciencia pura', 'Aplicación práctica del conocimiento científico', 'Arte', 'Literatura'], respuestaCorrecta: 'Aplicación práctica del conocimiento científico' },
  { id: 'ciencia_9', unidad: 'Ciencia e Investigacion', pregunta: '¿Qué es un "laboratorio"?', opciones: ['Oficina', 'Lugar para experimentos científicos', 'Aula', 'Biblioteca'], respuestaCorrecta: 'Lugar para experimentos científicos' },
  // Gramática (10)
  { id: 'gramatica_1', unidad: 'Gramática', pregunta: 'Subjuntivo en oraciones sustantivas: Es probable que ___ (llover) mañana.', opciones: ['llueve', 'llueva', 'llovió', 'lloverá'], respuestaCorrecta: 'llueva' },
  { id: 'gramatica_2', unidad: 'Gramática', pregunta: 'Subjuntivo imperfecto: Si ___ (tener) más tiempo, estudiaría más.', opciones: ['tengo', 'tuve', 'tuviera', 'tendré'], respuestaCorrecta: 'tuviera' },
  { id: 'gramatica_3', unidad: 'Gramática', pregunta: 'Condicional compuesto: Si hubieras venido, ___ (conocer) a mi familia.', opciones: ['conociste', 'conocerías', 'habrías conocido', 'conocías'], respuestaCorrecta: 'habrías conocido' },
  { id: 'gramatica_4', unidad: 'Gramática', pregunta: 'Subjuntivo pluscuamperfecto: Me alegré de que ___ (terminar) el proyecto.', opciones: ['terminó', 'hubiera terminado', 'terminara', 'había terminado'], respuestaCorrecta: 'hubiera terminado' },
  { id: 'gramatica_5', unidad: 'Gramática', pregunta: 'Estilo indirecto: Juan dijo: "Vendré mañana" → Juan dijo que ___ al día siguiente.', opciones: ['vendrá', 'vendría', 'viene', 'vino'], respuestaCorrecta: 'vendría' },
  { id: 'gramatica_6', unidad: 'Gramática', pregunta: 'Oraciones concesivas: ___ llueva, iremos al parque.', opciones: ['Aunque', 'Porque', 'Si', 'Cuando'], respuestaCorrecta: 'Aunque' },
  { id: 'gramatica_7', unidad: 'Gramática', pregunta: 'Perífrasis de probabilidad: ___ las cinco cuando llegó.', opciones: ['Eran', 'Serían', 'Fueron', 'Son'], respuestaCorrecta: 'Serían' },
  { id: 'gramatica_8', unidad: 'Gramática', pregunta: 'Oraciones finales: Estudia mucho ___ aprobar el examen.', opciones: ['para', 'por', 'de', 'con'], respuestaCorrecta: 'para' },
  { id: 'gramatica_9', unidad: 'Gramática', pregunta: 'Subjuntivo en oraciones temporales: Cuando ___ (llegar) a casa, cenamos.', opciones: ['llego', 'llegue', 'llegué', 'llegaré'], respuestaCorrecta: 'llegue' },
  { id: 'gramatica_10', unidad: 'Gramática', pregunta: 'Voz pasiva refleja: ___ venden casas en esta zona.', opciones: ['Se', 'Te', 'Me', 'Le'], respuestaCorrecta: 'Se' },
  { id: 'gramatica_11', unidad: 'Gramática', pregunta: 'Subjuntivo con expresiones de deseo: Ojalá ___ (llover) mañana.', opciones: ['llueve', 'llueva', 'llovió', 'lloverá'], respuestaCorrecta: 'llueva' },
  { id: 'gramatica_12', unidad: 'Gramática', pregunta: 'Condicional de cortesía: ¿___ ayudarme, por favor?', opciones: ['puedes', 'podrías', 'pudiste', 'podías'], respuestaCorrecta: 'podrías' },
  { id: 'gramatica_13', unidad: 'Gramática', pregunta: 'Pluscuamperfecto: Cuando llegué, ya ___ (empezar) la reunión.', opciones: ['empezó', 'había empezado', 'ha empezado', 'empezaba'], respuestaCorrecta: 'había empezado' },
  { id: 'gramatica_14', unidad: 'Gramática', pregunta: 'Subjuntivo con emociones: Me sorprende que ___ (venir).', opciones: ['vienes', 'vengas', 'viniste', 'vendrás'], respuestaCorrecta: 'vengas' },
  { id: 'gramatica_15', unidad: 'Gramática', pregunta: 'Estilo indirecto: Ella dijo: "Estoy cansada" → Ella dijo que ___ cansada.', opciones: ['está', 'estaba', 'estaría', 'estuvo'], respuestaCorrecta: 'estaba' },
  { id: 'gramatica_16', unidad: 'Gramática', pregunta: 'Oraciones concesivas: ___ estudies mucho, no aprobarás.', opciones: ['Aunque', 'Porque', 'Si', 'Cuando'], respuestaCorrecta: 'Aunque' },
  { id: 'gramatica_17', unidad: 'Gramática', pregunta: 'Perífrasis: Acabo de ___.', opciones: ['llegar', 'llegado', 'llegando', 'llegué'], respuestaCorrecta: 'llegar' },
  { id: 'gramatica_18', unidad: 'Gramática', pregunta: 'Subjuntivo con dudas: Dudo que ___ (ser) verdad.', opciones: ['es', 'sea', 'será', 'ha sido'], respuestaCorrecta: 'sea' },
  { id: 'gramatica_19', unidad: 'Gramática', pregunta: 'Condicional compuesto: Si hubieras estudiado, ___ (aprobar).', opciones: ['aprobaste', 'aprobarías', 'habrías aprobado', 'has aprobado'], respuestaCorrecta: 'habrías aprobado' },
  { id: 'gramatica_20', unidad: 'Gramática', pregunta: 'Oraciones finales: Vengo ___ hablar contigo.', opciones: ['para', 'por', 'de', 'con'], respuestaCorrecta: 'para' },
];

const EXAM_LIMIT = 30;
const MIN_GRAMMAR = 10;
const REQUIRED_CORRECT = Math.ceil(EXAM_LIMIT * 0.7); // 70% de aciertos

const barajar = <T,>(arr: T[]) => arr.slice().sort(() => Math.random() - 0.5);

const normalizeStr = (s: string) => (s || '')
  .toLowerCase()
  .normalize('NFD')
  .replace(/[\u0300-\u036f]/g, '')
  .replace(/[^a-z0-9áéíóúüñ\s]/gi, ' ')
  .replace(/\s+/g, ' ')
  .trim();

function dedupQuestions(bank: Pregunta[]): Pregunta[] {
  const seen = new Set<string>();
  const out: Pregunta[] = [];
  for (const q of bank) {
    const optsKey = q.opciones.map(o => normalizeStr(o)).sort().join('|');
    const key = `${normalizeStr(q.pregunta)}__${optsKey}`;
    if (!seen.has(key)) {
      seen.add(key);
      out.push(q);
    }
  }
  return out;
}

function estratificado(bank: Pregunta[], limit: number): Pregunta[] {
  bank = dedupQuestions(bank);
  const grammar = bank.filter(q => q.unidad === 'Gramática');
  const units = bank.filter(q => q.unidad !== 'Gramática');

  const porUnidad = new Map<string, Pregunta[]>();
  units.forEach((q) => {
    if (!porUnidad.has(q.unidad)) porUnidad.set(q.unidad, []);
    porUnidad.get(q.unidad)!.push(q);
  });

  const seleccion: Pregunta[] = [];
  for (const [unidad, arr] of porUnidad.entries()) {
    const picks = barajar(arr).slice(0, 2);
    for (const q of picks) {
      if (seleccion.length >= limit) break;
      seleccion.push(q);
    }
    if (seleccion.length >= limit) break;
  }

  const yaGrammar = seleccion.filter(q => q.unidad === 'Gramática').length;
  const neededGrammar = Math.max(0, MIN_GRAMMAR - yaGrammar);
  if (neededGrammar > 0) {
    const gPool = barajar(grammar);
    for (const q of gPool) {
      if (seleccion.length >= limit) break;
      if (seleccion.filter(x => x.unidad === 'Gramática').length >= MIN_GRAMMAR) break;
      if (!seleccion.find(x => x.id === q.id)) seleccion.push(q);
    }
  }

  if (seleccion.length < limit) {
    const usados = new Set(seleccion.map(q => q.id));
    const resto = bank.filter(q => !usados.has(q.id));
    const pool = barajar(resto);
    for (const q of pool) {
      if (seleccion.length >= limit) break;
      seleccion.push(q);
    }
  }

  const únicos: Pregunta[] = [];
  const seenQ = new Set<string>();
  for (const q of barajar(seleccion)) {
    const optsKey = q.opciones.map(o => normalizeStr(o)).sort().join('|');
    const k = `${normalizeStr(q.pregunta)}__${optsKey}`;
    if (!seenQ.has(k)) {
      únicos.push(q);
      seenQ.add(k);
    }
    if (únicos.length >= limit) break;
  }

  return únicos;
}

// Gate oral B2: párrafos complejos para lectura
const oralGatePrompts: string[] = [
  'Un periodista recorrió los barrios históricos para entrevistar a los vecinos sobre los cambios urbanísticos.',
  'Los trenes de alta velocidad han conectado regiones, pero los pueblos pequeños necesitan más inversiones.',
  'Voluntarios enseñan a personas mayores a usar videollamadas para comunicarse con familiares emigrados.',
  'Una cooperativa agrícola apostó por el cultivo ecológico y la venta directa a clientes conscientes.',
  'Un club de lectura reúne mensualmente a personas de distintas edades para debatir novelas contemporáneas.'
];

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
      <h3>Lectura en voz alta B2 (Reconocimiento web)</h3>
      <div class="prompt">
        <div style="font-weight:600; color:#ff9800; margin-bottom:6px;">Texto a leer</div>
        <div id="target">${(promptText || '').replace(/</g,'&lt;')}</div>
      </div>
      <button class="btn start" id="start">Hablar</button>
      <button class="btn stop" id="stop">Detener</button>
      <div class="box"><div id="status">Listo</div><div id="out" style="margin-top:8px"></div></div>
      <div style="text-align:center; margin-top:12px;"><div id="pct" style="font-size:56px; font-weight:bold; color:#1976d2;">0%</div></div>
      <script>
        (function(){
          const RN = window.ReactNativeWebView;
          const SR = window.SpeechRecognition || window.webkitSpeechRecognition;
          let rec = null;
          const status = document.getElementById('status');
          const out = document.getElementById('out');
          const pctEl = document.getElementById('pct');
          const norm = (s) => (s||'').toLowerCase().normalize('NFC').replace(/[^a-záéíóúüñ\\s]/g,'').trim();
          const target = norm(${JSON.stringify(''+(typeof promptText==='string'?promptText:''))});
          function scoreSimilarity(user, model){
            const u = norm(user).split(/\\s+/).filter(Boolean);
            const m = norm(model).split(/\\s+/).filter(Boolean);
            if (m.length === 0) return 0;
            const setU = new Set(u); let hits = 0; for (const w of m) if (setU.has(w)) hits++;
            return Math.min(100, Math.round((hits / m.length) * 100));
          }
          function send(type, payload){ try { RN.postMessage(JSON.stringify({ type, payload })); } catch(e) {} }
          if (!SR) { status.textContent = 'Web Speech no disponible'; send('error','no-sr'); }
          else {
            rec = new SR(); rec.lang='es-ES'; rec.interimResults=true; rec.maxAlternatives=1;
            rec.onstart=()=>{ status.textContent='Grabando...'; send('status','start'); };
            rec.onend=()=>{ status.textContent='Detenido'; send('status','end'); };
            rec.onerror=(e)=>{ status.textContent='Error: '+(e.error||''); send('error',e.error||'error'); };
            rec.onresult=(e)=>{ let txt=''; for(let i=e.resultIndex;i<e.results.length;i++){ txt += e.results[i][0].transcript+' '; }
              out.textContent=txt.trim(); const p=scoreSimilarity(txt.trim(), target); 
              pctEl.style.color = p >= 85 ? '#4caf50' : p >= 70 ? '#ff9800' : '#f44336';
              pctEl.textContent=p+'%'; send('result',{ text: txt.trim(), percent: p }); };
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
  const { progress: userProgress, markOralPassed, markWrittenPassed } = useUserProgress();
  const levelProgress = userProgress.B2;
  const oralPassedFromContext = levelProgress?.oralPassed ?? false;
  const writtenPassedFromContext = levelProgress?.writtenPassed ?? false;

  // Examen B2 siempre accesible (sin guard de unidades completadas)
  const [iniciado, setIniciado] = useState(false);
  const [terminado, setTerminado] = useState(false);
  const [examStopped, setExamStopped] = useState(false);
  const [preguntaActual, setPreguntaActual] = useState(0);
  const [preguntas, setPreguntas] = useState<Pregunta[]>([]);
  const [seleccion, setSeleccion] = useState<(number | null)[]>([]);
  const [mostrarCorreccion, setMostrarCorreccion] = useState(false);
  const [tiempo, setTiempo] = useState(15);
  const progressAnim = useRef(new Animated.Value(0)).current;
  const timerRef = useRef<NodeJS.Timeout | null>(null);
  const appStateRef = useRef(AppState.currentState);

  // ===== ORAL EXAM (B2) - Independent =====
  const [oralGatePassed, setOralGatePassed] = useState(oralPassedFromContext);
  const [webMode, setWebMode] = useState(false);
  const [oralGateIndex, setOralGateIndex] = useState(0);
  const [oralGateScores, setOralGateScores] = useState<number[]>([0,0,0,0,0]);
  const [webPromptText, setWebPromptText] = useState('');
  const [webPercent, setWebPercent] = useState<number | null>(null);

  useEffect(() => {
    if (oralPassedFromContext) {
      setOralGatePassed(true);
    }
  }, [oralPassedFromContext]);

  useEffect(() => {
    const passedCount = oralGateScores.filter((v: number) => v >= 85).length;
    if (passedCount >= 3) {
      setOralGatePassed(true);
    }
  }, [oralGateScores]);

  const handleStartOral = async () => {
    try {
      const granted = await requestMicrophonePermission();
      if (!granted) {
        Alert.alert('Permiso requerido', 'Concede acceso al micrófono para realizar el Examen Oral.');
        return;
      }
      setOralGateIndex(0);
      setOralGateScores([0,0,0,0,0]);
      setWebPercent(null);
      setWebPromptText(oralGatePrompts[0]);
      setWebMode(true);
      Alert.alert('Examen Oral', 'Se abrió el Examen Oral. Si no ves el modal, recarga la pantalla.');
    } catch (e) { Alert.alert('Micrófono', 'No se pudo iniciar el reconocimiento.'); }
  };

  const handleOralNext = async () => {
    const score = typeof webPercent === 'number' ? Math.round(webPercent) : 0;
    setOralGateScores((prev: number[]) => { const arr=[...prev]; arr[oralGateIndex]=score; return arr; });
    const filled = oralGateScores.map((v: number, i: number)=> (i===oralGateIndex ? score : v));
    if (oralGateIndex < oralGatePrompts.length - 1) {
      const next = oralGateIndex + 1; setOralGateIndex(next); setWebPromptText(oralGatePrompts[next]); setWebPercent(null);
    } else {
      const passedCount = filled.filter((v: number) => v >= 85).length;
      const passed = passedCount >= 3;
      setOralGatePassed(passed);
      if (passed) {
        markOralPassed('B2');
      }
      setWebMode(false);
      Alert.alert(
        passed ? 'Examen oral completado' : 'Examen oral completado',
        `Lecturas con 85%+: ${passedCount}/5. ${passed ? '¡Buen trabajo!' : 'Puedes repetir cuando quieras.'}`
      );
    }
  };

  useEffect(() => {
    const loadQuestions = async () => {
      try {
        const base = dedupQuestions(preguntasBase);
        
        // Obtener IDs de preguntas usadas en el intento anterior (si falló)
        const usedIdsStr = await AsyncStorage.getItem('B2_examen_preguntas_usadas');
        let usedIds: string[] = [];
        if (usedIdsStr) {
          try {
            usedIds = JSON.parse(usedIdsStr);
          } catch (e) {
            console.error('Error parseando IDs usados:', e);
          }
        }

        // Filtrar preguntas usadas
        const availableQuestions = base.filter(q => !usedIds.includes(q.id));
        
        // Si no hay suficientes preguntas disponibles, resetear (usar todas)
        const questionsToUse = availableQuestions.length >= EXAM_LIMIT
          ? availableQuestions
          : base;

        // Seleccionar preguntas usando estratificación
        const seleccionadas = estratificado(questionsToUse, EXAM_LIMIT)
          .map((p) => {
            const ops = barajar(p.opciones);
            return { ...p, opciones: ops, correctaIdx: ops.findIndex(o => normalizar(o) === normalizar(p.respuestaCorrecta)) } as Pregunta;
          });

        // Guardar los IDs seleccionados para este intento
        const selectedIds = seleccionadas.map(q => q.id);
        await AsyncStorage.setItem('B2_examen_preguntas_actuales', JSON.stringify(selectedIds));

        setPreguntas(seleccionadas);
        setSeleccion(Array(seleccionadas.length).fill(null));
      } catch (err) {
        console.error('Error cargando preguntas B2:', err);
        // Fallback
        const base = dedupQuestions(preguntasBase);
        const seleccionadas = estratificado(base, EXAM_LIMIT)
          .map((p) => {
            const ops = barajar(p.opciones);
            return { ...p, opciones: ops, correctaIdx: ops.findIndex(o => normalizar(o) === normalizar(p.respuestaCorrecta)) } as Pregunta;
          });
        setPreguntas(seleccionadas);
        setSeleccion(Array(seleccionadas.length).fill(null));
      }
    };

    loadQuestions();
  }, []);

  useEffect(() => {
    if (!iniciado || terminado || mostrarCorreccion) return;
    timerRef.current = setInterval(() => {
      setTiempo((t) => {
        if (t <= 1) {
          avanzar();
          return 15;
        }
        return t - 1;
      });
    }, 1000);
    Animated.timing(progressAnim, { toValue: 1, duration: 15000, easing: Easing.linear, useNativeDriver: false }).start();
    return () => { if (timerRef.current) clearInterval(timerRef.current); };
  }, [iniciado, terminado, mostrarCorreccion, preguntaActual]);

  useEffect(() => {
    const sub = AppState.addEventListener('change', (nextState) => {
      appStateRef.current = nextState;
      if ((nextState === 'background' || nextState === 'inactive') && iniciado && !terminado) {
        reiniciar();
        setIniciado(false);
        Alert.alert('Examen reiniciado', 'Saliste de la app durante el examen. Debes comenzar de nuevo.');
      }
    });
    return () => {
      try { sub.remove(); } catch {}
    };
  }, [iniciado, terminado]);

  const normalizar = (s: string) => (s || '').trim().toLowerCase().normalize('NFC');

  const empezar = () => {
    if (!oralGatePassed) {
      Alert.alert(
        'Examen oral pendiente',
        'Primero completa el examen oral (3 de 5 lecturas con 85% o más) para desbloquear el examen escrito.',
        [{ text: 'Entendido' }]
      );
      return;
    }
    setIniciado(true);
    setExamStopped(false);
    setPreguntaActual(0);
    setTiempo(15);
    progressAnim.setValue(0);
  };

  const seleccionarOpcion = (idx: number) => {
    if (mostrarCorreccion) return;
    const nuevas = [...seleccion];
    nuevas[preguntaActual] = idx;
    setSeleccion(nuevas);
    setMostrarCorreccion(true);
    if (timerRef.current) clearInterval(timerRef.current);
    setTimeout(() => avanzar(), 900);
  };

  const avanzar = () => {
    if (preguntaActual < preguntas.length - 1) {
      setPreguntaActual(preguntaActual + 1);
      setMostrarCorreccion(false);
      setTiempo(15);
      progressAnim.setValue(0);
    } else {
      setTerminado(true);
    }
  };

  const correctas = preguntas.reduce((acc, p, i) => acc + (seleccion[i] === (p.correctaIdx ?? -1) ? 1 : 0), 0);
  const total = preguntas.length || 1;
  const requerido = REQUIRED_CORRECT;

  const reiniciar = async () => {
    // Recargar preguntas excluyendo las usadas anteriormente
    try {
      const base = dedupQuestions(preguntasBase);
      
      const usedIdsStr = await AsyncStorage.getItem('B2_examen_preguntas_usadas');
      let usedIds: string[] = [];
      if (usedIdsStr) {
        try {
          usedIds = JSON.parse(usedIdsStr);
        } catch (e) {
          console.error('Error parseando IDs usados:', e);
        }
      }

      const availableQuestions = base.filter(q => !usedIds.includes(q.id));
      const questionsToUse = availableQuestions.length >= EXAM_LIMIT
        ? availableQuestions
        : base;

      const seleccionadas = estratificado(questionsToUse, EXAM_LIMIT)
        .map((p) => {
          const ops = barajar(p.opciones);
          return { ...p, opciones: ops, correctaIdx: ops.findIndex(o => normalizar(o) === normalizar(p.respuestaCorrecta)) } as Pregunta;
        });

      const selectedIds = seleccionadas.map(q => q.id);
      await AsyncStorage.setItem('B2_examen_preguntas_actuales', JSON.stringify(selectedIds));

      setPreguntas(seleccionadas);
      setIniciado(false);
      setTerminado(false);
      setPreguntaActual(0);
      setSeleccion(Array(seleccionadas.length).fill(null));
      setTiempo(15);
      setMostrarCorreccion(false);
      progressAnim.setValue(0);
    } catch (error) {
      console.error('Error recargando preguntas:', error);
      // Fallback: solo reiniciar con las preguntas actuales
      setIniciado(false);
      setTerminado(false);
      setPreguntaActual(0);
      setSeleccion(Array(preguntas.length).fill(null));
      setTiempo(15);
      setMostrarCorreccion(false);
      progressAnim.setValue(0);
    }
  };

  const finalizar = async () => {
    // Guardar preguntas usadas si el usuario falla
    if (correctas < requerido) {
      try {
        const currentIdsStr = await AsyncStorage.getItem('B2_examen_preguntas_actuales');
        if (currentIdsStr) {
          const currentIds: string[] = JSON.parse(currentIdsStr);
          // Guardar estos IDs como usados
          await AsyncStorage.setItem('B2_examen_preguntas_usadas', JSON.stringify(currentIds));
        }
      } catch (error) {
        console.error('Error guardando preguntas usadas:', error);
      }
    } else {
      // Si aprueba, limpiar las preguntas usadas
      try {
        await AsyncStorage.removeItem('B2_examen_preguntas_usadas');
        await AsyncStorage.removeItem('B2_examen_preguntas_actuales');
      } catch (error) {
        console.error('Error limpiando preguntas usadas:', error);
      }
    }

    if (correctas >= requerido) {
      try {
        markWrittenPassed('B2');
        const approvedReads = oralGateScores.filter(s => s >= 85).length;
        Alert.alert(
          '¡Felicitaciones! 🎉',
          `Has completado exitosamente el nivel B2.\n\nExamen escrito: ${correctas}/${total}\nExamen oral: ${oralGatePassed ? 'Aprobado ✅' : `${approvedReads}/5 lecturas ≥85%`}\n\n¡Ya puedes obtener tu diploma B2!`,
          [
            { text: 'Obtener Diploma B2', onPress: () => router.replace('/DiplomaScreen') },
            { text: 'Menú Principal', onPress: () => router.push('/(tabs)/SchoolScreen'), style: 'cancel' }
          ]
        );
      } catch (error) {
        console.error('Error actualizando progreso B2:', error);
        Alert.alert('Error', 'No se pudo actualizar el estado del examen. Intenta nuevamente.');
      }
    } else {
      Alert.alert('No aprobado', `Obtuviste ${correctas}/${total}. Necesitas ${requerido}.`, [
        { text: 'Reintentar', onPress: reiniciar },
        { text: 'Volver a B2', style: 'cancel', onPress: () => router.replace('/(tabs)/B2_Avanzado') },
      ]);
    }
  };

  if (!iniciado) {
    return (
      <LinearGradient colors={['#000', '#000']} style={styles.container}>
        <View style={styles.header}>
          <TouchableOpacity style={styles.backButton} onPress={() => router.replace('/(tabs)/B2_Avanzado')}>
            <Ionicons name="arrow-back" size={24} color="#FFD700" />
          </TouchableOpacity>
          <Ionicons name="school" size={64} color="#FFD700" />
        </View>
        <View style={styles.centerBox}>
          <Text style={styles.title}>Examen Final B2</Text>

          <View style={[styles.card, { paddingVertical: 16, marginBottom: 16 }]}>
            <Text style={styles.cardTitle}>📝 Examen Escrito</Text>
            <Text style={styles.cardText}>• 30 preguntas • 15 segundos c/u</Text>
            <Text style={styles.cardText}>• Necesitas 24/30 para aprobar (80%)</Text>
            <Text style={styles.cardText}>• Estado oral: {oralGatePassed ? 'Aprobado ✅' : 'Pendiente 🔒 (3 lecturas ≥85%)'}</Text>
            <Text style={styles.cardText}>• Estado escrito: {writtenPassedFromContext ? 'Aprobado ✅' : 'Pendiente 🔒'}</Text>
          </View>
          <View style={{ backgroundColor: 'rgba(255, 152, 0, 0.3)', padding: 12, borderRadius: 12, width: '100%', maxWidth: 400, borderWidth: 2, borderColor: '#FF9800', marginBottom: 16 }}>
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
            style={[styles.cta, { backgroundColor: oralGatePassed ? '#fff' : 'rgba(255,255,255,0.6)' }]}
            onPress={empezar}
          >
            <Text style={[styles.ctaText, { color: '#FFD700' }]}>Comenzar Examen Escrito</Text>
          </TouchableOpacity>

          <TouchableOpacity style={[styles.cta, { backgroundColor: 'rgba(255,255,255,0.6)', marginTop: 12 }]} onPress={handleStartOral}>
            <Text style={[styles.ctaText, { color: '#FFD700' }]}>Comenzar Examen Oral</Text>
          </TouchableOpacity>
        </View>

        {webMode && (
          <Modal visible transparent animationType="fade" onRequestClose={() => setWebMode(false)}>
            <View style={{ flex:1, backgroundColor:'rgba(0,0,0,0.5)', justifyContent:'center', alignItems:'center' }}>
              <View style={{ backgroundColor:'#fff', borderRadius:12, width:'92%', maxHeight:'86%', overflow:'hidden' }}>
                <View style={{ padding:12, backgroundColor:'#000', borderWidth: 1, borderColor: '#FFD700' }}>
                  <Text style={{ color:'#FFD700', fontWeight:'bold', textAlign:'center' }}>Examen Oral B2 - Párrafo {oralGateIndex + 1}/5</Text>
                </View>
                <View style={{ height: 420 }}>
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
                  <Text style={{ textAlign:'center', marginBottom:8 }}>Lecturas con 85%+: {oralGateScores.filter(s => s >= 85).length} / 5</Text>
                  <View style={{ flexDirection:'row', justifyContent:'space-between' }}>
                    <TouchableOpacity style={[styles.cta, { backgroundColor:'#e0e0e0', flex:1, marginRight:6 }]} onPress={() => {
                      if (oralGateIndex > 0) {
                        const prev = oralGateIndex - 1; setOralGateIndex(prev); setWebPromptText(oralGatePrompts[prev]); setWebPercent(null);
                      }
                    }}>
                      <Text style={[styles.ctaText, { color:'#333' }]}>Anterior</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={[styles.cta, { backgroundColor:'#000', flex:1, marginLeft:6, borderWidth: 1, borderColor: '#FFD700' }]} onPress={handleOralNext}>
                      <Text style={[styles.ctaText, { color: '#FFD700' }]}>{oralGateIndex < oralGatePrompts.length - 1 ? 'Siguiente' : 'Finalizar'}</Text>
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
      </LinearGradient>
    );
  }

  // Modal oral se maneja dentro de la pantalla inicial

  if (terminado) {
    const porcentaje = Math.round((correctas / total) * 100);
    const aprobado = correctas >= requerido;

    return (
      <LinearGradient colors={aprobado ? ['#000', '#000'] : ['#f44336', '#ef5350']} style={styles.container}>
        <View style={styles.centerBox}>
          <Ionicons name={aprobado ? "checkmark-circle" : "close-circle"} size={80} color="#fff" />
          <Text style={styles.title}>{aprobado ? '¡Aprobado!' : 'No Aprobado'}</Text>
          <View style={styles.card}>
            <Text style={styles.cardTitle}>Resultados</Text>
            <Text style={styles.cardText}>Respuestas correctas: {correctas}/{total}</Text>
            <Text style={styles.cardText}>Porcentaje: {porcentaje}%</Text>
            <Text style={styles.cardText}>Requerido: {requerido}/{total} ({Math.round((requerido/total)*100)}%)</Text>
          </View>
          {aprobado && (
            <>
              <ExamenPresencialForm nivel="B2" />
              <Text style={styles.resultHint}>¿Quieres obtener tu certificado? Apúntate al examen presencial.</Text>
            </>
          )}
          <TouchableOpacity style={styles.cta} onPress={finalizar}>
            <Text style={styles.ctaText}>{aprobado ? 'Continuar' : 'Ver opciones'}</Text>
          </TouchableOpacity>
        </View>
      </LinearGradient>
    );
  }

  const pregunta = preguntas[preguntaActual];
  if (!pregunta) return null;

  return (
    <LinearGradient colors={['#000', '#000']} style={styles.container}>

      <View style={styles.header}>
        <View style={styles.progressContainer}>
          <Text style={styles.progressText}>{preguntaActual + 1}/{preguntas.length}</Text>
          <View style={styles.progressBar}>
            <Animated.View style={[styles.progressFill, { width: progressAnim.interpolate({ inputRange: [0, 1], outputRange: ['0%', '100%'] }) }]} />
          </View>
          <Text style={styles.timerText}>{tiempo}s</Text>
        </View>
      </View>

      <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
        <View style={styles.questionCard}>
          <Text style={styles.unitText}>{pregunta.unidad}</Text>
          <Text style={styles.questionText}>{pregunta.pregunta}</Text>
        </View>
        
        <View style={styles.optionsContainer}>
          {pregunta.opciones.map((opcion, idx) => {
            let bgColor = '#fff';
            let textColor = '#000';
            let borderColor = '#e0e0e0';
            
            if (mostrarCorreccion) {
              if (idx === pregunta.correctaIdx) {
                bgColor = '#4caf50';
                textColor = '#fff';
                borderColor = '#4caf50';
              } else if (idx === seleccion[preguntaActual]) {
                bgColor = '#f44336';
                textColor = '#fff';
                borderColor = '#f44336';
              }
            }
            
            return (
              <TouchableOpacity
                key={idx}
                style={[styles.option, { backgroundColor: bgColor, borderColor }]}
                onPress={() => seleccionarOpcion(idx)}
                disabled={mostrarCorreccion}
              >
                <Text style={[styles.optionText, { color: textColor }]}>{opcion}</Text>
              </TouchableOpacity>
            );
          })}
        </View>
      </ScrollView>
    </LinearGradient>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1 },
  header: { paddingTop: 50, paddingHorizontal: 20, paddingBottom: 20 },
  backButton: { position: 'absolute', left: 20, top: 50, zIndex: 1, padding: 8 },
  centerBox: { flex: 1, justifyContent: 'center', alignItems: 'center', paddingHorizontal: 20 },
  title: { fontSize: 32, fontWeight: 'bold', color: '#FFD700', marginBottom: 20, textAlign: 'center' },
  card: { backgroundColor: 'rgba(255,255,255,0.2)', borderRadius: 16, padding: 24, marginBottom: 30, width: '100%', maxWidth: 400 },
  cardTitle: { fontSize: 20, fontWeight: 'bold', color: '#FFD700', marginBottom: 16, textAlign: 'center' },
  cardText: { fontSize: 16, color: '#FFD700', marginBottom: 8, textAlign: 'center' },
  resultHint: { fontSize: 14, color: '#FFD700', textAlign: 'center', marginTop: 6 },
  cta: { backgroundColor: '#fff', borderRadius: 12, paddingVertical: 16, paddingHorizontal: 32, minWidth: 200 },
  ctaText: { fontSize: 18, fontWeight: 'bold', color: '#FFD700', textAlign: 'center' },
  progressContainer: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' },
  progressText: { fontSize: 16, fontWeight: 'bold', color: '#FFD700', minWidth: 50 },
  progressBar: { flex: 1, height: 8, backgroundColor: 'rgba(255,215,0,0.3)', borderRadius: 4, marginHorizontal: 16 },
  progressFill: { height: '100%', backgroundColor: '#FFD700', borderRadius: 4 },
  timerText: { fontSize: 16, fontWeight: 'bold', color: '#FFD700', minWidth: 40, textAlign: 'right' },
  content: { flex: 1, paddingHorizontal: 20 },
  questionCard: { backgroundColor: '#fff', borderRadius: 16, padding: 24, marginBottom: 20 },
  unitText: { fontSize: 14, fontWeight: 'bold', color: '#FFD700', marginBottom: 8, textTransform: 'uppercase' },
  questionText: { fontSize: 18, color: '#000', lineHeight: 24 },
  optionsContainer: { paddingBottom: 40 },
  option: { backgroundColor: '#fff', borderRadius: 12, padding: 16, marginBottom: 12, borderWidth: 2 },
  optionText: { fontSize: 16, textAlign: 'center', lineHeight: 20 },
});

