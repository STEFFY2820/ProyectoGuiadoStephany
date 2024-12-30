export type DummySession = {
    accessToken: string
    email: string
    firstName: string
    gender: string
    id: number
    image: string
    lastName: string
    username: string
    refreshToken: string
}

export type DummyUser ={
    username:string
    password:string
}

export enum DummyEndPoints {
    LOGIN = 'https://dummyjson.com/auth/login',
    PRODUCTS = 'https://dummyjson.com/products'

}

export type DummyProducts = {
    limit: number,
    products: Array<DummyProduct>,
    skip: number,
    total: number
  }
  
  export type DummyProduct = {
    id: number,
    title: string,
    description: string,
    price:number,
    rating:number,
    returnPolicy: string,
    stock: number,
    discountPercentage: number,
    category: string,
    thumbnail: string,
    tags: Array<string>,
  }