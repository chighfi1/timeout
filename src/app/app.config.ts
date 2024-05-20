import { ApplicationConfig } from '@angular/core';
import { provideRouter } from '@angular/router';

import { routes } from './app.routes';

import { Provider } from '@angular/core';

// Injection token for the Http Interceptors multi-provider
import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { TimeoutInterceptor } from './interceptor';

/** Provider for the Noop Interceptor. */
const noopInterceptorProvider: Provider =
  { provide: HTTP_INTERCEPTORS, useClass: TimeoutInterceptor, multi: true };

export const appConfig: ApplicationConfig = {
  providers: [
    provideRouter(routes),
    noopInterceptorProvider
  ],
};
