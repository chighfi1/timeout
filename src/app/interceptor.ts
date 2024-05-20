import { Injectable } from '@angular/core';
import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest, HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError, timeout } from 'rxjs/operators';

@Injectable()
export class TimeoutInterceptor implements HttpInterceptor {
  private readonly REQUEST_TIMEOUT = 5000;  // 5 seconds

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    return next.handle(req).pipe(
      timeout(this.REQUEST_TIMEOUT),
      catchError((error: HttpErrorResponse | any) => {
        let errorMessage = 'An unknown error occurred!';
        if (error.name === 'TimeoutError') {
          errorMessage = 'The request timed out.';
        } else if (error.error instanceof ErrorEvent) {
          // A client-side or network error occurred.
          errorMessage = `Error: ${error.error.message}`;
        } else {
          // The backend returned an unsuccessful response code.
          errorMessage = `Error Code: ${error.status}\nMessage: ${error.message}`;
        }
        return throwError(errorMessage);
      })
    );
  }
}
