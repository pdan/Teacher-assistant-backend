import { Context, HttpResponseOK, Post, HttpResponseConflict, ValidateBody, HttpResponseUnauthorized, verifyPassword } from '@foal/core';
import { getSecretOrPrivateKey } from '@foal/jwt';
import { isCommon } from '@foal/password';
import { sign } from 'jsonwebtoken';
import { User } from '../entities/user.entity';

export class AuthCotroller {

    @Post('/user/signin')
    @ValidateBody({
        additionalProperties: false,
        properties: {
            phone: { type: 'string' },
            password: { type: 'string' }
        },
        required: ['phone', 'password'],
        type: 'object'
    })
    async signin(ctx: Context) {
        const user = await User.findOne({ phone: ctx.request.body.phone });

        if (!user) {
            return new HttpResponseUnauthorized()
        }

        if (!await verifyPassword(ctx.request.body.password, user.password)) {
            return new HttpResponseUnauthorized();
        }

        const token = sign(
            { 
                id: user.id 
            },
            getSecretOrPrivateKey(),
            { expiresIn: '24h' }
        );

        return new HttpResponseOK({ token })
    }



    @Post('/user/signup')
    @ValidateBody({
        additionalProperties: false,
        properties: {
            phone: { type: 'string' },
            password: { type: 'string' }
        },
        required: ['phone', 'password'],
        type: 'object'
    })
    async signup(ctx: Context) {
        
        if (await isCommon(ctx.request.body.password)) {
            return new HttpResponseConflict('Password is too simple.')
        }

        let user = await User.findOne({ phone: ctx.request.body.phone });

        if (user) {
            return new HttpResponseConflict('Phone already taken.')
        }

        user = new User();
        user.phone = ctx.request.body.phone;
        await user.setPassword(ctx.request.body.password);
        await user.save()

        // if (!await verifyPassword(ctx.request.body.password, user.password)) {
        //   return new HttpResponseUnauthorized();
        // }

        // const token = sign(
        //   { phone: user.phone },
        //   getSecretOrPrivateKey(),
        //   { expiresIn: '1h' }
        // );

        return new HttpResponseOK({ pass: ctx.request.body.password, user: ctx.request.body.phone })
    }

}