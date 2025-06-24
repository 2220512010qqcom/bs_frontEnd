import type { CapacitorConfig } from '@capacitor/cli';

const config: CapacitorConfig = {
  appId: 'io.ionic.starter',
  appName: 'UserEnd_new',
  webDir: 'dist',
  // server: {
  //   // url: 'http://123.57.78.6:3000', // 改用 HTTP
  //   url: 'http://localhost:8100', // 改用 HTTP
  //   cleartext: true,              // 允许明文 HTTP（Android）
  // },
  // bundledWebRuntime: false,
  server: {
    // url: 'http://localhost:8100',
    cleartext: true,
    allowNavigation: ['*'],
  },
  android: {
    allowMixedContent: true, // 允许 WebView 加载混合内容（HTTP + HTTPS）
  },
};


export default config;
