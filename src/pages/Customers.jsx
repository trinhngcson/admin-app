import React, { useEffect } from "react";
import { Table } from "antd";
import { useDispatch, useSelector } from "react-redux";
import { getUsers } from "../features/customers/customerSlice";
const Customers = () => {
  const columns = [
    {
      title: "No.",
      dataIndex: "key",
    },
    {
      title: "Tên",
      dataIndex: "name",
      sorter: (a, b) => a.name.length - b.name.length,
    },
    {
      title: "Email",
      dataIndex: "email",
    },
    {
      title: "Số điện thoại",
      dataIndex: "mobile",
    },
  ];

  const dispatch = useDispatch();
  const customerState = useSelector((state) => state.customer.customers);
  const data1 = [];
  for (let i = 0; i < customerState.length; i++) {
    if (customerState[i].role !== "admin") {
      data1.push({
        key: i,
        name: customerState[i].name,
        email: customerState[i].email,
        mobile: customerState[i].mobile,
      });
    }
  }
  useEffect(() => {
    dispatch(getUsers());
  }, []);
  return (
    <div>
      <h3 className="mb-4 title">Khách hàng</h3>
      <div>
        <Table columns={columns} dataSource={data1} />
      </div>
    </div>
  );
};

export default Customers;
