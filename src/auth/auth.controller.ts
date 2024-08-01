import { Body, Controller, Post, UnauthorizedException } from '@nestjs/common';
import { UserService } from 'src/user/user.service';
import { AuthService } from './auth.service';
import { SignUpDto } from './dto/signup.dto';
import { SignInDto } from './dto/signin.dto';

@Controller('auth')
export class AuthController {
  constructor(
    private readonly authService: AuthService,
    private readonly userService: UserService,
  ) {}

  @Post('/signup')
  async signUp(@Body() signUpDto: SignUpDto) {
    const user = await this.userService.create(signUpDto);
    const token = this.authService.createJwtToken(String(user._id));

    return {
      user_id: user._id,
      token,
    };
  }

  @Post('/signin')
  async signIn(@Body() signInDto: SignInDto) {
    const { email, password } = signInDto;

    const user = await this.userService.findOneByEmail(email);

    if (!user)
      throw new UnauthorizedException('Email or password is incorrect');

    const isPasswordCorrect = this.userService.checkPasswordMatch(
      user.password,
      password,
    );

    if (!isPasswordCorrect)
      throw new UnauthorizedException('Email or password is incorrect');

    const token = this.authService.createJwtToken(String(user._id));

    return {
      user_id: user._id,
      token,
    };
  }
}
