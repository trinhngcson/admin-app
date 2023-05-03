import axios from "axios";
import { base_url } from "../../utils/base_url";

const getEnquiries = async (userData) => {
  const res = await axios.get(`${base_url}enquiry/`);
  return res.data;
};
const enquiryService = {
  getEnquiries,
};

export default enquiryService;
