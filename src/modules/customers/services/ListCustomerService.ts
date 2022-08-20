import { inject, injectable } from 'tsyringe'

import { ICustomer } from '../domain/ICustomer'
import { ICustomersRepository } from '../domain/ICustomersRepository'

@injectable()
class ListCustomerService {
    constructor(
        @inject('CustomersRepository')
        private customersRepository: ICustomersRepository,
    ) {}

    public async execute(): Promise<ICustomer[] | undefined> {
        const customers = await this.customersRepository.findAll()

        return customers
    }
}

export default ListCustomerService
