import { Outlet, useNavigate, NavLink, useLocation } from "react-router-dom";
import { useIdleLogout } from "../hooks/useIdleLogout";

const MainLayout = () => {
    const navigate = useNavigate();
    const location = useLocation();

    const handleLogout = () => {
        localStorage.removeItem("token");
        navigate("/login", { replace: true });
    };

    // ✅ Route → Title mapping
    const getTitle = () => {
        switch (location.pathname) {
            case "/":
                return "Dashboard";
            case "/customers":
                return "Customers";
            case "/customers/create":
                return "Create Customer";
            default:
                if (location.pathname.includes("/customers") && location.pathname.includes("edit")) {
                    return "Edit Customer";
                }
                return "Dashboard";
        }
    };

    useIdleLogout(); // ✅ enable auto logout

    return (
        <div className="flex min-h-screen bg-gray-100">

            {/* Sidebar */}
            <aside className="w-64 bg-gray-900 text-white flex flex-col">

                {/* Logo */}
                <div className="p-5 text-lg font-bold border-b border-gray-700">
                    ERP System
                </div>

                {/* Menu */}
                <nav className="flex-1 p-4 space-y-2">

                    <NavLink
                        to="/"
                        end
                        className={({ isActive }) =>
                            `block px-4 py-2 rounded transition ${isActive
                                ? "bg-blue-500 text-white"
                                : "text-gray-300 hover:bg-gray-800 hover:text-white"
                            }`
                        }
                    >
                        Dashboard
                    </NavLink>

                    <NavLink
                        to="/customers"
                        className={({ isActive }) =>
                            `block px-4 py-2 rounded transition ${isActive
                                ? "bg-blue-500 text-white"
                                : "text-gray-300 hover:bg-gray-800 hover:text-white"
                            }`
                        }
                    >
                        Customers
                    </NavLink>
                    <NavLink
                        to="/suppliers"
                        className={({ isActive }) =>
                            `block px-4 py-2 rounded transition ${isActive
                                ? "bg-blue-500 text-white"
                                : "text-gray-300 hover:bg-gray-800 hover:text-white"
                            }`
                        }
                    >
                        Suppliers
                    </NavLink>

                </nav>

                {/* Logout */}
                <div className="p-4 border-t border-gray-700">
                    <button
                        onClick={handleLogout}
                        className="w-full bg-red-500 hover:bg-red-600 text-white py-2 rounded"
                    >
                        Logout
                    </button>
                </div>

            </aside>

            {/* Main Content */}
            <div className="flex-1 flex flex-col">

                {/* Header */}
                <header className="bg-white shadow px-6 py-4 flex justify-between items-center">
                    <h2 className="text-xl font-semibold text-gray-700">{getTitle()}</h2>
                </header>

                {/* Page Content */}
                <main className="p-6 flex-1">
                    <Outlet />
                </main>

            </div>
        </div>
    );
};

export default MainLayout;