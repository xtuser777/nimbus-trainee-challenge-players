import { Body, Controller, Delete, Get, Param, Post, Put } from '@nestjs/common';
import { ItemsService } from './items.service';
import { CreateItemDto } from './dtos/create-item.dto';
import { UpdateItemDto } from './dtos/update-item.dto';

@Controller('items')
export class ItemsController {
  constructor(private readonly itemsService: ItemsService) {}

  @Get('/')
  async findAll() {
    return this.itemsService.findAll();
  }

  @Get("/:id")
  async findOne(@Param('id') id: string) {
    return this.itemsService.findOne(id);
  }

  @Post("/")
  async create(@Body() body: CreateItemDto) {
    return this.itemsService.save(body);
  }

  @Put('/:id')
  async update(@Param("id") id: string, @Body() body: UpdateItemDto) {
    return this.itemsService.update(id, body);
  }

  @Delete('/:id')
  async delete(@Param("id") id: string) {
    return this.itemsService.delete(id);
  }
}
