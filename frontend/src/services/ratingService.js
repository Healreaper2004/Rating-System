import api from "./api";

export const submitRating = (
  data
) => {
  return api.post(
    "/rating",
    data
  );
};