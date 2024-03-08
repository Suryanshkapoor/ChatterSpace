import React, { useEffect, useState } from "react";

import FileUploader from "./FileUploader";

import loader from '../assets/loader.svg'

import { useCreatePost, useUpdatePost } from "../react-query/queriesAndMutations";
import { useUserContext } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";

const PostForm = ({ post }) => {
  const [mediaUrl, setMediaUrl] = useState(!!post?post.imageUrl:'');
  const [file, setFile] = useState([]);

  const navigate = useNavigate();

  useEffect(() => {
    setMediaUrl(!!post?post.imageUrl:'')
  }, [post])
  

  const { mutateAsync: createPost, isPending:isLoading } = useCreatePost();
  const { mutateAsync: updatePost, isPending } = useUpdatePost();
  const { user } = useUserContext();


  async function handleSubmit(e) {
    e.preventDefault();
    const data = new FormData(e.target);

    const values = Object.fromEntries(data.entries());

    if(!post){
      const newPost = await createPost({
        caption: values.caption,
        tags: values.tags,
        location: values.location,
        file: file,
        userId: user.id,
      });
  
      if (newPost) {
        document.getElementById("caption").value = "";
        document.getElementById("tags").value = "";
        document.getElementById("location").value = "";
        setMediaUrl("");
        navigate(`/posts/${newPost?.$id}`);
      }
    }else{
      const updatedPost = await updatePost({
        postId:post.$id,
        caption: values.caption,
        tags: values.tags,
        location: values.location,
        file: file,
        imageId:post.imageId,
        imageUrl:post.imageUrl
      });

      if (updatedPost) {
        document.getElementById("caption").value = "";
        document.getElementById("tags").value = "";
        document.getElementById("location").value = "";
        setMediaUrl("");
        navigate(`/posts/${post.$id}`);
      }
    }
  }

  return (
    <form
      onSubmit={(e) => handleSubmit(e)}
      className="flex flex-col gap-12 w-full pb-24"
    >
      <div>
        <label
          htmlFor="caption"
          className="block mb-2 text-sm font-medium text-white"
        >
          Caption
        </label>
        <textarea
          id="caption"
          name="caption"
          rows="4"
          defaultValue = {post?.caption}
          className="block p-2.5 w-full text-sm rounded-lg border focus:ring-blue-500 focus:border-blue-500 bg-gray-700 border-gray-600 text-white custom-scrollbar"
          placeholder=""
        ></textarea>
      </div>
      <div>
        <label className="block mb-2 text-sm font-medium text-white">
          Add Photos
        </label>
        <FileUploader
          mediaUrl={mediaUrl}
          setFile={setFile}
          setMediaUrl={setMediaUrl}
        />
      </div>
      <div>
        <label
          htmlFor="location"
          className="block mb-2 text-sm font-medium text-white"
        >
          Add Location
        </label>
        <input
          type="text"
          id="location"
          name="location"
          rows="4"
          defaultValue={post?.location}
          className="block p-2.5 w-full text-sm rounded-lg border focus:ring-blue-500 focus:border-blue-500 bg-gray-700 border-gray-600  text-white custom-scrollbar"
          placeholder=""
        ></input>
      </div>
      <div>
        <label
          htmlFor="tags"
          className="block mb-2 text-sm font-medium text-white"
        >
          Add Tags ( seperated by " , " )
        </label>
        <input
          type="text"
          id="tags"
          name="tags"
          rows="4"
          defaultValue={post?.tags}
          className="block p-2.5 w-full text-sm rounded-lg border focus:ring-blue-500 focus:border-blue-500 bg-gray-700 border-gray-600 text-white custom-scrollbar"
          placeholder=""
        ></input>
      </div>
      <div className="flex justify-end gap-4">
        <button
          type="button"
          className="py-2 px-5 mb-2 text-sm font-medium rounded-lg border bg-gray-800 text-gray-400 border-gray-600 hover:text-white hover:bg-gray-700"
        >
          Cancel
        </button>

        <button
          type="submit"
          className="flex gap-2 bg-violet-600 hover:bg-violet-500 font-semibold rounded-lg text-md px-10 py-2 mb-2"
          disabled={isLoading||isPending}
        >
          {(isLoading||isPending)&&<img src={loader} width={20} height={20} alt="anything"/>}{post?'Update':'Post'}
        </button>
      </div>
    </form>
  );
};

export default PostForm;
