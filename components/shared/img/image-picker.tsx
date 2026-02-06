"use client";

import React, { useState, useRef, useEffect } from "react";
import Image from "next/image";
import { Input } from "@/components/ui/input";

type ImagePickerProps = {
  name: string; // name for hidden input
};

export default function ImagePicker({ name }: ImagePickerProps) {
  const [selectedImage, setSelectedImage] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  function handleChange(event: React.ChangeEvent<HTMLInputElement>) {
    const file = event.target.files?.[0] ?? null;

    if (selectedImage) URL.revokeObjectURL(selectedImage);

    setSelectedImage(file ? URL.createObjectURL(file) : null);

    // Update the hidden input
    if (fileInputRef.current) {
      const dataTransfer = new DataTransfer();
      if (file) dataTransfer.items.add(file);
      fileInputRef.current.files = dataTransfer.files;
    }
  }

  return (
    <div className='flex flex-col gap-2'>
      <Input
        type='file'
        accept='image/png, image/jpeg, image/jpg'
        onChange={handleChange}
      />
      {/* Hidden input for form submission */}
      <input ref={fileInputRef} type='file' name={name} hidden />
      {selectedImage && (
        <div className='relative rounded-md w-32 h-32 overflow-hidden'>
          <Image
            src={selectedImage}
            alt='Selected Image'
            fill
            className='object-cover'
            unoptimized
          />
        </div>
      )}
    </div>
  );
}
