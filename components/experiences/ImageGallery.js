"use client";

import Image from "next/image";
import { useState } from "react";

export function ImageGallery({ images, title }) {
  const [selectedImage, setSelectedImage] = useState(0);
  const mainImage = images[0];
  const thumbnails = images.slice(1, 4);

  return (
    <div className="mb-6">
      <div className="grid gap-2 md:grid-cols-2">
        <div className="relative h-[400px] overflow-hidden rounded-l-lg md:h-[500px]">
          <Image
            src={mainImage}
            alt={title}
            fill
            className="object-cover"
            sizes="50vw"
            priority
          />
        </div>
        <div className="grid grid-cols-2 gap-2">
          {thumbnails.map((image, idx) => (
            <div
              key={idx}
              className={`relative h-[196px] overflow-hidden md:h-[246px] ${
                idx === 1 ? "rounded-tr-lg" : ""
              } ${idx === 3 ? "rounded-br-lg" : ""}`}
            >
              <Image
                src={image}
                alt={`${title} ${idx + 2}`}
                fill
                className="object-cover"
                sizes="25vw"
              />
            </div>
          ))}
        </div>
      </div>
      <div className="mt-2 text-center">
        <button className="text-sm font-semibold text-black hover:underline">
          View all photos
        </button>
      </div>
    </div>
  );
}
