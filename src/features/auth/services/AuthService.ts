import { api } from "@/lib/api";
import type { LoginSchema } from "@/features/auth/validators/loginSchema";

export async function login(data: LoginSchema) {
    const response = await api.post("/auth", data);

    const token = response.data.token;

    localStorage.setItem("token", token);

    return token;
}