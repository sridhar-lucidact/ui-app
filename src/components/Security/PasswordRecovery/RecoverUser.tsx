import { useForm } from "react-hook-form";
import { NavLink } from "react-router-dom";
import Button from "~/components/core/Button/Button";
import { Inputs } from "~/components/core/FormElements/formFieldTypes";
import { Typography } from "~/components/core/Typography/Typography";
import UsernameField from "../UsernameField";

import CaptchaField from "../CaptchaField";

interface RecoverUserProps {
  onSubmit: (values: Inputs) => void
}

export default function RecoverUser({ onSubmit }: RecoverUserProps) {
  const {
    handleSubmit,
    control,
    formState: { errors }
  } = useForm<Inputs>({ defaultValues: { username: "", password: "" } })

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="editable-field-form flex-1 flex flex-col justify-center m-auto max-w-[450px] w-full">
      <div className="w-full">
        <Typography variant="h1-title" className="text-lucid-blue-900">Password Recovery</Typography>
        <Typography className="mt-3">Enter Username or User Id and we will send an email to your recovery email to reset your password</Typography>
      </div>
      <UsernameField control={control} errors={errors} />
      <CaptchaField control={control} errors={errors} />

      <Button className="w-full mt-8" type="submit">Reset password</Button>
      <NavLink className="text-center mt-6 font-bold text-lucid-blue-500 text-sm" to="/login">Back to Sign in</NavLink>
    </form>
  )
}