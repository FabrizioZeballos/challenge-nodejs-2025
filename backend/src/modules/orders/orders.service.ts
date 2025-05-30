import {
  BadRequestException,
  Inject,
  Injectable,
  InternalServerErrorException,
  NotFoundException,
} from '@nestjs/common';
import { CreateOrderDto } from 'src/dtos/create-order.dto';
import { OrdersServiceAbstract } from 'src/contracts/orders-service.abstract';
import { OrdersRepositoryAbstract } from 'src/contracts/orders-repository.abstract';
import { Order } from 'src/models/order.model';
import { CACHE_MANAGER } from '@nestjs/cache-manager';
import { Cache } from 'cache-manager';

@Injectable()
export class OrdersService extends OrdersServiceAbstract {
  constructor(
    private readonly ordersRepository: OrdersRepositoryAbstract,
    @Inject(CACHE_MANAGER) private cacheManager: Cache,
  ) {
    super();
  }

  async findAll(): Promise<Order[]> {
    await this.cacheManager.set('test-key', 'hello redis', 60);
    const testValue = await this.cacheManager.get('test-key');
    console.log('Test Redis Value:', testValue);

    const cacheKey = 'active-orders';
    const cached = await this.cacheManager.get<Order[]>(cacheKey);
    console.log('Cache:', cached);

    if (cached) {
      console.log('✅ Returning orders from cache');
      return cached;
    }

    const orders = await this.ordersRepository.findAll();

    const plainOrders = orders.map((order) => order.toJSON()); // 🔁

    console.log('plain orders:', plainOrders);

    await this.cacheManager.set(cacheKey, plainOrders, 30);

    return orders;
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
