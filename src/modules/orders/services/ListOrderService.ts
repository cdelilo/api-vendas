import { inject, injectable } from 'tsyringe'

import { IOrder } from '../domain/IOrder'
import { IOrdersRepository } from '../domain/IOrdersRepository'

@injectable()
class ListOrderService {
    constructor(
        @inject('OrdersRepository')
        private ordersRepository: IOrdersRepository,
    ) {}

    public async execute(): Promise<IOrder[] | undefined> {
        const orders = await this.ordersRepository.findAll()

        return orders
    }
}

export default ListOrderService
