import { useEffect, useState } from "react";

// Type pour une tâche
type TaskProps = {
  description: string;
  finished: boolean;
};

export default function TaskManager() {
  const userTasks = localStorage.getItem("userTasks");
  const parseTask: TaskProps[] = userTasks ? JSON.parse(userTasks) : [];
  const [tasks, setTasks] = useState<TaskProps[]>(parseTask);
  const [textTask, setTextTask] = useState("");

  const addTask = () => {
    if (!textTask.trim()) return;
    setTasks([...tasks, { description: textTask, finished: false }]);
    setTextTask("");
  };

  const deleteTask = (index: number) => {
    setTasks(tasks.filter((_, i) => i !== index));
  };

  const toggleTaskFinished = (index: number) => {
    const updatedTasks = tasks.map((task, i) =>
      i === index ? { ...task, finished: !task.finished } : task
    );
    setTasks(updatedTasks);
  };

  useEffect(() => {
    localStorage.setItem("userTasks", JSON.stringify(tasks));
  }, [tasks]);

  return (
    <div className="w-screen h-screen flex flex-col items-center bg-neutral-800">
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
            onClick={addTask}
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
            onToggle={() => toggleTaskFinished(index)}
            onDelete={() => deleteTask(index)}
          />
        ))}
      </div>
    </div>
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
