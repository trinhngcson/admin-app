import React, { useEffect } from "react";
import { Table } from "antd";
import { useDispatch, useSelector } from "react-redux";
import { getBrands } from "../features/brand/brandSlice";

import { BiEdit } from "react-icons/bi";
import { AiFillDelete } from "react-icons/ai";
import { Link } from "react-router-dom";
const Brandlist = () => {
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
    dispatch(getBrands());
  }, []);
  const brandState = useSelector((state) => state.brand.brands);
  const data1 = [];
  for (let i = 0; i < brandState.length; i++) {
    data1.push({
      key: i,
      name: brandState[i].title,
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
      <h3 className="mb-4 title">Danh sách thương hiệu</h3>
      <div>
        <Table columns={columns} dataSource={data1} />
      </div>
    </div>
  );
};

export default Brandlist;
