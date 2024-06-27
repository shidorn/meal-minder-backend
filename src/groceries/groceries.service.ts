import { Injectable } from '@nestjs/common';
// import { JwtService } from '@nestjs/jwt';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreateGroceryDto } from './dto/create-grocery.dto';

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
}
