import { Controller, Get, Param } from '@nestjs/common';
import { ClientProxy, ClientProxyFactory, Transport } from '@nestjs/microservices';
import { ApiTags } from '@nestjs/swagger';

const orders: { id: string, userId: string, name: string }[] = [
    { id: "1", userId: "1234", name: "tin" },
    { id: "2", userId: "1234", name: "milk" },
    { id: "3", userId: "14", name: "pen" }
]

@ApiTags('order')
@Controller('order')
export class OrderController {
    private client: ClientProxy

    constructor() {
        this.client = ClientProxyFactory.create({
            transport: Transport.TCP,
            options: {
                port: 3001
            }
        })
    }

    @Get('user/:id')
    async getUserOrder(@Param('id') id: string) {
        const pattern = { cmd: 'get_user' }
        const payload = { userId: id }
        const user: { id: string, name: string } = await this.client.send(pattern, payload).toPromise()
        const userOrder = orders.filter((value) => value.userId === user.id)
        return { user, orders: userOrder }
    }
}
