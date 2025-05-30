import { Injectable } from '@nestjs/common';
import { IOrdersService } from 'src/interfaces/orders.interface';
import { OrdersRepository } from './orders.repository';
import { CreateOrderDto } from 'src/dtos/create-order.dto';

@Injectable()
export class OrdersService {
  constructor(private readonly repo: OrdersRepository) {}

  async create(dto: CreateOrderDto) {
    return this.repo.create(dto);
  }
}
