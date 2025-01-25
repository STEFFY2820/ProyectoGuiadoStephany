import {Box, Flex,Text,VStack,Button} from "@chakra-ui/react";
import ManServicio from "@components/ManServicio";
import { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";
import { UserContext } from "../shared/context/UserContext";
import { account } from "../shared/lib/Appwrite";
import { FaUserLarge } from "react-icons/fa6";
import ManProfesores from "@components/ManProfesores";
import ManAlumnos from "@components/ManAlumnos";

const Mantenimiento = () => {
  const [username, setUsername] = useState()
  const navigate = useNavigate()
  const userContext = useContext(UserContext)

  const logout = async () => {
    await userContext?.logout()
    navigate('/Login')

    toast.success('Has cerrado session')

  }

    async function getUser() {
    const cuenta = await account.get()
    setUsername(cuenta.name)

  }

  useEffect(() => {
    getUser()
  }, [])

  const [selectedComponent, setSelectedComponent] = useState("Servicios");

  const ButtonClick = (component: string) => {
    setSelectedComponent(component);
  };

  return (
    <>
    <Flex>
    <Box w="250px" bg="blue.700" color="white" p={4} minHeight="100%" height="auto">
         <Text fontSize="2xl" mb={6}>
          Cuna  Guarderia <br />ABC del Aprendizaje
        </Text>
        <VStack align="start" spacing={4}>

            <Box mt="5px">
              <Flex justify="space-between" align="center">
                <Text>Usuario: </Text>
                <Box display="flex" alignItems="center"pl='30px'>
                  <FaUserLarge size={30} style={{ marginRight: "8px" }} />
                  <Text>{username}</Text>
                </Box>
              </Flex>
            </Box>


        <Button variant="ghost" colorScheme="whiteAlpha" onClick={() => ButtonClick("Servicios") } pt='10px'>
            Servicios
          </Button>
          <Button variant="ghost" colorScheme="whiteAlpha" onClick={() => ButtonClick("Profesores")}>
            Profesores
          </Button>
          <Button variant="ghost" colorScheme="whiteAlpha" onClick={() => ButtonClick("Alumnos")}>
            Alumnos
          </Button>
          <Button variant="ghost" colorScheme="whiteAlpha" onClick={logout}>
            Cerrar Sesion
          </Button>

        </VStack>
        <Box pt='50px'>
          <Text fontSize="sm" mt={4} fontWeight="bold">
        &copy; {new Date().getFullYear()} <b>Cuna Guardería ABC del Aprendizaje. Todos los derechos reservados.</b>
      </Text></Box>

      </Box>

      <Box flex="1" bg="gray.50" p={6}>

          {selectedComponent === "Servicios" && <ManServicio />}
          {selectedComponent === "Profesores" && <ManProfesores />}
          {selectedComponent === "Alumnos" && <ManAlumnos />}
        
      </Box>
    </Flex>
    
    </>
  )
}

export default Mantenimiento