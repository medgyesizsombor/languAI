import { CapacitorConfig } from '@capacitor/cli';

const config: CapacitorConfig = {
  appId: 'hu.languai.languai',
  appName: 'LanguAI.Frontend',
  webDir: 'www',
  server: {
    androidScheme: 'https'
  },
  plugins: {
    SplashScreen: {
      launchAutoHide: false,
      backgroundColor: '#FFFFFF',
      showSpinner: true,
      androidSpinnerStyle: 'large',
      iosSpinnerStyle: 'large',
      spinnerColor: '#a6b1e1',
      androidScaleType: 'CENTER_CROP'
    }
  }
};

export default config;
