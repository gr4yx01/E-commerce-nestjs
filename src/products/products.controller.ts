import { Body, Controller, Get, Param, Post, Query } from '@nestjs/common';
import { ProductsService } from './products.service';
import { CreateProductDto } from './dto/products.dto';
import { CreateProductDocs, GetProductByIdDocs, GetProductsDocs } from './docs/products.docs';

@Controller('products')
export class ProductsController {
  constructor(private readonly productsService: ProductsService) {}

  @Post()
  @CreateProductDocs()
  createProduct(@Body() createProductDto: CreateProductDto) {
    return this.productsService.createProduct(createProductDto)
  }

  @Get()
  @GetProductsDocs()
  getAllProduct(@Query('page') page: number, @Query('limit') limit: number) {
    return this.productsService.getProducts(page, limit)
  }

  @Get(':productId')
  @GetProductByIdDocs()
  getProductById(@Param('productId') id: string ){
    return this.productsService.getProductById(id)
  }
}
