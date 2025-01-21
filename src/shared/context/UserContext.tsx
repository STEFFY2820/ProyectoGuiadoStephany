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
const [logged, setLogged] = useState(false)

const {fromSession,fromDatabase} = useAppwrite()

const profileCollection = fromDatabase(Appwrite.datababaseId).collection(Appwrite.collections.profiles)

const getProfile = async (previousSession) => {
  
  try {
    console.log("Sesion:",session)
    console.log("PreviousSession:",previousSession)
    
    const userId = session?.userId || previousSession?.userId;

    if (!userId) {
      throw new Error("El userId no esta definido");
    }

    console.log("Ejecutando consulta con userId",userId)

    const { documents } = await profileCollection.getDocuments([
      Query.equal("userId", userId),
    ]);

    if (documents.length > 0) {
      setProfile(documents[0]);
      console.log("Perfil Encontrado:",documents[0])
    } else {
      console.warn("No se encontro ningun perfil:", userId);
      setProfile(null); 
    }
  } catch (error) {
    console.error("Error al obtener el perfil:", error.message);
  }
};

const login = async(email:string,password:string) =>{
  const appwriteSession = await fromSession().login(email,password)
  setSession(appwriteSession)
  localStorage.setItem('session',JSON.stringify(appwriteSession))
  setLogged(true)
}

const logout =async()=>{
  await fromSession().logout(session?.$id)
  localStorage.removeItem('session')
  setProfile(null)
  setSession(null)
  setLogged(false)

  }    
  
const loadData = async () => {
    const previousSession = JSON.parse(localStorage.getItem('session')!)

    if (previousSession) {
        setSession(previousSession)
        setLogged(true)
    }

    await getProfile(previousSession)
}

useEffect(() => {
  loadData()
}, [logged])

  return (
    
    <UserContext.Provider value={{session,login,logout,profile}}>
        {children}
    </UserContext.Provider>
  )
}
