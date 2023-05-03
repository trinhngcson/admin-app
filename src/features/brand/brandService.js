import axios from "axios";
import { base_url } from "../../utils/base_url";
import config from "../../utils/axiosconfig";

const getBrands = async () => {
  const res = await axios.get(`${base_url}brand/`);
  return res.data;
};
const createBrand = async (brand) => {
  const res = await axios.post(`${base_url}brand/`, brand, config);
  return res.data;
};
const brandService = {
  getBrands,
  createBrand,
};

export default brandService;
