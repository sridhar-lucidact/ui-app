import { Selection } from "@nextui-org/react";
import React, { forwardRef, useEffect, useRef } from "react";
import { RefCallBack } from "react-hook-form";
import CoreSelect, { CoreSelectProps } from "../FormControl/Select/Select";
import { TFieldSpec } from "~/types/schema/widget.type";
import { useFormField } from "./useFormField";
import { FormFieldProps } from "./formFieldTypes";

interface SelectOption {label?: string; icon?: string, value: string, default?: true}

type LaSelectProps = CoreSelectProps & {
  options: SelectOption[],
  label: string | undefined
  errorMessage: string;
  onChange: (...event: any[]) => void;
  onBlur?: any;
  value: string;
  disabled?: boolean | undefined;
  name: string;
  ref: RefCallBack;
  children?: any;
  conf?: TFieldSpec
  readOnly?: boolean
}


export default forwardRef(function LaSelect(props: LaSelectProps, ref) {
  useRef(ref);
  const { onSelectChange } =  useFormField(props as FormFieldProps, true);
  const [values, setValues] = React.useState<Selection>(new Set([]));
  const { errorMessage, options } = props;

  useEffect(() => {
    if (props.value !== [...values].join(",")) {
      if (!props.value) {
        setValues(new Set([]))
        return;
      }
      setValues(new Set(props.value.split(",")))
    }
  },  [props.value])

  return <CoreSelect
    labelPlacement="outside"
    {...props}
    placeholder={`Select ${props.label}`}
    isInvalid={!!errorMessage}
    selectionMode={props.multiple ? "multiple" : "single"}
    selectedKeys={values}
    onSelectionChange={setValues}
    autoFocus={props.conf?.controls?.focus}
    options={options}
    aria-readonly={props.readOnly}
    onChange={onSelectChange}
    isDisabled={props.readOnly || props.isDisabled}
  />
})