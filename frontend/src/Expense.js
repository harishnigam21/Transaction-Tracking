import { useEffect, useRef, useState } from "react";
import { IoMdAdd } from "react-icons/io";
import { TbArrowCurveRight } from "react-icons/tb";
import { ImCross } from "react-icons/im";
import fetchData from "./api/fetch";
import pop from "./api/pop";
import Loader from "./Loarder";

import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";
export function Expense() {
  const [expense, setExpense] = useState([]);
  const [to, setTo] = useState("");
  const [amount, setAmount] = useState();
  const [add, setAdd] = useState(false);
  const [show, setShow] = useState(false);
  const [newAdded, setNewAdded] = useState(0);
  const btnRef = useRef(null);
  const paraRef = useRef(null);
  useEffect(() => {
    const getExpense = async () => {
      const response = await fetchData("expense", "GET", null, null);
      const data = await response.json();
      if (response.ok) {
        setExpense(data.expense);
        setTimeout(() => {
          setShow(true);
        }, 1000);
        console.log(data.message);
        pop(data.message, "green");
      } else {
        pop(data.message, "red");
        console.log(data.message);
      }
    };
    getExpense();
  }, [newAdded]);
  const createExpense = async (e) => {
    e.preventDefault();
    btnRef.current.style.color = "yellow";
    btnRef.current.textContent = "Submitting...";
    btnRef.current.disabled = true;
    const response = await fetchData("expense", "POST", null, { to, amount });
    const data = await response.json();
    if (response.ok) {
      setNewAdded((pre) => pre + 1);
      btnRef.current.style.color = "green";
      btnRef.current.textContent = "Submitted";
      paraRef.current.style.display = "block";
      paraRef.current.style.color = "green";
      paraRef.current.textContent = data.message;
      pop(data.message, "green");
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
      pop(data.message, "red");
    }
  };
  const removeExpense = async (e, id) => {
    const element = document.getElementById(`inc/${id}`);
    element.style.animation = "spin 0.1s linear infinite ";
    e.preventDefault();
    const response = await fetchData("expense", "DELETE", id, null);
    const responseData = await response.json();
    if (response.ok) {
      pop(responseData.message, "green");
      console.log(responseData.message);
      setNewAdded((pre) => pre + 1);
      element.style.display = "none";
    } else {
      pop(responseData.message, "red");
      element.style.animation = "none";
    }
  };
  return show ? (
    <div className="relative flex flex-col gap-5 p-4 justify-center items-center animate-[fromBottom_1s_ease]">
      {/* expense graph */}
      <section className="flex h-[500px] w-full md:w-[75%] rounded-2xl flex-col gap-4 shadow-[0.1rem_0.1rem_0.8rem_black] p-2">
        <div className="flex flex-row flex-wrap justify-center sm:justify-between items-center gap-3">
          <h2
            className="text-center font-extrabold text-2xl"
            style={{ textAlign: "center" }}
          >
            Expense Overview
          </h2>
          <button
            className="flex flex-row px-3 py-2 items-center bg-gray-500/30 rounded-2xl text-blue-600 font-bold hover:p-1 hover:shadow-[0.1rem_0.1rem_0.5rem_blue_inset] transition-all"
            onClick={() => setAdd(true)}
          >
            <IoMdAdd className="icon m-2" />
            Add Expense
          </button>
        </div>
        <ResponsiveContainer>
          <LineChart
            data={expense}
            margin={{
              top: 20,
              right: 30,
              left: 20,
              bottom: 5,
            }}
          >
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="to" />
            <YAxis dataKey="amount" /> <Tooltip />
            <Legend />
            <Line
              type="monotone" // For smooth curve
              dataKey="amount"
              stroke="#8884d8"
              activeDot={{ r: 8 }}
            />
          </LineChart>
        </ResponsiveContainer>
      </section>
      {/* list expense */}
      <section className="flex flex-col box-border gap-4 w-full md:w-[75%]">
        <h1 className="text-center text-2xl font-extrabold">Expense Soures</h1>
        <div className="flex flex-row flex-wrap text-center justify-center">
          {expense.length > 0 ? (
            [...expense].reverse().map((exp) => {
              return (
                // each item in list
                <section
                  key={`section/${exp.id}`}
                  className="relative flex flex-row grow flex-wrap justify-between items-center p-2 m-2 shadow-[0.1rem_0.1rem_0.5rem_black_inset] rounded-2xl animate-[fromDown_1s_ease] hover:p-1 transition-all"
                >
                  {/* info of expense */}
                  <div className="flex flex-col p-2 justify-center items-center">
                    <strong>{exp.to}</strong>
                    <p>{exp.added_at}</p>
                  </div>
                  {/* amount debited */}
                  <div>
                    <button className="flex font-extrabold text-red-500 bg-red-500/50 px-2 rounded-xl py-1 justify-center items-center transition-[all_1.5s_ease] hover:p-0">
                      -₹{exp.amount}
                      <TbArrowCurveRight className="m-2 font-extrabold rotate-90" />
                    </button>
                  </div>
                  <ImCross
                    title="remove"
                    id={`inc/${exp.id}`}
                    className="text-red-600 absolute right-2 top-2 z-1 icon"
                    onClick={(e) => removeExpense(e, exp.id)}
                  />
                </section>
              );
            })
          ) : (
            <h1 className="text-red-600 text-center text-2xl">
              Currently, there are no expense's !
            </h1>
          )}
        </div>
      </section>
      {/* add expense div will popup */}
      {add ? (
        <section
          id="popup"
          className="absolute flex top-0 w-full h-screen bg-black/90 justify-center items-center animate-[visibleIn_1s_ease]"
        >
          <div className="flex flex-col flex-wrap justify-center items-center gap-4 w-[80%] md:w-[35%] rounded-2xl shadow-[0.1rem_0.1rem_0.8rem_black] bg-black py-5 text-white">
            <h1 className="text-2xl text-center font-extrabold">
              Add New Expense
            </h1>
            <div className="flex flex-row flex-wrap items-center justify-center gap-5">
              <label htmlFor="source">Spent at</label>
              <input
                id="source"
                name="source"
                className="grow w-50 border-black border-2 p-1 rounded-2xl text-black text-center"
                onChange={(e) => setTo(e.target.value)}
                autoFocus
                required
              />
            </div>
            <div className="flex flex-row flex-wrap items-center justify-center gap-5">
              <label htmlFor="salary">Amount</label>
              <input
                type="number"
                id="salary"
                min={1}
                name="salary"
                className="grow w-50 border-black border-2 p-1 rounded-2xl text-black text-center"
                onChange={(e) => setAmount(e.target.value)}
                required
              />
            </div>
            <button
              ref={btnRef}
              className="px-3 py-2 bg-gray-500 text-black rounded-2xl hover:px-2 hover:py-1 transition-all"
              onClick={(e) => createExpense(e)}
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
  ) : (
    <div className="absolute text-center text-2xl text-black font-extrabold font-serif top-0 flex justify-center items-center w-full h-full bg-transparent p-0 m-0">
      Fetching Expense data <Loader />
    </div>
  );
}
