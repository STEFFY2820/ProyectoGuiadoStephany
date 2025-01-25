import { useEffect, useState } from "react"
import { storage } from "../lib/Appwrite"
import { Appwrite } from "../lib/env"
import { Box,Text, Card, CardBody, Divider,Heading ,Stack,Image} from "@chakra-ui/react"

const Docente = ({docente}) => {

    const [imageUrl, setImageUrl] = useState<string>()

    const getImage = ()=> {
      const url = storage.getFilePreview(Appwrite.buckets.pictures, docente.photoDoc)
      console.log(url)
      setImageUrl(url)
  }

  useEffect(()=>{
    getImage()
  },[])

  return (
    <Box maxW='sm' padding='20px' >
    <Card maxW='sm'
          _hover={{
            bg: "#5aadac",
            transform: "scale(1.1)",
            boxShadow: "0px 4px 15px rgba(0, 0, 0, 0.2)", }}
    
    >
      <CardBody
      
      >
        <Image src={imageUrl} alt={imageUrl} loading="lazy" h='400px' w='300px'/>
        <Stack mt='6' spacing='3'>
          <Heading color='#d9cc00' size='md'>{docente.nombreDoc}</Heading>
          <Divider borderColor="#d9cc00" mb={6} />
          <Text>
            {docente.cargo}
          </Text>

        </Stack>
      </CardBody>

    </Card>

  </Box>
  )
}

export default Docente