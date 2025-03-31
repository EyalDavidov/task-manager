import { useAuth } from "../context/AuthContext";

const Header = () => {
  const { logout } = useAuth();

  return (
    <header className="bg-white shadow-md py-4 px-6 flex justify-between items-center sticky top-0 z-40">
      <h1 className="text-xl font-bold text-blue-600">Task Manager</h1>
      <div className="flex items-center gap-4">
        {/* בעתיד: הצגת שם משתמש */}
        {/* <span className="text-gray-700 text-sm">Hi, Eyal 👋</span> */}
        <button
          onClick={logout}
          className="bg-red-500 hover:bg-red-600 text-white text-sm px-4 py-2 rounded cursor-pointer"
        >
          Logout
        </button>
      </div>
    </header>
  );
};

export default Header;
