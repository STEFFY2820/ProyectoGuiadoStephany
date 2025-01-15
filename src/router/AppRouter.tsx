import { Route, Routes } from "react-router-dom"
import Login from "../pages/Login"
import AppOutlet from "./AppOutlet"
import {lazy} from 'react'

const Products = lazy(()=>import ("../pages/Products"))
const SingleProducts =  lazy(()=>import ("../pages/SingleProducts"))

const Profile = lazy(()=>import ("../pages/Profile"))

const AppRouter = () => {
  return (
    <Routes>
      <Route element = {<AppOutlet/>}>
        <Route path="/products" element={<Products/>}/>
        <Route path="/profile" element={<Profile/>}/> 
        <Route path="/products/:id" element={<SingleProducts/>}/>     
      </Route>

      <Route path="/" element={<Login/>}/>
    </Routes>
  )
}

export default AppRouter