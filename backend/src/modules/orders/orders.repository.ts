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

  async findById(id: number): Promise<Order | null> {
    return await this.orderModel.findByPk(id, {
      include: [OrderItem],
    });
  }

  async create(orderData: CreateOrderDto, total: number): Promise<Order> {
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

    return order;
  }

  async advance(order: Order): Promise<Order> {
    if (order.status === 'initiated') {
      order.status = 'sent';
      await order.save();
    } else if (order.status === 'sent') {
      order.status = 'delivered';
      await order.save();
    }

    return order;
  }

  async deleteById(id: number): Promise<void> {
    await this.orderModel.destroy({ where: { id } });
  }
}
