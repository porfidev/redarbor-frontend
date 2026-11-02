## Requerimientos

- Node.js 24.3 o superior dentro de la rama 24, compatible con Expo 58 y el backend.
- npm, incluido con Node.js.
- Backend configurado y en ejecución; consulta su [README](../backend/README.md).
- Navegador para web; Android Studio y Android SDK para compilar Android localmente.
- macOS y Xcode para compilar iOS localmente.
- Una compilación de desarrollo propia para probar las notificaciones de Notifee.

## Dependencias

| Librería                                    | Descripción                                                          |
| ------------------------------------------- | -------------------------------------------------------------------- |
| `expo`                                      | Herramientas y módulos para ejecutar la aplicación multiplataforma.  |
| `react`                                     | Componentes, hooks y actualización de la interfaz.                   |
| `react-native`                              | Componentes y capacidades nativas de Android e iOS.                  |
| `react-dom`                                 | Renderizado de React en el navegador.                                |
| `react-native-web`                          | Adaptación de componentes nativos para web.                          |
| `expo-router`                               | Navegación por archivos, pestañas y rutas de deep linking.           |
| `@tanstack/react-query`                     | Consultas, caché, paginación, prefetch y mutaciones optimistas.      |
| `zustand`                                   | Estado compartido de sesión y detalle de vacantes.                   |
| `@react-native-async-storage/async-storage` | Persistencia local de sesión y enlaces de notificaciones pendientes. |
| `zod`                                       | Validación de entradas, respuestas HTTP y configuración.             |
| `@shopify/flash-list`                       | Listas de vacantes con reciclaje de componentes.                     |
| `@gorhom/bottom-sheet`                      | Panel de detalle y selección de filtros.                             |
| `react-native-gesture-handler`              | Reconocimiento de gestos y swipe.                                    |
| `react-native-reanimated`                   | Animaciones del panel y transiciones entre vacantes.                 |
| `react-native-worklets`                     | Ejecución de worklets y comunicación con el hilo de JavaScript.      |
| `react-native-safe-area-context`            | Márgenes seguros según el dispositivo.                               |
| `react-native-screens`                      | Soporte nativo para pantallas de navegación.                         |
| `@notifee/react-native`                     | Notificaciones locales y eventos al pulsarlas.                       |
| `expo-dev-client`                           | Cliente de desarrollo con las dependencias nativas del proyecto.     |
| `expo-constants`                            | Acceso a la configuración de Expo y URL de la API.                   |
| `expo-device`                               | Información del dispositivo.                                         |
| `expo-linking`                              | Utilidades para enlaces y apertura de URLs.                          |
| `expo-font`                                 | Carga de fuentes.                                                    |
| `@expo-google-fonts/plus-jakarta-sans`      | Tipografía utilizada por la interfaz.                                |
| `@expo/vector-icons`                        | Iconos de la aplicación.                                             |
| `expo-image`                                | Presentación de imágenes.                                            |
| `expo-splash-screen`                        | Control de la pantalla de inicio.                                    |
| `expo-status-bar`                           | Configuración de la barra de estado.                                 |
| `expo-system-ui`                            | Integración visual con la interfaz del sistema.                      |
| `expo-web-browser`                          | Apertura de enlaces en el navegador.                                 |
| `expo-symbols`                              | Símbolos de interfaz según la plataforma.                            |
| `expo-glass-effect`                         | Componentes con efecto visual de vidrio.                             |
| `@expo/ui`                                  | Componentes de interfaz nativa integrados con Expo.                  |

### Desarrollo

| Librería                        | Descripción                                           |
| ------------------------------- | ----------------------------------------------------- |
| `typescript`                    | Comprobación estática de tipos.                       |
| `@types/react`                  | Definiciones de tipos para React.                     |
| `eslint`                        | Detección de errores y prácticas problemáticas.       |
| `eslint-config-expo`            | Reglas de análisis estático para Expo y React Native. |
| `eslint-config-prettier`        | Desactiva reglas incompatibles con Prettier.          |
| `prettier`                      | Formato consistente del código.                       |
| `jest`                          | Ejecución de pruebas automatizadas.                   |
| `jest-expo`                     | Entorno de pruebas adaptado a Expo.                   |
| `@types/jest`                   | Definiciones de tipos para Jest.                      |
| `@testing-library/react-native` | Pruebas de componentes e interacciones.               |
| `react-test-renderer`           | Soporte para renderizado de componentes en pruebas.   |

Las herramientas de pruebas siguen instaladas, pero actualmente no hay archivos de tests en `src/`.

## Instalación y ejecución

1. Instala las dependencias y prepara la configuración local.

   ```sh
   cd frontend
   npm ci
   cp .env.example .env
   ```

2. Configura la URL del backend según dónde ejecutes la aplicación.

   ```dotenv
   API_BASE_URL=http://10.0.2.2:3000
   ```

   | Entorno                               | URL del backend                            |
   | ------------------------------------- | ------------------------------------------ |
   | Emulador Android estándar             | `http://10.0.2.2:3000`                     |
   | Simulador iOS en la misma computadora | `http://localhost:3000`                    |
   | Navegador en la misma computadora     | `http://localhost:3000`                    |
   | Dispositivo físico                    | `http://<IP_LOCAL_DE_TU_COMPUTADORA>:3000` |

   En un dispositivo físico, la API debe ser accesible desde su red. Para web, configura `CORS_ORIGINS` del backend con el origen que indique Expo, normalmente `http://localhost:8081`.

   `app.config.ts` incorpora la URL en la configuración pública de la aplicación; no coloques secretos en esta variable. `.env` está excluido de Git.

3. Inicia el backend siguiendo su [documentación](../backend/README.md).

4. Ejecuta el frontend en web o inicia el servidor de desarrollo.

   ```sh
   npm run web
   ```

   ```sh
   npm start
   ```

   Para probar el flujo nativo completo, instala primero una compilación de desarrollo como se indica a continuación.

## Compilación de desarrollo nativa

Notifee requiere código nativo que no está incluido en Expo Go. Las notificaciones deben probarse en una compilación propia; en web se puede comprobar el destino del enlace desde la pantalla de notificaciones.

Compila e instala la aplicación con las herramientas locales de la plataforma:

```sh
npm run android
```

En macOS, para iOS:

```sh
npm run ios
```

Después de instalar la compilación, puedes iniciar explícitamente el servidor para el cliente de desarrollo:

```sh
npm start -- --dev-client
```

También existe el perfil `development` en `eas.json` para compilaciones con EAS. Requiere configurar la cuenta y las credenciales de la plataforma:

```sh
npx eas-cli@latest build --profile development --platform android
```

Consulta la [guía oficial de development builds](https://docs.expo.dev/develop/development-builds/introduction/). Los directorios nativos generados `android/` e `ios/` están excluidos de Git; la configuración se mantiene en `app.json` y `app.config.ts`.

## Desarrollo

Ejecuta los scripts desde `frontend`.

| Script                  | Descripción                                                                                  |
| ----------------------- | -------------------------------------------------------------------------------------------- |
| `npm start`             | Inicia el servidor de desarrollo de Expo.                                                    |
| `npm run web`           | Inicia la aplicación para navegador.                                                         |
| `npm run android`       | Compila e instala la aplicación Android localmente.                                          |
| `npm run ios`           | Compila e instala la aplicación iOS localmente.                                              |
| `npm run build:android` | Alias de la compilación local de Android; no genera una publicación de tienda.               |
| `npm run build:ios`     | Alias de la compilación local de iOS; no genera una publicación de tienda.                   |
| `npm run typecheck`     | Comprueba tipos sin generar archivos compilados.                                             |
| `npm run lint`          | Revisa el código y falla ante errores o advertencias.                                        |
| `npm run lint:fix`      | Aplica correcciones automáticas de ESLint.                                                   |
| `npm run format`        | Aplica formato con Prettier.                                                                 |
| `npm run format:check`  | Comprueba el formato sin modificar archivos.                                                 |
| `npm run check`         | Ejecuta tipos, lint y comprobación de formato.                                               |
| `npm test`              | Ejecuta Jest; actualmente no encontrará tests en `src/`.                                     |
| `npm run test:watch`    | Inicia Jest en modo de observación.                                                          |
| `npm run reset-project` | Reorganiza la plantilla inicial; revisa el script antes de ejecutarlo sobre esta aplicación. |

Reinicia Expo después de cambiar `.env`. Para agregar dependencias compatibles con el SDK, utiliza `npx expo install <paquete>`.

## Verificación manual

| Flujo          | Qué comprobar                                                                             |
| -------------- | ----------------------------------------------------------------------------------------- |
| Sesión         | Login correcto e incorrecto, restauración al reiniciar y cierre de sesión.                |
| Búsqueda       | Texto, ciudad, salarios, ordenamiento, paginación y resultados vacíos.                    |
| Detalle        | Apertura del panel, expansión, swipe y posición de la lista al cerrar.                    |
| Postulaciones  | Actualización inmediata, confirmación del servidor y errores.                             |
| Favoritos      | Agregar, quitar y restaurar el estado cuando falle una operación.                         |
| Notificaciones | Permisos, envío local inmediato y programación desde la pantalla de notificaciones.       |
| Deep linking   | Abrir `occ://vacante/<id>` con la aplicación abierta y cerrada en una compilación nativa. |
| Conectividad   | API desconectada, errores de carga y botones de reintento.                                |

- Credenciales mock del backend: `test@occ.com.mx` / `Test1234`.
- La pantalla de notificaciones permite simular una notificación y programarla en 10 segundos; son notificaciones locales, no un servicio de push remoto.
- Los enlaces pendientes se procesan después de resolver la sesión y montar la navegación.
- El almacenamiento del backend es temporal: reiniciarlo elimina los cambios realizados en memoria.
- Las comprobaciones nativas requieren ejecutar la aplicación; tipos y lint no verifican gestos ni entrega de notificaciones.

## Documentación técnica

- [Arquitectura](../docs/A1%20-%20Arquitectura.md).
- [Estado y datos](../docs/A2%20-%20%20Estrategia%20de%20estado%20y%20datos.md).
- [Navegación y enlaces](../docs/A3%20-%20Navegaci%C3%B3n%20y%20DeepLinking.md).
- [Calidad](../docs/A4%20-%20Estrategia%20de%20calidad.md).
- [Performance](../docs/A5%20-%20Performance.md).
- [Referencia de Expo SDK 58](https://docs.expo.dev/versions/v58.0.0/).

La sección de tests de A4 describe una cobertura anterior; esos archivos fueron eliminados de `src/`.
