import { useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../api/axios";

function Login() {
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = async (e) => {
    e.preventDefault();

    // Form Data (OAuth2PasswordRequestForm ke liye)
    const formData = new URLSearchParams();
    formData.append("username", email);
    formData.append("password", password);

    try {
      const response = await api.post(
        "/auth/login",
        formData,
        {
          headers: {
            "Content-Type": "application/x-www-form-urlencoded",
          },
        }
      );

      console.log(response.data);

      // Token Save
      localStorage.setItem(
        "token",
        response.data.access_token
      );

      // Role Save
      localStorage.setItem(
        "role",
        response.data.role
      );

      alert("Login Successful");
      console.log(response.data);
      console.log("Role:", response.data.role);
      console.log("Token:", response.data.access_token);

      // Role Based Redirect
      switch (response.data.role) {
        case "Admin":
          navigate("/admin/dashboard");
          break;

        case "Teacher":
          navigate("/teacher/dashboard");
          break;

        case "Student":
          navigate("/student/dashboard");
          break;

        case "Parent":
          navigate("/parent/dashboard");
          break;

        default:
          navigate("/");
      }

    } catch (error) {

      console.log(error);

      if (error.response) {
        alert(error.response.data.detail);
      } else {
        alert("Server Error");
      }

    }
  };

  return (
    <div className="container mt-5">

      <div className="row justify-content-center">

        <div className="col-md-4">

          <div className="card shadow">

            <div className="card-body">

              <h2 className="text-center mb-4">
                Login
              </h2>

              <form onSubmit={handleLogin}>

                <div className="mb-3">

                  <label className="form-label">
                    Email
                  </label>

                  <input
                    type="email"
                    className="form-control"
                    placeholder="Enter Email"
                    value={email}
                    onChange={(e) =>
                      setEmail(e.target.value)
                    }
                    required
                  />

                </div>

                <div className="mb-3">

                  <label className="form-label">
                    Password
                  </label>

                  <input
                    type="password"
                    className="form-control"
                    placeholder="Enter Password"
                    value={password}
                    onChange={(e) =>
                      setPassword(e.target.value)
                    }
                    required
                  />

                </div>

                <button
                  type="submit"
                  className="btn btn-primary w-100"
                >
                  Login
                </button>

              </form>

            </div>

          </div>

        </div>

      </div>

    </div>
  );
}

export default Login;