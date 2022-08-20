import { getRepository, Repository } from 'typeorm'

import { ICreateOrder } from '@modules/orders/domain/ICreateOrder'
import { IOrdersRepository } from '@modules/orders/domain/IOrdersRepository'

import Order from '../entities/Order'

class OrdersRepository implements IOrdersRepository {
    private ormRepository: Repository<Order>

    constructor() {
        this.ormRepository = getRepository(Order)
    }

    public async findById(id: string): Promise<Order | undefined> {
        const order = this.ormRepository.findOne(id, {
            relations: ['order_products', 'customer'],
        })

        return order
    }

    public async create({ customer, products }: ICreateOrder): Promise<Order> {
        const order = this.ormRepository.create({
            customer,
            order_products: products,
        })

        await this.ormRepository.save(order)

        return order
    }

    public async findAll(): Promise<Order[] | undefined> {
        const orders = await this.ormRepository.find()

        return orders
    }
}

export default OrdersRepository
