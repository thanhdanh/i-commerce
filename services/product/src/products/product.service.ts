import { Injectable } from '@nestjs/common';
import { Brand, Color } from '@prisma/client';
import { PrismaService } from 'src/services/prisma.service';
import { isNil } from 'src/utils/common.util';
import { promiseTimeout } from 'src/utils/promise-timeout';

@Injectable()
export class ProductService {
  constructor(private prisma: PrismaService) {}

  async searchProduct(params: {
    skip?: number;
    take?: number;
    orderBy?: string;
    where?: string;
  }) {
    const { skip, take, orderBy, where } = params;
    
    const products = await this.prisma.product.findMany({
      orderBy: !isNil(orderBy)? JSON.parse(orderBy) : undefined,
      skip: !isNil(skip) ? skip : 0,
      take: !isNil(take) ? take : 25,
      where: !isNil(where)? JSON.parse(where) : undefined,
      include: {
        category: true
      }
    })
    return products;
  }

  async addProduct(data: {
    categoryName: string,
    name: string,
    price: number,
    color: Color,
    brand: Brand,
    description?: string
  }) {
    const { categoryName, name, price, description, color, brand } = data;
    return this.prisma.product.create({ 
      data: {
        name,
        price,
        description,
        color,
        brand,
        category: {
          connectOrCreate: {
            where: {
              name: categoryName,
            },
            create: {
              name: categoryName,
            }
          }
        }
      } 
    });
  }

  async checkDB(timeout: number) {
    return await promiseTimeout(timeout, this.prisma.$queryRaw('SELECT 1'));
  }

  async getProductDetail(id: number) {
    return await this.prisma.product.findUnique({
      where: {
        id,
      }
    })
  }
}
