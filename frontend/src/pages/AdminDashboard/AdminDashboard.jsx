import { useEffect, useState } from "react";
import AddUserModal from "../../components/AddUserModal";
import UserDetailsModal from "../../components/UserDetailsModal";

import {
  getDashboardStats,
  getUsers,
  getStores,
} from "../../services/adminService";

import AddStoreModal from "../../components/AddStoreModal";

function AdminDashboard() {
  const [stats, setStats] = useState({
    totalUsers: 0,
    totalStores: 0,
    totalRatings: 0,
  });

  const [users, setUsers] = useState([]);
  const [stores, setStores] = useState([]);

  const [searchUser, setSearchUser] =
    useState("");

  const [showAddUserModal, setShowAddUserModal] =
    useState(false);

  const [
    showUserDetails,
    setShowUserDetails,
  ] = useState(false);

  const [
    selectedUserId,
    setSelectedUserId,
  ] = useState(null);

  const [showAddStoreModal, setShowAddStoreModal] =
    useState(false);

  const [searchEmail, setSearchEmail] =
    useState("");

  const [searchAddress, setSearchAddress] =
    useState("");

  const [roleFilter, setRoleFilter] =
    useState("");

  const [sortField, setSortField] =
    useState("name");

  const [sortOrder, setSortOrder] =
    useState("asc");

  const [
    storeSortField,
    setStoreSortField,
  ] = useState("name");

  const [
    storeSortOrder,
    setStoreSortOrder,
  ] = useState("asc");

  useEffect(() => {
    loadStats();
    loadUsers();
    loadStores();
  }, []);

  const loadStats = async () => {
    try {
      const response =
        await getDashboardStats();

      setStats(response.data);
    } catch (error) {
      console.log(error);
    }
  };

  const loadUsers = async () => {
    try {
      const response =
        await getUsers();

      setUsers(response.data.users);
    } catch (error) {
      console.log(error);
    }
  };

  const loadStores = async () => {
    try {
      const response =
        await getStores();

      setStores(response.data.stores);
    } catch (error) {
      console.log(error);
    }
  };

  const filteredUsers = [...users]
    .filter((user) => {
      return (
        user.name
          .toLowerCase()
          .includes(searchUser.toLowerCase()) &&
        user.email
          .toLowerCase()
          .includes(searchEmail.toLowerCase()) &&
        user.address
          .toLowerCase()
          .includes(searchAddress.toLowerCase()) &&
        (roleFilter === "" ||
          user.role === roleFilter)
      );
    })
    .sort((a, b) => {
      const first =
        a[sortField]?.toString() || "";

      const second =
        b[sortField]?.toString() || "";

      return sortOrder === "asc"
        ? first.localeCompare(second)
        : second.localeCompare(first);
    });

    const handleSort = (field) => {
      if (sortField === field) {
        setSortOrder(
          sortOrder === "asc"
            ? "desc"
            : "asc"
        );
      } else {
        setSortField(field);
        setSortOrder("asc");
      }
    };

    const handleStoreSort = (
      field
    ) => {
      if (
        storeSortField === field
      ) {
        setStoreSortOrder(
          storeSortOrder === "asc"
            ? "desc"
            : "asc"
        );
      } else {
        setStoreSortField(field);
        setStoreSortOrder("asc");
      }
    };

  const sortedStores =
  [...stores].sort(
    (a, b) => {
      let first =
        a[
          storeSortField
        ] || "";

      let second =
        b[
          storeSortField
        ] || "";

      if (
        storeSortField ===
        "averageRating"
      ) {
        first =
          Number(first);

        second =
          Number(second);
      }

      if (
        storeSortOrder ===
        "asc"
      ) {
        return first >
          second
          ? 1
          : -1;
      }

      return first <
        second
        ? 1
        : -1;
    }
  );

  return (
    <div
      style={{
        padding: "20px",
      }}
    >
      <h1>
        Admin Dashboard
      </h1>

      {/* Dashboard Cards */}

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
            borderRadius: "10px",
            padding: "20px",
            width: "220px",
            textAlign: "center",
            boxShadow:
              "0px 2px 8px rgba(0,0,0,0.1)",
          }}
        >
          <h3>Total Users</h3>

          <h1>
            {stats.totalUsers}
          </h1>
        </div>

        <div
          style={{
            border:
              "1px solid #ddd",
            borderRadius: "10px",
            padding: "20px",
            width: "220px",
            textAlign: "center",
            boxShadow:
              "0px 2px 8px rgba(0,0,0,0.1)",
          }}
        >
          <h3>
            Total Stores
          </h3>

          <h1>
            {stats.totalStores}
          </h1>
        </div>

        <div
          style={{
            border:
              "1px solid #ddd",
            borderRadius: "10px",
            padding: "20px",
            width: "220px",
            textAlign: "center",
            boxShadow:
              "0px 2px 8px rgba(0,0,0,0.1)",
          }}
        >
          <h3>
            Total Ratings
          </h3>

          <h1>
            {stats.totalRatings}
          </h1>
        </div>
      </div>

      {/* User Management */}

      <hr
        style={{
          marginTop: "40px",
          marginBottom: "20px",
        }}
      />

      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          marginBottom: "20px",
        }}
      >
        <h2>User Management</h2>

        <button
          onClick={() =>
            setShowAddUserModal(true)
          }
        >
          Add User
        </button>
      </div>

      <div
        style={{
          display: "flex",
          gap: "10px",
          marginBottom: "20px",
          flexWrap: "wrap",
        }}
      >
        <input
          placeholder="Search Name"
          value={searchUser}
          onChange={(e) =>
            setSearchUser(e.target.value)
          }
        />

        <input
          placeholder="Search Email"
          value={searchEmail}
          onChange={(e) =>
            setSearchEmail(e.target.value)
          }
        />

        <input
          placeholder="Search Address"
          value={searchAddress}
          onChange={(e) =>
            setSearchAddress(
              e.target.value
            )
          }
        />

        <select
          value={roleFilter}
          onChange={(e) =>
            setRoleFilter(
              e.target.value
            )
          }
        >
          <option value="">
            All Roles
          </option>

          <option value="ADMIN">
            ADMIN
          </option>

          <option value="USER">
            USER
          </option>

          <option value="STORE_OWNER">
            STORE_OWNER
          </option>
        </select>
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
            <th
              onClick={() =>
                handleSort("name")
              }
            >
              Name ↑↓
            </th>

            <th
              onClick={() =>
                handleSort("email")
              }
            >
              Email ↑↓
            </th>

            <th
              onClick={() =>
                handleSort("role")
              }
            >
              Role ↑↓
            </th>

            <th
              onClick={() =>
                handleSort("address")
              }
            >
              Address ↑↓
            </th>
            <th>Action</th>
          </tr>
        </thead>

        <tbody>
          {filteredUsers.map(
            (user) => (
              <tr key={user.id}>
                <td>{user.name}</td>

                <td>{user.email}</td>

                <td>{user.role}</td>

                <td>{user.address}</td>

                <td>
                  <button
                    onClick={() => {
                      setSelectedUserId(
                        user.id
                      );

                      setShowUserDetails(
                        true
                      );
                    }}
                  >
                    View
                  </button>
                </td>
              </tr>
            )
          )}
        </tbody>
      </table>

      {/* Store Management */}

      <hr
        style={{
          marginTop: "40px",
          marginBottom: "20px",
        }}
      />

      <div
        style={{
          display: "flex",
          justifyContent:
            "space-between",
          alignItems: "center",
          marginBottom: "20px",
        }}
      >
        <h2>
          Store Management
        </h2>

        <button
          onClick={() =>
            setShowAddStoreModal(true)
          }
        >
          Add Store
        </button>
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
            <th
              style={{
                cursor:
                  "pointer",
              }}
              onClick={() =>
                handleStoreSort(
                  "name"
                )
              }
            >
              Store Name ↑↓
            </th>

            <th
              style={{
                cursor:
                  "pointer",
              }}
              onClick={() =>
                handleStoreSort(
                  "email"
                )
              }
            >
              Email ↑↓
            </th>

            <th
              style={{
                cursor:
                  "pointer",
              }}
              onClick={() =>
                handleStoreSort(
                  "address"
                )
              }
            >
              Address ↑↓
            </th>

            <th
              style={{
                cursor:
                  "pointer",
              }}
              onClick={() =>
                handleStoreSort(
                  "averageRating"
                )
              }
            >
              Rating ↑↓
            </th>
          </tr>
        </thead>

        <tbody>
          {sortedStores.map(
            (store) => (
              <tr
                key={store.id}
              >
                <td>
                  {store.name}
                </td>

                <td>
                  {store.email}
                </td>

                <td>
                  {
                    store.address
                  }
                </td>

                <td>
                  {Number(
                    store.averageRating || 0
                  ).toFixed(1)}
                </td>
              </tr>
            )
          )}
        </tbody>
      </table>

      <AddUserModal
        isOpen={showAddUserModal}
        onClose={() =>
          setShowAddUserModal(false)
        }
        onUserAdded={loadUsers}
      />

      <AddStoreModal
        isOpen={showAddStoreModal}
        onClose={() =>
          setShowAddStoreModal(
            false
          )
        }
        onSuccess={loadStores}
      />

      <UserDetailsModal
        isOpen={
          showUserDetails
        }
        onClose={() =>
          setShowUserDetails(
            false
          )
        }
        userId={
          selectedUserId
        }
      />
    </div>
  );
}

export default AdminDashboard;