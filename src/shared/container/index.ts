import { container } from 'tsyringe'

import '@shared/providers'

import { ICustomersRepository } from '@modules/customers/domain/ICustomersRepository'
import CustomersRepository from '@modules/customers/infra/typeorm/repositories/CustomersRepository'
import { IOrdersRepository } from '@modules/orders/domain/IOrdersRepository'
import OrdersRepository from '@modules/orders/infra/typeorm/repositories/OrdersRepository'
import { IProductsRepository } from '@modules/products/domain/IProductsRepository'
import ProductsRepository from '@modules/products/infra/typeorm/repositories/ProductsRepository'
import { IUsersRepository } from '@modules/users/domain/IUsersRepository'
import { IUserTokensRepository } from '@modules/users/domain/IUserTokensRepository'
import UsersRepository from '@modules/users/infra/typeorm/repositories/UsersRepository'
import UserTokensRepository from '@modules/users/infra/typeorm/repositories/UserTokensRepository'

container.registerSingleton<ICustomersRepository>(
    'CustomersRepository',
    CustomersRepository,
)

container.registerSingleton<IProductsRepository>(
    'ProductsRepository',
    ProductsRepository,
)

container.registerSingleton<IOrdersRepository>(
    'OrdersRepository',
    OrdersRepository,
)

container.registerSingleton<IUsersRepository>(
    'UsersRepository',
    UsersRepository,
)

container.registerSingleton<IUserTokensRepository>(
    'UserTokensRepository',
    UserTokensRepository,
)
