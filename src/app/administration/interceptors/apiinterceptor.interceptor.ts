import { Injectable } from "@angular/core";
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
} from "@angular/common/http";
import { Observable } from "rxjs";
import { MsalService } from "@azure/msal-angular";
import { environment } from "src/environments/environment";
import { AdminAPIService } from 'src/app/services/adminAPI/adminAPI.service';

@Injectable()
export class APIinterceptorInterceptor implements HttpInterceptor {
  constructor(private adminAPIService: AdminAPIService) {}

  intercept(
    request: HttpRequest<unknown>,
    next: HttpHandler
  ): Observable<HttpEvent<unknown>> {
    if (this.adminAPIService.getAccessToken()) {
      const req = request.clone({
        headers: request.headers.set("Authorization", "Bearer " + this.adminAPIService.getAccessToken()),
      });
      console.log(req);
      return next.handle(req);
    }

    return next.handle(request);
  }
}
