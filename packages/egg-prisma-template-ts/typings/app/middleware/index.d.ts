// This file is created by egg-ts-helper@1.33.1
// Do not modify this file!!!!!!!!!

import 'egg';
import ExportError from '../../../app/middleware/error';
import ExportJwt from '../../../app/middleware/jwt';

declare module 'egg' {
  interface IMiddleware {
    error: typeof ExportError;
    jwt: typeof ExportJwt;
  }
}
