import { responseJson } from '@/lib/response'
import { randomUUID } from 'crypto';
import { getUserID } from '@/lib/session';
import { upsert, select } from '@/db/todo';
import { ListProps, TodoProps } from '@/type';
import { isUUID } from '@/lib/util';
import { sortBy } from "lodash";
import { useSearchParams } from 'next/navigation';
import { type NextRequest } from 'next/server'
import prisma, { Prisma } from '@/db/prisma';

export const GET = async (request: NextRequest, { params }: { params: any }) => {
    let completionTask: any[] = []
    let progressTask: any[] = []
    let data: any[] = []
    const user_id = await getUserID()
    if (!user_id) return responseJson(404)

    if (!isUUID(params.list_id)) return responseJson(422)

    const searchParams = request.nextUrl.searchParams

    const completionOnly = searchParams.get('completionOnly') === "true"
    if (completionOnly) {
        const _page = searchParams.get('page')
        let page = _page ? parseInt(_page, 10) : 0
        page = page > 0 ? page : 0
        const _limit = searchParams.get('limit')
        let limit = _limit ? parseInt(_limit, 10) : 25
        limit = limit > 0 ? limit : 25

        const result = await prisma.$queryRaw<TodoProps[]>`
        SELECT
            *
        FROM
            "Todo"
        WHERE
            "todo_list_id" = ${params.list_id}
            AND "user_id" = ${user_id}
            AND "isArchived" = false
            AND "is_complete" = true
            AND "completedAt" IS NOT NULL
        ORDER BY
            "completedAt" DESC
        LIMIT ${limit} OFFSET ${limit * page}
                `
        if (result) data = result

    } else {
        // 取得可能なtodo数
        const completionTaskLimit = 20

        const result = await prisma.$queryRaw<TodoProps[]>`
    (
        SELECT
            *
        FROM
            "Todo"
        WHERE
            "todo_list_id" = ${params.list_id}
            AND "user_id" = ${user_id}
            AND "isArchived" = false
            AND "is_complete" = true
            AND "completedAt" IS NOT NULL
        ORDER BY
            "completedAt" DESC
        LIMIT ${completionTaskLimit}
    )
    UNION ALL
    (
        SELECT
            *
        FROM
            "Todo"
        WHERE
            "todo_list_id" = ${params.list_id}
            AND "user_id" = ${user_id}
            AND "isArchived" = false
            AND "is_complete" = false
    )
    `
        data = sortBy(result, "sort")
    }

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