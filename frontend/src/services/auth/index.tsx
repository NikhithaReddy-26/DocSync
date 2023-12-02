import { SUCCESS_CODE } from "../../utils/constants";
import { LoginRequest, UserRequest } from "../../utils/dto";
import API from "../api";


export const getUsersByEmail = async (email: string) => {
  try {
    const response = await API.get(`/users?email=${email}`);
    return response.data;
  } catch (error) {
    console.error("Error fetching users:", error);
    throw error;
  }
};
export const registerUser = async (user: UserRequest) => {
  try {
    const UserData = await API.post(`/users/register`, {
      ...user,
    });
    return UserData.data;
  } catch (err) {
    console.error("Error posting users:", err);
  }
};

export const updatePassword = async (
  email: string,
  updatedPassword: string
) => {
  const request = { password: updatedPassword };
  try {
    const response = await API.patch(`/users/email/${email}`, request);
    return response.data;
  } catch (err) {
    console.error("Error posting users:", err);
  }
};

export const getUsersByIds = async (userIds: string[]) => {
  try {
    const query = userIds.map((id) => `id=${id}`).join("&");
    const response = await API.get(`/users?${query}`);
    return response.data.users;
  } catch (err) {
    console.error("Error posting users:", err);
  }
};

/*
 *   Get all users
 */
export const getAllUsers = async () => {
  try {
    const response = await API.get("/users");
    return response.data.users;
  } catch (err) {
    console.error("Error getting users:", err);
  }
};

export const login = async (email: string, password: string) => {
  try {
    const request: LoginRequest = {
      email: email,
      password: password,
    };
    const response = await API.post("/users/login", request);
    if (response.status === SUCCESS_CODE) {
      sessionStorage.setItem("isAuthenticated", "true");
    }
    return response.data;
  } catch (err) {
    console.error("Error getting users:", err);
    throw err;
  }
};

/*
 *   validate email exists or not
 */
export const validateEmail = async (email: String) => {
  try {
    const request = {
      email: email,
    };
    const response = await API.post("/users/validate", request);
    return response.status === 200;
  } catch (err) {
    console.error("Error getting users:", err);
  }
};
