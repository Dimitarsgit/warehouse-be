import { ItemInput } from '../types'
import { ItemModel, WarehouseModel } from '../../database'

const getAll = async () => await ItemModel.findAll()
const getById = async (id: number) => await ItemModel.findByPk(id)
const create = async (input: ItemInput['input']) =>
    await ItemModel.create(input)

const storedWithNotAllowedType = async (
    warehouseId: number,
    isHazardous: boolean
) => {
    const items = await ItemModel.findAll({
        attributes: ['id', 'name', 'isHazardous'],
        include: [
            {
                model: WarehouseModel,
                as: 'warehouses',
                through: {
                    attributes: [],
                },
                where: {
                    id: warehouseId,
                },
                required: true,
            },
        ],
        where: {
            isHazardous: !isHazardous,
        },
    })

    return !!items.length
}

export const itemService = {
    getAll,
    getById,
    create,
    storedWithNotAllowedType,
}
