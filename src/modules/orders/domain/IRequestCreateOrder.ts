import { IProduct } from '@modules/products/domain/IProduct'

export interface IRequestCreateOrder {
    customer_id: string
    products: IProduct[]
}
