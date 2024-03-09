import Posts from "../../components/Posts";
import { useGetPostbyId } from "../../react-query/queriesAndMutations";
import loader from "../../assets/loader.svg";

const LikedPosts = ({ id }) => {
  const { data: post } = useGetPostbyId(id);

  if (!post)
    return (
      <div className="flex-center w-full h-full">
        <img src={loader} width={40} height={40} alt="loading" />
      </div>
    );
  return <Posts key={post.$id} post={post} showStats={true} showUser={true} />;
};

export default LikedPosts;
