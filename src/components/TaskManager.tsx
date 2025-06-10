import { useEffect, useReducer, useState } from "react";
import { motion } from "framer-motion";

type TaskProps = {
  description: string;
  finished: boolean;
};

type Action =
  | { type: "add"; payload: string }
  | { type: "delete"; payload: number }
  | { type: "toggle"; payload: number }
  | { type: "initialize"; payload: TaskProps[] };

function taskReducer(state: TaskProps[], action: Action): TaskProps[] {
  switch (action.type) {
    case "add":
      if (!action.payload.trim()) return state;
      return [...state, { description: action.payload, finished: false }];
    case "delete":
      return state.filter((_, i) => i !== action.payload);
    case "toggle":
      return state.map((task, i) =>
        i === action.payload ? { ...task, finished: !task.finished } : task
      );
    case "initialize":
      return action.payload;
    default:
      return state;
  }
}

export default function TaskManager() {
  const [textTask, setTextTask] = useState("");

  const initialTasks = () => {
    const userTasks = localStorage.getItem("userTasks");
    return userTasks ? JSON.parse(userTasks) : [];
  };
  const [tasks, dispatch] = useReducer(taskReducer, initialTasks());

  // Sauvegarder dans le localStorage à chaque modification
  useEffect(() => {
    localStorage.setItem("userTasks", JSON.stringify(tasks));
  }, [tasks]);

  const handleAdd = () => {
    dispatch({ type: "add", payload: textTask });
    setTextTask("");
  };

  return (
    <motion.div className="w-screen h-screen flex flex-col items-center bg-neutral-800">
      <div className="flex justify-center items-center w-full h-1/6 bg-neutral-200">
        <h1 className="text-5xl bg-amber-100 p-5 mt-20 text-neutral-800 font-bold">
          Task Manager
        </h1>
      </div>

      <div className="w-full p-5 flex flex-col items-center mt-4 gap-2">
        <div className="w-sm xl:w-1/2 flex bg-fuchsia-200 outline-2 outline-amber-200 p-2">
          <input
            className="flex w-full p-4 gap-2 bg-fuchsia-200 focus:outline-none"
            type="text"
            name="task"
            value={textTask}
            placeholder="New task..."
            onChange={(e) => setTextTask(e.target.value)}
          />
          <button
            onClick={handleAdd}
            className="bg-neutral-800 active:bg-black cursor-pointer text-4xl font-bold px-4 rounded-md flex-none text-white"
          >
            +
          </button>
        </div>

        {tasks.map((task, index) => (
          <Task
            key={index}
            description={task.description}
            finished={task.finished}
            onToggle={() => dispatch({ type: "toggle", payload: index })}
            onDelete={() => dispatch({ type: "delete", payload: index })}
          />
        ))}
      </div>
    </motion.div>
  );
}

type SingleTaskProps = {
  description: string;
  finished: boolean;
  onToggle: () => void;
  onDelete: () => void;
};

function Task({ description, finished, onToggle, onDelete }: SingleTaskProps) {
  return (
    <div className="w-sm xl:w-1/2 flex items-center p-2 gap-2 bg-neutral-300 shadow-xl shadow-neutral-700">
      <input
        type="checkbox"
        className="w-5 h-5 cursor-pointer"
        checked={finished}
        onChange={onToggle}
      />
      <p
        className={`font-bold flex-1 ${
          finished ? "line-through text-neutral-600" : "text-black"
        }`}
      >
        {description}
      </p>
      <button
        onClick={onDelete}
        className="bg-red-500 active:bg-red-700 cursor-pointer rounded-md p-2 text-black text-xs"
      >
        delete
      </button>
    </div>
  );
}
