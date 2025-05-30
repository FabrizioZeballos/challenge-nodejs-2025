import { Module } from '@nestjs/common';
import { OrdersService } from './orders.service';
import { OrdersController } from './orders.controller';
import { SequelizeModule } from '@nestjs/sequelize';
import { Order } from 'src/models/order.model';
import { OrderItem } from 'src/models/order-item.model';
import { OrdersRepository } from './orders.repository';
import { OrdersRepositoryAbstract } from 'src/contracts/orders-repository.abstract';
import { OrdersServiceAbstract } from 'src/contracts/orders-service.abstract';

@Module({
  imports: [SequelizeModule.forFeature([Order, OrderItem])],
  controllers: [OrdersController],
  providers: [
    OrdersService,
    OrdersRepository,
    {
      provide: OrdersServiceAbstract,
      useClass: OrdersService,
    },
    {
      provide: OrdersRepositoryAbstract,
      useClass: OrdersRepository,
    },
  ],
})
export class OrdersModule {}
