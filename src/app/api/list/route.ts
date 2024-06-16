import { responseJson } from '@/lib/response'
import { getUserID } from '@/lib/session';
import { select, create } from '@/db/todolist';
import { ListProps } from '@/type';
import { randomUUID } from 'crypto';

export const GET = async () => {
    const id = await getUserID()
    if (!id) return responseJson(404, id)

    const data = await select({ user_id: id })

    return responseJson(200, data)
}

export const POST = async (request: Request) => {
    /**
     * 認証機能 
     */
    const id = await getUserID()
    if (!id) return responseJson(404)
    let list: ListProps
    list = await request.json()

    const res = {
        id: randomUUID(),
        name: list.name
    }
    try {
        await create(res.id, res.name, '1')
    } catch (e) {
        console.error(e)
        return responseJson(500, "System error")
    }

    return responseJson(200, res)
}