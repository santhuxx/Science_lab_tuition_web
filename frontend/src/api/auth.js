import axios from "axios";

const API_URL = "http://localhost:4000/api";  // Update this URL to your production server once deployed

export const signupUser = async (userData) => {
  try {
    const response = await axios.post("http://localhost:4000/api/auth/signup", userData);
    return response; // Return response if signup is successful
  } catch (error) {
    throw error; // Throw error to be caught in the SignupPopup component
  }
};

