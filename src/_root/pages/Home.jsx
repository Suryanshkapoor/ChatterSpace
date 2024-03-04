import React from "react";
import loader from "../../assets/loader.svg";
import { useGetRecentPosts } from "../../react-query/queriesAndMutations";
import PostCard from "../../components/PostCard";
import { useUserContext } from "../../context/AuthContext";

const Home = () => {
  const{ data : posts, isPending: isLoading
    , isError:error 
  } = useGetRecentPosts();

  const{ user } =useUserContext();
  
  return (
    <div className="flex flex-1">
      <div className="flex flex-col flex-1 items-center gap-10 overflow-scroll py-10 px-5 md:px-8 lg:p-14 custom-scrollbar">
        <div className="max-w-screen-sm flex flex-col items-center w-full gap-6 md:gap-9">
          <h2 className="text-[24px] font-bold leading-[140%] tracking-tighter md:text-[30px] text-left w-full">
            Home Feed
          </h2>
          {isLoading && !posts ? (
            <div className="w-full flex justify-center items-center">
              <img
                src={loader}
                alt="loader"
                width={35}
                height={35}
                className="animate-spin"
              />
            </div>
          ) : (
            <ul className="flex flex-col items-center flex-1 gap-9 w-full md:items-start">
              {posts?.documents.map((post)=>(
                
                <PostCard key={post.$id} post = {post} userId={user.id}/>
              ))}
            </ul>
          )}
        </div>
      </div>
    </div>
  );
};

export default Home;
