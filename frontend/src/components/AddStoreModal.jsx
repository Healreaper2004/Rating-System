import { useEffect, useState } from "react";

import {
  createStore,
  getUsers,
} from "../services/adminService";

function AddStoreModal({
  isOpen,
  onClose,
  onSuccess,
}) {
  const [owners, setOwners] =
    useState([]);

  const [formData, setFormData] =
    useState({
      name: "",
      email: "",
      address: "",
      ownerId: "",
    });

  useEffect(() => {
    if (isOpen) {
      loadOwners();
    }
  }, [isOpen]);

  const loadOwners = async () => {
    try {
      const response =
        await getUsers();

      const storeOwners =
        response.data.users.filter(
          (user) =>
            user.role ===
            "STORE_OWNER"
        );

      setOwners(storeOwners);
    } catch (error) {
      console.log(error);
    }
  };

  const handleSubmit = async (
    e
  ) => {
    e.preventDefault();

    try {
      await createStore(formData);

      alert(
        "Store created successfully"
      );

      onSuccess();
      onClose();

      setFormData({
        name: "",
        email: "",
        address: "",
        ownerId: "",
      });
    } catch (error) {
      console.error(error);

      alert(
        error.response?.data
          ?.message ||
          "Failed to create store"
      );
    }
  };

  if (!isOpen) return null;

  return (
    <div className="modal-overlay">
      <div className="modal">
        <h2>Add Store</h2>

        <form
          onSubmit={
            handleSubmit
          }
        >
          <input
            type="text"
            placeholder="Store Name"
            value={
              formData.name
            }
            onChange={(e) =>
              setFormData({
                ...formData,
                name:
                  e.target.value,
              })
            }
            required
          />

          <input
            type="email"
            placeholder="Email"
            value={
              formData.email
            }
            onChange={(e) =>
              setFormData({
                ...formData,
                email:
                  e.target.value,
              })
            }
            required
          />

          <textarea
            placeholder="Address"
            value={
              formData.address
            }
            onChange={(e) =>
              setFormData({
                ...formData,
                address:
                  e.target.value,
              })
            }
            required
          />

          <select
            value={
              formData.ownerId
            }
            onChange={(e) =>
              setFormData({
                ...formData,
                ownerId:
                  e.target.value,
              })
            }
            required
          >
            <option value="">
              Select Owner
            </option>

            {owners.map(
              (owner) => (
                <option
                  key={
                    owner.id
                  }
                  value={
                    owner.id
                  }
                >
                  {owner.name}
                </option>
              )
            )}
          </select>

          <div
            style={{
              display: "flex",
              gap: "10px",
              marginTop: "15px",
            }}
          >
            <button type="submit">
              Add Store
            </button>

            <button
              type="button"
              onClick={onClose}
            >
              Cancel
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default AddStoreModal;