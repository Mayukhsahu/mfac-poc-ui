import { useState } from "react"
import * as xlsx from "xlsx"
const useXlsx = () => {
    const [excelData, setExcelData] = useState({})
    const convertToJson = e => {
        e.preventDefault()
        if (e.target.files) {
            const fileName = e.target.files[0].name.slice(0, -5).toLowerCase().replaceAll(/\/ /g, "_")
            const reader = new FileReader();
            reader.onload = e => {
                const data = e.target.result;
                const workbook = xlsx.read(data, { type: "array" });
                const sheetName = workbook.SheetNames[0];
                const worksheet = workbook.Sheets[sheetName];
                const json = xlsx.utils.sheet_to_json(worksheet);
                setExcelData({fileName, jsonArray: json})
            }
        reader.readAsArrayBuffer(e.target.files[0])
        }
    }

    return [excelData, convertToJson]
}

export default useXlsx