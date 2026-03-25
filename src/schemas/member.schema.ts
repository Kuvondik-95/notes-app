import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Schema as MongooseSchema } from 'mongoose';
import { MemberStatus, MemberType } from '../libs/enums/member.enum';

@Schema({ timestamps: true })
export class Member extends Document {
  @Prop({ type: String, required: true, unique: true })
  nick: string;

  @Prop({ type: String, required: true, unique: true })
  phone: string;

  @Prop({ type: String, required: true })
  password: string;

  @Prop({ type: String, unique: true, sparse: true })
  email?: string;

  @Prop({ type: String, default: '' })
  profileImage: string;

  @Prop({ type: String, default: '' })
  address: string;

  @Prop({ type: String, enum: MemberType, default: MemberType.USER })
  memberType: MemberType;

  @Prop({ type: String, enum: MemberStatus, default: MemberStatus.ACTIVE })
  memberStatus: MemberStatus;
}

export const MemberSchema = SchemaFactory.createForClass(Member);
