import {
    CreationOptional,
    DataTypes,
    InferAttributes,
    InferCreationAttributes,
    Model,
    Sequelize,
} from 'sequelize'

interface WarehouseModel
    extends Model<
        InferAttributes<WarehouseModel>,
        InferCreationAttributes<WarehouseModel>
    > {
    id: CreationOptional<number>
    name: string
    capacity: number
    remainingCapacity: number
}
export const warehouseModelCreator = (sequelize: Sequelize) =>
    sequelize.define<WarehouseModel>('Warehouse', {
        id: {
            primaryKey: true,
            type: DataTypes.INTEGER,
            autoIncrement: true,
        },
        name: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        capacity: {
            type: DataTypes.INTEGER,
            allowNull: false,
        },
        remainingCapacity: {
            type: DataTypes.INTEGER,
            allowNull: false,
        },
    })
