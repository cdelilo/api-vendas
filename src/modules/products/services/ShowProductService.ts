import { inject, injectable } from 'tsyringe'

import AppError from '@shared/errors/AppError'

import { IProduct } from '../domain/IProduct'
import { IProductsRepository } from '../domain/IProductsRepository'
import { IShowProduct } from '../domain/IShowProduct'

@injectable()
class ShowProductService {
    constructor(
        @inject('ProductsRepository')
        private productsRepository: IProductsRepository,
    ) {}

    public async execute({ id }: IShowProduct): Promise<IProduct> {
        const product = await this.productsRepository.findById(id)

        if (!product) {
            throw new AppError('Product not found.')
        }

        return product
    }
}

export default ShowProductService
