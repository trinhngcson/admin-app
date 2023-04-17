import React from "react";
import CustomInput from "../components/CustomInput";
import { Link } from "react-router-dom";

const Login = () => {
  return (
    <div className="py-5" style={{ background: "#ffd333", minHeight: "100vh" }}>
      <br />
      <br />
      <br />
      <br />
      <br />
      <div className="my-5 w-25 bg-white rounded-3 mx-auto p-3 p-4">
        <h3 className="text-center title">Đăng nhập</h3>
        <p className="text-center ">Đăng nhập tài khoản để tiếp tục.</p>
        <form action="">
          <CustomInput type="text" label="Email" id="email" />
          <CustomInput type="password" label="Mật khẩu" id="pass" />
          <div className="mb-3 text-end">
            <Link to="forgot-password" className="">
              Quên mật khẩu
            </Link>
          </div>
          <Link
            to="/admin"
            className="border-0 px-3 py-2 text-white fw-bold w-100 text-center text-decoration-none fs-5"
            style={{ background: "#ffd333" }}
            type="submit"
          >
            Đăng nhập
          </Link>
        </form>
      </div>
    </div>
  );
};

export default Login;
