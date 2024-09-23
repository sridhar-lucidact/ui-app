
import dottie from "dottie";
import { EventType, FieldType } from "la-ui-schema/lib/EnumModule";
import { useSelector } from "react-redux";
import { ClickFields } from "~/components/core/FormElements/ClickableFields";
import { Inputs } from "~/components/core/FormElements/formFieldTypes";
import { useEvents } from "~/executableEvents/useEvents";
import { getRepeatConf, TRepeatConf } from "~/store/repeatConf";
import { getUiConf } from "~/store/uiConf";
import { TViewFieldWithRows } from "~/types/compoundTypes";
import { TFieldSpec } from "~/types/schema/widget.type";
import RepeatField from "./RepeatField";
import ViewField from "./ViewField";

export default function ViewFieldSpec({ id, conf, data, rows }: TViewFieldWithRows) {

  const uiConf: TFieldSpec | null = useSelector(getUiConf(id)) as TFieldSpec || null;
  const [firstId, ...restIds ] = id.split(".")
  const repeatConf: TRepeatConf | null = useSelector(getRepeatConf(firstId)) as TRepeatConf || null;

  const { processOnClick, hasEvent, processOnSubmit, verifyAndProcessEvents } = useEvents(conf, id);
  if (!conf) return null;
  
  const handleEdit = hasEvent(EventType.OnClick) ? () => {
    processOnClick(data)
  } : undefined

  const handleDelete = hasEvent(EventType.OnDelete) ? () => {
    verifyAndProcessEvents(EventType.OnDelete, {id, "field": conf.id})
  } : undefined

  if (conf.fieldType && [FieldType.Hyperlink, FieldType.Button].includes(conf.fieldType)) {
    return <ClickFields
      conf={conf}
      formData={data as Inputs}
    />
  }

  if (repeatConf) {
    return repeatConf.data.map((repeatData: any, index: number) => {
      const ids = restIds.join(".");
      const repeatUiConf: TFieldSpec = dottie.get(repeatConf.uiConf, `${index}.${ids}`)
      return <RepeatField
        key={`${id}-${index}`}
        id={id}
        conf={conf}
        data={repeatData || data}
        uiConf={{...repeatUiConf, ...uiConf}}
        rows={rows}
        position={index}
        repeatUiConf={repeatConf.uiConf[index]}
        processOnSubmit={processOnSubmit}
        onDelete={handleDelete}
      />
    })
  }
  if (conf.id.includes(".")) return null;

  return <ViewField
    id={id}
    conf={conf}
    data={data}
    uiConf={uiConf}
    onEdit={handleEdit}
    processOnSubmit={processOnSubmit}
    onDelete={handleDelete}
  />
}