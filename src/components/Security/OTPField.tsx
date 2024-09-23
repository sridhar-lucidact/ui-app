import { Control, FieldErrors } from "react-hook-form";
import FormField from "~/components/core/FormElements/FormField";
import { TAnyMap } from "~/components/core/FormElements/formFieldTypes";
import Input from "~/components/core/FormElements/Input";
import { TFieldSpec } from "~/types/schema/widget.type";

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

interface OTPFieldProps {
  errors:  FieldErrors<TAnyMap>
  control:  Control<TAnyMap, any>
}

export default function OTPField({ control, errors }: OTPFieldProps) {

  return (
    <div className="mt-3">
      <FormField
        component={Input}
        control={control}
        conf={inputs.otp}
        error={errors[inputs.otp.name as string]}
        fieldProps={{
          labelPlacement: "outside",
          variant: 'bordered'
        }}
      />
    </div>
  )
}