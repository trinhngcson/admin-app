import axios from "axios";
import { base_url } from "../../utils/base_url";
import config from "../../utils/axiosconfig";
const getProductCategories = async (userData) => {
  const res = await axios.get(`${base_url}category/`);
  return res.data;
};
const createpCategory = async (pCategory) => {
  const res = await axios.post(`${base_url}category/`, pCategory, config);
  return res.data;
};
const getPCategory = async (id) => {
  const res = await axios.get(`${base_url}category/${id}`, config);
  return res.data;
};
const updatePCategory = async (category) => {
  const res = await axios.put(
    `${base_url}category/${category.id}`,
    {
      title: category.pCategoryData.title,
    },
    config
  );
  return res.data;
};
const deletePCategory = async (id) => {
  const res = await axios.delete(`${base_url}category/${id}`, config);
  return res.data;
};
const pCategoryService = {
  getProductCategories,
  createpCategory,
  getPCategory,
  updatePCategory,
  deletePCategory,
};

export default pCategoryService;
