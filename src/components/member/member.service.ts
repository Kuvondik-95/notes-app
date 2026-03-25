import {
  BadRequestException,
  Injectable,
  InternalServerErrorException,
} from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { JwtService } from '@nestjs/jwt';
import { Model } from 'mongoose';
import * as bcrypt from 'bcryptjs';
import { Member } from '../../schemas/member.schema';
import { LoginDto, SignupDto, UpdateMemberDto } from '../../libs/dto/member.dto';
import { MemberStatus } from '../../libs/enums/member.enum';
import { Message } from '../../libs/enums/common.enum';

@Injectable()
export class MemberService {
  constructor(
    @InjectModel(Member.name) private memberModel: Model<Member>,
    private jwtService: JwtService,
  ) {}

  async signup(dto: SignupDto): Promise<{ accessToken: string; member: Member }> {
    const existNick = await this.memberModel.findOne({ nick: dto.nick });
    if (existNick) throw new BadRequestException(Message.NICK_ALREADY_EXISTS);

    const existPhone = await this.memberModel.findOne({ phone: dto.phone });
    if (existPhone) throw new BadRequestException(Message.PHONE_ALREADY_EXISTS);

    const hashedPassword = await bcrypt.hash(dto.password, 12);
    try {
      const member = await this.memberModel.create({
        ...dto,
        password: hashedPassword,
      });

      member.password = '';
      const accessToken = this.createToken(member);

      return { accessToken, member };
    } catch (error) {
      throw new InternalServerErrorException(Message.SOMETHING_WENT_WRONG);
    }
  }

  async login(dto: LoginDto): Promise<{ accessToken: string; member: Member }> {
    const member = await this.memberModel.findOne({ nick: dto.nick });
    if (!member) throw new BadRequestException(Message.MEMBER_NOT_FOUND);

    if (member.memberStatus === MemberStatus.BLOCK) {
      throw new BadRequestException(Message.MEMBER_BLOCKED);
    }

    const isPasswordValid = await bcrypt.compare(dto.password, member.password);
    if (!isPasswordValid) throw new BadRequestException(Message.WRONG_PASSWORD);

    member.password = '';
    const accessToken = this.createToken(member);

    return { accessToken, member };
  }

  createToken(member: Member): string {
    return this.jwtService.sign({ _id: member._id, memberType: member.memberType });
  }

  verifyToken(token: string): { _id: string; memberType: string } {
    try {
      return this.jwtService.verify(token);
    } catch (error) {
      throw new BadRequestException(Message.NOT_AUTHENTICATED);
    }
  }

  async getMember(memberId: string): Promise<Member> {
    const member = await this.memberModel.findById(memberId).select('-password');
    if (!member) throw new BadRequestException(Message.MEMBER_NOT_FOUND);
    return member;
  }

  async updateMember(memberId: string, dto: UpdateMemberDto): Promise<Member> {
    if (dto.password) {
      dto.password = await bcrypt.hash(dto.password, 12);
    }

    const member = await this.memberModel
      .findByIdAndUpdate(memberId, dto, { new: true })
      .select('-password');
    if (!member) throw new InternalServerErrorException(Message.UPDATE_FAILED);
    return member;
  }

  async removeMember(memberId: string): Promise<Member> {
    const member = await this.memberModel
      .findByIdAndUpdate(memberId, { memberStatus: MemberStatus.DELETE }, { new: true })
      .select('-password');
    if (!member) throw new InternalServerErrorException(Message.REMOVE_FAILED);
    return member;
  }
}
