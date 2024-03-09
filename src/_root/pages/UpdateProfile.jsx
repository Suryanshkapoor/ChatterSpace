import React from "react";
import edit from "../../assets/edit.svg"
import ProfileForm from "../../components/ProfileForm";

const UpdateProfile = () => {
  return (
    <div className="flex flex-1 md:overflow-y-scroll custom-scrollbar">
      <div className="flex flex-col flex-1 items-center gap-10 py-10  px-5 md:px-8 lg:p-14">
        <div className="flex items-center gap-2">
          <img src={edit} width={30} height={30} alt="Edit Profile" />
          <span className="text-[24px] font-bold leading-[140%] tracking-tighter md:text-[30px]">
            Edit Post
          </span>
        </div>
        <ProfileForm/>
      </div>
    </div>
  );
};

export default UpdateProfile;
