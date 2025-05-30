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
  description: string;

  @Column({ type: DataType.INTEGER })
  quantity: number;

  @Column({ type: DataType.FLOAT })
  unit_price: number;

  @ForeignKey(() => Order)
  @Column({ type: DataType.INTEGER })
  orderId: number;

  @BelongsTo(() => Order)
  order?: Order;
}
