import React, { useEffect, useState } from "react";

import {
  useGetCurrentUser,
  useLikePost,
  useSavePost,
  useUnsavePost,
} from "../react-query/queriesAndMutations";

import save from "../assets/save.svg";
import saved from "../assets/saved.svg";
import like from "../assets/like.svg";
import liked from "../assets/liked.svg";
import loader from "../assets/loader.svg";
import placeholder from "../assets/profile-placeholder.svg";
import { Link } from "react-router-dom";

const Posts = ({ post, showUser, showStats }) => {
  const { mutate: savePost, isPending: isSaving } = useSavePost();
  const { mutate: unsavePost, isPending: isUnsaving } = useUnsavePost();
  const { mutate: likePost } = useLikePost();

  const { data: user } = useGetCurrentUser();

  const savedPostRecord = user?.save.find((item) => item.post.$id === post.$id);

  useEffect(() => {
    setIsSaved(savedPostRecord ? true : false);
  }, [user]);

  const likesList = post.likes?.map((user) => user?.$id);

  const [likes, setLikes] = useState(likesList);
  const [isSaved, setIsSaved] = useState(false);

  const handleLikePost = async () => {
    var likesArray = [...likes];

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

    savePost({ postId: post.$id, userId: user?.$id });
    setIsSaved(true);
  };

  const checkIsLiked = () => {
    return likes?.includes(user?.$id);
  };

  return (
    <li className="relative sm:w-[280px] sm:h-[280px] md:w-[450px] md:h-[450px] lg:w-[330px] xl:w-[300px] mx-auto">
      <Link to={`/posts/${post.$id}`}>
        <img
          src={post.imageUrl}
          alt="post"
          className="h-full w-full object-cover rounded-t-lg"
        />
      </Link>
      <div className="absolute bottom-0 p-5 flex justify-between items-center w-full bg-gradient-to-t from-zinc-950 to-transparent">
        {showUser && (
          <div className="flex items-center justify-start gap-2 flex-1">
            <img
              src={post.creator?.imageUrl || placeholder}
              alt="creator"
              className="w-8 h-8 rounded-full"
            />
            <p className="line-clamp-1 capitalize">{post.creator?.name}</p>
          </div>
        )}
        {showStats && (
          <div className="flex items-center gap-3 mt-2">
            <img
              onClick={(e) => handleLikePost(e)}
              src={checkIsLiked() ? liked : like}
              width={24}
              height={24}
              alt="saved"
              className="cursor-pointer"
            />

            {isSaving || isUnsaving ? (
              <img
                src={loader}
                width={24}
                height={24}
                alt="saved"
              />
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
        )}
      </div>
    </li>
  );
};

export default Posts;
