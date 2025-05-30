
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@radix-ui/react-label';
import { UploadCloudIcon, XIcon } from 'lucide-react';
import React, { useEffect, useRef } from 'react';
import axios from 'axios';
import { Skeleton } from '../ui/skeleton';

// eslint-disable-next-line no-unused-vars
const ProductImageUpload = ({imageFile,setImageFile,uploadedImageUrl,setUploadedImageUrl,imageLoadingState , setImageLoadingState , isEditMode
}) => {
    
    const inputRef = useRef(null)

    function handleImageFileChange(event) {
        event.preventDefault();
        // console.log(event.target.files, "event.target.files");
        const selectedFile = event.target.files?.[0];
        if(selectedFile)
            setImageFile(selectedFile);
    }

    function handleDragOver(event) {
        event.preventDefault();
    }
    
    function handleDrop(event) {
        event.preventDefault();
        // console.log(event.dataTransfer.files, "event.dataTransfer.files");
        const droppedFile = event.dataTransfer.files?.[0];
        if(droppedFile)
            setImageFile(droppedFile);
    }
    function handleRemoveImage() {
        setImageFile(null);
        if(inputRef.current) {
            inputRef.current.value = "";
        }
    }
    
    async function uploadImageToCloudinary() {
        setImageLoadingState(true);
        const data = new FormData();
        data.append("my_file", imageFile);
        const response = await axios.post(
          `${import.meta.env.VITE_API_URL}/api/admin/products/upload-image`,
          data
        );
        // console.log(response, "i am cloudinary response");
    
        if (response?.data?.success) {
          setUploadedImageUrl(response.data.result.url);
          setImageLoadingState(false);
        }
      }

    useEffect(() => {
        if (imageFile !== null) uploadImageToCloudinary();
      // eslint-disable-next-line react-hooks/exhaustive-deps
      }, [imageFile]);


  return (
    <div>
      <Label className="text-lg font-semibold mb-2 block">Upload Image</Label>
      <div className={`${
          isEditMode ? "opacity-60" : ""
        } border-2 border-dashed rounded-lg p-4`} onDragOver={handleDragOver} onDrop={handleDrop}>
        <Input
          id="image-upload"
          type="file"
          className="hidden"
          ref={inputRef}
          onChange={handleImageFileChange}
          disabled={isEditMode}
        />
        {!imageFile ? (
          <Label
            htmlFor="image-upload"
            // It is used to link a <label> to a specific input element using the input’s id
            //when the label is clicked, it will automatically trigger a click on the input, which opens the file picker.
            className={`flex flex-col items-center justify-center h-32 cursor-pointer`}
          >
            <UploadCloudIcon className="w-10 h-10 text-muted-foreground mb-2" />
            <span>Drag & drop or click to upload image</span>
          </Label>
        ) : (
        imageLoadingState? <Skeleton className="h-10 bg-gray-200"/> :
        <div className="flex items-center justify-between">
            <div className="flex items-center">
                <UploadCloudIcon className="w-8 text-primary mr-2 h-8" />
            </div>
            <p className="text-sm font-medium">{imageFile.name}</p>
            <Button
              variant="ghost"
              //This ghost variant is used to create a button that has no background or border, making it blend in with the background.
              size="icon"
              className="text-muted-foreground hover:text-foreground"
              onClick={handleRemoveImage}
            >
              <XIcon className="w-4 h-4" />
              <span className="sr-only">Remove File</span>
            </Button>
            </div>)}
      </div>

    </div>
  )
}

export default ProductImageUpload































// import { FileIcon, UploadCloudIcon, XIcon } from "lucide-react";
// import { Input } from "../ui/input";
// import { Label } from "../ui/label";
// import { useEffect, useRef } from "react";
// import { Button } from "../ui/button";
// import axios from "axios";
// import { Skeleton } from "../ui/skeleton";

// function ProductImageUpload({
//   imageFile,
//   setImageFile,
//   imageLoadingState,
//   uploadedImageUrl,
//   setUploadedImageUrl,
//   setImageLoadingState,
//   isEditMode,
//   isCustomStyling = false,
// }) {
//   const inputRef = useRef(null);

//   console.log(isEditMode, "isEditMode");

//   function handleImageFileChange(event) {
//     console.log(event.target.files, "event.target.files");
//     const selectedFile = event.target.files?.[0];
//     console.log(selectedFile);

//     if (selectedFile) setImageFile(selectedFile);
//   }

//   function handleDragOver(event) {
//     event.preventDefault();
//   }

//   function handleDrop(event) {
//     event.preventDefault();
//     const droppedFile = event.dataTransfer.files?.[0];
//     if (droppedFile) setImageFile(droppedFile);
//   }

//   function handleRemoveImage() {
//     setImageFile(null);
//     if (inputRef.current) {
//       inputRef.current.value = "";
//     }
//   }

//   async function uploadImageToCloudinary() {
//     setImageLoadingState(true);
//     const data = new FormData();
//     data.append("my_file", imageFile);
//     const response = await axios.post(
//       "http://localhost:5000/api/admin/products/upload-image",
//       data
//     );
//     console.log(response, "response");

//     if (response?.data?.success) {
//       setUploadedImageUrl(response.data.result.url);
//       setImageLoadingState(false);
//     }
//   }

//   useEffect(() => {
//     if (imageFile !== null) uploadImageToCloudinary();
//   }, [imageFile]);

//   return (
//     <div
//       className={`w-full  mt-4 ${isCustomStyling ? "" : "max-w-md mx-auto"}`}
//     >
//       <Label className="text-lg font-semibold mb-2 block">Upload Image</Label>
//       <div
//         onDragOver={handleDragOver}
//         onDrop={handleDrop}
        // className={`${
        //   isEditMode ? "opacity-60" : ""
        // } border-2 border-dashed rounded-lg p-4`}
//       >
        // <Input
        //   id="image-upload"
        //   type="file"
        //   className="hidden"
        //   ref={inputRef}
        //   onChange={handleImageFileChange}
        //   disabled={isEditMode}
        // />
        // {!imageFile ? (
        //   <Label
        //     htmlFor="image-upload"
        //     className={`${
        //       isEditMode ? "cursor-not-allowed" : ""
        //     } flex flex-col items-center justify-center h-32 cursor-pointer`}
        //   >
        //     <UploadCloudIcon className="w-10 h-10 text-muted-foreground mb-2" />
        //     <span>Drag & drop or click to upload image</span>
        //   </Label>
        // ) : imageLoadingState ? (
//           <Skeleton className="h-10 bg-gray-100" />
//         ) : (
//           <div className="flex items-center justify-between">
//             <div className="flex items-center">
//               <FileIcon className="w-8 text-primary mr-2 h-8" />
//             </div>
//             <p className="text-sm font-medium">{imageFile.name}</p>
//             <Button
//               variant="ghost"
//               size="icon"
//               className="text-muted-foreground hover:text-foreground"
//               onClick={handleRemoveImage}
//             >
//               <XIcon className="w-4 h-4" />
//               <span className="sr-only">Remove File</span>
//             </Button>
//           </div>
//         )}
//       </div>
//     </div>
//   );
// }

// export default ProductImageUpload;