import React, { useEffect, useState } from "react";
import { Table } from "antd";

import { BiEdit } from "react-icons/bi";
import { AiFillDelete } from "react-icons/ai";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import {
  deleteBCategory,
  getCategories,
  resetState,
} from "../features/bcategory/bcategorySlice";
import CustomModal from "../components/CustomModal";
import { toast } from "react-toastify";

const Blogcatelist = () => {
  const [open, setOpen] = useState(false);
  const [categoryId, setCategoryId] = useState("");
  const [categoryName, setCategoryName] = useState("");
  const showModal = (id, name) => {
    setCategoryId(id);
    setCategoryName(name);
    setOpen(true);
  };
  const hideModal = () => {
    setOpen(false);
  };
  const columns = [
    {
      title: "No.",
      dataIndex: "key",
    },
    {
      title: "Tên",
      dataIndex: "name",
    },
    {
      title: "Action",
      dataIndex: "action",
    },
  ];
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(resetState());
    dispatch(getCategories());
  }, []);
  const blogCateState = useSelector((state) => state.bCategory.bCategories);
  const data1 = [];
  for (let i = 0; i < blogCateState.length; i++) {
    data1.push({
      key: i,
      name: blogCateState[i].title,
      action: (
        <>
          <>
            <Link
              to={`/admin/blog-category/${blogCateState[i]._id}`}
              className="fs-3 text-danger"
            >
              <BiEdit />
            </Link>
            <button
              className="fs-3 ms-3 text-danger bg-transparent border-0"
              onClick={() => {
                showModal(blogCateState[i]._id, blogCateState[i].title);
              }}
            >
              <AiFillDelete />
            </button>
          </>
        </>
      ),
    });
  }
  const deleteCate = (e) => {
    dispatch(deleteBCategory(e));
    setOpen(false);
    setTimeout(() => {
      toast.success("Xoá loại blog thành công");
      dispatch(getCategories());
    }, 100);
  };
  return (
    <div>
      <h3 className="mb-4 title">Danh sách loại Blog</h3>
      <div>
        <Table columns={columns} dataSource={data1} />
      </div>
      <CustomModal
        title={`Bạn có chắc chắn xoá loại Blog: ${categoryName} không?`}
        hideModal={hideModal}
        open={open}
        action={() => {
          deleteCate(categoryId);
        }}
      />
    </div>
  );
};

export default Blogcatelist;
