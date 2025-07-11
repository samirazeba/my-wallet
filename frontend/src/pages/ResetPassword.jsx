import React from "react";
import { useParams } from "react-router-dom";
import ResetPasswordForm from "../components/ResetPasswordForm";

const ResetPassword = () => {
  const { token } = useParams();

  return (
    <div style={{ padding: 32 }}>
      <ResetPasswordForm token={token} />
    </div>
  );
};

export default ResetPassword;