import dotenv from 'dotenv'
dotenv.config()

import sequelize from './index'
;(async () => {
    try {
        await sequelize.sync({ alter: true })
        console.log('Database updated successfully')
    } catch (e) {
        console.error('Error synchronizing the database:', e)
    }
    process.exit()
})()
