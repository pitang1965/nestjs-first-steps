import {
  Injectable,
  CanActivate,
  ExecutionContext,
  UnauthorizedException,
} from '@nestjs/common';
import { Observable } from 'rxjs';
import { auth } from 'express-oauth2-jwt-bearer';

@Injectable()
export class Auth0Guard implements CanActivate {
  private checkJwt = auth({
    audience: process.env.AUTH0_AUDIENCE,
    issuerBaseURL: `https://${process.env.AUTH0_DOMAIN}`,
  });

  canActivate(
    context: ExecutionContext,
  ): boolean | Promise<boolean> | Observable<boolean> {
    const http = context.switchToHttp();
    const req = http.getRequest();
    const res = http.getResponse();

    return new Promise((resolve, reject) => {
      this.checkJwt(req, res, (err) => {
        if (err) {
          reject(
            new UnauthorizedException({
              message: err.message,
              status: err.status,
              code: err.code,
            }),
          );
        } else {
          resolve(true);
        }
      });
    });
  }
}
