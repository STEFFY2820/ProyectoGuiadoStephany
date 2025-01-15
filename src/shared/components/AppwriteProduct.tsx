import { Box, Button, ButtonGroup, FormControl, FormLabel, Image, Input, Modal, ModalBody, ModalCloseButton, ModalContent, ModalFooter, ModalHeader, ModalOverlay, Text, Tooltip, useDisclosure } from '@chakra-ui/react'
import { useEffect, useRef, useState } from 'react'
import { ID, storage } from '../lib/Appwrite'
import { Appwrite } from '../lib/env'
import { toast } from 'sonner'
import { MdModeEdit } from 'react-icons/md'
import DeleteButton from './DeleteButton'
import { PersonalProduct } from '../declarations/Database'
import useAppwrite from '@hooks/useAppwrite'


const AppwriteProduct = ({product,deleteAppWriteProduct,onRefresh}:{
    product: PersonalProduct
    deleteAppWriteProduct: (id: string) => void
    onRefresh?: () => void}) => {
    
    const { isOpen, onOpen, onClose } = useDisclosure()
    const [name, setName] =useState(product.name)
    const [description, setDescription] =useState(product.description)
    const [price, setPrice] = useState(product.price)
    const [active, setActive] = useState<boolean>(product.active)
    const [imageUrl, setImageUrl] = useState<string>()
    const modalForm = useRef()
    const {fromDatabase,fromStorage}=useAppwrite()
    const ProductsCollection = fromDatabase(Appwrite.datababaseId).collection()
    const photoBucket = fromStorage().bucket(Appwrite.buckets.pictures)


    const edit = async ()=>{
        //Elimina la foto anterior
        console.log('ID de la imagen que se intenta eliminar:', product.imageId);

        //Subir la nueva foto
        const formulario = modalForm.current

        const newProduct = {
            name: name,
            description: description,
            price: Number(price),
            active:active
        }

        
        if (formulario) {
            const form = new FormData(formulario)
            const {nuevaImagen} = Object.fromEntries(form.entries())
            
            if(nuevaImagen.size==0){
                newProduct.imageId = product.imageId
            }else{

                await photoBucket.deleteField(product.$id)
                await photoBucket.createFile(idUnique,nuevaImagen)
                const idUnique = ID.unique()
                newProduct.imageId=idUnique
            }

        //Guardar el ID de la nueva imagen

            await ProductsCollection.updateDocument(product.$id,newProduct).then(()=>{
                toast.success('Producto editado')
                if (onRefresh) {
                    onRefresh()
                    onClose()
                  }
                
            }).catch(()=>{
                toast.error('No se logro editar el producto')
            })
          }
        }

        const getImage = ()=> {
            const url = storage.getFilePreview(Appwrite.buckets.pictures, product.imageId)
            console.log(url)
            setImageUrl(url)
        }
        useEffect(()=>{
            getImage()
        },[])


    return (

        <Box key={product.name} bgColor='#eee' borderRadius='20px' minW='300px' display='flex' gap='1em'>
            <Image src={imageUrl} width='100px' borderRadius='20px' p={2} /> 
            <Box display='flex' flexDir='column' justifyContent='space-around'>
            <Text fontSize='20px'>{product.name}</Text>
            <ButtonGroup>
                <Tooltip hasArrow label='Edit'>
                            <Button bgColor='#ddd' sx={{
                                '&:hover': {
                                    bgColor: '#feddba',
                                    color: '#da7105'
                                }
                            }} onClick={onOpen}><MdModeEdit size='20px' /></Button>
                </Tooltip>

                <DeleteButton onClick={() => deleteAppWriteProduct(product.$id)}>Eliminar</DeleteButton>
        </ButtonGroup>
        </Box>
        <Modal
                isCentered
                closeOnOverlayClick
                isOpen={isOpen}
                onClose={onClose}
            >
                <ModalOverlay />
                <ModalContent as='form' ref={modalForm} onSubmit={edit}>
                    <ModalHeader>Editar {product.name}
                    </ModalHeader>
                    <ModalCloseButton />
                    <ModalBody pb={6} >
                        <FormControl display='flex' alignItems='center' flexDirection='column' gap={4}>
                            <Image src={imageUrl} width='160px'borderRadius='10px' />
                            <Input name ='nuevaImagen' type='file' />
                        </FormControl>

                        <FormControl>
                            <FormLabel>Nombre</FormLabel>
                            <Input required value={name} onChange={(e)=> setName(e.target.value)}/>
                        </FormControl>

                        <FormControl mt={4}>
                            <FormLabel>Descripcion</FormLabel>
                            <Input required value={description} onChange={(e)=>setDescription(e.target.value)}/>
                        </FormControl>

                        <FormControl mt={4}>
                            <FormLabel>Precio</FormLabel>
                            <Input value={price} onChange={(e)=>setPrice(e.target.value)}/>
                        </FormControl>

                        <FormControl mt={4} display='flex' alignItems='center'>
                            <FormLabel m='0' mr='4'>Activo</FormLabel>
                            <input type="checkbox" checked = {active} onChange={()=>setActive(prev =>!prev)}/>
                        </FormControl>

                    </ModalBody>

                    <ModalFooter>
                        <Button colorScheme='blue' mr={3} type='submit'>
                            Guardar
                        </Button>
                        <Button onClick={onClose}>Cancelar</Button>
                    </ModalFooter>
                </ModalContent>
            </Modal>
        </Box>

    )
}

export default AppwriteProduct

