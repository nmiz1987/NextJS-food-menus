"use client";
import { useRef, useState } from "react";
import styles from "./image-picker.module.css";
import Image from "next/image";

interface ImagePickerProps {
  label: string;
  name: string;
}

export default function ImagePicker({ label, name }: ImagePickerProps) {
  const [pickedImage, setPickedImage] = useState<string | null>();

  const handleImageChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];

    if (!file) {
      setPickedImage(null);
      return;
    }

    const fileReader = new FileReader();
    fileReader.onload = () => {
      setPickedImage(fileReader.result as string);
    };
    fileReader.readAsDataURL(file);
  };

  const imageInput = useRef<HTMLInputElement>(null);
  const handlePickClick = () => {
    imageInput.current?.click();
  };

  return (
    <div className={styles.picker}>
      <label htmlFor={name}>{label}</label>
      <div className={styles.controls}>
        <div className={styles.preview}>
          {pickedImage ? <Image src={pickedImage} fill alt="The image selected by the user" /> : <p>No image picked yet.</p>}
        </div>
        <input
          onChange={handleImageChange}
          ref={imageInput}
          className={styles.input}
          type="file"
          id={name}
          accept="image/png, image/jpeg, image/jpg, image/webp"
          name={name}
          required
        />
        <button className={styles.button} type="button" onClick={handlePickClick}>
          Pick an image
        </button>
      </div>
    </div>
  );
}
