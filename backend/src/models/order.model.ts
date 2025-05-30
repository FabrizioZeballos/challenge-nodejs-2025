import { Column, DataType, HasMany, Model, Table } from 'sequelize-typescript';
import { OrderItem } from './order-item.model';
import { InferAttributes, InferCreationAttributes } from 'sequelize';

@Table({ tableName: 'orders' })
export class Order extends Model<
  InferAttributes<Order>,
  InferCreationAttributes<Order>
> {
  @Column({ type: DataType.STRING })
  declare client_name: string;

  @Column({ type: DataType.FLOAT })
  declare total: number;

  @Column({ type: DataType.STRING })
  declare status: string;

  @HasMany(() => OrderItem)
  declare items?: OrderItem[];
}
