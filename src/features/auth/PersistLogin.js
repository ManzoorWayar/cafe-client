import { useEffect, useRef, useState } from 'react'
import { useSelector } from 'react-redux'
import { Spinner } from 'react-bootstrap'
import { Outlet, Navigate } from "react-router-dom"
import usePersist from "../../hooks/usePersist"
import { selectCurrentToken } from "./authSlice"
import { useRefreshMutation } from "./authApiSlice"

const PersistLogin = () => {

  const [persist] = usePersist()
  const effectRan = useRef(false)
  const token = useSelector(selectCurrentToken)
  const [trueSuccess, setTrueSuccess] = useState(false)

  const [refresh, {
    isUninitialized,
    isLoading,
    isSuccess,
    isError,
    error
  }] = useRefreshMutation()


  useEffect(() => {

    if (effectRan.current === true || process.env.NODE_ENV !== 'development') { // React 18 Strict Mode

      const verifyRefreshToken = async () => {

        try {
          //const response = 
          await refresh()
          //const { accessToken } = response.data
          setTrueSuccess(true)
        }
        catch (err) {
          console.error(err)
        }
      }

      if (!token && persist) verifyRefreshToken()
    }

    return () => effectRan.current = true

    // eslint-disable-next-line
  }, [])

  let content

  if (token && !persist) {
    content = <Outlet />;

  } else if (!token || !persist) {
    // persist: no 
    content = <Navigate to="/auth/login" />;

  } else if (isLoading) {
    //persist: yes, token: no 
    content = <Spinner />
  } else if (isError) {
    //persist: yes, token: no 
    content = (
      // <p className='errmsg'>
      //     {`${error?.data?.message} - `}
      //     <Link to="/auth/login">Please login again</Link>.
      // </p>
      <Navigate to='/auth/login' />
    )
  } else if (isSuccess && trueSuccess) {
    //persist: yes, token: yes 
    content = <Outlet />
  } else if (token && isUninitialized) {
    //persist: yes, token: yes  
    content = <Outlet />
  }

  return content
}

export default PersistLogin