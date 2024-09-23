import {RadioGroup, Radio, RadioGroupProps} from "@nextui-org/react";
import { forwardRef, useRef } from "react";
import { RefCallBack } from "react-hook-form";
import { TFieldSpec } from "~/types/schema/widget.type";
import { useFormField } from "./useFormField";
import { FormFieldProps } from "./formFieldTypes";

interface RadioOption {label?: string; icon?: string, value: string, default?: true}

type LaRadioGroupProps = RadioGroupProps & {
  options: RadioOption[],
  label: string | undefined
  errorMessage: string;
  onChange: (...event: any[]) => void;
  onBlur?: any;
  value: string;
  disabled?: boolean | undefined;
  name: string;
  ref: RefCallBack;
  conf?: TFieldSpec;
}

export default forwardRef(function LaRadioGroup(props: LaRadioGroupProps, ref) {
  useRef(ref);
  const { onInputChange } =  useFormField(props as FormFieldProps);
  const { errorMessage, options, label } = props;

  return <RadioGroup
    {...props}
    label={label}
    isInvalid={!!errorMessage}
    onChange={onInputChange}
  >
    {options.map(option => <Radio key={option.value} value={option.value}>{option.label}</Radio>)}
  </RadioGroup>
});
