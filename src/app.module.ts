import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { MathModule } from './math/math.module';
import { UserModule } from './user/user.module';
import { OrderModule } from './order/order.module';

@Module({
  imports: [MathModule, UserModule, OrderModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
