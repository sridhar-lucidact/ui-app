import { useForm } from "react-hook-form"
import Button from "~/components/core/Button/Button"
import FormField from "~/components/core/FormElements/FormField"
import { Inputs } from "~/components/core/FormElements/formFieldTypes"
import { TEditableField } from "~/types/compoundTypes"

export default function EditableFormField({ conf, value, onClose, id, onSubmitForm }: TEditableField) {

  const {
    handleSubmit,
    control,
    getValues,
    formState: { errors },
    reset
  } = useForm<Inputs>({ defaultValues: { [conf.name as string]: value } })

  return <form onSubmit={handleSubmit(onSubmitForm)} className="editable-field-form">
    <div className="flex items-center gap-2">
      
      <FormField
        conf={{...conf, label: ""}}
        placeholder={`Enter ${conf.label}`}
        control={control}
        error={conf.name ? errors[conf.name] : undefined}
      />
      <Button size="small" variant="bordered" onClick={onClose}>Cancel</Button>  
      <Button size="small" type="submit">Save</Button>
    </div>
  </form>
}