import { Image } from "@chakra-ui/react"
import { Swiper,SwiperSlide } from "swiper/react"

import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';


import banner8 from '@images/banner6.jpg'
import banner2 from '@images/banner2.jpg'
import banner3 from '@images/banner3.jpg'
import banner4 from '@images/banner4.jpg'
import { Navigation, Pagination } from "swiper/modules";


const SwiperImages = [banner8, banner2, banner3, banner4]


const Carousel = () => {
  return (
    <Swiper navigation={true} modules={[Navigation, Pagination]} >
    {
      SwiperImages.map(image => (
        <SwiperSlide key={image}><Image p='4em' src={image} /></SwiperSlide>
      ))
    }
  </Swiper>
  )
}

export default Carousel