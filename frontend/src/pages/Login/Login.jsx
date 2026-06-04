import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";

import { loginUser } from "../../services/authService";

import styles from "./Login.module.css";

function Login() {
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onSubmit = async (data) => {
    try {
      const response =
        await loginUser(data);

      const { token, user } =
        response.data;

      localStorage.setItem(
        "token",
        token
      );

      localStorage.setItem(
        "user",
        JSON.stringify(user)
      );

      if (user.role === "ADMIN") {
        navigate("/admin");
      } else if (
        user.role === "USER"
      ) {
        navigate("/user");
      } else if (
        user.role === "STORE_OWNER"
      ) {
        navigate("/owner");
      }

    } catch (error) {
      alert(
        error.response?.data?.message ||
        "Login Failed"
      );
    }
  };

  return (
    <div className={styles.container}>
      <div className={styles.card}>
        <h2>Login</h2>

        <form onSubmit={handleSubmit(onSubmit)}>
          <input
            type="email"
            placeholder="Email"
            {...register("email", {
              required: "Email is required",
            })}
          />

          {errors.email && (
            <p className={styles.error}>
              {errors.email.message}
            </p>
          )}

          <input
            type="password"
            placeholder="Password"
            {...register("password", {
              required:
                "Password is required",
            })}
          />

          {errors.password && (
            <p className={styles.error}>
              {errors.password.message}
            </p>
          )}

          <button type="submit">
            Login
          </button>
        </form>
      </div>
    </div>
  );
}

export default Login;