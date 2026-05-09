import { Link, useLocation } from "react-router-dom";

import { useAuth } from "../../context/AuthContext";

function Sidebar() {
  const location = useLocation();

  const { logout } = useAuth();

  const navItems = [
    {
      name: "Dashboard",
      path: "/dashboard",
    },
    {
      name: "Leads",
      path: "/leads",
    },
  ];

  return (
    <div className="w-64 h-screen bg-white border-r flex flex-col">
      <div className="p-6 border-b">
        <h1 className="text-2xl font-bold text-blue-600">
          LeadFlow
        </h1>

        <p className="text-sm text-gray-500">
          CRM Dashboard
        </p>
      </div>

      <nav className="flex-1 p-4 space-y-2">
        {navItems.map((item) => (
          <Link
            key={item.path}
            to={item.path}
            className={`block px-4 py-3 rounded-lg transition ${
              location.pathname === item.path
                ? "bg-blue-600 text-white"
                : "text-gray-700 hover:bg-gray-100"
            }`}
          >
            {item.name}
          </Link>
        ))}
      </nav>

      <div className="p-4 border-t">
        <button
          onClick={logout}
          className="w-full bg-red-500 text-white py-2 rounded-lg hover:bg-red-600 transition"
        >
          Logout
        </button>
      </div>
    </div>
  );
}

export default Sidebar;