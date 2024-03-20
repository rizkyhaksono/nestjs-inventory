import {
  createParamDecorator,
  ExecutionContext,
  HttpException,
} from '@nestjs/common';

// export const Auth = createParamDecorator(
//   (data: unknown, context: ExecutionContext) => {
//     const request = context.switchToHttp().getRequest();
//     const user = request.user;
//     if (user) {
//       return user;
//     } else {
//       throw new HttpException('Unauthorized', 401);
//     }
//   },
// );

export const Auth = createParamDecorator(
  (data: unknown, context: ExecutionContext) => {
    const request = context.switchToHttp().getRequest();
    const authHeader = request.headers.authorization;

    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      throw new HttpException('Unauthorized', 401);
    }

    const token = authHeader.split(' ')[1];
    return token;
  },
);
