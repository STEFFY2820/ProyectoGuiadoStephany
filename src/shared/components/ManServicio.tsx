import { Table, Box, Flex, Text, Button, Thead, Tr, Th, Tbody, Td, Modal, ModalOverlay, ModalContent, ModalHeader, ModalCloseButton, ModalBody, FormControl, Image, FormLabel, Input, ModalFooter, Toast, useDisclosure } from "@chakra-ui/react";
import useAppwrite from "@hooks/useAppwrite";
import { useEffect, useRef, useState } from "react";
import { MyServices } from "../declarations/Database";
import { Appwrite } from "../lib/env";
import { ID, storage } from "../lib/Appwrite";
import { toast } from "sonner";


const ManServicio = () => {

  const { isOpen: isEditOpen, onOpen: onEditOpen, onClose: onEditClose } = useDisclosure();
  const { isOpen: isAddOpen, onOpen: onAddOpen, onClose: onAddClose } = useDisclosure();


  const [appwriteServices, setAppwriteServices] = useState<Array<MyServices>>([])

  const [selectedService, setSelectedService] = useState<MyServices | null>(null);

  const { fromDatabase, fromStorage } = useAppwrite()
  const ServiciosCollection = fromDatabase(Appwrite.datababaseId).collection(Appwrite.collections.servicios)


  const getServicesAppwrite = async () => {
    const { documents } = await ServiciosCollection.getDocuments()
    const servicesWithImages = documents.map((doc) => ({
      ...doc,
      imageUrl: storage.getFilePreview(Appwrite.buckets.pictures, doc.photoServ),

    }));
    setAppwriteServices(servicesWithImages);

  }

  const EditClick = (service: MyServices) => {
    setSelectedService(service);
    onEditOpen();
  };

  const AddClick = ()=>{
    onAddOpen();
  }
  const photoBucket = fromStorage().bucket(Appwrite.buckets.pictures)

  const edit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()

    if (!selectedService) return;

    const formulario =  new FormData(e.currentTarget);
    const  nuevaImagen  = formulario.get("nuevaImagen") as File 

    const newService = {
      NombreServ: formulario.get("NombreServ") as string,
      Descripcion: formulario.get("Descripcion") as string,
      photoServ: selectedService.photoServ,
    }

    if (formulario) {

      if (nuevaImagen?.size > 0) {

        await photoBucket.deleteField(selectedService.photoServ)
        const idUnique = ID.unique()
        await photoBucket.createFile(idUnique, nuevaImagen)

        newService.photoServ = idUnique
      }

      await ServiciosCollection.updateDocument(selectedService.$id, newService)
        .then(() => {
          toast.success('Servicio editado')
          onEditClose()
          getServicesAppwrite()
        }).catch(() => {
          toast.error('No se logró editar el servicio')
        })
    }
  }

  const deleteAppwriteService = async (id: string) => {
    try {
      await ServiciosCollection.removeDocument(id);
      toast.success('Servicio eliminado');
      getServicesAppwrite(); 
    } catch (error) {
      toast.error('Error al eliminar el servicio');
      console.error(error);
    }
  };

  const modalForm = useRef(null)

  const createService = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()

    if (!modalForm.current) return;

    const formulario = new FormData(modalForm.current);
    const nuevaImagen = formulario.get("image") as File;

    if (!nuevaImagen) {
      toast.error("Debe subir una imagen");
      return;
    }


    const service = {
      NombreServ: formulario.get("name") as string,
      Descripcion: formulario.get("description") as string,
      photoServ: "",
    };

    const imageId = ID.unique();

        
        try {
          await photoBucket.createFile(imageId, nuevaImagen);
          service.photoServ = imageId;
    
          await ServiciosCollection.createDocument(service).then(() => {
            toast.success("Servicio creado");
            getServicesAppwrite();
            onAddClose()
          });
        } catch {
          toast.error("No se pudo crear el servicio");
          if (service.photoServ) await photoBucket.deleteField(service.photoServ);
        }
      };
    
      const confirmDelete = (id: string) => {
        toast.promise(
          new Promise<void>((resolve, reject) => {
            const userConfirmed = window.confirm("¿Estás seguro de que quieres eliminar este servicio?");
            if (userConfirmed) {
              deleteAppwriteService(id);
              resolve();
            } else {
              reject();
            }
          }),
          {
            loading: 'Eliminando servicio...',
            success: 'Servicio eliminado con éxito',
            error: 'No se eliminó el servicio',
          }
        );
      };
    
  useEffect(() => {
    getServicesAppwrite()
  }, [])

  return (
    <Box flex="1" bg="gray.50" p={6} >
      <Flex justify="space-between" mb={4}>
        <Text fontSize="2xl">Servicios</Text>
        <Button colorScheme="blue"
         onClick={() =>AddClick()}  
        >
          Agregar Servicio
        </Button>
      </Flex>
      <Table variant="simple">
        <Thead>
          <Tr>
            <Th>Nombre Servicio</Th>
            <Th>Descripcion</Th>
            <Th>Foto</Th>
          </Tr>
        </Thead>
        <Tbody>
          {appwriteServices.map((serv) => (
            <Tr key={serv.$id}>
              <Td>{serv.NombreServ}</Td>
              <Td>{serv.Descripcion}</Td>
              <Td> <img
                src={serv.imageUrl}
                style={{ width: "700px", height: "200px", objectFit: "cover" }}
              />
              </Td>
              <Td>

                <Button
                  size="sm"
                  colorScheme="blue"
                  mr={2}
                  onClick={() => EditClick(serv)}
                >
                  Editar
                </Button>
                <Button
                  size="sm"
                  colorScheme="red"
                  mt='15px'
                  onClick={() => { confirmDelete(serv.$id) }}
                >
                  Eliminar
                </Button>
              </Td>
            </Tr>
          ))}
        </Tbody>
      </Table>

      <Modal
        isCentered
        closeOnOverlayClick={false}
        isOpen={isEditOpen}
        onClose={onEditClose}
      >
        <ModalOverlay />
        <ModalContent as='form' onSubmit={edit}>
          <ModalHeader>Editar Servicio</ModalHeader>
          <ModalCloseButton />
          <ModalBody pb={6}>
            <FormControl>
              <FormLabel>Nombre</FormLabel>
              <Input
                name="NombreServ"
                defaultValue={selectedService?.NombreServ}
                required
              />
            </FormControl>

            <FormControl mt={4}>
              <FormLabel>Descripción</FormLabel>
              <Input
                name="Descripcion"
                defaultValue={selectedService?.Descripcion}
                required
              />
            </FormControl>

            <FormControl mt={4}>
              <FormLabel>Foto</FormLabel>
              <Image src={selectedService?.imageUrl} width="100px" mb={2} />
              <Input name="nuevaImagen" type="file" />
            </FormControl>
          </ModalBody>

          <ModalFooter>
            <Button colorScheme='blue' mr={3} type='submit'>
              Guardar
            </Button>
            <Button onClick={onAddClose}>Cancelar</Button>
          </ModalFooter>
        </ModalContent>
      </Modal>

      <Modal
                isCentered
                closeOnOverlayClick={false}
                isOpen={isAddOpen}
                onClose={onAddClose}
            >
                <ModalOverlay />
                <ModalContent>
                    <ModalHeader>Agregar Servicio</ModalHeader>
                    <ModalCloseButton />
                    <ModalBody pb={6}>
                    <form ref={modalForm} onSubmit={createService}>
                        <FormControl mt={4}>
                            <FormLabel htmlFor='image'>Imagen</FormLabel>
                            <Input id='image' name='image' type="file" />
                        </FormControl>

                        <FormControl mt={4}>
                            <FormLabel htmlFor='name'>Nombre Servicio</FormLabel>
                            <Input id='name' name='name' type="text" required/>
                        </FormControl>

                        <FormControl mt={4} alignItems='center'>
                            <FormLabel htmlFor='description'>Descripcion</FormLabel>
                            <Input id='description' name='description' type="text" required/>
                        </FormControl>

                    <ModalFooter>
                        <Button colorScheme='blue' mr={3} type="submit">
                            Agregar
                        </Button>
                        <Button onClick={onAddClose}>Cancelar</Button>
                    </ModalFooter>
                    </form>
                    </ModalBody>
                </ModalContent>
            </Modal>

    </Box>
  )
}

export default ManServicio