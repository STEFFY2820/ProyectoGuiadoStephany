import { useContext, useEffect, useState } from "react"
import { Box } from "@chakra-ui/react"
import BaseLayout from "@layouts/BaseLayout"
import { Appwrite } from "../shared/lib/env"
import { PersonalProduct } from "../shared/declarations/Database"
import useAppwrite from "@hooks/useAppwrite"
import MyProducts from "@components/MyProducts"
import Carousel from "@components/Carousel"
import DummyProducts from "@components/DummyProducts"
import { UserContext } from "../shared/context/UserContext"
import { Query } from "appwrite"

const Products = () => {

  const [appwriteProducts, setAppwriteProducts] = useState<Array<PersonalProduct>>([])
  
  const context = useContext(UserContext)

  const { fromDatabase } = useAppwrite()
  const ProductsCollection = fromDatabase(Appwrite.datababaseId).collection(Appwrite.collections.products)
  const getProductsAppwrite = async () => {
  const { documents } = await ProductsCollection.getDocuments([
      Query.equal('ownerId',context?.session.userId)])
      setAppwriteProducts(documents)

  }

  useEffect(() => {
    getProductsAppwrite()
    console.log(context?.session)
  }, [])

  return (

    <BaseLayout>
      <>
        <Box width='700px' m='auto'>
          <Carousel />
        </Box>

        <MyProducts products={appwriteProducts} onRefresh={getProductsAppwrite} />
        <br />
        <Box display='flex' flexWrap='wrap' w='70%' m='0 auto' justifyContent='space-between' gap='2em' >
          <DummyProducts />
        </Box>
      </>
    </BaseLayout>
    )
}

export default Products