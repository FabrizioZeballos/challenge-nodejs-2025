import {
  AutoIncrement,
  BelongsTo,
  Column,
  DataType,
  ForeignKey,
  Model,
  PrimaryKey,
  Table,
} from 'sequelize-typescript';
import { Order } from './order.model';
import { InferAttributes, InferCreationAttributes } from 'sequelize';

@Table({ tableName: 'order_items' })
export class OrderItem extends Model<
  InferAttributes<OrderItem>,
  InferCreationAttributes<OrderItem>
> {
  @Column({ type: DataType.STRING })
  declare description: string;

  @Column({ type: DataType.INTEGER })
  declare quantity: number;

  @Column({ type: DataType.FLOAT })
  declare unit_price: number;

  @ForeignKey(() => Order)
  @Column({ type: DataType.INTEGER })
  declare orderId: number;

  @BelongsTo(() => Order)
  declare order?: Order;
}
