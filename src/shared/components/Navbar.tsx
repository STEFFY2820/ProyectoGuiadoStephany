import {Link as ChackraLink,Button,Input,DrawerHeader,DrawerBody,DrawerCloseButton,DrawerContent,DrawerFooter,DrawerOverlay,Drawer,Box,MenuList,MenuItem,Menu, Image, HStack,Text, MenuButton, useDisclosure } from "@chakra-ui/react"
import { RiHomeHeartFill } from "react-icons/ri";
import { FaUsers } from "react-icons/fa";
import { FaUserLarge } from "react-icons/fa6";
import { FaShoppingCart } from "react-icons/fa";

import logo from '/logofin.jpg'
import {  ReactElement, useContext, useEffect, useRef, useState } from "react";
import { useNavigate} from "react-router-dom";
import { toast } from "sonner";
import {account} from "../lib/Appwrite"
import { Link } from "react-router-dom"
import { UserContext } from "../context/UserContext";


const NavLink = ({icon,text,ref,onClick} :{
  icon: ReactElement,
  text: string,
  onClick: () => void,

})=>{
  return(
  <ChackraLink ref={ref} onClick={onClick} display='flex' gap='10px' alignItems='center'> {icon} {text}</ChackraLink>
  )
}

  const ProfileMenu = ({username}:{username:string})=>{
  
  const navigate = useNavigate()

  const userContext = useContext(UserContext)

  const logout = async() => {
    // const sessionId:string =localStorage.getItem('sessionId')!
    // await account.deleteSession(userContext!.session.$id)
    userContext?.logout()
    // localStorage.removeItem(sessionId)
    navigate('/')

    toast.success('Has cerrado session')
  }

  return(          
  <Menu>
    <MenuButton>
      <Box display="flex" gap="10px" alignItems="center"> <FaUserLarge /></Box>
        {username}
    </MenuButton>
      <MenuList>
        
        <MenuItem> <Link to='/profile' ></Link>Ver perfil</MenuItem>
        <MenuItem> <Link to='/products' ></Link>Productos</MenuItem>
        <MenuItem onClick={logout}>Cerrar Sesión</MenuItem>
        <MenuItem>Mark as Draft</MenuItem>
        <MenuItem>Delete</MenuItem>
        <MenuItem>Attend a Workshop</MenuItem>
      </MenuList>
    </Menu>
  )
}

const Navbar = () => {
  const btnRef = useRef()
  const {isOpen,onOpen,onClose} = useDisclosure()
  const [username, setUsername]= useState()

  async function getUser() {
    const cuenta = await account.get()
    setUsername(cuenta.name)
    
  }

  useEffect(()=>{
    getUser()

  },[])

  return (
    <>
    <HStack h='40px' bgColor={{base:'#ADD8E6',sm:'',nd:''}} mb='2em' >
      <HStack h='70%' m='0 auto' p='1em 0' color='#eee' justifyContent='space-between'>
        <HStack gap='1em'>
          <Image w={['30px','50px','100px']} h='40px' src={logo} alt="logo pagina"/>
          <Text fontSize ='2x1' > Mi tienda </Text>
        </HStack>
        <HStack gap='1em'>
          <NavLink icon={<RiHomeHeartFill />} text="Inicio"/>
          <NavLink icon={<FaUsers />} text="Nosotros"/>
          <ProfileMenu username={username}/>
          <NavLink ref={btnRef} onClick={onOpen} icon={<FaShoppingCart />}text=''></NavLink>
        </HStack>
      </HStack>
    </HStack>

    <Drawer
        isOpen={isOpen}
        placement='right'
        onClose={onClose}
        finalFocusRef={btnRef}
      >
        <DrawerOverlay />
        <DrawerContent>
          <DrawerCloseButton />
          <DrawerHeader>Create your account</DrawerHeader>

          <DrawerBody>
            <Input placeholder='Type here...' />
          </DrawerBody>

          <DrawerFooter>
            <Button variant='outline' mr={3} onClick={onClose}>
              Cancel
            </Button>
            <Button colorScheme='blue'>Save</Button>
          </DrawerFooter>
        </DrawerContent>
      </Drawer>
    
    </>

  )
}

export default Navbar