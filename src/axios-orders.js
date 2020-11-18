import axios from "axios";

const instance = axios.create({
  baseURL: "https://burgers-on-you.firebaseio.com/",
});

export default instance;
