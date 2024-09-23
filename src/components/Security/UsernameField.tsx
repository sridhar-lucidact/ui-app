import { Control, FieldErrors } from "react-hook-form";
import FormField from "~/components/core/FormElements/FormField";
import { TAnyMap } from "~/components/core/FormElements/formFieldTypes";
import Input from "~/components/core/FormElements/Input";
import { TFieldSpec } from "~/types/schema/widget.type";

const inputs: { [key: string]: TFieldSpec } = {
  "username": {
    "id": "username",
    "validation": {
      "maxLength": 10,
      "minLength": 10,
      "required": true
    },
    "label": "Username or User ID",
    "name": "username"
  }
}

interface UsernameFieldProps {
  errors:  FieldErrors<TAnyMap>
  control:  Control<TAnyMap, any>
}

export default function UsernameField({ control, errors }: UsernameFieldProps) {

  return (
    <div className="mt-3">
      <FormField
        component={Input}
        control={control}
        conf={inputs.username}
        error={errors[inputs.username.name as string]}
        fieldProps={{
          labelPlacement: "outside",
          variant: 'bordered'
        }}
      />
    </div>
  )
}