import Commentcomponent from "../components/CommentComponent";
import CommentPost from "../components/CommentPost";
import { useLocation } from "react-router-dom";

const Comment = () => {
  const { state } = useLocation();
  const category = state.category


  return (
    <div className="text-2xl text-center pt-1 md:pt-5 ">
      <h2 className="pb-1 md:pb-3 text-lg md:text-xl font-semibold ">
        {category.charAt(0).toUpperCase() + category.slice(1)}
      </h2>
      <CommentPost post={state.postData} />
      <Commentcomponent category={state.category} />
    </div>
  );
};

export default Comment;
