import fastify from 'fastify'
import { getPingHandler } from './handlers'

const app = fastify({ logger: true })

app.get('/ping', getPingHandler)

app.listen(3000, err => {
    if (err) {
        throw err
    }
})
