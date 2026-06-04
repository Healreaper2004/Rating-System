import api from "./api";

export const searchStores = (search) => {
  return api.get(
    `/user/stores?search=${search}`
  );
};

export const searchStoresByAddress = (
  address
) => {
  return api.get(
    `/user/stores?address=${address}`
  );
};

export const getStores = () => {
  return api.get("/user/stores");
};

export const submitRating = (
  storeId,
  rating
) => {
  return api.post(
    "/user/rating",
    {
      storeId,
      rating,
    }
  );
};

export const updateRating = (
  storeId,
  rating
) => {
  return api.put(
    `/user/rating/${storeId}`,
    {
      rating,
    }
  );
};
