import React, { useEffect } from "react";
import CustomInput from "../components/CustomInput";

import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { useFormik } from "formik";
import * as Yup from "yup";

import { createpCategory } from "../features/pcategory/pcategorySlice";

let schema = Yup.object({
  title: Yup.string().required("Nhập loại sản phẩm"),
});

const Addcate = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const newCategory = useSelector((state) => state.pCategory);
  const { isSuccess, isError, isLoading, createdCategory } = newCategory;
  useEffect(() => {
    if (isSuccess && createdCategory) {
      toast.success("Thêm loại sản phẩm thành công!");
    }
    if (isError) {
      toast.error("Đã xảy ra lỗi!");
    }
  }, [isSuccess, isError, isLoading]);
  const formik = useFormik({
    initialValues: {
      title: "",
    },
    validationSchema: schema,
    onSubmit: (values) => {
      dispatch(createpCategory(values));
      formik.resetForm();
      setTimeout(() => {
        navigate("/admin/list-category");
      }, 3000);
    },
  });
  return (
    <div>
      <h3 className="mb-4 title">Thêm loại sản phẩm</h3>
      <div>
        <form action="" onSubmit={formik.handleSubmit}>
          <CustomInput
            type="text"
            label="Nhập loại sản phẩm"
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
            Thêm loại sản phẩm
          </button>
        </form>
      </div>
    </div>
  );
};

export default Addcate;
