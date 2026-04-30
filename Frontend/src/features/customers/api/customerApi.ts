import client from "../../../api/client";

export const getCustomers = async () => {
    const res = await client.get("/customers");
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