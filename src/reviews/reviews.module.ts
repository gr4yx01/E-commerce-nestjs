import { Module } from '@nestjs/common';
import { ReviewsService } from './reviews.service';
import { ReviewsController } from './reviews.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Review } from './entities/review.model';

@Module({
  imports: [TypeOrmModule.forFeature([Review])],
  controllers: [ReviewsController],
  providers: [ReviewsService],
  exports: [ReviewsService]
})
export class ReviewsModule {}
