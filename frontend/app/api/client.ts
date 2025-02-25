import createClient from "openapi-fetch";
import { paths } from "@/lib/api/schema";

export const client = createClient<paths>({
  baseUrl: process.env.NEXT_PUBLIC_API_BASE_URL,
  headers: {
    "Content-Type": "application/json",
  },
});

export const clientFormData = createClient<paths>({
  baseUrl: process.env.NEXT_PUBLIC_API_BASE_URL,
  headers: {
    "Content-Type": "multipart/form-data",
  },
});
