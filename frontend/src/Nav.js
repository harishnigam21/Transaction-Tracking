import { nav_item } from "./component_data/nav_item";
import { Link } from "react-router-dom";

export function Nav() {
  return (
    <nav className="w-screen bg-blue-800 flex flex-row overflow-scroll noscrollbar justify-center text-white gap-5 p-3">
      {nav_item().map((item) => {
        return (
          <Link to={item.path} key={`btn/${item.id}`}>
            <button
              className={`flex flex-row items-center justify-center bg-white text-black p-[0.5rem_1rem] rounded-2xl hover:p-2 transition-[all_1s_ease] animate-[fromLeft_1s_ease]`}
              type="button"
            >
              <item.icon className="m-1 text-blue-600" />
              <span className="font-bold items-center">{item.name}</span>
            </button>
          </Link>
        );
      })}
    </nav>
  );
}
