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


const profileCollection = fromDatabase(Appwrite.datababaseId).collection(Appwrite.collections.profiles)


const getProfile = async(previousSession)=>{
  
  const {documents} =session?

  await profileCollection.getDocuments([ Query.equal('userId',session?.userId)])
  :
  await profileCollection.getDocuments([ Query.equal('userId',previousSession?.userId)])

  setProfile(documents[0])

}


const login = async(email:string,password:string) =>{
  const appwriteSession = await fromSession().login(email,password)
  setSession(appwriteSession)
  localStorage.setItem('session',JSON.stringify(appwriteSession))
}

const logout =async()=>{
  await fromSession().logout(session?.$id)
  localStorage.removeItem('session')
  setProfile(null)
  setSession(null)

  }

  useEffect(()=>{
      try{
      const previousSession = JSON.parse(localStorage.getItem('session')!)
        if(previousSession){
        setSession(previousSession)
          
        }getProfile(previousSession)
        console.log('todo bien en el contexto')
      }
        catch(error){
          console.error("Error al restaurar la seesion",error.message || error)
        }
    },[])

  return (
    <UserContext.Provider value={{session,login,logout,profile}}>
      {console.log("Contexto:", { session, profile })} 
        {children}
    </UserContext.Provider>
  )

}
