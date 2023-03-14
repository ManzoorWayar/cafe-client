import { useSelector } from 'react-redux'
import { selectCurrentUserStatus } from "../features/auth/authSlice"

const useAuth = () => {
    const Userstatus = useSelector(selectCurrentUserStatus)

    if (Userstatus && Userstatus.verifiedAt && Userstatus.accessToken) {
        // const { id, fullName, email, verifiedAt, accessToken } = Userstatus
        const { id } = Userstatus

        return { isAuth: true, id }
    }

    return { isAuth: false, id: null }
}

export default useAuth