import { Sequelize } from 'sequelize'
import {
    warehouseModelCreator,
    warehouseItemModelCreator,
    itemModelCreator,
    transactionModelCreator,
    transactionHooks,
} from './models'

const dbConfig = {
    name: process.env.DB_NAME || 'dbName',
    user: process.env.DB_USER || 'dbUser',
    password: process.env.DB_PASSWORD || 'dbPassword',
    host: process.env.DB_HOST || 'localhost',
}

const sequelize = new Sequelize(
    dbConfig.name,
    dbConfig.user,
    dbConfig.password,
    {
        host: dbConfig.host,
        dialect: 'postgres',
    }
)
export const ItemModel = itemModelCreator(sequelize)
export const WarehouseModel = warehouseModelCreator(sequelize)
export const WarehouseItemModel = warehouseItemModelCreator(sequelize)
export const TransactionModel = transactionModelCreator(sequelize)

WarehouseItemModel.belongsTo(WarehouseModel, {
    foreignKey: 'warehouseId',
    as: 'warehouse',
})

WarehouseItemModel.belongsTo(ItemModel, { foreignKey: 'itemId', as: 'item' })

TransactionModel.belongsTo(ItemModel, { foreignKey: 'itemId', as: 'item' })
TransactionModel.belongsTo(WarehouseModel, {
    foreignKey: 'warehouseId',
    as: 'warehouse',
})
TransactionModel.afterCreate(transactionHooks.afterCreate)

WarehouseModel.belongsToMany(ItemModel, {
    through: WarehouseItemModel,
    foreignKey: 'warehouseId',
    otherKey: 'itemId',
    as: 'items',
})

ItemModel.belongsToMany(WarehouseModel, {
    through: WarehouseItemModel,
    foreignKey: 'itemId',
    otherKey: 'warehouseId',
    as: 'warehouses',
})

export default sequelize
