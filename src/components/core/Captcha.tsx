import { createRef, forwardRef, useEffect, useRef } from 'react';
import ReCAPTCHA from "react-google-recaptcha";
import { Typography } from './Typography/Typography';

interface CaptchaProps {
  submitted?: boolean
  submitFailed?: boolean
  error?: boolean
  errorMessage?: string
  onChange?: ((token: string | null) => void) | undefined;
}

export default forwardRef(function Captcha(props: CaptchaProps, ref) {
  // const captcha = useRef();

  useEffect(() => {
    if (props.submitted) {
      setTimeout(() => {
        // if (captcha.current) captcha.current?.reset();
      }, 1000)
    }
  }, [props.submitted])

  const { errorMessage, onChange } = props;
  
  return (
    <>
      <ReCAPTCHA
        sitekey={import.meta.env.VITE_APP_CAPTCHA_SECRET as string}
        onChange={onChange}
      />
      {errorMessage ? <Typography className='text-tiny leading-[1.16667] text-lucid-red-400'>
          Please confirm you are not a bot
        </Typography> : null
      }
    </>
  )
})