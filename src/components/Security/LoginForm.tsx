import { useForm } from "react-hook-form";
import Button from "~/components/core/Button/Button";
import { Inputs } from "~/components/core/FormElements/formFieldTypes";
import { Typography } from "~/components/core/Typography/Typography";
import PasswordField from "./PasswordField";
import UsernameField from "./UsernameField";
import CaptchaField from "./CaptchaField";


interface LoginFormProps {
  onSubmit: (values: Inputs) => void
}

export default function LoginForm({ onSubmit }: LoginFormProps) {
  const {
    handleSubmit,
    control,
    formState: { errors },
    setError
  } = useForm<Inputs>({ defaultValues: { username: "", password: "" } })

  const onFormSubmit = (data: Inputs) => {
    if (data.username === import.meta.env.VITE_APP_USERNAME && data.password === import.meta.env.VITE_APP_PASSWORD) {
      onSubmit(data)
    } else {
      setError("username", { message: "Invalid username or password" })
      setError("password", { message: "Invalid username or password" })
    }
  }

  return (
    <form onSubmit={handleSubmit(onFormSubmit)} className="editable-field-form flex-1 flex flex-col justify-center m-auto max-w-[450px] w-full">
      <div className="w-full">
        <Typography variant="h1-title" className="text-lucid-blue-900">Welcome Back</Typography>
        <Typography className="mt-3">Enter your details below</Typography>
      </div>
      <UsernameField control={control} errors={errors} />
      <PasswordField control={control} errors={errors} />
      <CaptchaField control={control} errors={errors} />
      <Button className="w-full mt-8" type="submit">Sign in</Button>
    </form>
  )
}