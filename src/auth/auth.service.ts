import { Injectable, NotAcceptableException, NotFoundException, UnauthorizedException } from "@nestjs/common";
import { PrismaService } from "src/prisma/prisma.service";
import { JwtService } from "@nestjs/jwt";
import { AuthEntity } from "./entity/auth.entity";
import * as bcrypt from "bcrypt"

@Injectable()
export class AuthService {
  constructor(private prisma: PrismaService, private jwtService: JwtService) {}

  async login(email: string, password: string): Promise<AuthEntity> {
    const user = await this.prisma.user.findUnique({
      where: {
        email: email
      }
    })

    if (!user) {
      throw new NotFoundException(`No user found for email: ${email}`)
    }

    const isPasswordValid = await bcrypt.compare(password, user.password)

    if (!isPasswordValid) {
      throw new NotFoundException(`Invalid password`)
    }

    const accessToken = await this.jwtService.signAsync({
      uuid: user.uuid
    })

    await this.prisma.user.update({
      where: {
        uuid: user.uuid
      },
      data: {
        token: accessToken
      }
    });

    return { accessToken: accessToken };
  }
}