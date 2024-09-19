import { responseJson } from '@/lib/response'
import { randomUUID } from 'crypto';
import { getUserID } from '@/lib/session';
import { upsert, select } from '@/db/todo';
import { ListProps, TodoProps } from '@/type';
import { isUUID } from '@/lib/util';
import { sortBy } from "lodash";

export const GET = async (request: Request, { params }: { params: any }) => {
    // 取得可能なtodo数
    const completionTaskLimit = 20
    const user_id = await getUserID()
    if (!user_id) return responseJson(404)

    if (!isUUID(params.list_id)) return responseJson(422)

    const progressTask = await select(
        {
            where: {
                todo_list_id: params.list_id,
                user_id: user_id,
                isArchived: false,
                is_complete: false
            },
        }
    )

    const completionTask = await select(
        {
            where: {
                todo_list_id: params.list_id,
                user_id: user_id,
                isArchived: false,
                is_complete: true,
                completedAt: { not: null }
            },
            take: 5,
            // take: completionTaskLimit,
            orderBy: { completedAt: "desc" }
        }
    )
    const data = sortBy([...progressTask, ...completionTask], "sort")
    const res = data.map(d => {
        return {
            id: d.id,
            priority: d.priority ?? "",
            creationDate: d.creationDate ?? "",
            completionDate: d.completedAt ?? null,
            text: d.text ?? "",
            project: d.project ?? "",
            context: d.context ?? "",
            detail: d.detail ?? "",
            is_complete: d.is_complete ?? false,
            sort: d.sort ?? null
        }
    })
    return responseJson(200, res)
}

export const POST = async (request: Request, { params }: { params: any }) => {
    /**
     * 認証機能 
     */
    try {
        const id = await getUserID()
        if (!id) return responseJson(404)
        const todos: TodoProps[] = await request.json()

        if (!isUUID(params.list_id)) return responseJson(422)
        const result = await Promise.all(todos.map(todo => {
            const res = {
                id: todo.id,
                created_at: todo.creationDate,
                priority: todo.priority ?? "",
                completionDate: todo.completionDate ?? undefined,
                text: todo.text ?? "",
                detail: todo.detail ?? "",
                project: todo.project ?? "",
                context: todo.context ?? "",
                todo_list_id: params.list_id,
                isArchived: todo.isArchived ?? false,
                is_complete: todo.is_complete,
                sort: todo.sort,
                user_id: id
            }
            return upsert(res)
        })).catch(e => {
            console.error(e)
            return responseJson(500, e)
        })
        return responseJson(200)
    } catch (e) {
        console.error(e)
        return responseJson(500, "System error")
    }
}