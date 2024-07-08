import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreateRecipeDto } from './dto/create-recipe.dto';

@Injectable()
export class RecipesService {
  constructor(private readonly prisma: PrismaService) {}

  async create(createRecipeDto: CreateRecipeDto) {
    // console.log(createRecipeDto);
    try {
      return await this.prisma.recipes.create({
        data: createRecipeDto,
      });
    } catch (error) {
      return error.message;
    }
  }

  async findAll() {
    return await this.prisma.recipes.findMany();
  }
}
