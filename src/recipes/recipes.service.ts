import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreateRecipeDto } from './dto/create-recipe.dto';
// import { CreateIngredientsDto } from './dto/create-ingredient.dto';

@Injectable()
export class RecipesService {
  constructor(private readonly prisma: PrismaService) {}

  async create(createRecipeDto: CreateRecipeDto) {
    // console.log(createRecipeDto);
    try {
      const createRecipe = await this.prisma.recipes.create({
        data: createRecipeDto,
      });
      return createRecipe;
    } catch (error) {
      return error.message;
    }
  }

  // async createIngredient(createIngredientDto: CreateIngredientsDto) {
  async createIngredient(
    recipe_id: number,
    ingredients: { ingredient_name: string; ingredient_quantity: number }[],
  ) {
    try {
      const ingredientsWithRecipeId = ingredients.map((ingredient) => ({
        recipe_id: recipe_id,
        ingredient_name: ingredient.ingredient_name,
        ingredient_quantity: ingredient.ingredient_quantity,
      }));
      console.log('ingredientsWithRecipeId : ', ingredientsWithRecipeId);
      const createdIngredients =
        await this.prisma.recipe_ingredients.createMany({
          data: ingredientsWithRecipeId,
        });

      return createdIngredients;
    } catch (error) {
      return error.message;
    }
  }

  async findAll() {
    return await this.prisma.recipes.findMany({
      include: { recipe_ingredients: true },
    });
  }

  async delete(recipe_id: number) {
    return await this.prisma.recipes.delete({ where: { recipe_id } });
  }
}
