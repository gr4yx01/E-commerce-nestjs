import { ApiProperty } from "@nestjs/swagger"
import { IsNotEmpty, IsNumber, IsOptional, IsString } from "class-validator"
import { Product } from "src/products/entities/product.entity"

export class ReviewDto {
    @ApiProperty({ description: 'User review about the product', example: 'This is a nice product'})
    @IsString()
    @IsNotEmpty()
    content: string

    @ApiProperty({ description: 'The user review rating', example: 3.5})
    @IsNumber()
    @IsNotEmpty()
    rating: number

    @IsOptional()
    product: Product
}