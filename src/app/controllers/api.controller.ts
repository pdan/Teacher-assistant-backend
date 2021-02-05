import { Context, HttpResponseOK, Post } from '@foal/core';
import {JWTRequired} from '@foal/jwt';

@JWTRequired()
export class ApiController {

  @Post('/')
  index(ctx: Context) {
    return new HttpResponseOK('You are logged in :)');
  }

}
