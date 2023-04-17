import axios from "axios";
import { base_url } from "../../utils/base_url";

const login = async (userData) => {
  const res = await axios.post(`${base_url}user/admin-login`, userData);
  console.log(res);
};
const authService = {
  login,
};

export default authService;
