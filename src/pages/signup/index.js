import Link from "next/link";
import { useRouter } from "next/router";
import React, { useState, useEffect } from "react";

function Signup() {
  const router = useRouter();
  const [credentials, setCredentials] = useState({
    name: "",
    email: "",
    password: "",
    geolocation: "",
  });
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    // Check if the user is already logged in by checking localStorage
    const token = localStorage.getItem("token");
    if (token) {
      setIsLoggedIn(true);
    }
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch("/api/userSignUp", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name: credentials.name,
          email: credentials.email,
          password: credentials.password,
          location: credentials.geolocation,
        }),
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const res = await response.json();
      console.log("API Response:", res);

      if (res.success) {
        localStorage.setItem("token", res.authToken);
        localStorage.setItem("userEmail", credentials.email);
        localStorage.setItem("isAdmin", false);
        setIsLoggedIn(true); // Set isLoggedIn to true after signup success
        router.push("/");
      } else {
        alert(res.message || "There is something wrong. Please try again.");
        
      }
    } catch (error) {
      console.error("Submission error:", error);
      alert("An unexpected error occurred. Please try again.");
    }
  };

  const handleChange = (e) => {
    setCredentials({ ...credentials, [e.target.name]: e.target.value });
  };

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("userEmail");
    localStorage.removeItem("isAdmin");
    setIsLoggedIn(false);
    router.push("/login");
  };

  return (
    <div
      style={{
        height: "90vh",
        backgroundImage:
          'url("https://images.pexels.com/photos/1565982/pexels-photo-1565982.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1")',
        backgroundSize: "cover",
      }}
      className="flex justify-center items-center"
    >
      <div className="container w-full max-w-md">
        {!isLoggedIn ? (
          <form
            onSubmit={handleSubmit}
            className="bg-gray-100 dark:bg-gray-900 dark:text-gray-100 border-gradient rounded-lg shadow-2xl px-8 pt-6 pb-8 mb-4"
          >
            <div className="mb-4">
              <label
                htmlFor="name"
                className="block text-gray-700 dark:text-gray-300 text-sm font-bold mb-2"
              >
                Name
              </label>
              <input
                placeholder="Enter your name"
                name="name"
                onChange={handleChange}
                type="text"
                required
                className="shadow appearance-none border border-gray-300 rounded w-full py-2 px-3 focus:border-indigo-700 text-gray-700 dark:text-gray-100 leading-tight focus:outline-none focus:shadow-outline"
                value={credentials.name}
              />
            </div>
            <div className="mb-4">
              <label
                htmlFor="email"
                className="block text-gray-700 dark:text-gray-300 text-sm font-bold mb-2"
              >
                Email
              </label>
              <input
                placeholder="Enter your email"
                name="email"
                onChange={handleChange}
                type="email"
                required
                className="shadow appearance-none border border-gray-300 rounded w-full py-2 px-3 focus:border-indigo-700 text-gray-700 dark:text-gray-100 leading-tight focus:outline-none focus:shadow-outline"
                value={credentials.email}
              />
            </div>
            <div className="mb-4">
              <label
                htmlFor="password"
                className="block text-gray-700 dark:text-gray-300 text-sm font-bold mb-2"
              >
                Password
              </label>
              <input
                placeholder="*******"
                onChange={handleChange}
                name="password"
                required
                type="password"
                className="shadow appearance-none border border-gray-300 rounded w-full py-2 px-3 focus:border-indigo-700 text-gray-700 dark:text-gray-100 leading-tight focus:outline-none focus:shadow-outline"
                value={credentials.password}
              />
            </div>
            <div className="mb-4">
              <label
                htmlFor="geolocation"
                className="block text-gray-700 dark:text-gray-300 text-sm font-bold mb-2"
              >
                Address
              </label>
              <input
                placeholder="Enter your address"
                onChange={handleChange}
                name="geolocation"
                required
                type="text"
                className="shadow appearance-none border border-gray-300 rounded w-full py-2 px-3 focus:border-indigo-700 text-gray-700 dark:text-gray-100 leading-tight focus:outline-none focus:shadow-outline"
                value={credentials.geolocation}
              />
            </div>
            <div className="flex items-center justify-between">
              <button
                type="submit"
                className="border font-bold text-gray-900 dark:text-gray-100 dark:border-gray-400 border-gray-900 rounded p-2 mr-2 hover:bg-gradient-to-r from-indigo-700 via-violet-700 to-orange-700 hover:text-gray-100"
              >
                Signup
              </button>
              <Link href="/login" passHref>
                <button className="border text-gray-900 dark:text-gray-100 font-bold dark:border-gray-400 border-gray-900 rounded mr-2 p-2 hover:bg-gradient-to-r from-indigo-700 via-violet-700 to-orange-700 hover:text-gray-100">
                  Already a user?
                </button>
              </Link>
            </div>
          </form>
        ) : (
          <button
            onClick={handleLogout}
            className="border font-bold text-gray-900 dark:text-gray-100 dark:border-gray-400 border-gray-900 rounded p-2 hover:bg-gradient-to-r from-indigo-700 via-violet-700 to-orange-700 hover:text-gray-100"
          >
            Logout
          </button>
        )}
      </div>
    </div>
  );
}

export default Signup;
