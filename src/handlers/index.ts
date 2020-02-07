import fastify from 'fastify'
import http from 'http'

export const getPingHandler = (
    _req: fastify.FastifyRequest<http.IncomingMessage>,
    res: fastify.FastifyReply<http.ServerResponse>,
): void => {
    res.header('Content-Type', 'application/json')
    res.send({ up: true })
}
