import React from 'react';

export const ejerciciosB1B2 = {
  Alimentacion: [
    {
      tipo: "opcion_multiple",
      pregunta: "¿Qué significa 'comida' en árabe? (ماذا تعني 'طعام' بالعربية؟)",
      opciones: ["طعام", "شراب", "فاكهة", "خضار"],
      respuestaCorrecta: 0,
      explicacion: "'Comida' significa 'طعام' en árabe",
      explicacionAr: "'طعام' تعني 'طعام' بالعربية"
    },
    {
      tipo: "opcion_multiple",
      pregunta: "¿Cuál es el plato típico de Valencia? (ما هو الطبق التقليدي لمدينة فالنسيا؟)",
      opciones: ["Paella", "Tortilla", "Gazpacho", "Fabada"],
      respuestaCorrecta: 0,
      explicacion: "La paella es el plato típico de Valencia",
      explicacionAr: "الباييا هي الطبق التقليدي لمدينة فالنسيا"
    },
    {
      tipo: "vocabulario",
      titulo: "Relaciona los alimentos con su traducción en árabe",
      pares: [
        {"izquierda": "Pan", "derecha": "خبز"},
        {"izquierda": "Leche", "derecha": "حليب"},
        {"izquierda": "Carne", "derecha": "لحم"},
        {"izquierda": "Pescado", "derecha": "سمك"},
        {"izquierda": "Arroz", "derecha": "أرز"}
      ]
    },
    {
      tipo: "vocabulario",
      titulo: "Relaciona las bebidas con su descripción",
      pares: [
        {"izquierda": "Agua", "derecha": "ماء"},
        {"izquierda": "Café", "derecha": "قهوة"},
        {"izquierda": "Té", "derecha": "شاي"},
        {"izquierda": "Zumo", "derecha": "عصير"}
      ]
    },
    {
      tipo: "opcion_multiple",
      pregunta: "¿Qué es importante para una alimentación saludable? (ما هو مهم للتغذية الصحية؟)",
      opciones: ["Comer solo dulces", "Comer solo carne", "Una dieta equilibrada", "Comer solo frutas"],
      respuestaCorrecta: 2,
      explicacion: "Una dieta equilibrada es fundamental para la salud",
      explicacionAr: "النظام الغذائي المتوازن أساسي للصحة"
    },
    {
      tipo: "reflexion",
      titulo: "Describe tu comida favorita (صف طعامك المفضل)",
      texto: "Escribe sobre tu comida favorita: qué es, por qué te gusta y cuándo la comes. (اكتب عن طعامك المفضل: ما هو، لماذا يعجبك، ومتى تأكله)"
    }
  ],

  Compras: [
    {
      tipo: "opcion_multiple",
      pregunta: "¿Qué significa 'tienda' en árabe? (ماذا تعني 'متجر' بالعربية؟)",
      opciones: ["متجر", "سوق", "مركز", "شارع"],
      respuestaCorrecta: 0,
      explicacion: "'Tienda' significa 'متجر' en árabe",
      explicacionAr: "'متجر' تعني 'متجر' بالعربية"
    },
    {
      tipo: "opcion_multiple",
      pregunta: "¿Dónde puedes comprar ropa? (أين يمكنك شراء الملابس؟)",
      opciones: ["En la panadería", "En la tienda de ropa", "En la farmacia", "En el banco"],
      respuestaCorrecta: 1,
      explicacion: "La tienda de ropa es donde se venden prendas",
      explicacionAr: "متجر الملابس هو المكان الذي تباع فيه الملابس"
    },
    {
      tipo: "vocabulario",
      titulo: "Relaciona los tipos de tiendas con su función",
      pares: [
        {"izquierda": "Panadería", "derecha": "خبز ومعجنات"},
        {"izquierda": "Farmacia", "derecha": "أدوية وعلاجات"},
        {"izquierda": "Librería", "derecha": "كتب ومجلات"},
        {"izquierda": "Joyería", "derecha": "مجوهرات وساعات"}
      ]
    },
    {
      tipo: "vocabulario",
      titulo: "Relaciona las acciones de compra con su significado",
      pares: [
        {"izquierda": "Comprar", "derecha": "شراء"},
        {"izquierda": "Vender", "derecha": "بيع"},
        {"izquierda": "Pagar", "derecha": "دفع"},
        {"izquierda": "Regatear", "derecha": "مساومة"}
      ]
    },
    {
      tipo: "opcion_multiple",
      pregunta: "¿Qué significa 'barato'? (ماذا تعني كلمة 'رخيص'؟)",
      opciones: ["Caro", "Barato", "Bonito", "Feo"],
      respuestaCorrecta: 1,
      explicacion: "'Barato' significa que cuesta poco dinero",
      explicacionAr: "'رخيص' تعني أنه يكلف القليل من المال"
    },
    {
      tipo: "reflexion",
      titulo: "Describe tu experiencia de compra (صف تجربة شرائك)",
      texto: "Escribe sobre una experiencia de compra: qué compraste, dónde y cómo te sentiste. (اكتب عن تجربة شراء: ماذا اشتريت، أين، وكيف شعرت)"
    }
  ],

  Tecnologia: [
    {
      tipo: "opcion_multiple",
      pregunta: "¿Qué significa 'tecnología' en árabe? (ماذا تعني 'تكنولوجيا' بالعربية؟)",
      opciones: ["تكنولوجيا", "علم", "هندسة", "رياضيات"],
      respuestaCorrecta: 0,
      explicacion: "'Tecnología' significa 'تكنولوجيا' en árabe",
      explicacionAr: "'تكنولوجيا' تعني 'تكنولوجيا' بالعربية"
    },
    {
      tipo: "opcion_multiple",
      pregunta: "¿Para qué sirve un smartphone? (لماذا يستخدم الهاتف الذكي؟)",
      opciones: ["Solo para llamar", "Para múltiples funciones", "Solo para escribir", "Solo para música"],
      respuestaCorrecta: 1,
      explicacion: "Un smartphone sirve para múltiples funciones",
      explicacionAr: "الهاتف الذكي يستخدم لعدة وظائف"
    },
    {
      tipo: "vocabulario",
      titulo: "Relaciona los dispositivos tecnológicos con su función",
      pares: [
        {"izquierda": "Ordenador", "derecha": "حاسوب"},
        {"izquierda": "Tablet", "derecha": "تابلت"},
        {"izquierda": "Auriculares", "derecha": "سماعات"},
        {"izquierda": "Cargador", "derecha": "شاحن"}
      ]
    },
    {
      tipo: "vocabulario",
      titulo: "Relaciona las aplicaciones con su uso",
      pares: [
        {"izquierda": "واتساب", "derecha": "رسائل ومكالمات"},
        {"izquierda": "يوتيوب", "derecha": "فيديوهات وموسيقى"},
        {"izquierda": "فيسبوك", "derecha": "شبكات اجتماعية"},
        {"izquierda": "خرائط جوجل", "derecha": "خرائط وملاحة"}
      ]
    },
    {
      tipo: "opcion_multiple",
      pregunta: "¿Qué es la inteligencia artificial? (ما هو الذكاء الاصطناعي؟)",
      opciones: ["Un tipo de robot", "Un programa de computadora", "La capacidad de las máquinas de aprender", "Un juego de video"],
      respuestaCorrecta: 2,
      explicacion: "La IA es la capacidad de las máquinas de aprender y resolver problemas",
      explicacionAr: "الذكاء الاصطناعي هو قدرة الآلات على التعلم وحل المشاكل"
    },
    {
      tipo: "reflexion",
      titulo: "Reflexiona sobre el uso de la tecnología (فكر في استخدام التكنولوجيا)",
      texto: "Escribe sobre cómo usas la tecnología en tu vida diaria y qué ventajas y desventajas tiene. (اكتب عن كيفية استخدامك للتكنولوجيا في حياتك اليومية وما هي مزاياها وعيوبها)"
    }
  ],

  Deportes: [
    {
      tipo: "opcion_multiple",
      pregunta: "¿Qué significa 'deporte' en árabe? (ماذا تعني 'رياضة' بالعربية؟)",
      opciones: ["رياضة", "لعب", "تمرين", "حركة"],
      respuestaCorrecta: 0,
      explicacion: "'Deporte' significa 'رياضة' en árabe",
      explicacionAr: "'رياضة' تعني 'رياضة' بالعربية"
    },
    {
      tipo: "opcion_multiple",
      pregunta: "¿Cuál es el deporte más popular en España? (ما هي الرياضة الأكثر شعبية في إسبانيا؟)",
      opciones: ["Baloncesto", "Fútbol", "Tenis", "Atletismo"],
      respuestaCorrecta: 1,
      explicacion: "El fútbol es el deporte más popular en España",
      explicacionAr: "كرة القدم هي الرياضة الأكثر شعبية في إسبانيا"
    },
    {
      tipo: "vocabulario",
      titulo: "Relaciona los deportes con su descripción",
      pares: [
        {"izquierda": "Fútbol", "derecha": "كرة القدم"},
        {"izquierda": "Baloncesto", "derecha": "كرة السلة"},
        {"izquierda": "Tenis", "derecha": "التنس"},
        {"izquierda": "Natación", "derecha": "السباحة"}
      ]
    },
    {
      tipo: "vocabulario",
      titulo: "Relaciona los beneficios del deporte con su descripción",
      pares: [
        {"izquierda": "Salud física", "derecha": "صحة بدنية"},
        {"izquierda": "Bienestar mental", "derecha": "رفاهية نفسية"},
        {"izquierda": "Socialización", "derecha": "تواصل اجتماعي"},
        {"izquierda": "Disciplina", "derecha": "انضباط"}
      ]
    },
    {
      tipo: "opcion_multiple",
      pregunta: "¿Cuántas veces por semana se recomienda hacer deporte? (كم مرة في الأسبوع يُنصح بممارسة الرياضة؟)",
      opciones: ["Una vez", "Dos veces", "Tres veces o más", "Nunca"],
      respuestaCorrecta: 2,
      explicacion: "Se recomienda hacer deporte al menos 3 veces por semana",
      explicacionAr: "يُنصح بممارسة الرياضة 3 مرات على الأقل في الأسبوع"
    },
    {
      tipo: "reflexion",
      titulo: "Describe tu deporte favorito (صف رياضتك المفضلة)",
      texto: "Escribe sobre tu deporte favorito: por qué te gusta, cuándo lo practicas y qué beneficios te aporta. (اكتب عن رياضتك المفضلة: لماذا تعجبك، متى تمارسها، وما الفوائد التي تقدمها لك)"
    }
  ],

  ProblemasSociales: [
    {
      tipo: "opcion_multiple",
      pregunta: "¿Qué significa 'problema social' en árabe? (ماذا تعني 'مشكلة اجتماعية' بالعربية؟)",
      opciones: ["مشكلة اجتماعية", "مشكلة شخصية", "مشكلة اقتصادية", "مشكلة سياسية"],
      respuestaCorrecta: 0,
      explicacion: "'Problema social' significa 'مشكلة اجتماعية' en árabe",
      explicacionAr: "'مشكلة اجتماعية' تعني 'مشكلة اجتماعية' بالعربية"
    },
    {
      tipo: "opcion_multiple",
      pregunta: "¿Cuál es un problema social común? (ما هي المشكلة الاجتماعية الشائعة؟)",
      opciones: ["Desigualdad", "Pobreza", "Prosperidad", "Discriminación"],
      respuestaCorrecta: 1,
      explicacion: "La pobreza es un problema social común en muchas sociedades",
      explicacionAr: "الفقر مشكلة اجتماعية شائعة في العديد من المجتمعات"
    },
    {
      tipo: "vocabulario",
      titulo: "Relaciona los problemas sociales con su descripción",
      pares: [
        {"izquierda": "Desigualdad", "derecha": "عدم مساواة"},
        {"izquierda": "Discriminación", "derecha": "تمييز"},
        {"izquierda": "Violencia", "derecha": "عنف"},
        {"izquierda": "Exclusión", "derecha": "إقصاء"}
      ]
    },
    {
      tipo: "vocabulario",
      titulo: "Relaciona las soluciones con los problemas",
      pares: [
        {"izquierda": "Educación", "derecha": "حل للجهل"},
        {"izquierda": "Trabajo", "derecha": "حل للفقر"},
        {"izquierda": "Diálogo", "derecha": "حل للصراع"},
        {"izquierda": "Inclusión", "derecha": "حل للتمييز"}
      ]
    },
    {
      tipo: "opcion_multiple",
      pregunta: "¿Qué significa 'sociedad' en árabe? (ماذا تعني 'مجتمع' بالعربية؟)",
      opciones: ["حكومة", "مجتمع", "اقتصاد", "سياسة"],
      respuestaCorrecta: 1,
      explicacion: "'Sociedad' significa 'مجتمع' en árabe",
      explicacionAr: "'مجتمع' تعني 'مجتمع' بالعربية"
    },
    {
      tipo: "reflexion",
      titulo: "Expresa tu opinión sobre un problema social (عبر عن رأيك حول مشكلة اجتماعية)",
      texto: "Expresa tu opinión sobre un problema social actual y propón una solución. (عبر عن رأيك حول مشكلة اجتماعية حالية واقترح حلاً)"
    }
  ],

  Salud: [
    {
      tipo: "opcion_multiple",
      pregunta: "¿Qué significa 'salud' en árabe? (ماذا تعني 'صحة' بالعربية؟)",
      opciones: ["صحة", "مرض", "علاج", "دواء"],
      respuestaCorrecta: 0,
      explicacion: "'Salud' significa 'صحة' en árabe",
      explicacionAr: "'صحة' تعني 'صحة' بالعربية"
    },
    {
      tipo: "opcion_multiple",
      pregunta: "¿Cuál de estos NO es un síntoma común? (أي من هذه ليس عرضًا شائعًا؟)",
      opciones: ["Fiebre", "Tos", "Alegría", "Dolor"],
      respuestaCorrecta: 2,
      explicacion: "La alegría no es un síntoma de enfermedad",
      explicacionAr: "الفرح ليس عرضًا للمرض"
    },
    {
      tipo: "vocabulario",
      titulo: "Relaciona las palabras médicas con su traducción",
      pares: [
        {"izquierda": "Médico", "derecha": "طبيب"},
        {"izquierda": "Enfermedad", "derecha": "مرض"},
        {"izquierda": "Hospital", "derecha": "مستشفى"},
        {"izquierda": "Farmacia", "derecha": "صيدلية"}
      ]
    },
    {
      tipo: "vocabulario",
      titulo: "Relaciona los síntomas con su descripción",
      pares: [
        {"izquierda": "Fiebre", "derecha": "حمى"},
        {"izquierda": "Dolor", "derecha": "ألم"},
        {"izquierda": "Tos", "derecha": "سعال"},
        {"izquierda": "Fatiga", "derecha": "إرهاق"}
      ]
    },
    {
      tipo: "opcion_multiple",
      pregunta: "¿Qué significa 'farmacia' en árabe? (ماذا تعني 'صيدلية' بالعربية؟)",
      opciones: ["مستشفى", "طبيب", "صيدلية", "مرض"],
      respuestaCorrecta: 2,
      explicacion: "'Farmacia' significa 'صيدلية' en árabe",
      explicacionAr: "'صيدلية' تعني 'صيدلية' بالعربية"
    },
    {
      tipo: "reflexion",
      titulo: "Describe cómo te sientes cuando estás enfermo (صف كيف تشعر عندما تكون مريضًا)",
      texto: "Describe cómo te sientes cuando estás enfermo y qué haces para mejorar. (صف كيف تشعر عندما تكون مريضًا وماذا تفعل لتتحسن)"
    }
  ]
};

// Función para obtener ejercicios por unidad
export const getEjerciciosPorUnidad = (unidad: string) => {
  return ejerciciosB1B2[unidad as keyof typeof ejerciciosB1B2] || [];
};