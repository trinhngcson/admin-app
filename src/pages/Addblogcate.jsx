import React from "react";
import CustomInput from "../components/CustomInput";

const Addblogcate = () => {
  return (
    <div>
      <h3 className="mb-4 title">Thêm loại Blog</h3>
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

export default Addblogcate;
