import { Module } from '@nestjs/common';
import { OrdersService } from './orders.service';
import { OrdersController } from './orders.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Order } from './entity/orders.entity';
import { Product } from 'src/products/entities/product.entity';
import { CommonModule } from 'src/common/common.module';
import { PaginationService } from 'src/common/pagination/pagination.service';
import { User } from 'src/users/entity/user.entity';
import { JwtService } from '@nestjs/jwt';

@Module({
  imports: [TypeOrmModule.forFeature([Order, Product, User]), CommonModule],
  controllers: [OrdersController],
  providers: [OrdersService, PaginationService],
})
export class OrdersModule {}
