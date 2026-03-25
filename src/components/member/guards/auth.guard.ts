// import {
//   BadRequestException,
//   CanActivate,
//   ExecutionContext,
//   Injectable,
//   UnauthorizedException,
// } from '@nestjs/common';
// import { AuthService } from '../auth.service';
// import { Message } from 'src/libs/enums/common.enum';

// @Injectable()
// export class AuthGuard implements CanActivate {
//   constructor(private authService: AuthService) {}

//   async canActivate(context: ExecutionContext | any): Promise<boolean> {
//     const request = context.switchToHttp().getRequest();

//     const bearerToken = request.headers.authorization;
//     if (!bearerToken) throw new BadRequestException(Message.TOKEN_NOT_EXIST);

//     const token = bearerToken.split(' ')[1];
//     const authMember = await this.authService.verifyToken(token);
//     if (!authMember) throw new UnauthorizedException(Message.NOT_AUTHENTICATED);

//     request.authMember = authMember;
//     return true;
//   }
// }
