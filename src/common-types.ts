import { ITodoRepository } from './repository'

export interface IContext {
    repositories: {
        todoRepository: ITodoRepository
    }
    dataLoaders: {
        categoryDataLoader: any
    }
}
