import { Transaction } from '../types'
import { ItemModel, TransactionModel, WarehouseModel } from '../../database'

const getByWarehouseId = async (id: number) =>
    await TransactionModel.findAll({
        where: {
            warehouseId: id,
        },
        include: [
            {
                model: ItemModel,
                as: 'item',
            },
            {
                model: WarehouseModel,
                as: 'warehouse',
            },
        ],
    })
const create = async (transaction: Omit<Transaction, 'id'>) => {
    return await TransactionModel.create(transaction)
}

export const transactionService = {
    getByWarehouseId,
    create,
}
