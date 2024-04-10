import { Module } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { TestService } from './test.service';

@Module({
  providers: [TestService, PrismaService],
})
export class TestModule {}
