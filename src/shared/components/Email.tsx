import { Html, Button } from "@react-email/components";

const Email = () => {
  return (
    <Html lang="en">
    <Button href={'http://localhost:5173/products'}>Click me</Button>
    </Html>
  )
}

export default Email