// hooks/use-cloudinary-upload.ts
import { useState } from "react";

export interface UseCloudinaryUploadReturn {
  images: string[];
  uploading: boolean;
  error: string | null;
  handleFileChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  removeImage: (index: number) => void;
  clearImages: () => void;
}

export const useCloudinaryUpload = (): UseCloudinaryUploadReturn => {
  const [images, setImages] = useState<string[]>([]);
  const [uploading, setUploading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (!files) return;

    const fileArray = Array.from(files);
    if (fileArray.length + images.length > 4) {
      setError("আপনি সর্বোচ্চ ৪টি ছবি আপলোড করতে পারেন।");
      return;
    }

    setUploading(true);
    setError(null);

    try {
      const uploadedUrls: string[] = [];

      for (const file of fileArray) {
        const formData = new FormData();
        formData.append("file", file);
        formData.append("upload_preset", process.env.NEXT_PUBLIC_CLOUDINARY_PRESET!);

        const res = await fetch(
          `https://api.cloudinary.com/v1_1/${process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD!}/image/upload`,
          {
            method: "POST",
            body: formData,
          }
        );

        const data = await res.json();

        if (data.secure_url) {
          uploadedUrls.push(data.secure_url);
        } else {
          throw new Error(data.error?.message || "আপলোড ব্যর্থ হয়েছে");
        }
      }

      setImages(prev => [...prev, ...uploadedUrls]);
    } catch (err: any) {
      setError(err.message || "কিছু সমস্যা হয়েছে");
    } finally {
      setUploading(false);
    }
  };

  const removeImage = (index: number) => {
    setImages(prev => prev.filter((_, i) => i !== index));
  };

  const clearImages = () => {
    setImages([]);
  };

  return { images, uploading, error, handleFileChange, removeImage, clearImages };
};
