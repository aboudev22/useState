import { useState } from "react";

export default function Count() {
  const [count, setCount] = useState(0);
  return (
    <div className="w-screen h-screen bg-neutral-900 flex flex-col gap-2 justify-center items-center">
      <section className="flex flex-col gap-2 justify-center items-center bg-violet-300 p-5">
        <div className="bg-white text-neutral-900 font-bold text-2xl p-4 rounded-2xl">
          {count}
        </div>
        <div className="flex gap-2">
          <button
            onClick={() => setCount(count + 1)}
            className="bg-white font-bold text-neutral-900 p-4 rounded-2xl transition-all duration-200 active:bg-neutral-200 cursor-pointer"
          >
            Incremente
          </button>
          <button
            onClick={() => (count > 0 ? setCount(count - 1) : null)}
            className="bg-white font-bold text-neutral-900 p-4 rounded-2xl transition-all duration-200 active:bg-neutral-200 cursor-pointer"
          >
            Decremente
          </button>
        </div>
      </section>
    </div>
  );
}
