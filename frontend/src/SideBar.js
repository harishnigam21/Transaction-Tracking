import { useRef, useState } from "react";
import { Link } from "react-router-dom";
import { nav_item } from "./component_data/nav_item";
import { ImCross } from "react-icons/im";
import { IoReorderThreeOutline } from "react-icons/io5";
export function SideBar() {
  const [showNav, setShowNav] = useState(false);
  const navRef = useRef(null);
  return showNav ? (
    <nav
      ref={navRef}
      className="relative bg-blue-800 h-screen w-fit flex flex-col noscrollbar justify-center items-center text-white gap-5 p-3 animate-[fromLeft_1s_ease]"
    >
      <ImCross
        className="icon absolute top-0 right-0 m-2 text-red-500"
        onClick={() => {
          if (navRef.current) {
            navRef.current.style.animation = "fromLeftReverse 1s ease";
            setTimeout(() => {
              setShowNav(false);
            }, 500);
          }
        }}
      />
      {nav_item().map((item) => {
        return (
          <Link to={item.path} className="">
            <button
              key={`btn/${item.id}`}
              className={`flex flex-row grow items-center justify-center bg-white text-black p-[0.5rem_1rem] rounded-2xl hover:p-2 transition-[all_1s_ease] animate-[fromLeft_1s_ease]`}
              type="button"
            >
              <item.icon className="icon m-1 text-blue-600" />
              <span className="font-bold items-center">{item.name}</span>
            </button>
          </Link>
        );
      })}
    </nav>
  ) : (
    <div className="bg-blue-800 w-screen p-2 animate-[fromTop_1s_ease]">
      <IoReorderThreeOutline
        className="icon text-3xl text-white"
        onClick={() => setShowNav(true)}
      />
    </div>
  );
}
