import axios from "axios";

const service = axios.create({
  baseURL: process.env.REACT_APP_BACKEND_URL || "http://localhost:8080",
  withCredentials: true,
});

function errorHandler(error) {
  if (error.response.data) {
    console.log(error.response, error.response.data);
    throw error;
  }
  throw error;
}

const APIHandler = {
  ...service,
  async isLoggedIn() {
    try {
      const { data } = await service.get("/api/is-loggedin");
      return data;
    } catch (e) {
      errorHandler(e);
    }
  },
};
export default APIHandler;
