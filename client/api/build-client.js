import axios from "axios";

const client = () => {
  return axios.create({
    baseURL: "http://localhost:3001/api",
    withCredentials: true,
  });
};

export default client;
