import { useParams } from "react-router-dom"
import { useState,useEffect } from "react"
import { DummyEndPoints, DummyProduct } from "../shared/declarations/Dummyjson"
import { Box, Heading,Image } from "@chakra-ui/react"
import useFetch from "@hooks/useFetch"
import { Link } from "react-router-dom"

const SingleProducts = () => {
  const {id} = useParams()

  const [product,setProduct]=useState<DummyProduct>()

  const{get} = useFetch(`${DummyEndPoints.PRODUCTS}/${id}`)


  async function getProduct(){
    const producto = await get()
    setProduct(producto)
  }

  useEffect(()=>
    {
      getProduct()
    },[])

  return (
    

    <Box>

      <Image src={product?.thumbnail} height='300px'/>
      
      <Heading size='2x1'>{product?.title}</Heading>
      <br />
      <Link to='/products'>Volver a los productos</Link>

    </Box>
  )
}

export default SingleProducts