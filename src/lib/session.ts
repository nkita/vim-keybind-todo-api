import { headers } from 'next/headers';
export const getUserID = async () => {
    try {
        const header = headers()
        const token = header.get("Authorization") ?? ""
        const user = await fetch(process.env.AUTH0_ISSUER_BASE_URL + "/userinfo", {
            headers: { "Authorization": token }
        }).then(res => res.json())
        return user.sub
    } catch (e) {
        console.error(e)
        return undefined
    }
}