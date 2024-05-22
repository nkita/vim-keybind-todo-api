import { responseJson } from '@/lib/response'
import { select } from '@/db/user'

export const GET = async () => {
    const user = await select({})
    return responseJson(200, user)
}
export const POST = async () => responseJson(405)

