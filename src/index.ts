import { ApolloServer, makeExecutableSchema } from 'apollo-server-fastify'
import fastify from 'fastify'
import fs from 'fs'
import path from 'path'
import { getPingHandler } from './handlers'
import todoRepository from './repository'
import resolvers from './resolvers'
import { IContext} from './common-types'

const typeDefs = fs.readFileSync(path.join(__dirname, 'schema.graphql')).toString('utf8')

const apollo = new ApolloServer({
    schema: makeExecutableSchema({ typeDefs, resolvers }),
    playground: true,
    context: ():IContext => {
        return {
            repositories: {
                todoRepository
            }
        }
    }
})

const httpServer = fastify({ logger: true })

httpServer.register(apollo.createHandler())
httpServer.get('/ping', getPingHandler)

httpServer
    .listen(3000)
    .then(() => httpServer.log.info(`Server started on localhost:3000`))
    .catch(() => httpServer.log.info('Unable to start the server'))
