import { useSelector } from 'react-redux'
import { selectCurrentUserStatus } from "../features/auth/authSlice"

const useAuth = () => {
    const Userstatus = useSelector(selectCurrentUserStatus)

    if (Userstatus && Userstatus.accessToken) {
        const { id } = Userstatus

        return { isAuth: true, id }
    }

    return { isAuth: false, id: null }
}

export default useAuth