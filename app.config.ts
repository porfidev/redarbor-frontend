import type { ConfigContext, ExpoConfig } from 'expo/config';

export default ({ config }: ConfigContext): ExpoConfig => {
  const apiBaseUrl = process.env.API_BASE_URL;

  if (!apiBaseUrl) {
    throw new Error('Falta API_BASE_URL en la configuración .env');
  }

  return {
    ...config,
    name: 'Redarbor Vacantes',
    slug: 'redarbor-vacantes',
    scheme: ['occ', 'redarbor'],
    android: {
      ...config.android,
      package: 'com.redarbor.vacantes',
      permissions: [
        ...(config.android?.permissions ?? []),
        'POST_NOTIFICATIONS',
        'VIBRATE',
      ],
    },
    ios: { ...config.ios, bundleIdentifier: 'com.redarbor.vacantes' },
    extra: {
      ...config.extra,
      apiBaseUrl,
    },
    plugins: [...(config.plugins ?? [])],
  };
};
