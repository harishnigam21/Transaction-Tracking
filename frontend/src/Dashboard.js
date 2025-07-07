import { useEffect, useState } from "react";
import { MdAccountBalanceWallet } from "react-icons/md";
import { FaLongArrowAltRight } from "react-icons/fa";
import { TbArrowCurveRight } from "react-icons/tb";
import { TbCashBanknoteOff } from "react-icons/tb";
import { MdOutlinePayments } from "react-icons/md";
import { Link } from "react-router-dom";
import fetchData from "./api/fetch";
import {
  PieChart,
  Pie,
  Cell,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
} from "recharts";
export function Dashboard() {
  const [data, setData] = useState({
    totalIncome: 0,
    totalExpense: 0,
    totalBalance: 0,
    incomList: [],
    expenseList: [],
    transactionList: [],
  });
  const [graph_data, setGraph_data] = useState([]);
  const [viewall, setViewall] = useState(false);

  //data for graph
  useEffect(() => {
    setGraph_data([
      { name: "Total Balance", value: data.totalBalance },
      { name: "Total Income", value: data.totalIncome },
      { name: "Total Expense", value: data.totalExpense },
    ]);
  }, [data]);
  //color for graph
  const COLORS = [
    "violet",
    "indigo",
    "blue",
    "green",
    "orange",
    "yellow",
    "red",
  ];

  useEffect(() => {
    const getData = async () => {
      try {
        const response = await fetchData("dashboard", "GET", null, null);
        const apiResponse = await response.json();
        if (apiResponse.data) {
          setData(apiResponse.data);
        }
      } catch (error) {
        console.log(error);
      }
    };
    getData();
  }, []);

  return (
    <div className="flex flex-col p-4 gap-20 animate-[fromUp_1s_ease]">
      {/* remaining,income,expense cards */}
      <div className="flex flex-row flex-wrap gap-3">
        {/* remaining balance */}
        <div className="flex flex-row grow flex-wrap justify-center items-center p-4 rounded-2xl shadow-[0.1rem_0.1rem_0.5rem_black] text-center hover:p-2 transition-all">
          {/* icon */}
          <MdAccountBalanceWallet className="text-5xl rounded-full m-2 p-1 bg-[#ed82ed] text-white" />
          {/* main content */}
          <div className="flex flex-col justify-center items-center">
            <p>Total Balance</p>
            <h1 className="font-extrabold font-mono">₹{data.totalBalance}</h1>
          </div>
        </div>
        {/* total income */}
        <div className="flex flex-row grow flex-wrap justify-center items-center p-4 rounded-2xl shadow-[0.1rem_0.1rem_0.5rem_black] text-center hover:p-2 transition-all">
          {/* icon */}
          <MdOutlinePayments className="text-5xl rounded-full m-2 p-1 bg-[#4b0082] text-white" />
          {/* main content */}
          <div className="flex flex-col justify-center items-center">
            <p>Total Income</p>
            <h1 className="font-extrabold font-mono">₹{data.totalIncome}</h1>
          </div>
        </div>
        {/* total expense */}
        <div className="flex flex-row grow flex-wrap justify-center items-center p-4 rounded-2xl shadow-[0.1rem_0.1rem_0.5rem_black] text-center hover:p-2 transition-all">
          {/* icon */}
          <TbCashBanknoteOff className="text-5xl rounded-full m-2 p-1 bg-[#0000ff] text-white" />
          {/* main content */}
          <div className="flex flex-col justify-center items-center">
            <p>Total Expense</p>
            <h1 className="font-extrabold font-mono">₹{data.totalExpense}</h1>
          </div>
        </div>
      </div>
      {/*transaction list & graph*/}
      <div className="flex flex-col md:flex-row gap-4 items-center">
        {/* transaction list */}
        <div className="flex  h-[500px] grow w-full md:w-1/2 flex-col p-2 shadow-[0.1rem_0.1rem_0.5rem_black] rounded-2xl">
          {/* heading and view all button */}
          <header className="flex flex-row justify-between items-center">
            <strong className="text-2xl">Recent Transaction</strong>
            <button
              className="flex flex-row items-center bg-gray-500/50 p-2 rounded-2xl hover:p-1 transition-all"
              onClick={() => setViewall(!viewall)}
            >
              View all <FaLongArrowAltRight className="mx-2" />
            </button>
          </header>
          {/* main content - transaction list */}
          <article className="flex flex-col overflow-scroll noscrollbar">
            {data.transactionList.length > 0 ? (
              (viewall
                ? data.transactionList
                : data.transactionList.slice(0, 5)
              ).map((exp, index) => {
                return (
                  <section
                    key={`trans-${index}`} // Added a key here!
                    className="flex flex-row justify-between items-center p-2 m-2 shadow-[0.1rem_0.1rem_0.5rem_black_inset] rounded-2xl animate-[fromDown_1s_ease] hover:p-1 transition-all"
                  >
                    {/* info of expense */}
                    <div className="flex flex-col p-2">
                      <strong>{exp.source ? exp.source : exp.to}</strong>
                      <p>{exp.added_at}</p>
                    </div>
                    {/* amount spent */}
                    <div>
                      {exp.amount ? (
                        <button className="flex font-extrabold text-red-500 bg-red-500/50 px-2 rounded-xl py-1 justify-center items-center transition-[all_1.5s_ease] hover:p-0">
                          -₹{exp.amount}
                          <TbArrowCurveRight className="rotate-90 m-2 font-extrabold" />
                        </button>
                      ) : (
                        <button className="flex font-extrabold text-green-500 bg-green-500/50 px-2 rounded-xl py-1 justify-center items-center transition-[all_1.5s_ease] hover:p-0">
                          +₹{exp.salary}
                          <TbArrowCurveRight className="m-2 font-extrabold" />
                        </button>
                      )}
                    </div>
                  </section>
                );
              })
            ) : (
              <h1 className="text-center text-gray-500 mt-8">
                Currently nothing here
              </h1>
            )}
          </article>
        </div>
        {/* transaction graph */}
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

      {/*expenses list & graph*/}
      <div className="flex flex-col md:flex-row gap-4 items-center">
        {/* expense graph */}
        <div className="flex noscrollbar h-[500px] grow flex-col w-full md:w-1/2 p-2 text-center shadow-[0.1rem_0.1rem_0.5rem_black] rounded-2xl">
          <strong className="text-2xl">Expenses Overview</strong>
          <ResponsiveContainer>
            <BarChart
              data={data.expenseList}
              margin={{
                top: 20,
                right: 30,
                left: 20,
                bottom: 5,
              }}
            >
              {/* Grid lines for better readability */}
              <CartesianGrid strokeDasharray="3 3" />

              {/* X-axis, typically for categories */}
              <XAxis dataKey="to" />

              {/* Y-axis, typically for numerical values */}
              <YAxis />

              {/* Tooltip on hover to show data points */}
              <Tooltip />

              {/* Legend to identify different bars/series */}
              <Legend />

              {/* First set of bars (value) */}
              <Bar dataKey="amount" fill="green" radius={[5, 5, 0, 0]} />

              {/* Optional: Second set of bars (uv), for grouped bar charts */}
              <Bar dataKey="id" fill="blue" />
            </BarChart>
          </ResponsiveContainer>
        </div>
        {/* expenses list */}
        <div className="flex  h-[500px] grow w-full md:w-1/2 flex-col p-2 shadow-[0.1rem_0.1rem_0.5rem_black] rounded-2xl">
          {/* heading and view all button */}
          <header className="flex flex-row justify-between items-center">
            <strong className="text-2xl">Expense's</strong>
            <Link to="/expense">
              <button
                className="flex flex-row items-center bg-gray-500/50 p-2 rounded-2xl hover:p-1 transition-all"
                onClick={() => setViewall(!viewall)}
              >
                See all <FaLongArrowAltRight className="mx-2" />
              </button>
            </Link>
          </header>
          {/* main content - expense list */}
          <article className="flex flex-col overflow-scroll noscrollbar">
            {data.expenseList.length > 0 ? (
              data.expenseList.slice(0, 5).map((exp, index) => {
                return (
                  <section
                    key={`exp-${index}`} // Added a key here!
                    className="flex flex-row justify-between items-center p-2 m-2 shadow-[0.1rem_0.1rem_0.5rem_black_inset] rounded-2xl animate-[fromDown_1s_ease] hover:p-1 transition-all"
                  >
                    {/* info of expense */}
                    <div className="flex flex-col p-2">
                      <strong>{exp.to}</strong>
                      <p>{exp.added_at}</p>
                    </div>
                    {/* amount spent */}
                    <div>
                      <button className="flex font-extrabold text-red-500 bg-red-500/50 px-2 rounded-xl py-1 justify-center items-center transition-[all_1.5s_ease] hover:p-0">
                        -₹{exp.amount}
                        <TbArrowCurveRight className="rotate-90 m-2 font-extrabold" />
                      </button>
                    </div>
                  </section>
                );
              })
            ) : (
              <h1 className="text-center text-gray-500 mt-8">
                Currently nothing here
              </h1>
            )}
          </article>
        </div>
      </div>

      {/*income list & graph*/}
      <div className="flex flex-col md:flex-row gap-4 items-center">
        {/* income list */}
        <div className="flex  h-[500px] grow w-full md:w-1/2 flex-col p-2 shadow-[0.1rem_0.1rem_0.5rem_black] rounded-2xl">
          {/* heading and view all button */}
          <header className="flex flex-row justify-between items-center">
            <strong className="text-2xl">Income's</strong>
            <Link to="/income">
              <button className="flex flex-row items-center bg-gray-500/50 p-2 rounded-2xl hover:p-1 transition-all">
                See all <FaLongArrowAltRight className="mx-2" />
              </button>
            </Link>
          </header>
          {/* main content - income list */}
          <article className="flex flex-col overflow-scroll noscrollbar">
            {data.incomList.length > 0 ? (
              data.incomList.slice(0, 5).map((exp, index) => {
                return (
                  <section
                    key={`inc-${index}`} // Added a key here!
                    className="flex flex-row justify-between items-center p-2 m-2 shadow-[0.1rem_0.1rem_0.5rem_black_inset] rounded-2xl animate-[fromDown_1s_ease] hover:p-1 transition-all"
                  >
                    {/* info of expense */}
                    <div className="flex flex-col p-2">
                      <strong>{exp.source}</strong>
                      <p>{exp.added_at}</p>
                    </div>
                    {/* amount spent */}
                    <div>
                      <button className="flex font-extrabold text-green-500 bg-green-500/50 px-2 rounded-xl py-1 justify-center items-center transition-[all_1.5s_ease] hover:p-0">
                        +₹{exp.salary}
                        <TbArrowCurveRight className=" m-2 font-extrabold" />
                      </button>
                    </div>
                  </section>
                );
              })
            ) : (
              <h1 className="text-center text-gray-500 mt-8">
                Currently nothing here
              </h1>
            )}
          </article>
        </div>
        {/* income graph */}
        <div className="flex noscrollbar h-[500px] grow flex-col w-full md:w-1/2 p-2 text-center shadow-[0.1rem_0.1rem_0.5rem_black] rounded-2xl">
          <strong className="text-2xl">Income Overview</strong>
          <ResponsiveContainer>
            <PieChart>
              <Pie
                data={data.incomList}
                cx="50%" // Center x-coordinate
                cy="50%" // Center y-coordinate
                innerRadius={80} // Doughnut chart inner radius
                outerRadius={100} // Outer radius
                fill="#8884d8"
                dataKey="salary" // Which data key to use for slice size
                nameKey="source"
                label // Show labels on slices
              >
                {data.incomList.map((entry, index) => (
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
