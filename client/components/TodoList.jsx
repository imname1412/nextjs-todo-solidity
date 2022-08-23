import React from "react";
import { AiOutlinePlusCircle } from "react-icons/ai";
import Task from "./Task";

const TodoList = ({
  currentAccount,
  input,
  setInput,
  addTask,
  myTask,
  delTask,
}) => {
  const digestAddress = (addr) => {
    const frontAddr = addr.slice(0, 5);
    const backAddr = addr.slice(-5);
    return frontAddr + "..." + backAddr;
  };

  return (
    <div className="relative bg-slate-200 w-[80vw] sm:w-[500px] min-h-[50vh] flex flex-col items-center p-5 rounded-md">
      <h1 className="my-1 text-slate-700 font-medium w-full text-center uppercase text-xl">
        TODO app with <span className="text-blue-500">Web3</span> 📚
      </h1>
      <p className="my-1 self-left w-full font-medium text-xl">
        Hi, {digestAddress(currentAccount)}
      </p>
      <p className="text-slate-400/70 w-full font-medium uppercase my-2 text-sm">
        Today's tasks
      </p>
      <div className="flex items-center w-full">
        <div className="w-full flex-2">
          <input
            name="task"
            type="text"
            placeholder="your task..."
            className="outline-1 outline-purple-300 mr-2 h-10 w-full pl-2 rounded text-gray-500 font-medium"
            value={input}
            onChange={(e) => setInput(e.target.value)}
          />
        </div>
        <div className="px-1 flex-1 text-gray-500 cursor-pointer text-2xl w-full flex justify-center h-full items-center">
          <button onClick={() => addTask()}>
            <AiOutlinePlusCircle />
          </button>
        </div>
      </div>
      <div className="w-full my-2" />
      {myTask.map((task, index) => (
        <Task
          key={index}
          taskItem={task.taskText}
          delTask={delTask}
          id={task.id}
        />
      ))}
      <div className="absolute -top-4 -right-4 text-2xl">🚀</div>
    </div>
  );
};

export default TodoList;
