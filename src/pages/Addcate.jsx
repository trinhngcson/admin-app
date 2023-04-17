import React from "react";
import CustomInput from "../components/CustomInput";

const Addcate = () => {
  return (
    <div>
      <h3 className="mb-4 title">Thêm loại sản phẩm</h3>
      <div>
        <form action="">
          <CustomInput type="text" label="Nhập loại sản phẩm" />
          <button
            className="btn btn-success border-0 rounded-3 my-5"
            type="submit"
          >
            Thêm loại sản phẩm
          </button>
        </form>
      </div>
    </div>
  );
};

export default Addcate;
