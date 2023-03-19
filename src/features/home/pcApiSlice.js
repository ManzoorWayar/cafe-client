import {
    createSelector,
    createEntityAdapter
} from "@reduxjs/toolkit";
import { apiSlice } from "../../api/apiSlice"

const pcAdapter = createEntityAdapter()

const initialState = pcAdapter.getInitialState()

export const pcApiSlice = apiSlice.injectEndpoints({
    endpoints: builder => ({
        getPcs: builder.query({
            query: () => ({
                url: `/pc`,
                validateStatus: (response, result) => {
                    return response.status === 200 && !result.isError
                },
            }),
            transformResponse: responseData => {
                const loadedPcs = responseData?.map(pc => {
                    pc.id = pc._id
                    return pc
                });
                return pcAdapter.setAll(initialState, loadedPcs)
            },
            providesTags: (result, error, arg) => {
                if (result?.ids) {
                    return [
                        { type: 'PC', id: 'LIST' },
                        ...result.ids.map(id => ({ type: 'PC', id }))
                    ]
                } else return [{ type: 'PC', id: 'LIST' }]
            }
        }),
        addPc: builder.mutation({
            query: (payload) => {
                return ({
                    url: `/pc`,
                    method: 'POST',
                    body: { ...payload }
                })
            },
            invalidatesTags: [
                { type: 'PC', id: "LIST" }
            ]
        }),
        updatePc: builder.mutation({
            query: (payload) => {
                return ({
                    url: `/pc/${payload.id}`,
                    method: 'PUT',
                    body: { ...payload.data }
                })
            },
            invalidatesTags: (result, error, arg) => [
                { type: "PC", id: arg.id },
            ],
        }),
        withdrawalPc: builder.mutation({
            query: (payload) => {
                return ({
                    url: `/pc/withdrawal/${payload.id}`,
                    method: 'PUT',
                    body: { ...payload }
                })
            },
            invalidatesTags: (result, error, arg) => [
                { type: "PC", id: arg.id },
            ],
        }),
        deletePc: builder.mutation({
            query: (pcId) => {
                return ({
                    url: `/pc/${pcId}`,
                    method: 'DELETE'
                })
            },
            invalidatesTags: (result, error, arg) => [
                { type: "PC", id: arg.id },
            ],
        })
    }),

})

export const {
    useGetPcsQuery,
    useAddPcMutation,
    useDeletePcMutation,
    useUpdatePcMutation,
    useWithdrawalPcMutation,
} = pcApiSlice

// // returns the query result object
export const selectPcsResult = pcApiSlice.endpoints.getPcs.select()

// // creates memoized selector
const selectPcsData = createSelector(
    selectPcsResult,
    pcsResult => pcsResult.data // normalized state object with ids & entities
)

// //getSelectors creates these selectors and we rename them with aliases using destructuring
export const {
    selectAll: selectAllPcs,
    selectById: selectPcById,
    selectIds: selectPcIds
    // Pass in a selector that returns the Pcs slice of state
} = pcAdapter.getSelectors(state => selectPcsData(state) ?? initialState)