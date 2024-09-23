import { FieldType } from "~/types/schema/enum.type";
import { TFieldSpec } from "~/types/schema/widget.type";
import { useForm, SubmitHandler } from "react-hook-form"
import Button from "~/components/core/Button/Button"
import { Inputs } from "~/components/core/FormElements/formFieldTypes";
import { parseValues } from "~/components/core/FormElements/formFieldHelper";
import FormField from "~/components/core/FormElements/FormField";

type FieldSpecExtended = TFieldSpec & {
  description?: string
}

const fields: FieldSpecExtended[] = [
  {
    "id": "oldPassword",
    "colSize": 12,
    "fieldType": FieldType.Password,
    "name": "oldPassword",
    "label": "Old Password",
    "labelIcon": "",
    "value": "",
    "valueIcon": "",
    "validation": {
      "minLength": 8,
      "maxValue": 0,
      "minValue": 0,
      "future": false,
      "past": false,
      "required": true
    },
  },
  {
    "id": "newPassword",
    "colSize": 12,
    "fieldType": FieldType.Password,
    "name": "newPassword",
    "label": "New Password",
    "labelIcon": "",
    "value": "",
    "valueIcon": "",
    "validation": {
      "minLength": 8,
      "maxValue": 0,
      "minValue": 0,
      "future": false,
      "past": false,
      "required": true
    },
    "description": "At least 8 characters and must contains a number or symbol"
  }
]


export default function Password() {
  
  const {
    handleSubmit,
    control,
    getValues,
    formState: { errors },
    reset
  } = useForm<Inputs>({
    defaultValues: {
      oldPassword: "",
      newPassword: ""
    }
  })

  const onSubmit: SubmitHandler<Inputs> = (data) => {
    parseValues(data)
  }

  const getFormValues = () => {
    return getValues()
  }

  return <form className="px-3 horizontal-form" onSubmit={handleSubmit(onSubmit)}>
    {fields.map((field) => <div key={field.id} className="my-4">
      <FormField
        conf={field}
        control={control}
        error={field.name ? errors[field.name] : undefined}
        getFormValues={getFormValues}
        labelPlacement="outside-left"
        description={field.description}
      />
    </div>)}
    <div className="flex">
      <Button type="submit" className="ml-[25%]"  size="small">Save</Button>
    </div>
  </form>
}