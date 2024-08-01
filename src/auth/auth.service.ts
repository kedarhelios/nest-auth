import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
  constructor(private readonly jwtService: JwtService) {}

  createJwtToken(id: string) {
    return this.jwtService.sign(
      { _id: id },
      { secret: process.env.JWT_SECRET },
    );
  }
}
