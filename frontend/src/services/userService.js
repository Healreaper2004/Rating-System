import api from "./api";

export const changePassword = (
  oldPassword,
  newPassword
) => {
  return api.put("/user/password", {
    oldPassword,
    newPassword,
  });
};