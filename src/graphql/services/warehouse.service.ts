import { ItemModel, WarehouseModel } from '../../database'
import { Warehouse } from '../types'
import { Op } from 'sequelize'

const getAll = async () => await WarehouseModel.findAll()
const getById = async (id: number) =>
    await WarehouseModel.findByPk(id, {
        include: [
            {
                model: ItemModel,
                as: 'items',
                through: { attributes: ['quantity'], as: 'warehouseItem' },
            },
        ],
    })

const canBeExported = async (
    warehouseId: number,
    itemId: number,
    quantity: number
) =>
    !!(await WarehouseModel.findByPk(warehouseId, {
        include: [
            {
                model: ItemModel,
                as: 'items',
                through: {
                    attributes: ['quantity'],
                    as: 'warehouseItem',
                    where: {
                        quantity: {
                            [Op.gte]: quantity,
                        },
                    },
                },
                where: {
                    id: itemId,
                },
            },
        ],
    }))

const hasEnoughtCapacity = async (
    warehouseId: number,
    requiredCapacity: number
) =>
    await WarehouseModel.findOne({
        where: {
            id: warehouseId,
            remainingCapacity: {
                [Op.gte]: requiredCapacity,
            },
        },
    })

const create = async ({
    capacity,
    ...rest
}: Omit<Warehouse, 'id' | 'remainingCapacity'>) =>
    await WarehouseModel.create({
        capacity,
        remainingCapacity: capacity,
        ...rest,
    })

export const warehouseService = {
    getAll,
    getById,
    create,
    canBeExported,
    hasEnoughtCapacity,
}
