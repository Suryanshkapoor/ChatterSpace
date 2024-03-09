import React from "react";
import { useGetCurrentUser } from "../../react-query/queriesAndMutations";

import DisplaySavedPosts from "../../components/DisplaySavedPosts";

const Saved = () => {
  const { data: user } = useGetCurrentUser();

  const list = user?.save.map((item) => item.post.$id) || [];
  list.reverse()
  return (
    <div className="flex flex-col flex-1 items-center gap-10 overflow-x-hidden overflow-y-scroll py-10 px-5 md:px-8 lg:p-14 custom-scrollbar">
      <h2 className="w-full ml-10 my-10 text-[24px] font-bold leading-[140%] tracking-tighter">SavedPosts</h2>
      <ul
      className="w-full grid grid-cols-1 sm:grid-cols-2 md:grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-7 max-w-5xl mb-14"
    >
      {list.map((id) => (
        <DisplaySavedPosts key={id} id={id} />
      ))}
    </ul>
    </div>
    
  );
};

export default Saved;
