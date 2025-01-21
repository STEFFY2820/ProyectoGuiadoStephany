export type PersonalProduct ={
    $id:string,
    name:string,
    description:string,
    price:number,
    active:boolean,
    imageId:string,
}

export type MyProducts = {
    total: number
    documents: [PersonalProduct]
}

export type MyServices = {
    $id:string,
    NombreServ: string
    Descripcion:string
    photoServ :string
}

export type Teachers = {
    $id:string,
    nombre:string,
    apellido:string,
    photoId:string,
    telefono:string,
    correo:string,
    direccion:string,
    cargo:string,

}