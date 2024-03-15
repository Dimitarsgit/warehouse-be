import {
    DataTypes,
    Sequelize,
    InferAttributes,
    InferCreationAttributes,
    Model,
    CreationOptional,
} from 'sequelize'

interface ItemModel
    extends Model<
        InferAttributes<ItemModel>,
        InferCreationAttributes<ItemModel>
    > {
    id: CreationOptional<number>
    name: string
    length: number
    width: number
    height: number
    isHazardous: boolean
}

export const itemModelCreator = (sequelize: Sequelize) =>
    sequelize.define<ItemModel>('Item', {
        id: {
            primaryKey: true,
            type: DataTypes.INTEGER,
            autoIncrement: true,
        },
        name: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        length: {
            type: DataTypes.INTEGER,
            allowNull: false,
        },
        width: {
            type: DataTypes.INTEGER,
            allowNull: false,
        },
        height: {
            type: DataTypes.INTEGER,
            allowNull: false,
        },
        isHazardous: {
            type: DataTypes.BOOLEAN,
            allowNull: false,
        },
    })
