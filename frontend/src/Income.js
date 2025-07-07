import { useEffect, useRef, useState } from "react";
import { IoMdAdd } from "react-icons/io";
import { TbArrowCurveRight } from "react-icons/tb";
import { ImCross } from "react-icons/im";
import fetchData from "./api/fetch";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";
export function Income() {
  const [income, setIncome] = useState([]);
  const [source, setSource] = useState("");
  const [salary, setSalary] = useState();
  const [add, setAdd] = useState(false);
  const [newAdded, setNewAdded] = useState(0);
  const btnRef = useRef(null);
  const paraRef = useRef(null);
  useEffect(() => {
    const getIncome = async () => {
      const response = await fetchData("income", "GET", null, null);
      const data = await response.json();
      if (response.ok) {
        setIncome(data.income);
        console.log(data.message);
      } else {
        console.log(data.message);
      }
    };
    getIncome();
  }, [newAdded]);
  const createIncome = async (e) => {
    e.preventDefault();
    btnRef.current.style.color = "yellow";
    btnRef.current.textContent = "Submitting...";
    btnRef.current.disabled = true;
    const response = await fetchData("income", "POST", null, {
      source,
      salary,
    });
    const data = await response.json();
    if (response.ok) {
      setNewAdded((pre) => pre + 1);
      btnRef.current.style.color = "green";
      btnRef.current.textContent = "Submitted";
      paraRef.current.style.display = "block";
      paraRef.current.style.color = "green";
      paraRef.current.textContent = data.message;
      setTimeout(() => {
        btnRef.current.disabled = false;
        btnRef.current.style.color = "white";
        btnRef.current.textContent = "Add another";
        paraRef.current.style.display = "none";
      }, 3000);
    } else {
      btnRef.current.style.color = "red";
      btnRef.current.textContent = "Not Submitted";
      paraRef.current.style.display = "block";
      paraRef.current.style.color = "red";
      paraRef.current.textContent = data.message;
    }
  };
  return (
    <div className="relative flex flex-col gap-5 p-4 justify-center items-center animate-[fromUp_1s_ease]">
      {/* income graph */}
      <section className="flex h-[500px] w-full md:w-[75%] rounded-2xl flex-col gap-4 shadow-[0.1rem_0.1rem_0.8rem_black] p-2">
        <div className="flex flex-row flex-wrap justify-center sm:justify-between items-center gap-3">
          <h2
            className="text-center font-extrabold text-2xl"
            style={{ textAlign: "center" }}
          >
            Income Overview
          </h2>
          <button
            className="flex flex-row px-3 py-2 items-center bg-gray-500/30 rounded-2xl text-blue-600 font-bold hover:p-1 hover:shadow-[0.1rem_0.1rem_0.5rem_blue_inset] transition-all"
            onClick={() => setAdd(true)}
          >
            <IoMdAdd className="icon m-2" />
            Add Income
          </button>
        </div>
        <ResponsiveContainer>
          <BarChart
            data={income}
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
            <XAxis dataKey="source" />

            {/* Y-axis, typically for numerical values */}
            <YAxis />

            {/* Tooltip on hover to show data points */}
            <Tooltip />

            {/* Legend to identify different bars/series */}
            <Legend />

            {/* First set of bars (value) */}
            <Bar dataKey="salary" fill="green" radius={[5, 5, 0, 0]} />

            {/* Optional: Second set of bars (uv), for grouped bar charts */}
            <Bar dataKey="id" fill="blue" />
          </BarChart>
        </ResponsiveContainer>
      </section>
      {/* list income */}
      <section className="flex flex-col box-border gap-4 w-full md:w-[75%]">
        <h1 className="text-center text-2xl font-extrabold">Income Soures</h1>
        <div className="flex flex-row flex-wrap">
          {income.length > 0 ? (
            [...income].reverse().map((inc) => {
              return (
                // each item in list
                <section
                  key={`section/${inc.id}`}
                  className="flex flex-row grow flex-wrap justify-between items-center p-2 m-2 shadow-[0.1rem_0.1rem_0.5rem_black_inset] rounded-2xl animate-[fromDown_1s_ease] hover:p-1 transition-all"
                >
                  {/* info of income */}
                  <div className="flex flex-col p-2 justify-center items-center">
                    <strong>{inc.source}</strong>
                    <p>{inc.added_at}</p>
                  </div>
                  {/* amount credited */}
                  <div>
                    <button className="flex font-extrabold text-green-500 bg-green-500/50 px-2 rounded-xl py-1 justify-center items-center transition-[all_1.5s_ease] hover:p-0">
                      +₹{inc.salary}
                      <TbArrowCurveRight className="m-2 font-extrabold" />
                    </button>
                  </div>
                </section>
              );
            })
          ) : (
            <h1 className="text-red-600 text-center text-2xl">
              Currently, there are no income's !
            </h1>
          )}
        </div>
      </section>
      {/* add income div will popup */}
      {add ? (
        <section
          id="popup"
          className="absolute flex top-0 w-full h-screen bg-black/90 justify-center items-center animate-[visibleIn_1s_ease]"
        >
          <div className="flex flex-col flex-wrap justify-center items-center gap-4 w-[80%] md:w-[35%] rounded-2xl shadow-[0.1rem_0.1rem_0.8rem_black] bg-black py-5 text-white">
            <h1 className="text-2xl text-center font-extrabold">
              Add New Income Source
            </h1>
            <div className="flex flex-row flex-wrap items-center justify-center gap-5">
              <label htmlFor="source">Source</label>
              <input
                id="source"
                name="source"
                className="grow w-50 border-black border-2 p-1 rounded-2xl text-black text-center"
                onChange={(e) => setSource(e.target.value)}
                autoFocus
                required
              />
            </div>
            <div className="flex flex-row flex-wrap items-center justify-center gap-5">
              <label htmlFor="salary">Salary</label>
              <input
                type="number"
                id="salary"
                min={1}
                name="salary"
                className="grow w-50 border-black border-2 p-1 rounded-2xl text-black text-center"
                onChange={(e) => setSalary(e.target.value)}
                required
              />
            </div>
            <button
              ref={btnRef}
              className="px-3 py-2 bg-gray-500 text-black rounded-2xl hover:px-2 hover:py-1 transition-all"
              onClick={(e) => createIncome(e)}
            >
              Submit
            </button>
            <p className="hidden" ref={paraRef}>
              .
            </p>
          </div>
          <ImCross
            className="icon absolute text-red-600 top-5 right-5 text-2xl"
            onClick={() => {
              document.getElementById("popup").style.animation =
                "visibleOut 1s ease";
              setTimeout(() => {
                setAdd(false);
              }, 900);
            }}
          />
        </section>
      ) : (
        <></>
      )}
    </div>
  );
}
