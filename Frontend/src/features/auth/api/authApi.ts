// features/auth/api/authApi.ts
import client from "../../../api/client";

export const login = async (data: {
  email: string;
  password: string;
}) => {
  const res = await client.post("/login", data);
  return res.data; // 👈 return only data
};