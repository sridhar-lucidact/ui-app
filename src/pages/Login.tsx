import { useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { Inputs } from "~/components/core/FormElements/formFieldTypes";
import LoginForm from "~/components/Security/LoginForm";
import OTPForm from "~/components/Security/OtpForm";
import uiStatic from "conf/ui-static.json";
import { executeEvent, executeEventOption } from "~/executableEvents/eventHandler";
import { TEvent } from "~/types/schema/common.type";
import { ConfType } from "~/types/compoundTypes";

export default function LoginPage() {
  const [isOTP, showOTP] = useState(false);
  const navigate = useNavigate();

  const onLogin = (values: Inputs) => {
    showOTP(true);
  }
  
  const onOTP = (values: Inputs) => {
    executeEventOption({
      events: [uiStatic.login.onClick] as TEvent[],
      data: values,
      responses: [],
      conf: {} as ConfType
    })
    navigate("/clinic")
  }

  return <div className="flex h-screen">
    <div className="flex-1 p-4 flex flex-col">
      <NavLink className="flex items-center gap-2" to="/">
        <img src="/images/sm-logo.png" />
        <img src="/images/text-logo.png" className="h-[18px]" />
      </NavLink>
      {isOTP ? <OTPForm onSubmit={onOTP} /> : <LoginForm onSubmit={onLogin}/>}
    </div>
    <div className="flex-1 bg-[url('/images/login-poster.jpg')]"></div>
  </div>
}