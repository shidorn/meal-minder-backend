import { Controller, Post, Body, Get } from '@nestjs/common';
import { GroceriesService } from './groceries.service';
import { CreateGroceryDto } from './dto/create-grocery.dto';
// import { JwtAuthGuard } from 'src/login/jwt-auth.guard';

@Controller('groceries')
export class GroceriesController {
  constructor(private readonly groceryService: GroceriesService) {}

  //   @UseGuards(JwtAuthGuard)
  @Post('add-grocery')
  create(@Body() createGroceryDto: CreateGroceryDto) {
    return this.groceryService.create(createGroceryDto);
  }

  @Get('grocery-list')
  findAll() {
    return this.groceryService.findAll();
  }
}
