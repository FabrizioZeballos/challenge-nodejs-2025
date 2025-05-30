import { Injectable } from '@nestjs/common';
import { CreateOrderDto } from 'src/dtos/create-order.dto';
import { OrdersServiceAbstract } from 'src/contracts/orders-service.abstract';
import { OrdersRepositoryAbstract } from 'src/contracts/orders-repository.abstract';
import { Order } from 'src/models/order.model';

@Injectable()
export class OrdersService extends OrdersServiceAbstract {
  constructor(private readonly ordersRepository: OrdersRepositoryAbstract) {
    super();
  }

  async findAll(): Promise<Order[]> {
    return this.ordersRepository.findAll();
  }

  async findById(id: number): Promise<Order> {
    return this.ordersRepository.findById(id);
  }

  async create(orderData: CreateOrderDto): Promise<string> {
    return this.ordersRepository.create(orderData);
  }

  async advance(id: number): Promise<string> {
    return this.ordersRepository.advance(id);
  }
}
