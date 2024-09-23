import { createRef, forwardRef, useMemo, useRef } from "react";
import { CoreInputProps } from "../FormControl/Input";
import { TFieldSpec } from "~/types/schema/widget.type";
import { Switch } from "../FormControl/Switch/Switch";
import { useFormField } from "./useFormField";
import { FormFieldProps } from "./formFieldTypes";

type LaSwitchProps = CoreInputProps & {
  conf?: TFieldSpec
}

export default forwardRef(function LaInput(props: LaSwitchProps, ref) {
  useRef(ref);
  const { onChange } =  useFormField(props as FormFieldProps);

  const onValueChange = (isSelected: boolean) => {
    onChange(isSelected, isSelected)
  }
  const input = createRef<HTMLInputElement>();

  const isSelected = useMemo(() => {
    let selected: string | boolean = props.value || false;
    if (props.value === "false") {
      selected = false
    } else if (props.value === "true") {
      selected = true;
    }
    return selected as boolean;
  }, [props.value])
  
  return <div className="flex gap-2 items-center mt-6">
    <div className="!w-[30%] min-w-40">&nbsp;</div>
    <Switch
      isSelected={isSelected}
      name={props.name}
      value={props.value}
      readOnly={props.readOnly}
      required={props.required}
      onValueChange={onValueChange}
      ref={input}
    >
      {props.label}
    </Switch>
  </div>
})