import { useState, useEffect } from "react";
import Accountcard from "./Accountcard";
import { AiOutlineHeart, AiOutlineRetweet } from "react-icons/ai";
import { HiOutlineChatBubbleOvalLeft } from "react-icons/hi2";
import { PiBookmarkSimple } from "react-icons/pi";
import { TbLineDashed } from "react-icons/tb";
import { Link } from "react-router-dom";
import { useParams } from "react-router-dom";
import Cookies from "js-cookie";
import axios from "axios";
import PropTypes from "prop-types";

const Commentcomponent = ({ category = "" }) => {
  const backendUrl = import.meta.env.VITE_APP_BACKEND_URL;
  const accessToken = Cookies.get("access_token");
  const [comment, setComment] = useState([]);
  const postId = useParams().postId;

  useEffect(() => {
    const headers = {
      "Content-Type": "application/json",
      Authorization: `Bearer ${accessToken}`,
      "X-CSRFToken": `${Cookies.get("csrftoken")}`,
    };
    const fetchComments = async () => {
      await axios
        .get(`${backendUrl}/api/v1/backend/posts/${postId}/comment`, {
          headers: headers,
          withCredentials: true,
        })
        .then((res) => {
          console.log(res.data);
          setComment(res.data.comments);
          Cookies.set("access_token", res.data.access_token);
          return res.data;
        })
        .catch((err) => console.log(err.message));
    };
    fetchComments();
  }, [category, accessToken, backendUrl, postId]);
  console.log(comment);
  return (
    <div className="py-3">
      {comment.map((comments, index) => (
        <div key={index} className="border-b border-gray-300 py-4">
          <Accountcard userId={comments.user}/>
          <p className="text-left text-sm px-3 my-3 ">
            {comments.comment_content}
          </p>
          <img
            className="w-[100%] px-3 "
            src={`${backendUrl}/api/v1/backend${comments.content_image}`}
            alt=""
          />
          <div className="flex flex-row justify-between px-3 mt-2 ">
            <div className="flex flex-row items-center  ">
              <AiOutlineHeart size={18} />
              <p className="text-xs ml-1 ">{comments.likers_count}</p>
            </div>
            <div className="flex flex-row items-center  ">
              <AiOutlineRetweet size={18} />
              <p className="text-xs ml-1 ">{comments.comment_count}</p>
            </div>
            <Link to={`/${comments.id}/comment`}>
              <div className="flex flex-row items-center  ">
                <HiOutlineChatBubbleOvalLeft size={18} />
                <p className="text-xs ml-1 ">{comments.subcomments_count}</p>
              </div>
            </Link>

            <div className="flex flex-row items-center  ">
              <PiBookmarkSimple size={18} />
              <p className="text-xs ml-1 ">{comments.savers_count}</p>
            </div>
            <div className="flex flex-row items-center  ">
              <TbLineDashed size={18} />
              {/* <p className='text-xs ml-1 '>2</p> */}
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

Commentcomponent.propTypes = {
  category: PropTypes.string,
};

export default Commentcomponent;
