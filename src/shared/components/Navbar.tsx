import { Box,  Image, HStack, Text} from "@chakra-ui/react"
import { RiHomeHeartFill } from "react-icons/ri";
import { FaUsers } from "react-icons/fa";
import logo from '@images/logo_guarderia_snfondo.png'
import { useNavigate } from "react-router-dom";
import Whatsapp from "../components/Whatsapp"
import { FaWhatsapp } from "react-icons/fa";


// const NavLink = ({ icon, text, ref, onClick }: {
//   icon: ReactElement,
//   text: string,
//   onClick: () => void,

// }) => {
//   return (
//     <ChackraLink ref={ref} onClick={onClick} display='flex' gap='10px' alignItems='center'> {icon} {text}</ChackraLink>
//   )
// }

// const ProfileMenu = ({ username }: { username: string }) => {

//   const navigate = useNavigate()
//   const userContext = useContext(UserContext)

  // const logout = async () => {
  //   // const sessionId:string =localStorage.getItem('sessionId')!
  //   // await account.deleteSession(userContext!.session.$id)
  //   await userContext?.logout()
  //   // localStorage.removeItem(sessionId)
  //   navigate('/Home')

  //   toast.success('Has cerrado session')

  // }



//   return (
//     <Menu>
//       <MenuButton>
//         <Box display="flex"
//           alignItems="center"
//           fontSize="lg"
//           _hover={{
//             backgroundColor: "whiteAlpha.800",
//             color: "#5aadac",
//             borderRadius: "10px",
//             p: "8px"
//           }}
//           borderRadius="10px"
//           p="8px"> <FaUserLarge size={30} style={{ marginRight: "8px" }} />Coorporativo</Box>
        
//       </MenuButton>
//       <MenuList>
//       <MenuItem onClick={goLogin}>Iniciar Sesión</MenuItem>
//         {/* <MenuItem> <Link to='/profile' ></Link>Ver perfil</MenuItem>
//         <MenuItem> <Link to='/products' ></Link>Productos</MenuItem> */}
//         <MenuItem onClick={logout}>Cerrar Sesión</MenuItem>
//       </MenuList>
//     </Menu>
//   )
// }

const Navbar = () => {
  const navigate = useNavigate()

  const nosotros = () => {
    navigate('/nosotros')
  }

  const inicio = ()=>{
    navigate('/')
  }

  const goLogin = async ()=>{
    navigate('/login')

  }

  return (
    <>
      <HStack
        position="fixed"
        top="0"
        left="0"
        right="0"
        zIndex="1000"
        bgColor="white"
        w="100%"
        boxShadow="md"
        justify="space-between"
        mb={2}
      >
        <HStack w="100%" m="0 auto" color="#5aadac" justifyContent="space-between" pr='50px'>
          <HStack gap="1em">
            <Image w="150px" h="150px" src={logo} alt="logo pagina" pb='20px' pl='10px'/>
            <Text fontSize="2xl" fontWeight="bold">
              <span style={{ fontSize: "1.5rem" }}>ABC</span> <br />
              <span style={{ fontSize: "1.2rem" }}>del Aprendizaje</span>
            </Text>
          </HStack>

          <HStack gap="2em">
            <HStack gap="2em" display={{ base: "none", md: "flex" }} alignItems="center">
              <Box
                onClick={inicio}
                display="flex"
                alignItems="center"
                fontSize="lg"
                cursor="pointer"
                _hover={{
                  backgroundColor: "whiteAlpha.800",
                  color: "#FFD84A",
                  borderRadius: "10px",
                  p: "8px"
                }}
                borderRadius="10px"
                p="8px"
              >
                <RiHomeHeartFill size={30} style={{ marginRight: "8px" }} />
                Inicio
              </Box>

              <Box
                onClick={goLogin}
                display="flex"
                alignItems="center"
                fontSize="lg"
                cursor="pointer"
                _hover={{
                  backgroundColor: "whiteAlpha.800",
                  color: "#FFD84A",
                  borderRadius: "10px",
                  p: "8px"
                  
                }}
                borderRadius="10px"
                p="8px"
              >
                <FaUsers size={30} style={{ marginRight: "8px" }} />
                Coorporativo
              </Box>

              <Box
                onClick={nosotros}
                display="flex"
                alignItems="center"
                fontSize="lg"
                cursor="pointer"
                _hover={{
                  backgroundColor: "whiteAlpha.800",
                  color: "#FFD84A",
                  borderRadius: "10px",
                  p: "8px"
                }}
                borderRadius="10px"
                p="8px"
              >
                <FaUsers size={30} style={{ marginRight: "8px" }} />
                Nosotros
              </Box>
{/* 
{/* 
              <ProfileMenu username={username} /> */}
              <Box
                display="flex"
                alignItems="center"
                fontSize="lg"
                _hover={{
                  backgroundColor: "whiteAlpha.800",
                  color: "#FFD84A",
                  borderRadius: "10px",
                  p: "8px"
                }}
                borderRadius="10px"
                p="8px">
                <FaWhatsapp size={30} style={{ marginRight: "8px" }} />
                <Whatsapp />
              </Box>



            </HStack>

            {/* Menú en dispositivos pequeños */}
            {/* <VStack display={{ base: 'flex', md: 'none' }}>
              <Menu>
                <MenuButton bgColor="green">
                  <FiMenu />
                </MenuButton>
                <MenuList color="black">
                  <MenuItem>Inicio</MenuItem>
                  <MenuItem>Nosotros</MenuItem>
                  <MenuItem>Perfil</MenuItem>
                  <MenuItem>Productos</MenuItem>
                </MenuList>
              </Menu>
            </VStack> */}
          </HStack>
        </HStack>
      </HStack>
    </>

  )
}

export default Navbar