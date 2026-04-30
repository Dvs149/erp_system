import { useNavigate } from "react-router-dom";
import { createCustomer } from "../api/customerApi";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import toast from "react-hot-toast";

// ✅ Validation schema
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

const CustomerCreate = () => {
    const navigate = useNavigate();

    const {
        register,
        handleSubmit,
        setError,
        formState: { errors, isSubmitting },
    } = useForm<FormData>({
        resolver: zodResolver(schema),
    });

    // const onSubmit = async (data: FormData) => {
    //     try {
    //         await createCustomer(data);
    //         navigate("/customers");
    //     } catch (err: any) {
    //         console.error(err);

    //         // ✅ Laravel backend validation errors
    //         if (err.response?.data?.errors) {
    //             Object.keys(err.response.data.errors).forEach((key) => {
    //                 setError(key as keyof FormData, {
    //                     message: err.response.data.errors[key][0],
    //                 });
    //             });
    //         }
    //     }
    // };
    const onSubmit = async (data: FormData) => {
        try {
            const promise = createCustomer(data);

            toast.promise(promise, {
                loading: "Creating customer...",
                success: "Customer created successfully 🎉",
                error: "Failed to create customer ❌",
            });

            await promise;

            navigate("/customers");

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

                {/* Header */}
                <h2 className="text-xl font-semibold text-gray-800 mb-6">
                    Create Customer
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
                            className="px-5 py-2 bg-blue-500 hover:bg-blue-600 text-white rounded-lg transition"
                        >
                            {isSubmitting ? "Creating..." : "Create"}
                        </button>

                    </div>

                </form>
            </div>
        </div>
    );
};

export default CustomerCreate;