import React, { useEffect, useState } from "react";
import edit from "../../assets/edit.svg";
import loader from "../../assets/loader.svg";
import {
  useDeleteUser,
  useGetCurrentUser,
  useUpdateUser,
} from "../../react-query/queriesAndMutations";
import ProfileUploader from "../../components/ProfileUploader";
import { useNavigate } from "react-router-dom";

const UpdateProfile = () => {
  const { data: user } = useGetCurrentUser();
  const { mutateAsync: updateUser, isPending } = useUpdateUser();
  const { mutateAsync: deleteUser } = useDeleteUser();

  const [mediaUrl, setMediaUrl] = useState(user?.imageUrl);
  const [file, setFile] = useState([]);

  const navigate = useNavigate();

  useEffect(() => {
    setMediaUrl(user?.imageUrl)
  }, [user])

  async function handleSubmit(e) {
    e.preventDefault();

    const data = new FormData(e.target);

    const values = Object.fromEntries(data.entries());

    const newuser= await updateUser({
      userId: user?.$id,
      name: values.name,
      email: user.email,
      imageUrl: user?.imageUrl,
      bio: values.bio,
      file: file
    })
    if(newuser){
      navigate(`/profile/${newuser?.$id}`);
    }
  }

  const handleCancel = () => {
    navigate(`/profile/${user?.$id}`)
  };

  const handleDelete = async() => {
    const result = await deleteUser({
      id: user?.id
    })
    if(result){
      navigate('/sign-up')
    }
  }

  return (
    <div className="flex flex-1 md:overflow-y-scroll custom-scrollbar">
      <div className="flex flex-col flex-1 items-center gap-10 pt-5 pb-10 sm:px-5 md:px-8 lg:px-14 lg:py-5">
        <div className="flex flex-1 w-full justify-center items-center gap-2">
          <img src={edit} width={30} height={30} alt="Edit Profile" />
          <span className="text-[24px] font-bold leading-[140%] tracking-tighter md:text-[30px]">
            Edit Post
          </span>
        </div>
        <form
          onSubmit={(e) => handleSubmit(e)}
          className="mx-auto flex flex-col items-center gap-12 flex-1 w-full pb-24"
        >
          <div className="flex flex-col w-11/12 sm:flex-row gap-3 items-center">
            <ProfileUploader setFile={setFile} setMediaUrl={setMediaUrl} mediaUrl={mediaUrl}/>
          </div>
          <div className="flex flex-col w-11/12 sm:flex-row  gap-3 items-center">
            <label
              htmlFor="name"
              className="w-12 flex justify-center text-sm font-medium text-white"
            >
              Name
            </label>
            <input
              id="name"
              name="name"
              defaultValue={user?.name}
              className="block p-2.5 w-full text-sm rounded-lg border focus:ring-blue-500 focus:border-blue-500 bg-gray-700 border-gray-600 text-white custom-scrollbar"
              placeholder=""
            />
          </div>
          <div className="flex flex-col w-11/12 sm:flex-row  gap-3 items-center">
            <label
              htmlFor="email"
              className="flex justify-center w-12 text-sm font-medium text-white"
            >
              Email
            </label>
            <input
              id="email"
              name="email"
              aria-label="disabled input"
              defaultValue={user?.email}
              className="block p-2.5 w-full text-sm rounded-lg border focus:ring-blue-500 focus:border-blue-500 bg-gray-700 border-gray-600 text-white custom-scrollbar cursor-not-allowed"
              placeholder=""
              disabled
            />
          </div>
          <div className="flex flex-col w-11/12 sm:flex-row  gap-3 items-center">
            <label
              htmlFor="bio"
              className="w-12 flex justify-center text-sm font-medium text-white"
            >
              Bio
            </label>
            <textarea
              id="bio"
              name="bio"
              rows="4"
              defaultValue={user?.bio}
              className="block p-2.5 w-full text-sm rounded-lg border focus:ring-blue-500 focus:border-blue-500 bg-gray-700 border-gray-600 text-white custom-scrollbar"
              placeholder="Enter your bio"
            ></textarea>
          </div>
          <div className="flex flex-col-reverse w-11/12 sm:flex-row flex-1 gap-3 items-center justify-center sm:justify-between px-10">
            <div className="flex gap-3">
              <button
                type="button"
                className="py-2 px-5 mb-2 text-sm font-medium rounded-lg border bg-rose-500  border-gray-600 text-white hover:bg-rose-700"
                onClick={() => handleDelete()}
              >
                Delete
              </button>
            </div>
            <div className="flex gap-3">
              <button
                type="button"
                className="py-2 px-5 mb-2 text-sm font-medium rounded-lg border bg-zinc-950 text-gray-400 border-gray-600 hover:text-white hover:bg-gray-700"
                onClick={() => handleCancel()}
              >
                Cancel
              </button>

              <button
                type="submit"
                className="flex gap-2 bg-violet-600 hover:bg-violet-500 font-semibold rounded-lg text-md px-10 py-2 mb-2"
                disabled={isPending}
              >
                {isPending && (
                  <img src={loader} width={20} height={20} alt="anything" />
                )}{" "}
                Update
              </button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};

export default UpdateProfile;
