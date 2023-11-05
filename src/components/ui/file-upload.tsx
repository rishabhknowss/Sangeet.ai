import { Camera } from "lucide-react";
import React, { useCallback, useEffect } from "react";
import { useDropzone } from "react-dropzone";

type FileUploadProps = {
  setUploadedImage: (file: any) => void;
  setImageUrl: (url: string) => void;
};

const FileUpload: React.FC<FileUploadProps> = ({
  setUploadedImage,
  setImageUrl,
}) => {
  const onDrop = useCallback((acceptedFiles: File[]) => {
    const file = acceptedFiles[0];
    setUploadedImage(file);
    if (file) {
      const reader = new FileReader();

      reader.onload = (e: any) => {
        setImageUrl(e.target!.result);
      };

      reader.readAsDataURL(file);
    }
  }, []);

  const { getRootProps, getInputProps } = useDropzone({
    onDrop,
    maxFiles: 1,
    accept: {
      "image/png": [".png", ".jpg"],
    },
  });

  return (
    <div
      {...getRootProps()}
      className="flex w-full h-[100px] cursor-pointer justify-center items-center border-dashed border-2 p-4 text-center"
    >
              <input {...getInputProps()} />
      <div className="flex flex-col justify-center items-center">
        <Camera />
        <p className="text-sm">Drag & drop files here or click to select</p>
      </div>
    </div>
  );
};

export default FileUpload;
