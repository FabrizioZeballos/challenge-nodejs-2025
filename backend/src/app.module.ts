import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { SequelizeModule, SequelizeModuleOptions } from '@nestjs/sequelize';
import sequelizeConfig from './config/sequelize';
import { OrdersModule } from './modules/orders/orders.module';
import { Order } from './models/order.model';
import { OrderItem } from './models/order-item.model';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      load: [sequelizeConfig],
    }),
    SequelizeModule.forRootAsync({
      inject: [ConfigService],
      useFactory: (configService: ConfigService): SequelizeModuleOptions => {
        const config = configService.get<SequelizeModuleOptions>('sequelize');

        if (!config) {
          throw new Error('Sequelize config not found');
        }

        return config;
      },
    }),
    OrdersModule,
    SequelizeModule.forFeature([Order, OrderItem]),
  ],
})
export class AppModule {}
