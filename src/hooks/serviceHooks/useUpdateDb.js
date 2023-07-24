import { useState } from "react"
import { MAFAC_API_URL, RESPONSE_STATUS } from "../../utils/constants"

const useUpdateDb = () => {
    const [resStatus, setResStatus] = useState(RESPONSE_STATUS.initial)
    
    const updateDb = async param => {
        setResStatus(RESPONSE_STATUS.progress)
        const url = MAFAC_API_URL+"update-one"
        const options = {
            method: "PUT",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(param)
        }
        const response = await fetch(url, options)
        const jsonData = await response.json()
        console.log(jsonData)
        if (response.ok) {
            setResStatus(RESPONSE_STATUS.success)
        }
        else{
            setResStatus(RESPONSE_STATUS.failure)
        }
    }

    return [updateDb, resStatus]
}

export default useUpdateDb