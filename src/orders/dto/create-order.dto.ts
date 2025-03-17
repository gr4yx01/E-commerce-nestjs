import { ApiProperty } from "@nestjs/swagger"
import { IsDecimal, IsPositive, IsString, IsUUID } from "class-validator"

export class CreateOrderDto {
    @ApiProperty({ example: 'customer-id', required: false })
    @IsString({ message: 'Customer ID must be a string' })
    // @IsUUID('all', { message: 'Customer ID must be of type UUID' })
    customerId: string

    @ApiProperty({ example: 'product-id' })
    @IsString({ message: 'productId must be a string' })
    @IsUUID(
      'all',
      { message: 'productId must be a valid UUID' }
    )
    productId: string

    @ApiProperty({ example: 'Order quantity' })
    @IsPositive({ message: 'Quantity must be greater than 0' })
    quantity: number

    @ApiProperty({ example: 'Total price of product ordered' })
    @IsDecimal({ decimal_digits: '2' }, { message: 'Total price must be a decimal number' })
    totalPrice: number
}