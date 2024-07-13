import React from 'react'
import ReactDOM from 'react-dom/client'
import './index.css'
import { Route, RouterProvider, createBrowserRouter, createRoutesFromElements } from 'react-router-dom'
import Login from './pages/Login/Login'
import LandingPageMain from './pages/Landing/LandingPageMain/LandingPageMain'
import { NextUIProvider } from "@nextui-org/react";
import NotFound from './components/Global/NotFound/NotFound'

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route>
      {/* auth  */}
      <Route path="/*" element={<NotFound />} />
      <Route path="/login" element={<Login />} />
      

      {/* landing */}
      <Route path="" element={<LandingPageMain />}/>
        

 
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
