import { Table, Box, Flex, Text, Button, Thead, Tr, Th, Tbody, Td, Modal, ModalOverlay, ModalContent, ModalHeader, ModalCloseButton, ModalBody, FormControl, Image, FormLabel, Input, ModalFooter, Toast, useDisclosure } from "@chakra-ui/react";
import useAppwrite from "@hooks/useAppwrite";
import { useEffect, useRef, useState } from "react";
import { Alumnos} from "../declarations/Database";
import { Appwrite } from "../lib/env";
import { ID, storage } from "../lib/Appwrite";
import { toast } from "sonner";

const ManAlumnos = () => {

  const { isOpen: isEditOpen, onOpen: onEditOpen, onClose: onEditClose } = useDisclosure();
  const { isOpen: isAddOpen, onOpen: onAddOpen, onClose: onAddClose } = useDisclosure();


  const [appwriteAlumnos, setAppwriteAlumnos] = useState<Array<Alumnos>>([])

  const [selectedAlumnos, setSelectedAlumnos] = useState<Alumnos | null>(null);

  const { fromDatabase, fromStorage } = useAppwrite()
  const AlumnosCollection = fromDatabase(Appwrite.datababaseId).collection(Appwrite.collections.alumnos)


  const getAlumnosAppwrite = async () => {
    const { documents } = await AlumnosCollection.getDocuments()
    const servicesWithImages = documents.map((doc) => ({
      ...doc,
      imageUrl: storage.getFilePreview(Appwrite.buckets.pictures, doc.imageAlumn),

    }));
    setAppwriteAlumnos(servicesWithImages);

  }

  const EditClick = (alumno: Alumnos) => {
    setSelectedAlumnos(alumno);
    onEditOpen();
  };

  const AddClick = ()=>{
    onAddOpen();
  }
  const photoBucket = fromStorage().bucket(Appwrite.buckets.pictures)

  const edit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()

    if (!selectedAlumnos) return;

    const formulario =  new FormData(e.currentTarget);
    const  nuevaImagen  = formulario.get("nuevaImagen") as File 

    const newAlumno = {
        nombAlumn: formulario.get("nombAlumn") as string,
        apellAlumno: formulario.get("apellAlumno") as string,
        imageAlumn: selectedAlumnos.imageAlumn,
        grado: formulario.get("grado") as string,
        dni: formulario.get("dni") as string,
        edad: Number(formulario.get("edad")),

    }

    if (formulario) {

      if (nuevaImagen?.size > 0) {

        await photoBucket.deleteField(selectedAlumnos.imageAlumn)
        const idUnique = ID.unique()
        await photoBucket.createFile(idUnique, nuevaImagen)

        newAlumno.imageAlumn = idUnique
      }

      await AlumnosCollection.updateDocument(selectedAlumnos.$id, newAlumno)
        .then(() => {
          toast.success('Alumno editado')
          onEditClose()
          getAlumnosAppwrite()
        }).catch(() => {
          toast.error('No se logró editar el alumno')
        })
    }
  }

  const deleteAppwritealumno = async (id: string) => {
    try {
      await AlumnosCollection.removeDocument(id);
      toast.success('Alumno eliminado');
      getAlumnosAppwrite(); 
    } catch (error) {
      toast.error('Error al eliminar al alumno');
      console.error(error);
    }
  };

  const modalForm = useRef(null)

  const createalumno = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()

    if (!modalForm.current) return;

    const formulario = new FormData(modalForm.current);
    const nuevaImagen = formulario.get("image") as File;

    if (!nuevaImagen) {
      toast.error("Debe subir una imagen");
      return;
    }


    const alumno = {
      nombAlumn: formulario.get("name") as string,
      apellAlumno: formulario.get("lastname") as string,
      imageAlumn: "",
      grado: formulario.get("grade") as string,
      dni: formulario.get("doc") as string,
      edad: Number(formulario.get("edadA")),
    };

    const imageId = ID.unique();
        
        try {
          await photoBucket.createFile(imageId, nuevaImagen);
          alumno.imageAlumn = imageId;
    
          await AlumnosCollection.createDocument(alumno).then(() => {
            toast.success("Alumno creado");
            getAlumnosAppwrite();
            onAddClose()
          });
        } catch {
          toast.error("No se pudo crear al alumno");
          if (alumno.imageAlumn) await photoBucket.deleteField(alumno.imageAlumn);
        }
      };
    
      const confirmDelete = (id: string) => {
        toast.promise(
          new Promise<void>((resolve, reject) => {
            const userConfirmed = window.confirm("¿Estás seguro de que quieres eliminar este alumno?");
            if (userConfirmed) {
                deleteAppwritealumno(id);
              resolve();
            } else {
              reject();
            }
          }),
          {
            loading: 'Eliminando alumno...',
            success: 'alumno eliminado con éxito',
            error: 'No se eliminó el alumno',
          }
        );
      };
    
  useEffect(() => {
    getAlumnosAppwrite()
  }, [])

  return (
    <Box flex="1" bg="gray.50" p={6} >
    <Flex justify="space-between" mb={4}>
      <Text fontSize="2xl">Alumnos</Text>
      <Button colorScheme="blue"
       onClick={() =>AddClick()}  
      >
        Agregar alumno
      </Button>
    </Flex>
    <Table variant="simple">
      <Thead>
        <Tr>
          <Th>Nombre alumno</Th>
          <Th>Apellido alumno</Th>
          <Th>Dni</Th>
          <Th>Edad</Th>
          <Th>Grado</Th>
          <Th>Imagen</Th>
        </Tr>
      </Thead>
      <Tbody>
        {appwriteAlumnos.map((alum) => (
          <Tr key={alum.$id}>
            <Td>{alum.nombAlumn}</Td>
            <Td>{alum.apellAlumno}</Td>
            <Td>{alum.dni}</Td>
            <Td>{alum.edad}</Td>
            <Td>{alum.grado}</Td>
            <Td> <img
              src={alum.imageUrl}
              style={{ width: "150px", height: "150px", objectFit: "cover" }}
            />
            </Td>
            <Td>
              <Button
                size="sm"
                colorScheme="blue"
                mr={2}
                onClick={() => EditClick(alum)}
              >
                Editar
              </Button>
              <Button
                size="sm"
                colorScheme="red"
                onClick={() => { confirmDelete(alum.$id) }}
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
        <ModalHeader>Editar alumno</ModalHeader>
        <ModalCloseButton />
        <ModalBody pb={6}>
          <FormControl>
            <FormLabel>Nombre</FormLabel>
            <Input
              name="nombAlumn"
              defaultValue={selectedAlumnos?.nombAlumn}
              required
            />
          </FormControl>

          <FormControl mt={4}>
            <FormLabel>Descripción</FormLabel>
            <Input
              name="apellAlumno"
              defaultValue={selectedAlumnos?.apellAlumno}
              required
            />
          </FormControl>

          <FormControl mt={4}>
            <FormLabel>Foto</FormLabel>
            <Image src={selectedAlumnos?.imageUrl} width="100px" mb={2} />
            <Input name="nuevaImagen" type="file" />
          </FormControl>

          
          <FormControl mt={4}>
            <FormLabel>Grado</FormLabel>
            <Input
              name="grado"
              defaultValue={selectedAlumnos?.grado}
              required
            />
          </FormControl>

          <FormControl mt={4}>
            <FormLabel>Dni</FormLabel>
            <Input
              name="dni"
              defaultValue={selectedAlumnos?.dni}
              required
            />
          </FormControl>

          
          <FormControl mt={4}>
            <FormLabel>Edad</FormLabel>
            <Input
              name="edad"
              defaultValue={selectedAlumnos?.edad}
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
                  <ModalHeader>Agregar alumno</ModalHeader>
                  <ModalCloseButton />
                  <ModalBody pb={6}>
                  <form ref={modalForm} onSubmit={createalumno}>
                      <FormControl mt={4}>
                          <FormLabel htmlFor='image'>Imagen</FormLabel>
                          <Input id='image' name='image' type="file" />
                      </FormControl>

                      <FormControl mt={4}>
                          <FormLabel htmlFor='name'>Nombre alumno</FormLabel>
                          <Input id='name' name='name' type="text" />
                      </FormControl>

                      <FormControl mt={4}>
                          <FormLabel htmlFor='lastname'>Apellido alumno</FormLabel>
                          <Input id='lastname' name='lastname' type="text" />
                      </FormControl>

                      <FormControl mt={4}>
                          <FormLabel htmlFor='doc'>Dni alumno</FormLabel>
                          <Input id='doc' name='doc' type="text" />
                      </FormControl>

                      
                      <FormControl mt={4}>
                          <FormLabel htmlFor='edadA'>Edad alumno</FormLabel>
                          <Input id='edadA' name='edadA' type="number" />
                      </FormControl>

                      <FormControl mt={4}>
                          <FormLabel htmlFor='grade'> Grado </FormLabel>
                          <Input id='grade' name='grade' type="text" />
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

export default ManAlumnos