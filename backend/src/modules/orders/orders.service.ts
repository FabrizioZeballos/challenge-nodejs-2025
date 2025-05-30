import {
  BadRequestException,
  Injectable,
  InternalServerErrorException,
  NotFoundException,
} from '@nestjs/common';
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
    const order = await this.ordersRepository.findById(id);

    if (!order) throw new NotFoundException('Order not found');

    return order;
  }

  async create(orderData: CreateOrderDto): Promise<Order> {
    try {
      const total = orderData.items.reduce(
        (sum, item) => sum + item.quantity * item.unitPrice,
        0,
      );

      return await this.ordersRepository.create(orderData, total);
    } catch (error) {
      throw new InternalServerErrorException('Failed to create order');
    }
  }

  async advance(id: number): Promise<Order> {
    const order = await this.ordersRepository.findById(id);
    if (!order) throw new NotFoundException('Order not found');

    if (order.status !== 'initiated' && order.status !== 'sent') {
      throw new BadRequestException(
        `Cannot advance order with status: ${order.status}`,
      );
    }

    const updatedOrder = await this.ordersRepository.advance(order);

    if (updatedOrder.status === 'delivered') {
      await this.ordersRepository.deleteById(updatedOrder.id);
    }

    return updatedOrder;
  }
}
