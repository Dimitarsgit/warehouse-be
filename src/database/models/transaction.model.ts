import {
    CreationOptional,
    DataTypes,
    InferAttributes,
    InferCreationAttributes,
    Model,
    Sequelize,
} from 'sequelize'
import { TRANSACTION } from '../../graphql/types'

interface TransactionModel
    extends Model<
        InferAttributes<TransactionModel>,
        InferCreationAttributes<TransactionModel>
    > {
    id: CreationOptional<number>
    warehouseId: number
    itemId: number
    quantity: number
    type: TRANSACTION
    datetime: Date
}

export const transactionModelCreator = (sequelize: Sequelize) =>
    sequelize.define<TransactionModel>('Transaction', {
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true,
        },
        warehouseId: {
            type: DataTypes.INTEGER,
            allowNull: false,
        },
        itemId: {
            type: DataTypes.INTEGER,
            allowNull: false,
        },
        quantity: {
            type: DataTypes.INTEGER,
            allowNull: false,
        },
        type: {
            type: DataTypes.ENUM,
            values: ['export', 'import'],
            allowNull: false,
        },
        datetime: {
            type: DataTypes.DATE,
            defaultValue: Sequelize.fn('NOW'),
            allowNull: false,
        },
    })
