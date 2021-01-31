import { Injectable, OnModuleInit } from '@nestjs/common';
import { InjectConnection, InjectModel } from '@nestjs/mongoose';
import { isEmpty } from 'class-validator';
import { Connection, Model } from 'mongoose';
import { LoginInput, LoginOutput } from './dto/login.dto';
import { User, UserDocument } from './schemas/user.schema';
import { comparePassword } from './utils/password.utils';
import { promiseTimeout } from './utils/promise-timeout';

@Injectable()
export class AppService implements OnModuleInit {
  constructor(
    @InjectConnection() private connection: Connection,
    @InjectModel(User.name) private readonly userModel: Model<UserDocument>,
  ) { }

  async onModuleInit() {
    const admin = await this.userModel.findOne({
      username: 'admin'
    });
    if (!admin) {
      const createdAdmin = new this.userModel({
        username: 'admin',
        password: 'secretverystrong',
        isAdmin: true
      });
      await createdAdmin.save();
    }
  }

  async checkDB(timeout: number) {
    const promise = this.connection.readyState === 1 ? Promise.resolve() : Promise.reject();
    return await promiseTimeout(timeout, promise);
  }

  async getUserByUsername(username: string): Promise<User> {
    const user = await this.userModel.findOne({
      username,
    });
    return user;
  }

  async login(credentialData: LoginInput): Promise<LoginOutput> {
    const user = await this.userModel.findOne({
      username: credentialData.username,
    });

    if (isEmpty(user)) return { success: false }

    const checkPass: boolean = await comparePassword(credentialData.password, user.password);
    if (!checkPass) return { success: false }

    if (!user.isActive) return { success: false }

    return {
      success: true,
      user: user.toJSON(),
    }
  }
}
