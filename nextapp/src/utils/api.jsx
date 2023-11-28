import axios from "axios";

const API_URL = "http://localhost:5001/";

const axiosInstance = axios.create({
  baseURL: API_URL,
  timeout: 5000,
  headers: {
    "Content-Type": "application/json",
    Accept: "application/json",
  },
});

axiosInstance.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("token");
    if (token) {
      config.headers["Authorization"] = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

axiosInstance.interceptors.response.use((response) => {
  return response;
});

const login = async ({ email, password }) => {
  try {
    const response = await axiosInstance.post("login", {
      email,
      password,
    });
    if (response.status === 200) {
      if (response.data.token) {
        localStorage.setItem("token", response.data.token);
      }
      return true;
    } else {
      return false;
    }
  } catch (error) {
    return false;
  }
};

const register = async ({ firstname, lastname, email, password }) => {
  try {
    const response = await axiosInstance.post("register", {
      firstname,
      lastname,
      email,
      password,
    });
    if (response.data.success) {
      return true;
    } else {
      return false;
    }
  } catch (error) {
    return false;
  }
};

const logout = () => {
  localStorage.removeItem("token");
  return true;
};

const createEntry = async ({ title, description, username, password, url }) => {
  try {
    const response = await axiosInstance.post("createEntry", {
      title,
      description,
      username,
      password,
      url,
    });
    if (response.data.success) {
      return true;
    } else {
      return false;
    }
  } catch (error) {
    return false;
  }
};

const getEntries = async () => {
  try {
    const response = await axiosInstance.get("entries");
    if (response.data.success) {
      return response.data.entries;
    } else {
      return false;
    }
  } catch (error) {
    return false;
  }
};

const getEntry = async ({ id }) => {
  try {
    const response = await axiosInstance.get(`entries/${id}`);
    if (response.data.success) {
      return response.data.entry;
    } else {
      return false;
    }
  } catch (error) {
    return false;
  }
};

const updateEntry = async ({
  id,
  title,
  description,
  username,
  password,
  url,
}) => {
  try {
    const response = await axiosInstance.put(`entries/${id}`, {
      title,
      description,
      username,
      password,
      url,
    });
    if (response.data.success) {
      return true;
    } else {
      return false;
    }
  } catch (error) {
    return false;
  }
};

const deleteEntry = async ({ id }) => {
  try {
    const response = await axiosInstance.delete(`entries/${id}`);
    if (response.data.success) {
      return true;
    } else {
      return false;
    }
  } catch (error) {
    return false;
  }
};

const api = {
  login,
  register,
  logout,
  createEntry,
  getEntries,
  getEntry,
  updateEntry,
  deleteEntry,
};

export default api;
