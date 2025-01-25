import { useEffect, useState } from "react"
import { Teachers } from "../declarations/Database"
import useAppwrite from "@hooks/useAppwrite"
import { Appwrite } from "../lib/env"
import Docente from "./Docente"

const Docentes = () => {

    const [appwriteDocentes, setAppwriteDocentes] = useState<Array<Teachers>>([])
    const {fromDatabase} = useAppwrite()
    
    const DocentesCollection = fromDatabase(Appwrite.datababaseId).collection(Appwrite.collections.docentes)

    const getDocentesAppwrite = async ()=>{
        const { documents } = await DocentesCollection.getDocuments()
        setAppwriteDocentes(documents)
    }

    useEffect(() => {
        getDocentesAppwrite()
      }, [])
  
    return (
        <>
      {
        appwriteDocentes && appwriteDocentes.map(p => (
          <Docente docente={p} />
        ))
      }
      </>
  )
}

export default Docentes