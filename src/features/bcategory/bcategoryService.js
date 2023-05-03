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
const bCategoryService = {
  getBlogCategories,
  createBCategory,
};

export default bCategoryService;
