import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  Param,
  Post,
  Put,
} from '@nestjs/common';
import { ItemsService } from './items.service';
import { CreateItemRequestDto } from './dtos/create-item-request.dto';
import { UpdateItemRequestDto } from './dtos/update-item-request.dto';

@Controller('items')
export class ItemsController {
  constructor(private readonly itemsService: ItemsService) {}

  @Get('/')
  async findAll() {
    return this.itemsService.findAll();
  }

  @Get('/:id')
  async findOne(@Param('id') id: string) {
    return this.itemsService.findOne(id);
  }

  @Post('/')
  @HttpCode(201)
  async create(@Body() body: CreateItemRequestDto) {
    return this.itemsService.save(body);
  }

  @Put('/:id')
  async update(@Param('id') id: string, @Body() body: UpdateItemRequestDto) {
    return this.itemsService.update(id, body);
  }

  @Delete('/:id')
  async delete(@Param('id') id: string) {
    return this.itemsService.delete(id);
  }
}
