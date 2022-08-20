import { ICreateProduct } from './ICreateProduct'
import { IFindProducts } from './IFindProducts'
import { IProduct } from './IProduct'
import { IUpdateStockProduct } from './IUpdateStockProduct'

export interface IProductsRepository {
    findByName(name: string): Promise<IProduct | undefined>
    findById(id: string): Promise<IProduct | undefined>
    findAll(): Promise<IProduct[]>
    findAllByIds(products: IFindProducts[]): Promise<IProduct[]>
    create(data: ICreateProduct): Promise<IProduct>
    save(product: IProduct): Promise<IProduct>
    updateStock(products: IUpdateStockProduct[]): Promise<void>
    remove(product: IProduct): Promise<void>
}
