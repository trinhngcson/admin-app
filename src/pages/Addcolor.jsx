import React from "react";
import CustomInput from "../components/CustomInput";

const Addcolor = () => {
  return (
    <div>
      <h3 className="mb-4 title">Thêm màu sản phẩm</h3>
      <div>
        <form action="">
          <CustomInput type="color" label="Nhập màu sắc" />
          <button
            className="btn btn-success border-0 rounded-3 my-5"
            type="submit"
          >
            Thêm màu sản phẩm
          </button>
        </form>
      </div>
    </div>
  );
};

export default Addcolor;
