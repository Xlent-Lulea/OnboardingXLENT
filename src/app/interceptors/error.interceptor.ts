import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor
} from '@angular/common/http';
import { Observable, catchError } from 'rxjs';
import { SnackBarService } from '../services/snack-bar-service';

@Injectable()
export class ErrorInterceptor implements HttpInterceptor {

  constructor(private snackBarService: SnackBarService) {}

  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
    return next.handle(request).pipe(
      catchError(() => {
        this.snackBarService.showError();
        return [];
      })
    );
  }
}
