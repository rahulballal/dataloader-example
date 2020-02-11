import 'reflect-metadata'
import { ApolloServer } from 'apollo-server-fastify'
import fastify from 'fastify'
import path from 'path'
import { AddResolver } from './resolvers'
import { getPingHandler } from './handlers'
import { buildSchema } from 'type-graphql'

buildSchema({
    resolvers: [AddResolver],
    emitSchemaFile: path.resolve(__dirname, 'generated-schema.graphql'),
}).then(schema => {
    const apollo = new ApolloServer({
        schema,
        playground: true,
    })

    const httpServer = fastify({ logger: true })

    httpServer.register(apollo.createHandler())
    httpServer.get('/ping', getPingHandler)

    httpServer
        .listen(3000)
        .then(() => httpServer.log.info(`Server started on localhost:3000`))
        .catch(() => httpServer.log.info('Unable to start the server'))
})
