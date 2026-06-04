import { useEffect, useState } from "react";

import {
  getOwnerDashboard,
} from "../../services/ownerService";

import {
  changePassword,
} from "../../services/userService";

function OwnerDashboard() {
  const [dashboard, setDashboard] =
    useState(null);

  const [
    showPasswordForm,
    setShowPasswordForm,
  ] = useState(false);

  const [oldPassword, setOldPassword] =
    useState("");

  const [newPassword, setNewPassword] =
    useState("");

  useEffect(() => {
    loadDashboard();
  }, []);

  const loadDashboard = async () => {
    try {
      const response =
        await getOwnerDashboard();

      setDashboard(response.data);
    } catch (error) {
      console.log(error);
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

        setShowPasswordForm(false);
      } catch (error) {
        alert(
          error.response?.data
            ?.message ||
            "Failed to update password"
        );
      }
    };

  if (!dashboard)
    return <h2>Loading...</h2>;

  return (
    <div
      style={{
        padding: "20px",
      }}
    >
      <h1>
        Store Owner Dashboard
      </h1>

      <button
        onClick={() =>
          setShowPasswordForm(
            !showPasswordForm
          )
        }
      >
        Change Password
      </button>

      {showPasswordForm && (
        <form
          onSubmit={
            handlePasswordChange
          }
          style={{
            marginTop: "15px",
            display: "flex",
            gap: "10px",
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

      <hr />

      <h2>
        {dashboard.storeName}
      </h2>

      <div
        style={{
          display: "flex",
          gap: "20px",
          marginTop: "20px",
          flexWrap: "wrap",
        }}
      >
        <div
          style={{
            border:
              "1px solid #ddd",
            padding: "20px",
            width: "220px",
          }}
        >
          <h3>
            Average Rating
          </h3>

          <h1>
            {
              dashboard.averageRating
            }
          </h1>
        </div>

        <div
          style={{
            border:
              "1px solid #ddd",
            padding: "20px",
            width: "220px",
          }}
        >
          <h3>
            Total Ratings
          </h3>

          <h1>
            {
              dashboard.totalRatings
            }
          </h1>
        </div>

        <div
          style={{
            border:
              "1px solid #ddd",
            padding: "20px",
            width: "220px",
          }}
        >
          <h3>
            Users Rated
          </h3>

          <h1>
            {
              dashboard.ratings
                .length
            }
          </h1>
        </div>
      </div>

      <hr />

      <h2>
        Users Who Rated My Store
      </h2>

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
            <th>Name</th>
            <th>Email</th>
            <th>Rating</th>
          </tr>
        </thead>

        <tbody>
          {dashboard.ratings.map(
            (item) => (
              <tr
                key={
                  item.userId
                }
              >
                <td>
                  {
                    item.userName
                  }
                </td>

                <td>
                  {
                    item.userEmail
                  }
                </td>

                <td>
                  {item.rating}
                </td>
              </tr>
            )
          )}
        </tbody>
      </table>
    </div>
  );
}

export default OwnerDashboard;