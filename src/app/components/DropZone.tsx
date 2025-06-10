"use client";

import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Label } from "@radix-ui/react-label";
import { X } from "lucide-react";
import { useCallback, useState, useEffect } from "react";
import { useDropzone } from "react-dropzone";

type DropZoneProps = {
  isMultiple?: boolean;
  label?: string;
  text?: string;
  error?: string;
  existingImages: string[];
  clearCount : number;
  onChange: (files?: File[]) => void;
  onExistingChange: (files?: string[]) => void;
};

export const DropZone = ({ isMultiple = true, label = 'Images', text = 'Drag & drop files here, or click to select', error, existingImages, clearCount, onChange, onExistingChange }: DropZoneProps) => {
  const [files, setFiles] = useState<(File & { preview: string })[]>([]);
  const [existingFiles, setExistingFiles] = useState<string[]>([]);
  const imageUrl = process.env.NEXT_PUBLIC_BASE_URL;
  const onDrop = useCallback(
    (acceptedFiles: File[]) => {
      const mappedFiles = acceptedFiles.map((file) =>
        Object.assign(file, { preview: URL.createObjectURL(file) })
      );
      if(isMultiple){
        setFiles((prevFiles) => [...prevFiles, ...mappedFiles]);
      } else {
        setFiles((prevFiles) => [...mappedFiles]);
        // setFiles(mappedFiles);

      }
      onChange(mappedFiles); // Notify parent of changes
      // onChange(files); // Notify parent of changes
    },
    [onChange]
  );

  const removeFile = (name: string) => {
    const updatedFiles = files.filter((file) => file.name !== name);
    setFiles(updatedFiles);
    onChange(updatedFiles); // Notify parent of changes
  };
  const removeExistingFile = (name: string) => {
    // const updatedFiles = existingImages.filter((file) => file !== name);
    const updatedFiles = existingFiles.filter(file => file !== name);

    setExistingFiles(updatedFiles);
    onExistingChange(updatedFiles); // Notify parent of changes
  };

  useEffect(() => {
    return () => {
      files.forEach((file) => URL.revokeObjectURL(file.preview));
    };
  }, [files]);
  useEffect(() => {
    return () => {
      setFiles([]);
      onChange([]);
      setExistingFiles([]);
    };
  }, [clearCount]);
  useEffect(() => {
    setExistingFiles(existingImages);
  }, [existingImages]);

  const { getRootProps, getInputProps } = useDropzone({
    onDrop,
    accept: {
      "image/*": [".jpeg", ".jpg", ".png", ".gif", ".webp"],
      "video/*": [".mp4", ".mov", ".avi"],
    },
    multiple: isMultiple,
  });

  return (
    <>
      <div className="flex flex-col space-y-1.5">
        <Label htmlFor={label}>{label}</Label>
        <div className="space-y-4">
          {/* Dropzone */}
          <div
            {...getRootProps()}
            className="border-dashed border-2 border-gray-400 p-6 rounded-md cursor-pointer text-center h-40 flex items-center justify-center"
          >
            <input {...getInputProps()} />
            <p className="text-gray-600">{text}</p>
          </div>
        </div>
        {error && <p className="text-red-500">{error}</p>}
      </div>
      <div className="flex flex-col space-y-1.5">
        <Label htmlFor="Preview">Preview(s)</Label>
        {/* Preview Section */}
        <div className={`grid ${isMultiple ? "md:grid-cols-6" : ""} gap-2`}>
          {files.map((file) => (
            <Card key={file.name} className="relative">
              <CardContent className="p-2">
                {file.type.startsWith("image/") ? (
                  <img
                    src={file.preview}
                    alt={file.name}
                    className="rounded-md object-cover w-full h-32"
                  />
                ) : (
                  <video controls className="rounded-md w-full h-32">
                    <source src={file.preview} type={file.type} />
                    Your browser does not support the video tag.
                  </video>
                )}
                <Button
                  type="button"
                  variant="destructive"
                  className="absolute top-1 right-1 p-0 w-6 h-6 rounded-full"
                  onClick={() => removeFile(file.name)}
                  aria-label={`Remove ${file.name}`}
                >
                  <X size={14} />
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
      {existingFiles && existingFiles.length > 0 &&
      <div className="flex flex-col space-y-1.5">
        <Label htmlFor="Existing">Existing(s)</Label>
        <div className={`grid ${isMultiple ? "md:grid-cols-6" : ""} gap-2`}>
          {existingFiles.map((file,index) => (
            <Card key={index} className="relative">
              <CardContent className="p-2">
                  <img
                    src={`${imageUrl}/${file}`}
                    alt={file}
                    className="rounded-md object-cover w-full h-32"
                  />
                <Button
                  type="button"
                  variant="destructive"
                  className="absolute top-1 right-1 p-0 w-6 h-6 rounded-full"
                  onClick={() => removeExistingFile(file)}
                  aria-label={`Remove ${file}`}
                >
                  <X size={14} />
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
      }
    </>
  );
};