import Footer from "@components/Footer"
import Navbar from "@components/Navbar"

const BaseLayout = ({children}) => {
  
  return (
    <>
      <Navbar/>
      
      {children}
      <Footer/>
    </>
  )
}

export default BaseLayout