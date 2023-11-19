import Accountcard from "./Accountcard";
import { AiOutlineHeart, AiOutlineRetweet } from "react-icons/ai";
import { HiOutlineChatBubbleOvalLeft } from "react-icons/hi2";
import { PiBookmarkSimple } from "react-icons/pi";
import { TbLineDashed } from "react-icons/tb";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";

const CommentPost = ({ post }) => {
  return (
    <div className=" py-3">
      <Accountcard userId={post.user}/>

      <div className="border-b border-gray-300 py-4">
        <p className="text-left text-sm px-3 my-3 ">{post.content_text}</p>
        <img className="w-[100%] px-3 " src={`${post.content_image}`} alt="" />
        <div className="flex flex-row justify-between px-3 mt-2 ">
          <div className="flex flex-row items-center  ">
            <AiOutlineHeart size={18} />
            <p className="text-xs ml-1 ">{post.likers_count}</p>
          </div>
          <div className="flex flex-row items-center  ">
            <AiOutlineRetweet size={18} />
            <p className="text-xs ml-1 ">{post.comment_count}</p>
          </div>
          <Link to={`/${post.id}/comment`}>
            <div className="flex flex-row items-center  ">
              <HiOutlineChatBubbleOvalLeft size={18} />
              <p className="text-xs ml-1 ">{post.comments_count}</p>
            </div>
          </Link>

          <div className="flex flex-row items-center  ">
            <PiBookmarkSimple size={18} />
            <p className="text-xs ml-1 ">{post.savers_count}</p>
          </div>
          <div className="flex flex-row items-center  ">
            <TbLineDashed size={18} />
            {/* <p className='text-xs ml-1 '>2</p> */}
          </div>
        </div>
      </div>
    </div>
  );
};

CommentPost.propTypes = {
  post: PropTypes.object,
};

export default CommentPost;
