import {
  Body,
  Controller,
  Get,
  Param,
  ParseIntPipe,
  Post,
} from '@nestjs/common';
import { CreateOrderDto } from 'src/dtos/create-order.dto';
import { OrdersServiceAbstract } from 'src/contracts/orders-service.abstract';

@Controller('orders')
export class OrdersController {
  constructor(private readonly ordersService: OrdersServiceAbstract) {}

  @Get()
  findAll() {
    return this.ordersService.findAll();
  }

  @Get(':id')
  findById(@Param('id', ParseIntPipe) id: number) {
    return this.ordersService.findById(id);
  }

  @Post()
  create(@Body() orderData: CreateOrderDto) {
    return this.ordersService.create(orderData);
  }

  @Post(':id/advance')
  advance(@Param('id', ParseIntPipe) id: number) {
    return this.ordersService.advance(id);
  }
}
