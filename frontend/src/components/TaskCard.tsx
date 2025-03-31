import { useState } from "react";
import { useTasks } from "../context/TaskContext";

type TaskProps = {
  id: number;
  title: string;
  description: string;
  status: string;
  due_date: string;
};

const TaskCard = ({ id, title, description, status, due_date }: TaskProps) => {
  const [showSubtasks, setShowSubtasks] = useState(false);
  const { deleteTask, subtasks, getSubtasks, addSubtask } = useTasks();
  const [newSubtask, setNewSubtask] = useState("");
  const [newDueDate, setNewDueDate] = useState("");
  const [newStatus, setNewStatus] = useState("pending");

  const handleToggle = async () => {
    setShowSubtasks(!showSubtasks);
    if (!subtasks[id]) await getSubtasks(id);
  };

  const handleAddSubtask = async () => {
    if (!newSubtask) return;
    await addSubtask(id, {
      title: newSubtask,
      due_date: newDueDate,
      status: newStatus,
    });
    setNewSubtask("");
    setNewDueDate("");
    setNewStatus("pending");
  };

  return (
    <div className="bg-white p-4 rounded shadow border">
      <div className="flex justify-between items-start">
        <div>
          <h3 className="text-lg font-semibold text-gray-800">{title}</h3>
          <p className="text-sm text-gray-600">{description}</p>
          <p className="text-sm text-gray-500">
            Status: <span className="font-medium">{status}</span> | Due:{" "}
            {due_date || "N/A"}
          </p>
        </div>
        <div className="flex flex-col items-end gap-2">
          <button
            onClick={() => deleteTask(id)}
            className="text-xs bg-red-500 hover:bg-red-600 text-white px-3 py-1 rounded cursor-pointer"
          >
            Delete
          </button>
          <button
            onClick={handleToggle}
            className="text-xs bg-blue-500 hover:bg-blue-600 text-white px-3 py-1 rounded cursor-pointer"
          >
            {showSubtasks ? "Hide" : "Subtasks"}
          </button>
        </div>
      </div>

      {showSubtasks && (
        <div className="pt-3 border-t mt-3 space-y-2">
          <ul className="space-y-1">
            {subtasks[id]?.map((sub) => (
              <li
                key={sub.id}
                className="bg-gray-100 px-3 py-2 rounded text-sm"
              >
                <p className="font-medium">{sub.title}</p>
                <p className="text-xs text-gray-600">
                  {sub.status} | {sub.due_date || "N/A"}
                </p>
              </li>
            ))}
          </ul>

          <div className="space-y-2">
            <input
              type="text"
              placeholder="Subtask title"
              className="w-full px-3 py-1 border rounded text-sm"
              value={newSubtask}
              onChange={(e) => setNewSubtask(e.target.value)}
            />
            <input
              type="date"
              className="w-full px-3 py-1 border rounded text-sm"
              value={newDueDate}
              onChange={(e) => setNewDueDate(e.target.value)}
            />
            <select
              className="w-full px-3 py-1 border rounded text-sm"
              value={newStatus}
              onChange={(e) => setNewStatus(e.target.value)}
            >
              <option value="pending">Pending</option>
              <option value="done">Done</option>
            </select>
            <button
              onClick={handleAddSubtask}
              className="w-full bg-blue-600 text-white py-1 rounded text-sm hover:bg-blue-700 cursor-pointer"
            >
              Add Subtask
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default TaskCard;
