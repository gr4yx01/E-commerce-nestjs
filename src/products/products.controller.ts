import { Body, Controller, Get, Param, Post, Query, UseGuards } from '@nestjs/common';
import { ProductsService } from './products.service';
import { CreateProductDto } from './dto/products.dto';
import { CreateProductDocs, GetProductByIdDocs, GetProductsDocs } from './docs/products.docs';
import { ReviewDto } from 'src/reviews/dto/review.dto';
import { AuthGuard } from 'src/auth/guards/authentication.guard';
import { AdminGuard } from 'src/auth/guards/authorization.guard';

@UseGuards(AuthGuard)
@Controller('products')
export class ProductsController {
  constructor(private readonly productsService: ProductsService) {}

  @UseGuards(AdminGuard)
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

  @Post(':id/review')
  reviewProduct(@Param('id') id: string, @Body() reviewDto: ReviewDto) {
    return this.productsService.reviewProduct(id, reviewDto)
  }
}
