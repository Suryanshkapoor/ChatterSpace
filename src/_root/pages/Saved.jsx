import React from "react";
import { useGetCurrentUser } from "../../react-query/queriesAndMutations";

import DisplaySavedPosts from "../../components/DisplaySavedPosts";

const Saved = () => {
  const { data: user } = useGetCurrentUser();

  const list = user?.save.map((item) => item.post.$id) || [];
  if (list && list.length !== 0) {
    console.log(list);
  }

  return (
    <div className="w-full ">
      <h2 className="w-full ml-10 my-10 text-[24px] font-bold leading-[140%] tracking-tighter">SavedPosts</h2>
      <ul
      className="w-full mx-auto grid grid-cols-1 sm:grid-cols-2 md:grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-7 max-w-5xl mb-14"
    >
      {list.map((id) => (
        <DisplaySavedPosts id={id} />
      ))}
    </ul>
    </div>
    
  );
};

export default Saved;
