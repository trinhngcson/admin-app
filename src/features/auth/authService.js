import axios from "axios";
import { base_url } from "../../utils/base_url";
import config from "../../utils/axiosconfig";
const login = async (userData) => {
  const res = await axios.post(`${base_url}user/admin-login`, userData);
  if (res.data) {
    localStorage.setItem("user", JSON.stringify(res.data));
  }
  return res.data;
};
const getOrders = async (userData) => {
  const res = await axios.get(`${base_url}user/getallorders`, config);
  return res.data;
};
const authService = {
  login,
  getOrders,
};

export default authService;
