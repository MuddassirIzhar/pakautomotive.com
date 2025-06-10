"use client";

import { FormEvent, useState } from "react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import axios from "axios";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { X } from "lucide-react";
import Image from "next/image";
import { blogCreateUpdateSchema } from "@/app/(admin)/validation";

const schema = yup.object().shape({
  images: yup.array().min(1, "At least one image is required"),
});

type FormData = {
  images: File[];
};

interface blogForm {
    images?: any[] | undefined;
}
export default function MultiImageUpload() {
  const [previewImages, setPreviewImages] = useState<string[]>([]);
  const [uploadedImages, setUploadedImages] = useState<string[]>([]);

//   const {
//     register,
//     handleSubmit,
//     setValue,
//     watch,
//     formState: { errors },
//   } = useForm<FormData>({
//     resolver: yupResolver(schema),
//     defaultValues: { images: [] },
//   });

    const blogOptions = {
        resolver: yupResolver(blogCreateUpdateSchema),
        defaultValues: { images: [] },
    };
    const { register: blogFields, control: blogControl, formState: { errors: blogErrors }, reset: blogFormReset, handleSubmit: submitBlog, setValue: setBlog, watch: blogWatch, getValues: getBlog, } = useForm<blogForm>(blogOptions);

  const images = blogWatch("images");

  const handleImageChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const files = event.target.files;
    if (files) {
      const fileArray = Array.from(files);
      setBlog("images", fileArray);
      setPreviewImages(fileArray.map((file) => URL.createObjectURL(file)));
    }
  };

  const removeImage = (index: number) => {
    if (images) {
      const filteredImages = images.filter((_, i) => i !== index);
      setBlog("images", filteredImages);
      setPreviewImages(previewImages.filter((_, i) => i !== index));
    }
  };

//   const onSubmit = async (data: FormData) => {
const onSubmitBlog = async (data: FormEvent<HTMLFormElement> | any, e: any) => {
    
    try {
      const formData = new FormData();
      data.images.forEach((image: File) => {
        formData.append("images", image);
      });

      const response = await axios.post("http://localhost:5000/api/upload", formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });

      setUploadedImages(response.data.urls);
    } catch (error) {
      console.error("Upload failed", error);
    }
  };

  return (
    <form onSubmit={submitBlog(onSubmitBlog)} className="space-y-4">
      {/* File Input */}
      <input
        type="file"
        multiple
        accept="image/*"
        {...blogFields("images")}
        onChange={handleImageChange}
        className="hidden"
        id="fileInput"
      />
      <label htmlFor="fileInput" className="block w-full">
        <Button className="w-full">Select Images</Button>
      </label>

      {/* Display Previews */}
      <div className="grid grid-cols-3 gap-2">
        {previewImages.map((src, index) => (
          <Card key={index} className="relative">
            <CardContent className="p-2">
              <Image
                src={src}
                alt={`Preview ${index}`}
                width={100}
                height={100}
                className="rounded-md object-cover"
              />
              <Button
                type="button"
                variant="destructive"
                className="absolute top-1 right-1 p-1 rounded-full"
                onClick={() => removeImage(index)}
              >
                <X size={14} />
              </Button>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Upload Button */}
      <Button type="submit" className="w-full">
        Upload
      </Button>

      {/* Display Uploaded Images */}
      {uploadedImages.length > 0 && (
        <div className="grid grid-cols-3 gap-2">
          {uploadedImages.map((src, index) => (
            <Image key={index} src={src} alt={`Uploaded ${index}`} width={100} height={100} className="rounded-md" />
          ))}
        </div>
      )}

      {/* Validation Error */}
      {blogErrors.images && <p className="text-red-500">{blogErrors.images.message}</p>}
    </form>
  );
}
