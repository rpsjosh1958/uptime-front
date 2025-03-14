import { z } from "zod";

export interface User {
  id: string;
  email: string;
  lastLogin?: string;
  createdAt: string;
  updatedAt: string;
}

export interface Monitor {
  id: string;
  name: string;
  url: string;
  method: string;
  interval: number;
  expectedStatus: number;
  alertsEnabled: boolean;
  userId: string;
  createdAt: string;
  updatedAt: string;
  totalChecks?: number;
  successfulChecks?: number;
  uptimePercentage?: number;
  avgResponseTime?: number;
  lastCheckTime?: string;
}

export interface AuthResponse {
  token: string;
  user: User;
}

export interface PaginatedResponse<T> {
  data: T[];
  page: number;
  pageSize: number;
  totalItems: number;
  totalPages: number;
  message: string;
}

export const SignUpSchema = z.object({
  email: z.string().email("Invalid email"),
  password: z.string().min(8, "Password must be at least 8 characters"),
});

export const SignInSchema = z.object({
  email: z.string().email("Invalid email"),
  password: z.string().min(1, "Password is required"),
});

export const CreateMonitorSchema = z.object({
  name: z.string().min(1, "Name is required"),
  url: z.string().url("Invalid URL"),
  method: z.enum(["GET", "POST", "PUT", "DELETE", "PATCH", "OPTIONS"]),
  interval: z.number().min(5, "Interval must be at least 5 seconds"),
  expectedStatus: z.number().min(100).max(599),
  alertsEnabled: z.boolean(),
});

export type SignUpFormData = z.infer<typeof SignUpSchema>;
export type SignInFormData = z.infer<typeof SignInSchema>;
export type CreateMonitorFormData = z.infer<typeof CreateMonitorSchema>;