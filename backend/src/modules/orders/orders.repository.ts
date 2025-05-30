import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { Op } from 'sequelize';
import { OrdersRepositoryAbstract } from 'src/contracts/orders-repository.abstract';
import { CreateOrderDto } from 'src/dtos/create-order.dto';
import { OrderItem } from 'src/models/order-item.model';
import { Order } from 'src/models/order.model';

@Injectable()
export class OrdersRepository extends OrdersRepositoryAbstract {
  constructor(
    @InjectModel(Order) private readonly orderModel: typeof Order,
    @InjectModel(OrderItem) private readonly itemModel: typeof OrderItem,
  ) {
    super();
  }

  async findAll(): Promise<Order[]> {
    return this.orderModel.findAll({
      where: { status: { [Op.not]: 'delivered' } },
    });
  }

  async findById(id: number): Promise<Order> {
    const order = await this.orderModel.findByPk(id, {
      include: [OrderItem],
    });

    if (!order) throw new NotFoundException('Order not found');

    return order;
  }

  async create(orderData: CreateOrderDto): Promise<string> {
    const total = orderData.items.reduce(
      (sum, item) => sum + item.quantity * item.unitPrice,
      0,
    );

    const order = await this.orderModel.create({
      client_name: orderData.clientName,
      status: 'initiated',
      total,
    });

    await Promise.all(
      orderData.items.map((item) =>
        this.itemModel.create({
          description: item.description,
          quantity: item.quantity,
          unit_price: item.unitPrice,
          orderId: order.id,
        }),
      ),
    );

    return 'this.findById(order.id)';
  }

  async advance(id: number): Promise<string> {
    const order = await this.orderModel.findByPk(id);

    if (!order) throw new NotFoundException('Order not found');

    switch (order.status) {
      case 'initiated':
        order.status = 'sent';
        await order.save();
        return 'Order status updated to sent';

      case 'sent':
        await order.destroy();
        return 'Order delivered and deleted';

      default:
        throw new BadRequestException(
          `Cannot advance order with status: ${order.status}`,
        );
    }
  }
}
