import { Injectable } from '@nestjs/common';
import { ReviewDto } from './dto/review.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Review } from './entities/review.model';
import { Repository } from 'typeorm';

@Injectable()
export class ReviewsService {
    constructor(@InjectRepository(Review) private reviewRepository: Repository<Review>) {}

    async reviewProduct(reviewDto: ReviewDto) {
        const data = this.reviewRepository.create(reviewDto)

        return {
            message: 'Product reviewed',
            data
        }
    }
}
