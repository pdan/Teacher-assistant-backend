import { Context, Get, HttpResponseOK, HttpResponseNotFound, Post } from '@foal/core';
import { JWTRequired } from '@foal/jwt';
// import { fetchUser } from '@foal/typeorm';
import { User } from '../entities';

@JWTRequired()
export class ApiController {

  @Post('/')
  index(ctx: Context) {
    return new HttpResponseOK('You are logged in :) ' + ctx.user.id);
  }

  @Post('/user/profile')
  async saveUserProfile(ctx: Context) {
    const user = await User.findOne({ id: ctx.user.id }, {relations: ['userProfile']})
    
    if (user) {
      user.userProfile = ctx.request.body
      await user.save()
    }

    // We should save "userProfile" on "ctx.user.id"
    // return new HttpResponseCreated(userProfile);
    return new HttpResponseOK('ok')
  }

  @Get('/user/profile')
  async getUserProfile(ctx: Context) {
    // , { join: { alias: 'userProfile', leftJoin: { userProfile: 'user.userProfile' } } }
    const user = await User.findOne({ where: { id: ctx.user.id }, relations: ['userProfile'] });
    if (!user)
      return new HttpResponseNotFound();

    return new HttpResponseOK(user)
  }

}
