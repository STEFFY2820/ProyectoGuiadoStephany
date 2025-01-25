import { Table, Box, Flex, Text, Button, Thead, Tr, Th, Tbody, Td, Modal, ModalOverlay, ModalContent, ModalHeader, ModalCloseButton, ModalBody, FormControl, Image, FormLabel, Input, ModalFooter, Toast, useDisclosure } from "@chakra-ui/react";
import useAppwrite from "@hooks/useAppwrite";
import { useEffect, useRef, useState } from "react";
import { Teachers } from "../declarations/Database";
import { Appwrite } from "../lib/env";
import { ID, storage } from "../lib/Appwrite";
import { toast } from "sonner";

const ManProfesores = () => {
  const { isOpen: isEditOpen, onOpen: onEditOpen, onClose: onEditClose } = useDisclosure();
  const { isOpen: isAddOpen, onOpen: onAddOpen, onClose: onAddClose } = useDisclosure();


  const [appwriteProfesores, setAppwriteProfesores] = useState<Array<Teachers>>([])

  const [selectedProfesor, setSelectedProfesor] = useState<Teachers | null>(null);

  const { fromDatabase, fromStorage } = useAppwrite()
  const ProfesoresCollection = fromDatabase(Appwrite.datababaseId).collection(Appwrite.collections.docentes)


  const getProfesoresAppwrite = async () => {
    const { documents } = await ProfesoresCollection.getDocuments()
    const servicesWithImages = documents.map((doc) => ({
      ...doc,
      imageUrl: storage.getFilePreview(Appwrite.buckets.pictures, doc.photoDoc),

    }));
    setAppwriteProfesores(servicesWithImages);

  }

  const EditClick = (profesor: Teachers) => {
    setSelectedProfesor(profesor);
    onEditOpen();
  };

  const AddClick = ()=>{
    onAddOpen();
  }
  const photoBucket = fromStorage().bucket(Appwrite.buckets.pictures)

  const edit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()

    if (!selectedProfesor) return;

    const formulario =  new FormData(e.currentTarget);
    const  nuevaImagen  = formulario.get("nuevaImagen") as File 

    const newProfesor = {
        nombreDoc: formulario.get("nombreProf") as string,
        apellidoDoc: formulario.get("apellidoProf") as string,
        photoDoc: selectedProfesor.photoDoc,
        cargo: formulario.get("cargo") as string,
        telefono: formulario.get("telefono") as string,
        correoDoc: formulario.get("correo") as string,

    }

    if (formulario) {

      if (nuevaImagen?.size > 0) {

        await photoBucket.deleteField(selectedProfesor.photoDoc)
        const idUnique = ID.unique()
        await photoBucket.createFile(idUnique, nuevaImagen)

        newProfesor.photoDoc = idUnique
      }

      await ProfesoresCollection.updateDocument(selectedProfesor.$id, newProfesor)
        .then(() => {
          toast.success('Profesor editado')
          onEditClose()
          getProfesoresAppwrite()
        }).catch(() => {
          toast.error('No se logró editar el profesor')
        })
    }
  }

  const deleteAppwriteProfesor = async (id: string) => {
    try {
      await ProfesoresCollection.removeDocument(id);
      toast.success('Profesor eliminado');
      getProfesoresAppwrite(); 
    } catch (error) {
      toast.error('Error al eliminar al profesor');
      console.error(error);
    }
  };

  const modalForm = useRef(null)

  const createProfesor = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()

    if (!modalForm.current) return;

    const formulario = new FormData(modalForm.current);
    const nuevaImagen = formulario.get("image") as File;

    if (!nuevaImagen) {
      toast.error("Debe subir una imagen");
      return;
    }


    const profesor = {
      nombreDoc: formulario.get("name") as string,
      apellidoDoc: formulario.get("lastname") as string,
      photoDoc: "",
      cargo: formulario.get("cargo") as string,
      telefono: formulario.get("telf") as string,
      correoDoc: formulario.get("email") as string,
    };

    const imageId = ID.unique();
        
        try {
          await photoBucket.createFile(imageId, nuevaImagen);
          profesor.photoDoc = imageId;
    
          await ProfesoresCollection.createDocument(profesor).then(() => {
            toast.success("Profesor creado");
            getProfesoresAppwrite();
            onAddClose()
          });
        } catch {
          toast.error("No se pudo crear al profesor");
          if (profesor.photoDoc) await photoBucket.deleteField(profesor.photoDoc);
        }
      };
    
      const confirmDelete = (id: string) => {
        toast.promise(
          new Promise<void>((resolve, reject) => {
            const userConfirmed = window.confirm("¿Estás seguro de que quieres eliminar este profesor?");
            if (userConfirmed) {
                deleteAppwriteProfesor(id);
              resolve();
            } else {
              reject();
            }
          }),
          {
            loading: 'Eliminando profesor...',
            success: 'Profesor eliminado con éxito',
            error: 'No se eliminó el profesor',
          }
        );
      };
    
  useEffect(() => {
    getProfesoresAppwrite()
  }, [])

  return (
    <Box flex="1" bg="gray.50" p={6} >
    <Flex justify="space-between" mb={4}>
      <Text fontSize="2xl">Profesores</Text>
      <Button colorScheme="blue"
       onClick={() =>AddClick()}  
      >
        Agregar Profesor
      </Button>
    </Flex>
    <Table variant="simple">
      <Thead>
        <Tr>
          <Th>Nombre Profesor</Th>
          <Th>Apellido Profesor</Th>
          <Th>Foto</Th>
          <Th>Cargo</Th>
          <Th>Telefono</Th>
          <Th>Correo</Th>
        </Tr>
      </Thead>
      <Tbody>
        {appwriteProfesores.map((prof) => (
          <Tr key={prof.$id}>
            <Td>{prof.nombreDoc}</Td>
            <Td>{prof.apellidoDoc}</Td>
            <Td> <img
              src={prof.imageUrl}
              style={{ width: "700px", height: "200px", objectFit: "cover" }}
            />
            </Td>
            <Td>{prof.cargo}</Td>
            <Td>{prof.telefono}</Td>
            <Td>{prof.correoDoc}</Td>
            <Td>
              <Button
                size="sm"
                colorScheme="blue"
                mr={2}
                onClick={() => EditClick(prof)}
              >
                Editar
              </Button>
              <Button
                size="sm"
                colorScheme="red"
                mt='15px'
                onClick={() => { confirmDelete(prof.$id) }}
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
        <ModalHeader>Editar Profesor</ModalHeader>
        <ModalCloseButton />
        <ModalBody pb={6}>
          <FormControl>
            <FormLabel>Nombre</FormLabel>
            <Input
              name="nombreProf"
              defaultValue={selectedProfesor?.nombreDoc}
              required
            />
          </FormControl>

          <FormControl mt={4}>
            <FormLabel>Descripción</FormLabel>
            <Input
              name="apellidoProf"
              defaultValue={selectedProfesor?.apellidoDoc}
              required
            />
          </FormControl>

          <FormControl mt={4}>
            <FormLabel>Foto</FormLabel>
            <Image src={selectedProfesor?.imageUrl} width="100px" mb={2} />
            <Input name="nuevaImagen" type="file" />
          </FormControl>

          
          <FormControl mt={4}>
            <FormLabel>Cargo</FormLabel>
            <Input
              name="cargo"
              defaultValue={selectedProfesor?.cargo}
              required
            />
          </FormControl>

          <FormControl mt={4}>
            <FormLabel>Telefono</FormLabel>
            <Input
              name="telefono"
              defaultValue={selectedProfesor?.telefono}
              required
            />
          </FormControl>

          
          <FormControl mt={4}>
            <FormLabel>Correo</FormLabel>
            <Input
              name="correo"
              defaultValue={selectedProfesor?.correoDoc}
              required
            />
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
                  <ModalHeader>Agregar Profesor</ModalHeader>
                  <ModalCloseButton />
                  <ModalBody pb={6}>
                  <form ref={modalForm} onSubmit={createProfesor}>
                      <FormControl mt={4}>
                          <FormLabel htmlFor='image'>Imagen</FormLabel>
                          <Input id='image' name='image' type="file" />
                      </FormControl>

                      <FormControl mt={4}>
                          <FormLabel htmlFor='name'>Nombre Profesor</FormLabel>
                          <Input id='name' name='name' type="text" />
                      </FormControl>

                      <FormControl mt={4}>
                          <FormLabel htmlFor='lastname'>Apellido Profesor</FormLabel>
                          <Input id='lastname' name='lastname' type="text" />
                      </FormControl>

                      <FormControl mt={4}>
                          <FormLabel htmlFor='cargo'>Cargo Profesor</FormLabel>
                          <Input id='cargo' name='cargo' type="text" />
                      </FormControl>

                      
                      <FormControl mt={4}>
                          <FormLabel htmlFor='telf'>Telefono Profesor</FormLabel>
                          <Input id='telf' name='telf' type="text" />
                      </FormControl>

                      <FormControl mt={4}>
                          <FormLabel htmlFor='email'>Correo Profesor</FormLabel>
                          <Input id='email' name='email' type="email" />
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

export default ManProfesores