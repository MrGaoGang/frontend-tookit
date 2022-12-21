// This file is created by egg-ts-helper@1.33.1
// Do not modify this file!!!!!!!!!

import 'egg';
import ExportJwt from '../../../app/middleware/jwt';

declare module 'egg' {
  interface IMiddleware {
    jwt: typeof ExportJwt;
  }
}
