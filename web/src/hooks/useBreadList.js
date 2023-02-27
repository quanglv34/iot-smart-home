import { useState, useEffect } from 'react'

const localCache = {}

export default function useBreadList(animal) {
    const [breadList, setBreadList] = useState([])
    const [status, setStatus] = useState("unloaded")

    useEffect(() => {
        if(!animal) {
            setBreadList([])
        } else if (localCache[animal]) {
            setBreadList(localCache[animal])
        } else {
            requestBreadList()
        }

        async function requestBreadList() {
            const res = await fetch(
                `http://pets-v2.dev-apis.com/breeds?animal=${animal}`
            );

            const data = await res.json();
            localCache[animal] = data.breeds || []
            setBreadList(localCache[animal])
            setStatus("loaded")
        }
    }, [animal])
    
    return [breadList, status]
}