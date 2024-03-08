import React from "react";

import loader from "../assets/loader.svg";
import Posts from "./Posts";

const SearchResults = ({ searchedPosts, isFetching }) => {
  if (isFetching)
    return <img src={loader} width={40} height={40} alt="loading" />;
  if (searchedPosts?.length > 0)return (
      <ul className="w-full grid grid-cols-1 sm:grid-cols-2 md:grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-7 max-w-5xl">
        {searchedPosts.map((post) => 
          <Posts showStats={true} showUser={true} key={post.$id} post={post} />
        )}
      </ul>
    );
  return <div>SearchResults</div>;
};

export default SearchResults;
