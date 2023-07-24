import {createContext} from 'react'

const RateConfigContext = createContext({
    tableName: "",
    refreshTable: () => {}
})

export default RateConfigContext