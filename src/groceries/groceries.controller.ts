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
    console.log(createItemDto.item_quantity);
    const data = {
      item_id: createItemDto.item_id,
      item_name: createItemDto.item_name,
      item_quantity: parseInt(createItemDto.item_quantity.toString()),
      item_category: createItemDto.item_category,
      user_id: createItemDto.user_id,
      grocery_id: createItemDto.grocery_id,
    };
    return this.groceryService.createItem(data);
  }

  @Post('update-item/:id')
  updateItem(@Param('id') id: string, @Body() updateItemDto: UpdateItemDto) {
    console.log(id);
    console.log(updateItemDto);
    return this.groceryService.updateItem(+id, updateItemDto);
  }

  @Post('update-item-status/:id')
  updateItemStatus(
    @Param('id') id: string,
    @Body('is_purchase') is_purchase: boolean,
  ) {
    return this.groceryService.updateItemStatus(+id, is_purchase);
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

  // @UseGuards(JwtAuthGuard)
  @Get('item-list-purchased')
  findAllItemPurchased() {
    return this.groceryService.findAllItemPurchased();
  }

  //   @UseGuards(JwtAuthGuard)
  @Get('grocery-list-status/:id')
  async getGroceryListStatus(@Param('id') id: string): Promise<any> {
    const status = await this.groceryService.groceryListStatus(+id);
    console.log(status);
    return status;
  }
}
