import React from 'react';
import { Upload, X } from 'lucide-react';

interface ImageUploadProps {
  currentImage: string;
  onImageChange: (image: string) => void;
  className?: string;
}

const ImageUpload: React.FC<ImageUploadProps> = ({ 
  currentImage, 
  onImageChange, 
  className = '' 
}) => {
  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      // In a real app, you would upload to a service like Cloudinary or AWS S3
      // For now, we'll use a placeholder URL
      const placeholderUrl = `https://images.pexels.com/photos/1170986/pexels-photo-1170986.jpeg?auto=compress&cs=tinysrgb&w=800&h=400&fit=crop`;
      onImageChange(placeholderUrl);
    }
  };

  const removeImage = () => {
    onImageChange('');
  };

  return (
    <div className={`relative border-2 border-dashed border-gray-300 rounded-lg overflow-hidden ${className}`}>
      {currentImage ? (
        <div className="relative w-full h-full">
          <img
            src={currentImage}
            alt="Uploaded"
            className="w-full h-full object-cover"
          />
          <button
            onClick={removeImage}
            className="absolute top-2 right-2 p-1 bg-red-500 text-white rounded-full hover:bg-red-600 transition-colors"
          >
            <X className="w-4 h-4" />
          </button>
        </div>
      ) : (
        <label className="flex flex-col items-center justify-center w-full h-full cursor-pointer hover:bg-gray-50 transition-colors">
          <div className="flex flex-col items-center justify-center pt-5 pb-6">
            <Upload className="w-8 h-8 mb-4 text-gray-400" />
            <p className="mb-2 text-sm text-gray-500">
              <span className="font-semibold">Click to upload</span> or drag and drop
            </p>
            <p className="text-xs text-gray-500">PNG, JPG or GIF (MAX. 5MB)</p>
          </div>
          <input
            type="file"
            className="hidden"
            accept="image/*"
            onChange={handleImageUpload}
          />
        </label>
      )}
    </div>
  );
};

export default ImageUpload;