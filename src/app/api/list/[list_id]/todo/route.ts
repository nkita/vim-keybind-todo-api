import { responseJson } from '@/lib/response'
import { randomUUID } from 'crypto';
import { getUserID } from '@/lib/session';
import { upsert } from '@/db/todo';
import { ListProps, TodoProps } from '@/type';
import { isUUID } from '@/lib/util';

export const GET = async () => responseJson(404)

export const POST = async (request: Request, { params }: { params: any }) => {
    /**
     * 認証機能 
     */
    // const id = await getUserID()
    // if (!id) return responseJson(404)
    let todo: TodoProps
    todo = await request.json()

    if (!isUUID(params.list_id)) return responseJson(422)

    const res = {
        id: randomUUID(),
        created_at: new Date().toString(),
        text: todo.text ?? "",
        detail: todo.detail ?? "",
        project_id: todo.project_id ?? "",
        todo_list_id: params.list_id,
        user_id: "1"
    }
    try {
        await upsert(res)
    } catch (e) {
        console.error(e)
        return responseJson(500, "System error")
    }

    return responseJson(200, res)
}