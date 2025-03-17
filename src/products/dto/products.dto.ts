import { IsDecimal, IsNotEmpty, IsObject, IsString, IsUrl, Length, Validate } from "class-validator"
import { ProductSpecs } from "../custom-validators/Productspec"
import { ApiProperty } from "@nestjs/swagger"
import { ProductDescription } from "../custom-validators/ProductDescription"

export class CreateProductDto {
    @ApiProperty({ description: 'product name', example: 'Product A' })
    @IsString({ message: 'name must be a string' })
    @Length(5, 25, { 
        message: 'name must be between 5 and 25 characters'
    })
    name: string

    @ApiProperty({ description: 'product description', example: 'Description-product'})
    @IsString({ message: 'description must be a string' })
    @Length(25, 255, {
        message: 'description must be between 25 and 255 character'
    })
    @Validate(ProductDescription)
    @IsNotEmpty()
    description: string

    @ApiProperty({ description: 'price of product', example: 1000})
    @IsDecimal({ decimal_digits: '2' }, { message: 'price must be a digital number '})
    price: number

    @ApiProperty({ description: 'product specification', example: {
        "ram": "64gb",
        "year": "5 years"
    }})
    @IsObject({ message: 'specification must be a valid object'})
    @Validate(ProductSpecs)
    specs: Record<string, string>

    @ApiProperty({ description: 'product image', example: 'http://pinterest.com/abc'})
    @IsString({
        message: 'image must be a string',
      })
      @IsUrl(
        {
          require_protocol: true,
        },
        {
          message: 'image must be a valid URL',
        },
      )
      image: string;
}