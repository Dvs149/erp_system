// supplierApi.ts

import client from "../../../api/client";

export const getSuppliers = (page = 1, search = "") =>
    client.get(`/suppliers?page=${page}&search=${search}`);

export const createSupplier = (data: any) =>
    client.post("/suppliers", data);

export const updateSupplier = (id: number, data: any) =>
    client.put(`/suppliers/${id}`, data);

export const deleteSupplier = (id: number) =>
    client.delete(`/suppliers/${id}`);

export const getSupplier = (id: number) =>
    client.get(`/suppliers/${id}`);
