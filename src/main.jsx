import React from 'react'
import ReactDOM from 'react-dom/client'
import './index.css'
import { Route, RouterProvider, createBrowserRouter, createRoutesFromElements } from 'react-router-dom'
import Login from './pages/Login/Login'
import SignupPage from './pages/Signup/SignupPage'
import LandingPageMain from './pages/Landing/LandingPageMain/LandingPageMain'
import { NextUIProvider } from "@nextui-org/react";
import NotFound from './components/Global/NotFound/NotFound'
import CustomerDashboard from './pages/CustomerDashboard/CustomerDashboardMain/CustomerDashboardMain'
import {customerInfoLoader} from './pages/CustomerDashboard/CustomerDashboardMain/CustomerDashboardMain'
import CustomerHome from './pages/CustomerDashboard/Submodules/Home/Home'

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route>
      {/* auth  */}
      <Route path="/*" element={<NotFound />} />
      <Route path="/login" element={<Login />} />
      <Route path="/signup" element={<SignupPage />} />

      {/* landing */}
      <Route path="" element={<LandingPageMain />}/>
        
      <Route loader={customerInfoLoader} path="/Customer/" element={<CustomerDashboard />}>
        <Route path="Home" element={<CustomerHome />} />
        {/* <Route path="Progress" element={<StudentProgress />} />
        <Route path="Roadmap" element={<StudentRoadmap />} />
        <Route loader={studentMyCoursesInfoLoader} path="Courses" element={<StudentCourses />} /> */}
      </Route>
 
    </Route>
  )
)




ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <NextUIProvider>
      <RouterProvider router={router} />
    </NextUIProvider>
  </React.StrictMode>,
)
