import axios from "axios";
import { base_url } from "../../utils/base_url";
import config from "../../utils/axiosconfig";

const getProducts = async () => {
  const res = await axios.get(`${base_url}product/`);
  return res.data;
};
const createProduct = async (product) => {
  const res = await axios.post(`${base_url}product/`, product, config);
  return res.data;
};
const productService = {
  getProducts,
  createProduct,
};

export default productService;
