export type ArraigoTypeId = 'social' | 'laboral' | 'familiar' | 'formacion';

export interface ArraigoRequirement {
  id: string;
  title: string;
  description: string;
  mandatory?: boolean;
}

export interface ArraigoType {
  id: ArraigoTypeId;
  title: string;
  subtitle: string;
  summary: string;
  requirements: ArraigoRequirement[];
}

export const ARRAIGO_TYPES: ArraigoType[] = [
  {
    id: 'social',
    title: 'Arraigo Social',
    subtitle: 'Integración comunitaria y vínculos familiares',
    summary:
      'Actualizado 2026: exige 3 años de residencia continuada y acreditar integración (vínculo familiar o contrato).',
    requirements: [
      {
        id: 'social-residencia',
        title: 'Residencia continuada de 3 años',
        description: 'Certificado histórico de empadronamiento o pruebas fehacientes de permanencia continua.',
        mandatory: true,
      },
      {
        id: 'social-pasaporte',
        title: 'Pasaporte completo en vigor',
        description: 'Todas las páginas, incluidas las en blanco y las prórrogas.',
        mandatory: true,
      },
      {
        id: 'social-antecedentes',
        title: 'Antecedentes penales del país de origen',
        description: 'Legalizados/apostillados. También se requieren de terceros países donde se residió en los últimos 5 años.',
        mandatory: true,
      },
      {
        id: 'social-vinculos',
        title: 'Vínculo familiar o informe autonómico',
        description: 'Libro de familia, pareja registrada o informe de inserción social emitido por la Comunidad Autónoma.',
      },
      {
        id: 'social-contrato',
        title: 'Contrato o medios económicos',
        description: 'Oferta de empleo de al menos 30h/semana o combinación de contratos compatibles con el SMI.',
      },
      {
        id: 'social-informe',
        title: 'Informe de esfuerzo de integración',
        description: 'Cursos, certificados o participación comunitaria acreditada (recomendado).',
      },
    ],
  },
  {
    id: 'laboral',
    title: 'Arraigo Laboral',
    subtitle: 'Experiencia demostrable en España',
    summary:
      'Basado en la reforma de julio 2022 y actualizaciones DGM 2024: mínimo 2 años en España y relación laboral acreditada.',
    requirements: [
      {
        id: 'laboral-residencia',
        title: 'Residencia previa mínima de 2 años',
        description: 'Empadronamiento histórico o pruebas fehacientes continuas.',
        mandatory: true,
      },
      {
        id: 'laboral-pruebas',
        title: 'Prueba de relación laboral',
        description: 'Resolución/acta de la Inspección de Trabajo, sentencia o auto judicial que acredite al menos 6 meses de trabajo.',
        mandatory: true,
      },
      {
        id: 'laboral-vida-laboral',
        title: 'Informe de vida laboral o alta en Seguridad Social',
        description: 'Muestra periodos cotizados o alta en RETA/REGG en los últimos 2 años.',
        mandatory: true,
      },
      {
        id: 'laboral-antecedentes',
        title: 'Antecedentes penales del país de origen',
        description: 'Legalizados/apostillados con antigüedad máxima de 6 meses.',
        mandatory: true,
      },
      {
        id: 'laboral-pasaporte',
        title: 'Pasaporte completo',
        description: 'Incluye prórrogas y páginas en blanco.',
      },
    ],
  },
  {
    id: 'familiar',
    title: 'Arraigo Familiar',
    subtitle: 'Vínculos directos con españoles o residentes',
    summary:
      'Incluye progenitores de menor español, descendientes de españoles de origen y colaboradores de españoles dependientes.',
    requirements: [
      {
        id: 'familiar-vinculo',
        title: 'Documento que acredite el vínculo',
        description: 'Libro de familia, certificado literal de nacimiento o resolución de tutela.',
        mandatory: true,
      },
      {
        id: 'familiar-convivencia',
        title: 'Empadronamiento o convivencia acreditada',
        description: 'Certificado conjunto o informes municipales si conviven con el familiar español.',
      },
      {
        id: 'familiar-apoyos',
        title: 'Resolución de dependencia/tutela (si aplica)',
        description: 'Para cuidadores de españoles con discapacidad o grandes dependientes.',
      },
      {
        id: 'familiar-pasaporte',
        title: 'Pasaporte completo',
        description: 'Documento de viaje actualizado.',
        mandatory: true,
      },
      {
        id: 'familiar-antecedentes',
        title: 'Antecedentes penales del país de origen',
        description: 'Legalizados/apostillados emitidos en los últimos 6 meses.',
        mandatory: true,
      },
    ],
  },
  {
    id: 'formacion',
    title: 'Arraigo para la Formación',
    subtitle: 'Compromiso con estudios reglados',
    summary:
      'Permite regularizarse al comprometerse con formación oficial (certificados profesionales, FP o grados) de 6 a 24 meses.',
    requirements: [
      {
        id: 'formacion-residencia',
        title: 'Residencia continuada de 2 años',
        description: 'Empadronamiento histórico o documentación que pruebe permanencia en España.',
        mandatory: true,
      },
      {
        id: 'formacion-matricula',
        title: 'Preinscripción o matrícula en formación admitida',
        description: 'Certificado de profesionalidad, FP, grado universitario o curso homologado (≥200h).',
        mandatory: true,
      },
      {
        id: 'formacion-compromiso',
        title: 'Declaración de compromiso formativo',
        description: 'Documento firmado explicando el plan de estudios y calendario previsto.',
      },
      {
        id: 'formacion-antecedentes',
        title: 'Antecedentes penales del país de origen',
        description: 'Legalizados/apostillados, emitidos hace menos de 6 meses.',
        mandatory: true,
      },
      {
        id: 'formacion-medios',
        title: 'Medios económicos o carta de mantenimiento',
        description: 'Justifica cómo se costearán gastos de alojamiento y manutención durante los estudios.',
      },
      {
        id: 'formacion-seguro',
        title: 'Seguro médico o cobertura sanitaria',
        description: 'Recomendado para demostrar protección sanitaria durante el periodo formativo.',
      },
    ],
  },
];
