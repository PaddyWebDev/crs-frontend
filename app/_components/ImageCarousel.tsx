'use client'

import * as React from "react"
import Image from "next/image"
import { Card, CardContent } from "@/components/ui/card"
import {
    Carousel,
    CarouselContent,
    CarouselItem,
    CarouselNext,
    CarouselPrevious,
} from "@/components/ui/carousel"

const images = [
    '/Images/Farm.jpg',
    '/Images/smart-farm.jpg',
    '/Images/img3.jpg'
]

export default function ImageCarousel() {
    return (
        <Carousel className="w-[90dvw] h-[93dvh] ">
            <CarouselPrevious />
            <CarouselContent>
                {images.map((src, index) => (
                    <CarouselItem className="" key={index}>
                        <div className="p-5">
                            <Card className=" w-full h-[80dvh]">
                                <CardContent className="flex aspect-[16/9] items-center justify-center p-6 relative">
                                    <Image
                                        className=" object-none "
                                        src={src || "/placeholder.svg"}
                                        alt={`Carousel Image ${index + 1}`}
                                        fill
                                        priority={index === 0}
                                    />
                                </CardContent>
                            </Card>
                        </div>
                    </CarouselItem>
                ))}
            </CarouselContent>
            <CarouselNext />
        </Carousel>
    )
}
