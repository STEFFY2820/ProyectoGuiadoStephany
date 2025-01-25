import { Box } from "@chakra-ui/react"
import { PacmanLoader} from "react-spinners"

const Loading = () => {
  return (
    <Box w='100vw' h='100vh' display='flex' alignItems='center' justifyContent='center'>
        <PacmanLoader color="rgba(255, 242, 2, 1)"/>

    </Box>

  )
}

export default Loading
