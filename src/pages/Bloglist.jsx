import React, { useEffect, useState } from "react";
import { Table } from "antd";

import { BiEdit } from "react-icons/bi";
import { AiFillDelete } from "react-icons/ai";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";

import { deleteBlog, getBlogs, resetState } from "../features/blogs/blogSlice";
import CustomModal from "../components/CustomModal";
import { toast } from "react-toastify";
const Bloglist = () => {
  const [open, setOpen] = useState(false);
  const [blogId, setBlogId] = useState("");
  const [blogName, setBlogName] = useState("");
  const hideModal = () => {
    setOpen(false);
  };
  const showModal = (id, name) => {
    setBlogId(id);
    setBlogName(name);
    setOpen(true);
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
      title: "Loại",
      dataIndex: "category",
    },
    {
      title: "Action",
      dataIndex: "action",
    },
  ];
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(resetState());
    dispatch(getBlogs());
  }, []);
  const blogState = useSelector((state) => state.blogs.blogs);
  const data1 = [];
  for (let i = 0; i < blogState.length; i++) {
    data1.push({
      key: i,
      name: blogState[i].title,
      category: blogState[i].category,
      action: (
        <>
          <>
            <Link
              to={`/admin/blog/${blogState[i]._id}`}
              className="fs-3 text-danger"
            >
              <BiEdit />
            </Link>
            <button
              className="fs-3 ms-3 text-danger bg-transparent border-0"
              onClick={() => {
                showModal(blogState[i]._id, blogState[i].title);
              }}
            >
              <AiFillDelete />
            </button>
          </>
        </>
      ),
    });
  }
  const deleteBl = (id) => {
    dispatch(deleteBlog(id));
    setOpen(false);
    setTimeout(() => {
      toast.success("Xoá Blog thành công!!!");
      dispatch(getBlogs());
    }, 100);
  };
  return (
    <div>
      <h3 className="mb-4 title">Danh sách Blogs</h3>
      <div>
        <Table columns={columns} dataSource={data1} />
      </div>
      <CustomModal
        title={`Bạn có chắc chắn xoá Blog: ${blogName} không?`}
        open={open}
        hideModal={hideModal}
        action={() => {
          deleteBl(blogId);
        }}
      />
    </div>
  );
};

export default Bloglist;
