import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";

import styles from "./Register.module.css";
import { passwordRegex } from "../../utils/validators";

import { registerUser } from "../../services/authService";

function Register() {
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onSubmit = async (data) => {
    try {
      await registerUser(data);

      alert("Registration Successful");

      navigate("/");
    } catch (error) {
      alert(
        error.response?.data?.message ||
          "Registration Failed"
      );
    }
  };

  return (
    <div className={styles.container}>
      <div className={styles.card}>
        <h2>Register</h2>

        <form onSubmit={handleSubmit(onSubmit)}>
          <input
            placeholder="Full Name"
            {...register("name", {
              required: "Name is required",
              minLength: {
                value: 20,
                message:
                  "Name must be at least 20 characters",
              },
              maxLength: {
                value: 60,
                message:
                  "Name cannot exceed 60 characters",
              },
            })}
          />

          {errors.name && (
            <p className={styles.error}>
              {errors.name.message}
            </p>
          )}

          <input
            placeholder="Email"
            {...register("email", {
              required: "Email is required",
              pattern: {
                value:
                  /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                message: "Invalid Email",
              },
            })}
          />

          {errors.email && (
            <p className={styles.error}>
              {errors.email.message}
            </p>
          )}

          <textarea
            placeholder="Address"
            {...register("address", {
              required: "Address required",
              maxLength: {
                value: 400,
                message:
                  "Address max length is 400",
              },
            })}
          />

          {errors.address && (
            <p className={styles.error}>
              {errors.address.message}
            </p>
          )}

          <input
            type="password"
            placeholder="Password"
            {...register("password", {
              required: "Password required",
              pattern: {
                value: passwordRegex,
                message:
                  "8-16 chars, uppercase and special char required",
              },
            })}
          />

          {errors.password && (
            <p className={styles.error}>
              {errors.password.message}
            </p>
          )}

          <button type="submit">
            Register
          </button>
        </form>
      </div>
    </div>
  );
}

export default Register;