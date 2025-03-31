import { useState } from "react";
import { useTasks } from "../context/TaskContext";
import { useFilters } from "../context/FiltersContext";
import Header from "../components/Header";
import FiltersBar from "../components/FiltersBar";
import TaskModal from "../components/TaskModal";
import TaskTable from "../components/TaskTable";
import TaskCard from "../components/TaskCard";

const DashboardPage = () => {
  const isMobile = window.innerWidth < 640;

  const { tasks } = useTasks();
  const { search, status } = useFilters();
  const [isModalOpen, setIsModalOpen] = useState(false);

  const filteredTasks = tasks.filter((task) => {
    const matchesSearch =
      task.title.toLowerCase().includes(search.toLowerCase()) ||
      task.description?.toLowerCase().includes(search.toLowerCase());

    const matchesStatus = status === "all" || task.status === status;

    return matchesSearch && matchesStatus;
  });

  return (
    <div className="min-h-screen bg-gray-100">
      <Header />

      <main className="max-w-5xl mx-auto px-4 py-6">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-2xl font-bold text-gray-800">My Tasks</h2>
          <button
            onClick={() => setIsModalOpen(true)}
            className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded shadow cursor-pointer"
          >
            + New Task
          </button>
        </div>

        <FiltersBar />

        {isMobile ? (
          <div className="space-y-4">
            {filteredTasks.map((task) => (
              <TaskCard key={task.id} {...task} />
            ))}
          </div>
        ) : (
          <TaskTable tasks={filteredTasks} />
        )}
      </main>

      <TaskModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} />
    </div>
  );
};

export default DashboardPage;
