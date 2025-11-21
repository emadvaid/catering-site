import { CapacitorConfig } from '@capacitor/cli';

const config: CapacitorConfig = {
  appId: 'com.kababhut.catering',
  appName: 'Kabab Hut Catering',
  webDir: '.next',
  server: {
    // For development, use Android emulator's special IP to reach host machine
    url: 'http://10.0.2.2:3000',
    cleartext: true,
    androidScheme: 'https'
  },
  android: {
    allowMixedContent: true,
    captureInput: true,
    webContentsDebuggingEnabled: true
  },
  plugins: {
    PushNotifications: {
      presentationOptions: ['badge', 'sound', 'alert']
    }
  }
};

export default config;
