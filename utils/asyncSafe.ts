export interface AsyncSafeOptions {
  context?: string;
  onError?: (error: unknown) => void;
}

/**
 * Ejecuta un import o promesa diferida y captura errores, devolviendo `null` en caso de falla.
 */
export async function asyncSafe<T>(loader: () => Promise<T>, options: AsyncSafeOptions = {}): Promise<T | null> {
  const { context, onError } = options;
  try {
    return await loader();
  } catch (error) {
    if (onError) {
      onError(error);
    } else {
      const label = context ? `[asyncSafe:${context}]` : '[asyncSafe]';
      console.warn(`${label} Error al cargar recurso diferido.`, error);
    }
    return null;
  }
}
