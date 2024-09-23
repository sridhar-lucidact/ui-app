import { EventType } from "la-ui-schema/lib/EnumModule";
import React, { ChangeEvent, Key, MouseEvent } from "react";
import { useEvents } from "~/executableEvents/useEvents";
import { FormFieldProps, TAnyValue } from "./formFieldTypes";
import { parseValues } from "./formFieldHelper";

export function useFormField(formField: FormFieldProps, load?: boolean) {
  const { processOnClick, processOnChange, hasEvent, processOnKeyup  } = useEvents(formField.conf, formField.conf.id, load);

  const onClick = (e: MouseEvent<HTMLButtonElement | HTMLAnchorElement>) => {
    e.preventDefault();
    e.stopPropagation();
    // console.log('onClick', hasEvent(EventType.OnClick), formField.conf)
    if(hasEvent(EventType.OnClick)) {
      const values = formField.formData ? parseValues(formField.formData) : null; 
      processOnClick(values)
    } else {
      const el = e.target as HTMLAnchorElement
      if (el.href) {
        window.location.href = el.href
      }
    }
  }

  const onSelectChange = (e: React.ChangeEvent<HTMLSelectElement> | Key) => {
    let value = e as string
    if (e.hasOwnProperty("target")) {
      value = (e as React.ChangeEvent<HTMLSelectElement>).target.value
    }
    onChange(e, value)
  }

  const onInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    let value = ""
    if (e.hasOwnProperty("target")) {
      value = e.target.value
    }
    onChange(e, value)
  }

  const onChange = (e: ChangeEvent<HTMLSelectElement | HTMLInputElement> | Key | boolean | string[], value: TAnyValue) => {
    const name = formField.name as string;
    if(hasEvent(EventType.OnChange, undefined, value)) {
      processOnChange({ [name]: value }, value)
    } else if (hasEvent(EventType.OnChange)) {
      processOnChange({ [name]: value })
    }
    if (formField.onChange) {
      formField.onChange(e)
    }
  }

  const onKeyup = (value: string) => {
    const name = formField.name as string;
    return processOnKeyup({ [name]: value })
  }

  return {
    onClick,
    onSelectChange,
    onInputChange,
    onChange,
    onKeyup
  }
}