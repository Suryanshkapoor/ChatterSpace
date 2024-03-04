import React, { useCallback } from "react";
import { useDropzone } from "react-dropzone";
import uploadfile from "../assets/file-upload.svg";

const FileUploader = ({  setFile, mediaUrl, setMediaUrl}) => {
  

  const onDrop = useCallback((acceptedFiles) => {
    setFile(acceptedFiles)
    setMediaUrl(URL.createObjectURL(acceptedFiles[0]))
  },[setFile]);
  const { getRootProps, getInputProps } = useDropzone({
    onDrop,
    accept: { "image/*": [".png", ".jpg", ".jpeg", ".svg"] },
  });

  return (
    <div
      {...getRootProps()}
      className="flex justify-center items-center flex-col rounded-xl cursor-pointer bg-gray-700 border-gray-600 text-white"
    >
      <input {...getInputProps()} />
      {!!mediaUrl ? (
        <>
        <div className="flex flex-1 justify-center w-full p-5 lg:p-10">
          <img src={mediaUrl} alt="uploadimage" className="file_uploader-img" />
        </div>
        <p className="flex justify-center text-gray-200 text-md font-normal">Click or drag photo to replace</p>
      </>
		
			 
      ) : (
        <div className="flex flex-col items-center">
          <img src={uploadfile} alt="Upload" width={120} height={120} />
          <h3 className="text-xl mb-1 font-semibold">Drag Photo Here.</h3>
          <p className="text-gray-400 text-xs mb-6 font-normal">
            SVG, JPEG, JPG, PNG
          </p>
          <button
            type="button"
            className="py-2 px-5 mb-2 text-sm font-medium rounded-lg border bg-gray-800 text-gray-400 border-gray-600 hover:bg-gray-700"
          >
            Select from Device
          </button>
        </div>
      )}
    </div>
  );
};

export default FileUploader;
