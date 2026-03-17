import { useState, useCallback } from "react";
import { Upload, X, FileImage, CloudUpload, Image } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

interface ImageUploaderProps {
  onImageSelect: (file: File | null) => void;
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
    onImageSelect(null);
  };

  return (
    <div className="w-full">
      <AnimatePresence mode="wait">
        {!preview ? (
          <motion.div
            key="uploader"
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.95 }}
            onDragOver={handleDragOver}
            onDragLeave={handleDragLeave}
            onDrop={handleDrop}
            className={`
              relative border-2 border-dashed rounded-3xl p-12 text-center transition-all duration-300 cursor-pointer overflow-hidden
              ${isDragging 
                ? "border-primary bg-primary/5 shadow-glow-strong scale-[1.02]" 
                : "border-border hover:border-primary/50 hover:bg-muted/30"
              }
            `}
          >
            {/* Animated background on drag */}
            <div className={`absolute inset-0 gradient-hero transition-opacity duration-300 ${isDragging ? 'opacity-10' : 'opacity-0'}`} />
            
            <input
              type="file"
              accept="image/*"
              onChange={handleFileInput}
              className="absolute inset-0 w-full h-full opacity-0 cursor-pointer z-20"
            />
            
            <motion.div
              animate={{ y: isDragging ? -10 : 0 }}
              className="relative z-10"
            >
              <div className="w-24 h-24 rounded-3xl gradient-hero flex items-center justify-center mx-auto mb-8 shadow-glow">
                <CloudUpload className="w-12 h-12 text-primary-foreground" />
              </div>
              
              <h3 className="font-display text-2xl font-bold text-foreground mb-3">
                Upload CT Scan or X-Ray
              </h3>
              <p className="text-muted-foreground mb-6 text-lg">
                Click to upload your medical image
              </p>
              
              <div className="flex items-center justify-center gap-6 text-sm text-muted-foreground">
                <span className="flex items-center gap-2">
                  <Image className="w-4 h-4" />
                  DICOM
                </span>
                <span className="flex items-center gap-2">
                  <Image className="w-4 h-4" />
                  PNG
                </span>
                <span className="flex items-center gap-2">
                  <Image className="w-4 h-4" />
                  JPG
                </span>
              </div>
            </motion.div>
          </motion.div>
        ) : (
          <motion.div
            key="preview"
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.95 }}
            className="relative rounded-3xl overflow-hidden bg-card border border-border shadow-card"
          >
            <div className="aspect-[4/3] relative bg-foreground/5">
              <img
                src={preview}
                alt="Uploaded scan"
                className="w-full h-full object-contain"
              />
              
              {/* Gradient overlay */}
              <div className="absolute inset-0 bg-gradient-to-t from-foreground/20 to-transparent opacity-30" />
              
              {/* Remove button */}
              <motion.button
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                onClick={clearPreview}
                className="absolute top-4 right-4 w-12 h-12 rounded-2xl glass-strong flex items-center justify-center hover:bg-destructive hover:text-destructive-foreground transition-colors shadow-lg"
              >
                <X className="w-5 h-5" />
              </motion.button>
            </div>
            
            <div className="p-6 border-t border-border flex items-center gap-4">
              <div className="w-14 h-14 rounded-2xl gradient-hero flex items-center justify-center shadow-soft">
                <FileImage className="w-7 h-7 text-primary-foreground" />
              </div>
              <div className="flex-1 min-w-0">
                <p className="font-display font-bold text-foreground truncate text-lg">{fileName}</p>
                <p className="text-muted-foreground flex items-center gap-2">
                  <span className="w-2 h-2 rounded-full bg-success animate-pulse" />
                  Ready for analysis
                </p>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default ImageUploader;
