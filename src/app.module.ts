import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { ProductsModule } from './products/products.module';
import { OrdersModule } from './orders/orders.module';
import { CommonModule } from './common/common.module';
import { ReviewsModule } from './reviews/reviews.module';
import { UsersModule } from './users/users.module';
import { AuthModule } from './auth/auth.module';
import dbConfig from 'config/db.config';
import aiConfig from 'config/ai.config';
import jwtConfig from 'config/jwt.config';

@Module({
  imports: [
  ConfigModule.forRoot({
    isGlobal: true,
    load: [dbConfig, aiConfig, jwtConfig],
    cache: true
  }),
  TypeOrmModule.forRootAsync({
    useFactory: (config: ConfigService) => ({
      type: 'postgres',
      host: config.get('db.host'),
      port: +config.get('db.port'),
      username: config.get('db.username'),
      password: config.get('db.password'),
      database: config.get('db.dbName'),
      autoLoadEntities: true,
      synchronize: true
    }),
    inject: [ConfigService]
  }),
  ProductsModule,
  OrdersModule,
  CommonModule,
  ReviewsModule,
  UsersModule,
  AuthModule
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
