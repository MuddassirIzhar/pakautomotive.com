"use client";

import React, { useCallback, useState } from "react";
import { useDropzone } from "react-dropzone";
import { Trash2 } from "lucide-react";
import { Button } from "@/components/ui/button";

interface ImageUploadProps {
  onChange: (files: File[]) => void;
}

export const ImageUpload: React.FC<ImageUploadProps> = ({ onChange }) => {
  const [files, setFiles] = useState<File[]>([]);

  const onDrop = useCallback(
    (acceptedFiles: File[]) => {
      setFiles((prevFiles) => [...prevFiles, ...acceptedFiles]);
      onChange([...files, ...acceptedFiles]);
    },
    [files, onChange]
  );

  const { getRootProps, getInputProps } = useDropzone({
    onDrop,
    accept: {
      "image/*": [".png", ".jpg", ".jpeg", ".gif"],
    },
  });

  const removeFile = (index: number) => {
    const newFiles = files.filter((_, i) => i !== index);
    setFiles(newFiles);
    onChange(newFiles);
  };

  return (
    <div>
      <div
        {...getRootProps()}
        className="border-2 border-dashed border-gray-300 p-6 text-center cursor-pointer"
      >
        <input {...getInputProps()} />
        <p>Drag & drop images here, or click to select files</p>
      </div>

      <div className="mt-4">
        {files.map((file, index) => (
          <div key={file.name} className="flex items-center justify-between p-2 border rounded mb-2">
            <span>{file.name}</span>
            <Button
              variant="ghost"
              size="sm"
              onClick={() => removeFile(index)}
            >
              <Trash2 className="h-4 w-4" />
            </Button>
          </div>
        ))}
      </div>
    </div>
  );
};