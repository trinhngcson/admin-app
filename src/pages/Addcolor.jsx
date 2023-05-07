import React, { useEffect } from "react";
import CustomInput from "../components/CustomInput";

import { useDispatch, useSelector } from "react-redux";
import { useLocation, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { useFormik } from "formik";
import * as Yup from "yup";

import {
  createColor,
  getColorById,
  resetState,
  updateColor,
} from "../features/color/colorSlice";

let schema = Yup.object({
  title: Yup.string().required("Nhập màu"),
});

const Addcolor = () => {
  const path = useLocation();
  const colorId = path.pathname.split("/")[3];
  useEffect(() => {
    if (colorId !== undefined) {
      dispatch(getColorById(colorId));
    } else {
      dispatch(resetState());
    }
  }, [colorId]);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const newColor = useSelector((state) => state.color);
  const {
    isSuccess,
    isError,
    isLoading,
    createdColor,
    colorName,
    colorUpdate,
  } = newColor;
  useEffect(() => {
    if (isSuccess && createdColor) {
      toast.success("Thêm màu thành công!");
    }
    if (isSuccess && colorUpdate) {
      toast.success("Chỉnh sửa màu thành công!");
      navigate("/admin/list-color");
    }
    if (isError) {
      toast.error("Đã xảy ra lỗi!");
    }
  }, [isSuccess, isError, isLoading, createdColor]);
  const formik = useFormik({
    enableReinitialize: true,
    initialValues: {
      title: colorName || "",
    },
    validationSchema: schema,
    onSubmit: (values) => {
      if (colorId !== undefined) {
        const data = { id: colorId, colorData: values };
        dispatch(updateColor(data));
      } else {
        dispatch(createColor(values));
        formik.resetForm();
        setTimeout(() => {
          dispatch(resetState());
          navigate("/admin/list-color");
        }, 300);
      }
    },
  });
  return (
    <div>
      <h3 className="mb-4 title">
        {colorId !== undefined ? "Chỉnh" : "Thêm"} màu sản phẩm
      </h3>
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
            {colorId !== undefined ? "Chỉnh" : "Thêm"} màu sản phẩm
          </button>
        </form>
      </div>
    </div>
  );
};

export default Addcolor;
