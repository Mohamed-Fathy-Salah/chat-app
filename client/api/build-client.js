import axios from "axios";

const buildClient = ({ req }) => {
  if (typeof window === "undefined") {
    // We are on the server

    return axios.create({
      baseURL:
        //"put domain name here instead"
        "http://localhost:3001/api",
      headers: req.headers,
    });
  } else {
    // We must be on the browser
    return axios.create({
      baseURL: "http://localhost:3001/api",
    });
  }
};

export default buildClient;
