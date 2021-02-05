import { controller, IAppController } from '@foal/core';
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
}
