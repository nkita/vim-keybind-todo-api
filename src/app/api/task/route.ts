import { responseJson } from '@/lib/response'
import { select } from '@/db/user'
import { getSession } from '@auth0/nextjs-auth0';

export const GET = async () => {
    const session = await getSession();
    // const user = await select({})
    if (session?.user) {
        const id = session.user.sub

        return responseJson(200,)
    } else {
        return responseJson(400)
    }
}
export const POST = async () => responseJson(405)

