import React, { createContext, useEffect, useState } from "react";
import useAxiosPublic from "../Hooks/useAxiosPublic";

// Creating the AuthContext
export const AuthContext = createContext(null);

const Provider = ({ children }) => {
  const axiosPublic = useAxiosPublic();  // Assuming you have a custom hook for making public API requests
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  // Simulate sign-in and sign-up process
  const signInUser = async (identifier, password) => {
    setLoading(true);
    try {
      // Make API call to log in
      const response = await axiosPublic.post("/users/login", {
        identifier,
        password,
      });

      // Extract the authToken from the response
      const authToken = response.data.data.token;

      // Store the token in localStorage and set the user state
      localStorage.setItem("authToken", authToken);
      setUser({ email: response.data.data.email, authToken }); // Update with actual user data if available
      setLoading(false);

      // Return the full response
      return response;
    } catch (error) {
      setLoading(false);
      // Handle error, maybe throw it to be caught by the caller
      throw error;
    }
  };


  // Log out user
  const logOut = () => {
    setLoading(true);
    localStorage.removeItem("authToken");  // Remove token on logout
    setUser(null);
    setLoading(false);
  };

  // Check for authToken in localStorage when component mounts
  useEffect(() => {
    const token = localStorage.getItem("authToken");
    if (token) {
      // Simulate retrieving user data based on the token
      setUser({ email: "user@example.com", authToken: token });
    }
    setLoading(false);
  }, []);

  const userInfo = {
    user,
    setUser,
    signInUser,
    logOut,
    loading,
  };

  return <AuthContext.Provider value={userInfo}>{children}</AuthContext.Provider>;
};

export default Provider;
