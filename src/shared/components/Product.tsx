import { Link } from "react-router-dom"
import { DummyProduct } from "../declarations/Dummyjson"
import { Box, Button, Heading, Image,Text} from "@chakra-ui/react"

const Product = ({product}:{product:DummyProduct}) => {
  return (

    <Box w='240px' bgColor='#ecf9f8' borderRadius='20px' p='2em' display='flex' flexDir='column' gap='1em'>
      <Image src={product.thumbnail} alt={product.description} loading="lazy" />
      <Heading size='nd'>
        <Link to={`/products/${product.id}`}> {product.title}</Link>
      </Heading>
      
      
      <Text> ${product.price}</Text>
      <Button>Agregar al carrito</Button>
    </Box>
  )
}

export default Product