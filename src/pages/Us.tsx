import { Box, Divider, Heading, HStack, Image, List, ListIcon, ListItem, Text, VStack } from "@chakra-ui/react"
import BaseLayout from "@layouts/BaseLayout"
import { faGraduationCap, faHeart ,faShield,faBusinessTime } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import img2  from '@images/servidores.jpg'
import nube  from '@images/slb.png'
import usFond from '@images/usFondo.jpg'
import { MdCheckCircle } from "react-icons/md"
import Docentes from "@components/Docentes"

const Us = () => {
  return (

    <BaseLayout>

  <Box p={6} backgroundColor="#f1f8f6" borderRadius="xl" boxShadow="xl" paddingTop='140px'>
        <center>
        <Box p={4} mb={6} backgroundColor="#fff" borderRadius="lg" boxShadow="sm" width='1000px'>
         <center> <Heading pt='10px' pb='10px' color='#6059bb'>¿Quienes Somos?</Heading></center>
          <Text textAlign='justify'>Somos una guardería comprometida con el desarrollo integral de niños de 1 año y medio a 6 años. Nos especializamos en brindar cuidado de calidad y programas educativos diseñados para fomentar el aprendizaje cognitivo, físico y emocional de los más pequeños. <br />
            Nuestro equipo está conformado por profesionales altamente capacitados en pedagogía infantil, psicología y desarrollo temprano, quienes trabajan con pasión y dedicación para ofrecer un ambiente cálido, seguro y enriquecedor. <br />
            Entendemos que cada niño es único, por eso adaptamos nuestras actividades para potenciar sus habilidades y talentos individuales, promoviendo su autonomía y confianza desde temprana edad. <br />
            Creemos firmemente en la importancia de la colaboración con las familias, trabajando juntos para construir una base sólida para el futuro de cada niño. Nuestra guardería no solo es un lugar de cuidado, sino un espacio donde los pequeños exploran, descubren, juegan y aprenden en un entorno lleno de amor y respeto.</Text>
        </Box>
        </center>
        <Box pt='10px' pb='10px' pl='50px' >
          <Heading pb='10px' color='#6059bb'>Nuestros Valores</Heading>
        </Box>
        
    <HStack spacing={8} align="flex-start" pl='70px'>

        <Box>
          <Box display="flex" alignItems="center" gap="10px" p='10px'>
            <Box style={cloudStyle}>
              <FontAwesomeIcon icon={faHeart} size="3x" color="#fd7114" />
            </Box>
            <Text maxWidth="500px"> Cada niño merece ser tratado con empatía, cariño y dignidad</Text>
          </Box>

        <Box display="flex" alignItems="center" gap="10px"  p='10px'>
          <Box style={cloudStyle}>
            <FontAwesomeIcon icon={faGraduationCap} size="3x" color="#6aa5e1" />
          </Box>
          <Text maxWidth="500px"> Diseñamos actividades y programas basados en las mejores prácticas de aprendizaje infantil </Text>
        </Box>

        <Box display="flex" alignItems="center" gap="10px"  p='10px'>
          <Box style={cloudStyle}>
            <FontAwesomeIcon icon={faShield} size="3x" color="#fec344" />
          </Box>
          <Text maxWidth="500px"> Brindamos espacios protegidos y adaptados a las necesidades de los niños</Text>
        </Box>

        <Box display="flex" alignItems="center" gap="10px"  p='10px'>
          <Box style={cloudStyle}>
            <FontAwesomeIcon icon={faBusinessTime } size="3x" color="#add546" />
          </Box>
          <Text maxWidth="500px"> Ofrecemos opciones de horario que se adaptan a las dinámicas familiares modernas</Text>
        </Box>
      </Box>
    <Box backgroundImage={nube} padding='50px'backgroundPosition="center"
      backgroundSize="cover" marginLeft='100px'>
      <Image  h='400px' src= {img2} borderRadius='90%'></Image>
    </Box>

    </HStack>

    <Box backgroundImage={usFond}>
      


      <VStack spacing={8} align="flex-start" pl='350px'  >
              <Box flex="1" paddingLeft='100px' paddingRight='500px'>

              <Box pt='10px' pb='10px' pl='50px' >
                <center><Heading pb='10px' color='#6059bb'><b>¿Qué ofrecemos?</b></Heading></center>
              </Box>

                <Text width='600px' textAlign='justify' >Servicio de guardería flexible y de alta calidad, diseñado para atender las necesidades de desarrollo cognitivo, físico y emocional de niños de 1 año y medio a 7 años. 
                  <br />Nuestros servicios se adaptan a tu horario:</Text>
                <List spacing={4} color="#333" textAlign='justify' pt='10px' width='600px'>
                  <ListItem>
                    <ListIcon as={MdCheckCircle} color="green.500" />
                    Por horas: Ideal para padres que necesitan soluciones inmediatas y ocasionales.
                  </ListItem>
                  <ListItem>
                    <ListIcon as={MdCheckCircle} color="green.500" />
                    Medio tiempo: Perfecto para quienes buscan un equilibrio entre el tiempo en casa y actividades educativas.
                  </ListItem>
                  <ListItem>
                    <ListIcon as={MdCheckCircle} color="green.500" />
                    Tiempo completo: Una experiencia integral que potencia el desarrollo y aprendizaje continuo de tu pequeño.
                  </ListItem>
                </List>


                <Box  pt='10px' pb='10px' pl='50px'>
                  <center><Heading pb='10px' color='#6059bb'><b>¿Qué nos hace únicos?</b></Heading></center></Box>
                
                <List spacing={4} color="#333" textAlign='justify' width='600px' >
                  <ListItem>
                    <ListIcon as={MdCheckCircle} color="green.500" />
                    Programas personalizados según la edad y etapa de desarrollo de cada niño.
                  </ListItem>
                  <ListItem>
                    <ListIcon as={MdCheckCircle} color="green.500" />
                    Actividades lúdicas y educativas que estimulan habilidades clave como la creatividad, el pensamiento crítico y la interacción social.
                  </ListItem>
                  <ListItem>
                    <ListIcon as={MdCheckCircle} color="green.500" />
                    Espacios seguros y diseñados especialmente para fomentar el movimiento y el aprendizaje a través del juego.
                  </ListItem>
                  <ListItem>
                    <ListIcon as={MdCheckCircle} color="green.500"/>
                    Personal capacitado y comprometido con la educación y el bienestar infantil.
                  </ListItem>

                  <br />
                </List>
              </Box>
      </VStack>
  </Box>




  <Box >
        <Box pt='10px' pb='10px' pl='50px' >
          <center><Heading pb='10px' color='#6059bb' pt='10px'>Nuestro Staff</Heading></center>
        </Box>

    <HStack>
      <Box display='flex' flexWrap='wrap' w='80%' m='0 auto' justifyContent='space-between' gap='1em' >
          <Docentes />        
        <Divider borderColor="#5aadac" mb={6} />
        </Box>

    </HStack>

  </Box>
</Box> 
</BaseLayout >
  )
}

const cloudStyle = {
  position: "relative",
  width: "100px", // Tamaño del ícono de la nube
  height: "100px",
  backgroundColor: "white",
  borderRadius: "50%",
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  boxShadow: "0 4px 10px rgba(0, 0, 0, 0.1)"
};

export default Us