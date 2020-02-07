// @ts-nocheck
import { getPingHandler } from './index'

describe('getPingHandler', () => {
    it('should return up = true', () => {
        // Arrange
        const req = { query: {}, params: {}, headers: {} }
        const res = {
            header: jest.fn(),
            send: jest.fn(),
        }
        // Act
        getPingHandler(req, res)

        // Assert
        expect(res.header).toBeCalledWith('Content-Type', 'application/json')
        expect(res.send).toBeCalledWith({ up: true })
    })
})
