import { inject, injectable } from 'tsyringe'

import AppError from '@shared/errors/AppError'

import { IOrder } from '../domain/IOrder'
import { IOrdersRepository } from '../domain/IOrdersRepository'
import { IShowOrder } from '../domain/IShowOrder'

@injectable()
class ShowOrderService {
    constructor(
        @inject('OrdersRepository')
        private ordersRepository: IOrdersRepository,
    ) {}

    public async execute({ id }: IShowOrder): Promise<IOrder> {
        const order = await this.ordersRepository.findById(id)

        if (!order) {
            throw new AppError('Order not found.')
        }

        return order
    }
}

export default ShowOrderService