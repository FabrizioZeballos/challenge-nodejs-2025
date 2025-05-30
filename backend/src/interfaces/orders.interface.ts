import { CreateOrderDto } from 'src/dtos/create-order.dto';
import { Order } from 'src/models/order.model';

export interface IOrdersService {
  create(orderData: CreateOrderDto): Promise<Order>;
}

export interface IOrdersRepository {
  create(orderData: CreateOrderDto): Promise<Order>;
}
