import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Order } from './entity/orders.entity';
import { Repository } from 'typeorm';
import { Product } from 'src/products/entities/product.entity';
import { CreateOrderDto } from './dto/create-order.dto';

@Injectable()
export class OrdersService {
    constructor(
        @InjectRepository(Order) private orderRepository: Repository<Order>,
        @InjectRepository(Product) private productRepository: Repository<Product>
    ) {}

    async createOrder(createOrderDto: CreateOrderDto) {
        try {
            const { productId, quantity, totalPrice } = createOrderDto

            const product = await this.productRepository.findOne({
                where: { id: productId }
            })

            if(!product) {
                throw new NotFoundException('Product Not Found')
            }

            const order = this.orderRepository.create({
                product,
                quantity,
                totalPrice
            })

            await this.orderRepository.save(order)

            return {
                message: 'Order placed successfully',
                order
            }
        } catch (error) {
            return {
                message: 'An error occurred!',
                error,
            };
        }
    }

    async getOrders(page = 1, limit = 10) {
        const orders = await this.orderRepository.find({
            skip: (page - 1) * limit,
            take: limit,
            relations: [
                'product',
                // 'customer'
            ],
            select: {
                product: {
                    name: true,
                    image: true,
                    price: true
                }
            }
        })

        return {
            orders
        }
    }

    async getOrderById(id: string) {
        const order = await this.orderRepository.findOne({
          where: { id },
          relations: [
            'product',
            // 'customer',
          ],
        });
        return {
          order,
        };
      }
}
