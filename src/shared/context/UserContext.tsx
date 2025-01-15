import useAppwrite from "@hooks/useAppwrite"
import { Models, Query } from "appwrite"
import { createContext, ReactNode, useEffect, useState } from "react"
import { Appwrite } from "../lib/env"

type UserContext ={
    session:Models.Session
    login:(email:string,password:string)=> Promise<void>
    profile:Profile
    logout : ()=>Promise<void>
}

interface Profile extends Models.Document {
  age: number
  bannerId:string
  photoId: string
  nickname:string
  userId: string
}

export const UserContext = createContext<UserContext | null>(null)

export const UserProvider = ({children}:{children: ReactNode}) => {

const [session, setSession] = useState<Models.Session  | null>()
const [profile, setProfile] = useState<Profile  | null>()

const {fromSession} = useAppwrite()

const {fromDatabase} = useAppwrite()

const getProfile = async(previousSession)=>{
  
  const ProfileCollection = fromDatabase(Appwrite.datababaseId).collection(Appwrite.collections.profiles)
  const {documents} =session?

  await ProfileCollection.getDocuments([ Query.equal('userId',session?.userId)])
  :
  await ProfileCollection.getDocuments([ Query.equal('userId',previousSession?.userId)])

  setProfile(documents[0])

}

const login = async(email:string,password:string) =>{
  const appwriteSession = await fromSession().login(email,password)
  setSession(appwriteSession)
  console.log(appwriteSession)

  localStorage.setItem('session',JSON.stringify(appwriteSession))
}

const logout =async()=>{
  await fromSession().logout(session?.$id)
  localStorage.removeItem('session')
  setProfile(null)
  setSession(null)

  }

  useEffect(()=>{
      const previousSession = JSON.parse(localStorage.getItem('session')!)
        if(previousSession){
          setSession(previousSession)
          
        }getProfile(previousSession)
    },[])

  return (
    <UserContext.Provider value={{session,login,logout,profile}}>
        {children}
    </UserContext.Provider>
  )

}
