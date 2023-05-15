import React, { useEffect, useState } from "react";
import { Table } from "antd";

import { BiEdit } from "react-icons/bi";
import { AiFillDelete } from "react-icons/ai";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";

import {
  deleteCoupon,
  getCoupons,
  resetState,
} from "../features/coupon/couponSlice";
import CustomModal from "../components/CustomModal";
import { toast } from "react-toastify";

const Colorlist = () => {
  const [open, setOpen] = useState(false);
  const [couponId, setCouponId] = useState("");
  const [couponName, setCouponName] = useState("");
  const showModal = (id, name) => {
    setOpen(true);
    setCouponId(id);
    setCouponName(name);
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
      title: "Tên COUPON",
      dataIndex: "name",
      sorter: (a, b) => (a.name > b.name ? 1 : -1),
    },
    {
      title: "Thời hạn",
      dataIndex: "expiry",
      sorter: (a, b) => a.expiry.length - b.expiry.length,
    },
    {
      title: "Discount",
      dataIndex: "discount",
      sorter: (a, b) => a.discount.length - b.discount.length,
    },
    {
      title: "Action",
      dataIndex: "action",
    },
  ];
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(resetState());
    dispatch(getCoupons());
  }, []);
  const couponState = useSelector((state) => state.coupon.coupons);
  const data1 = [];
  for (let i = 0; i < couponState.length; i++) {
    data1.push({
      key: i,
      name: couponState[i].name,
      expiry: new Date(couponState[i].expiry).toLocaleString(),
      discount: couponState[i].discount,
      action: (
        <>
          <>
            <Link
              to={`/admin/coupon/${couponState[i]._id}`}
              className="fs-3 text-danger"
            >
              <BiEdit />
            </Link>
            <button
              className="fs-3 ms-3 text-danger bg-transparent border-0"
              onClick={() => showModal(couponState[i]._id, couponState[i].name)}
            >
              <AiFillDelete />
            </button>
          </>
        </>
      ),
    });
  }
  const deleteCOUPON = (e) => {
    dispatch(deleteCoupon(e));
    setOpen(false);
    setTimeout(() => {
      toast.success("Xoá COUPON thành công");
      dispatch(getCoupons());
    }, 100);
  };
  return (
    <div>
      <h3 className="mb-4 title">Danh sách COUPON</h3>
      <div>
        <Table columns={columns} dataSource={data1} />
      </div>
      <CustomModal
        title={`Bạn có chắc chắn xoá COUPON: ${couponName} này không`}
        hideModal={hideModal}
        open={open}
        action={() => {
          deleteCOUPON(couponId);
        }}
      />
    </div>
  );
};

export default Colorlist;
