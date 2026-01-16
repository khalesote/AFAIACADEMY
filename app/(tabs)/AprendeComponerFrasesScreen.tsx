import React, { useState, useMemo } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, Alert } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useRouter, useLocalSearchParams } from 'expo-router';
import { LinearGradient } from 'expo-linear-gradient';
import EjerciciosInteractivos from '../components/EjerciciosInteractivos';

type LevelKey = 'A1' | 'A2' | 'B1' | 'B2';

type Leccion = {
  id: string;
  titulo: string;
  tituloAr: string;
  explicacion: string;
  explicacionAr: string;
  ejemplos: Array<{
    espanol: string;
    arabe: string;
    explicacion: string;
    explicacionAr: string;
  }>;
};

// Lecciones para A1 - Básico
const leccionesA1: Leccion[] = [
  {
    id: '1',
    titulo: 'Estructura Básica: Sujeto + Verbo',
    tituloAr: 'البنية الأساسية: الفاعل + الفعل',
    explicacion: 'La frase más simple en español tiene un SUJETO y un VERBO. El sujeto puede ser un pronombre (yo, tú, él)',
    explicacionAr: 'الجملة الأبسط في الإسبانية لها فاعل وفعل. الفاعل يمكن أن يكون ضميراً (أنا، أنت، هو)',
    ejemplos: [
      {
        espanol: 'Yo trabajo',
        arabe: 'أنا أعمل',
        explicacion: 'Yo (sujeto) + trabajo (verbo)',
        explicacionAr: 'أنا (الفاعل) + أعمل (الفعل)'
      },
      {
        espanol: 'Tú estudias',
        arabe: 'أنت تدرس',
        explicacion: 'Tú (sujeto) + estudias (verbo)',
        explicacionAr: 'أنت (الفاعل) + تدرس (الفعل)'
      },
      {
        espanol: 'Él come',
        arabe: 'هو يأكل',
        explicacion: 'Él (sujeto) + come (verbo)',
        explicacionAr: 'هو (الفاعل) + يأكل (الفعل)'
      }
    ]
  },
  {
    id: '2',
    titulo: 'Añadir un Complemento',
    tituloAr: 'إضافة مفعول به',
    explicacion: 'Puedes añadir un complemento después del verbo para decir QUÉ hace el sujeto',
    explicacionAr: 'يمكنك إضافة مفعول به بعد الفعل لقول ماذا يفعل الفاعل',
    ejemplos: [
      {
        espanol: 'Yo como pan',
        arabe: 'أنا آكل خبزاً',
        explicacion: 'Yo (sujeto) + como (verbo) + pan (complemento)',
        explicacionAr: 'أنا (الفاعل) + آكل (الفعل) + خبزاً (المفعول به)'
      },
      {
        espanol: 'María estudia español',
        arabe: 'ماريا تدرس الإسبانية',
        explicacion: 'María (sujeto) + estudia (verbo) + español (complemento)',
        explicacionAr: 'ماريا (الفاعل) + تدرس (الفعل) + الإسبانية (المفعول به)'
      },
      {
        espanol: 'Nosotros vivimos en Madrid',
        arabe: 'نحن نعيش في مدريد',
        explicacion: 'Nosotros (sujeto) + vivimos (verbo) + en Madrid (complemento de lugar)',
        explicacionAr: 'نحن (الفاعل) + نعيش (الفعل) + في مدريد (ظرف مكان)'
      }
    ]
  },
  {
    id: '3',
    titulo: 'Frases Negativas con "no"',
    tituloAr: 'الجمل النافية مع "no"',
    explicacion: 'Para decir NO, ponemos "no" ANTES del verbo',
    explicacionAr: 'للقول لا، نضع "no" قبل الفعل',
    ejemplos: [
      {
        espanol: 'Yo no hablo inglés',
        arabe: 'أنا لا أتكلم الإنجليزية',
        explicacion: 'no + hablo = negación',
        explicacionAr: 'no + hablo = النفي'
      },
      {
        espanol: 'María no come carne',
        arabe: 'ماريا لا تأكل لحماً',
        explicacion: 'no + come = negación',
        explicacionAr: 'no + come = النفي'
      },
      {
        espanol: 'Nosotros no vamos al cine',
        arabe: 'نحن لا نذهب إلى السينما',
        explicacion: 'no + vamos = negación',
        explicacionAr: 'no + vamos = النفي'
      }
    ]
  },
  {
    id: '4',
    titulo: 'Preguntas Simples',
    tituloAr: 'الأسئلة البسيطة',
    explicacion: 'Para hacer preguntas, puedes usar palabras como ¿Qué? (ماذا), ¿Dónde? (أين), ¿Cuándo? (متى)',
    explicacionAr: 'لطرح الأسئلة، يمكنك استخدام كلمات مثل ¿Qué? (ماذا)، ¿Dónde? (أين)، ¿Cuándo? (متى)',
    ejemplos: [
      {
        espanol: '¿Qué comes?',
        arabe: 'ماذا تأكل؟',
        explicacion: '¿Qué? = ماذا (qué = qué cosa)',
        explicacionAr: '¿Qué? = ماذا (qué = ماذا)'
      },
      {
        espanol: '¿Dónde vives?',
        arabe: 'أين تعيش؟',
        explicacion: '¿Dónde? = أين (dónde = dónde)',
        explicacionAr: '¿Dónde? = أين (dónde = أين)'
      },
      {
        espanol: '¿Hablas español?',
        arabe: 'هل تتكلم الإسبانية؟',
        explicacion: 'Pregunta sin palabra interrogativa, solo cambio de entonación',
        explicacionAr: 'سؤال بدون كلمة استفهامية، فقط تغيير في النبرة'
      }
    ]
  },
  {
    id: '5',
    titulo: 'Frases con "Hay" (يوجد)',
    tituloAr: 'الجمل مع "Hay"',
    explicacion: '"Hay" significa "يوجد" o "هناك". Se usa para decir que algo existe. No cambia',
    explicacionAr: '"Hay" تعني "يوجد" أو "هناك". تُستخدم للقول أن شيئاً موجوداً. لا تتغير',
    ejemplos: [
      {
        espanol: 'Hay un libro',
        arabe: 'يوجد كتاب',
        explicacion: 'Hay = existe/un libro = lo que existe',
        explicacionAr: 'Hay = يوجد/ un libro = ما يوجد'
      },
      {
        espanol: 'Hay muchos estudiantes',
        arabe: 'يوجد طلاب كثيرون',
        explicacion: 'Hay = existe/muchos estudiantes = lo que existe',
        explicacionAr: 'Hay = يوجد/ muchos estudiantes = ما يوجد'
      },
      {
        espanol: 'No hay pan',
        arabe: 'لا يوجد خبز',
        explicacion: 'No hay = no existe',
        explicacionAr: 'No hay = لا يوجد'
      }
    ]
  }
];

// Lecciones para A2 - Intermedio
const leccionesA2: Leccion[] = [
  {
    id: '1',
    titulo: 'Frases con Adjetivos',
    tituloAr: 'الجمل مع الصفات',
    explicacion: 'Los adjetivos van DESPUÉS del sustantivo y deben concordar en género (masculino/femenino) y número (singular/plural)',
    explicacionAr: 'الصفات تأتي بعد الاسم ويجب أن تتطابق في الجنس (مذكر/مؤنث) والعدد (مفرد/جمع)',
    ejemplos: [
      {
        espanol: 'La casa grande',
        arabe: 'البيت الكبير',
        explicacion: 'casa (femenino) + grande (adjetivo femenino)',
        explicacionAr: 'casa (مؤنث) + grande (صفة مؤنثة)'
      },
      {
        espanol: 'El coche rojo',
        arabe: 'السيارة الحمراء',
        explicacion: 'coche (masculino) + rojo (adjetivo masculino)',
        explicacionAr: 'coche (مذكر) + rojo (صفة مذكرة)'
      },
      {
        espanol: 'Los niños pequeños',
        arabe: 'الأطفال الصغار',
        explicacion: 'niños (plural) + pequeños (adjetivo plural)',
        explicacionAr: 'niños (جمع) + pequeños (صفة جمع)'
      }
    ]
  },
  {
    id: '2',
    titulo: 'Frases con Verbos Ser y Estar',
    tituloAr: 'الجمل مع أفعال Ser و Estar',
    explicacion: 'Ser = يكون (características permanentes), Estar = يكون (estado temporal o ubicación)',
    explicacionAr: 'Ser = يكون (صفات دائمة)، Estar = يكون (حالة مؤقتة أو موقع)',
    ejemplos: [
      {
        espanol: 'Yo soy médico',
        arabe: 'أنا طبيب',
        explicacion: 'soy = ser (característica permanente: profesión)',
        explicacionAr: 'soy = ser (صفة دائمة: المهنة)'
      },
      {
        espanol: 'Yo estoy cansado',
        arabe: 'أنا متعب',
        explicacion: 'estoy = estar (estado temporal: cansancio)',
        explicacionAr: 'estoy = estar (حالة مؤقتة: التعب)'
      },
      {
        espanol: 'María está en casa',
        arabe: 'ماريا في البيت',
        explicacion: 'está = estar (ubicación: dónde está)',
        explicacionAr: 'está = estar (الموقع: أين هي)'
      }
    ]
  },
  {
    id: '3',
    titulo: 'Frases con Complemento Directo e Indirecto',
    tituloAr: 'الجمل مع المفعول به المباشر وغير المباشر',
    explicacion: 'Algunos verbos tienen dos complementos: directo (qué) e indirecto (a quién)',
    explicacionAr: 'بعض الأفعال لها مفعولان: مباشر (ماذا) وغير مباشر (لمن)',
    ejemplos: [
      {
        espanol: 'Yo doy un libro a María',
        arabe: 'أنا أعطي كتاباً لماريا',
        explicacion: 'un libro = complemento directo (qué doy), a María = complemento indirecto (a quién)',
        explicacionAr: 'un libro = مفعول به مباشر (ماذا أعطي)، a María = مفعول به غير مباشر (لمن)'
      },
      {
        espanol: 'Él compra flores para su madre',
        arabe: 'هو يشتري زهوراً لأمه',
        explicacion: 'flores = complemento directo, para su madre = complemento indirecto',
        explicacionAr: 'flores = مفعول به مباشر، para su madre = مفعول به غير مباشر'
      }
    ]
  },
  {
    id: '4',
    titulo: 'Frases con Tiempos Pasados',
    tituloAr: 'الجمل مع الأزمنة الماضية',
    explicacion: 'Para hablar del pasado, usamos verbos en pretérito perfecto o imperfecto',
    explicacionAr: 'للحديث عن الماضي، نستخدم أفعال في الماضي التام أو الناقص',
    ejemplos: [
      {
        espanol: 'Ayer comí paella',
        arabe: 'أمس أكلت الباييلا',
        explicacion: 'comí = pretérito perfecto (acción terminada)',
        explicacionAr: 'comí = الماضي التام (فعل منتهي)'
      },
      {
        espanol: 'Cuando era niño, jugaba mucho',
        arabe: 'عندما كنت طفلاً، كنت ألعب كثيراً',
        explicacion: 'era, jugaba = pretérito imperfecto (acción habitual en el pasado)',
        explicacionAr: 'era, jugaba = الماضي الناقص (فعل عادي في الماضي)'
      }
    ]
  },
  {
    id: '5',
    titulo: 'Frases con Expresiones de Tiempo',
    tituloAr: 'الجمل مع تعبيرات الزمن',
    explicacion: 'Usamos expresiones como "hace", "desde hace", "durante" para hablar del tiempo',
    explicacionAr: 'نستخدم تعبيرات مثل "hace"، "desde hace"، "durante" للحديث عن الزمن',
    ejemplos: [
      {
        espanol: 'Vivo aquí desde hace tres años',
        arabe: 'أعيش هنا منذ ثلاث سنوات',
        explicacion: 'desde hace = desde (desde cuándo)',
        explicacionAr: 'desde hace = منذ (منذ متى)'
      },
      {
        espanol: 'Estudio español durante dos horas',
        arabe: 'أدرس الإسبانية لمدة ساعتين',
        explicacion: 'durante = durante (cuánto tiempo)',
        explicacionAr: 'durante = لمدة (كم من الوقت)'
      }
    ]
  }
];

// Lecciones para B1 - Avanzado
const leccionesB1: Leccion[] = [
  {
    id: '1',
    titulo: 'Frases con Subordinadas',
    tituloAr: 'الجمل مع الجمل الفرعية',
    explicacion: 'Puedes unir dos frases con palabras como "que", "cuando", "porque", "aunque"',
    explicacionAr: 'يمكنك ربط جملتين بكلمات مثل "que"، "cuando"، "porque"، "aunque"',
    ejemplos: [
      {
        espanol: 'Creo que tienes razón',
        arabe: 'أعتقد أنك محق',
        explicacion: 'Creo (frase principal) + que tienes razón (frase subordinada)',
        explicacionAr: 'Creo (الجملة الرئيسية) + que tienes razón (الجملة الفرعية)'
      },
      {
        espanol: 'Voy al cine cuando tengo tiempo',
        arabe: 'أذهب إلى السينما عندما لدي وقت',
        explicacion: 'cuando = cuando (cuándo)',
        explicacionAr: 'cuando = عندما (متى)'
      },
      {
        espanol: 'Estudio porque quiero aprobar',
        arabe: 'أدرس لأنني أريد النجاح',
        explicacion: 'porque = porque (por qué razón)',
        explicacionAr: 'porque = لأن (لماذا)'
      }
    ]
  },
  {
    id: '2',
    titulo: 'Frases con Condicionales',
    tituloAr: 'الجمل الشرطية',
    explicacion: 'Usamos "si" para expresar condiciones. Si + presente, futuro/imperativo',
    explicacionAr: 'نستخدم "si" للتعبير عن الشروط. Si + الحاضر، المستقبل/الأمر',
    ejemplos: [
      {
        espanol: 'Si llueve, me quedo en casa',
        arabe: 'إذا أمطرت، سأبقى في البيت',
        explicacion: 'Si llueve (condición) + me quedo (resultado)',
        explicacionAr: 'Si llueve (الشرط) + me quedo (النتيجة)'
      },
      {
        espanol: 'Si estudias, aprobarás',
        arabe: 'إذا درست، ستن succeed',
        explicacion: 'Si estudias (condición) + aprobarás (resultado futuro)',
        explicacionAr: 'Si estudias (الشرط) + aprobarás (النتيجة المستقبلية)'
      }
    ]
  },
  {
    id: '3',
    titulo: 'Frases con Comparativos',
    tituloAr: 'الجمل مع المقارنات',
    explicacion: 'Usamos "más...que", "menos...que", "tan...como" para comparar',
    explicacionAr: 'نستخدم "más...que"، "menos...que"، "tan...como" للمقارنة',
    ejemplos: [
      {
        espanol: 'Madrid es más grande que Barcelona',
        arabe: 'مدريد أكبر من برشلونة',
        explicacion: 'más grande que = más grande que (comparación de superioridad)',
        explicacionAr: 'más grande que = أكبر من (مقارنة تفوق)'
      },
      {
        espanol: 'Este libro es tan interesante como aquel',
        arabe: 'هذا الكتاب مثير للاهتمام مثل ذلك',
        explicacion: 'tan...como = tan...como (igualdad)',
        explicacionAr: 'tan...como = مثل (المساواة)'
      }
    ]
  },
  {
    id: '4',
    titulo: 'Frases con Futuro',
    tituloAr: 'الجمل مع المستقبل',
    explicacion: 'Para hablar del futuro, usamos el futuro simple o "ir a + infinitivo"',
    explicacionAr: 'للحديث عن المستقبل، نستخدم المستقبل البسيط أو "ir a + المصدر"',
    ejemplos: [
      {
        espanol: 'Mañana iré al médico',
        arabe: 'غداً سأذهب إلى الطبيب',
        explicacion: 'iré = futuro simple (acción futura)',
        explicacionAr: 'iré = المستقبل البسيط (فعل مستقبلي)'
      },
      {
        espanol: 'Voy a estudiar esta noche',
        arabe: 'سأدرس هذه الليلة',
        explicacion: 'Voy a estudiar = ir a + infinitivo (plan futuro)',
        explicacionAr: 'Voy a estudiar = ir a + المصدر (خطة مستقبلية)'
      }
    ]
  },
  {
    id: '5',
    titulo: 'Frases con Expresiones de Opinión',
    tituloAr: 'الجمل مع تعبيرات الرأي',
    explicacion: 'Usamos expresiones como "creo que", "pienso que", "me parece que" para dar opiniones',
    explicacionAr: 'نستخدم تعبيرات مثل "creo que"، "pienso que"، "me parece que" لإعطاء الآراء',
    ejemplos: [
      {
        espanol: 'Creo que es una buena idea',
        arabe: 'أعتقد أنها فكرة جيدة',
        explicacion: 'Creo que = creo que (expresión de opinión)',
        explicacionAr: 'Creo que = أعتقد أن (تعبير عن الرأي)'
      },
      {
        espanol: 'Me parece que tienes razón',
        arabe: 'يبدو لي أنك محق',
        explicacion: 'Me parece que = me parece que (expresión de opinión)',
        explicacionAr: 'Me parece que = يبدو لي أن (تعبير عن الرأي)'
      }
    ]
  }
];

// Lecciones para B2 - Avanzado
const leccionesB2: Leccion[] = [
  {
    id: '1',
    titulo: 'Frases con Subjuntivo',
    tituloAr: 'الجمل مع صيغة التمني',
    explicacion: 'El subjuntivo se usa después de expresiones de emoción, duda, deseo o necesidad',
    explicacionAr: 'صيغة التمني تُستخدم بعد تعبيرات المشاعر، الشك، الرغبة أو الحاجة',
    ejemplos: [
      {
        espanol: 'Espero que vengas mañana',
        arabe: 'أتمنى أن تأتي غداً',
        explicacion: 'Espero (expresión de deseo) + que vengas (subjuntivo)',
        explicacionAr: 'Espero (تعبير عن الرغبة) + que vengas (صيغة التمني)'
      },
      {
        espanol: 'Dudo que sea verdad',
        arabe: 'أشك في أن يكون ذلك صحيحاً',
        explicacion: 'Dudo (expresión de duda) + que sea (subjuntivo)',
        explicacionAr: 'Dudo (تعبير عن الشك) + que sea (صيغة التمني)'
      },
      {
        espanol: 'Es necesario que estudies más',
        arabe: 'من الضروري أن تدرس أكثر',
        explicacion: 'Es necesario (expresión de necesidad) + que estudies (subjuntivo)',
        explicacionAr: 'Es necesario (تعبير عن الحاجة) + que estudies (صيغة التمني)'
      }
    ]
  },
  {
    id: '2',
    titulo: 'Frases con Voz Pasiva',
    tituloAr: 'الجمل في صيغة المبني للمجهول',
    explicacion: 'La voz pasiva se forma con "ser + participio pasado + por". El sujeto recibe la acción',
    explicacionAr: 'صيغة المبني للمجهول تتكون من "ser + التصريف الثالث + por". الفاعل يتلقى الفعل',
    ejemplos: [
      {
        espanol: 'El libro fue escrito por Cervantes',
        arabe: 'الكتاب كُتب من قبل سيرفانتس',
        explicacion: 'fue escrito = ser (pasado) + participio pasado',
        explicacionAr: 'fue escrito = ser (الماضي) + التصريف الثالث'
      },
      {
        espanol: 'La casa será construida por obreros',
        arabe: 'البيت سيُبنى من قبل العمال',
        explicacion: 'será construida = ser (futuro) + participio pasado',
        explicacionAr: 'será construida = ser (المستقبل) + التصريف الثالث'
      }
    ]
  },
  {
    id: '3',
    titulo: 'Frases con Gerundio',
    tituloAr: 'الجمل مع صيغة المصدر الحالي',
    explicacion: 'El gerundio (-ando, -iendo) expresa una acción simultánea o en progreso',
    explicacionAr: 'صيغة المصدر الحالي (-ando، -iendo) تعبر عن فعل متزامن أو قيد التنفيذ',
    ejemplos: [
      {
        espanol: 'Estoy estudiando español',
        arabe: 'أنا أدرس الإسبانية',
        explicacion: 'Estoy + estudiando = acción en progreso',
        explicacionAr: 'Estoy + estudiando = فعل قيد التنفيذ'
      },
      {
        espanol: 'Leyendo el periódico, me enteré de la noticia',
        arabe: 'بينما أقرأ الجريدة، علمت بالخبر',
        explicacion: 'Leyendo = gerundio (acción simultánea)',
        explicacionAr: 'Leyendo = صيغة المصدر الحالي (فعل متزامن)'
      }
    ]
  },
  {
    id: '4',
    titulo: 'Frases con Participio Pasado',
    tituloAr: 'الجمل مع التصريف الثالث',
    explicacion: 'El participio pasado se usa con "haber" para formar tiempos compuestos o como adjetivo',
    explicacionAr: 'التصريف الثالث يُستخدم مع "haber" لتكوين الأزمنة المركبة أو كصفة',
    ejemplos: [
      {
        espanol: 'He terminado el trabajo',
        arabe: 'لقد أنهيت العمل',
        explicacion: 'He + terminado = pretérito perfecto compuesto',
        explicacionAr: 'He + terminado = الماضي التام المركب'
      },
      {
        espanol: 'La puerta está cerrada',
        arabe: 'الباب مغلق',
        explicacion: 'cerrada = participio usado como adjetivo',
        explicacionAr: 'cerrada = التصريف الثالث المستخدم كصفة'
      }
    ]
  },
  {
    id: '5',
    titulo: 'Frases con Estilo Indirecto',
    tituloAr: 'الجمل في الأسلوب غير المباشر',
    explicacion: 'El estilo indirecto reproduce lo que alguien dijo, pensó o preguntó',
    explicacionAr: 'الأسلوب غير المباشر يعيد ما قاله أو فكر فيه أو سأله شخص ما',
    ejemplos: [
      {
        espanol: 'Dijo que vendría mañana',
        arabe: 'قال إنه سيأتي غداً',
        explicacion: 'Dijo (verbo de comunicación) + que vendría (estilo indirecto)',
        explicacionAr: 'Dijo (فعل التواصل) + que vendría (الأسلوب غير المباشر)'
      },
      {
        espanol: 'Me preguntó si tenía hambre',
        arabe: 'سألني إذا كنت جائعاً',
        explicacion: 'preguntó + si tenía (pregunta en estilo indirecto)',
        explicacionAr: 'preguntó + si tenía (سؤال في الأسلوب غير المباشر)'
      }
    ]
  }
];

const getLeccionesByLevel = (level: LevelKey): Leccion[] => {
  switch (level) {
    case 'A1':
      return leccionesA1;
    case 'A2':
      return leccionesA2;
    case 'B1':
      return leccionesB1;
    case 'B2':
      return leccionesB2;
    default:
      return leccionesA1;
  }
};

// Función para obtener ejercicios según el nivel y la lección
const getEjerciciosForLeccion = (level: LevelKey, leccionId: string): any[] => {
  const ejerciciosPorLeccion: Record<string, Record<string, any[]>> = {
    A1: {
      '1': [
        {
          tipo: 'opcion_multiple',
          pregunta: '¿Cuál es la estructura correcta de una frase básica?',
          opciones: [
            'Sujeto + Verbo',
            'Verbo + Sujeto',
            'Solo Verbo',
            'Solo Sujeto'
          ],
          respuestaCorrecta: 0,
          explicacion: 'La estructura básica es: Sujeto + Verbo. Ejemplo: "Yo trabajo"',
          explicacionAr: 'البنية الأساسية هي: الفاعل + الفعل. مثال: "أنا أعمل"'
        },
        {
          tipo: 'rellenar_huecos',
          enunciado: 'Completa: ______ estudias español. (أنت تدرس الإسبانية)',
          solucion: ['Tú']
        },
        {
          tipo: 'vocabulario',
          titulo: 'Relaciona el sujeto con el verbo correcto',
          pares: [
            { izquierda: 'Yo', derecha: 'trabajo' },
            { izquierda: 'Tú', derecha: 'estudias' },
            { izquierda: 'Él', derecha: 'come' },
            { izquierda: 'Nosotros', derecha: 'vivimos' }
          ]
        }
      ],
      '2': [
        {
          tipo: 'opcion_multiple',
          pregunta: '¿Dónde va el complemento en la frase?',
          opciones: [
            'Antes del verbo',
            'Después del verbo',
            'Antes del sujeto',
            'No se usa'
          ],
          respuestaCorrecta: 1,
          explicacion: 'El complemento va DESPUÉS del verbo. Ejemplo: "Yo como pan"',
          explicacionAr: 'المفعول به يأتي بعد الفعل. مثال: "أنا آكل خبزاً"'
        },
        {
          tipo: 'rellenar_huecos',
          enunciado: 'Completa: María estudia ______. (ماريا تدرس الإسبانية)',
          solucion: ['español']
        },
        {
          tipo: 'vocabulario',
          titulo: 'Relaciona la frase con su estructura',
          pares: [
            { izquierda: 'Yo como pan', derecha: 'Sujeto + Verbo + Complemento' },
            { izquierda: 'Él trabaja', derecha: 'Sujeto + Verbo' },
            { izquierda: 'Nosotros vivimos en Madrid', derecha: 'Sujeto + Verbo + Complemento de lugar' }
          ]
        }
      ],
      '3': [
        {
          tipo: 'opcion_multiple',
          pregunta: '¿Dónde se coloca "no" en una frase negativa?',
          opciones: [
            'Después del verbo',
            'Antes del verbo',
            'Al final',
            'No se usa'
          ],
          respuestaCorrecta: 1,
          explicacion: '"no" va ANTES del verbo. Ejemplo: "Yo no hablo inglés"',
          explicacionAr: '"no" تأتي قبل الفعل. مثال: "أنا لا أتكلم الإنجليزية"'
        },
        {
          tipo: 'rellenar_huecos',
          enunciado: 'Completa: María ______ come carne. (ماريا لا تأكل لحماً)',
          solucion: ['no']
        },
        {
          tipo: 'vocabulario',
          titulo: 'Convierte las frases afirmativas en negativas',
          pares: [
            { izquierda: 'Yo hablo inglés', derecha: 'Yo no hablo inglés' },
            { izquierda: 'Él come pan', derecha: 'Él no come pan' },
            { izquierda: 'Nosotros vamos al cine', derecha: 'Nosotros no vamos al cine' }
          ]
        }
      ],
      '4': [
        {
          tipo: 'opcion_multiple',
          pregunta: '¿Qué palabra se usa para preguntar "qué cosa"?',
          opciones: ['¿Dónde?', '¿Qué?', '¿Cuándo?', '¿Quién?'],
          respuestaCorrecta: 1,
          explicacion: '¿Qué? = ماذا (qué cosa)',
          explicacionAr: '¿Qué? = ماذا'
        },
        {
          tipo: 'rellenar_huecos',
          enunciado: 'Completa: ¿______ vives? (أين تعيش؟)',
          solucion: ['Dónde']
        },
        {
          tipo: 'vocabulario',
          titulo: 'Relaciona la pregunta con su traducción',
          pares: [
            { izquierda: '¿Qué comes?', derecha: 'ماذا تأكل؟' },
            { izquierda: '¿Dónde vives?', derecha: 'أين تعيش؟' },
            { izquierda: '¿Hablas español?', derecha: 'هل تتكلم الإسبانية؟' }
          ]
        }
      ],
      '5': [
        {
          tipo: 'opcion_multiple',
          pregunta: '¿Qué significa "Hay"?',
          opciones: ['Tengo', 'Existe/Está', 'Voy', 'Soy'],
          respuestaCorrecta: 1,
          explicacion: '"Hay" = يوجد o هناك (algo existe)',
          explicacionAr: '"Hay" = يوجد أو هناك (شيء موجود)'
        },
        {
          tipo: 'rellenar_huecos',
          enunciado: 'Completa: ______ un libro en la mesa. (يوجد كتاب على الطاولة)',
          solucion: ['Hay']
        },
        {
          tipo: 'vocabulario',
          titulo: 'Relaciona la frase con su significado',
          pares: [
            { izquierda: 'Hay un libro', derecha: 'Existe un libro' },
            { izquierda: 'No hay pan', derecha: 'No existe pan' },
            { izquierda: 'Hay muchos estudiantes', derecha: 'Existen muchos estudiantes' }
          ]
        }
      ]
    },
    A2: {
      '1': [
        {
          tipo: 'opcion_multiple',
          pregunta: '¿Dónde van los adjetivos en español?',
          opciones: [
            'Antes del sustantivo',
            'Después del sustantivo',
            'No importa',
            'No se usan'
          ],
          respuestaCorrecta: 1,
          explicacion: 'Los adjetivos van DESPUÉS del sustantivo y deben concordar',
          explicacionAr: 'الصفات تأتي بعد الاسم ويجب أن تتطابق'
        },
        {
          tipo: 'rellenar_huecos',
          enunciado: 'Completa: La casa ______. (البيت الكبير)',
          solucion: ['grande']
        },
        {
          tipo: 'vocabulario',
          titulo: 'Relaciona el sustantivo con su adjetivo correcto',
          pares: [
            { izquierda: 'casa (femenino)', derecha: 'grande' },
            { izquierda: 'coche (masculino)', derecha: 'rojo' },
            { izquierda: 'niños (plural)', derecha: 'pequeños' }
          ]
        }
      ],
      '2': [
        {
          tipo: 'opcion_multiple',
          pregunta: '¿Cuándo usamos "ser" y cuándo "estar"?',
          opciones: [
            'Ser = permanente, Estar = temporal',
            'Son iguales',
            'Ser = temporal, Estar = permanente',
            'No hay diferencia'
          ],
          respuestaCorrecta: 0,
          explicacion: 'Ser = características permanentes, Estar = estados temporales o ubicación',
          explicacionAr: 'Ser = صفات دائمة، Estar = حالات مؤقتة أو موقع'
        },
        {
          tipo: 'rellenar_huecos',
          enunciado: 'Completa: Yo ______ médico. (أنا طبيب)',
          solucion: ['soy']
        },
        {
          tipo: 'vocabulario',
          titulo: 'Relaciona con ser o estar',
          pares: [
            { izquierda: 'Yo soy médico', derecha: 'Ser (profesión permanente)' },
            { izquierda: 'Yo estoy cansado', derecha: 'Estar (estado temporal)' },
            { izquierda: 'María está en casa', derecha: 'Estar (ubicación)' }
          ]
        }
      ],
      '3': [
        {
          tipo: 'opcion_multiple',
          pregunta: '¿Qué es el complemento directo?',
          opciones: [
            'A quién',
            'Qué cosa',
            'Dónde',
            'Cuándo'
          ],
          respuestaCorrecta: 1,
          explicacion: 'Complemento directo = qué cosa (respuesta a "¿qué?")',
          explicacionAr: 'المفعول به المباشر = ماذا (جواب "ماذا؟")'
        },
        {
          tipo: 'rellenar_huecos',
          enunciado: 'Completa: Yo doy un libro ______ María. (أنا أعطي كتاباً لماريا)',
          solucion: ['a']
        }
      ],
      '4': [
        {
          tipo: 'opcion_multiple',
          pregunta: '¿Qué tiempo verbal usamos para acciones terminadas en el pasado?',
          opciones: [
            'Pretérito imperfecto',
            'Pretérito perfecto',
            'Presente',
            'Futuro'
          ],
          respuestaCorrecta: 1,
          explicacion: 'Pretérito perfecto = acciones terminadas (ayer comí)',
          explicacionAr: 'الماضي التام = أفعال منتهية (أمس أكلت)'
        },
        {
          tipo: 'rellenar_huecos',
          enunciado: 'Completa: Ayer ______ paella. (أمس أكلت الباييلا)',
          solucion: ['comí']
        }
      ],
      '5': [
        {
          tipo: 'opcion_multiple',
          pregunta: '¿Qué significa "desde hace"?',
          opciones: [
            'Durante',
            'Desde cuándo',
            'Hasta',
            'Antes'
          ],
          respuestaCorrecta: 1,
          explicacion: '"desde hace" = desde cuándo (duración)',
          explicacionAr: '"desde hace" = منذ متى (المدة)'
        },
        {
          tipo: 'rellenar_huecos',
          enunciado: 'Completa: Vivo aquí ______ hace tres años. (أعيش هنا منذ ثلاث سنوات)',
          solucion: ['desde']
        }
      ]
    },
    B1: {
      '1': [
        {
          tipo: 'opcion_multiple',
          pregunta: '¿Qué palabra une dos frases en una subordinada?',
          opciones: ['y', 'que', 'pero', 'o'],
          respuestaCorrecta: 1,
          explicacion: '"que" une la frase principal con la subordinada',
          explicacionAr: '"que" تربط الجملة الرئيسية بالفرعية'
        },
        {
          tipo: 'rellenar_huecos',
          enunciado: 'Completa: Creo ______ tienes razón. (أعتقد أنك محق)',
          solucion: ['que']
        }
      ],
      '2': [
        {
          tipo: 'opcion_multiple',
          pregunta: '¿Cómo se forma una frase condicional?',
          opciones: [
            'Si + presente, futuro',
            'Si + pasado, presente',
            'Solo con "si"',
            'No se puede'
          ],
          respuestaCorrecta: 0,
          explicacion: 'Si + presente, futuro/imperativo. Ejemplo: "Si llueve, me quedo"',
          explicacionAr: 'Si + الحاضر، المستقبل/الأمر. مثال: "إذا أمطرت، سأبقى"'
        },
        {
          tipo: 'rellenar_huecos',
          enunciado: 'Completa: Si llueve, me ______ en casa. (إذا أمطرت، سأبقى في البيت)',
          solucion: ['quedo']
        }
      ],
      '3': [
        {
          tipo: 'opcion_multiple',
          pregunta: '¿Cómo se compara en español?',
          opciones: [
            'más...que',
            'muy...que',
            'mucho...que',
            'tan...que'
          ],
          respuestaCorrecta: 0,
          explicacion: 'más...que = más grande que (comparación de superioridad)',
          explicacionAr: 'más...que = أكبر من (مقارنة تفوق)'
        },
        {
          tipo: 'rellenar_huecos',
          enunciado: 'Completa: Madrid es más grande ______ Barcelona. (مدريد أكبر من برشلونة)',
          solucion: ['que']
        }
      ],
      '4': [
        {
          tipo: 'opcion_multiple',
          pregunta: '¿Cómo expresamos el futuro?',
          opciones: [
            'Solo con futuro simple',
            'Futuro simple o "ir a + infinitivo"',
            'Solo con presente',
            'No se puede'
          ],
          respuestaCorrecta: 1,
          explicacion: 'Futuro simple (iré) o "ir a + infinitivo" (voy a ir)',
          explicacionAr: 'المستقبل البسيط (iré) أو "ir a + المصدر" (voy a ir)'
        },
        {
          tipo: 'rellenar_huecos',
          enunciado: 'Completa: Mañana ______ al médico. (غداً سأذهب إلى الطبيب)',
          solucion: ['iré']
        }
      ],
      '5': [
        {
          tipo: 'opcion_multiple',
          pregunta: '¿Qué expresión usamos para dar opiniones?',
          opciones: [
            'Creo que',
            'Voy que',
            'Soy que',
            'Tengo que'
          ],
          respuestaCorrecta: 0,
          explicacion: '"Creo que" = أعتقد أن (expresión de opinión)',
          explicacionAr: '"Creo que" = أعتقد أن (تعبير عن الرأي)'
        },
        {
          tipo: 'rellenar_huecos',
          enunciado: 'Completa: Creo ______ es una buena idea. (أعتقد أنها فكرة جيدة)',
          solucion: ['que']
        }
      ]
    },
    B2: {
      '1': [
        {
          tipo: 'opcion_multiple',
          pregunta: '¿Cuándo usamos el subjuntivo?',
          opciones: [
            'Siempre',
            'Después de expresiones de emoción, duda, deseo',
            'Nunca',
            'Solo en preguntas'
          ],
          respuestaCorrecta: 1,
          explicacion: 'Subjuntivo después de: espero, dudo, es necesario, etc.',
          explicacionAr: 'صيغة التمني بعد: espero، dudo، es necesario، إلخ'
        },
        {
          tipo: 'rellenar_huecos',
          enunciado: 'Completa: Espero que ______ mañana. (أتمنى أن تأتي غداً)',
          solucion: ['vengas']
        }
      ],
      '2': [
        {
          tipo: 'opcion_multiple',
          pregunta: '¿Cómo se forma la voz pasiva?',
          opciones: [
            'ser + participio + por',
            'estar + participio',
            'haber + participio',
            'ir + participio'
          ],
          respuestaCorrecta: 0,
          explicacion: 'Voz pasiva = ser + participio pasado + por',
          explicacionAr: 'المبني للمجهول = ser + التصريف الثالث + por'
        },
        {
          tipo: 'rellenar_huecos',
          enunciado: 'Completa: El libro fue escrito ______ Cervantes. (الكتاب كُتب من قبل سيرفانتس)',
          solucion: ['por']
        }
      ],
      '3': [
        {
          tipo: 'opcion_multiple',
          pregunta: '¿Qué expresa el gerundio?',
          opciones: [
            'Acción terminada',
            'Acción en progreso o simultánea',
            'Acción futura',
            'Acción pasada'
          ],
          respuestaCorrecta: 1,
          explicacion: 'Gerundio (-ando, -iendo) = acción en progreso o simultánea',
          explicacionAr: 'المصدر الحالي (-ando، -iendo) = فعل قيد التنفيذ أو متزامن'
        },
        {
          tipo: 'rellenar_huecos',
          enunciado: 'Completa: Estoy estudiando ______. (أنا أدرس الإسبانية)',
          solucion: ['español']
        }
      ],
      '4': [
        {
          tipo: 'opcion_multiple',
          pregunta: '¿Cómo se usa el participio pasado?',
          opciones: [
            'Solo con haber',
            'Con haber (tiempos compuestos) o como adjetivo',
            'Solo como adjetivo',
            'No se usa'
          ],
          respuestaCorrecta: 1,
          explicacion: 'Participio = con haber (he terminado) o como adjetivo (cerrada)',
          explicacionAr: 'التصريف الثالث = مع haber (he terminado) أو كصفة (cerrada)'
        },
        {
          tipo: 'rellenar_huecos',
          enunciado: 'Completa: He terminado el ______. (لقد أنهيت العمل)',
          solucion: ['trabajo']
        }
      ],
      '5': [
        {
          tipo: 'opcion_multiple',
          pregunta: '¿Qué es el estilo indirecto?',
          opciones: [
            'Reproducir lo que alguien dijo',
            'Hablar directamente',
            'Preguntar',
            'Responder'
          ],
          respuestaCorrecta: 0,
          explicacion: 'Estilo indirecto = reproducir lo que alguien dijo (Dijo que vendría)',
          explicacionAr: 'الأسلوب غير المباشر = إعادة ما قاله شخص (Dijo que vendría)'
        },
        {
          tipo: 'rellenar_huecos',
          enunciado: 'Completa: Dijo que ______ mañana. (قال إنه سيأتي غداً)',
          solucion: ['vendría']
        }
      ]
    }
  };

  return ejerciciosPorLeccion[level]?.[leccionId] || [];
};

export default function AprendeComponerFrasesScreen() {
  const router = useRouter();
  const params = useLocalSearchParams();
  const rawNivel = Array.isArray(params.nivel) ? params.nivel[0] : params.nivel;
  
  const nivel = useMemo<LevelKey>(() => {
    const key = (rawNivel || 'A1').toString().toUpperCase();
    if (key === 'A1' || key === 'A2' || key === 'B1' || key === 'B2') {
      return key;
    }
    return 'A1';
  }, [rawNivel]);

  const lecciones = getLeccionesByLevel(nivel);
  const [leccionActual, setLeccionActual] = useState<number>(0);

  const leccion = lecciones[leccionActual];
  const esUltimaLeccion = leccionActual === lecciones.length - 1;
  const esPrimeraLeccion = leccionActual === 0;

  const siguienteLeccion = () => {
    if (!esUltimaLeccion) {
      setLeccionActual(leccionActual + 1);
    } else {
      Alert.alert(
        '¡Felicidades!',
        `Has completado todas las lecciones de nivel ${nivel} sobre cómo componer frases. ¡Sigue practicando!`,
        [
          { text: 'Volver al inicio', onPress: () => setLeccionActual(0) },
          { text: 'Salir', onPress: () => router.back() }
        ]
      );
    }
  };

  const anteriorLeccion = () => {
    if (!esPrimeraLeccion) {
      setLeccionActual(leccionActual - 1);
    }
  };

  return (
    <LinearGradient colors={['#000', '#000']} style={styles.container}>
      <ScrollView contentContainerStyle={styles.scrollContent}>
        {/* Header */}
        <View style={styles.header}>
          <TouchableOpacity
            style={styles.backButton}
            onPress={() => router.push('/(tabs)/A1_Acceso')}
          >
            <Ionicons name="arrow-back" size={24} color="#FFD700" />
          </TouchableOpacity>
          <View style={styles.headerContent}>
            <Ionicons name="book" size={32} color="#FFD700" />
            <Text style={styles.headerTitle}>Aprende a Componer Frases</Text>
            <Text style={styles.headerTitleAr}>تعلم تكوين الجمل</Text>
            <Text style={styles.headerSubtitle}>Nivel {nivel}</Text>
          </View>
        </View>

        {/* Indicador de progreso */}
        <View style={styles.progressContainer}>
          <Text style={styles.progressText}>
            Lección {leccionActual + 1} de {lecciones.length}
          </Text>
          <View style={styles.progressBar}>
            <View
              style={[
                styles.progressFill,
                { width: `${((leccionActual + 1) / lecciones.length) * 100}%` }
              ]}
            />
          </View>
        </View>

        {/* Contenido de la lección */}
        <View style={styles.lessonCard}>
          <Text style={styles.lessonTitle}>{leccion.titulo}</Text>
          <Text style={styles.lessonTitleAr}>{leccion.tituloAr}</Text>

          <View style={styles.explanationBox}>
            <Text style={styles.explanationLabel}>Explicación / الشرح:</Text>
            <Text style={styles.explanationText}>{leccion.explicacion}</Text>
            <Text style={styles.explanationTextAr}>{leccion.explicacionAr}</Text>
          </View>

          {/* Ejemplos */}
          <View style={styles.examplesContainer}>
            <Text style={styles.examplesTitle}>Ejemplos / أمثلة:</Text>
            {leccion.ejemplos.map((ejemplo, index) => (
              <View key={index} style={styles.exampleCard}>
                <View style={styles.exampleHeader}>
                  <Ionicons name="bulb" size={20} color="#000" />
                  <Text style={styles.exampleNumber}>Ejemplo {index + 1}</Text>
                </View>
                <View style={styles.exampleContent}>
                  <Text style={styles.exampleSpanish}>{ejemplo.espanol}</Text>
                  <Text style={styles.exampleArabic}>{ejemplo.arabe}</Text>
                  <View style={styles.exampleExplanation}>
                    <Text style={styles.exampleExplanationText}>{ejemplo.explicacion}</Text>
                    <Text style={styles.exampleExplanationTextAr}>{ejemplo.explicacionAr}</Text>
                  </View>
                </View>
              </View>
            ))}
          </View>

          {/* Ejercicios Interactivos */}
          <View style={styles.exercisesContainer}>
            <Text style={styles.exercisesTitle}>Ejercicios Prácticos / تمارين عملية:</Text>
            <EjerciciosInteractivos 
              ejercicios={getEjerciciosForLeccion(nivel, leccion.id)}
              onComplete={() => {
                Alert.alert(
                  '¡Excelente!',
                  'Has completado los ejercicios de esta lección. ¡Sigue practicando!',
                  [{ text: 'Continuar', style: 'default' }]
                );
              }}
              onProgressChange={() => {}}
            />
          </View>

          {/* Botones de navegación */}
          <View style={styles.navigationButtons}>
            <TouchableOpacity
              style={[styles.navButton, esPrimeraLeccion && styles.navButtonDisabled]}
              onPress={anteriorLeccion}
              disabled={esPrimeraLeccion}
            >
              <Ionicons name="chevron-back" size={20} color="#FFD700" />
              <Text style={styles.navButtonText}>Anterior</Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={styles.navButton}
              onPress={siguienteLeccion}
            >
              <Text style={styles.navButtonText}>
                {esUltimaLeccion ? 'Finalizar' : 'Siguiente'}
              </Text>
              <Ionicons name="chevron-forward" size={20} color="#FFD700" />
            </TouchableOpacity>
          </View>
        </View>
      </ScrollView>
    </LinearGradient>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  scrollContent: {
    paddingBottom: 40,
  },
  header: {
    padding: 20,
    paddingTop: 50,
    alignItems: 'center',
  },
  backButton: {
    position: 'absolute',
    left: 20,
    top: 50,
    zIndex: 10,
    backgroundColor: '#000',
    borderRadius: 20,
    padding: 8,
    borderWidth: 1,
    borderColor: '#FFD700',
  },
  headerContent: {
    alignItems: 'center',
  },
  headerTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#FFD700',
    marginTop: 10,
    textAlign: 'center',
  },
  headerTitleAr: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#FFD700',
    marginTop: 5,
    textAlign: 'center',
    writingDirection: 'rtl',
  },
  headerSubtitle: {
    fontSize: 16,
    color: '#FFD700',
    marginTop: 5,
    opacity: 0.9,
  },
  progressContainer: {
    paddingHorizontal: 20,
    marginBottom: 20,
  },
  progressText: {
    color: '#FFD700',
    fontSize: 14,
    marginBottom: 8,
    textAlign: 'center',
  },
  progressBar: {
    height: 6,
    backgroundColor: 'rgba(255,215,0,0.3)',
    borderRadius: 3,
    overflow: 'hidden',
  },
  progressFill: {
    height: '100%',
    backgroundColor: '#FFD700',
    borderRadius: 3,
  },
  lessonCard: {
    backgroundColor: '#fff',
    marginHorizontal: 20,
    borderRadius: 15,
    padding: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 8,
  },
  lessonTitle: {
    fontSize: 22,
    fontWeight: 'bold',
    color: '#000',
    marginBottom: 5,
    textAlign: 'center',
  },
  lessonTitleAr: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#000',
    marginBottom: 20,
    textAlign: 'center',
    writingDirection: 'rtl',
  },
  explanationBox: {
    backgroundColor: '#f0f8f0',
    padding: 15,
    borderRadius: 10,
    marginBottom: 20,
    borderRightWidth: 4,
    borderRightColor: '#9DC3AA',
  },
  explanationLabel: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#000',
    marginBottom: 10,
  },
  explanationText: {
    fontSize: 15,
    color: '#000',
    lineHeight: 22,
    marginBottom: 10,
  },
  explanationTextAr: {
    fontSize: 15,
    color: '#000',
    lineHeight: 22,
    textAlign: 'right',
    writingDirection: 'rtl',
  },
  examplesContainer: {
    marginTop: 10,
  },
  examplesTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#000',
    marginBottom: 15,
  },
  exampleCard: {
    backgroundColor: '#f9f9f9',
    borderRadius: 10,
    padding: 15,
    marginBottom: 15,
    borderLeftWidth: 4,
    borderLeftColor: '#9DC3AA',
  },
  exampleHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10,
  },
  exampleNumber: {
    fontSize: 14,
    fontWeight: 'bold',
    color: '#000',
    marginLeft: 8,
  },
  exampleContent: {
    marginTop: 5,
  },
  exampleSpanish: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#000',
    marginBottom: 8,
  },
  exampleArabic: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#000',
    marginBottom: 10,
    textAlign: 'right',
    writingDirection: 'rtl',
  },
  exampleExplanation: {
    backgroundColor: '#fff',
    padding: 10,
    borderRadius: 8,
    marginTop: 5,
  },
  exampleExplanationText: {
    fontSize: 14,
    color: '#000',
    fontStyle: 'italic',
    marginBottom: 5,
  },
  exampleExplanationTextAr: {
    fontSize: 14,
    color: '#000',
    fontStyle: 'italic',
    textAlign: 'right',
    writingDirection: 'rtl',
  },
  navigationButtons: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 30,
  },
  navButton: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#000',
    paddingVertical: 12,
    paddingHorizontal: 20,
    borderRadius: 25,
    flex: 0.48,
    justifyContent: 'center',
  },
  navButtonDisabled: {
    backgroundColor: '#333',
    opacity: 0.7,
  },
  navButtonText: {
    color: '#FFD700',
    fontSize: 16,
    fontWeight: 'bold',
    marginHorizontal: 5,
  },
  exercisesContainer: {
    marginTop: 30,
    backgroundColor: '#f9f9f9',
    borderRadius: 12,
    padding: 20,
    borderTopWidth: 3,
    borderTopColor: '#9DC3AA',
  },
  exercisesTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#000',
    marginBottom: 15,
    textAlign: 'center',
  },
});
