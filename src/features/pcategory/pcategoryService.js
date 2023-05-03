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
const pCategoryService = {
  getProductCategories,
  createpCategory,
};

export default pCategoryService;
