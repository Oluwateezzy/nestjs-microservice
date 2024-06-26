import { Module } from '@nestjs/common';
import { OrderController } from './order.controller';
import { ClientsModule, Transport } from '@nestjs/microservices';

@Module({
  imports: [
    ClientsModule.register([
      {
        name: 'USER_SERVICE', transport: Transport.TCP, options: {
          port: 3001
        }
      }
    ])
  ],
  controllers: [OrderController]
})
export class OrderModule {}
