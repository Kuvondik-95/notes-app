import { createParamDecorator, ExecutionContext } from '@nestjs/common';

export const AuthMember = createParamDecorator(
  (data: string, context: ExecutionContext | any) => {
    const request = context.switchToHttp().getRequest();
    if (request.authMember) {
      request.authMember.authorization = request.headers?.authorization;
    }
    const member = request.authMember;

    if (member) return data ? member?.[data] : member;
    else return null;
    return null;
  },
);
