import axios from "axios";
import { Monitor, CreateMonitorFormData, PaginatedResponse } from "../types/types";

const API_URL = 'https://84bf-154-161-59-85.ngrok-free.app';

export const createMonitor = async (data: CreateMonitorFormData): Promise<Monitor> => {
  const response = await axios.post(`${API_URL}/api/v1/monitor`, data, {
    headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
  });
  return response.data;
};

export const getMonitors = async (page: number, pageSize: number): Promise<PaginatedResponse<Monitor>> => {
  const response = await axios.get(`${API_URL}/api/v1/monitor/list`, {
    params: { page, pageSize },
    headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
  });
  return response.data;
};