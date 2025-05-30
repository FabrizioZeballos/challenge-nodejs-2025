import { CreateOrderDto } from 'src/dtos/create-order.dto';
import { Order } from 'src/models/order.model';

export abstract class OrdersServiceAbstract {
  abstract findAll(): Promise<Order[]>;
  abstract findById(id: number): Promise<Order>;
  abstract create(orderData: CreateOrderDto): Promise<string>;
  abstract advance(id: number): Promise<string>;
}
