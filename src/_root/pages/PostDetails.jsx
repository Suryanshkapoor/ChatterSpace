import React, { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";

import loader from "../../assets/loader.svg";
import save from "../../assets/save.svg";
import edit from "../../assets/edit.svg";
import saved from "../../assets/saved.svg";
import like from "../../assets/like.svg";
import liked from "../../assets/liked.svg";
import remove from "../../assets/delete.svg";
import {
  useDeletePost,
  useGetCurrentUser,
  useGetPostbyId,
  useLikePost,
  useSavePost,
  useUnsavePost,
} from "../../react-query/queriesAndMutations";

const PostDetails = () => {
  const { id } = useParams();

  const navigate = useNavigate();

  const { data: post, isPending: isLoading } = useGetPostbyId(id);

  const { mutate: deletePost } = useDeletePost();
  const { mutate: savePost, isPending: isSaving } = useSavePost();
  const { mutate: unsavePost, isPending: isUnsaving } = useUnsavePost();
  const { mutate: likePost, isPending } = useLikePost();

  const { data: user } = useGetCurrentUser();

  const savedPostRecord = user?.save.find(
    (item) => item.post?.$id === post?.$id
  );

  useEffect(() => {
    setIsSaved(savedPostRecord ? true : false);
  }, [user, savedPostRecord]);

  const likesList = post?.likes.map((user) => user.$id);

  const [likes, setLikes] = useState(likesList);
  const [isSaved, setIsSaved] = useState(false);

  const handleLikePost = async () => {
    var likesArray = [...likesList];

    if (likesArray.includes(user.$id)) {
      likesArray = likesArray.filter((obj) => obj !== user.$id);
    } else {
      likesArray.push(user.$id);
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

    savePost({ postId: post.$id, userId: user.$id });
    setIsSaved(true);
  };

  const checkIsLiked = () => {
    return likes?.includes(user.$id);
  };

  const handleDeletePost = () => {
    deletePost({ id: id, fileId: post.imageId });
    navigate("/");
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
    <div className="flex flex-col flex-1 gap-10 overflow-scroll py-10 px-5 md:p-14 custom-scrollbar items-center">
      {isLoading ? (
        <img src={loader} alt="Loading" />
      ) : (
        <div className="bg-zinc-950 w-full max-w-5xl p-3 rounded-[30px] flex-col flex lg:flex-row border border-violet-600 xl:rounded-l-[24px];">
          <img
            src={post?.imageUrl}
            alt="post"
            className=" mx-auto w-11/12 md:max-w-[625px] rounded-t-[30px] lg:rounded-l-[24px] lg:rounded-tr-none lg:w-3/5 object-cover p-5 bg-dark-1"
          />
          <div className="flex flex-col xl:justify-between gap-5 lg:gap-7 flex-1 items-start py-4 rounded-[30px] px-8">
            <div className="flex flex-col w-full">
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
                <div className="flex">
                  <Link
                    className={
                      post?.creator.$id !== user?.$id
                        ? "hidden"
                        : "pr-2 w-full h-full flex justify-center items-center text-violet-500 text-sm gap-1"
                    }
                    to={`/update-post/${post?.$id}`}
                  >
                    <img src={edit} width={22} alt="edit" />
                  </Link>
                  <img
                    src={remove}
                    width={22}
                    alt="edit"
                    className={
                      post?.creator.$id !== user?.$id
                        ? "hidden"
                        : "cursor-pointer"
                    }
                    onClick={() => handleDeletePost()}
                  />
                </div>
              </div>
              <div className="flex flex-col w-full border-t border-gray-900 mt-5 py-10">
                <div className="flex">
                  <p className="flex-1 text-md font-medium text-white">
                    {post?.caption}
                  </p>
                  <p className="text-xs text-gray-300">{post?.location}</p>
                </div>
                <div className="flex w-full">
                  {post?.tags.map((item) => {
                    return (
                      <div key={item} className="text-md mt-8 text-gray-400 ">
                        <span className="hover:underline cursor-default">
                          #{item}
                        </span>
                        &nbsp;
                      </div>
                    );
                  })}
                </div>
              </div>
            </div>
            <div className="flex w-full justify-between">
              <div className="flex items-center gap-2">
                {isPending ? (
                  <img src={loader} width={24} height={24} alt="liked" />
                ) : (
                  <img
                    onClick={(e) => handleLikePost(e)}
                    src={checkIsLiked() ? liked : like}
                    width={24}
                    height={24}
                    alt="liked"
                    className="cursor-pointer"
                  />
                )}
                <span className="text-sm text-gray-300">
                  {" "}
                  {likes?.length} likes
                </span>
              </div>
              <div>
                {isSaving || isUnsaving ? (
                  <img src={loader} width={24} height={24} alt="saved" />
                ) : (
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
        </div>
      )}
    </div>
  );
};

export default PostDetails;
