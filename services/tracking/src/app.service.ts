import { Injectable } from '@nestjs/common';
import { InjectConnection, InjectModel } from '@nestjs/mongoose';
import { Connection, Model } from 'mongoose';
import { CreateProductActivityDTO } from './dto/create-activity.dto';
import { Activity, ActivityDocument } from './schemas/activity.schema';
import { promiseTimeout } from './utils/promise-timeout';

@Injectable()
export class AppService {
  constructor(
    @InjectConnection() private connection: Connection,
    @InjectModel(Activity.name) private readonly activityModel: Model<ActivityDocument>,
  ) {}

  async checkDB(timeout: number) {
    const promise = this.connection.readyState === 1 ? Promise.resolve() : Promise.reject();
    return await promiseTimeout(timeout, promise);
  }

  async addActivity(data: CreateProductActivityDTO) {
    const newData = new this.activityModel(data);
    return await newData.save()
  }
}
