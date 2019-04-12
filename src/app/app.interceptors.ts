import { Injectable } from '@angular/core';
import {
  HttpEvent, HttpInterceptor, HttpHandler, HttpRequest
} from '@angular/common/http';

import { Observable } from 'rxjs';
import { environment } from 'environments/environment';

/** Pass untouched request through to the next request handler. */
@Injectable()
export class EndPointInterceptor implements HttpInterceptor {

  intercept(req: HttpRequest<any>, next: HttpHandler):
    Observable<HttpEvent<any>> {
    console.log(req);
    // req.url = `${environment.host}${req.url}`;
    const apiReq = req.clone({ url: `${environment.host}${req.url}`  });
    return next.handle(apiReq);
  }
}
