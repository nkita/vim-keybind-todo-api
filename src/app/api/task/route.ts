import { responseJson } from '@/lib/response'
import { select } from '@/db/user'
import { getSession } from '@auth0/nextjs-auth0';

export const GET = async () => {
    const { user } = await getSession();
    // const user = await select({})
    return responseJson(200, user)
}
export const POST = async () => responseJson(405)

