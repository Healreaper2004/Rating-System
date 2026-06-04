import { Link, useNavigate } from "react-router-dom";
import styles from "./Navbar.module.css";

function Navbar() {
  const navigate = useNavigate();

  const user = JSON.parse(
    localStorage.getItem("user")
  );

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");

    navigate("/");
  };

  return (
    <nav className={styles.navbar}>
      <div className={styles.logo}>
        Store Rating System
      </div>

      <div className={styles.links}>
        {!user ? (
          <>
            <Link to="/">Login</Link>

            <Link to="/register">
              Register
            </Link>
          </>
        ) : (
          <>
            <span>{user.role}</span>

            <button
              onClick={handleLogout}
            >
              Logout
            </button>
          </>
        )}
      </div>
    </nav>
  );
}

export default Navbar;