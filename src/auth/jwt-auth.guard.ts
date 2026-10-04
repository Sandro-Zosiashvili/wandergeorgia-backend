import { Injectable } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';

/** Protects admin routes — requires a valid JWT in the access_token cookie. */
@Injectable()
export class JwtAuthGuard extends AuthGuard('jwt') {}
