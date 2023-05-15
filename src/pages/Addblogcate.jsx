import React, { useEffect } from "react";
import CustomInput from "../components/CustomInput";

import { useDispatch, useSelector } from "react-redux";
import { useLocation, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { useFormik } from "formik";
import * as Yup from "yup";

import {
  createBCategory,
  getBCategoryById,
  resetState,
  updateBCategory,
} from "../features/bcategory/bcategorySlice";

let schema = Yup.object({
  title: Yup.string().required("Nhập loại Blog"),
});

const Addblogcate = () => {
  const location = useLocation();
  const categoryId = location.pathname.split("/")[3];
  useEffect(() => {
    if (categoryId !== undefined) {
      dispatch(getBCategoryById(categoryId));
    } else {
      dispatch(resetState());
    }
  }, [categoryId]);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const newBCategory = useSelector((state) => state.bCategory);
  const {
    isSuccess,
    isError,
    isLoading,
    createdBCategory,
    categoryName,
    categoryUpdate,
  } = newBCategory;
  useEffect(() => {
    if (isSuccess && createdBCategory) {
      toast.success("Thêm loại Blog thành công!");
    }
    if (isSuccess && categoryUpdate) {
      toast.success("Chỉnh sửa loại Blog thành công!");
      navigate("/admin/list-blog-category");
    }
    if (isError) {
      toast.error("Đã xảy ra lỗi!");
    }
  }, [isSuccess, isError, isLoading, createdBCategory]);
  const formik = useFormik({
    enableReinitialize: true,
    initialValues: {
      title: categoryName || "",
    },
    validationSchema: schema,
    onSubmit: (values) => {
      if (categoryId !== undefined) {
        const data = { id: categoryId, categoryData: values };
        dispatch(updateBCategory(data));
      } else {
        dispatch(createBCategory(values));
        formik.resetForm();
        setTimeout(() => {
          dispatch(resetState());
          navigate("/admin/list-blog-category");
        }, 300);
      }
    },
  });
  return (
    <div>
      <h3 className="mb-4 title">
        {categoryId !== undefined ? "Chỉnh sửa" : "Thêm"} loại Blog
      </h3>
      <div>
        <form action="" onSubmit={formik.handleSubmit}>
          <CustomInput
            type="text"
            label="Nhập loại blog"
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
            {categoryId !== undefined ? "Chỉnh sửa" : "Thêm"} loại Blog
          </button>
        </form>
      </div>
    </div>
  );
};

export default Addblogcate;
