import { useEffect, useState } from "react"
import { Teachers } from "../declarations/Database"
import useAppwrite from "@hooks/useAppwrite"
import { Appwrite } from "../lib/env"
import Profesor from "./Profesor"


const Profesores = () => {

    const [appwriteProfesores, setAppwriteProfesores] = useState<Array<Teachers>>([])
  
    const { fromDatabase } = useAppwrite()

    const ProfesorCollection = fromDatabase(Appwrite.datababaseId).collection(Appwrite.collections.profesores)
    console.log(ProfesorCollection)

    const getProfesorAppwrite = async () => {
    
      const { documents } = await ProfesorCollection.getDocuments()
      setAppwriteProfesores(documents)
    }
    useEffect(() => {
        getProfesorAppwrite()
      }, [])
      
  return (
    <>
    {
      appwriteProfesores && appwriteProfesores.map(p => (
        <Profesor profesores={p} />
      ))
    }
    </>
  )
}

export default Profesores