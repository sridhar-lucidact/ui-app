import { useState } from "react";
import { NavLink } from "react-router-dom";
import { Inputs } from "~/components/core/FormElements/formFieldTypes";
import RecoverUser from "~/components/Security/PasswordRecovery/RecoverUser";
import RecoveryOTP from "~/components/Security/PasswordRecovery/RecoveryOTP";

export default function ForgotPasswordPage() {
  const [isOTP, showOTP] = useState(false);

  const submitUsername = (values: Inputs) => {
    showOTP(true);
  }
  
  const onOTP = (values: Inputs) => {
    
  }

  return <div className="flex h-screen">
  <div className="flex-1 p-4 flex flex-col">
    <NavLink to="/" className="flex items-center gap-2">
      <img src="/images/sm-logo.png" />
      <img src="/images/text-logo.png" className="h-[18px]" />
    </NavLink>
    {isOTP ? <RecoveryOTP onSubmit={onOTP} /> : <RecoverUser onSubmit={submitUsername} />}
  </div>
  <div className="flex-1 bg-[url('/images/login-poster.jpg')]"></div>
</div>
}