import { Body, Controller, Get, Param, Post, Query } from '@nestjs/common';
import { OrdersService } from './orders.service';
import { CreateOrderDto } from './dto/create-order.dto';
import { create } from 'domain';

@Controller('orders')
export class OrdersController {
  constructor(private readonly ordersService: OrdersService) {}

  @Post()
  createOrder(@Body() createOrderDto: CreateOrderDto) {
    return this.ordersService.createOrder(createOrderDto)
  }

  @Get()
  getAllOrder(@Query('page') page: number, @Query('limit') limit: number) {
    return this.ordersService.getOrders(page, limit)
  }

  @Get(':orderId')
  getOrderById(@Param('orderId') id: string) {
    return this.ordersService.getOrderById(id)
  }
}
