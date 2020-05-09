import { Category, Todo } from './data-gen'
import seedData from './data'

export interface ITodoRepository {
    getAllTodos(): Todo[]
    getTodoCategories(todoId: string): Category[]
    getManyCategories(todoIds: string[]): ({ id: string; categories: Category[] } | null)[]
}

export class TodoRepository implements ITodoRepository{
    constructor(private readonly data: Todo[]) {
    }

    getAllTodos(): Todo[] {
        console.info('DB:getAllTodos called', ` returned ${this.data.length} todos`)
        return this.data
    }

    getTodoCategories(todoId: string): Category[] {
        console.info('DB:getTodoCategories called with ', `todoId: ${todoId}`)
        return this.data.filter(todoValue => todoValue.id === todoId)[0].categories
    }
    getManyCategories(todoIds: string[]): ({ id: string; categories: Category[] } | null)[] {
        console.info('DB:getManyTodoCategories called with ', `todoIds [ ${todoIds.join(',')} ]`)
        return this.data.map(todo => {
            const { id, categories } = todo
            if(todoIds.includes(id)) {
                return { id, categories }
            }
            return null
        }).filter(Boolean)
    }
}

export default new TodoRepository(seedData)
