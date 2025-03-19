import { Body, Controller, Get, Param, Post, Query, UseGuards } from '@nestjs/common';
import { OrdersService } from './orders.service';
import { CreateOrderDto } from './dto/create-order.dto';
import { AuthGuard } from 'src/auth/guards/authentication.guard';
import { CreateOrderDocs } from './docs/orders..doc';
import { ApiBearerAuth } from '@nestjs/swagger';

@UseGuards(AuthGuard)
@Controller('orders')
export class OrdersController {
  constructor(private readonly ordersService: OrdersService) {}

  @Post()
  @CreateOrderDocs()
  createOrder(@Body() createOrderDto: CreateOrderDto) {
    return this.ordersService.createOrder(createOrderDto)
  }

  @Get()
  @ApiBearerAuth()
  getAllOrder(@Query('page') page: number, @Query('limit') limit: number) {
    return this.ordersService.getOrders(page, limit)
  }

  @Get(':orderId')
  @ApiBearerAuth()
  getOrderById(@Param('orderId') id: string) {
    return this.ordersService.getOrderById(id)
  }
}
