import BaseApi from "./BaseApi";

const getAllPosts = () => {
    return BaseApi.get("/posts");
  };
  