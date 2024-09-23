import dottie from "dottie";
import { FieldSpec } from "la-ui-schema/lib/WidgetModule";
import { SubmitHandler, useForm } from "react-hook-form";
import { parseValues } from "~/components/core/FormElements/formFieldHelper";
import { Inputs } from "~/components/core/FormElements/formFieldTypes";
import { TFieldSpec } from "~/types/schema/widget.type";

export function getDefaultFields(fields: TFieldSpec[][], data: any){
  const defaultValues: {[key: string]: any} = {};
  fields.forEach((fs, i) => {
    const rowData = data && data[i] ? data[i] : data
    fs.forEach((f, j) => {
      const columnData = rowData && rowData[j] ? rowData[j] : rowData
      if (!f.name) return;
      let value = dottie.get(columnData, f.name);
      if (!value) value = dottie.get(rowData, f.name);
      if (!value) value = dottie.get(data, f.name);
      if (!value) value = ""
      
      defaultValues[f.name] = value
      
      if (!defaultValues[f.name] && f.defaultValue) {
        defaultValues[f.name] = f.defaultValue
      }
    })
  })
  return dottie.transform(defaultValues)
}

export default function useSubmittableForm(rows: FieldSpec[][], formValues: Inputs, processOnSubmit?: (data: any) => Promise<any[]>) {

  const defaultValues = rows ? getDefaultFields(rows, formValues) : {};
  const {
    handleSubmit,
    control,
    getValues,
    formState: { errors },
    reset
  } = useForm<Inputs>({ defaultValues })

  const onSubmit: SubmitHandler<Inputs> = (data) => {
    if (processOnSubmit) {
      processOnSubmit(parseValues(data))
    }
  }

  const getFormValues = () => {
    return getValues()
  }

  return { handleSubmit, onSubmit, control, errors, reset, getFormValues }
} 