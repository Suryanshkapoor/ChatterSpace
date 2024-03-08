import React from "react";
import { Link } from "react-router-dom";
import placeholder from "../assets/profile-placeholder.svg"

const UserCard = ({ user }) => {
  return (
    <Link to={`/profile/${user.$id}`} className="flex justify-center items-center flex-col gap-4 border border-violet-950 rounded-[20px] px-5 py-8">
      <img
        src={user.imageUrl || placeholder}
        alt="creator"
        className="rounded-full w-14 h-14"
      />

      <div className="flex justify-center items-center flex-col gap-1">
        <p className="text-[16px] font-medium leading-[140%] text-white text-center line-clamp-1">
          {user.name}
        </p>
        <p className="text-[14px] font-normal leading-[140%] text-gray-300 text-center line-clamp-1">
          @{user.email}
        </p>
      </div>

      <button type="button" className="w-full text-white bg-violet-600 hover:bg-violet-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center ">
        Follow
      </button>
    </Link>
  );
};

export default UserCard;
