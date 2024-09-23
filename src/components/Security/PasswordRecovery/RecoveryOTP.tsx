import { useForm } from "react-hook-form";
import Button from "~/components/core/Button/Button";
import { Inputs } from "~/components/core/FormElements/formFieldTypes";
import { Typography } from "~/components/core/Typography/Typography";
import { useEffect, useRef, useState } from "react";
import OTPField from "../OTPField";


interface RecoveryOTPProps {
  onSubmit: (values: Inputs) => void
}

export default function RecoveryOTP({ onSubmit }: RecoveryOTPProps) {
  const {
    handleSubmit,
    control,
    formState: { errors }
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

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="editable-field-form flex-1 flex flex-col justify-center m-auto max-w-[450px] w-full">
      <div className="w-full">
        <Typography variant="h1-title" className="text-lucid-blue-900">Password Recovery</Typography>
        <Typography className="mt-3">We sent you an email message with instructions for password recovery.</Typography>
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