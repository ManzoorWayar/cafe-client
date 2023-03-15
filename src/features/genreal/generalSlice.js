import { createSlice } from '@reduxjs/toolkit'

const generalSlice = createSlice({
    name: 'general',
    initialState: {
        filterQuery: "ne=''"
    },

    reducers: {
        setFilterQuery: (state, action) => {
            state.filterQuery = action.payload
        }
    }
})

export const {
    setFilterQuery
} = generalSlice.actions

export default generalSlice.reducer 