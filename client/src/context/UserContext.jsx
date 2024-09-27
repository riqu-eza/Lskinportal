/* eslint-disable react/prop-types */
import { createContext, useContext, useState, useEffect } from 'react';

// Create the UserContext
const UserContext = createContext();

// Custom hook to use the UserContext
// eslint-disable-next-line react-refresh/only-export-components
export const useUser = () => {
  return useContext(UserContext);
};

// UserProvider component
export const UserProvider = ({ children }) => {
  const [currentUser, setCurrentUser] = useState(null); // For user info
  const [loading, setLoading] = useState(true); // To manage loading state

  // Function to decode JWT
  const decodeJwt = (token) => {
    const payload = token.split('.')[1];
    const decodedPayload = atob(payload.replace(/-/g, '+').replace(/_/g, '/'));
    return JSON.parse(decodedPayload);
  };

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) {
      setLoading(false);
      return;
    }

    const decodedToken = decodeJwt(token);
    const currentTime = Date.now() / 1000; // Current time in seconds

    // Check for token expiration
    if (decodedToken.exp < currentTime) {
      localStorage.removeItem("token"); // Remove expired token
      setCurrentUser(null); // Reset user state
      setLoading(false);
      return;
    }

    const fetchUserData = async () => {
      try {
        const response = await fetch("http://localhost:3003/api/user/profile", {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        });

        if (!response.ok) {
          throw new Error("Failed to fetch user data");
        }

        const data = await response.json();
        setCurrentUser(data); // Set user data
      } catch (error) {
        console.error("Error fetching user data:", error);
      } finally {
        setLoading(false); // Stop loading
      }
    };

    fetchUserData();
  }, []);

  return (
    <UserContext.Provider value={{ currentUser, loading }}>
      {children}
    </UserContext.Provider>
  );
};
