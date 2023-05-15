import { React, useEffect, useState } from "react";
import CustomInput from "../components/CustomInput";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import Dropzone from "react-dropzone";
import { toast } from "react-toastify";
import * as yup from "yup";
import { useLocation, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { useFormik } from "formik";
import {
  createBlog,
  getBlogById,
  resetState,
  updateBlog,
} from "../features/blogs/blogSlice";
import { getCategories } from "../features/bcategory/bcategorySlice";

let schema = yup.object().shape({
  title: yup.string().required("Yêu cầu nhập Tiêu để"),
  description: yup.string().required("Yêu cầu nhập mô tả"),
  category: yup.string().required("Yêu cầu nhập loại"),
});
const Addblog = () => {
  const [selectedImages, setSelectedImages] = useState([]);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();
  const getBlogId = location.pathname.split("/")[3];
  const bCatState = useSelector((state) => state.bCategory.bCategories);
  const blogState = useSelector((state) => state.blogs);
  const { isSuccess, isError, isLoading, createdBlog, blogData, blogUpdated } =
    blogState;
  useEffect(() => {
    if (getBlogId !== undefined) {
      dispatch(getBlogById(getBlogId));
    } else {
      dispatch(resetState());
    }
  }, [getBlogId]);
  useEffect(() => {
    dispatch(resetState());
    dispatch(getCategories());
  }, []);
  useEffect(() => {
    const images = [];
    selectedImages.forEach((file) => {
      const reader = new FileReader();
      reader.onload = () => {
        if (reader.readyState === 2) {
          images.push(reader.result);
        }
      };
      reader.readAsDataURL(file);
    });
    formik.values.images = images;
    return () => {
      selectedImages.map((i) => {
        i && URL.revokeObjectURL(i.preview);
      });
    };
  }, [selectedImages]);
  useEffect(() => {
    if (!isLoading && isSuccess && createdBlog) {
      toast.success("Thêm Blog thành công!");
      navigate("/admin/list-blog");
    }
    if (isSuccess && blogUpdated) {
      toast.success("Chỉnh sửa Blog thành công!");
      navigate("/admin/list-blog");
    }
    if (isError) {
      toast.error("Đã xảy ra lỗi!");
    }
  }, [isSuccess, isError, isLoading]);
  const formik = useFormik({
    enableReinitialize: true,
    initialValues: {
      title: blogData?.title || "",
      description: blogData?.description || "",
      category: blogData?.category || "",
      images: [],
    },
    validationSchema: schema,
    onSubmit: (values) => {
      if (getBlogId !== undefined) {
        const data = { id: getBlogId, blogData: values };
        dispatch(updateBlog(data));
        dispatch(resetState());
      } else {
        dispatch(createBlog(values));
        formik.resetForm();
        setTimeout(() => {
          dispatch(resetState());
        }, 300);
      }
    },
  });
  const deleteImages = (file) => {
    const img = selectedImages.filter((arr) => arr !== file);
    setSelectedImages(img);
  };
  return (
    <div>
      <h3 className="mb-4 title">
        {getBlogId !== undefined ? "Chỉnh sửa" : "Thêm"} Blog
      </h3>

      <div className="">
        <form action="" onSubmit={formik.handleSubmit}>
          <div className="mt-4">
            <CustomInput
              type="text"
              label="Nhập tiêu đề"
              name="title"
              onCh={formik.handleChange("title")}
              onBl={formik.handleBlur("title")}
              val={formik.values.title}
            />
          </div>
          <div className="error">
            {formik.touched.title && formik.errors.title}
          </div>
          <select
            name="category"
            onChange={formik.handleChange("category")}
            onBlur={formik.handleBlur("category")}
            value={formik.values.category}
            className="form-control py-3  mt-3"
            id=""
          >
            <option value="">Chọn loại Blog</option>
            {bCatState.map((i, j) => {
              return (
                <option key={j} value={i.title}>
                  {i.title}
                </option>
              );
            })}
          </select>
          <div className="error">
            {formik.touched.category && formik.errors.category}
          </div>
          <ReactQuill
            theme="snow"
            className="mt-3"
            name="description"
            onChange={formik.handleChange("description")}
            value={formik.values.description}
          />
          <div className="error">
            {formik.touched.description && formik.errors.description}
          </div>
          <div className="bg-white border-1 p-5 text-center mt-3">
            <Dropzone
              onDrop={(acceptedFiles) => {
                setSelectedImages(
                  acceptedFiles.map((file) =>
                    Object.assign(file, { preview: URL.createObjectURL(file) })
                  )
                );
              }}
              accept="image/*"
            >
              {({ getRootProps, getInputProps }) => (
                <section>
                  <div {...getRootProps()}>
                    <input {...getInputProps()} />
                    <p>Kéo 'và' thả một số tệp vào đây hoặc nhấp để chọn tệp</p>
                  </div>
                </section>
              )}
            </Dropzone>
          </div>
          <div className="showimages d-flex flex-wrap mt-3 gap-3">
            {selectedImages?.map((file) => {
              return (
                <div className=" position-relative" key={file.name}>
                  <button
                    type="button"
                    onClick={() => {
                      deleteImages(file);
                    }}
                    className="btn-close position-absolute"
                    style={{ top: "10px", right: "10px" }}
                  ></button>
                  <img
                    src={file.preview}
                    alt={file.name}
                    width={200}
                    height={200}
                  />
                </div>
              );
            })}
          </div>

          <button
            className="btn btn-success border-0 rounded-3 my-5"
            type="submit"
          >
            {getBlogId !== undefined ? "Chỉnh sửa" : "Thêm"} Blog
          </button>
        </form>
      </div>
    </div>
  );
};

export default Addblog;
