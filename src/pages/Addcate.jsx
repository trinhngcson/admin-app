import React, { useEffect } from "react";
import CustomInput from "../components/CustomInput";

import { useDispatch, useSelector } from "react-redux";
import { useLocation, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { useFormik } from "formik";
import * as Yup from "yup";

import {
  createpCategory,
  getpCategoryById,
  resetState,
  updatepCategory,
} from "../features/pcategory/pcategorySlice";

let schema = Yup.object({
  title: Yup.string().required("Nhập loại sản phẩm"),
});

const Addcate = () => {
  const pathname = useLocation();
  const categoryId = pathname.pathname.split("/")[3];

  useEffect(() => {
    if (categoryId !== undefined) {
      dispatch(getpCategoryById(categoryId));
    } else {
      dispatch(resetState());
    }
  }, [categoryId]);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const newCategory = useSelector((state) => state.pCategory);
  const {
    isSuccess,
    isError,
    isLoading,
    createdCategory,
    pCategoryName,
    pCategoryUpdate,
  } = newCategory;
  useEffect(() => {
    if (isSuccess && createdCategory) {
      toast.success("Thêm loại sản phẩm thành công!");
    }
    if (isSuccess && pCategoryUpdate) {
      toast.success("Chỉnh sửa loại sản phẩm thành công!");
      navigate("/admin/list-category");
    }
    if (isError) {
      toast.error("Đã xảy ra lỗi!");
    }
  }, [isSuccess, isError, isLoading]);
  const formik = useFormik({
    enableReinitialize: true,
    initialValues: {
      title: pCategoryName || "",
    },
    validationSchema: schema,
    onSubmit: (values) => {
      if (categoryId !== undefined) {
        const data = { id: categoryId, pCategoryData: values };
        dispatch(updatepCategory(data));
      } else {
        dispatch(createpCategory(values));
        formik.resetForm();
        setTimeout(() => {
          dispatch(resetState());
          navigate("/admin/list-category");
        }, 300);
      }
    },
  });
  return (
    <div>
      <h3 className="mb-4 title">
        {categoryId !== undefined ? "Chỉnh sửa" : "Thêm"} loại sản phẩm
      </h3>
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
            {categoryId !== undefined ? "Chỉnh sửa" : "Thêm"} loại sản phẩm
          </button>
        </form>
      </div>
    </div>
  );
};

export default Addcate;
