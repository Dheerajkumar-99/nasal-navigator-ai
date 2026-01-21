import { useState, useCallback } from "react";
import { Upload, Image, X, FileImage } from "lucide-react";
import { Button } from "./ui/button";

interface ImageUploaderProps {
  onImageSelect: (file: File) => void;
}

const ImageUploader = ({ onImageSelect }: ImageUploaderProps) => {
  const [isDragging, setIsDragging] = useState(false);
  const [preview, setPreview] = useState<string | null>(null);
  const [fileName, setFileName] = useState<string | null>(null);

  const handleDragOver = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(true);
  }, []);

  const handleDragLeave = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
  }, []);

  const handleDrop = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
    
    const files = e.dataTransfer.files;
    if (files.length > 0) {
      handleFile(files[0]);
    }
  }, []);

  const handleFileInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (files && files.length > 0) {
      handleFile(files[0]);
    }
  };

  const handleFile = (file: File) => {
    if (file.type.startsWith("image/")) {
      setFileName(file.name);
      const reader = new FileReader();
      reader.onload = (e) => {
        setPreview(e.target?.result as string);
      };
      reader.readAsDataURL(file);
      onImageSelect(file);
    }
  };

  const clearPreview = () => {
    setPreview(null);
    setFileName(null);
  };

  return (
    <div className="w-full">
      {!preview ? (
        <div
          onDragOver={handleDragOver}
          onDragLeave={handleDragLeave}
          onDrop={handleDrop}
          className={`
            relative border-2 border-dashed rounded-2xl p-12 text-center transition-all duration-300 cursor-pointer
            ${isDragging 
              ? "border-primary bg-primary/5 shadow-glow" 
              : "border-border hover:border-primary/50 hover:bg-muted/50"
            }
          `}
        >
          <input
            type="file"
            accept="image/*"
            onChange={handleFileInput}
            className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
          />
          
          <div className="w-20 h-20 rounded-2xl gradient-hero flex items-center justify-center mx-auto mb-6 shadow-soft">
            <Upload className="w-10 h-10 text-primary-foreground" />
          </div>
          
          <h3 className="font-display text-xl font-semibold text-foreground mb-2">
            Upload CT Scan or X-Ray
          </h3>
          <p className="text-muted-foreground mb-4">
            Drag and drop your medical image here, or click to browse
          </p>
          <p className="text-sm text-muted-foreground">
            Supported formats: DICOM, PNG, JPG, JPEG
          </p>
        </div>
      ) : (
        <div className="relative rounded-2xl overflow-hidden bg-card border border-border shadow-card">
          <div className="aspect-[4/3] relative">
            <img
              src={preview}
              alt="Uploaded scan"
              className="w-full h-full object-contain bg-foreground/5"
            />
            <button
              onClick={clearPreview}
              className="absolute top-4 right-4 w-10 h-10 rounded-full bg-background/90 backdrop-blur-sm flex items-center justify-center hover:bg-destructive hover:text-destructive-foreground transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
          
          <div className="p-4 border-t border-border flex items-center gap-3">
            <div className="w-10 h-10 rounded-lg bg-secondary flex items-center justify-center">
              <FileImage className="w-5 h-5 text-secondary-foreground" />
            </div>
            <div className="flex-1 min-w-0">
              <p className="font-medium text-foreground truncate">{fileName}</p>
              <p className="text-sm text-muted-foreground">Ready for analysis</p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ImageUploader;
