import axios from "axios";
import { base_url } from "../../utils/base_url";
import config from "../../utils/axiosconfig";

const getBlogCategories = async () => {
  const res = await axios.get(`${base_url}blogcategory/`);
  return res.data;
};
const createBCategory = async (bCategory) => {
  const res = await axios.post(`${base_url}blogcategory/`, bCategory, config);
  return res.data;
};
const getBCategory = async (id) => {
  const res = await axios.get(`${base_url}blogcategory/${id}`, config);
  return res.data;
};
const updateBCategory = async (category) => {
  const res = await axios.put(
    `${base_url}blogcategory/${category.id}`,
    {
      title: category.categoryData.title,
    },
    config
  );
  return res.data;
};
const deleteBCategory = async (id) => {
  const res = await axios.delete(`${base_url}blogcategory/${id}`, config);
  return res.data;
};
const bCategoryService = {
  getBlogCategories,
  createBCategory,
  getBCategory,
  updateBCategory,
  deleteBCategory,
};

export default bCategoryService;
