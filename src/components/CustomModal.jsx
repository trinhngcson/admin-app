import React from "react";
import { Modal } from "antd";

const CustomModal = (props) => {
  const { open, hideModal, action, title } = props;
  return (
    <Modal
      title={"Cảnh báo"}
      open={open}
      onOk={action}
      onCancel={hideModal}
      okText="OK"
      cancelText="Cancel"
    >
      <p>{title}</p>
    </Modal>
  );
};

export default CustomModal;
