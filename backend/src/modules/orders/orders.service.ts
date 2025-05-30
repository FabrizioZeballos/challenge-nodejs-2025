import { Injectable } from '@nestjs/common';
import { CreateOrderDto } from 'src/dtos/create-order.dto';
import { OrdersServiceAbstract } from 'src/contracts/orders-service.abstract';
import { OrdersRepositoryAbstract } from 'src/contracts/orders-repository.abstract';

@Injectable()
export class OrdersService extends OrdersServiceAbstract {
  constructor(private readonly ordersRepository: OrdersRepositoryAbstract) {
    super();
  }

  async create(orderData: CreateOrderDto): Promise<string> {
    return this.ordersRepository.create(orderData);
  }
}
