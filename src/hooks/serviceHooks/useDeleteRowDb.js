import { useState } from "react"
import { MAFAC_API_URL, RESPONSE_STATUS } from "../../utils/constants"

const useDeleteRowDb = () => {
    const [putResStatus, setPutResStatus] = useState(RESPONSE_STATUS.initial)

    const deleteRowDb = async (data) => {
        setPutResStatus(RESPONSE_STATUS.progress)
        const url = MAFAC_API_URL+"delete-row"
        const options = {
            method: "DELETE",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(data)
        }
        const response = await fetch(url, options)
        const jsonData = await response.json()

        if (response.ok) {
            console.log(jsonData)
        }
        else {
            console.log(response)
        }
    }
    
    return [deleteRowDb, putResStatus]
}

export default useDeleteRowDb