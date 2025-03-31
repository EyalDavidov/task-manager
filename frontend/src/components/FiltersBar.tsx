import { useFilters } from "../context/FiltersContext";

const FiltersBar = () => {
  const { search, setSearch, status, setStatus } = useFilters();

  return (
    <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 bg-white px-4 py-3 rounded shadow mb-6">
      <input
        type="text"
        placeholder="Search tasks..."
        className="px-3 py-2 border rounded w-full sm:w-1/3"
        value={search}
        onChange={(e) => setSearch(e.target.value)}
      />
      <select
        value={status}
        onChange={(e) => setStatus(e.target.value)}
        className="px-3 py-2 border rounded w-full sm:w-1/4"
      >
        <option value="all">All</option>
        <option value="pending">Pending</option>
        <option value="done">Done</option>
      </select>
    </div>
  );
};

export default FiltersBar;
