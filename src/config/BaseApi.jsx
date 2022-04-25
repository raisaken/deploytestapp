import axios from "axios";

// const baseURL = "https://django-posts.herokuapp.com/api/";

const baseURL = "http://127.0.0.1:8000/api/";

const BaseApi = axios.create({
  baseURL: baseURL,
  timeout: 5000,
  headers: {
    Authorization: localStorage.getItem("access_token")
      ? "JWT " + localStorage.getItem("access_token")
      : null,
    "Content-Type": "application/json",
    accept: "application/json",
  },
});



export default BaseApi;
