import {
  Body,
  Controller,
  Get,
  HttpCode,
  Post,
  Req,
  Res,
  UseGuards,
} from '@nestjs/common';
import type { CookieOptions, Request, Response } from 'express';
import { AuthService } from './auth.service';
import { LoginDto } from './dto/login.dto';
import { JwtAuthGuard } from './jwt-auth.guard';

const COOKIE_NAME = 'access_token';
const SEVEN_DAYS_MS = 7 * 24 * 60 * 60 * 1000;

/** Base cookie attributes, shared by set + clear so they always match. */
function cookieOptions(): CookieOptions {
  return {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production', // HTTPS only in prod
    sameSite: 'lax',
    path: '/',
  };
}

@Controller('api/auth')
export class AuthController {
  constructor(private readonly auth: AuthService) {}

  /** POST /api/auth/login — validate, set the HttpOnly cookie, return profile. */
  @Post('login')
  @HttpCode(200)
  async login(
    @Body() dto: LoginDto,
    @Res({ passthrough: true }) res: Response,
  ): Promise<{ message: string; user: { email: string; role: string } }> {
    const user = await this.auth.validate(dto.email, dto.password);
    const token = this.auth.signToken(user);

    res.cookie(COOKIE_NAME, token, { ...cookieOptions(), maxAge: SEVEN_DAYS_MS });

    return {
      message: 'Logged in successfully',
      user: { email: user.email, role: user.role },
    };
  }

  /** POST /api/auth/logout — clear the cookie. */
  @Post('logout')
  @HttpCode(200)
  logout(@Res({ passthrough: true }) res: Response): { message: string } {
    res.clearCookie(COOKIE_NAME, cookieOptions());
    return { message: 'Logged out successfully' };
  }

  /** GET /api/auth/me — current admin, from a valid cookie. */
  @Get('me')
  @UseGuards(JwtAuthGuard)
  me(@Req() req: Request): { user: Express.User | undefined } {
    return { user: req.user };
  }
}
