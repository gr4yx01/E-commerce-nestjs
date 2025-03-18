import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Order } from './entity/orders.entity';
import { Repository } from 'typeorm';
import { Product } from 'src/products/entities/product.entity';
import { CreateOrderDto } from './dto/create-order.dto';
import { PaginationService } from 'src/common/pagination/pagination.service';

@Injectable()
export class OrdersService {
    constructor(
        @InjectRepository(Order) private orderRepository: Repository<Order>,
        @InjectRepository(Product) private productRepository: Repository<Product>,
        private readonly paginationService: PaginationService
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
        const totalItems = await this.orderRepository.count()

        console.log(totalItems)

        const meta = this.paginationService.getPaginationMeta(page, limit, totalItems)

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
            orders,
            meta
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
