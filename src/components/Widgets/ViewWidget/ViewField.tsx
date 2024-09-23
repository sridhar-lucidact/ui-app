
import dottie from "dottie";
import { useEffect, useMemo, useState } from "react";
import { SubmitHandler } from "react-hook-form";
import { Column, Row } from "~/components/core/BSGrid/BGGrid";
import { parseValues } from "~/components/core/FormElements/formFieldHelper";
import { Inputs } from "~/components/core/FormElements/formFieldTypes";
import { Typography } from "~/components/core/Typography/Typography";
import { TViewField } from "~/types/compoundTypes";
import EditableFormField from "./EditableFormField";
import IconButton from "~/components/core/Button/IconButton";
import useEditing from "./useEditing";
import { FieldType } from "la-ui-schema/lib/EnumModule";
import { checkHidden, TAnyForm } from "~/utils/confUtils";
import { TFieldSpec } from "~/types/schema/widget.type";

function ViewFieldLabel({ label }: { label?: string }) {
  return  label ? <Typography variant="subtitle-medium" className="text-lucid-grey-600 !leading-[0.875rem]">
    {label}
  </Typography> : null
}

function ViewFieldValue({ value, onEdit, onDelete }: { value?: string, onEdit?: () => void, onDelete?: () => void}) {
  return <div className="flex items-center gap-2">
    <Typography variant="subtitle-medium" className="text-lucid-grey-600 !leading-[0.875rem] inline-block">
      {value}
    </Typography>
    {onEdit ? <IconButton
      className="hover-toggle-target text-xs"
      icon="fa fa-pencil"
      onClick={onEdit}
    />: null}
    {onDelete ? <IconButton
      icon="fa fa-trash"
      className="hover-toggle-target text-red text-xs"
      onClick={onDelete}
    /> : null}

  </div>
}

export default function ViewField({ id, conf, data, uiConf, onEdit, processOnSubmit, onDelete }: TViewField) {
  const { isEditing, setEdit } = useEditing(id)
  const [deleted, setDeleted] = useState(false)
  const value = deleted ? "" : (dottie.get(data, conf.id) || conf.value);
  const [fieldConf, setFieldConf] = useState<TFieldSpec>(conf)

  useEffect(() => {
    if (uiConf?.fieldType) {
      setFieldConf({
        ...conf,
        fieldType: conf.fieldType
      })
    } else {
      setFieldConf(conf)
    }
    
  }, [uiConf?.fieldType])

  const handleEdit = fieldConf.fieldType !== FieldType.ViewField ? () => {
    if (onEdit) {
      onEdit()
    } else {
      setEdit(true)
    }
  } : undefined

  const handleClose = () => setEdit(false)

  const onSubmit: SubmitHandler<Inputs> = (data) => {
    if (processOnSubmit) {
      const parsedValues = parseValues(data)
      processOnSubmit(parsedValues)
      handleClose()
    } 
  }

  const handleDelete = onDelete ? () => {
    setDeleted(true);
    onDelete();
  } : undefined

  const isHidden = useMemo(() => {
    return checkHidden(conf, data, uiConf, isEditing)
  }, [conf, uiConf, data, isEditing])

  return !!isHidden ? null : <Row className="!flex-nowrap min-h-10 items-center hover-toggle-trigger !gap-0" id={id}>
    <Column colSize="auto" className="!w-[30%] min-w-40 label-wrapper">
      <ViewFieldLabel label={uiConf?.label || conf.label || " "} />
    </Column>
    <Column colSize="auto" className="grow-1 !w-[65%] max-w-[21.25rem]">
      {isEditing ? <EditableFormField
        conf={conf}
        {...uiConf}
        {...uiConf?.formType?.Add}
        value={value}
        onClose={handleClose}
        onSubmitForm={onSubmit}
        id={id}
      /> : <ViewFieldValue
        value={value as string}
        onEdit={handleEdit}
        onDelete={handleDelete}
      />}
    </Column>
  </Row>
}