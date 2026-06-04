import api from "./api";

export const getDashboardStats =
  () => {
    return api.get(
      "/admin/dashboard"
    );
  };

export const getUsers = () => {
  return api.get(
    "/admin/users"
  );
};

export const getStores = () => {
  return api.get(
    "/admin/stores"
  );
};

export const createUser = (
  data
) => {
  return api.post(
    "/admin/user",
    data
  );
};

export const createStore = (
  data
) => {
  return api.post(
    "/admin/store",
    data
  );
};

export const getUserById = (
  id
) => {
  return api.get(
    `/admin/users/${id}`
  );
};