// @ts-nocheck
import { Category } from '../../data-gen'
import { ITodoRepository } from '../../repository'
import { groupBy, head } from 'ramda'

export const batchLoadCategories = (todoRepository: ITodoRepository) => async (
    keys: string[],
): Promise<(Category[] | undefined)[][]> => {
    const fromDb: ({ id: string; categories: Category[] } | null)[] = todoRepository.getManyCategories(keys)
    const grouped = groupBy(item => item.id)(fromDb)
    return keys.map(key => {
        return head(grouped[key]).categories
    })
}
