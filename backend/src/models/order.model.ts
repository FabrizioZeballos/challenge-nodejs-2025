import {
  AutoIncrement,
  Column,
  DataType,
  HasMany,
  Model,
  PrimaryKey,
  Table,
} from 'sequelize-typescript';
import { OrderItem } from './order-item.model';
import { InferAttributes, InferCreationAttributes } from 'sequelize';

@Table({ tableName: 'orders' })
export class Order extends Model<
  InferAttributes<Order>,
  InferCreationAttributes<Order>
> {
  @Column({ type: DataType.STRING })
  client_name: string;

  @Column({ type: DataType.FLOAT })
  total: number;

  @Column({ type: DataType.STRING })
  status: string;

  @HasMany(() => OrderItem)
  items?: OrderItem[];
}
