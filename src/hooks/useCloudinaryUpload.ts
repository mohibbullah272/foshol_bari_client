// hooks/use-cloudinary-upload.ts
import { useState } from "react";

export interface UseCloudinaryUploadReturn {
  image: string | null;
  uploading: boolean;
  error: string | null;
  handleFileChange: (e: React.ChangeEvent<HTMLInputElement>) => Promise<string | null>;
  removeImage: () => void;
  clear: () => void;
}

export const useCloudinaryUpload = (): UseCloudinaryUploadReturn => {
  const [image, setImage] = useState<string | null>(null);
  const [uploading, setUploading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>): Promise<string | null> => {
    const files = e.target.files;
    if (!files || files.length === 0) return null;

    const file = files[0];
    
    // Validate file type
    if (!file.type.startsWith('image/')) {
      setError('শুধুমাত্র ছবি ফাইল আপলোড করা যাবে');
      return null;
    }

    // Validate file size (5MB)
    if (file.size > 5 * 1024 * 1024) {
      setError('ছবির সাইজ ৫MB এর কম হতে হবে');
      return null;
    }

    setUploading(true);
    setError(null);

    try {
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
        const imageUrl = data.secure_url;
        setImage(imageUrl);
        return imageUrl; // Return the URL so parent component can use it
      } else {
        throw new Error(data.error?.message || "আপলোড ব্যর্থ হয়েছে");
      }
    } catch (err: any) {
      setError(err.message || "ছবি আপলোড করতে সমস্যা হয়েছে");
      return null;
    } finally {
      setUploading(false);
    }
  };

  const removeImage = () => {
    setImage(null);
  };

  const clear = () => {
    setImage(null);
    setError(null);
  };

  return { image, uploading, error, handleFileChange, removeImage, clear };
};