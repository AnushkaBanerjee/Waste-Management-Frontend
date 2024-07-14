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
import CreatePickup from './pages/CustomerDashboard/Submodules/CreatePickup/CreatePickup'


import WorkerDashboardMain from './pages/WorkerDashboard/WorkerDashboardMain/WorkerDashboardMain'
import {workerInfoLoader} from './pages/WorkerDashboard/WorkerDashboardMain/WorkerDashboardMain'
import WorkerHome from './pages/WorkerDashboard/Submodules/Home/Home'

import CustomerAnalytics from './pages/CustomerDashboard/Submodules/Analytics/Analytics'
import WorkerAnalytics from './pages/WorkerDashboard/Submodules/Analytics/Analytics'
import MyPickups from './pages/WorkerDashboard/Submodules/MyPickups/MyPickups'


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
        <Route path="Home" loader={customerInfoLoader} element={<CustomerHome />} />
        <Route path="Analytics" loader={customerInfoLoader} element={<CustomerAnalytics />} />
        <Route path="Add-Pickup" loader={customerInfoLoader} element={<CreatePickup />} />
        {/* <Route path="Progress" element={<StudentProgress />} />
        <Route path="Roadmap" element={<StudentRoadmap />} />
        <Route loader={studentMyCoursesInfoLoader} path="Courses" element={<StudentCourses />} /> */}
      </Route>

      <Route path="/Worker/" loader={workerInfoLoader} element={<WorkerDashboardMain />}>
        <Route path="Home" loader={workerInfoLoader} element={<WorkerHome />} />
        <Route path="Analytics" loader={workerInfoLoader} element={<WorkerAnalytics />} />
        <Route path="My-Pickups" loader={workerInfoLoader} element={<MyPickups />} />

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
