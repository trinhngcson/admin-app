import React, { useEffect } from "react";
import CustomInput from "../components/CustomInput";

import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { useFormik } from "formik";
import * as Yup from "yup";

import { createColor } from "../features/color/colorSlice";

let schema = Yup.object({
  title: Yup.string().required("Nhập màu"),
});

const Addcolor = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const newColor = useSelector((state) => state.color);
  const { isSuccess, isError, isLoading, createdColor } = newColor;
  useEffect(() => {
    if (isSuccess && createdColor) {
      toast.success("Thêm màu thành công!");
    }
    if (isError) {
      toast.error("Đã xảy ra lỗi!");
    }
  }, [isSuccess, isError, isLoading, createdColor]);
  const formik = useFormik({
    initialValues: {
      title: "",
    },
    validationSchema: schema,
    onSubmit: (values) => {
      dispatch(createColor(values));
      formik.resetForm();
      setTimeout(() => {
        navigate("/admin/list-color");
      }, 3000);
    },
  });
  return (
    <div>
      <h3 className="mb-4 title">Thêm màu sản phẩm</h3>
      <div>
        <form action="" onSubmit={formik.handleSubmit}>
          <CustomInput
            type="color"
            label="Nhập màu sắc"
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
            Thêm màu sản phẩm
          </button>
        </form>
      </div>
    </div>
  );
};

export default Addcolor;
