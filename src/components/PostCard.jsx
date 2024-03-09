import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";

import save from "../assets/save.svg";
import edit from "../assets/edit.svg";
import saved from "../assets/saved.svg";
import like from "../assets/like.svg";
import liked from "../assets/liked.svg";
import loader from "../assets/loader.svg";
import placeholder from "../assets/profile-placeholder.svg";

import {
  useGetCurrentUser,
  useLikePost,
  useSavePost,
  useUnsavePost,
} from "../react-query/queriesAndMutations";

const PostCard = ({ post, userId }) => {
  const { mutate: savePost ,isPending: isSaving} = useSavePost();
  const { mutate: unsavePost, isPending: isUnsaving } = useUnsavePost();
  const { mutate: likePost } = useLikePost();

  const { data: user } = useGetCurrentUser();

  const savedPostRecord = user?.save.find((item) => item.post.$id === post.$id);

  const navigate = useNavigate();

  useEffect(() => {
    setIsSaved(savedPostRecord ? true : false);
  }, [user]);

  const likesList = post.likes.map((user) => user.$id);

  const [likes, setLikes] = useState(likesList);
  const [isSaved, setIsSaved] = useState(false);

  const handleLikePost = async () => {
    var likesArray = [...likes];

    if (likesArray.includes(userId)) {
      likesArray = likesArray.filter((obj) => obj !== userId);
    } else {
      likesArray.push(userId);
    }

    likePost({ postId: post.$id, likesArray: likesArray });
    setLikes(likesArray);
  };

  const handleSavePost = () => {
    if (savedPostRecord) {
      setIsSaved(false);
      unsavePost(savedPostRecord.$id);

      return;
    }

    savePost({ postId: post.$id, userId: userId });
    setIsSaved(true);
  };

  const checkIsLiked = () => {
    return likes.includes(userId);
  };

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
    <div className="bg-zinc-950 rounded-3xl border border-violet-950 p-3 lg:p-4 w-full max-w-[450px]">
      <div className="flex flex-1 justify-between items-center">
        <div className="flex w-full flex-col gap-3">
          <div className="flex justify-between">
            <Link to={`/profile/${post.creator.$id}`}>
              <div className="flex gap-2">
                <img
                  src={post.creator.imageUrl}
                  alt=""
                  className="rounded-full w-10 h-10"
                />
                <div className="flex flex-col justify-center">
                  <h5 className="flex text-lg font-bold tracking-tight text-violet-500 capitalize">
                    {post.creator.name}
                  </h5>
                  <p className="text-xs text-gray-400">
                    {formatRelativeDate(post.$createdAt)}{" "}
                    {post.location && `- ${post.location}`}
                  </p>
                </div>
              </div>
            </Link>
            <Link
              className={
                post.creator.$id !== userId
                  ? "hidden"
                  : "pr-2 flex items-center text-violet-500 text-sm gap-1"
              }
              to={`/update-post/${post.$id}`}
            >
              <img src={edit} width={22} alt="edit" /> Edit
            </Link>
          </div>
          <img
            className="rounded-t-lg cursor-pointer"
            src={post.imageUrl || placeholder}
            alt=""
            onClick={() => {
              navigate(`/posts/${post.$id}`);
            }}
          />
          <div className="w-full p-5">
            <div className="flex justify-between items-center">
              <div className="flex w-full justify-between">
                <div className="flex items-center  gap-2">
                  <img
                    onClick={(e) => handleLikePost(e)}
                    src={checkIsLiked() ? liked : like}
                    width={24}
                    height={24}
                    alt="saved"
                    className="cursor-pointer"
                  />
                  <span className="text-sm text-gray-300">
                    {" "}
                    {likes.length} likes
                  </span>
                </div>
                <div>
                {isSaving || isUnsaving ?(
                    <img
                    src={loader}
                    width={24}
                    height={24}
                    alt="saved"/>
                ):(
                  <img
                    onClick={handleSavePost}
                    src={isSaved ? saved : save}
                    width={24}
                    height={24}
                    alt="saved"
                    className="cursor-pointer"
                  />
                )}
                  
                </div>
              </div>
            </div>
            <p className="my-3 font-normal text-gray-400 capitalize">
              {post.caption && `${post.creator.name} - ${post.caption}`}
            </p>
            <div>
              {post.tags &&
                post.tags.map((tag) => (
                  <span
                    key={tag}
                    className="text-gray-400 hover:underline cursor-default"
                  >
                    #{tag}{" "}
                  </span>
                ))}
            </div>
          </div>
          <div className="flex w-full justify-end text-gray-400 text-md font-medium"></div>
        </div>
      </div>
    </div>
  );
};

export default PostCard;
