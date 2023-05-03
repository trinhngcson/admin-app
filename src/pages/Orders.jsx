import React, { useEffect } from "react";
import { Table } from "antd";

import { BiEdit } from "react-icons/bi";
import { AiFillDelete } from "react-icons/ai";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { getOrders } from "../features/auth/authSlice";
const Orders = () => {
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
      title: "Sản phẩm",
      dataIndex: "product",
    },
    {
      title: "Tổng cộng",
      dataIndex: "amount",
    },
    {
      title: "Date",
      dataIndex: "date",
    },
    {
      title: "Action",
      dataIndex: "action",
    },
  ];
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getOrders());
  }, []);
  const ordersState = useSelector((state) => state.auth.orders);
  const data1 = [];
  for (let i = 0; i < ordersState.length; i++) {
    data1.push({
      key: i,
      name: ordersState[i].orderby.name,
      product: ordersState[i].products.map((i) => {
        return (
          <>
            <ul>
              <li>{i.product.title}</li>
            </ul>
          </>
        );
      }),
      amount: ordersState[i].paymentIntent.amount,
      date: new Date(ordersState[i].createdAt).toLocaleString(),
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
      <h3 className="mb-4 title">Đơn đặt hàng</h3>
      <div>
        <Table columns={columns} dataSource={data1} />
      </div>
    </div>
  );
};

export default Orders;
