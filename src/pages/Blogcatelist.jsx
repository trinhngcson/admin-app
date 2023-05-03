import React, { useEffect } from "react";
import { Table } from "antd";

import { BiEdit } from "react-icons/bi";
import { AiFillDelete } from "react-icons/ai";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { getCategories } from "../features/bcategory/bcategorySlice";

const Blogcatelist = () => {
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
      <h3 className="mb-4 title">Danh sách loại Blog</h3>
      <div>
        <Table columns={columns} dataSource={data1} />
      </div>
    </div>
  );
};

export default Blogcatelist;
