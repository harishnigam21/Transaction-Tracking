import { BsCashCoin } from "react-icons/bs";
import { TbCashBanknoteOff } from "react-icons/tb";
import { MdDashboard } from "react-icons/md";
import { FaHome } from "react-icons/fa";

export const nav_item = () => {
  const list = [
    {
      id: 1,
      name: "Home",
      icon: FaHome,
      path: "/",
    },
    {
      id: 2,
      name: "Dashboard",
      icon: MdDashboard,
      path: "/dashboard",
    },
    {
      id: 3,
      name: "Income",
      icon: BsCashCoin,
      path: "/income",
    },
    {
      id: 4,
      name: "Expense",
      icon: TbCashBanknoteOff,
      path: "/expense",
    },
  ];
  return list;
};
