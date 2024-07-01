import { Controller, Post, Body, Get, Param, UseGuards } from '@nestjs/common';
import { GroceriesService } from './groceries.service';
import { CreateGroceryDto } from './dto/create-grocery.dto';
import { CreateItemDto } from './dto/create-item.dto';
import { JwtAuthGuard } from 'src/login/jwt-auth.guard';
import { UpdateItemDto } from './dto/update-item.dto';

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

  //   @UseGuards(JwtAuthGuard)
  @Post('add-item')
  createItem(@Body() createItemDto: CreateItemDto) {
    console.log(createItemDto);
    return this.groceryService.createItem(createItemDto);
  }

  @Post('update-item/:id')
  updateItem(@Param('id') id: string, @Body() updateItemDto: UpdateItemDto) {
    console.log(id);
    console.log(updateItemDto);
    return this.groceryService.updateItem(+id, updateItemDto);
  }

  @UseGuards(JwtAuthGuard)
  @Get('item-list/:id')
  findAllItem(@Param('id') id: string) {
    return this.groceryService.findAllItem(+id);
  }

  //   @UseGuards(JwtAuthGuard)
  @Post('delete-item')
  deleteItem(@Body('id') id: string) {
    console.log(id);
    return this.groceryService.deleteItem(parseInt(id));
  }
}
