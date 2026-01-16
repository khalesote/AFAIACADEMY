import { userStorage, User } from './userDatabase';

export type FormUserPayload = {
  nombre: string;
  apellido1: string;
  apellido2?: string;
  email: string;
  telefono?: string;
  provincia?: string;
  tipoDocumento?: string;
  documento?: string;
  fechaNacimiento?: string;
  matriculado?: boolean;
  matriculadoEscuela?: boolean;
  nivelMatricula?: string | null;
};

export async function saveFormUser(payload: FormUserPayload): Promise<User> {
  const existing = await userStorage.getCurrentUser();
  const now = new Date().toISOString();

  const firstName = payload.nombre.trim();
  const lastName = [payload.apellido1, payload.apellido2].filter(Boolean).join(' ').trim();

  const user: User = {
    id: existing?.id ?? Date.now(),
    firstName,
    lastName,
    email: payload.email.trim().toLowerCase(),
    password: existing?.password ?? '',
    role: existing?.role ?? 'user',
    createdAt: existing?.createdAt ?? now,
    lastLogin: existing?.lastLogin ?? now,
    progress: existing?.progress ?? {
      nivelActual: 'A1',
      puntuacionTotal: 0,
      unidadesCompletadas: 0,
      tiempoEstudio: 0,
    },
    preferences: existing?.preferences ?? {
      idioma: 'es',
      notificaciones: true,
      tema: 'light',
    },
    matriculado: payload.matriculado ?? existing?.matriculado ?? false,
    matriculado_escuela_virtual:
      payload.matriculadoEscuela ?? existing?.matriculado_escuela_virtual ?? false,
    nivelMatricula: payload.nivelMatricula ?? existing?.nivelMatricula ?? null,
    telefono: payload.telefono ?? existing?.telefono,
    provincia: payload.provincia ?? existing?.provincia,
    documento: payload.documento ?? existing?.documento,
    tipoDocumento: payload.tipoDocumento ?? existing?.tipoDocumento,
    fechaNacimiento: payload.fechaNacimiento ?? existing?.fechaNacimiento,
  };

  await userStorage.saveCurrentUser(user);
  return user;
}
