import React, { useEffect } from "react";
import CustomInput from "../components/CustomInput";

import { useDispatch, useSelector } from "react-redux";
import { useLocation, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { useFormik } from "formik";
import * as Yup from "yup";

import {
  createBrand,
  getBrandById,
  resetState,
  updateBrand,
} from "../features/brand/brandSlice";

let schema = Yup.object({
  title: Yup.string().required("Nhập thương hiệu"),
});

const Addbrand = () => {
  const location = useLocation();
  const brandId = location.pathname.split("/")[3];
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const newBrand = useSelector((state) => state.brand);
  const {
    isSuccess,
    isError,
    isLoading,
    createdBrand,
    brandName,
    brandUpdate,
  } = newBrand;
  useEffect(() => {
    if (brandId !== undefined) {
      dispatch(getBrandById(brandId));
    } else {
      dispatch(resetState());
    }
  }, [brandId]);

  useEffect(() => {
    if (isSuccess && createdBrand) {
      toast.success("Thêm nhãn hiệu thành công!");
    }
    if (brandUpdate && isSuccess) {
      toast.success("Chỉnh sửa nhãn hiệu thành công!");
      navigate("/admin/list-brand");
    }
    if (isError) {
      toast.error("Đã xảy ra lỗi!");
    }
  }, [isSuccess, isError, isLoading]);
  const formik = useFormik({
    enableReinitialize: true,
    initialValues: {
      title: brandName || "",
    },
    validationSchema: schema,
    onSubmit: (values, { resetForm }) => {
      if (brandId !== undefined) {
        const data = { id: brandId, brandData: values };
        dispatch(updateBrand(data));
      } else {
        dispatch(createBrand(values));
        resetForm();
        setTimeout(() => {
          dispatch(resetState());
          navigate("/admin/list-brand");
        }, 300);
      }
    },
  });

  return (
    <div>
      <h3 className="mb-4 title">
        {brandId !== undefined ? "Chỉnh sửa" : "Thêm"} thương hiệu
      </h3>
      <div>
        <form action="" onSubmit={formik.handleSubmit}>
          <CustomInput
            type="text"
            label="Nhập tên thương hiệu"
            name="title"
            onCh={formik.handleChange("title")}
            onBl={formik.handleBlur("title")}
            val={formik.values.title}
          />
          <div className="error">
            {formik.touched.title && formik.errors.title}
          </div>
          <button
            className="btn btn-success border-0 rounded-3 my-5"
            type="submit"
          >
            {brandId !== undefined ? "Chỉnh sửa" : "Thêm"} thương hiệu
          </button>
        </form>
      </div>
    </div>
  );
};

export default Addbrand;
