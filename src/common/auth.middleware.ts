import {
  Injectable,
  NestMiddleware,
  UnauthorizedException,
} from '@nestjs/common';
import { PrismaService } from './prisma.service';

@Injectable()
export class AuthMiddleware implements NestMiddleware {
  constructor(private prismaService: PrismaService) {}

  async use(req: any, res: any, next: (error?: any) => void) {
    const token = req.headers['authorization'] as string;

    if (!token) {
      throw new UnauthorizedException('Authorization header is missing');
    }

    try {
      const user = await this.prismaService.user.findFirst({
        where: {
          token: token,
        },
      });

      if (user) {
        req.user = user;
      }

      next();
    } catch (error) {
      throw new UnauthorizedException('Invalid token');
    }
  }
}
