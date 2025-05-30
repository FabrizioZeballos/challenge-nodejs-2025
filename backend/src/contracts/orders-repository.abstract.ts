import { CreateOrderDto } from 'src/dtos/create-order.dto';
import { Order } from 'src/models/order.model';

export abstract class OrdersRepositoryAbstract {
  abstract create(orderData: CreateOrderDto): Promise<string>;
}
