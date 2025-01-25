import { Image } from "@chakra-ui/react"
import { Swiper,SwiperSlide } from "swiper/react"

import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';

// import '../lib/styles.css';


import banner8 from '@images/banner1.jpg'
import banner2 from '@images/banner5.jpg'
import banner5 from '@images/images3.jpg'
import banner4 from '@images/banner10.jpg'
import { Pagination, Autoplay,Navigation } from "swiper/modules";


const SwiperImages = [banner8, banner2, banner5, banner4]


const Carousel = () => {
  return (

    <center>
    <Swiper 
    spaceBetween={30}
    centeredSlides={true}
    autoplay={{
    delay: 2500,
    disableOnInteraction: false,
    }}
    pagination={{clickable: true}} 
    navigation={true}
    modules={[Autoplay, Pagination, Navigation]} 
     className="mySwiper"  >
    {
      SwiperImages.map(image => (
        <SwiperSlide key={image}><Image h='550px' w='1200px' src={image} pt='20px'/></SwiperSlide>
      ))
    }
  </Swiper>
  </center>

  )
}

export default Carousel