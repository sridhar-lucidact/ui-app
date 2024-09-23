import { useForm } from "react-hook-form";
import Button from "~/components/core/Button/Button";
import FormField from "~/components/core/FormElements/FormField";
import { Inputs } from "~/components/core/FormElements/formFieldTypes";
import Input from "~/components/core/FormElements/Input";
import { Typography } from "~/components/core/Typography/Typography";
import { TFieldSpec } from "~/types/schema/widget.type";
import { useEffect, useRef, useState } from "react";
import OTPField from "./OTPField";

const inputs: { [key: string]: TFieldSpec } = {
  "otp": {
    "id": "otp",
    "validation": {
      "maxLength": 10,
      "minLength": 10,
      "required": true
    },
    "label": "Verification Code",
    "name": "otp"
  }
}

interface OTPFormProps {
  onSubmit: (values: Inputs) => void
}

export default function OTPForm({ onSubmit }: OTPFormProps) {
  const {
    handleSubmit,
    control,
    formState: { errors },
    setError
  } = useForm<Inputs>({ defaultValues: { username: "", password: "" } })

  const [otpTimer, setOtpTimer] = useState(240);
  const interval = useRef<NodeJS.Timeout>();

  useEffect(() => {
    resetTimer()
  }, [])

  const resetTimer = () => {
    if (interval.current) clearInterval(interval.current);
    setOtpTimer(240)
    interval.current = setInterval(() => {
      setOtpTimer((time) => {
        if (time === 0) {
          clearInterval(interval.current);
          return time;
        }
        return time - 1
      });
    }, 1000)
  }

  const sendOtp = () => {
    resetTimer()
  }

  const onFormSubmit = (data: Inputs) => {
    if (data.otp === import.meta.env.VITE_APP_OTP) {
      onSubmit(data)
    } else {
      setError("otp", { message: "Invalid OTP" })
    }
  }

  return (
    <form onSubmit={handleSubmit(onFormSubmit)} className="editable-field-form flex-1 flex flex-col justify-center m-auto max-w-[450px] w-full">
      <div className="w-full">
        <Typography variant="h1-title" className="text-lucid-blue-900">Two-Step Verification</Typography>
        <Typography className="mt-3">Please, enter the OTP (one time password) to verify your account. A code has been sent to your verification email address or phone number.</Typography>
        <Typography className="mt-8">Didn't receive an email?</Typography>
        <div className="flex mt-2 gap-2 items-center">
          <Button variant="light" className="p-0 !min-h-0 text-base" onClick={sendOtp}>Send Again</Button>
          <Typography className="text-lucid-grey-500 font-normal">In {otpTimer} sec</Typography>
        </div>
      </div>
      <OTPField control={control} errors={errors} />
      <Button className="w-full mt-8" type="submit">Verify</Button>
    </form>
  )
}