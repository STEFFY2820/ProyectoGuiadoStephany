import { useRef } from "react"
import { Box, Button, FormControl, FormLabel, Heading, HStack, Input, Modal, ModalBody, ModalCloseButton, ModalContent, ModalFooter, ModalHeader, ModalOverlay, useDisclosure } from "@chakra-ui/react"
import AppwriteProduct from "./AppwriteProduct"
import { PersonalProduct } from '../declarations/Database'
import { toast } from "sonner"
import useAppwrite from "@hooks/useAppwrite"
import { Appwrite } from "../lib/env"
import { ID } from '../lib/Appwrite'
import { getFormEntries } from "../util/getFormEnt"
import { database } from "../lib/Appwrite"

const MyProducts = ({ products, onRefresh }: {
  products: PersonalProduct[]
  onRefresh?: () => void

}) => {
  const { isOpen, onOpen, onClose } = useDisclosure()
  const modalForm = useRef(null)
  const { fromDatabase, fromStorage } = useAppwrite()
  const ProductsCollection = fromDatabase(Appwrite.datababaseId).collection(Appwrite.collections.products)
  const photoBucket = fromStorage().bucket(Appwrite.buckets.pictures)


  const deleteAppWriteProduct = async (id: string) => {
    await database.deleteDocument(Appwrite.datababaseId, Appwrite.collections.products, id).then(() => {
      toast.success('Producto eliminado')

      if (onRefresh) {
        onRefresh()
      }
    }).catch(() => {
      toast.error('Producto no eliminado')
    })

  }

  const createProduct = async (e) => {
    e.preventDefault()

    if (modalForm.current) {
      const formObject = getFormEntries(modalForm.current)
      const imageId = ID.unique()
      await photoBucket.createFile(imageId, formObject.image)


      const product = {
        name: formObject.name,
        imageId: imageId,
        description: formObject.description,
        price: Number(formObject.price),
        active: formObject.active ? true : false
      }

      await ProductsCollection.createDocument(product).then(() => {
        toast.success('Producto creado')
        modalForm.current.reset()
        if (onRefresh) {
          onRefresh()
        }
        onClose()
      }).catch(async () => {
        toast.error('Producto no se llegó a subir')
        await photoBucket.deleteField(imageId)
      })
    }
  }

  return (

    <Box w='65%' m='2em auto'>
      <HStack justifyContent='space-between' mb={4} >
        <Heading size='lg'>
          Mis Productos
        </Heading>
        <Button onClick={onOpen}>Agregar</Button>
      </HStack>
      <hr />
      <Box gap='1em' display='flex' overflow='scroll' mt={4} pb={4}>
        {
          products?.map(product => (
            <AppwriteProduct key={product.name} product={product} deleteAppWriteProduct={deleteAppWriteProduct} />
          ))
        }
      </Box>

      <Modal
        isCentered
        closeOnOverlayClick
        isOpen={isOpen}
        onClose={onClose}
      >
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Agregar Producto
          </ModalHeader>
          <ModalCloseButton />
          <ModalBody pb={6} as='form' ref={modalForm}>
            <FormControl>
              <FormLabel htmlFor="image" >Imagen</FormLabel>
              <Input w='260px' id="image" name="image" type="file" /></FormControl>

            <FormControl>
              <FormLabel htmlFor="name" >Nombre</FormLabel>
              <Input w='260px' id="name" name="name" type="text" /></FormControl>

            <FormControl mt={4}>
              <FormLabel htmlFor="description" >Descripcion</FormLabel>
              <Input w='260px' id="description" name="description" type="Text" />
            </FormControl>

            <FormControl mt={4}>
              <FormLabel htmlFor="price" >Precio</FormLabel>
              <Input w='260px' id="price" name="price" type="number" />
            </FormControl>

            <FormControl mt={4} display='flex' alignItems='center'>
              <label htmlFor="active" >Estado</label>
              <input type="checkbox" id="active" name="active" />
            </FormControl>

          </ModalBody>

          <ModalFooter>
            <Button colorScheme='blue' mr={3} onClick={createProduct}>
              Agregar
            </Button>
            <Button onClick={onClose}>Cancelar</Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </Box>
  )
}

export default MyProducts