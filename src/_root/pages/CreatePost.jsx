import React from "react";
import addpost from "../../assets/add-post.svg";
import PostForm from "../../components/PostForm";

const CreatePost = () => {
  return (
    <div className="flex flex-1 md:overflow-y-scroll custom-scrollbar">
      <div className="flex flex-col flex-1 items-center gap-10 py-10  px-5 md:px-8 lg:p-14">
        <div className="flex items-center gap-2">
          <img src={addpost} width={30} height={30} alt="Add Post" />
          <span className="text-[24px] font-bold leading-[140%] tracking-tighter md:text-[30px]">
            Create Post
          </span>
        </div>
        <PostForm/>
      </div>
    </div>
  );
};

export default CreatePost;
