import { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function Login() {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  const users = [
    { email: "teraBaap.com", password: "password123" },
    { email: "TearFufa.com", password: "userpass" },
    { email: "PagalYaar.com", password: "admin123" },
  ];

  const handleLogin = () => {
    if (!email || !password) {
      setError("Please enter both email and password.");
      return;
    }

    const user = users.find((u) => u.email === email && u.password === password);
    if (user) {
      setIsLoggedIn(true);
      sessionStorage.setItem("user_token", JSON.stringify(user));
      navigate("/");
      setError("");
    } else {
      setError("Invalid email or password.");
    }
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-100">
      <div className="bg-white p-8 rounded-2xl shadow-lg w-full max-w-md border border-gray-200">
        {isLoggedIn ? (
          <div className="text-center">
            <h2 className="text-2xl font-bold text-green-600">Welcome!</h2>
            <p className="text-gray-700 mt-2">You are successfully logged in.</p>
          </div>
        ) : (
          <div>
            <h2 className="text-2xl font-semibold text-center text-gray-800 mb-6">Login</h2>
            {error && <p className="text-red-500 text-sm text-center mb-4">{error}</p>}
            <div className="mb-4">
              <input
                type="email"
                placeholder="Email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400 transition-all duration-200"
              />
            </div>
            <div className="mb-4">
              <input
                type="password"
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400 transition-all duration-200"
              />
            </div>
            <button
              onClick={handleLogin}
              className="w-full bg-blue-500 hover:bg-blue-600 text-white font-semibold p-3 rounded-lg shadow-md transition duration-300"
            >
              Login
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
