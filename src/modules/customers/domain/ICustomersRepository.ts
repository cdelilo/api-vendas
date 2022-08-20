import { ICreateCustomer } from './ICreateCustomer'
import { ICustomer } from './ICustomer'

export interface ICustomersRepository {
    findAll(): Promise<ICustomer[] | undefined>
    findByName(name: string): Promise<ICustomer | undefined>
    findById(id: string): Promise<ICustomer | undefined>
    findByEmail(email: string): Promise<ICustomer | undefined>
    create(data: ICreateCustomer): Promise<ICustomer>
    save(customer: ICustomer): Promise<ICustomer>
    remove(customer: ICustomer): Promise<void>
}
