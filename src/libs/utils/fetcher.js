import axios from "axios"


// fetch function helper
export const fetcher = async (url, options) => {
    const response = await axios(url, options)

    if(!response.status.toString().startsWith('2')) {
        const { message } = await response.json()
        throw new Error(message)
    }

    return response.data
}