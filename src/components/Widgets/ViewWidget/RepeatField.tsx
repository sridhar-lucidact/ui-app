
import { useMemo, useState } from "react";
import { TRepeatField } from "~/types/compoundTypes";
import SubmittableForm from "../AddWidget/SubmittableForm";
import ViewField from "./ViewField";
import dottie from "dottie";
import { parseValues } from "~/components/core/FormElements/formFieldHelper";
import useEditing from "./useEditing";


export default function RepeatField(props: TRepeatField) {
  const { id, conf, data, rows, repeatUiConf, processOnSubmit, onDelete, position } = props;
  const { isEditing, setEdit } = useEditing(`${id}.${position}`)
  // const [edit, setEdit] = useState(false);
  const [deleted, setDeleted] = useState(false)

  const fields = useMemo(() => {
    if (!isEditing) return [];
    const mainId = conf.id.split(".")[0];
    const extendedUiConf = {
      [mainId]: repeatUiConf
    }
    const f = rows
      .map(row => row.filter(col => col.id.includes(mainId)))
      .filter(row => row)
      .map(row => row.map(col => {
        const uiConf: any = dottie.get(extendedUiConf, col.id)
        const { formType, ...rest } = uiConf || {};
        return {
          ...col,
          ...rest,
          ...formType?.Add
        }
      }));
    return f
  }, [id, isEditing, rows, repeatUiConf])

  const formData = useMemo(() => {
    const mainId = conf.id.split(".")[0];
    if (!data.hasOwnProperty(mainId)) {
      return {
        [mainId]: data
      }
    }
    return data;
  }, [id])

  const onEdit = () => {
    setEdit(true)
  }

  const handleClose = () => setEdit(false)

  const onSubmit = async (data: any) => {
    if (processOnSubmit) {
      const parsedValues = parseValues(data)
      processOnSubmit(parsedValues)
      handleClose()
    }
    return [];
  }

  const handleDelete = onDelete ? () => {
     setDeleted(true);
     onDelete();
  } : undefined

  return isEditing ? <SubmittableForm
    id={id}
    rows={fields}
    type="update"
    processOnSubmit={onSubmit}
    onCancel={handleClose}
    formData={formData}
  /> : deleted ? null : <ViewField {...props} data={formData} onEdit={onEdit} onDelete={handleDelete}/>
}