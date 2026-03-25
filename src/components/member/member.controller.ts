import { Body, Controller, Post } from '@nestjs/common';
import { MemberService } from './member.service';
import { LoginDto, SignupDto } from '../../libs/dto/member.dto';

@Controller('member')
export class MemberController {
  constructor(private memberService: MemberService) {}

  @Post('signup')
  async signup(@Body() dto: SignupDto) {
    return this.memberService.signup(dto);
  }

  @Post('login')
  async login(@Body() dto: LoginDto) {
    return this.memberService.login(dto);
  }
}
