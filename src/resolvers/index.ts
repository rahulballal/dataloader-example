import { IResolvers } from 'apollo-server-fastify'
import { IContext } from '../common-types'
import { Todo, QueryResolvers, TodoResolvers } from '../generated/gql-types'

const getTodos: QueryResolvers['getTodos'] = async (
    _parent,
    _args,
    { repositories: { todoRepository } }: IContext,
) => todoRepository.getAllTodos()

const resolveTodoCategories: TodoResolvers['categories'] = async (
    todo: Todo,
    _args,
    { dataLoaders: { categoryDataLoader } }: IContext,
) => categoryDataLoader.load(todo.id)

const resolvers: IResolvers = {
    Query: {
        getTodos,
    },
    Todo: {
        categories: resolveTodoCategories,
    },
}

export default resolvers
