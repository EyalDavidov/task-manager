import { useState } from "react";
import { useTasks } from "../context/TaskContext";

// נוסיף טיפוס עבור Task
type Task = {
  id: number;
  title: string;
  description: string;
  status: string;
  due_date: string;
};

type Props = {
  tasks: Task[];
};

const TaskTable = ({ tasks }: Props) => {
  const { subtasks, getSubtasks, addSubtask, deleteTask } = useTasks();

  const [expandedTaskId, setExpandedTaskId] = useState<number | null>(null);
  const [newTitle, setNewTitle] = useState("");
  const [newStatus, setNewStatus] = useState("pending");
  const [newDueDate, setNewDueDate] = useState("");

  const toggleExpand = async (taskId: number) => {
    if (expandedTaskId === taskId) {
      setExpandedTaskId(null);
    } else {
      await getSubtasks(taskId);
      setExpandedTaskId(taskId);
    }
  };

  const handleAddSubtask = async (taskId: number) => {
    if (!newTitle) return;
    await addSubtask(taskId, {
      title: newTitle,
      status: newStatus,
      due_date: newDueDate,
    });
    setNewTitle("");
    setNewStatus("pending");
    setNewDueDate("");
    await getSubtasks(taskId);
  };

  return (
    <div className="overflow-x-auto bg-white rounded-lg shadow">
      <table className="min-w-full text-sm">
        <thead className="bg-gray-100 text-left">
          <tr>
            <th className="px-4 py-2">Title</th>
            <th className="px-4 py-2">Description</th>
            <th className="px-4 py-2">Status</th>
            <th className="px-4 py-2">Due Date</th>
            <th className="px-4 py-2 text-center">Actions</th>
          </tr>
        </thead>
        <tbody>
          {tasks.map((task) => (
            <>
              <tr key={task.id} className="border-b hover:bg-gray-50">
                <td className="px-4 py-2 font-medium">{task.title}</td>
                <td className="px-4 py-2">{task.description}</td>
                <td className="px-4 py-2 capitalize">{task.status}</td>
                <td className="px-4 py-2">{task.due_date || "N/A"}</td>
                <td className="px-4 py-2 text-center space-x-2">
                  <button
                    onClick={() => toggleExpand(task.id)}
                    className="text-sm text-blue-600 hover:underline cursor-pointer"
                  >
                    {expandedTaskId === task.id ? "Hide" : "Subtasks"}
                  </button>
                  <button
                    onClick={() => deleteTask(task.id)}
                    className="text-sm text-red-500 hover:underline cursor-pointer"
                  >
                    Delete
                  </button>
                </td>
              </tr>

              {expandedTaskId === task.id && (
                <tr>
                  <td colSpan={5} className="bg-gray-50 p-4">
                    <h4 className="font-semibold mb-2">Subtasks</h4>
                    <ul className="space-y-2 mb-4">
                      {subtasks[task.id]?.length ? (
                        subtasks[task.id].map((sub) => (
                          <li
                            key={sub.id}
                            className="bg-white border p-2 rounded"
                          >
                            <p className="font-medium text-sm">{sub.title}</p>
                            <p className="text-xs text-gray-500">
                              {sub.status} | {sub.due_date || "N/A"}
                            </p>
                          </li>
                        ))
                      ) : (
                        <p className="text-sm text-gray-500">No subtasks.</p>
                      )}
                    </ul>

                    <div className="flex flex-col sm:flex-row gap-2">
                      <input
                        type="text"
                        placeholder="Subtask title"
                        className="px-3 py-1 border rounded w-full sm:w-1/3"
                        value={newTitle}
                        onChange={(e) => setNewTitle(e.target.value)}
                      />
                      <input
                        type="date"
                        className="px-3 py-1 border rounded w-full sm:w-1/3"
                        value={newDueDate}
                        onChange={(e) => setNewDueDate(e.target.value)}
                      />
                      <select
                        className="px-3 py-1 border rounded w-full sm:w-1/3"
                        value={newStatus}
                        onChange={(e) => setNewStatus(e.target.value)}
                      >
                        <option value="pending">Pending</option>
                        <option value="done">Done</option>
                      </select>
                      <button
                        onClick={() => handleAddSubtask(task.id)}
                        className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-1 rounded cursor-pointer"
                      >
                        Add Subtask
                      </button>
                    </div>
                  </td>
                </tr>
              )}
            </>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default TaskTable;
