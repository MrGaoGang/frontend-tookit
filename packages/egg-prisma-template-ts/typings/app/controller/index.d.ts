// This file is created by egg-ts-helper@1.33.1
// Do not modify this file!!!!!!!!!

import 'egg';
import ExportAuth from '../../../app/controller/auth';
import ExportFile from '../../../app/controller/file';
import ExportHome from '../../../app/controller/home';
import ExportTest from '../../../app/controller/test';
import ExportWechat from '../../../app/controller/wechat';

declare module 'egg' {
  interface IController {
    auth: ExportAuth;
    file: ExportFile;
    home: ExportHome;
    test: ExportTest;
    wechat: ExportWechat;
  }
}
