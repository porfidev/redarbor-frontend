# Redarbor Vacantes - frontend

Expo 58, React Native 0.88 y TypeScript estricto. Configura `API_BASE_URL` en `.env` a partir de `.env.example` y enciende el backend.

```sh
npm ci
npx expo start
```

Para Notifee instala una compilación propia de desarrollo:

```sh
npm run build:android
# o npm run build:ios
npx expo start --dev-client
```

En Expo Go (`npx expo start --go`) y web se puede revisar el resto del flujo; las notificaciones locales requieren el cliente nativo. El paquete Notifee instalado se integra por autolinking, sin una entrada inexistente en `plugins`.

```sh
npm run check
npm test -- --watchman=false
```

La guía completa de conexión, rutas, decisiones y verificaciones nativas está en [el README raíz](../README.md) y los documentos [A1-A5](../docs/A1-arquitectura.md).

Se conservan controles básicos sin diseño visual nuevo. Las modificaciones de layout se limitan al tamaño de las listas, el contenedor de gestos y el sheet.
