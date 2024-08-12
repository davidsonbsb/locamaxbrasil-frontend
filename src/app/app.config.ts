import { ApplicationConfig, importProvidersFrom } from '@angular/core';
import { provideAnimations } from '@angular/platform-browser/animations';
import {
  provideRouter,
  withEnabledBlockingInitialNavigation,
  withHashLocation,
  withInMemoryScrolling,
  withRouterConfig,
  withViewTransitions
} from '@angular/router';
import { authInterceptor } from './core/interceptors/auth.interceptor';

import { provideHttpClient, withFetch, withInterceptors } from '@angular/common/http';
import { provideDateFnsAdapter } from '@angular/material-date-fns-adapter';
import { MAT_DATE_LOCALE, provideNativeDateAdapter } from '@angular/material/core';
import { MatPaginatorIntl } from '@angular/material/paginator';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import { DropdownModule, SidebarModule } from '@coreui/angular';
import { IconSetService } from '@coreui/icons-angular';
import { ptBR } from 'date-fns/locale';
import { routes } from './app.routes';
import { CustomPaginatorIntl } from './shared/custom-paginator-intl'; // ajuste o caminho conforme necessário


export const appConfig: ApplicationConfig = {
  providers: [
    provideRouter(routes,
      withRouterConfig({
        onSameUrlNavigation: 'reload'
      }),
      withInMemoryScrolling({
        scrollPositionRestoration: 'top',
        anchorScrolling: 'enabled'
      }),
      withEnabledBlockingInitialNavigation(),
      withViewTransitions(),
      withHashLocation()
    ),
    provideNativeDateAdapter(),
    provideDateFnsAdapter(),
    {
        provide: MAT_DATE_LOCALE, useValue: ptBR
    },
    provideHttpClient(
      withFetch(),
      //withXsrfConfiguration({ cookieName: 'XSRF-TOKEN', headerName: 'Xsrf-Headers' }),
      withInterceptors([authInterceptor])
    ),
    importProvidersFrom(SidebarModule, DropdownModule),
    IconSetService,
    provideAnimations(), provideAnimationsAsync(),
    { provide: MatPaginatorIntl, useClass: CustomPaginatorIntl },
    /* {
      provide: MAT_FORM_FIELD_DEFAULT_OPTIONS,
      useValue: {
        subscriptSizing: 'dynamic'
      }
    } */
  ]
};


