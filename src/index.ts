import express from 'express'
import cors from 'cors'
import 'dotenv/config'
import { ApolloServer } from '@apollo/server'
import { expressMiddleware } from '@apollo/server/express4'
import { typeDefs, resolvers } from './graphql'

const app = express()
const port = process.env.PORT || 4000

const bootstrapServer = async () => {
    const server = new ApolloServer({
        typeDefs,
        resolvers,
    })

    await server.start()

    app.use(cors())
    app.use(express.json())
    app.use(express.urlencoded({ extended: true }))
    app.use('/graphql', expressMiddleware(server))

    app.listen(port, () => {
        console.log(`🚀 Express ready at http://localhost:${port}`)
        console.log(`🚀 Graphql ready at http://localhost:${port}/graphql`)
    })
}

;(async () => {
    await bootstrapServer()
    console.log('Bootrstrapping completed')
})()
