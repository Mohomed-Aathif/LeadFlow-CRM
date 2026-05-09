import { useState } from "react";

import { useNavigate } from "react-router-dom";

import toast from "react-hot-toast";

import api from "../../api/axios";

import { useAuth } from "../../context/AuthContext";

function LoginPage() {
  const navigate = useNavigate();

  const { login } = useAuth();

  const [email, setEmail] = useState(
    "admin@example.com"
  );

  const [password, setPassword] = useState(
    "password123"
  );

  const [error, setError] = useState("");

  const [loading, setLoading] = useState(false);

  const handleLogin = async (
    e: React.FormEvent
  ) => {
    e.preventDefault();

    try {
      setLoading(true);

      setError("");

      const response = await api.post(
        "/auth/login",
        {
          email,
          password,
        }
      );

      login(
        response.data.token,
        response.data.user
      );

      toast.success("Login successful");

      navigate("/dashboard");
    } catch (error: any) {
      setError(
        error.response?.data?.message ||
          "Login failed"
      );

      toast.error("Login failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-slate-100">
      <div className="bg-white p-8 rounded-2xl shadow-lg w-full max-w-md">
        <div className="mb-8 text-center">
          <h1 className="text-3xl font-bold text-blue-600">
            LeadFlow CRM
          </h1>

          <p className="text-gray-500 mt-2">
            Login to continue
          </p>
        </div>

        <form
          onSubmit={handleLogin}
          className="space-y-5"
        >
          <div>
            <label className="block mb-2 text-sm font-medium">
              Email
            </label>

            <input
              type="email"
              value={email}
              onChange={(e) =>
                setEmail(e.target.value)
              }
              className="w-full border rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          <div>
            <label className="block mb-2 text-sm font-medium">
              Password
            </label>

            <input
              type="password"
              value={password}
              onChange={(e) =>
                setPassword(e.target.value)
              }
              className="w-full border rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          {error && (
            <div className="text-red-500 text-sm">
              {error}
            </div>
          )}

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-blue-600 text-white py-3 rounded-lg hover:bg-blue-700 transition"
          >
            {loading
              ? "Logging in..."
              : "Login"}
          </button>
        </form>
      </div>
    </div>
  );
}

export default LoginPage;