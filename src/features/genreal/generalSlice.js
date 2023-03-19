import { createSlice } from '@reduxjs/toolkit'
import moment from 'moment'

const start = moment().startOf('day').toDate()
const end = moment().startOf('day').add(1, 'day').toDate()

const generalSlice = createSlice({
    name: 'general',
    initialState: {
        // currDate: `gte=${start}&lt=${end}`
        currDate: ''
    },

    reducers: {
        setCurrDate: (state, action) => {
            state.filterQuery = action.payload
        }
    }
})

export const {
    setCurrDate
} = generalSlice.actions

export default generalSlice.reducer 