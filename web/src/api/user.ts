import { AxiosInstance } from "."
export const fetchListUsers = async () => {
    const { data } = await AxiosInstance.get('/admin/users')
    return data
}