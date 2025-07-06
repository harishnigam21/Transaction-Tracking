import { useEffect, useState } from "react";
import { MdAccountBalanceWallet } from "react-icons/md";
import { FaLongArrowAltRight } from "react-icons/fa";
import { TbArrowCurveRight } from "react-icons/tb";
import { TbCashBanknoteOff } from "react-icons/tb";
import { MdOutlinePayments } from "react-icons/md";

import {
  PieChart,
  Pie,
  Cell,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";
export function Dashboard() {
  const [data, setData] = useState([
    {
      total_balance: 11950,
      total_income: 25000,
      total_expense: 13050,
      expense_list: [
        {
          id: 1,
          name: "Shopping",
          date: "05/07/2025",
          amount: 300,
        },
        {
          id: 2,
          name: "Travel",
          date: "01/07/2025",
          amount: 3300,
        },
        {
          id: 3,
          name: "Food",
          date: "05/07/2025",
          amount: 1200,
        },
        {
          id: 4,
          name: "cloth",
          date: "10/07/2025",
          amount: 500,
        },
        {
          id: 5,
          name: "wifi",
          date: "14/07/2025",
          amount: 500,
        },
        {
          id: 6,
          name: "daiy bevarages",
          date: "1/07/2025",
          amount: 1500,
        },
        {
          id: 7,
          name: "daily transport",
          date: "1/07/2025",
          amount: 750,
        },
        {
          id: 8,
          name: "monthly treatment",
          date: "1/07/2025",
          amount: 1500,
        },
        {
          id: 9,
          name: "groceries",
          date: "1/07/2025",
          amount: 2500,
        },
        {
          id: 10,
          name: "gym",
          date: "1/07/2025",
          amount: 1000,
        },
      ],
    },
  ]); //just sample before setup of db
  const [graph_data, setGraph_data] = useState([]);
  const [viewall, setViewall] = useState(false);

  //data for graph
  useEffect(() => {
    setGraph_data([
      { name: "Total Balance", value: data[0].total_balance },
      { name: "Total Income", value: data[0].total_income },
      { name: "Total Expense", value: data[0].total_expense },
    ]);
  }, [data]);
  //color for graph
  const COLORS = ["violet", "indigo", "blue"];

  return (
    <div className="flex flex-col p-4 gap-5 animate-[fromUp_1s_ease]">
      {/* remaining,income,expense cards */}
      <div className="flex flex-row flex-wrap gap-3">
        {/* remaining balance */}
        <div className="flex flex-row grow flex-wrap justify-center items-center p-4 rounded-2xl shadow-[0.1rem_0.1rem_0.5rem_black] text-center hover:p-2 transition-all">
          {/* icon */}
          <MdAccountBalanceWallet className="text-5xl rounded-full m-2 p-1 bg-[#ed82ed] text-white" />
          {/* main content */}
          <div className="flex flex-col justify-center items-center">
            <p>Total Balance</p>
            <h1 className="font-extrabold font-mono">
              ₹{data[0].total_balance}
            </h1>
          </div>
        </div>
        {/* total income */}
        <div className="flex flex-row grow flex-wrap justify-center items-center p-4 rounded-2xl shadow-[0.1rem_0.1rem_0.5rem_black] text-center hover:p-2 transition-all">
          {/* icon */}
          <MdOutlinePayments className="text-5xl rounded-full m-2 p-1 bg-[#4b0082] text-white" />
          {/* main content */}
          <div className="flex flex-col justify-center items-center">
            <p>Total Income</p>
            <h1 className="font-extrabold font-mono">
              ₹{data[0].total_income}
            </h1>
          </div>
        </div>
        {/* total expense */}
        <div className="flex flex-row grow flex-wrap justify-center items-center p-4 rounded-2xl shadow-[0.1rem_0.1rem_0.5rem_black] text-center hover:p-2 transition-all">
          {/* icon */}
          <TbCashBanknoteOff className="text-5xl rounded-full m-2 p-1 bg-[#0000ff] text-white" />
          {/* main content */}
          <div className="flex flex-col justify-center items-center">
            <p>Total Expense</p>
            <h1 className="font-extrabold font-mono">
              ₹{data[0].total_expense}
            </h1>
          </div>
        </div>
      </div>
      {/*expenses list & graph*/}
      <div className="flex flex-col md:flex-row gap-4 items-center">
        {/* expenses list */}
        <div className="flex  h-[500px] grow w-full md:w-1/2 flex-col p-2 shadow-[0.1rem_0.1rem_0.5rem_black] rounded-2xl">
          {/* heading and view all button */}
          <header className="flex flex-row justify-around items-center">
            <strong className="text-2xl">Recent Transaction</strong>
            <button
              className="flex flex-row items-center bg-gray-500/50 p-2 rounded-2xl hover:p-1 transition-all"
              onClick={() => setViewall(!viewall)}
            >
              View all <FaLongArrowAltRight className="mx-2" />
            </button>
          </header>
          {/* main content */}
          <article className="flex flex-col overflow-scroll noscrollbar">
            {viewall
              ? data[0].expense_list.map((exp) => {
                  return (
                    // each item in list
                    <section className="flex flex-row justify-between items-center p-2 m-2 shadow-[0.1rem_0.1rem_0.5rem_black_inset] rounded-2xl animate-[fromDown_1s_ease] hover:p-1 transition-all">
                      {/* info of expense */}
                      <div className="flex flex-col p-2">
                        <strong>{exp.name}</strong>
                        <p>{exp.date}</p>
                      </div>
                      {/* amount expent */}
                      <div>
                        <button className="flex font-extrabold text-red-500 bg-red-500/50 px-2 rounded-xl py-1 justify-center items-center transition-[all_1.5s_ease] hover:p-0">
                          -₹{exp.amount}
                          <TbArrowCurveRight className="rotate-90 m-2 font-extrabold" />
                        </button>
                      </div>
                    </section>
                  );
                })
              : data[0].expense_list.slice(0, 5).map((exp) => {
                  return (
                    // each item in list
                    <section className="flex flex-row justify-between items-center p-2 m-2 shadow-[0.1rem_0.1rem_0.5rem_black_inset] rounded-2xl animate-[fromDown_1s_ease] hover:p-1 transition-all">
                      {/* info of expense */}
                      <div className="flex flex-col p-2">
                        <strong>{exp.name}</strong>
                        <p>{exp.date}</p>
                      </div>
                      {/* amount expent */}
                      <div>
                        <button className="flex font-extrabold text-red-500 bg-red-500/50 px-2 rounded-xl py-1 justify-center items-center transition-[all_1.5s_ease] hover:p-0">
                          -₹{exp.amount}
                          <TbArrowCurveRight className="rotate-90 m-2 font-extrabold" />
                        </button>
                      </div>
                    </section>
                  );
                })}
          </article>
        </div>
        {/* expense graph */}
        <div className="flex noscrollbar h-[500px] grow flex-col w-full md:w-1/2 p-2 text-center shadow-[0.1rem_0.1rem_0.5rem_black] rounded-2xl">
          <strong className="text-2xl">Financial Overview</strong>
            <ResponsiveContainer>
              <PieChart>
                <Pie
                  data={graph_data}
                  cx="50%" // Center x-coordinate
                  cy="50%" // Center y-coordinate
                  innerRadius={80} // Doughnut chart inner radius
                  outerRadius={100} // Outer radius
                  fill="#8884d8"
                  dataKey="value" // Which data key to use for slice size
                  label // Show labels on slices
                >
                  {graph_data.map((entry, index) => (
                    <Cell
                      key={`cell-${index}`}
                      fill={COLORS[index % COLORS.length]}
                    />
                  ))}
                </Pie>
                <Tooltip /> {/* Shows details on hover */}
                <Legend /> {/* Displays legend for data */}
              </PieChart>
            </ResponsiveContainer>
        </div>
      </div>
    </div>
  );
}
