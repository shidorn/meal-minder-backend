import {
  Param,
  Get,
  Post,
  Body,
  Controller,
  UseInterceptors,
  UploadedFile,
} from '@nestjs/common';
import { RecipesService } from './recipes.service';
import { CreateRecipeDto } from './dto/create-recipe.dto';
import { FileInterceptor } from '@nestjs/platform-express';
import { createWriteStream } from 'fs';
import { ConfigService } from '@nestjs/config';
// import { CreateIngredientsDto } from './dto/create-ingredient.dto';
// import { extname } from 'path';
// import { FileUploadInterceptor } from './file-upload.interceptor';

@Controller('recipes')
export class RecipesController {
  constructor(
    private readonly recipeService: RecipesService,
    private readonly configService: ConfigService,
  ) {}

  @Post('add-recipe')
  create(@Body() createRecipeDto: CreateRecipeDto) {
    console.log(createRecipeDto);

    return this.recipeService.create(createRecipeDto);
  }

  @Post('add-ingredients')
  // createIngredient(@Body() createIngredientDto: CreateIngredientsDto) {
  createIngredient(
    @Body()
    body: {
      recipe_id: number;
      recipe_ingredients: {
        ingredient_name: string;
        ingredient_quantity: number;
      }[];
    },
  ) {
    const { recipe_ingredients, recipe_id } = body;
    console.log(recipe_ingredients);
    return this.recipeService.createIngredient(recipe_id, recipe_ingredients);
  }

  @Get('recipe-list')
  findAll() {
    return this.recipeService.findAll();
  }

  @Post('image')
  @UseInterceptors(FileInterceptor('imgFile'))
  uploadImage(@UploadedFile() file: Express.Multer.File) {
    console.log(file);

    // const randomName = Array(32)
    //   .fill(null)
    //   .map(() => Math.round(Math.random() * 16).toString(16))
    //   .join('');
    // const fileName = `${randomName}${extname(file.originalname)}`;
    const fileName = `${file.originalname}`;
    // const uploadPath = `/Users/baca17097841/Documents/GitHub/meal-minder/meal-minder/public/images/${fileName}`;
    const uploadPath =
      this.configService.get<string>('PHOTO_SERVER') +
      `meal-minder/public/images/${fileName}`;

    console.log(uploadPath);
    const fileStream = createWriteStream(uploadPath);
    fileStream.write(file.buffer);
    fileStream.end();

    return { filename: file.filename };
  }

  @Post('delete-recipe')
  deleteRecipe(@Body('id') id: string) {
    console.log('delete-recipe id : ', id);
    return this.recipeService.delete(parseInt(id));
  }

  @Post('update-favorite/:id')
  updateFavorite(
    @Param('id') id: string,
    @Body('is_favorite') is_favorite: boolean,
  ) {
    return this.recipeService.updateFavorite(+id, is_favorite);
  }

  @Get('get-favorites')
  getFavorites() {
    return this.recipeService.findFavorites();
  }
}
