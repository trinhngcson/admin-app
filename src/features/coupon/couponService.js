import axios from "axios";
import { base_url } from "../../utils/base_url";
import config from "../../utils/axiosconfig";

const getCoupons = async () => {
  const res = await axios.get(`${base_url}coupon/`, config);
  return res.data;
};
const createCoupon = async (coupon) => {
  const res = await axios.post(`${base_url}coupon/`, coupon, config);
  return res.data;
};
const couponService = {
  getCoupons,
  createCoupon,
};

export default couponService;
