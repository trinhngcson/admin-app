import axios from "axios";
import { base_url } from "../../utils/base_url";
import config from "../../utils/axiosconfig";

const getBlogs = async () => {
  const res = await axios.get(`${base_url}blog/`);
  return res.data;
};
const createBlog = async (blog) => {
  const res = await axios.post(`${base_url}blog/`, blog, config);
  return res.data;
};
const blogService = {
  getBlogs,
  createBlog,
};

export default blogService;
