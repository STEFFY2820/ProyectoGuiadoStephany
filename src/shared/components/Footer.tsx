import { Box, Text, HStack, Link } from '@chakra-ui/react';
import { HiAcademicCap } from "react-icons/hi2";
import phone from '@images/phone.gif'
import location from '@images/location.gif'
import facebook from '@images/facebook.gif'

import bccolor from '@images/color2.jpg'

import reloj from '@images/oclock.gif'

const Footer = () => {
  return (
    <Box
      backgroundImage={bccolor}
      backgroundPosition="center"
      backgroundSize="contain"
      color="#f5f5f5"
      py={8}
      textAlign="center"
      borderRadius="lg"
      boxShadow="xl"
      mb={4}
    >
      <HStack spacing={8} justify="space-around" alignItems="center" mb={6}>
        {/* Título */}
        <Box display="flex" flexDirection="column" alignItems="center" textAlign="center">
          <Text fontSize="3xl" fontWeight="bold" mb={2}>
            <HiAcademicCap /> <b>Cuna Guardería ABC</b> <br /> del Aprendizaje
          </Text>
          <img src={reloj} alt="" />
          <br />
          <Text fontSize="2xl"> <b>Horarios de atención</b></Text>
          <p><b>Lunes – Viernes 8.00 am – 6.00 pm <br />Cerrado fines de semana</b></p>
        </Box>

        {/* Información de contacto */}
        <Box display="flex" flexDirection="column" alignItems="center" textAlign="center" px={4} pl='50px'>
          <img src={phone} alt="Teléfono" style={{ width: "70px", marginBottom: "4px" }} />
          <Text fontSize="lg" mb={2} fontWeight="bold">
            Teléfono: 951745160
          </Text>
          <img src={location} alt="Ubicación" style={{ width: "70px", marginBottom: "4px" }} />
          <Text fontSize="lg" mb={2} fontWeight="bold">
            Ubícanos: <br /> Calle Maximiliano Carranza 498 <br /> San Juan de Miraflores
          </Text>
          <img src={facebook} alt="Facebook" style={{ width: "70px", marginBottom: "4px" }} />
          <Link
            href="https://www.facebook.com/abcdelaprendizaje"
            target="_blank"
            _hover={{ textDecoration: "underline", color: "blue.400" }}
            fontSize="lg"
          >
            <b>Síguenos en Facebook</b>
            
          </Link>
        </Box>

        {/* Mapa */}
        <Box display="flex" flexDirection="column" justifyContent="center" alignItems="center" textAlign="center">
          <iframe
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d975.0928065487329!2d-76.97472104277205!3d-12.155110427246617!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x9105b85ca2244159%3A0x7a2b7a2754181c22!2sC.%20Maximiliano%20Carranza%20498%2C%20San%20Juan%20de%20Miraflores%2015801!5e0!3m2!1ses-419!2spe!4v1737244494070!5m2!1ses-419!2spe"
            width="400"
            height="300"
            loading="lazy"
            style={{ borderRadius: "8px", border: "0" }}
          />
        </Box>
      </HStack>

      {/* Pie de página */}
      <Text fontSize="sm" mt={4} fontWeight="bold">
        &copy; {new Date().getFullYear()} <b>Cuna Guardería ABC del Aprendizaje. Todos los derechos reservados.</b>
      </Text>
    </Box>
  );
}

export default Footer