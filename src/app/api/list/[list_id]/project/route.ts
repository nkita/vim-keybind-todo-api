import { responseJson } from '@/lib/response'
import { randomUUID } from 'crypto';
import { getUserID } from '@/lib/session';
import { select, upsert } from '@/db/todoproject';
import { isUUID } from '@/lib/util';

export const GET = async () => {
    const id = await getUserID()
    if (!id) return responseJson(404)

    const data = await select({ user_id: "1" })

    return responseJson(200, data)
}

export const POST = async (request: Request, { params }: { params: any }) => {
    /**
     * 認証機能 
     */
    try {
        const id = await getUserID()
        if (!id) return responseJson(404)
        let todo: { name: string }
        todo = await request.json()

        if (!isUUID(params.list_id)) return responseJson(422)

        const res = {
            id: randomUUID(),
            name: todo.name,
            todo_list_id: params.list_id,
            user_id: "1",
        }
        await upsert(res)
        return responseJson(200, res)
    } catch (e) {
        console.error(e)
        return responseJson(500, "System error")
    }
}