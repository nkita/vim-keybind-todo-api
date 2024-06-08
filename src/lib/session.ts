import { getSession } from '@auth0/nextjs-auth0';

export const getUserID = async () => {
    const session = await getSession()
    return session ? session.user.sub : undefined
}