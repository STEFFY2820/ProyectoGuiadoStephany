import { Box,Button,FormLabel,Input } from "@chakra-ui/react"
import BaseLayout from "@layouts/BaseLayout"
import { useContext, useEffect } from "react"
import {  account, database } from "../shared/lib/Appwrite"
import { Appwrite } from "../shared/lib/env"
import { Query } from "appwrite"
import { UserContext } from "../shared/context/UserContext"

const Profile = () => {
  async function getProfile() {

    const context = useContext(UserContext)

    const cuenta = await account.get()

    const {documents} = await database.listDocuments(Appwrite.datababaseId,Appwrite.collections.profiles,[
      Query.equal('userId',cuenta.$id)
    ])

    console.log(documents[0])
  }


  useEffect(() => {
    getProfile() 

  }, [])


  return (
    <BaseLayout>
      <Box as='form' display='flex' flexDir='column' gap='1em'>

        <Box>
          <FormLabel htmlFor="">Apodo</FormLabel>
          <Input type="text" name="nickname" />
        </Box>
        <Box>
          <FormLabel htmlFor="">Edad</FormLabel>
          <Input type="number" name="age" />
        </Box>
        <Box>
          <FormLabel htmlFor="">Foto de perfil</FormLabel>
          <Input type="file" name="photo" />
        </Box>
        <Box>
          <FormLabel htmlFor="">Banner</FormLabel>
          <Input type="file" name="banner" />
        </Box>
        <Button>Actualizar</Button>
    
    </Box>


    </BaseLayout>

  )
}

export default Profile