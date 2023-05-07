import React, { useEffect, useState } from "react";
import { Table } from "antd";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
import {
  getBrands,
  resetState,
  deleteBrand,
} from "../features/brand/brandSlice";

import { BiEdit } from "react-icons/bi";
import { AiFillDelete } from "react-icons/ai";
import { Link } from "react-router-dom";
import CustomModal from "../components/CustomModal";
const Brandlist = () => {
  const [open, setOpen] = useState(false);
  const [brandId, setBrandId] = useState("");
  const showModal = (e) => {
    setOpen(true);
    setBrandId(e);
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
      sorter: (a, b) => (a.name > b.name ? 1 : -1),
    },
    {
      title: "Action",
      dataIndex: "action",
    },
  ];

  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(resetState());
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
            <Link
              to={`/admin/brand/${brandState[i]._id}`}
              className="fs-3 text-danger"
            >
              <BiEdit />
            </Link>
            <button
              className="fs-3 ms-3 text-danger bg-transparent border-0"
              onClick={() => showModal(brandState[i]._id)}
            >
              <AiFillDelete />
            </button>
          </>
        </>
      ),
    });
  }
  const deleteBr = (e) => {
    dispatch(deleteBrand(e));
    setOpen(false);
    setTimeout(() => {
      toast.success("Xoá thương hiệu thành công");
      dispatch(getBrands());
    }, 100);
  };
  return (
    <div>
      <h3 className="mb-4 title">Danh sách thương hiệu</h3>
      <div>
        <Table columns={columns} dataSource={data1} />
      </div>
      <CustomModal
        title="Bạn có chắc chắn xoá thương hiệu này không"
        hideModal={hideModal}
        open={open}
        action={() => {
          deleteBr(brandId);
        }}
      />
    </div>
  );
};

export default Brandlist;
