import Constants from 'expo-constants';
import { z } from 'zod';

const environmentSchema = z.object({
  apiBaseUrl: z.url({
    protocol: /^https?$/,
  }),
});

const environment = environmentSchema.parse(Constants.expoConfig?.extra);

export const env = {
  apiBaseUrl: environment.apiBaseUrl,
};
