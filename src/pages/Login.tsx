import { useContext, useEffect, useRef } from "react"
import { useNavigate } from "react-router-dom"
import { Box, Button, FormLabel, Stack, Input, TabPanel, TabPanels, Tab, TabList, Tabs } from "@chakra-ui/react"
import loginBackground from '@images/login.jpg'
import { account, database, ID } from "../shared/lib/Appwrite"
// import Email from "@components/Email"
import { Appwrite } from "../shared/lib/env"
import { toast, Toaster } from "sonner"
import { UserContext } from "../shared/context/UserContext"
// import { toast } from "sonner"


const Login = () => {
    const loginForm = useRef(null)
    const navigate = useNavigate()
    const crearCuentaForm = useRef(null)
    const userContext=useContext(UserContext)

    const ingresar = async (e: React.MouseEvent) => {
        e.preventDefault()
        const formulario = loginForm.current

        if (formulario) {
            const form = new FormData(formulario)
            const { email, password } = Object.fromEntries(form.entries())

            await userContext?.login(email, password)

            // localStorage.setItem('sessionId', userContext!.session.$id)
            navigate('/products')
            
        }

    }

    
    const crearCuenta = async (e:React.MouseEvent<HTMLDivElement>) => {
        e.preventDefault()

        const formulario = crearCuentaForm.current
        
        const accountId=ID.unique()

        if (formulario) {
            const form = new FormData(formulario)
            
            const { email, password, name } = Object.fromEntries(form.entries())

            await account.create(ID.unique(), email, password, name)
            await database.createDocument(Appwrite.datababaseId,Appwrite.collections.profiles,ID.unique(),{
                userId: accountId,

            }).then(()=>{
                toast.success('Perfil creado')
            })
        
        }
    }



    
    useEffect(() => {

        const session = localStorage.getItem('coockieFallback')
        if (session && JSON.parse(session).length!=0)  navigate('/products')
        console.log(userContext?.session)

    }, [])




    return (
        //el stack sigue siendo un div(box), pero por defecto tiene un display flex

        //contenedor de chakra
        <>
        <Toaster richColors />
        <Stack direction='row' height='100vh'>
            
            <Box width='50%' backgroundImage={loginBackground} bgPos='center' bgSize='cover'>
            </Box>
            <Box width='50%' display='flex' alignItems='center' justifyContent='center'>
                <Box bgColor='#5aadac' padding='2em' borderRadius='20px'>
                    <Tabs>
                        <TabList>
                            <Tab>Ingresar</Tab>
                            <Tab>Soy nuevo</Tab>
                        </TabList>

                        <TabPanels>
                            <TabPanel>
                                <Box onSubmit={(e: React.MouseEvent<HTMLDivElement>) => ingresar(e)}  as='form' ref={loginForm} display='flex' flexDirection='column' gap='1em'>
                                    <div className="formGroup">
                                        <FormLabel htmlFor="email" color='beige'>Email: </FormLabel>
                                        <Input id="email" name="email" type="email" />
                                    </div>

                                    <div className="formGroup">
                                        <FormLabel htmlFor="password" color='beige'>Contraseña: </FormLabel>
                                        <Input id="password" name="password" type="password" />
                                    </div>
                                    <Button type='submit'>Ingresar</Button>
                                </Box>
                            </TabPanel>

                            <TabPanel>
                                <Box minH='400px' ref={crearCuentaForm} as='form' display='flex' flexDirection='column' gap='1em'>
                                    <div className="formGroup">
                                        <FormLabel htmlFor="name" color='beige'>Nombre: </FormLabel>
                                        <Input id="name" name="name" type="text" />
                                    </div>

                                    <div className="formGroup">
                                        <FormLabel htmlFor="email" color='beige'>Email: </FormLabel>
                                        <Input id="email" name="email" type="email" />
                                    </div>

                                    <div className="formGroup">
                                        <FormLabel htmlFor="password" color='beige'>Contraseña: </FormLabel>
                                        <Input id="password" name="password" type="password" />
                                    </div>

                                    <Button onClick={(e) => crearCuenta(e)}>Crear Cuenta</Button>
                                </Box>
                            </TabPanel>

                        </TabPanels>
                    </Tabs>
                </Box>
            </Box>
        </Stack>
        </>
    )
}

export default Login