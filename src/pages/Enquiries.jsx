import React, { useEffect } from "react";
import { Table } from "antd";

import { BiEdit } from "react-icons/bi";
import { AiFillDelete } from "react-icons/ai";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { getEnquiries } from "../features/enquiry/enquirySlice";
const Enquiries = () => {
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
      title: "Email",
      dataIndex: "email",
    },
    {
      title: "Số điện thoại",
      dataIndex: "mobile",
    },
    {
      title: "Bình luận",
      dataIndex: "comment",
    },
    {
      title: "Trạng thái",
      dataIndex: "status",
    },
    {
      title: "Action",
      dataIndex: "action",
    },
  ];
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getEnquiries());
  }, []);
  const enqState = useSelector((state) => state.enquiry.enquiries);
  const data1 = [];
  for (let i = 0; i < enqState.length; i++) {
    data1.push({
      key: i,
      name: enqState[i].name,
      email: enqState[i].email,
      comment: enqState[i].comment,
      mobile: enqState[i].mobile,
      status: (
        <>
          <select name="" id="" className="form-control form-select">
            <option value="">Trạng thái</option>
          </select>
        </>
      ),
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
      <h3 className="mb-4 title">Danh sách câu hỏi</h3>
      <div>
        <Table columns={columns} dataSource={data1} />
      </div>
    </div>
  );
};

export default Enquiries;
