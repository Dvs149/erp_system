// src/features/suppliers/pages/SupplierEdit.tsx

import { useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { getSupplier, updateSupplier } from "../api/supplierApi";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import toast from "react-hot-toast";

// ✅ Schema
const schema = z.object({
    name: z.string().min(1, "Name is required"),
    email: z.string().email("Invalid email").optional().or(z.literal("")),
    phone: z
        .string()
        .optional()
        .refine((val) => !val || /^[+]?[\d\s\-()]{10,20}$/.test(val), {
            message: "Invalid phone number",
        }),
    company: z.string().optional(),
    address: z.string().optional(),
});

type FormData = z.infer<typeof schema>;

const SupplierEdit = () => {
    const { id } = useParams();
    const navigate = useNavigate();

    const {
        register,
        handleSubmit,
        reset,
        setError,
        formState: { errors, isSubmitting },
    } = useForm<FormData>({
        resolver: zodResolver(schema),
        defaultValues: {
            name: "",
            email: "",
            phone: "",
            company: "",
            address: "",
        },
    });

    // 🔄 Load supplier data
    useEffect(() => {
        const fetchSupplier = async () => {
            if (!id) return;

            try {
                const res = await getSupplier(Number(id));
                const data = res.data;

                reset({
                    name: data.name || "",
                    email: data.email || "",
                    phone: data.phone || "",
                    company: data.company || "",
                    address: data.address || "",
                });
            } catch (err) {
                console.error(err);
            }
        };

        fetchSupplier();
    }, [id, reset]);

    // 🚀 Submit
    const onSubmit = async (data: FormData) => {
        try {
            const promise = updateSupplier(Number(id), data);

            toast.promise(promise, {
                loading: "Updating supplier...",
                success: "Supplier updated successfully ✅",
                error: "Failed to update supplier ❌",
            });

            await promise;

            navigate("/suppliers");
        } catch (err: any) {
            console.error(err);

            // Laravel validation errors
            if (err.response?.data?.errors) {
                Object.keys(err.response.data.errors).forEach((key) => {
                    setError(key as keyof FormData, {
                        message: err.response.data.errors[key][0],
                    });
                });
            }
        }
    };

    return (
        <div className="max-w-xl mx-auto">

            <div className="bg-white shadow-md rounded-xl p-6">

                <h2 className="text-xl font-semibold text-gray-800 mb-6">
                    Edit Supplier
                </h2>

                <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">

                    {/* Name */}
                    <div>
                        <label className="block text-sm text-gray-600 mb-1">Name</label>
                        <input
                            {...register("name")}
                            className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500"
                        />
                        {errors.name && (
                            <p className="text-red-500 text-xs mt-1">{errors.name.message}</p>
                        )}
                    </div>

                    {/* Email */}
                    <div>
                        <label className="block text-sm text-gray-600 mb-1">Email</label>
                        <input
                            {...register("email")}
                            className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500"
                        />
                        {errors.email && (
                            <p className="text-red-500 text-xs mt-1">{errors.email.message}</p>
                        )}
                    </div>

                    {/* Phone */}
                    <div>
                        <label className="block text-sm text-gray-600 mb-1">Phone</label>
                        <input
                            {...register("phone")}
                            className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500"
                        />
                        {errors.phone && (
                            <p className="text-red-500 text-xs mt-1">{errors.phone.message}</p>
                        )}
                    </div>

                    {/* Company */}
                    <div>
                        <label className="block text-sm text-gray-600 mb-1">Company</label>
                        <input
                            {...register("company")}
                            className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500"
                        />
                    </div>

                    {/* Address */}
                    <div>
                        <label className="block text-sm text-gray-600 mb-1">Address</label>
                        <textarea
                            {...register("address")}
                            className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500"
                        />
                    </div>

                    {/* Buttons */}
                    <div className="flex justify-between pt-4">

                        <button
                            type="button"
                            onClick={() => navigate("/suppliers")}
                            className="px-4 py-2 border rounded-lg text-gray-600 hover:bg-gray-100"
                        >
                            Back
                        </button>

                        <button
                            type="submit"
                            disabled={isSubmitting}
                            className="px-5 py-2 bg-green-500 hover:bg-green-600 text-white rounded-lg disabled:opacity-50"
                        >
                            {isSubmitting ? "Updating..." : "Update"}
                        </button>

                    </div>

                </form>
            </div>
        </div>
    );
};

export default SupplierEdit;