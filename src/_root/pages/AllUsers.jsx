import React from "react";

import  UserCard  from "../../components/UserCard";
import { useGetUsers } from "../../react-query/queriesAndMutations";

import loader from '../../assets/loader.svg'

const AllUsers = () => {

  const { data: creators, isLoading } = useGetUsers();

  return (
    <div className="flex flex-col flex-1 items-center gap-10 overflow-y-scroll py-10 px-5 md:px-8 lg:p-14 custom-scrollbar">
      <div className="max-w-5xl flex flex-col items-start w-full gap-6 md:gap-9">
        <h2 className="text-[24px] font-bold leading-[140%] tracking-tighter md:text-[30px] text-left w-full">All Users</h2>
        {isLoading && !creators ? (
          <img src={loader} width={40} height={40} alt="loading" />
        ) : (
          <ul className="w-full grid grid-cols-1 xs:grid-cols-2 md:grid-cols-2 lg:grid-cols-2 xl:grid-cols-3 gap-7 max-w-5xl">
            {creators?.documents.map((creator) => (
              <li key={creator?.$id} className="flex-1 min-w-[200px] w-full  ">
                <UserCard user={creator} />
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
};

export default AllUsers;
