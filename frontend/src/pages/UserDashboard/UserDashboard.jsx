import {
  useEffect,
  useState,
} from "react";

import {
  getStores,
  submitRating,
  updateRating,
} from "../../services/storeService";

import { changePassword }
from "../../services/userService";

function UserDashboard() {
  const [stores, setStores] =
    useState([]);

  const [
    showPasswordForm,
    setShowPasswordForm,
  ] = useState(false);

  const [oldPassword, setOldPassword] =
    useState("");

  const [newPassword, setNewPassword] =
    useState("");

  const [searchName, setSearchName] =
    useState("");

  const [
    searchAddress,
    setSearchAddress,
  ] = useState("");

  useEffect(() => {
    loadStores();
  }, []);

  const loadStores = async () => {
    try {
      const response =
        await getStores();

      setStores(
        response.data.stores
      );
    } catch (error) {
      console.log(error);
    }
  };

  const handleRating = async (
    store
  ) => {
    const rating =
      prompt(
        "Enter rating (1-5)"
      );

    if (
      !rating ||
      rating < 1 ||
      rating > 5
    ) {
      return;
    }

    try {
      if (
        store.userRating ===
        null
      ) {
        await submitRating(
          store.id,
          Number(rating)
        );
      } else {
        await updateRating(
          store.id,
          Number(rating)
        );
      }

      loadStores();

      alert(
        "Rating saved successfully"
      );
    } catch (error) {
      alert(
        error.response?.data
          ?.message ||
          "Failed to save rating"
      );
    }
  };

  const handlePasswordChange =
    async (e) => {
      e.preventDefault();

      try {
        await changePassword(
          oldPassword,
          newPassword
        );

        alert(
          "Password updated successfully"
        );

        setOldPassword("");
        setNewPassword("");

        setShowPasswordForm(
          false
        );
      } catch (error) {
        alert(
          error.response?.data
            ?.message ||
            "Failed to update password"
        );
      }
    };

  const filteredStores =
    stores.filter((store) => {
      return (
        store.name
          .toLowerCase()
          .includes(
            searchName.toLowerCase()
          ) &&
        store.address
          .toLowerCase()
          .includes(
            searchAddress.toLowerCase()
          )
      );
    });

  return (
    <div
      style={{
        padding: "20px",
      }}
    >
      <h1>
        User Dashboard
      </h1>

      <button
        onClick={() =>
          setShowPasswordForm(
            !showPasswordForm
          )
        }
        style={{
          marginBottom: "20px",
        }}
      >
        Change Password
      </button>

      {showPasswordForm && (
        <form
          onSubmit={
            handlePasswordChange
          }
          style={{
            display: "flex",
            gap: "10px",
            marginBottom:
              "20px",
          }}
        >
          <input
            type="password"
            placeholder="Old Password"
            value={oldPassword}
            onChange={(e) =>
              setOldPassword(
                e.target.value
              )
            }
            required
          />

          <input
            type="password"
            placeholder="New Password"
            value={newPassword}
            onChange={(e) =>
              setNewPassword(
                e.target.value
              )
            }
            required
          />

          <button type="submit">
            Update Password
          </button>
        </form>
      )}

      <div
        style={{
          display: "flex",
          gap: "10px",
          marginBottom: "20px",
        }}
      >
        <input
          placeholder="Search Store Name"
          value={searchName}
          onChange={(e) =>
            setSearchName(
              e.target.value
            )
          }
        />

        <input
          placeholder="Search Address"
          value={
            searchAddress
          }
          onChange={(e) =>
            setSearchAddress(
              e.target.value
            )
          }
        />
      </div>

      <table
        border="1"
        cellPadding="10"
        style={{
          width: "100%",
          borderCollapse:
            "collapse",
        }}
      >
        <thead>
          <tr>
            <th>
              Store Name
            </th>

            <th>
              Address
            </th>

            <th>
              Overall Rating
            </th>

            <th>
              My Rating
            </th>

            <th>
              Action
            </th>
          </tr>
        </thead>

        <tbody>
          {filteredStores.map(
            (store) => (
              <tr
                key={store.id}
              >
                <td>
                  {store.name}
                </td>

                <td>
                  {
                    store.address
                  }
                </td>

                <td>
                  {
                    store.overallRating
                  }
                </td>

                <td>
                  {store.userRating ??
                    "Not Rated"}
                </td>

                <td>
                  <button
                    onClick={() =>
                      handleRating(
                        store
                      )
                    }
                  >
                    {store.userRating ===
                    null
                      ? "Submit Rating"
                      : "Modify Rating"}
                  </button>
                </td>
              </tr>
            )
          )}
        </tbody>
      </table>
    </div>
  );
}

export default UserDashboard;