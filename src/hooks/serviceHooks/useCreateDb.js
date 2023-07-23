import { useState } from "react"

const useCreateDb = () => {
    const [createDbRes, setCreateDbRes] = useState([])
    const [isLoading, setIsLoading] = useState(false)

    const postSourceData = async (url, sourceData) => {
        setIsLoading(true)

        const options = {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(sourceData)
        }
        const response = await fetch(url, options)
        const jsonData = await response.json()
        // console.log(jsonData)
        // console.log(response)
        if(response.ok) {
            setCreateDbRes(jsonData)
        }
        else {
            console.log(response.message)
        }
        setIsLoading(false)
    }

    return [createDbRes, postSourceData, isLoading]
}

export default useCreateDb