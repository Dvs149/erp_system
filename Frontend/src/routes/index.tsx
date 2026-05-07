import { BrowserRouter, Routes, Route } from "react-router-dom";
import { lazy, Suspense } from "react";
import MainLayout from "../layouts/MainLayout";
import ProtectedRoute from "./ProtectedRoute";

// ✅ Lazy imports
const Home = lazy(() => import("../features/home/pages/Home"));
const Login = lazy(() => import("../features/auth/pages/Login"));
const CustomerList = lazy(() => import("../features/customers/pages/CustomerList"));
const CustomerCreate = lazy(() => import("../features/customers/pages/CustomerCreate"));
const CustomerEdit = lazy(() => import("../features/customers/pages/CustomerEdit"));
const SupplierList = lazy(() => import("../features/suppliers/pages/SupplierList"));
const SupplierCreate = lazy(() => import("../features/suppliers/pages/SupplierCreate"));
const SupplierEdit = lazy(() => import("../features/suppliers/pages/SupplierEdit"));    
const AppRoutes = () => {
    return (
        <BrowserRouter>
            {/* ✅ Suspense wrapper */}
            <Suspense fallback={<div className="p-4">Loading...</div>}>

                <Routes>

                    {/* Public */}
                    <Route path="/login" element={<Login />} />

                    {/* Protected */}
                    <Route
                        path="/"
                        element={
                            <ProtectedRoute>
                                <MainLayout />
                            </ProtectedRoute>
                        }
                    >
                        <Route index element={<Home />} />

                        {/* ✅ Clean nested routes */}
                        {/*Customer*/}
                        <Route path="customers" element={<CustomerList />} />
                        <Route path="customers/create" element={<CustomerCreate />} />
                        <Route path="customers/:id/edit" element={<CustomerEdit />} />

                        {/*Suppliers*/}
                        <Route path="/suppliers" element={<SupplierList />} />
                        <Route path="/suppliers/create" element={<SupplierCreate />} />
                        <Route path="/suppliers/:id/edit" element={<SupplierEdit />} />

                        
                    </Route>

                </Routes>

            </Suspense>
        </BrowserRouter>
    );
};

export default AppRoutes;