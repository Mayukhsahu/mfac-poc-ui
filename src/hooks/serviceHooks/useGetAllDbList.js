import { useState } from "react"
import { MAFAC_API_URL, RESPONSE_STATUS } from "../../utils/constants"

const useGetAllDbList = () => {
    const [dbListRes, setDbListRes] = useState(RESPONSE_STATUS.initial)
    const [dataSrcList, setDataSrcList] = useState([])

    const getDbList = async () => {
        setDbListRes(RESPONSE_STATUS.progress)
        const url = MAFAC_API_URL + 'get-db-list'
        const response = await fetch(url)
        const jsonData = await response.json()
        
        if (response.ok) {
            setDataSrcList(jsonData.data)
            setDbListRes(RESPONSE_STATUS.success)
        }
        else {
            setDbListRes(RESPONSE_STATUS.failure)
        }
    }

    return [dataSrcList, getDbList, dbListRes]
}

export default useGetAllDbList