import {
  BadRequestException,
  CanActivate,
  ExecutionContext,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Member } from '../../../schemas/member.schema';
import { MemberStatus } from '../../../libs/enums/member.enum';
import { Message } from '../../../libs/enums/common.enum';

@Injectable()
export class AuthGuard implements CanActivate {
  constructor(
    private jwtService: JwtService,
    @InjectModel(Member.name) private memberModel: Model<Member>,
  ) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request = context.switchToHttp().getRequest();

    const bearerToken = request.headers.authorization;
    if (!bearerToken) throw new BadRequestException(Message.TOKEN_NOT_EXIST);

    const token = bearerToken.split(' ')[1];
    try {
      const payload = this.jwtService.verify(token);
      const member = await this.memberModel
        .findById(payload._id)
        .select('-password');

      if (!member) throw new UnauthorizedException(Message.NOT_AUTHENTICATED);
      if (member.memberStatus === MemberStatus.BLOCK)
        throw new BadRequestException(Message.MEMBER_BLOCKED);

      request.authMember = member;
      return true;
    } catch (error) {
      if (error instanceof BadRequestException || error instanceof UnauthorizedException) {
        throw error;
      }
      throw new UnauthorizedException(Message.NOT_AUTHENTICATED);
    }
  }
}
