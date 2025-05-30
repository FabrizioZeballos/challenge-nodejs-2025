import { IsInt, IsNotEmpty, IsNumber } from 'class-validator';

export class OrderItemDto {
  @IsNotEmpty()
  description: string;

  @IsInt()
  quantity: number;

  @IsNumber()
  unitPrice: number;
}
