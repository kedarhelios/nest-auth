import { Injectable, InternalServerErrorException } from '@nestjs/common';
import mongoose from 'mongoose';
import { User } from './schemas/user.schema';
import { InjectModel } from '@nestjs/mongoose';
import * as bcrypt from 'bcryptjs';
import { SignUpDto } from 'src/auth/dto/signup.dto';

@Injectable()
export class UserService {
  constructor(
    @InjectModel(User.name)
    private readonly userModel: mongoose.Model<User>,
  ) {}

  async create(createUserDto: SignUpDto) {
    try {
      return await this.userModel.create(createUserDto);
    } catch (error) {
      throw new InternalServerErrorException(error);
    }
  }

  async checkPasswordMatch(
    originalPassword: string,
    passwordToBeMatched: string,
  ) {
    return await bcrypt.compare(originalPassword, passwordToBeMatched);
  }

  findAll() {
    return `This action returns all user`;
  }

  async findOne(id: string) {
    return await this.userModel.findById(id);
  }

  async findOneByEmail(email: string) {
    return await this.userModel.findOne({ email });
  }

  update(id: number, updateUserDto: Partial<SignUpDto>) {
    return `This action updates a #${id} user`;
  }

  remove(id: number) {
    return `This action removes a #${id} user`;
  }
}
