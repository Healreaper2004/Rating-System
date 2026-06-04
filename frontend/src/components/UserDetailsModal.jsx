import { useEffect, useState } from "react";
import { getUserById } from "../services/adminService";

function UserDetailsModal({
  isOpen,
  onClose,
  userId,
}) {
  const [user, setUser] =
    useState(null);

  useEffect(() => {
    if (
      isOpen &&
      userId
    ) {
      fetchUserDetails();
    }
  }, [isOpen, userId]);

  const fetchUserDetails =
    async () => {
      try {
        const response =
          await getUserById(
            userId
          );

        setUser(
          response.data.user
        );
      } catch (error) {
        console.log(error);
      }
    };

  if (!isOpen) return null;

  return (
    <div className="modal-overlay">
      <div className="modal">
        <h2>User Details</h2>

        {user ? (
          <>
            <p>
              <strong>
                Name:
              </strong>{" "}
              {user.name}
            </p>

            <p>
              <strong>
                Email:
              </strong>{" "}
              {user.email}
            </p>

            <p>
              <strong>
                Address:
              </strong>{" "}
              {user.address}
            </p>

            <p>
              <strong>
                Role:
              </strong>{" "}
              {user.role}
            </p>

            {user.role ===
              "STORE_OWNER" && (
              <p>
                <strong>
                  Average Rating:
                </strong>{" "}
                {
                  user.averageRating
                }
              </p>
            )}

            <button
              onClick={
                onClose
              }
            >
              Close
            </button>
          </>
        ) : (
          <p>
            Loading...
          </p>
        )}
      </div>
    </div>
  );
}

export default UserDetailsModal;