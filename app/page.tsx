"use client";

import { useSelector, useDispatch } from "react-redux";
import { RootState, AppDispatch } from "@/redux/store";
import { increment, decrement, reset, setCount } from "../redux/counterSlice";
import { useState } from "react";

export default function Home() {
  const count = useSelector((state: RootState) => state.counter.value);
  const dispatch = useDispatch<AppDispatch>();
  const [inputValue, setInputValue] = useState("");

  return (
    <main className="flex flex-col items-center justify-center min-h-screen bg-gray-100 p-6">
      <div className="bg-white shadow-md p-8 rounded-lg text-center">
        <h1 className="text-3xl font-bold mb-4">Counter App</h1>
        <p className="text-xl font-semibold mb-4">Count: {count}</p>

        <div className="space-x-4 mb-4">
          <button
            onClick={() => dispatch(increment())}
            className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-700"
          >
            +
          </button>
          <button
            onClick={() => dispatch(decrement())}
            className="px-4 py-2 bg-red-500 text-white rounded-md hover:bg-red-700"
          >
            -
          </button>
          <button
            onClick={() => dispatch(reset())}
            className="px-4 py-2 bg-gray-500 text-white rounded-md hover:bg-gray-700"
          >
            Reset
          </button>
        </div>

        <div className="mt-4">
          <input
            type="number"
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            placeholder="Set Count"
            className="border p-2 rounded-md mr-2"
          />
          <button
            onClick={() => dispatch(setCount(Number(inputValue)))}
            className="px-4 py-2 bg-green-500 text-white rounded-md hover:bg-green-700"
          >
            Set Count
          </button>
        </div>
      </div>
    </main>
  );
}
