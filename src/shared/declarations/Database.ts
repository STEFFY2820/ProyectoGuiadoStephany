export type PersonalProduct = {
    $id: string,
    name: string,
    description: string,
    price: number,
    active: boolean,
    imageId: string,
}

export type MyProducts = {
    total: number
    documents: [PersonalProduct]
}

export type MyServices = {
    $id: string,
    NombreServ: string
    Descripcion: string
    photoServ: string
}

export type Teachers = {
    $id: string,
    nombreDoc: string,
    apellidoDoc: string,
    photoDoc: string,
    cargo: string,
    telefono: string,
    correoDoc: string,
    // direccion: string,
    
}

export type Alumnos = {
    $id: string,
    nombAlumn: string,
    apellAlumno: string,
    dni: string,
    edad: number,
    grado: string,
    imageAlumn: string,
    
}