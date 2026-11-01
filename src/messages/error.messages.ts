import { ErrorCode } from '@/types/ErrorCode';

type Locale = 'es';

const errorMessages: Record<Locale, Record<ErrorCode, string>> = {
  es: {
    [ErrorCode.AUTH_REQUIRED]: 'Se requiere iniciar sesión',
    [ErrorCode.AUTH_INVALID]: 'Error en el formato de los datos de acceso',
    [ErrorCode.INVALID_CREDENTIALS]: 'Correo o contraseña incorrectos',
    [ErrorCode.TOKEN_EXPIRED]: 'La sesión ha expirado',
    [ErrorCode.TOKEN_INVALID]: 'Error en la sesión de usuario',
    [ErrorCode.NOT_FOUND]: 'Recurso no encontrado',
    [ErrorCode.ALREADY_APPLIED]: 'Ya te postulaste a esta vacante',
    [ErrorCode.ALREADY_FAVORITED]: 'La vacante ya está en favoritos',
    [ErrorCode.VALIDATION_ERROR]: 'Los datos enviados no son válidos',
    [ErrorCode.INTERNAL_ERROR]: 'Error interno del servidor',
    [ErrorCode.NETWORK_ERROR]: 'No pudimos conectar con el servidor',
    [ErrorCode.INVALID_RESPONSE]: 'El servidor devolvió una respuesta inválida',
    [ErrorCode.HTTP_ERROR]: 'No pudimos completar la solicitud',
    [ErrorCode.NOTIFICATIONS_DISABLED]:
      'Activa el permiso de notificaciones en los ajustes del dispositivo',
    [ErrorCode.NOTIFICATIONS_UNAVAILABLE]:
      'Las notificaciones requieren la versión de desarrollo de la app para Android o iOS',
  },
};

function getErrorMessage(code: ErrorCode, locale: Locale = 'es'): string {
  return errorMessages[locale][code];
}

export { getErrorMessage };
export type { Locale };
