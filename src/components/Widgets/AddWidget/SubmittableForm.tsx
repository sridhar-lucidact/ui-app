import { FieldType } from "la-ui-schema/lib/EnumModule"
import { FieldSpec } from "la-ui-schema/lib/WidgetModule"
import { useMemo } from "react"
import { Column, Row } from "~/components/core/BSGrid/BGGrid"
import Button from "~/components/core/Button/Button"
import FormField from "~/components/core/FormElements/FormField"
import useSubmittableForm from "./useSubmittableForm"
import { SubmitHandler } from "react-hook-form"
import { Inputs } from "~/components/core/FormElements/formFieldTypes"
import { isHidden } from "../ViewWidget/fieldHelper"
import FooterBar from "~/components/FooterBar/FooterBar"
import { TForm } from "~/types/schema/widget.type"
import { Widget } from "../Widgets"
import { cn } from "@nextui-org/react"

// export type DivElement<T extends {}> = React.HTMLAttributes<HTMLDivElement> & T & {}
export interface TSubmitFormProps extends React.HTMLAttributes<HTMLFormElement> {
  id: string
  rows: FieldSpec[][]
  formData?: any
  type: "add" | "update"
  conf?: TForm
  onCancel?: () => void
  processOnSubmit?: (data: any) => Promise<any[]>
  onFormSubmit?: SubmitHandler<Inputs>
  nestedWidget?: boolean
}

export default function SubmittableForm(props: TSubmitFormProps) {
  const {
    id,
    conf,
    rows,
    formData,
    type = "add",
    onCancel,
    processOnSubmit,
    onFormSubmit,
    nestedWidget,
    ...rest
  } = props;

  const { handleSubmit, onSubmit, control, errors, reset, getFormValues } = useSubmittableForm(rows, formData, processOnSubmit)

  const hasReset = useMemo(() => {
    let value = false
    if (Array.isArray(rows)) {
      rows.map((row) => {
        if (Array.isArray(row)) {
          row.map((col) => {
            if ((col as FieldSpec).fieldType === FieldType.Reset) {
              value = true
            }
          })
        }
      })
    }
    return value
  }, [rows])

  return <form
    onSubmit={handleSubmit(onFormSubmit ? onFormSubmit : onSubmit)}
    {...rest}
    className={cn("flex flex-col h-100 overflow-hidden", rest.className)}
  >
    <div className={cn("form-fields flex-1 overflow-y-auto overflow-x-hidden pb-1", {"px-3": !nestedWidget})}>
      {rows && rows.map((row, i) => {
        const rowData = formData && formData[i] ? formData[i] : formData
        return <Row key={`row-${id}-${i}`} className="!gap-y-0">
          {Array.isArray(row) && row?.map((c, j) => {
            const columnData = rowData && rowData[j] ? rowData[j] : rowData
            const col = c as FieldSpec;
            const hidden = isHidden(c);
            return <Column
              key={`${id}-row-${i}-col-${j}`}
              colSize={col.colSize || 12}
              className="!py-0"
              id={`${id}/${col.id}`}
              hidden={hidden}
            >
              {col.hasOwnProperty("fieldType") ? <FormField
                key={col.id}            
                conf={col}
                formData={formData}
                columnData={columnData}
                control={control}
                error={col.name ? errors[col.name] : undefined}
                getFormValues={getFormValues}
              /> : <Widget form={col as TForm} id={id} nestedWidget />}
            </Column>
          })}
        </Row>
      })}
    </div>
    <div className={cn("flex gap-2 pb-2 pt-2 items-center", {"px-3": !nestedWidget})}>
      <div className="w-[30%] min-w-40">&nbsp;</div>
      <FooterBar conf={conf} id={id} data={formData}>
        {hasReset && <Button onClick={() => reset()} type="button" variant="bordered" size="small">Reset</Button>}
        {onCancel ? <Button type="button" variant="bordered" size="small" onClick={onCancel}>Cancel</Button> : null}
        <Button type="submit" size="small">{type === "add" ? "Submit" : "Update"}</Button>
      </FooterBar>
    </div>
  </form>
}