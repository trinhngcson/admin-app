import axios from "axios";
import { base_url } from "../../utils/base_url";
import config from "../../utils/axiosconfig";

const getColors = async () => {
  const res = await axios.get(`${base_url}color/`);
  return res.data;
};
const createColor = async (color) => {
  const res = await axios.post(`${base_url}color/`, color, config);
  return res.data;
};
const colorService = {
  getColors,
  createColor,
};

export default colorService;
