import { Injectable, Logger } from '@nestjs/common';
import { Prisma } from '@prisma/client';
import { PrismaService } from 'src/services/prisma.service';
import { isNil } from 'src/utils/common.util';

@Injectable()
export class ProductService {
  private readonly logger = new Logger('ProductService')

  constructor(private prisma: PrismaService) {}

  async searchProduct(params: {
    skip?: number;
    take?: number;
    orderBy?: string;
    where?: string;
  }) {
    const { skip, take, orderBy, where } = params;
    this.logger.debug(`====================================`)
    this.logger.debug(`-> where`)
    this.logger.debug(JSON.parse(where))
    this.logger.debug(`====================================`)
    this.logger.debug(`-> orderBy`)
    this.logger.debug(JSON.parse(orderBy))
    this.logger.debug(`====================================`)
    this.logger.debug(`-> skip`)
    this.logger.debug(skip)
    this.logger.debug(`====================================`)
    this.logger.debug(`-> limit`)
    this.logger.debug(take)
    
    const products = await this.prisma.product.findMany({
      orderBy: !isNil(orderBy)? JSON.parse(orderBy) : undefined,
      skip: !isNil(skip) ? skip : 0,
      take: !isNil(take) ? take : 25,
      where: !isNil(where)? JSON.parse(where) : undefined,
    })

    

    return products;
  }
}
