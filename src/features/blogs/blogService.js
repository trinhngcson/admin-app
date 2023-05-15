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
const getBlogById = async (id) => {
  const res = await axios.get(`${base_url}blog/${id}`, config);
  return res.data;
};
const updateBlog = async (blog) => {
  const res = await axios.put(
    `${base_url}blog/${blog.id}`,
    {
      title: blog.blogData.title,
      description: blog.blogData.description,
      category: blog.blogData.category,
      images: blog.blogData.images,
    },
    config
  );
  return res.data;
};
const deleteBlog = async (id) => {
  const res = await axios.delete(`${base_url}blog/${id}`, config);
  return res.data;
};
const blogService = {
  getBlogs,
  createBlog,
  getBlogById,
  updateBlog,
  deleteBlog,
};

export default blogService;
