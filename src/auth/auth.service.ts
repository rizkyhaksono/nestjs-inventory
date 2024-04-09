import {
  Injectable,
  NotFoundException,
  ConflictException,
} from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';
import { LoginEntity } from './entity/login.entity';
import { RegisterDto } from './dto/register.dto';

@Injectable()
export class AuthService {
  constructor(
    private prisma: PrismaService,
    private jwtService: JwtService,
  ) {}

  async login(email: string, password: string): Promise<LoginEntity> {
    const user = await this.prisma.user.findUnique({
      where: {
        email: email,
      },
    });

    if (!user) {
      throw new NotFoundException(`No user found for email: ${email}`);
    }

    const isPasswordValid = await bcrypt.compare(password, user.password);

    if (!isPasswordValid) {
      throw new NotFoundException(`Invalid password`);
    }

    const accessToken = await this.jwtService.signAsync({
      uuid: user.uuid,
    });

    await this.prisma.user.update({
      where: {
        uuid: user.uuid,
      },
      data: {
        token: accessToken,
      },
    });

    return { accessToken: accessToken };
  }

  async register(registerDto: RegisterDto) {
    const { username, password } = registerDto;

    const existingUser = await this.prisma.user.findUnique({
      where: { username },
    });

    if (existingUser) {
      throw new ConflictException('Users already taken', {
        cause: new Error(),
      });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    registerDto.password = hashedPassword;

    return this.prisma.user.create({
      data: {
        email: registerDto.email,
        username: registerDto.username,
        password: hashedPassword,
      },
    });
  }
}
