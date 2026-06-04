import api from "./api";

export const getOwnerDashboard = () => {
  return api.get("/store/dashboard");
};