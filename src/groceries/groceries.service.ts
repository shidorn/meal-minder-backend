import { Injectable } from '@nestjs/common';
// import { JwtService } from '@nestjs/jwt';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreateGroceryDto } from './dto/create-grocery.dto';
import { CreateItemDto } from './dto/create-item.dto';
import { UpdateItemDto } from './dto/update-item.dto';

@Injectable()
export class GroceriesService {
  constructor(
    private readonly prisma: PrismaService,
    // private jwtService: JwtService,
  ) {}

  async create(createGroceryDto: CreateGroceryDto) {
    try {
      createGroceryDto.target_date = new Date(createGroceryDto.target_date);
      return await this.prisma.groceries.create({
        data: createGroceryDto,
      });
    } catch (error) {
      return error.message;
    }
  }

  async findAll() {
    return await this.prisma.groceries.findMany();
  }

  async createItem(createItemDto: CreateItemDto) {
    try {
      return await this.prisma.groceries_item.create({
        data: createItemDto,
      });
    } catch (error) {
      return error.message;
    }
  }

  async updateItem(item_id: number, updateItemDto: UpdateItemDto) {
    try {
      return await this.prisma.groceries_item.update({
        where: { item_id },
        data: updateItemDto,
      });
    } catch (error) {
      return error.message;
    }
  }

  async findAllItem(grocery_id: number) {
    console.log(grocery_id);
    const resp = await this.prisma.groceries_item.findMany({
      where: { grocery_id: grocery_id },
      include: {
        user: true,
      },
    });
    console.log(resp);
    return resp;
    // return await this.prisma.groceries_item.findMany({ where: { grocery_id } });
  }

  async deleteItem(item_id: number) {
    console.log(item_id);
    const resp = await this.prisma.groceries_item.delete({
      where: { item_id },
    });
    console.log(resp);
    return resp;
  }
}
