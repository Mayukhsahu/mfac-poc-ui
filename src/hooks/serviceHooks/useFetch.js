import { useState } from "react"
import { RESPONSE_STATUS } from "../../utils/constants"

const useFetch = (url) => {
    const [configRatesList, setConfigRatesList] = useState({})
    const [resStatus, setResStatus] = useState(RESPONSE_STATUS.initial)

    
    const fetchRateConfigs = async (path, queryData) => {
        console.log(path, queryData)
        setResStatus(RESPONSE_STATUS.progress)
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
            setResStatus(RESPONSE_STATUS.success)
        }
        else {
            console.log(response.message)
            setResStatus(RESPONSE_STATUS.failure)
        }
    }

    return [configRatesList, fetchRateConfigs, resStatus]
}

export default useFetch