import { responseJson } from '@/lib/response'
import { getUserID } from '@/lib/session';
import { select } from '@/db/todo';

export const GET = async () => {
    const id = await getUserID()
    if (!id) return responseJson(404)

    const data = await select({ id: id })

    return responseJson(200, data)
}

export const POST = async () => responseJson(405)

