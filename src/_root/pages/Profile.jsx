import {
  Route,
  Routes,
  Link,
  Outlet,
  useParams,
  useLocation,
} from "react-router-dom";

import { useUserContext } from "../../context/AuthContext";
import { useGetUserById } from "../../react-query/queriesAndMutations";

import placeholder from "../../assets/profile-placeholder.svg";
import loader from "../../assets/loader.svg";
import like from "../../assets/like.svg";
import edit from "../../assets/edit.svg";
import postsIcon from "../../assets/posts.svg";

import Posts from "../../components/Posts";
import LikedPosts from "./LikedPosts";

const StatBlock = ({ value, label }) => (
  <div className="flex justify-center items-center gap-2">
    <p className="small-semibold lg:body-bold text-primary-500">{value}</p>
    <p className="small-medium lg:base-medium text-light-2">{label}</p>
  </div>
);

const Profile = () => {
  const { id } = useParams();
  const { user } = useUserContext();
  const { pathname } = useLocation();

  const { data: currentUser } = useGetUserById(id || "");

  if (!currentUser)
    return (
      <div className="flex justify-center items-center w-full h-full">
        <img src={loader} width={40} height={40} alt="loading" />
      </div>
    );

  return (
    <div className="flex flex-col items-center flex-1 gap-10 overflow-scroll py-10 px-5 md:p-14 custom-scrollbar">
      <div className="flex items-center md:mb-8 xl:items-start gap-8 flex-col xl:flex-row relative max-w-5xl w-full">
        <div className="flex xl:flex-row flex-col max-xl:items-center flex-1 gap-7">
          <img
            src={currentUser.imageUrl || placeholder}
            alt="profile"
            className="w-28 h-28 lg:h-36 lg:w-36 rounded-full"
          />
          <div className="flex flex-col flex-1 justify-between md:mt-2">
            <div className="flex flex-col w-full">
              <h1 className="text-center xl:text-left text-[24px] font-bold leading-[140%] tracking-tighter md:text-[36px] md:font-semibold w-full">
                {currentUser.name}
              </h1>
              <p className="text-[14px] font-normal leading-[140%] md:text-[18px] md:font-medium text-gray-500 text-center xl:text-left">
                {currentUser.email}
              </p>
            </div>

            <div className="flex gap-8 mt-10 items-center justify-center xl:justify-start flex-wrap z-20">
              <StatBlock value={currentUser.posts.length} label="Posts" />
              <StatBlock value={0} label="Followers" />
              <StatBlock value={0} label="Following" />
            </div>

            <p className="text-[14px] font-medium leading-[140%] md:text-[16px] text-center xl:text-left mt-7 max-w-screen-sm">
              {currentUser.bio}
            </p>
          </div>

          <div className="flex justify-center gap-4">
            <div className={`${user.id !== currentUser.$id && "hidden"}`}>
              <Link
                to={`/update-profile/${currentUser.$id}`}
                className={`h-12 px-5 text-gray-200 flex justify-center items-center gap-2 rounded-lg ${
                  user.id !== currentUser.$id && "hidden"
                }`}
              >
                <img src={edit} alt="edit" width={20} height={20} />
                <p className="flex whitespace-nowrap text-[14px] font-medium leading-[140%]">
                  Edit Profile
                </p>
              </Link>
            </div>
            <div className={`${user.id === id && "hidden"}`}>
              <button
                type="button"
                className="w-full text-white bg-violet-600 hover:bg-violet-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center "
              >
                Follow
              </button>
            </div>
          </div>
        </div>
      </div>

      {currentUser.$id === user.id && (
        <div className="flex max-w-5xl w-full">
          <Link
            to={`/profile/${id}`}
            className={`flex justify-center items-center gap-3 py-4 w-48 bg-zinc-950  transition flex-1 xl:flex-initial rounded-l-lg ${
              pathname === `/profile/${id}` && "!bg-violet-800"
            }`}
          >
            <img src={postsIcon} alt="posts" width={20} height={20} />
            Posts
          </Link>
          <Link
            to={`/profile/${id}/liked-posts`}
            className={`flex justify-center items-center gap-3 py-4 w-48 bg-zinc-950  transition flex-1 xl:flex-initial rounded-r-lg ${
              pathname === `/profile/${id}/liked-posts` && "!bg-violet-800"
            }`}
          >
            <img src={like} alt="like" width={20} height={20} />
            Liked Posts
          </Link>
        </div>
      )}

      <Routes>
        <Route
          index
          element={
            <ul className="w-full mx-auto grid grid-cols-1 sm:grid-cols-2 md:grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-7 max-w-5xl mb-14">
              {currentUser.posts.map((post) => (
                <Posts
                  key={post.$id}
                  post={post}
                  showUser={false}
                  showStats={true}
                />
              ))}
            </ul>
          }
        />
        {currentUser.$id === user.id &&
          (currentUser.liked.length !== 0 ? (
            
              <Route
                path="/liked-posts"
                element={
                  <ul className="w-full mx-auto grid grid-cols-1 sm:grid-cols-2 md:grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-7 max-w-5xl mb-14">
                    {currentUser.liked.map((post) => 
                    <LikedPosts key={post.$id} id={post.$id} />
                    )}
                  </ul>
                }
              />
            ) : (
            <p className="text-gray-400">No liked posts</p>
          ))}
      </Routes>
      <Outlet />
    </div>
  );
};

export default Profile;
