import axios from "axios";
import { AuthResponse, SignInFormData, SignUpFormData } from "../types/types";

const API_URL = 'https://84bf-154-161-59-85.ngrok-free.app';

export const signUp = async (data: SignUpFormData): Promise<AuthResponse> => {
  const response = await axios.post(`${API_URL}/api/v1/user/sign_up`, data);
  return response.data;
};

export const signIn = async (data: SignInFormData): Promise<AuthResponse> => {
  const response = await axios.post(`${API_URL}/api/v1/user/sign_in`, data);
  return response.data;
};