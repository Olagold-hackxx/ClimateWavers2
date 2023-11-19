import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Accountcard from "./Accountcard";
import { AiFillHeart, AiOutlineRetweet } from "react-icons/ai";
import { HiOutlineChatBubbleOvalLeft } from "react-icons/hi2";
import { PiBookmarkFill } from "react-icons/pi";
import { TbLineDashed } from "react-icons/tb";
import Cookies from "js-cookie";
import axios from "axios";
import { toast } from "react-toastify";
import PropTypes from "prop-types";

const Postcomponent = ({ category = "" }) => {
  const backendUrl = import.meta.env.VITE_APP_BACKEND_URL;
  const accessToken = Cookies.get("access_token");
  const [posts, setPosts] = useState([]);
  const navigate = useNavigate();
  const [isLike, setIsLike] = useState(false);
  const [isSave, setIsSave] = useState(false);

  useEffect(() => {
    const headers = {
      "Content-Type": "application/json",
      Authorization: `Bearer ${accessToken}`,
      "X-CSRFToken": `${Cookies.get("csrftoken")}`,
    };
    const fetchPosts = async () => {
      await axios
        .get(`${backendUrl}/api/v1/backend/${category}`, {
          headers: headers,
          withCredentials: true,
        })
        .then((res) => {
          let dataCategory;
          if (category) {
            dataCategory = `${category}_posts`;
          } else {
            dataCategory = "all_posts";
          }

          const posts = res.data[dataCategory].map((post) => ({
            ...post,
            isLike: false,
            isSave: false,
          }));
          setPosts(posts);
          Cookies.set("access_token", res.data.access_token);
          return res.data;
        })
        .catch((err) => console.log(err.message));
    };
    fetchPosts();
  }, [category, accessToken, backendUrl]);

  const handlePostClick = (selectedPost) => {
    // Navigate to the comment page and pass the post data
    navigate(`/${selectedPost.id}/comments`, {
      state: { postData: selectedPost, category },
    });
  };

  const headers = {
    "Content-Type": "application/json",
    Authorization: `Bearer ${accessToken}`,
    "X-CSRFToken": `${Cookies.get("csrftoken")}`,
  };
  const handleLike = (postId, index) => {
    if (!isLike) {
      likePost(postId, index);
    } else {
      unlikePost(postId, index);
    }
  };
  const handleSave = (postId, index) => {
    if (!isSave) {
      savePost(postId, index);
    } else {
      unsavePost(postId, index);
    }
  };

  const likePost = async (postId, index) => {
    const pendingToastId = toast.info("Liking a post...", {
      autoClose: 1000,
    });
    await axios
      .get(`${backendUrl}/api/v1/backend/posts/${postId}/like`, {
        headers: headers,
      })
      .then((res) => {
        Cookies.set("access_token", res.data.access_token);
        toast.dismiss(pendingToastId);
        toast.success("Liked a post", { autoClose: 1000 });
        setIsLike(!isLike);
        const updatedPost = posts;
        const post = updatedPost[index];
		post["isLike"] = true,
        post["likers_count"] = post.savers_count + 1,
		updatedPost[index] = post
        // Update the state
        setPosts(updatedPost);
        return res.data;
      })
      .catch((err) => {
        console.log(err.message);
        toast.error("Error liking a post", { autoClose: 1000 });
      });
  };

  const unlikePost = async (postId, index) => {
    const pendingToastId = toast.info("Unliking a post...", {
      autoClose: 1000,
    });
    await axios
      .get(`${backendUrl}/api/v1/backend/posts/${postId}/unlike`, {
        headers: headers,
        withCredentials: true,
      })
      .then((res) => {
        Cookies.set("access_token", res.data.access_token);
        toast.dismiss(pendingToastId);
        toast.success("Unliked a post", { autoClose: 1000 });
        setIsLike(!isLike);
        const updatedPost = posts;
        const post = updatedPost[index];
		post["isLike"] = false,
        post["likers_count"] = post.savers_count - 1,
		updatedPost[index] = post

        // Update the state
        setPosts(updatedPost);
        return res.data;
      })
      .catch((err) => {
        console.log(err.message);
        toast.error("Error unliking a post", { autoClose: 1000 });
      });
  };
  const savePost = async (postId, index) => {
    const pendingToastId = toast.info("Saving a post..", {
      autoClose: 1000,
    });
    await axios
      .get(`${backendUrl}/api/v1/backend/posts/${postId}/save`, {
        headers: headers,
        withCredentials: true,
      })
      .then((res) => {
        Cookies.set("access_token", res.data.access_token);
        toast.dismiss(pendingToastId);
        toast.success("Saved a post", { autoClose: 1000 });
        setIsSave(!isSave);
        const updatedPost = posts;
        const post = updatedPost[index];
		post["isSave"] = true,
        post["savers_count"] = post.savers_count + 1,
		updatedPost[index] = post


        // Update the state
        setPosts(updatedPost);
        return res.data;
      })
      .catch((err) => {
        console.log(err.message);
        toast.error("Error saving a post", { autoClose: 1000 });
      });
  };
  const unsavePost = async (postId, index) => {
    const pendingToastId = toast.info("Unsaving a post...", {
      autoClose: 1000,
    });
    await axios
      .get(`${backendUrl}/api/v1/backend/posts/${postId}/unsave`, {
        headers: headers,
        withCredentials: true,
      })
      .then((res) => {
        Cookies.set("access_token", res.data.access_token);
        toast.dismiss(pendingToastId);
        toast.success("Unsaved a post", { autoClose: 1000 });
        const updatedPost = posts;
        const post = updatedPost[index];
		post["isSave"] = false,
        post["savers_count"] = post?.savers_count - 1,
		updatedPost[index] = post

        // Update the state
        setPosts(updatedPost);

        return res.data;
      })
      .catch((err) => {
        console.log(err.message);
        toast.error("Error unsaving a post", { autoClose: 1000 });
      });
  };


  return (
    <div className=" py-3 border-b-2">
      {posts.map((post, index) => (
        <div key={index} className="border-b border-gray-300 py-4">
          <Accountcard userId={post.user} />
          <div onClick={() => handlePostClick(post)}>
            <p className="text-left text-sm px-3 my-3 ">{post.content_text}</p>
            <img
              className="w-[100%] px-3 "
              src={`${backendUrl}/api/v1/backend${post.content_image}`}
              alt=""
            />
          </div>
          <div className="flex flex-row justify-between px-3 mt-2 ">
            <div
              className="flex flex-row items-center "
              onClick={() => {
                handleLike(post.id, index);
              }}
            >
              <AiFillHeart size={18} color={post.isLike ? "#ff0000" : ""} />
              <p className="text-xs ml-1 ">{post.likers_count}</p>
            </div>
            <div className="flex flex-row items-center  ">
              <AiOutlineRetweet size={18} />
              <p className="text-xs ml-1 ">{post.comment_count}</p>
            </div>
            <div className="flex flex-row items-center  ">
              <HiOutlineChatBubbleOvalLeft size={18} />
              <p className="text-xs ml-1 ">{post.comments_count}</p>
            </div>
            <div
              className="flex flex-row items-center"
              onClick={() => {
                handleSave(post.id, index);
              }}
            >
              <PiBookmarkFill
                size={18}
                color={post.isSave ? "rgb(0 128 128 / 1)" : ""}
              />
              <p className="text-xs ml-1 ">{post.savers_count}</p>
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

Postcomponent.propTypes = {
  category: PropTypes.string,
};

export default Postcomponent;
