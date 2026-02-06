export type ArraigoTypeId = 'social' | 'laboral' | 'familiar' | 'formacion';

export interface ArraigoRequirement {
  id: string;
  title: string;
  description: string;
  titleAr?: string;
  descriptionAr?: string;
  mandatory?: boolean;
}

export interface ArraigoType {
  id: ArraigoTypeId;
  title: string;
  subtitle: string;
  summary: string;
  titleAr?: string;
  subtitleAr?: string;
  summaryAr?: string;
  requirements: ArraigoRequirement[];
}

export const ARRAIGO_TYPES: ArraigoType[] = [
  {
    id: 'social',
    title: 'Arraigo Social',
    subtitle: 'Integración comunitaria y vínculos familiares',
    summary:
      'Actualizado 2026 (fuentes oficiales mayo 2025): exige 2 años de residencia continuada y acreditar integración mediante vínculo familiar con residente legal y medios económicos o informe de integración social.',
    titleAr: 'الإقامة بسبب الجذور الاجتماعية',
    subtitleAr: 'الاندماج المجتمعي والروابط الأسرية',
    summaryAr:
      'محدّث 2026 (مصادر رسمية مايو 2025): يتطلب سنتين من الإقامة المتواصلة وإثبات الاندماج عبر روابط أسرية مع مقيم قانوني ووسائل مالية كافية أو تقرير الاندماج الاجتماعي.',
    requirements: [
      {
        id: 'social-residencia',
        title: 'Permanencia continuada de 2 años',
        description: 'Empadronamiento histórico u otras pruebas. Ausencias no superiores a 90 días.',
        titleAr: 'الإقامة المتواصلة لمدة سنتين',
        descriptionAr: 'شهادة السكن التاريخية أو أدلة أخرى. الغياب لا يتجاوز 90 يوماً.',
        mandatory: true,
      },
      {
        id: 'social-pasaporte',
        title: 'Pasaporte completo en vigor',
        description: 'Todas las páginas, incluidas las en blanco y las prórrogas.',
        titleAr: 'جواز سفر ساري وكامل',
        descriptionAr: 'جميع الصفحات بما فيها الفارغة والتمديدات.',
        mandatory: true,
      },
      {
        id: 'social-antecedentes',
        title: 'Antecedentes penales del país de origen',
        description: 'Legalizados/apostillados. Incluye países donde se residió en los últimos 5 años.',
        titleAr: 'سجل عدلي من بلد الأصل',
        descriptionAr: 'مصدّق/مُقَيَّد، ويشمل البلدان التي أقمت فيها خلال آخر 5 سنوات.',
        mandatory: true,
      },
      {
        id: 'social-vinculos',
        title: 'Vínculos familiares con residente legal',
        description: 'Cónyuge/pareja registrada o familiares en primer grado con residencia legal.',
        titleAr: 'روابط أسرية مع مقيم قانوني',
        descriptionAr: 'زوج/زوجة أو شريك مسجّل أو أقارب من الدرجة الأولى بإقامة قانونية.',
      },
      {
        id: 'social-contrato',
        title: 'Medios económicos suficientes',
        description: 'Debe alcanzarse al menos el 200% del IPREM (100% familiar + 100% solicitante).',
        titleAr: 'وسائل مالية كافية',
        descriptionAr: 'يشترط بلوغ 200% من مؤشر IPREM (100% للمقيم + 100% للطالب).',
      },
      {
        id: 'social-informe',
        title: 'Informe de integración social',
        description: 'Emitido por la Comunidad Autónoma o Ayuntamiento cuando no hay vínculos familiares.',
        titleAr: 'تقرير الاندماج الاجتماعي',
        descriptionAr: 'تصدره الجهة الإقليمية أو البلدية عند عدم وجود روابط أسرية.',
      },
    ],
  },
  {
    id: 'laboral',
    title: 'Arraigo Laboral',
    subtitle: 'Experiencia demostrable en España',
    summary:
      'Actualizado 2026 (fuentes oficiales mayo 2025): exige 2 años en España y contratos que sumen ≥20h/semana con salario SMI proporcional.',
    titleAr: 'الإقامة بسبب الجذور العمالية',
    subtitleAr: 'خبرة عمل موثّقة داخل إسبانيا',
    summaryAr:
      'محدّث 2026 (مصادر رسمية مايو 2025): يشترط سنتين في إسبانيا وعقود عمل مجموعها لا يقل عن 20 ساعة أسبوعياً مع أجر مطابق للحد الأدنى.',
    requirements: [
      {
        id: 'laboral-residencia',
        title: 'Residencia continuada mínima de 2 años',
        description: 'Empadronamiento histórico o pruebas continuas; ausencias ≤ 90 días.',
        titleAr: 'إقامة متواصلة لمدة سنتين',
        descriptionAr: 'شهادة سكن تاريخية أو أدلة مستمرة؛ الغياب ≤ 90 يوماً.',
        mandatory: true,
      },
      {
        id: 'laboral-pruebas',
        title: 'Contratos de trabajo (≥20h/semana)',
        description: 'Uno o varios contratos con salario proporcional al SMI y jornada global ≥20h.',
        titleAr: 'عقود عمل (≥20 ساعة أسبوعياً)',
        descriptionAr: 'عقد واحد أو عدة عقود بأجر متناسب مع الحد الأدنى وبمجموع ≥20 ساعة.',
        mandatory: true,
      },
      {
        id: 'laboral-vida-laboral',
        title: 'Vida laboral o alta en Seguridad Social',
        description: 'Documentación que acredite periodos de trabajo o alta laboral.',
        titleAr: 'بيان الحياة العملية أو التسجيل في الضمان الاجتماعي',
        descriptionAr: 'وثائق تثبت فترات العمل أو التسجيل.',
      },
      {
        id: 'laboral-antecedentes',
        title: 'Antecedentes penales del país de origen',
        description: 'Legalizados/apostillados emitidos en los últimos 5 años de residencia.',
        titleAr: 'سجل عدلي من بلد الأصل',
        descriptionAr: 'مصدّق/مُقَيَّد للبلدان التي أقمت فيها خلال آخر 5 سنوات.',
        mandatory: true,
      },
      {
        id: 'laboral-pasaporte',
        title: 'Pasaporte completo',
        description: 'Incluye prórrogas y páginas en blanco.',
        titleAr: 'جواز سفر كامل',
        descriptionAr: 'يشمل التمديدات والصفحات الفارغة.',
        mandatory: true,
      },
    ],
  },
  {
    id: 'familiar',
    title: 'Arraigo Familiar',
    subtitle: 'Vínculos directos con españoles o residentes',
    summary:
      'Actualizado 2026 (fuentes oficiales mayo 2025): para progenitores/tutores de menor UE/EEE/Suiza o cuidadores de personas con discapacidad de esos países, sin permanencia mínima.',
    titleAr: 'الإقامة بسبب الجذور العائلية',
    subtitleAr: 'روابط مباشرة مع مواطني الاتحاد أو المقيمين',
    summaryAr:
      'محدّث 2026 (مصادر رسمية مايو 2025): للوالدين/الأوصياء على قاصر من الاتحاد/المنطقة الاقتصادية/سويسرا أو مقدمي الدعم لشخص ذي إعاقة منهم، دون حد أدنى للإقامة.',
    requirements: [
      {
        id: 'familiar-vinculo',
        title: 'Documento que acredite el vínculo',
        description: 'Libro de familia, certificado literal de nacimiento o resolución de tutela.',
        titleAr: 'وثيقة تثبت صلة القرابة',
        descriptionAr: 'دفتر العائلة أو شهادة ميلاد كاملة أو قرار وصاية.',
        mandatory: true,
      },
      {
        id: 'familiar-convivencia',
        title: 'Convivencia, custodia o apoyo acreditado',
        description: 'Acreditar convivencia con el menor o el cuidado de la persona con discapacidad.',
        titleAr: 'إثبات السكن أو الحضانة أو الدعم',
        descriptionAr: 'إثبات السكن مع القاصر أو رعاية الشخص ذي الإعاقة.',
      },
      {
        id: 'familiar-apoyos',
        title: 'Resolución de dependencia o apoyo (si aplica)',
        description: 'Para cuidadores de personas con discapacidad que requieren apoyo.',
        titleAr: 'قرار الاعتماد/الدعم (إن وجد)',
        descriptionAr: 'لمن يقدمون الرعاية لشخص ذي إعاقة يحتاج دعماً.',
      },
      {
        id: 'familiar-pasaporte',
        title: 'Pasaporte completo',
        description: 'Documento de viaje actualizado.',
        titleAr: 'جواز سفر كامل',
        descriptionAr: 'وثيقة سفر سارية ومحدثة.',
        mandatory: true,
      },
      {
        id: 'familiar-antecedentes',
        title: 'Antecedentes penales del país de origen',
        description: 'Legalizados/apostillados de los últimos 5 años de residencia.',
        titleAr: 'سجل عدلي من بلد الأصل',
        descriptionAr: 'مصدّق/مُقَيَّد للبلدان التي أقمت فيها خلال آخر 5 سنوات.',
        mandatory: true,
      },
    ],
  },
  {
    id: 'formacion',
    title: 'Arraigo para la Formación',
    subtitle: 'Compromiso con estudios reglados',
    summary:
      'Actualizado 2026 (fuentes oficiales mayo 2025): exige 2 años continuados y matrícula o compromiso en formación oficial con informe de integración social.',
    titleAr: 'الإقامة من أجل التكوين',
    subtitleAr: 'الالتزام بالدراسة أو التكوين المهني',
    summaryAr:
      'محدّث 2026 (مصادر رسمية مايو 2025): يتطلب سنتين من الإقامة المتواصلة مع تسجيل أو التزام بتكوين رسمي وتقرير اندماج اجتماعي.',
    requirements: [
      {
        id: 'formacion-residencia',
        title: 'Residencia continuada de 2 años',
        description: 'Empadronamiento histórico; ausencias no superiores a 90 días.',
        titleAr: 'إقامة متواصلة لمدة سنتين',
        descriptionAr: 'شهادة سكن تاريخية؛ الغياب لا يتجاوز 90 يوماً.',
        mandatory: true,
      },
      {
        id: 'formacion-matricula',
        title: 'Matrícula o compromiso de formación admitida',
        description: 'FP, certificados profesionales, educación adultos u otras formaciones oficiales admitidas.',
        titleAr: 'تسجيل أو التزام بتكوين معترف به',
        descriptionAr: 'FP، شهادات مهنية، تعليم الكبار أو تكوين رسمي معتمد.',
        mandatory: true,
      },
      {
        id: 'formacion-compromiso',
        title: 'Informe de integración social',
        description: 'Emitido por la Comunidad Autónoma o Ayuntamiento.',
        titleAr: 'تقرير الاندماج الاجتماعي',
        descriptionAr: 'صادر عن الجهة الإقليمية أو البلدية.',
        mandatory: true,
      },
      {
        id: 'formacion-antecedentes',
        title: 'Antecedentes penales del país de origen',
        description: 'Legalizados/apostillados de los últimos 5 años de residencia.',
        titleAr: 'سجل عدلي من بلد الأصل',
        descriptionAr: 'مصدّق/مُقَيَّد للبلدان التي أقمت فيها خلال آخر 5 سنوات.',
        mandatory: true,
      },
      {
        id: 'formacion-medios',
        title: 'Compromiso o plan formativo',
        description: 'Documento firmado con el plan de estudios y calendario previsto.',
        titleAr: 'خطة أو التزام تكويني',
        descriptionAr: 'وثيقة موقعة تتضمن خطة الدراسة والمدة المتوقعة.',
      },
      {
        id: 'formacion-seguro',
        title: 'Medios económicos o seguro médico',
        description: 'Justifica sostenimiento y cobertura sanitaria durante el periodo formativo.',
        titleAr: 'وسائل مالية أو تأمين صحي',
        descriptionAr: 'إثبات القدرة على تغطية المعيشة والتأمين الصحي.',
      },
    ],
  },
];

export const REGULARIZACION_INFO = {
  title: 'Regularización extraordinaria 2026',
  summary: 'Proceso en trámite (audiencia pública enero 2026).',
  bullets: [
    'Autorización de residencia con habilitación para trabajar en todo el territorio.',
    'Permanencia continuada mínima: 5 meses en el momento de la solicitud.',
    'Haber residido en España antes del 31 de diciembre de 2025.',
    'Ventana prevista: inicio abril 2026 hasta 30 de junio de 2026.',
  ],
  note: 'La norma definitiva puede cambiar tras la tramitación.',
  titleAr: 'التسوية الاستثنائية 2026',
  summaryAr: 'إجراء قيد المشاورات العامة (يناير 2026).',
  bulletsAr: [
    'تصريح إقامة مع السماح بالعمل في جميع أنحاء إسبانيا.',
    'إقامة متواصلة لا تقل عن 5 أشهر عند تقديم الطلب.',
    'الإقامة في إسبانيا قبل 31 ديسمبر 2025.',
    'النافذة المتوقعة: بداية أبريل 2026 حتى 30 يونيو 2026.',
  ],
  noteAr: 'قد تتغير القواعد النهائية بعد استكمال الإجراءات.',
};
