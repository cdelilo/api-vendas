import { inject, injectable } from 'tsyringe'

import redisCache from '@shared/cache/RedisCache'
import AppError from '@shared/errors/AppError'

import { ICreateProduct } from '../domain/ICreateProduct'
import { IProduct } from '../domain/IProduct'
import { IProductsRepository } from '../domain/IProductsRepository'

@injectable()
class CreateProductService {
    constructor(
        @inject('ProductsRepository')
        private productsRepository: IProductsRepository,
    ) {}

    public async execute({
        name,
        price,
        quantity,
    }: ICreateProduct): Promise<IProduct> {
        const productExists = await this.productsRepository.findByName(name)

        if (productExists) {
            throw new AppError('There is already one product with this name')
        }

        await redisCache.invalidate('api-vendas-PRODUCT_LIST')

        const product = await this.productsRepository.create({
            name,
            price,
            quantity,
        })

        return product
    }
}

export default CreateProductService
