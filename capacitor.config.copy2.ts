import { CapacitorConfig } from '@capacitor/cli';

interface CustomCapacitorConfig extends CapacitorConfig {
  server: {
    hostname: string;
    androidScheme: string;
    iosScheme: string;
    url?: string;
    cleartext?: boolean;
    allowNavigation?: string[];
    errorPath?: string;
    proxy?: {
      '/api': {
        target: string;
        changeOrigin: boolean;
        pathRewrite: {
          '^/api': '';
        };
      };
    };
  };
}

const config: CustomCapacitorConfig = {
  server: {
    hostname: 'aiql.com',
    androidScheme: 'https',
    iosScheme: 'https',
    proxy: {
      '/api': {
        target: 'http://localhost:3000',
        changeOrigin: true,
        pathRewrite: {
          '^/api': '',
        },
      },
    },
  },
};

export default config;