import { controller, IAppController, Get, render } from '@foal/core';
import { createConnection } from 'typeorm';

import { ApiController, AuthCotroller } from './controllers';

export class AppController implements IAppController {
  subControllers = [
    controller('/api', ApiController),
    controller('/auth', AuthCotroller),
  ];

  async init() {
    await createConnection();
  }

  @Get('/')
  index() {
    return render('templates/index.html');
  }
}
