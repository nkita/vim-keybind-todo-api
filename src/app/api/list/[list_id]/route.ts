import { responseJson } from '@/lib/response'
import { getUserID } from '@/lib/session';
import { select, create, update } from '@/db/todolist';
import { ListProps } from '@/type';
import { isUUID } from '@/lib/util';

export const GET = async (request: Request, { params }: { params: any }) => {
    const user_id = await getUserID()
    if (!user_id) return responseJson(404)

    if (!isUUID(params.list_id)) return responseJson(422)

    const data = await select({ id: params.list_id, user_id: user_id, isArchived: false })

    return responseJson(200, data)
}

export const POST = async (request: Request, { params }: { params: any }) => {
    /**
     * 認証機能 
     */
    const id = await getUserID()
    if (!id) return responseJson(404)
    let list: ListProps
    list = await request.json()

    if (!isUUID(params.list_id)) return responseJson(422)

    try {
        await update(params.list_id, '1', list.name)
    } catch (e) {
        console.error(e)
        return responseJson(500, "System error")
    }

    return responseJson(200, list)
}