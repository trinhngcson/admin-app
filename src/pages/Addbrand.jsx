import React from "react";
import CustomInput from "../components/CustomInput";

const Addbrand = () => {
  return (
    <div>
      <h3 className="mb-4 title">Thêm thương hiệu</h3>
      <div>
        <form action="">
          <CustomInput type="text" label="Nhập tên thương hiệu" />
          <button
            className="btn btn-success border-0 rounded-3 my-5"
            type="submit"
          >
            Thêm thương hiệu
          </button>
        </form>
      </div>
    </div>
  );
};

export default Addbrand;
