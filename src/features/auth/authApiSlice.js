import { apiSlice } from "../../api/apiSlice";
import { logOut, setCredentials } from "../auth/authSlice";

export const authApiSlice = apiSlice.injectEndpoints({
    endpoints: (builder) => ({
        login: builder.mutation({
            query: (credentials) => ({
                url: "/auth/login",
                method: "POST",
                body: { ...credentials },
            }),
        }),
        forgotPassword: builder.mutation({
            query: (payload) => ({
                url: "/auth/forgot-password",
                method: "POST",
                body: { ...payload },
            }),
        }),
        resetPassword: builder.mutation({
            query: (payload) => ({
                url: "/auth/reset-password",
                method: "PUT",
                body: { ...payload },
            }),
        }),
        resend: builder.mutation({
            query: (payload) => ({
                url: "/auth/resend-token",
                method: "POST",
                body: { ...payload },
            }),
        }),
        sendLogout: builder.mutation({
            query: () => ({
                url: '/auth/logout',
                method: 'POST',
            }),
            async onQueryStarted(arg, { dispatch, queryFulfilled }) {
                try {
                    const { data } = await queryFulfilled
                    console.log(data)
                    dispatch(logOut())
                    setTimeout(() => {
                        dispatch(apiSlice.util.resetApiState())
                    }, 1000)
                } catch (err) {
                    console.log(err)
                }
            }
        }),
        refresh: builder.mutation({
            query: () => ({
                url: '/auth/refresh',
                method: 'GET',
            }),
            async onQueryStarted(arg, { dispatch, queryFulfilled }) {
                try {
                    const { data } = await queryFulfilled
                    const { accessToken } = data
                    dispatch(setCredentials({ accessToken }))
                } catch (err) {
                    console.log(err)
                }
            }
        }),
    }),
});

export const {
    useLoginMutation,
    useResendMutation,
    useRefreshMutation,
    useSendLogoutMutation,
    useResetPasswordMutation,
    useForgotPasswordMutation,
} = authApiSlice;
