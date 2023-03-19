import {
    createSelector,
    createEntityAdapter
} from "@reduxjs/toolkit";
import { apiSlice } from "../../api/apiSlice"

const analyticsAdapter = createEntityAdapter()

const initialState = analyticsAdapter.getInitialState()

export const analyticsApiSlice = apiSlice.injectEndpoints({
    endpoints: builder => ({
        getAnalytics: builder.query({
            query: () => ({
                url: `/pc/report`,
                validateStatus: (response, result) => {
                    return response.status === 200 && !result.isError
                },
            }),
            transformResponse: responseData => {
                const loadedAnalytics = responseData?.map(analytics => {
                    analytics.id = analytics._id
                    return analytics
                });
                return analyticsAdapter.setAll(initialState, loadedAnalytics)
            },
        })
    }),

})

export const {
    useGetAnalyticsQuery,
} = analyticsApiSlice

// // returns the query result object
export const selectAnalyticsResult = analyticsApiSlice.endpoints.getAnalytics.select()

// // creates memoized selector
const selectAnalyticsData = createSelector(
    selectAnalyticsResult,
    analyticsResult => analyticsResult.data // normalized state object with ids & entities
)

// //getSelectors creates these selectors and we rename them with aliases using destructuring
export const {
    selectAll: selectAllAnalytics,
    selectById: selectAnalyticById,
    selectIds: selectAnalyticIds
    // Pass in a selector that returns the analytics slice of state
} = analyticsAdapter.getSelectors(state => selectAnalyticsData(state) ?? initialState)