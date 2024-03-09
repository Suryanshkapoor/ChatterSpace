import React, { useState } from "react";

import search from "../../assets/search.svg";
import filter from "../../assets/filter.svg";
import loader from "../../assets/loader.svg";
import SearchResults from "../../components/SearchResults";

import {
  useGetPosts,
  useSearchPosts,
} from "../../react-query/queriesAndMutations";
import useDebounce from "../../hooks/useDebounce";
import Posts from "../../components/Posts";


const Explore = () => {
  const { data: posts, fetchNextPage, hasNextPage } = useGetPosts();
  const [searchValue, setSearchValue] = useState("");
  const debouncedValue = useDebounce(searchValue, 500);

  const { data: searchedPosts, isFetching: isFetching } = useSearchPosts(debouncedValue)
  

  if (!posts) {
    return (
      <div>
        <img src={loader} width={40} height={40} alt="loading" />
      </div>
    );
  }

  const shouldShowSearchResults = searchValue !== "";
  const shouldShowPosts =
    !shouldShowSearchResults &&
    posts.pages.every((item) => item.documents.length === 0);

  return (
    <div className="flex flex-col flex-1 items-center overflow-scroll py-10 px-5 md:p-14 custom-scrollbar">
      <div className="max-w-5xl flex flex-col items-center w-full gap-6 md:gap-9">
        <h2 className="w-full text-[24px] font-bold leading-[140%] tracking-tighter">
          Explore
        </h2>
        <div className="w-full flex px-4  gap-1 rounded-lg bg-zinc-950 border border-zinc-900">
          <img src={search} width={24} height={24} alt="search" />
          <input
            type="text"
            placeholder="search"
            className="h-12 w-full bg-zinc-950 border-none placeholder:text-gray-400 focus:outline-none"
            value={searchValue}
            onChange={(e) => setSearchValue(e.target.value)}
          />
        </div>
      </div>
      <div className="flex justify-between items-center w-full max-w-5xl mt-14 mb-8">
        <h3 className="w-full text-[16px] font-bold leading-[140%] tracking-tighter">
          Popular Today
        </h3>
        <div className="flex justify-center items-center gap-3 bg-zinc-950 rounded-xl px-4 py-2">
          <p className="text-[14px] font-medium leading-[140%] md:text-[16px]">
            All
          </p>
          <img src={filter} width={20} height={20} alt="filter" />
        </div>
      </div>
      <div className="flex flex-wrap gap-9 w-full max-w-5xl">
        {shouldShowSearchResults ? (
          <SearchResults 
          isFetching = { isFetching }
          searchedPosts = { searchedPosts } 
          />
        ) : shouldShowPosts ? (
          <p className="text-light-4 mt-10 text-center w-full">End of posts</p>
        ) : (
          posts.pages.map((item, index) => (
            <ul
              key={`page-${index}`}
              className="w-full grid grid-cols-1 sm:grid-cols-2 md:grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-7 max-w-5xl mb-14"
            >
              {item.documents.map((post) => (
                <Posts showUser={true} showStats={true} key={post.$id} post={post} />
              ))}
            </ul>
          ))
        )}
      </div>
    </div>
  );
};

export default Explore;
