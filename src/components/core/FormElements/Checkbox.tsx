import {CheckboxGroup, CheckboxGroupProps} from "@nextui-org/react";
import { forwardRef, useRef } from "react";
import { RefCallBack } from "react-hook-form";
import { Checkbox } from "~/components/core/FormControl/Checkbox/Checkbox";
import { TFieldSpec } from "~/types/schema/widget.type";
import { useFormField } from "./useFormField";
import { FormFieldProps } from "./formFieldTypes";

interface CheckboxOption {label?: string; icon?: string, value: string, default?: true}

type LaCheckboxGroupProps = CheckboxGroupProps & {
  options?: CheckboxOption[],
  label: string | undefined
  errorMessage: string;
  onChange?: (...event: any[]) => void;
  onBlur?: any;
  value: string;
  disabled?: boolean | undefined;
  name: string;
  ref: RefCallBack;
  conf?: TFieldSpec;
}

export default forwardRef(function LaCheckbox(props: LaCheckboxGroupProps, ref) {
  useRef(ref);
  const { errorMessage, options } = props;
  const { onChange, onInputChange } =  useFormField(props as FormFieldProps);

  const onValueChange = (value: string[]) => {
    onChange(value, value)
  }
  
  if (options) {
    return <CheckboxGroup
      description={errorMessage}
      isInvalid={!!errorMessage}
      label={props.label}
      onValueChange={onValueChange}
    >
      {options.map(option => <Checkbox key={option.value} value={option.value}>{option.label}</Checkbox>)}
    </CheckboxGroup>
  } else {
    return <Checkbox onChange={onInputChange} isInvalid={!!errorMessage}>{props.label}</Checkbox>
  }
})