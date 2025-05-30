import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { CreateOrderDto } from 'src/dtos/create-order.dto';
import { OrderItem } from 'src/models/order-item.model';
import { Order } from 'src/models/order.model';

@Injectable()
export class OrdersRepository {
  constructor(
    @InjectModel(Order) private orderModel: typeof Order,
    @InjectModel(OrderItem) private itemModel: typeof OrderItem,
  ) {}

  async create(dto: CreateOrderDto) {
    const total = dto.items.reduce(
      (sum, item) => sum + item.quantity * item.unitPrice,
      0,
    );

    const order = await this.orderModel.create({
      client_name: dto.clientName,
      status: 'initiated',
      total,
    });

    await Promise.all(
      dto.items.map((item) =>
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
}
