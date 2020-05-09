import * as faker from 'faker'

export interface Category {
    id: string
    name: string
}

export interface Todo {
    id: string
    title: string
    categories: Category[]
}

const CATEGORIES = ['work', 'personal', 'family', 'no-good']
const TODO_COUNT = 10
const MAX_CATEGORY_COUNT = 3

const makeCategories = (count: number): Category[] => {
    const cats = []
    for (let c = 0; c < count; c++) {
        cats.push({ id: faker.random.uuid().toString(), name: CATEGORIES[c] })
    }
    return cats
}

const makeTodos = (): Todo[] => {
    const data: Todo[] = []

    for (let i = 0; i < TODO_COUNT; i++) {
        const seed: Todo = {
            id: faker.random.uuid().toString(),
            title: faker.lorem.lines(1),
            categories: makeCategories(faker.random.number(MAX_CATEGORY_COUNT)),
        }
        data.push(seed)
    }
    return data
}

console.log(JSON.stringify(makeTodos(), null,2))
