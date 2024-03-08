import Posts from "../../components/Posts";
import { useGetCurrentUser } from "../../react-query/queriesAndMutations";
import loader from "../../assets/loader.svg";

const LikedPosts = () => {
  const { data: currentUser } = useGetCurrentUser();

  if (!currentUser)
    return (
      <div className="flex-center w-full h-full">
        <img src={loader} width={40} height={40} alt="loading" />
      </div>
    );

  return (
    <>
      {currentUser.liked.length === 0 && (
        <p className="text-gray-400">No liked posts</p>
      )}
      <ul className="w-full mx-auto grid grid-cols-1 sm:grid-cols-2 md:grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-7 max-w-5xl mb-14">
        {currentUser.liked.map((post) => (
          <Posts post={post} showStats={true} showUser={true} />
        ))}
      </ul>
    </>
  );
};

export default LikedPosts;
