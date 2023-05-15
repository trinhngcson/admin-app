import React, { useEffect } from "react";
import CustomInput from "../components/CustomInput";

import { useDispatch, useSelector } from "react-redux";
import { useLocation, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { useFormik } from "formik";
import * as Yup from "yup";
import {
  createCoupon,
  getCouponById,
  resetState,
  updateCoupon,
} from "../features/coupon/couponSlice";

let schema = Yup.object({
  name: Yup.string().required("Nhập COUPON"),
  expiry: Yup.date().required("Nhập thời hạn"),
  discount: Yup.number().required("Nhập Discount"),
});

const Addcoupon = () => {
  const location = useLocation();
  const couponId = location.pathname.split("/")[3];

  const navigate = useNavigate();
  const dispatch = useDispatch();
  const newCoupon = useSelector((state) => state.coupon);
  const {
    isSuccess,
    isError,
    isLoading,
    createdCoupon,
    couponData,
    couponUpdate,
  } = newCoupon;
  const formatDate = (date) => {
    const newDate = new Date(date).toLocaleDateString("en-GB", {
      year: "numeric",
      month: "2-digit",
      day: "2-digit",
    });
    const [month, day, year] = newDate.split("/");

    return [year, day, month].join("-");
  };
  useEffect(() => {
    if (couponId !== undefined) {
      dispatch(getCouponById(couponId));
    } else {
      resetState();
    }
  }, [couponId]);
  useEffect(() => {
    if (isSuccess && createdCoupon) {
      toast.success("Thêm COUPON thành công!");
    }
    if (isSuccess && couponUpdate) {
      toast.success("Chỉnh sửa COUPON thành công!");
      navigate("/admin/list-coupon");
    }
    if (isError) {
      toast.error("Đã xảy ra lỗi!");
    }
  }, [isSuccess, isError, isLoading]);
  const formik = useFormik({
    enableReinitialize: true,
    initialValues: {
      name: couponData?.name || "",
      expiry: formatDate(couponData?.expiry) || "",
      discount: couponData?.discount || "",
    },
    validationSchema: schema,
    onSubmit: (values) => {
      if (couponId !== undefined) {
        const data = { id: couponId, couponData: values };
        dispatch(updateCoupon(data));
      } else {
        dispatch(createCoupon(values));
        formik.resetForm();
        setTimeout(() => {
          dispatch(resetState());
          navigate("/admin/list-Coupon");
        }, 300);
      }
    },
  });
  return (
    <div>
      <h3 className="mb-4 title">
        {couponId !== undefined ? "Chỉnh sửa" : "Thêm"} COUPON
      </h3>
      <div>
        <form action="" onSubmit={formik.handleSubmit}>
          <CustomInput
            type="text"
            label="Nhập tên COUPON"
            name="name"
            onCh={formik.handleChange("name")}
            onBl={formik.handleBlur("name")}
            val={formik.values.name}
          />
          <div className="error">
            {formik.touched.name && formik.errors.name}
          </div>
          <CustomInput
            type="date"
            label="Nhập thời hạn"
            name="discount"
            onCh={formik.handleChange("expiry")}
            onBl={formik.handleBlur("expiry")}
            val={formik.values.expiry}
          />
          <div className="error">
            {formik.touched.expiry && formik.errors.expiry}
          </div>
          <CustomInput
            type="number"
            label="Nhập Discount"
            name="discount"
            onCh={formik.handleChange("discount")}
            onBl={formik.handleBlur("discount")}
            val={formik.values.discount}
            min={0}
          />
          <div className="error">
            {formik.touched.discount && formik.errors.discount}
          </div>
          <button
            className="btn btn-success border-0 rounded-3 my-5"
            type="submit"
          >
            {couponId !== undefined ? "Chỉnh sửa" : "Thêm"} COUPON
          </button>
        </form>
      </div>
    </div>
  );
};

export default Addcoupon;
