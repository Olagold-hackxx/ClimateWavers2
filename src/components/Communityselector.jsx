import { NavLink } from "react-router-dom";

const Communityselector = () => {
  return (
    <div className="flex flex-col gap-2 bg-graylight list-none py-4 m-4 rounded-2xl ">
      <NavLink
        className={({ isActive }) =>
          isActive
            ? "hover:bg-graydark p-2 bg-neutral-300 "
            : "hover:bg-graydark p-2"
        }
        to={"/"}
      >
        Home
      </NavLink>

      <NavLink
        className={({ isActive }) =>
          isActive
            ? "hover:bg-graydark p-2 bg-neutral-300 "
            : "hover:bg-graydark p-2"
        }
        to={"/community"}
      >
        Community
      </NavLink>
      <NavLink
        className={({ isActive }) =>
          isActive
            ? "hover:bg-graydark p-2 bg-neutral-300 "
            : "hover:bg-graydark p-2"
        }
        to={"/education"}
      >
        Education
      </NavLink>
      <NavLink
        className={({ isActive }) =>
          isActive
            ? "hover:bg-graydark p-2 bg-neutral-300 "
            : "hover:bg-graydark p-2"
        }
        to={"/happeningnow"}
      >
        Happening now
      </NavLink>
      <NavLink
        className={({ isActive }) =>
          isActive
            ? "hover:bg-graydark p-2 bg-neutral-300 "
            : "hover:bg-graydark p-2"
        }
        to={"/waverx-tweet"}
      >
        WaverX
      </NavLink>
    </div>
  );
};

export default Communityselector;
