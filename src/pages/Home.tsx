import { Box, Text,  Divider,ListItem, ListIcon, List, HStack,Image } from "@chakra-ui/react"
import Carousel from "@components/Carousel"
import BaseLayout from "@layouts/BaseLayout"
import star from '@images/star.gif'
import pencil from '@images/pencil.gif'
import { MdCheckCircle } from "react-icons/md"
import Servicios from "@components/Servicios"
import videoGuaderia from '@images/guarderiavideo.mp4'
import inicio from '@images/inicio2.jpg'
import globos from '@images/globo.gif'
import rompecabeza from '@images/puzle.gif'

const Home = () => {
  return (
    <BaseLayout  >
      <>
        <Box width='100%' m='auto' pt='133px'  backgroundColor="#f1f8f6">
          <Carousel />
        </Box>
        

        <Box p={6} backgroundColor="#f1f8f6" borderRadius="xl" boxShadow="lg">
        <Divider borderColor="#5aadac" mb={6} />

          <Box display="flex" justifyContent="center" alignItems="center" mb={6}>
            <img src={star} alt="Star Icon" style={{ width: '50px', marginRight: '10px' }} />
            <Text fontSize="4xl" fontWeight="bold" color="#f59e42">¡Bienvenidos a Nuestra Guardería! </Text>
            <img src={pencil} alt="Pencil Icon" style={{ width: '50px', marginLeft: '10px' }} />
          </Box>

          <Box textAlign="center" mb={6}>
            <Text fontSize="2xl" color="#5aadac">Donde el cariño y el aprendizaje van de la mano </Text>
          </Box>


          <Box p={4} display="grid" justifyContent="center" alignContent="center" mb={6}>
            <Text textAlign="center" fontSize="lg" maxWidth="600px" color="#333">
              En nuestra guardería, entendemos lo importante que es para ti el cuidado y desarrollo de tus pequeños.
              Por eso, ofrecemos un espacio seguro, lleno de amor y diseñado especialmente para fomentar la creatividad, el aprendizaje y la socialización.
            </Text>
          </Box>

          <Box p={4} mb={6} backgroundColor="#fff" borderRadius="lg" boxShadow="sm">
            <HStack spacing={8} align="flex-start">
              <Box flex="1" paddingLeft='100px'>
                <Text fontSize="2xl" color="#5aadac" textAlign="center" mb={4}>🏡 <b>¿Qué ofrecemos?</b></Text>
                <List spacing={4} color="#333" textAlign='justify'>
                  <ListItem>
                    <ListIcon as={MdCheckCircle} color="green.500" />
                    Cuidado personalizado: Nos enfocamos en atender las necesidades únicas de cada niño.
                  </ListItem>
                  <ListItem>
                    <ListIcon as={MdCheckCircle} color="green.500" />
                    Actividades educativas y recreativas: Juegos, arte, música y mucho más para estimular su desarrollo.
                  </ListItem>
                  <ListItem>
                    <ListIcon as={MdCheckCircle} color="green.500" />
                    Profesionales capacitados: Nuestro equipo está formado por educadores con experiencia y un gran corazón.
                  </ListItem>
                  <ListItem>
                    <ListIcon as={MdCheckCircle} color="green.500" />
                    Horarios flexibles: Nos adaptamos a tus necesidades para que puedas tener tranquilidad mientras trabajas o realizas tus actividades.
                  </ListItem>
                </List>
                <center><Image h='350px'src= {inicio} pt='30px' pb='20px'></Image></center>
              </Box>

              <Box flex="1" display="flex" justifyContent="center" alignItems="center" p={6} pt='40px'>
                <video
                  width="50%"
                  maxWidth="300px"
                  height="auto"
                  controls
                  autoPlay
                  muted
                  loop
                >
                  <source src={videoGuaderia} type="video/mp4" />
                  Tu navegador no soporta el elemento de video.
                </video>
              </Box>
            </HStack>
          </Box>

          <Divider borderColor="#5aadac" mb={6} />


        </Box>

        <Box backgroundColor="#f1f8f6" borderRadius="xl" boxShadow="lg">       
           <Box display="flex" justifyContent="center" alignItems="center" p={5} backgroundColor="#f1f8f6" >
            <img src={rompecabeza} alt="" />
          <Text fontSize='3xl' textAlign="center" maxWidth="600px" color="#5aadac" padding='10px'> <b>Nuestros Servicios</b></Text>
          <img  src={globos} alt="" />
        </Box>

        <Box display='flex' flexWrap='wrap' w='80%' m='0 auto' justifyContent='space-between' gap='1em' >
          <Servicios />        
        <Divider borderColor="#5aadac" mb={6} />
        </Box>
        
        </Box>

      </>
    </BaseLayout>
  )
}

export default Home