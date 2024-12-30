import { useEffect, useState } from "react"
import useFetch from "../shared/hooks/useFetch"
import { DummyEndPoints, DummyProduct } from "../shared/declarations/Dummyjson"
import Product from "../shared/components/Product"


const Products = () => {

  const [products,setProducts] = useState<Array<DummyProduct>>()

  const{get}  = useFetch(DummyEndPoints.PRODUCTS)

  const getProducts = async () =>{
    //desestructuracion 
    const {products}: DummyProducts = await get()
    setProducts(products)

  }
  
  useEffect (()=>{
    getProducts()
  },[]) 

  return (
    <div>
      {
        products && products.map(p =>(
          <Product key ={p.id} product ={p}/>
      ))
      }
      </div>
  )
}

export default Products