import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import * as bcrypt from 'bcryptjs';
import { User } from './user.entity';

@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(User) private readonly users: Repository<User>,
    private readonly jwt: JwtService,
  ) {}

  /** Verify email + password; returns the user or throws 401. */
  async validate(email: string, password: string): Promise<User> {
    const user = await this.users.findOne({
      where: { email: email.toLowerCase().trim() },
    });
    // Same error either way so we don't reveal which emails exist.
    if (!user || !(await bcrypt.compare(password, user.password))) {
      throw new UnauthorizedException('Invalid email or password.');
    }
    return user;
  }

  /** Sign a 7-day JWT carrying the user's id, email and role. */
  signToken(user: User): string {
    return this.jwt.sign({ sub: user.id, email: user.email, role: user.role });
  }
}
