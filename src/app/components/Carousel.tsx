import React, { useCallback } from 'react'
import { EmblaOptionsType, EmblaCarouselType } from 'embla-carousel'
import { DotButton, useDotButton } from './CarouselDotButton'
import {
  PrevButton,
  NextButton,
  usePrevNextButtons
} from './CarouselArrowButtons'
import Autoplay from 'embla-carousel-autoplay'
import useEmblaCarousel from 'embla-carousel-react'
import './Carousel.css';
import { Card, CardContent } from '@/components/ui/card'
import { SubCategory } from 'next-auth'
import { FaCarSide } from 'react-icons/fa6'
import { Car } from 'lucide-react'
import { PiCarProfileDuotone } from 'react-icons/pi'
import Image from "next/image";

type PropType = {
  slides: SubCategory[]
  options?: EmblaOptionsType
}

const Carousel: React.FC<PropType> = (props) => {
  const imageUrl = process.env.NEXT_PUBLIC_BASE_URL;
  const { slides, options } = props
  const [emblaRef, emblaApi] = useEmblaCarousel(options, [Autoplay()])

  const onNavButtonClick = useCallback((emblaApi: EmblaCarouselType) => {
    const autoplay = emblaApi?.plugins()?.autoplay
    if (!autoplay) return

    const resetOrStop =
      autoplay.options.stopOnInteraction === false
        ? autoplay.reset
        : autoplay.stop

    resetOrStop()
  }, [])

  const { selectedIndex, scrollSnaps, onDotButtonClick } = useDotButton(
    emblaApi,
    onNavButtonClick
  )

  const {
    prevBtnDisabled,
    nextBtnDisabled,
    onPrevButtonClick,
    onNextButtonClick
  } = usePrevNextButtons(emblaApi, onNavButtonClick)

  return (
    <section className="embla w-full">
      <div className="embla__viewport" ref={emblaRef}>
      {/* <div className="embla__viewport"> */}
        <div className="embla__container pt-10">
          {slides.map((value,index) => (
            <div key={index} className="embla__slide px-2 md:px-4">
                <Card className="cursor-pointer rounded-xl shadow-xl">
                    <CardContent className="flex flex-col justify-center items-center p-6 gap-2">
                        <span>
                            {/* <PiCarProfileDuotone size={80} /> */}

                          <Image
                            src={`${imageUrl}/${value.logo}`}
                            width={100}
                            height={100}
                            // unoptimized
                            alt={value.name}
                            className="object-contain"
                          />
                        </span>
                        {value.name}
                    </CardContent>
                </Card>
            </div>
          ))}
        </div>
      </div>

      <div className="embla__controls">
        <div className="embla__buttons">
          <PrevButton onClick={onPrevButtonClick} disabled={prevBtnDisabled} />
          <NextButton onClick={onNextButtonClick} disabled={nextBtnDisabled} />
        </div>

        <div className="embla__dots hidden md:flex">
          {scrollSnaps.map((_, index) => (
            <DotButton
              key={index}
              onClick={() => onDotButtonClick(index)}
              className={'embla__dot'.concat(
                index === selectedIndex ? ' embla__dot--selected' : ''
              )}
            />
          ))}
        </div>
      </div>
    </section>
  )
}

export default Carousel
