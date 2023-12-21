import React, { useState } from "react";

const TodoInput = () => {
  const [inputVal, setInputVal] = useState("");
  const [userTask, setUserTask] = useState([]);
  const [editingIndex, setEditingIndex] = useState(null);

  const handleChange = (event) => {
    setInputVal(event.target.value);
  };

  const handleClick = () => {
    if (editingIndex !== null) {
      const updatedTasks = [...userTask];
      updatedTasks[editingIndex] = { text: inputVal, completed: false };
      setUserTask(updatedTasks);
      setEditingIndex(null);
    } else {
      setUserTask([...userTask, { text: inputVal, completed: false }]);
    }
    setInputVal("");
  };

  const handleEdit = (index) => {
    setInputVal(userTask[index].text);
    setEditingIndex(index);
  };

  const handleDelete = (index) => {
    const updatedTasks = [...userTask];
    updatedTasks.splice(index, 1);
    setUserTask(updatedTasks);
    setEditingIndex(null);
  };

  const handleCheckboxChange = (index) => {
    const updatedTasks = [...userTask];
    updatedTasks[index].completed = !updatedTasks[index].completed;
    setUserTask(updatedTasks);
  };
  const handleKeyPress=(event)=>{
    if(event.key === 'Enter'){
      handleClick();
    }
  }

  return (
    <div className="max-w-md mx-auto mt-8 p-4 bg-gray-100 rounded-lg">
      <h1 className=" items-center flex justify-center text-4xl font-bold m-4"> TODO App</h1>
      <input
        className="border rounded-lg p-2 mb-2 w-full"
        type="text"
        placeholder="Enter Task"
        value={inputVal}
        onChange={handleChange}
        onKeyPress={handleKeyPress}
      />
      <button
        className={`border rounded-lg p-2 ${
          editingIndex !== null ? "bg-yellow-500" : "bg-slate-500"
        } text-white w-full`}
        onClick={handleClick}
      >
        {editingIndex !== null ? "Update Task" : "Add Task"}
      </button>

      <div className="mt-4">
        <h3 className="text-xl font-bold mb-2">Task List:</h3>
        <ul>
          {userTask.map((task, index) => (
            <li
              key={index}
              className={`flex justify-between items-center bg-white rounded-lg p-2 mb-2 text-lg ${
                task.completed ? "line-through" : ""
              }`}
            >
              <label className="flex items-center ">
                <input
                  type="checkbox"
                  checked={task.completed}
                  onChange={() => handleCheckboxChange(index)}
                  className="mr-2 mt-[4px] "
                />
                <span>{`${index + 1}. ${task.text}`}</span>
              </label>
              <div>
                <button
                  className="p-1 bg-slate-500 text-white rounded mr-2"
                  onClick={() => handleEdit(index)}
                >
                  Edit
                </button>
                <button
                  className="p-1 bg-red-500 text-white rounded"
                  onClick={() => handleDelete(index)}
                >
                  Delete
                </button>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default TodoInput;
