import { ICreateOrder } from './ICreateOrder'
import { IOrder } from './IOrder'

export interface IOrdersRepository {
    findById(id: string): Promise<IOrder | undefined>
    create(data: ICreateOrder): Promise<IOrder>
    findAll(): Promise<IOrder[] | undefined>
}
