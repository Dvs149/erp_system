import { useNavigate } from "react-router-dom";
import { createSupplier } from "../api/supplierApi";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import toast from "react-hot-toast";

// ✅ Validation Schema
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

const SupplierCreate = () => {
    const navigate = useNavigate();

    const {
        register,
        handleSubmit,
        setError,
        formState: { errors, isSubmitting },
    } = useForm<FormData>({
        resolver: zodResolver(schema),
    });

    // 🚀 Submit
    const onSubmit = async (data: FormData) => {
        try {
            const promise = createSupplier(data);

            toast.promise(promise, {
                loading: "Creating supplier...",
                success: "Supplier created successfully 🎉",
                error: "Failed to create supplier ❌",
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

            {/* Card */}
            <div className="bg-white shadow-md rounded-xl p-6">

                <h2 className="text-xl font-semibold text-gray-800 mb-6">
                    Create Supplier
                </h2>

                <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">

                    {/* Name */}
                    <div>
                        <label className="block text-sm text-gray-600 mb-1">Name</label>
                        <input
                            {...register("name")}
                            placeholder="Enter name"
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
                            placeholder="Enter email"
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
                            placeholder="Enter phone"
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
                            placeholder="Enter company"
                            className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500"
                        />
                    </div>

                    {/* Address */}
                    <div>
                        <label className="block text-sm text-gray-600 mb-1">Address</label>
                        <textarea
                            {...register("address")}
                            placeholder="Enter address"
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
                            className="px-5 py-2 bg-blue-500 hover:bg-blue-600 text-white rounded-lg disabled:opacity-50"
                        >
                            {isSubmitting ? "Creating..." : "Create"}
                        </button>

                    </div>

                </form>
            </div>
        </div>
    );
};

export default SupplierCreate;