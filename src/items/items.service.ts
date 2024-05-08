import { Injectable } from '@nestjs/common';
import { CreateItemDto } from './dto/create-item.dto';
import { UpdateItemDto } from './dto/update-item.dto';
import { exampleItems } from './entities/hard-items';

@Injectable()
export class ItemsService {
  create(createItemDto: CreateItemDto) {
    exampleItems.push(createItemDto);
    return createItemDto;
  }

  findAll() {
    return exampleItems;
  }

  findOne(id: number) {
    return exampleItems.find((v) => v.id === id);
  }

  update(id: number, updateItemDto: UpdateItemDto) {
    // replace item with updateItemDto
    const index = exampleItems.findIndex((v) => v.id === id);
    exampleItems[index] = {
      ...exampleItems[index],
      ...updateItemDto,
    };
    return exampleItems[index];
  }

  remove(id: number) {
    // remove item by id
    return exampleItems.splice(
      exampleItems.findIndex((v) => v.id === id),
      1,
    )[0];
  }
}
