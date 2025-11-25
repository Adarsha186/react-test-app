import { API_ENDPOINTS } from "./endpoints";

export const hitSuccessAPI = async () => {
  const response = await fetch(API_ENDPOINTS.SUCCESS);
  return response.json();
};

export const hitFailureAPI = async () => {
  const response = await fetch(API_ENDPOINTS.FAILURE);
  return response.json();
};
