import { BsPerson, BsFillHouseFill, BsBookmark, BsRobot, BsPeople } from "react-icons/bs";
import { Link, NavLink } from "react-router-dom";
import Cookies from "js-cookie";


const Menu = () => {
  const userId = Cookies.get("user_id")
  return (
    <div className="flex flex-col px-6">
      {/* Menu */}
      <div className="list-none text-base md:text-xl font-semibold flex flex-col gap-0 md:gap-2 pt-10 mb-10 w-min ">
        <NavLink
          to={"/"}
          className={({ isActive }) =>
            isActive
              ? "flex items-center rounded-full p-2  hover:bg-graydark "
              : "flex items-center rounded-full p-2  hover:bg-graydark "
          }
        >
          <BsFillHouseFill className="mr-1" color="rgb(0 128 128 / 1)" />
          Home
        </NavLink>
        <NavLink
          to={"/community"}
          className={({ isActive }) =>
            isActive
              ? "flex items-center rounded-full p-2  hover:bg-graydark "
              : "flex items-center rounded-full p-2  hover:bg-graydark "
          }
        >
          <BsPeople className="mr-1" />
          Community
        </NavLink>
        <NavLink
          to={`/${userId}/waverx`}
          className={({ isActive }) =>
            isActive
              ? "flex items-center rounded-full p-2  hover:bg-graydark "
              : "flex items-center rounded-full p-2  hover:bg-graydark "
          }
        >
          <BsRobot className="mr-1" />
          Waver X
        </NavLink>
        <NavLink
          to={"/profile"}
          className={({ isActive }) =>
            isActive
              ? "flex items-center rounded-full p-2  hover:bg-graydark "
              : "flex items-center rounded-full p-2  hover:bg-graydark "
          }
        >
          <BsPerson className="mr-1" />
          Profile
        </NavLink>
        <NavLink
          className={({ isActive }) =>
            isActive
              ? "flex items-center rounded-full p-2  hover:bg-graydark "
              : "flex items-center rounded-full p-2  hover:bg-graydark "
          }
        >
          <BsBookmark className="mr-1" />
          Bookmark
        </NavLink>
      </div>
      {/* Post btn */}
      <Link
        to={"./createpost"}
        className="text-xl text-center font-semibold bg-green text-white p-4 rounded-full"
      >
        Post
      </Link>
    </div>
  );
};

export default Menu;
