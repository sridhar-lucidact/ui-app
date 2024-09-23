import { useForm } from "react-hook-form";
import { Typography } from "~/components/core/Typography/Typography";
import { Inputs } from "~/components/core/FormElements/formFieldTypes";
import { useNavigate } from "react-router-dom";
import PasswordField from "./PasswordField";
import Button from "~/components/core/Button/Button";

export default function LockedScreen() {
  const navigate = useNavigate();
  const {
    handleSubmit,
    control,
    formState: { errors }
  } = useForm<Inputs>({ defaultValues: { username: "", password: "" } })

  const onSubmit = () => {
    navigate("/clinic")
  }

  return <div className="w-screen h-screen flex justify-center items-center">
    <form onSubmit={handleSubmit(onSubmit)} className="editable-field-form text-center max-w-[458px] w-full">
      <img src="/images/avatar.png" className="m-auto" />
      <Typography variant="h2" className="mt-6 text-lucid-blue-900">Sarah Connor</Typography>
      <Typography className="mt-2">Please, enter your password to continue</Typography>
      <PasswordField control={control} errors={errors} />
      <Button className="w-full mt-6" type="submit">Continue</Button>
    </form>
  </div>
}