import { Navigate, Route, Routes } from "react-router-dom"
import { useQuery } from "@tanstack/react-query"
import { axiosInstance } from "./lib/axios"
import toast, { Toaster } from "react-hot-toast"

import Layout from "./components/layout/Layout"
import HomePage from "./pages/HomePage"
import SignUpPage from "./pages/auth/SignUpPage"
import LoginPage from "./pages/auth/LoginPage"
import NotificationsPage from "./pages/NotificationsPage"
import NetworkPage from "./pages/NetworkPage"



function App() {

  const { data: authUser, isLoading } = useQuery({
    queryKey: ['authUser'],
    queryFn: async () => {
      try {
        const res = await axiosInstance.get('/auth/me');
        return res.data;
      } catch (error) {
        if(error.response && error.response.status === 401) {
          return null;
        }
        toast.error(error.response.data.message || "Something went wrong");
      }
    }
  })

  if(isLoading) {
    return <div>Loading...</div>
  }

  return (
    <>
     <Layout>
        <Routes>
          <Route path="/" element={authUser ? <HomePage /> : <Navigate to={'/login'}/>} />
          <Route path="/signup" element={!authUser ? <SignUpPage /> : <Navigate to={'/'}/>} />
          <Route path="/login" element={!authUser ? <LoginPage /> : <Navigate to={'/'}/>} />
          <Route path="/notifications" element={authUser ? <NotificationsPage /> : <Navigate to={'/login'}/>} />
          <Route path="/network" element={authUser ? <NetworkPage /> : <Navigate to={'/login'}/>} />
        </Routes>
        <Toaster />
     </Layout>
    </>
  )
}

export default App
