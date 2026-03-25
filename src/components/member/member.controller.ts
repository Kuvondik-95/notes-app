import { Body, Controller, Delete, Get, Param, Patch, Post, UseGuards } from '@nestjs/common';
import { MemberService } from './member.service';
import { LoginDto, SignupDto, UpdateMemberDto } from '../../libs/dto/member.dto';
import { AuthGuard } from './guards/auth.guard';
import { AuthMember } from './decorators/authMember.decorator';

@Controller('member')
export class MemberController {
  constructor(private memberService: MemberService) {}

  @Post('signup')
  async signup(@Body() dto: SignupDto) {
    console.log('POST, Signup');
    return this.memberService.signup(dto);
  }

  @Post('login')
  async login(@Body() dto: LoginDto) {
    console.log('POST, Login');
    return this.memberService.login(dto);
  }

  @Get(':id')
  async getMember(@Param('id') memberId: string) {
    console.log('GET, GetMember');
    return this.memberService.getMember(memberId);
  }

  @UseGuards(AuthGuard)
  @Patch('update')
  async updateMember(
    @AuthMember('_id') memberId: string,
    @Body() dto: UpdateMemberDto,
  ) {
    console.log('PATCH, UpdateMember');
    return this.memberService.updateMember(memberId, dto);
  }

  @UseGuards(AuthGuard)
  @Delete('remove')
  async removeMember(@AuthMember('_id') memberId: string) {
    console.log('DELETE, RemoveMember');
    return this.memberService.removeMember(memberId);
  }
}
