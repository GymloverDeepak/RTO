import { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function Login() {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [ip, setIp] = useState("");
  const users = [
    { email: "gymloverhu", password: "gymlover" },
    { email: "gymloverdeepak", password: "gymlover" },
    { email: "shiv", password: "shivji" },
  ];

  const handleLogin = () => {
    fetch('https://api.ipify.org?format=json')
    .then(res => res.json())
    .then(data => {
      setIp(data.ip);
      alert("Welcome Dude : " + data.ip);
    })
    
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
    <div className="flex justify-center items-center min-h-screen bg-gradient-to-br from-blue-200 to-indigo-300">
    <div className="bg-white p-8 rounded-2xl shadow-xl w-full max-w-md border border-gray-200">
      {isLoggedIn ? (
        <div className="text-center">
          <h2 className="text-3xl font-bold text-green-600">Welcome!</h2>
          <p className="text-gray-700 mt-2">You are successfully logged in.</p>
        </div>
      ) : (
        <div>
          <h2 className="text-3xl font-semibold text-center text-gray-900 mb-6">Login</h2>
          {error && <p className="text-red-500 text-sm text-center mb-4">{error}</p>}
          <div className="mb-4">
            <input
              type="email"
              placeholder="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all duration-200 bg-gray-100 placeholder-gray-500"
            />
          </div>
          <div className="mb-4">
            <input
              type="password"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all duration-200 bg-gray-100 placeholder-gray-500"
            />
          </div>
          <button
            onClick={handleLogin}
            className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold p-3 rounded-lg shadow-lg transition duration-300 transform hover:scale-105"
          >
            Login
          </button>
          <p className="text-center text-gray-600 text-sm mt-4">
            Don't have an account? <a href="#" className="text-blue-500 hover:underline">Sign up</a>
          </p>
          <p className="text-center text-gray-600 text-sm mt-4">
            Kripya phle paise de Phir Login kre  !  ip :- {ip}
          </p>
          <p className="text-center text-gray-600 text-sm mt-4">
            Welcome Back ! 
             {/* <a href="#" className="text-blue-500 hover:underline">Sign up</a> */}
          </p>
        </div>
      )}
    </div>
  </div>
  
  );
}
