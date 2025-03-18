import { Module } from '@nestjs/common';
import { ProductsService } from './products.service';
import { ProductsController } from './products.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Product } from './entities/product.entity';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { Review } from 'src/reviews/entities/review.model';
import { ReviewsModule } from 'src/reviews/reviews.module';

@Module({
  imports: [TypeOrmModule.forFeature([Product, Review]), ConfigModule, ReviewsModule],
  controllers: [ProductsController],
  providers: [ProductsService, ConfigService]
})
export class ProductsModule {}
