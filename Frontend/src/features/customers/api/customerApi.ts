import client from "../../../api/client";

export const getCustomers = async (
    page = 1,
    search = "",
    perPage = 10
) => {
    const res = await client.get(
        `/customers?page=${page}&search=${search}&per_page=${perPage}`
    );
    return res.data;
};

export const createCustomer = async (data: {
    name: string;
    email: string;
    phone?: string;
}) => {
    const res = await client.post("/customers", data);
    return res.data;
};

export const getCustomer = async (id: number) => {
    const res = await client.get(`/customers/${id}`);
    return res.data;
};
export const updateCustomer = async (
    id: number,
    data: {
        name: string;
        email: string;
        phone?: string;
    }
) => {
    const res = await client.put(`/customers/${id}`, data);
    return res.data;
};

export const deleteCustomer = async (id: number) => {
    const res = await client.delete(`/customers/${id}`);
    return res.data;
};

export const exportCustomers = async () => {
    const res = await client.get("/customers/export", {
        responseType: "blob",
    });
    return res.data;
};