import { FieldType } from "~/types/schema/enum.type";
import { TFieldSpec } from "~/types/schema/widget.type";
import { useForm, SubmitHandler } from "react-hook-form"
import Button from "~/components/core/Button/Button"
import UploadImage from "~/components/core/FormControl/UploadImage/UploadImage"
import { Inputs } from "~/components/core/FormElements/formFieldTypes";
import { parseValues } from "~/components/core/FormElements/formFieldHelper";
import FormField from "~/components/core/FormElements/FormField";

type TFieldSpecExtended = TFieldSpec & {
  description?: string
}

const fields: TFieldSpecExtended[] = [
  {
    "id": "firstName",
    "colSize": 12,
    "fieldType": FieldType.Text,
    "name": "firstName",
    "label": "First Name",
    "labelIcon": "",
    "value": "",
    "valueIcon": "",
    "validation": {
      "minLength": 0,
      "maxValue": 0,
      "minValue": 0,
      "future": false,
      "past": false,
      "required": true
    },
  },
  {
    "id": "middleName",
    "colSize": 12,
    "fieldType": FieldType.Text,
    "name": "middleName",
    "label": "Middle Name",
    "labelIcon": "",
    "value": "",
    "valueIcon": "",
    "validation": {
      "minLength": 0,
      "maxValue": 0,
      "minValue": 0,
      "future": false,
      "past": false,
      "required": true
    },
  },
  {
    "id": "lastName",
    "colSize": 12,
    "fieldType": FieldType.Text,
    "name": "lastName",
    "label": "Last Name",
    "labelIcon": "",
    "value": "",
    "valueIcon": "",
    "validation": {
      "minLength": 0,
      "maxValue": 0,
      "minValue": 0,
      "future": false,
      "past": false,
      "required": true
    },
  },
  {
    "id": "gender",
    "colSize": 12,
    "fieldType": FieldType.Text,
    "name": "gender",
    "label": "Gender",
    "labelIcon": "",
    "value": "",
    "valueIcon": "",
    "validation": {
      "minLength": 0,
      "maxValue": 0,
      "minValue": 0,
      "future": false,
      "past": false,
      "required": true
    },
  },
  {
    "id": "dob",
    "colSize": 12,
    "fieldType": FieldType.Text,
    "name": "dob",
    "label": "Date of Birth",
    "labelIcon": "",
    "value": "",
    "valueIcon": "",
    "validation": {
      "minLength": 0,
      "maxValue": 0,
      "minValue": 0,
      "future": false,
      "past": false,
      "required": true
    },
  },
  {
    "id": "phone",
    "colSize": 12,
    "fieldType": FieldType.Text,
    "name": "phone",
    "label": "Phone",
    "labelIcon": "",
    "value": "",
    "valueIcon": "",
    "validation": {
      "minLength": 0,
      "maxValue": 0,
      "minValue": 0,
      "future": false,
      "past": false,
      "required": true
    },
  },
  {
    "id": "email",
    "colSize": 12,
    "fieldType": FieldType.Email,
    "name": "email",
    "label": "Email",
    "labelIcon": "",
    "value": "",
    "valueIcon": "",
    "validation": {
      "minLength": 0,
      "maxValue": 0,
      "minValue": 0,
      "future": false,
      "past": false,
      "required": true
    },
  },
  {
    "id": "address",
    "colSize": 12,
    "fieldType": FieldType.Text,
    "name": "address",
    "label": "Address",
    "labelIcon": "",
    "value": "",
    "valueIcon": "",
    "validation": {
      "minLength": 0,
      "maxValue": 0,
      "minValue": 0,
      "future": false,
      "past": false,
      "required": true
    },
  },
  {
    "id": "userId",
    "colSize": 12,
    "fieldType": FieldType.Text,
    "name": "userId",
    "label": "User ID",
    "labelIcon": "",
    "value": "",
    "valueIcon": "",
    "controls": {
    "readOnly": true
    },
    "validation": {
      "minLength": 0,
      "maxValue": 0,
      "minValue": 0,
      "future": false,
      "past": false,
      "required": true
    },
  }
]

export default function UserProfile() {
  
  const {
    handleSubmit,
    control,
    getValues,
    formState: { errors },
    reset
  } = useForm<Inputs>({
    defaultValues: {
      firstName: "",
      middleName: "",
      lastName: "",
      gender: "",
      dob: "",
      phone: "",
      email: "",
      address: "",
      userId: "",
    }
  })

  const onSubmit: SubmitHandler<Inputs> = (data) => {
    parseValues(data)
  }

  const getFormValues = () => {
    return getValues()
  }

  return <form className="px-3 horizontal-form" onSubmit={handleSubmit(onSubmit)}>
    <UploadImage />
    <hr className="my-6" />
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