import React from "react";
import { Link, useParams } from "react-router-dom";

import loader from "../../assets/loader.svg";
import edit from "../../assets/edit.svg";
import {
  useGetCurrentUser,
  useGetPostbyId,
} from "../../react-query/queriesAndMutations";

const PostDetails =()=> {
  const { id } = useParams();
  const { data: post, isPending:isLoading } = useGetPostbyId(id);
  const { data: user } = useGetCurrentUser();

  function formatRelativeDate(dateString) {
    const date = new Date(dateString);
    const now = new Date();
    const diffMs = now - date;
    const diffSeconds = Math.round(diffMs / 1000);
    const diffMinutes = Math.round(diffSeconds / 60);
    const diffHours = Math.round(diffMinutes / 60);
    const diffDays = Math.round(diffHours / 24);

    if (diffSeconds < 60) {
      return "just now";
    } else if (diffMinutes === 1) {
      return "1 min ago";
    } else if (diffMinutes < 60) {
      return `${diffMinutes} mins ago`;
    } else if (diffHours === 1) {
      return "1 hour ago";
    } else if (diffHours < 24) {
      return `${diffHours} hours ago`;
    } else if (diffDays === 1) {
      return "yesterday";
    } else if (diffDays < 7) {
      return `${diffDays} days ago`;
    } else {
      return date.toDateString();
    }
  }

  return (
    <div className="flex flex-col flex-1 gap-10 overflow-scroll py-10 px-5 md:p-14 custom-scrollbar items-center">
      {isLoading?(
        <img src={loader} alt="Loading" />
      ) : (
        <div className="bg-zinc-950 w-full max-w-5xl p-3 rounded-[30px] flex-col flex xl:flex-row border border-violet-600 xl:rounded-l-[24px];">
          <img
            src={post.imageUrl}
            alt="post"
            className=" mx-auto w-11/12 md:max-w-[625px] rounded-t-[30px] xl:rounded-l-[24px] xl:rounded-tr-none xl:w-2/3 object-cover p-5 bg-dark-1"
          />
          <div className="flex flex-col gap-5 lg:gap-7 flex-1 items-start py-4 rounded-[30px] px-8">
            <div className="flex w-full justify-between">
              <div>
                <Link to={`/profile/${post?.creator.$id}`}>
                  <div className="flex gap-2">
                    <img
                      src={post?.creator.imageUrl}
                      alt=""
                      className="rounded-full w-12 h-12"
                    />
                    <div className="flex flex-col justify-center">
                      <h5 className="flex text-lg font-bold tracking-tight text-violet-500 ">
                        {post?.creator.name}
                      </h5>
                      <p className="text-xs text-gray-400">
                        {formatRelativeDate(post?.$createdAt)}
                      </p>
                    </div>
                  </div>
                </Link>
              </div>
              <div>
                <Link
                  className={
                    post?.creator.$id !== user?.$id
                      ? "hidden"
                      : "pr-2 flex items-center xl:items-start xl:ml-8 text-violet-500 text-sm gap-1"
                  }
                  to={`/update-post/${post?.$id}`}
                >
                  <img src={edit} width={22} alt="edit" /> Edit
                </Link>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default PostDetails;
