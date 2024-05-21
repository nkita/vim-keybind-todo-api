import { responseJson } from '@/lib/response'
export const GET = async () => {
    return responseJson(200)
}
export const POST = async () => responseJson(405)

