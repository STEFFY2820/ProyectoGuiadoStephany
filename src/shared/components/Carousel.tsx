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
import { Pagination } from "swiper/modules";


const SwiperImages = [banner8, banner2, banner5, banner4]


const Carousel = () => {
  return (
    <Swiper pagination={true} modules={[Pagination]}  className="mySwiper" >
    {
      SwiperImages.map(image => (
        <SwiperSlide key={image}><Image h='550px' w='1600px' src={image} /></SwiperSlide>
      ))
    }
  </Swiper>
  )
}

export default Carousel