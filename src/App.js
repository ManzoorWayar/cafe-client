import React, { lazy } from "react"
import {
  createBrowserRouter,
  createRoutesFromElements,
  Route,
  RouterProvider
} from "react-router-dom"
import Monthly from "./features/analytics/Monthly"
import PersistLogin from "./features/auth/PersistLogin"

const Prefetch = lazy(() => import("./features/auth/Prefetch"))
const Login = lazy(() => import("./features/auth/Login"))
const ResetPassword = lazy(() => import("./features/auth/ResetPassword"))
const ForgotPassword = lazy(() => import("./features/auth/ForgotPassword"))
const Layout = lazy(() => import("./components/layout/Layout"))
const Home = lazy(() => import("./features/home/Home"))
const PageNotFound = lazy(() => import("./components/PageNotFound"))
const Analytics = lazy(() => import("./features/analytics/Analytics"))
const EditPc = lazy(() => import("./features/home/EditPc"))
const EditAccessory = lazy(() => import("./features/home/EditAccessory"))

const App = () => {
  const router = createBrowserRouter(
    createRoutesFromElements(
      <Route path="/" element={<Layout />}>
        <Route path="auth">
          <Route path="login" element={<Login />} />
          <Route path="reset-password" element={<ResetPassword />} />
          <Route path="forgot-password" element={<ForgotPassword />} />
        </Route>

        <Route element={<PersistLogin />}>
          <Route element={<Prefetch />}>
            <Route index element={<Home />} />
            <Route path="pc/edit/:id" element={<EditPc />} />
            <Route path="accessory/edit/:id" element={<EditAccessory />} />
            <Route path="/analytics" element={<Analytics />} />
            <Route path="/report" element={<Monthly />} />
          </Route>
        </Route>

        <Route path="*" element={<PageNotFound />} />
      </Route>
    )
  )

  return <RouterProvider router={router} />
}

export default App
