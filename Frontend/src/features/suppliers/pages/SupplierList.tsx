// src/features/suppliers/pages/SupplierList.tsx

import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { getSuppliers, deleteSupplier } from "../api/supplierApi";
import toast from "react-hot-toast";
import ConfirmModal from "../../../components/ui/ConfirmModal";

interface Supplier {
    id: number;
    name: string;
    email?: string;
    phone?: string;
    company?: string;
}

const SupplierList = () => {
    const navigate = useNavigate();

    const [suppliers, setSuppliers] = useState<Supplier[]>([]);
    const [loading, setLoading] = useState(false);
    const [pageLoading, setPageLoading] = useState(false);

    const [page, setPage] = useState(1);
    const [lastPage, setLastPage] = useState(1);
    const [search, setSearch] = useState("");

    const [open, setOpen] = useState(false);
    const [selectedId, setSelectedId] = useState<number | null>(null);
    const [deleting, setDeleting] = useState(false);

    const perPage = 10;

    // 🔄 Fetch Suppliers
    const fetchSuppliers = async (type: "normal" | "page" = "normal") => {
        try {
            if (type === "page") {
                setPageLoading(true);
            } else {
                setLoading(true);
            }

            const res = await getSuppliers(page, search);

            setSuppliers(res.data.data);
            setLastPage(res.data.last_page);

        } catch (err) {
            console.error(err);
        } finally {
            setLoading(false);
            setPageLoading(false);
        }
    };

    // 🔁 Debounced fetch
    useEffect(() => {
        const delay = setTimeout(() => {
            fetchSuppliers("normal");
        }, 400);

        return () => clearTimeout(delay);
    }, [search]);

    // 🗑 Delete handler
    const handleDelete = async () => {
        if (!selectedId) return;

        try {
            setDeleting(true);

            await deleteSupplier(selectedId);

            toast.success("Supplier deleted successfully");

            fetchSuppliers();
            setOpen(false);
        } catch (err) {
            console.error(err);
            toast.error("Failed to delete supplier");
        } finally {
            setDeleting(false);
        }
    };

    return (
        <div className="p-4">

            {/* Header */}
            <div className="flex justify-between items-center mb-6">

                {/* Search */}
                <input
                    type="text"
                    placeholder="Search suppliers..."
                    value={search}
                    onChange={(e) => {
                        setSearch(e.target.value);
                        setPage(1);
                    }}
                    className="w-72 px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500"
                />

                {/* Add Button */}
                <button
                    onClick={() => navigate("/suppliers/create")}
                    className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-lg"
                >
                    + Add Supplier
                </button>
            </div>

            {/* Table */}
            <div className="bg-white shadow rounded-lg overflow-hidden">

                <table className="w-full text-sm">

                    <thead className="bg-gray-100 text-gray-600 uppercase text-xs">
                        <tr>
                            <th className="px-4 py-3">#</th>
                            <th className="px-4 py-3">Name</th>
                            <th className="px-4 py-3">Company</th>
                            <th className="px-4 py-3">Email</th>
                            <th className="px-4 py-3">Phone</th>
                            <th className="px-4 py-3 text-right">Actions</th>
                        </tr>
                    </thead>

                    <tbody className="divide-y">

                        {loading ? (
                            <tr>
                                <td colSpan={6} className="text-center py-6 text-gray-500">
                                    Loading...
                                </td>
                            </tr>
                        ) : suppliers.length > 0 ? (
                            suppliers.map((s, index) => (
                                <tr key={s.id} className="hover:bg-gray-50">

                                    {/* Serial Number */}
                                    <td className="px-4 py-3">
                                        {(page - 1) * perPage + index + 1}
                                    </td>

                                    <td className="px-4 py-3 font-medium">{s.name}</td>
                                    <td className="px-4 py-3">{s.company || "-"}</td>
                                    <td className="px-4 py-3 text-gray-600">{s.email}</td>
                                    <td className="px-4 py-3">{s.phone}</td>

                                    <td className="px-4 py-3 text-right space-x-2">

                                        <button
                                            onClick={() => navigate(`/suppliers/${s.id}/edit`)}
                                            className="bg-yellow-400 hover:bg-yellow-500 text-white px-3 py-1 rounded"
                                        >
                                            Edit
                                        </button>

                                        <button
                                            onClick={() => {
                                                setSelectedId(s.id);
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
                                <td colSpan={6} className="text-center py-6 text-gray-500">
                                    No suppliers found
                                </td>
                            </tr>
                        )}

                    </tbody>
                </table>
            </div>

            {/* Pagination */}
            <div className="flex justify-between items-center mt-4">
                <button
                    disabled={page === 1 || pageLoading}
                    onClick={() => {
                        setPage((prev) => prev - 1);
                        fetchSuppliers("page");
                    }}
                    className="px-3 py-1 bg-gray-200 rounded disabled:opacity-50"
                >
                    {pageLoading ? (
                        <span className="animate-spin">⏳</span>
                    ) : (
                        "Prev"
                    )}
                </button>
                <span className="text-sm text-gray-600">
                    Page {page} of {lastPage}
                </span>
                <button
                    disabled={page === lastPage || pageLoading}
                    onClick={() => {
                        setPage((prev) => prev + 1);
                        fetchSuppliers("page");
                    }}
                    className="px-3 py-1 bg-gray-200 rounded disabled:opacity-50"
                >
                    {pageLoading ? (
                        <span className="animate-spin">⏳</span>
                    ) : (
                        "Next"
                    )}
                </button>
            </div>

            {/* Confirm Modal */}
            <ConfirmModal
                open={open}
                message="Are you sure you want to delete this supplier?"
                loading={deleting}
                onCancel={() => setOpen(false)}
                onConfirm={handleDelete}
            />
        </div>
    );
};

export default SupplierList;