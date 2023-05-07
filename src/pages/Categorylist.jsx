import React, { useEffect, useState } from "react";
import { Table } from "antd";

import { BiEdit } from "react-icons/bi";
import { AiFillDelete } from "react-icons/ai";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";

import {
  deletepCategory,
  getCategories,
  resetState,
} from "../features/pcategory/pcategorySlice";
import CustomModal from "../components/CustomModal";
const Categorylist = () => {
  const [open, setOpen] = useState(false);
  const [categoryId, setCategoryId] = useState("");
  const showModal = (e) => {
    setOpen(true);
    setCategoryId(e);
  };
  const hideModal = (e) => {
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
    dispatch(getCategories());
  }, []);
  const pCateState = useSelector((state) => state.pCategory.pCategories);
  const data1 = [];
  for (let i = 0; i < pCateState.length; i++) {
    data1.push({
      key: i,
      name: pCateState[i].title,
      action: (
        <>
          <>
            <Link
              to={`/admin/category/${pCateState[i]._id}`}
              className="fs-3 text-danger"
            >
              <BiEdit />
            </Link>
            <button
              className="fs-3 ms-3 text-danger bg-transparent border-0"
              onClick={() => {
                showModal(pCateState[i]._id);
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
    dispatch(deletepCategory(e));
    setOpen(false);
    setTimeout(() => {
      toast.success("Xoá loại sản phẩm thành công");
      dispatch(getCategories());
    }, 100);
  };
  return (
    <div>
      <h3 className="mb-4 title">Danh sách loại sản phẩm</h3>
      <div>
        <Table columns={columns} dataSource={data1} />
      </div>
      <CustomModal
        title="Bạn có chắc chắn xoá thương hiệu này không"
        hideModal={hideModal}
        open={open}
        action={() => {
          deleteCate(categoryId);
        }}
      />
    </div>
  );
};

export default Categorylist;
