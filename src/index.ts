import { ApolloServer, makeExecutableSchema, IResolvers } from 'apollo-server-fastify'
import fastify from 'fastify'
import fs from 'fs'
import path from 'path'
import { Maybe, QueryAddArgs, ResolversTypes } from './generated/gql-types'
import { getPingHandler } from './handlers'

const typeDefs = fs.readFileSync(path.join(__dirname, 'schema.graphql')).toString('utf8')

const add = async (_: any, args: QueryAddArgs): Promise<Maybe<ResolversTypes['Int']>> => {
    return args.x + args.y
}

const resolvers: IResolvers = {
    Query: {
        add,
    },
}
const apollo = new ApolloServer({
    schema: makeExecutableSchema({ typeDefs, resolvers }),
    playground: true,
})

const httpServer = fastify({ logger: true })

httpServer.register(apollo.createHandler())
httpServer.get('/ping', getPingHandler)

httpServer
    .listen(3000)
    .then(() => httpServer.log.info(`Server started on localhost:3000`))
    .catch(() => httpServer.log.info('Unable to start the server'))
