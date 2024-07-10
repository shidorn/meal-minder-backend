import { Injectable, NestMiddleware } from '@nestjs/common';
import { Request, Response, NextFunction } from 'express';

@Injectable()
export class CookieMiddleware implements NestMiddleware {
  use(req: Request, res: Response, next: NextFunction) {
    if (req.path === '/auth/login') {
      res.cookie('token', req.body.token, { httpOnly: true });
      res.cookie('userEmail', req.body.email, { httpOnly: true });
    }
    next();
  }
}
