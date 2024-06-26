import { Controller, NotFoundException } from '@nestjs/common';
import { MessagePattern } from '@nestjs/microservices';

const userdata: { id: string, name: string }[] = [{ id: "1234", name: "Tobiloba Ola" }];

@Controller()
export class UserController {
    @MessagePattern({ cmd: 'get_user' })
    getUser(data: { userId: string }): any {
        try {
            const user = userdata.find((value) => value.id === data.userId);

            if (!user) {
                throw new NotFoundException('User not found');
            }
            return user;
        } catch (error) {
            console.log(error);
            throw error;
        }
    }
}
