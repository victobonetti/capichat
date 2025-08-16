import { ApplicationConfig, provideBrowserGlobalErrorListeners, provideZonelessChangeDetection } from '@angular/core';
import { provideRouter } from '@angular/router';
import Nora from '@primeuix/themes/nora';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import { routes } from './app.routes';
import { providePrimeNG } from 'primeng/config';
import { definePreset } from '@primeuix/themes';

const MyPreset = definePreset(Nora, {
    semantic: {
        primary: {
            50: '{stone.50}',
            100: '{stone.100}',
            200: '{stone.200}',
            300: '{stone.300}',
            400: '{stone.400}',
            500: '{stone.500}',
            600: '{stone.600}',
            700: '{stone.700}',
            800: '{stone.800}',
            900: '{stone.900}',
            950: '{stone.950}'
        }
    }
});

export const appConfig: ApplicationConfig = {
  providers: [
    provideAnimationsAsync(),
    providePrimeNG({
      theme: {
        preset: MyPreset
      }
    }),
    provideBrowserGlobalErrorListeners(),
    provideZonelessChangeDetection(),
    provideRouter(routes)
  ]
};
