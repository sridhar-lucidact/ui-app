import { Control, FieldErrors } from "react-hook-form";
import { Link } from "react-router-dom";
import FormField from "~/components/core/FormElements/FormField";
import { TAnyMap } from "~/components/core/FormElements/formFieldTypes";
import { Typography } from "~/components/core/Typography/Typography";
import { TFieldSpec } from "~/types/schema/widget.type";
import SecuredInput from "../core/FormElements/SecuredInput";

const inputs: { [key: string]: TFieldSpec } = {
  "password": {
    "id": "password",
    "validation": {
      "maxLength": 10,
      "minLength": 10,
      "required": true
    },
    "label": "Password",
    "name": "password"
  }
}

interface PasswordFieldProps {
  errors:  FieldErrors<TAnyMap>
  control:  Control<TAnyMap, any>
}

export default function PasswordField({ control, errors }: PasswordFieldProps) {

  return (
    <div className="relative mt-2 border-t border-t-white">
      <Link to="/forgot-password" className="absolute right-0 top-[18px]">
        <Typography className="text-xs font-medium text-lucid-blue-900">Forgot Password?</Typography>
      </Link>
      <FormField
        component={SecuredInput}
        control={control}
        conf={inputs.password}
        error={errors[inputs.password.name as string]}
        fieldProps={{
          labelPlacement: "outside",
          variant: 'bordered',
          type: "password"
        }}
      />
    </div>
  )
}