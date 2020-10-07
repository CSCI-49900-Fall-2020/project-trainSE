import axios from "axios";

// How to set headers for axios
// https://stackoverflow.com/questions/45578844/how-to-set-header-and-options-in-axios

const setAuthToken = (token) => {
  if (token) {
    axios.defaults.headers.common["x-auth-token"] = token;
  } else {
    delete axios.defaults.headers.common["x-auth-token"];
  }
};

export default setAuthToken;
