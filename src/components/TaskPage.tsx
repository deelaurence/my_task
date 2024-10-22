import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { RootState } from "../store";
import { addTask, toggleTask, editTask, deleteTask } from "../store/taskSlice";
import { MdAdd } from "react-icons/md";
import trophy from "../assets/trophy.png"
import { FaCheck } from "react-icons/fa6";


const TaskPage: React.FC = () => {
  const {username, picture}=useSelector((state:RootState)=>state.user);
  const tasks = useSelector((state: RootState) => state.tasks.tasks);
  const dispatch = useDispatch();

  const [taskName, setTaskName] = useState(""); // Used for both adding and editing
  const [editingTaskId, setEditingTaskId] = useState<string | null>(null); // Tracks task being edited

  const handleAddTask = () => {
    if (taskName.trim()) {
      dispatch(addTask(taskName));
      setTaskName(""); // Clear the input after adding
    }
  };

  const handleEditTask = (id: string, name: string) => {
    setEditingTaskId(id); // Set the task ID for editing
    setTaskName(name); // Pre-fill the form with the task name
  };

  const handleSaveTask = () => {
    if (editingTaskId && taskName.trim()) {
      dispatch(editTask({ id: editingTaskId, name: taskName }));
      setEditingTaskId(null); // Exit edit mode
      setTaskName(""); // Clear the form after saving
    }
  };

  const handleDeleteTask = (id: string) => {
    dispatch(deleteTask(id));
    setEditingTaskId(null); // Exit edit mode after deleting
    setTaskName(""); // Clear the form
  };

  return (
    <div className=" flex  items-start">
      {/* Left Panel: Task List */}
      <div className="w-1/3 relative z-10  h-screen rounded-l-lg shadow-dark bg-gray-50">
        <div className="flex bg-primaryBlue items-center h-[100px] px-4">
          <img
            src={picture??"https://plus.unsplash.com/premium_photo-1671656349322-41de944d259b?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MXx8cG9ydHJhaXR8ZW58MHx8MHx8fDA%3D"}
            alt="User"
            className="w-12 h-12 rounded-full mr-4"
          />
          <div>
            <h3 className="text-lg text-white font-semibold">Hello, {username?username:"Jhon"}</h3>
            <p className="text-lg italic text-gray-400">What are your plans <br/> for today?</p>
          </div>
        </div>

        <button className="w-full h-20 relative shadow-md border border-gray-700 bg-primaryLemon p-2 flex items-center gap-2 ">
          <img className="ml-4 h-8" src={trophy} alt="trophy" />
          <span className="text-black font-bold text-[1.3vw] absolute left-1/2 -translate-x-1/2">Go Pro Upgrade Now</span>
          <span className="bg-[#071D55] text-[#F2C94C]  p-3 text-xs absolute top-0 right-2">$1</span>
        </button>


        {/* list tASKS HERE */}
        <ul className="space-y-4 mt-3 px-3">
          {tasks.map((task) => (
            <li
              key={task.id}
              className={`flex items-center justify-between shadow-md p-2 border rounded-lg ${
                task.done ? "bg-gray-200" : "bg-white"
              }`}
            >
              <div
                className={`flex items-center gap-2 cursor-pointer ${
                  task.done ? "line-through text-gray-500" : ""
                }`}
                onClick={() => dispatch(toggleTask(task.id))}
              >
                {task.done ? (
                  <span className="w-4 h-4 bg-green-500 block rounded-full">
                    <FaCheck />
                  </span>
                ) : (
                  <span className="w-4 h-4 border border-primaryBlue rounded-full"></span>
                )}
                <span>{task.name}</span>
              </div>
              <button
                onClick={() => handleEditTask(task.id, task.name)} // Pre-fill the form with the task data
                className="text-[#071D55] border border-[#071D55] rounded p-2"
              >
                Edit
              </button>
            </li>
          ))}
        </ul>

        {/* Floating Button for Adding Task */}
        {!editingTaskId && (
          <button
            onClick={handleAddTask}
            className="fixed bottom-6 text-2xl flex items-center justify-center left-[28vw] bg-primaryBlue  text-white rounded-full h-12 w-12 shadow-lg"
          >
            <MdAdd/>
          </button>
        )}
      </div>

      {/* Right Panel: Add/Edit Task Form */}
      <div className="w-2/3  h-screen relative bg-gray-50 rounded-r-lg">
        <div className="bg-primaryBlue flex items-center justify-center text-white h-[100px]">
            <h3 className="text-lg font-semibold mb-4">
            {editingTaskId ? "Edit Task" : "Add New Task"}
            </h3>
        </div>
        <p className="px-4 mb-3">Task Name</p>
        <input
          type="text"
          value={taskName}
          onChange={(e) => setTaskName(e.target.value)}
          placeholder="Task Name"
          className="border border-gray-500  mx-3 p-2 px-4 w-[97%] rounded mb-4"
        />
        <div className="flex absolute bottom-12 px-6 w-full h-12 justify-end gap-4">
          {editingTaskId ? (
            <>
              {/* Delete and Save Buttons for Editing */}
              <button
                onClick={() => handleDeleteTask(editingTaskId)}
                className="bg-primaryRed w-[20%] text-white p-2 rounded"
              >
                Delete
              </button>
              <button
                onClick={handleSaveTask}
                className="bg-primaryBlue w-[80%] text-white p-2 rounded"
              >
                Save
              </button>
            </>
          ) : (
            <button
              onClick={handleAddTask}
              className="bg-primaryBlue text-white p-2 rounded"
            >
              Done
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default TaskPage;
