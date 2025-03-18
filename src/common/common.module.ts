import { Module } from '@nestjs/common';
import { CommonService } from './common.service';
import { CommonController } from './common.controller';
import { PaginationService } from './pagination/pagination.service';

@Module({
  controllers: [CommonController],
  providers: [CommonService, PaginationService],
  exports: [  ]
})
export class CommonModule {}
