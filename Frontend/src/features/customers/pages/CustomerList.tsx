// src/features/customers/pages/CustomerList.tsx

import { useEffect, useState } from "react";
import { getCustomers } from "../api/customerApi";
import { useNavigate } from "react-router-dom";
import { deleteCustomer } from "../api/customerApi";
import ConfirmModal from "../../../components/ui/ConfirmModal";
import toast from "react-hot-toast";

interface Customer {
    id: number;
    name: string;
    email: string;
    phone?: string;
}


const CustomerList = () => {
    const [customers, setCustomers] = useState<Customer[]>([]);
    const [loading, setLoading] = useState(true);

    const [selectedId, setSelectedId] = useState<number | null>(null);
    const [open, setOpen] = useState(false);
    const [deleting, setDeleting] = useState(false);
    
    const navigate = useNavigate();

    useEffect(() => {
        fetchCustomers();
    }, []);

    const fetchCustomers = async () => {
        try {
            const data = await getCustomers();
            setCustomers(data);
        } catch (err) {
            console.error(err);
        } finally {
            setLoading(false);
        }
    };

    if (loading) return <p>Loading...</p>;

    return (
        <div className="p-4">

            {/* Header */}
            <div className="flex justify-between items-center mb-4">
                <h2 className="text-xl font-semibold text-gray-800">Customers</h2>

                <button
                    onClick={() => navigate("/customers/create")}
                    className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-lg shadow"
                >
                    + Add Customer
                </button>
            </div>

            {/* Table Card */}
            <div className="bg-white shadow rounded-lg overflow-hidden">

                <table className="w-full text-sm text-left">

                    {/* Head */}
                    <thead className="bg-gray-100 text-gray-600 uppercase text-xs">
                        <tr>
                            <th className="px-4 py-3">ID</th>
                            <th className="px-4 py-3">Name</th>
                            <th className="px-4 py-3">Email</th>
                            <th className="px-4 py-3">Phone</th>
                            <th className="px-4 py-3 text-right">Actions</th>
                        </tr>
                    </thead>

                    {/* Body */}
                    <tbody className="divide-y">

                        {customers.length > 0 ? (
                            customers.map((c) => (
                                <tr key={c.id} className="hover:bg-gray-50">

                                    <td className="px-4 py-3">{c.id}</td>
                                    <td className="px-4 py-3 font-medium">{c.name}</td>
                                    <td className="px-4 py-3 text-gray-600">{c.email}</td>
                                    <td className="px-4 py-3">{c.phone || "-"}</td>

                                    <td className="px-4 py-3 text-right space-x-2">

                                        <button
                                            onClick={() => navigate(`/customers/${c.id}/edit`)}
                                            className="bg-yellow-400 hover:bg-yellow-500 text-white px-3 py-1 rounded"
                                        >
                                            Edit
                                        </button>

                                        <button
                                            onClick={() => {
                                                setSelectedId(c.id);
                                                setOpen(true);
                                            }}
                                            className="bg-red-500 hover:bg-red-600 text-white px-3 py-1 rounded"
                                        >
                                            Delete
                                        </button>

                                    </td>

                                </tr>
                            ))
                        ) : (
                            <tr>
                                <td colSpan={5} className="text-center py-6 text-gray-500">
                                    No customers found
                                </td>
                            </tr>
                        )}

                    </tbody>
                </table>
            </div>
            <ConfirmModal
                open={open}
                message="Are you sure you want to delete this customer?"
                loading={deleting}
                onCancel={() => setOpen(false)}
                onConfirm={async () => {
                    if (!selectedId) return;

                    try {
                        setDeleting(true);

                        await deleteCustomer(selectedId);

                        toast.success("Customer deleted successfully ✅");

                        fetchCustomers();
                        setOpen(false);

                    } catch (err) {
                        console.error(err);

                        toast.error("Failed to delete customer ❌");

                    } finally {
                        setDeleting(false);
                    }
                }}
            />
        </div>
    );
};

export default CustomerList;