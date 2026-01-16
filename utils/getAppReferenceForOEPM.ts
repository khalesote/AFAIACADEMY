/**
 * Script para obtener la referencia alfanumérica de la aplicación para OEPM
 * 
 * USO:
 * Importa esta función y llámala para obtener la referencia única de tu aplicación
 * que necesitas para el registro en la Oficina Española de Patentes y Marcas (OEPM)
 */

import { getAppReference, formatAppReference, getAppReferenceInfo } from './appReference';

/**
 * Obtiene la referencia alfanumérica de la aplicación para registro en OEPM
 * 
 * @returns Promise<string> - Referencia alfanumérica única (ej: ACAD-A3B7-9F2C-4D8E-1G5H)
 * 
 * @example
 * ```typescript
 * const reference = await getAppReferenceForOEPM();
 * console.log('Referencia para OEPM:', reference);
 * // Output: ACAD-A3B7-9F2C-4D8E-1G5H
 * ```
 */
export async function getAppReferenceForOEPM(): Promise<string> {
  const reference = await getAppReference();
  return reference;
}

/**
 * Obtiene la referencia formateada para mostrar en documentos
 * 
 * @returns Promise<string> - Referencia formateada (ej: ACAD - A3B7 - 9F2C - 4D8E - 1G5H)
 */
export async function getFormattedAppReferenceForOEPM(): Promise<string> {
  const reference = await getAppReference();
  return formatAppReference(reference, true);
}

/**
 * Obtiene información completa de la referencia para documentación
 */
export async function getAppReferenceInfoForOEPM() {
  return await getAppReferenceInfo();
}

// Exportar también las funciones principales para uso directo
export { getAppReference, formatAppReference, getAppReferenceInfo } from './appReference';


















































