"use client";

import { useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Thumbs } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/thumbs";

// const images = [

//     "https://media.istockphoto.com/id/480354734/photo/the-shepherd-and-the-moon.jpg?s=612x612&w=0&k=20&c=lk8i2p-_mQNtPVY7ne0w87ujIBsEAlBURZCFPXTHtGA=",
//     "https://www.bigfootdigital.co.uk/wp-content/uploads/2020/07/image-optimisation-scaled.jpg",
//     "https://media.istockphoto.com/id/480354734/photo/the-shepherd-and-the-moon.jpg?s=612x612&w=0&k=20&c=lk8i2p-_mQNtPVY7ne0w87ujIBsEAlBURZCFPXTHtGA=",
//     "https://www.bigfootdigital.co.uk/wp-content/uploads/2020/07/image-optimisation-scaled.jpg",
//     "https://media.istockphoto.com/id/480354734/photo/the-shepherd-and-the-moon.jpg?s=612x612&w=0&k=20&c=lk8i2p-_mQNtPVY7ne0w87ujIBsEAlBURZCFPXTHtGA=",
//     "https://www.bigfootdigital.co.uk/wp-content/uploads/2020/07/image-optimisation-scaled.jpg",
//     "https://media.istockphoto.com/id/480354734/photo/the-shepherd-and-the-moon.jpg?s=612x612&w=0&k=20&c=lk8i2p-_mQNtPVY7ne0w87ujIBsEAlBURZCFPXTHtGA=",
//     "https://www.bigfootdigital.co.uk/wp-content/uploads/2020/07/image-optimisation-scaled.jpg",
//     "https://media.istockphoto.com/id/480354734/photo/the-shepherd-and-the-moon.jpg?s=612x612&w=0&k=20&c=lk8i2p-_mQNtPVY7ne0w87ujIBsEAlBURZCFPXTHtGA=",
//     "https://www.bigfootdigital.co.uk/wp-content/uploads/2020/07/image-optimisation-scaled.jpg",
//     "https://media.istockphoto.com/id/480354734/photo/the-shepherd-and-the-moon.jpg?s=612x612&w=0&k=20&c=lk8i2p-_mQNtPVY7ne0w87ujIBsEAlBURZCFPXTHtGA=",
//     "https://www.bigfootdigital.co.uk/wp-content/uploads/2020/07/image-optimisation-scaled.jpg",
//     "https://media.istockphoto.com/id/480354734/photo/the-shepherd-and-the-moon.jpg?s=612x612&w=0&k=20&c=lk8i2p-_mQNtPVY7ne0w87ujIBsEAlBURZCFPXTHtGA=",
//     "https://www.bigfootdigital.co.uk/wp-content/uploads/2020/07/image-optimisation-scaled.jpg",
// ];

export default function ImageSlider({ images }: { images: Array<string> }) {
  const [thumbsSwiper, setThumbsSwiper] = useState<any>(null);
  const [activeIndex, setActiveIndex] = useState(0);
  const [isOpen, setIsOpen] = useState(false);
  const imgUrlPrefix = process.env.NEXT_PUBLIC_API_URL+"/";
  return (
    <div className="w-full">
      {/* Main Slider */}
      <Swiper
        modules={[Navigation, Thumbs]}
        navigation
        thumbs={{ swiper: thumbsSwiper }}
        onSlideChange={(swiper) => setActiveIndex(swiper.activeIndex)}
        className="rounded-xl overflow-hidden  shadow-xl"
      >
        {images.map((img, index) => (
          <SwiperSlide key={index} className="w-full">
            <img
              src={imgUrlPrefix+img}
              alt={`Slide ${index + 1}`}
              className="w-full object-cover rounded-xl "
              onClick={() => setIsOpen(true)}
            />
          </SwiperSlide>
        ))}
      </Swiper>

      {/* Thumbnail Slider */}
      <Swiper
        modules={[Thumbs]}
        onSwiper={setThumbsSwiper}
        slidesPerView={5}
        spaceBetween={10}
        watchSlidesProgress
        className="mt-4"
      >
        {images.map((img, index) => (
          <SwiperSlide key={index} className="cursor-pointer">
            <img
              src={imgUrlPrefix+img}
              alt={`Thumbnail ${index + 1}`}
              className={`w-full h-20 object-cover rounded-xl transition-all border-2 ${
                activeIndex === index ? "border-indigo-500" : "border-transparent"
              }`}
            />
          </SwiperSlide>
        ))}
      </Swiper>

        {/* Fullscreen Lightbox */}
        {isOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-90 flex items-center justify-center z-50">
            <button
            className="absolute top-5 right-5 text-white text-3xl"
            onClick={() => setIsOpen(false)}
            >
            ✖
            </button>
            <Swiper
            modules={[Navigation]}
            navigation
            initialSlide={activeIndex}
            className="w-full max-w-5xl h-[90vh]"
            >
            {images.map((img, index) => (
                <SwiperSlide key={index}>
                <img
                    src={imgUrlPrefix+img}
                    alt={`Fullscreen ${index + 1}`}
                    className="w-full h-full object-contain"
                />
                </SwiperSlide>
            ))}
            </Swiper>
        </div>
        )}
    </div>
  );
}
