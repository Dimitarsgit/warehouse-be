import { Transaction } from '../../graphql/types'
import { ItemModel, WarehouseItemModel, WarehouseModel } from '../index'
import { Sequelize } from 'sequelize'

const afterCreate = async (transaction: Transaction) => {
    const [warehouseItem] = await WarehouseItemModel.findOrCreate({
        where: {
            warehouseId: transaction.warehouseId,
            itemId: transaction.itemId,
        },
    })

    if (!warehouseItem) {
        throw new Error('WarehouseItem not found')!
    }

    const updateQuantity =
        transaction.type === 'import'
            ? transaction.quantity
            : -transaction.quantity

    await warehouseItem.increment('quantity', { by: updateQuantity })

    const item = await ItemModel.findByPk(transaction.itemId)

    if (!item) {
        throw new Error('Item not found')
    }

    const capacityUpdate =
        item.width * item.length * item.height * -updateQuantity

    await WarehouseModel.update(
        {
            remainingCapacity: Sequelize.literal(
                `"remainingCapacity" + ${capacityUpdate}`
            ),
        },
        {
            where: {
                id: transaction.warehouseId,
            },
        }
    )
}

export const transactionHooks = {
    afterCreate,
}
