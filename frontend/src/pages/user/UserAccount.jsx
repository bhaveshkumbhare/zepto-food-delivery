import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { backendURL } from "utils/exportable";

export const UserAccount = () => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    const storedUser = JSON.parse(localStorage.getItem("user"));
    if (!storedUser || !storedUser.userId) {
      setError("No user found. Please log in again.");
      setLoading(false);
      return;
    }

    const fetchUser = async () => {
      try {
        const response = await fetch(`${backendURL}/user/${storedUser.userId}`);
        const data = await response.json();

        if (!response.ok) {
          setError(data.error || "Failed to load user data");
        } else {
          setUser(data);
        }
      } catch (err) {
        setError("Server error. Please try again.");
      } finally {
        setLoading(false);
      }
    };

    fetchUser();
  }, []);

  // 🔹 Logout function
  const handleLogout = () => {
    localStorage.removeItem("isAuthenticated");
    localStorage.removeItem("user");
    navigate("/login"); // redirect to login page
  };

  if (loading) return <p>Loading user info...</p>;
  if (error) return <p className="text-red-500">{error}</p>;

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="bg-card rounded-lg shadow-soft p-4 mb-6">
        <h2 className="text-3xl font-bold mb-4">User Account</h2>
        <div className="flex flex-col items-start gap-3">
          <p><strong>Full Name:</strong> {user?.fullName}</p>
          <p><strong>Email:</strong> {user?.email}</p>
          <p><strong>Phone:</strong> {user?.phone}</p>
        </div>

        <div className="flex items-center justify-start gap-2">
          <a
            href="/"
            className="mt-5 inline-flex items-center justify-center whitespace-nowrap text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 bg-primary text-primary-foreground hover:bg-primary/90 h-9 rounded-md px-3"
          >
            Back to Home
          </a>
          <button
            onClick={handleLogout}
            className="mt-5 inline-flex items-center justify-center whitespace-nowrap text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 bg-red-500 text-white hover:bg-red-600 h-9 rounded-md px-3"
          >
            Logout
          </button>
        </div>
      </div>
    </div>
  );
};
