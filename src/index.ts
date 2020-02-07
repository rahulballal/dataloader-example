import fastify from 'fastify'
import fastifyGql from 'fastify-gql'
import fs from 'fs'
import { IResolvers, makeExecutableSchema } from 'graphql-tools'
import path from 'path'
import { Maybe, QueryAddArgs, ResolversTypes } from './generated/gql-types'
import { getPingHandler } from './handlers'

const app = fastify({ logger: true })

const typeDefs = fs.readFileSync(path.join(__dirname, 'schema.graphql')).toString('utf8')

const resolvers: IResolvers = {
    Query: {
        async add(_, obj: QueryAddArgs): Promise<Maybe<ResolversTypes['Int']>> {
            return obj.x + obj.y
        },
    },
}

app.register(fastifyGql, {
    schema: makeExecutableSchema({ typeDefs, resolvers }),
    graphiql: 'playground',
    routes: true,
})

app.get('/ping', getPingHandler)

app.listen(3000, err => {
    if (err) {
        throw err
    }
})
