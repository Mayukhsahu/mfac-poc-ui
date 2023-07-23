import {v4 as uuidv4} from 'uuid'

export const POST_TABLE_URL = 'http://localhost:3000/mfac-apis/create-table'
export const MAFAC_API_URL = 'http://localhost:3000/mfac-apis/'
export const BUTTONS_ARRAY = [
    {
        id: uuidv4(),
        name: "getAll"
    },
    {
        id: uuidv4(),
        name: "getOneByName"
    },
    {
        id: uuidv4(),
        name: "getOneById"
    },
    {
        id: uuidv4(),
        name: "getAllByField"
    },

]