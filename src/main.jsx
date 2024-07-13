import React from 'react'
import ReactDOM from 'react-dom/client'
import './index.css'
import { Route, RouterProvider, createBrowserRouter, createRoutesFromElements } from 'react-router-dom'
import Login from './pages/Login/Login'
import LandingPageMain from './pages/Landing/LandingPageMain/LandingPageMain'
import { NextUIProvider } from "@nextui-org/react";
import GetLocation from './components/CreatePickUp/GetLocationComp'
import AddItem from './components/CreatePickUp/AddItemComp'
import PreviewItem from './components/CreatePickUp/PreviewItemComp'

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route>
      {/* auth  */}

      <Route path="/login" element={<Login />} />


      {/* landing */}
      <Route path="" element={<LandingPageMain />} />


      {/* user */}
      <Route path="/getLocation" element={<GetLocation />} />
      <Route path="/addItem" element={<AddItem />} />
      <Route path="/previewItem" element={<PreviewItem />} />

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
