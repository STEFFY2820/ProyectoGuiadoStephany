import { Route, Routes } from "react-router-dom"
import AppOutlet from "./AppOutlet"
import {lazy} from 'react'

const Home = lazy(()=>import ("../pages/Home"))

const Us = lazy(()=>import ("../pages/Us"))

const Login = lazy(()=>import ("../pages/Login"))

const Mantenimiento = lazy(()=>import ("../pages/Mantenimiento"))

const AppRouter = () => {
  return (
    <Routes>
      <Route element = {<AppOutlet/>}>
        <Route path="/table" element={<Mantenimiento/>}/>     
      </Route>
      <Route path="/login" element={<Login/>}/> 
      <Route path="/nosotros" element={<Us/>}/>
      <Route path="/" element={<Home/>}/>
    </Routes>
  )
}

export default AppRouter