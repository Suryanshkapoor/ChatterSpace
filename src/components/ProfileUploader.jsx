import React, { useCallback } from "react";
import { useDropzone } from "react-dropzone";

const ProfileUploader = ({ setFile, mediaUrl, setMediaUrl }) => {
  const onDrop = useCallback(
    (acceptedFiles) => {
      setFile(acceptedFiles);
      setMediaUrl(URL.createObjectURL(acceptedFiles[0]));
    },
    [setFile, setMediaUrl]
  );

  const { getRootProps, getInputProps } = useDropzone({
    onDrop,
    accept: { "image/*": [".png", ".jpg", ".jpeg"] },
  });

  return (<>
	<img src={mediaUrl} alt="uploadimage" className="rounded-full w-40 h-40" />
    <div {...getRootProps()}>
      <div className="flex justify-center">
		<p className="flex justify-center text-gray-200 text-md font-normal hover:underline cursor-pointer">
        Click here to replace
      </p>
      </div>
      <input {...getInputProps()} />
      
    </div>
	</>
  );
};

export default ProfileUploader;
