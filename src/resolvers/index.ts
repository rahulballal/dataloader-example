import { Query, Int, Arg } from 'type-graphql'

export class AddResolver {
    @Query(_ => Int)
    async add(@Arg('x') x: number, @Arg('y') y: number): Promise<number> {
        return x + y
    }
}
