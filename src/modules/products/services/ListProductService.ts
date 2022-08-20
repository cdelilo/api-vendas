import { inject, injectable } from 'tsyringe'

import { IProduct } from '../domain/IProduct'
import { IProductsRepository } from '../domain/IProductsRepository'

@injectable()
class ListProductService {
    constructor(
        @inject('ProductsRepository')
        private productsRepository: IProductsRepository,
    ) {}

    public async execute(): Promise<IProduct[]> {
        const products = await this.productsRepository.findAll()

        return products
    }
}

export default ListProductService
