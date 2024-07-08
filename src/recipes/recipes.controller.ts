import {
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
// import { extname } from 'path';
// import { FileUploadInterceptor } from './file-upload.interceptor';

@Controller('recipes')
export class RecipesController {
  constructor(private readonly recipeService: RecipesService) {}

  @Post('add-recipe')
  create(@Body() createRecipeDto: CreateRecipeDto) {
    console.log(createRecipeDto);

    return this.recipeService.create(createRecipeDto);
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
    const uploadPath = `/Users/baca17097841/Documents/GitHub/meal-minder/meal-minder/public/images/${fileName}`;

    const fileStream = createWriteStream(uploadPath);
    fileStream.write(file.buffer);
    fileStream.end();

    return { filename: file.filename };
  }
}
