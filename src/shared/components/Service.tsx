import { Box,Card,CardBody,Divider,Heading,Image,Stack,Text} from "@chakra-ui/react"
import { useEffect, useState } from "react"
import { storage } from "../lib/Appwrite"
import { Appwrite } from "../lib/env"


const Service = ({service}) => {

  const [imageUrl, setImageUrl] = useState<string>()

  const getImage = ()=> {
    const url = storage.getFilePreview(Appwrite.buckets.pictures, service.photoServ)
    console.log(url)
    setImageUrl(url)
}

useEffect(()=>{
  getImage()
},[])

  return (


    <Box maxW='sm' padding='20px' >
      <Card maxW='sm'>
        <CardBody>
          <Image src={imageUrl} alt={imageUrl} loading="lazy" h='400px' w='300px'/>
          <Stack mt='6' spacing='3'>
            <Heading color='#d9cc00' size='md'>{service.NombreServ}</Heading>
            <Divider borderColor="#d9cc00" mb={6} />
            <Text>
              {service.Descripcion}
            </Text>

          </Stack>
        </CardBody>

      </Card>

    </Box>
  )
}

export default Service