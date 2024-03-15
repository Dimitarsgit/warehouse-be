import {
    CreationOptional,
    DataTypes,
    InferAttributes,
    InferCreationAttributes,
    Model,
    Sequelize,
} from 'sequelize'

interface WarehouseItemModel
    extends Model<
        InferAttributes<WarehouseItemModel>,
        InferCreationAttributes<WarehouseItemModel>
    > {
    id: CreationOptional<number>
    warehouseId: number
    itemId: number
    quantity: number
}

export const warehouseItemModelCreator = (sequelize: Sequelize) =>
    sequelize.define<WarehouseItemModel>('WarehouseItem', {
        id: {
            primaryKey: true,
            type: DataTypes.INTEGER,
            autoIncrement: true,
        },
        quantity: {
            type: DataTypes.INTEGER,
            allowNull: false,
            defaultValue: 0,
        },
        itemId: {
            type: DataTypes.INTEGER,
            allowNull: false,
        },
        warehouseId: {
            type: DataTypes.INTEGER,
            allowNull: false,
        },
    })
