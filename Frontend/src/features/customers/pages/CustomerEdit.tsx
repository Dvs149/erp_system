import { useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { getCustomer, updateCustomer } from "../api/customerApi";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import toast from "react-hot-toast";

// ✅ Schema
const schema = z.object({
    name: z.string().min(1, "Name is required"),
    email: z.string().email("Invalid email format"),
    phone: z
        .string()
        .optional()
        .refine((val) => !val || /^\d{10,15}$/.test(val), {
            message: "Phone must be 10–15 digits",
        }),
});

type FormData = z.infer<typeof schema>;

const CustomerEdit = () => {
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
    });

    // ✅ Load data (no manual mapping)
    useEffect(() => {
        const fetchCustomer = async () => {
            if (!id) return;

            try {
                const data = await getCustomer(Number(id));

                reset(data); // 🔥 works for 3 or 100 fields
            } catch (err) {
                console.error(err);
            }
        };

        fetchCustomer();
    }, [id, reset]);

    const onSubmit = async (data: FormData) => {
        try {
            const promise = updateCustomer(Number(id), data);

            toast.promise(promise, {
                loading: "Updating customer...",
                success: "Customer updated successfully ✅",
                error: "Failed to update customer ❌",
            });

            await promise;
            navigate("/customers");
        } catch (err: any) {
            console.error(err);

            // ✅ Laravel validation errors mapping
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

            {/* Card */}
            <div className="bg-white shadow-md rounded-xl p-6">

                {/* Header */}
                <h2 className="text-xl font-semibold text-gray-800 mb-6">
                    Edit Customer
                </h2>

                <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">

                    {/* Name */}
                    <div>
                        <label className="block text-sm text-gray-600 mb-1">
                            Name
                        </label>
                        <input
                            placeholder="Enter name"
                            {...register("name")}
                            className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                        />
                        {errors.name && (
                            <p className="text-red-500 text-xs mt-1">
                                {errors.name.message}
                            </p>
                        )}
                    </div>

                    {/* Email */}
                    <div>
                        <label className="block text-sm text-gray-600 mb-1">
                            Email
                        </label>
                        <input
                            placeholder="Enter email"
                            {...register("email")}
                            className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                        />
                        {errors.email && (
                            <p className="text-red-500 text-xs mt-1">
                                {errors.email.message}
                            </p>
                        )}
                    </div>

                    {/* Phone */}
                    <div>
                        <label className="block text-sm text-gray-600 mb-1">
                            Phone
                        </label>
                        <input
                            placeholder="Enter phone"
                            {...register("phone")}
                            className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                        />
                        {errors.phone && (
                            <p className="text-red-500 text-xs mt-1">
                                {errors.phone.message}
                            </p>
                        )}
                    </div>

                    {/* Buttons */}
                    <div className="flex justify-between items-center pt-4">

                        <button
                            type="button"
                            onClick={() => navigate("/customers")}
                            className="px-4 py-2 border rounded-lg text-gray-600 hover:bg-gray-100"
                        >
                            Back
                        </button>

                        <button
                            type="submit"
                            disabled={isSubmitting}
                            className="px-5 py-2 bg-green-500 hover:bg-green-600 text-white rounded-lg transition disabled:opacity-50"
                        >
                            {isSubmitting ? "Updating..." : "Update"}
                        </button>

                    </div>

                </form>
            </div>
        </div>
    );
};

export default CustomerEdit;