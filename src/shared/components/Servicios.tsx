import useAppwrite from "@hooks/useAppwrite"
import { useEffect, useState } from "react"
import { Appwrite } from "../lib/env"
import { MyServices } from "../declarations/Database"
import Service from "./Service"

const Servicios = () => {

    const [appwriteServices, setAppwriteServices] = useState<Array<MyServices>>([])
  
    const { fromDatabase } = useAppwrite()

    const ServiciosCollection = fromDatabase(Appwrite.datababaseId).collection(Appwrite.collections.servicios)
    console.log('rev',ServiciosCollection)

    const getServicesAppwrite = async () => {
    
      const { documents } = await ServiciosCollection.getDocuments()
      setAppwriteServices(documents)
      
    }

    useEffect(() => {
        getServicesAppwrite()
      }, [])

  return (
    <>
      {
        appwriteServices && appwriteServices.map(p => (
          <Service service={p} />
        ))
      }
      </>
  )
}

export default Servicios