
const Whatsapp: React.FC = () => {
    const phoneNumber = '51951745160'; // Número en formato internacional
    const message = 'Hola, estoy interesado en sus servicios'; // Mensaje predefinido
    const whatsAppUrl = `https://wa.me/${phoneNumber}?text=${encodeURIComponent(message)}`;
  return (
    <a
    href={whatsAppUrl}
    target="_blank"
    rel="noopener noreferrer"

    
  >
    Contactanos

    
  </a>
  )
}

export default Whatsapp
