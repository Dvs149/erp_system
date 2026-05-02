// src/features/customers/pages/CustomerList.tsx

import { useEffect, useState } from "react";
import { getCustomers, exportCustomers } from "../api/customerApi";
import { useNavigate } from "react-router-dom";
import { deleteCustomer } from "../api/customerApi";
import ConfirmModal from "../../../components/ui/ConfirmModal";
import toast from "react-hot-toast";
import type { Customer } from "../types";

const CustomerList = () => {

    const [search, setSearch] = useState("");
    const [perPage, setPerPage] = useState(10);
    
    const [customers, setCustomers] = useState<Customer[]>([]);
    const [page, setPage] = useState(1);
    const [lastPage, setLastPage] = useState(1);
    const [loading, setLoading] = useState(true);

    const [selectedId, setSelectedId] = useState<number | null>(null);
    const [open, setOpen] = useState(false);
    const [deleting, setDeleting] = useState(false);
    
    const navigate = useNavigate();

    useEffect(() => {
        const delay = setTimeout(() => {
            fetchCustomers();
        }, 400); // wait before calling API

        return () => clearTimeout(delay);
    }, [page, search, perPage]);

    const fetchCustomers = async () => {
        try {
            setLoading(true);

            const res = await getCustomers(page, search, perPage);

            setCustomers(res.data);
            setLastPage(res.last_page);
        } catch (err) {
            console.error(err);
        } finally {
            setLoading(false);
        }
    };

    const handleExport = async () => {
        try {
            const data = await exportCustomers();

            const url = window.URL.createObjectURL(new Blob([data]));
            const link = document.createElement("a");

            link.href = url;
            link.setAttribute("download", "customers.csv");

            document.body.appendChild(link);
            link.click();
            link.remove();

        } catch (err) {
            console.error(err);
        }
    };

    

    return (
        <div className="p-4">

            {/* Header */}
            

            {/* Table Card */}
            <div className="bg-white shadow rounded-lg overflow-hidden">

                <div className="flex items-center justify-between m-4">

                    {/* Left: Search */}
                    <div className="flex items-center gap-3">
                        <input
                            type="text"
                            placeholder="Search customers..."
                            value={search}
                            onChange={(e) => {
                                setSearch(e.target.value);
                                setPage(1);
                            }}
                            className="w-72 px-4 py-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                        />
                    </div>

                    {/* Right: Button */}
                    <div>
                        <button
                            onClick={handleExport}
                            className="bg-green-500 hover:bg-green-600 text-white px-4 py-2 rounded-lg shadow mr-5"
                        >
                            Export CSV
                        </button>
                        <button
                            onClick={() => navigate("/customers/create")}
                            className="bg-blue-500 hover:bg-blue-600 text-white px-5 py-2 rounded-lg shadow"
                        >
                            + Add Customer
                        </button>

                    </div>

                </div>
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
                            customers.map((c, index) => (
                                <tr key={c.id} className="hover:bg-gray-50">

                                    <td className="px-4 py-3">
                                        {(page - 1) * 10 + index + 1}
                                    </td>
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
                <div className="flex justify-between items-center m-4">

                    <button
                        disabled={page === 1}
                        onClick={() => setPage(page - 1)}
                        className="px-3 py-1 bg-gray-200 rounded disabled:opacity-50"
                    >
                        Prev
                    </button>

                    <span className="text-sm text-gray-600">
                        Page {page} of {lastPage}
                    </span>

                    <button
                        disabled={page === lastPage}
                        onClick={() => setPage(page + 1)}
                        className="px-3 py-1 bg-gray-200 rounded disabled:opacity-50"
                    >
                        Next
                    </button>

                </div>
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