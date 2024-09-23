import { hydrateString } from "~/utils/appHelper";
import { FormFieldProps } from "./formFieldTypes";
import { FieldType } from "~/types/schema/enum.type";
import Button from "../Button/Button";
import { useFormField } from "./useFormField";
import { useMemo } from "react";
import { checkHidden } from "~/utils/confUtils";

export const ClickFields = (props: FormFieldProps) => {
  const { conf, formData, columnData } = props
  const { onClick } =  useFormField(props, false);

  const isHidden = useMemo(() => {
    return checkHidden(conf, formData, undefined, false)
  }, [conf, formData])
  
  if (isHidden) return null;

  if (conf.fieldType === FieldType.Button) {
    return <Button onClick={onClick}>
      {conf.label}
    </Button>
  } else if (conf.fieldType === FieldType.Hyperlink) {
    let href = columnData && conf.name && columnData[conf.name] ? columnData[conf.name] : ""
    if (!href) href = conf.value || conf.defaultValue || "#"
    href = hydrateString(href as string, conf, formData, []);
    
    const className = "relative inline-flex items-center tap-highlight-transparent outline-none data-[focus-visible=true]:z-10 data-[focus-visible=true]:outline-2 data-[focus-visible=true]:outline-focus data-[focus-visible=true]:outline-offset-2 text-medium text-primary no-underline hover:opacity-80 active:opacity-disabled transition-opacity text-sm font-bold"
    return <a className={className} href={href} onClick={onClick}>{conf.label}</a>
  }
}