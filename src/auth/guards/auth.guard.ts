import {
  CanActivate,
  ExecutionContext,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { Request, Response } from 'express';
import { UserService } from 'src/user/user.service';

@Injectable()
export class AuthGuard implements CanActivate {
  constructor(
    private readonly jwtService: JwtService,
    private readonly userService: UserService,
  ) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    try {
      const req: Request = context.switchToHttp().getRequest();
      const res: Response = context.switchToHttp().getResponse();
      const token = req.headers.authorization?.split(' ')[1];

      if (!token) throw new UnauthorizedException('Please signin to continue!');

      const isTokenValid = this.jwtService.verify(token, {
        secret: process.env.JWT_SECRET,
      });

      if (!isTokenValid)
        throw new UnauthorizedException('Please signin to continue!');

      const user = await this.userService.findOne(isTokenValid?._id);

      if (!user)
        throw new UnauthorizedException(
          'Please signin with a valid account to continue!',
        );

      // @ts-ignore
      req.user = user;
      res.locals.user = user;

      return true;
    } catch (error) {
      console.error('error', error);
      throw new UnauthorizedException('Please signIn to continue!');
    }
  }
}
