import { useState } from "react"

const useFetch = (url) => {
    const [configRatesList, setConfigRatesList] = useState([])
    const [isLoading, setIsLoading] = useState(false)

    
    const fetchRateConfigs = async (path, queryData) => {
        console.log(path, queryData)
        setIsLoading(true)
        const options = {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(queryData)
        }
        const response = await fetch(url+path, options)
        const jsonData = await response.json()
        // console.log(jsonData)
        // console.log(response)
        if(response.ok) {
            setConfigRatesList(jsonData)
        }
        else {
            console.log(response.message)
        }
        setIsLoading(false)
    }

    return [configRatesList, fetchRateConfigs, isLoading]
}

export default useFetch