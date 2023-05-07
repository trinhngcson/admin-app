import React, { useEffect, useState } from "react";
import { Table } from "antd";

import { BiEdit } from "react-icons/bi";
import { AiFillDelete } from "react-icons/ai";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
import {
  deleteColor,
  getColors,
  resetState,
} from "../features/color/colorSlice";
import CustomModal from "../components/CustomModal";

const Colorlist = () => {
  const [open, setOpen] = useState(false);
  const [colorId, setColorId] = useState();
  const hideModal = () => {
    setOpen(false);
  };
  const showModal = (e) => {
    setColorId(e);
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
      title: "Màu",
      dataIndex: "name",
      render(text, record) {
        return {
          props: {
            style: {
              background: record.name,
              textAlign: "center",
              textTransform: "uppercase",
              fontWeight: "bold",
            },
          },
          children: <div>{text}</div>,
        };
      },
    },
    {
      title: "Action",
      dataIndex: "action",
    },
  ];
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(resetState());
    dispatch(getColors());
  }, []);
  const colorState = useSelector((state) => state.color.colors);
  const data1 = [];
  for (let i = 0; i < colorState.length; i++) {
    data1.push({
      key: i,
      name: colorState[i].title,
      action: (
        <>
          <>
            <Link
              to={`/admin/color/${colorState[i]._id}`}
              className="fs-3 text-danger"
            >
              <BiEdit />
            </Link>
            <button
              className="fs-3 ms-3 text-danger bg-transparent border-0"
              onClick={() => showModal(colorState[i]._id)}
            >
              <AiFillDelete />
            </button>
          </>
        </>
      ),
    });
  }
  const deleteCl = (e) => {
    dispatch(deleteColor(e));
    setOpen(false);
    setTimeout(() => {
      toast.success("Xoá màu thành công");
      dispatch(getColors());
    });
  };
  return (
    <div>
      <h3 className="mb-4 title">Danh sách màu</h3>
      <div>
        <Table
          columns={columns}
          dataSource={data1}
          rowKey={(record) => record.name}
        />
      </div>
      <CustomModal
        title="Bạn có muốn xoá màu sắc này không"
        hideModal={hideModal}
        open={open}
        action={() => {
          deleteCl(colorId);
        }}
      />
    </div>
  );
};

export default Colorlist;
