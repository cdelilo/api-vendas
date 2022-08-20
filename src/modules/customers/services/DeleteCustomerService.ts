import { inject, injectable } from 'tsyringe'

import AppError from '@shared/errors/AppError'

import { ICustomersRepository } from '../domain/ICustomersRepository'
import { IDeleteCustomer } from '../domain/IDeleteCustomer'

@injectable()
class DeleteCustomerService {
    constructor(
        @inject('CustomersRepository')
        private customersRepository: ICustomersRepository,
    ) {}

    public async execute({ id }: IDeleteCustomer): Promise<void> {
        const customer = await this.customersRepository.findById(id)

        if (!customer) {
            throw new AppError('Customer not found.')
        }

        await this.customersRepository.remove(customer)
    }
}

export default DeleteCustomerService
