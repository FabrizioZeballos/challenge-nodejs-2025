import { Body, Controller, Get, Post } from '@nestjs/common';
import { CreateOrderDto } from 'src/dtos/create-order.dto';
import { OrdersServiceAbstract } from 'src/contracts/orders-service.abstract';

@Controller('orders')
export class OrdersController {
  constructor(private readonly ordersService: OrdersServiceAbstract) {}

  @Post()
  create(@Body() orderData: CreateOrderDto) {
    return this.ordersService.create(orderData);
  }
}
