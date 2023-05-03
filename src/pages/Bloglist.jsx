import React, { useEffect } from "react";
import { Table } from "antd";

import { BiEdit } from "react-icons/bi";
import { AiFillDelete } from "react-icons/ai";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";

import { getBlogs } from "../features/blogs/blogSlice";
const Bloglist = () => {
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
            <Link to="/" className="fs-3 text-danger">
              <BiEdit />
            </Link>
            <Link to="/" className="fs-3 ms-3 text-danger">
              <AiFillDelete />
            </Link>
          </>
        </>
      ),
    });
  }
  return (
    <div>
      <h3 className="mb-4 title">Danh sách Blogs</h3>
      <div>
        <Table columns={columns} dataSource={data1} />
      </div>
    </div>
  );
};

export default Bloglist;
