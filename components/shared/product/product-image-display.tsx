"use client";

import { cn } from "@/lib/utils";
import Image from "next/image";
import { useState } from "react";

export default function ProductImageDisplay({ images }: { images: string[] }) {
  console.log(images);
  const [current, setCurrent] = useState(0);
  return (
    <div className='space-y-4'>
      <Image
        src={images[current]}
        alt='Product Image'
        width={1000}
        height={1000}
        className='min-h-[300px] object-center object-cover'
      />
      <div className='flex gap-1'>
        {images.map((image, index) => (
          <div
            key={index}
            onClick={() => setCurrent(index)}
            className={cn(
              "mr-2 border hover:border-orange-600 cursor-pointer",
              current === index && "border-orange-500",
            )}
          >
            <Image
              src={image}
              alt={`Product Image ${index}`}
              width={100}
              height={100}
            />
          </div>
        ))}
      </div>
    </div>
  );
}
