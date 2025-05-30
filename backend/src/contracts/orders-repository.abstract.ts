import { CreateOrderDto } from 'src/dtos/create-order.dto';
import { Order } from 'src/models/order.model';

export abstract class OrdersRepositoryAbstract {
  abstract findAll(): Promise<Order[]>;
  abstract findById(id: number): Promise<Order | null>;
  abstract create(orderData: CreateOrderDto, total: number): Promise<Order>;
  abstract advance(order: Order): Promise<Order>;
  abstract deleteById(id: number): Promise<void>;
}
