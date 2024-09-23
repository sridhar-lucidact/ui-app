import { Control, FieldErrors } from "react-hook-form";
import FormField from "~/components/core/FormElements/FormField";
import { TAnyMap } from "~/components/core/FormElements/formFieldTypes";
import { TFieldSpec } from "~/types/schema/widget.type";
import Captcha from "../core/Captcha";

const inputs: { [key: string]: TFieldSpec } = {
  "captcha": {
    "id": "captcha",
    "validation": {
      "maxLength": 10,
      "minLength": 10,
      "required": true
    },
    "label": "",
    "name": "captcha"
  }
}

interface CaptchaFieldProps {
  errors:  FieldErrors<TAnyMap>
  control:  Control<TAnyMap, any>
}

export default function CaptchaField({ control, errors }: CaptchaFieldProps) {

  return (
    <div className="mt-6">
      <FormField
        component={Captcha}
        control={control}
        conf={inputs.captcha}
        error={errors[inputs.captcha.name as string]}
        fieldProps={{
          labelPlacement: "outside",
          variant: 'bordered',
          type: "password"
        }}
      />
    </div>
  )
}