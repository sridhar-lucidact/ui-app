import { Autocomplete, AutocompleteItem, AutocompleteProps, Selection } from "@nextui-org/react";
import React, { forwardRef, Key, useEffect, useRef } from "react";
import { RefCallBack } from "react-hook-form";
import { TFieldSpec } from "~/types/schema/widget.type";
import { useFormField } from "./useFormField";
import { FormFieldProps } from "./formFieldTypes";
import CoreAutocomplete from "../FormControl/Autocomplete/Autocomplete";

interface SelectOption {label?: string; icon?: string, value: string, default?: true}

type LaSelectProps = AutocompleteProps & {
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
  conf?: TFieldSpec;
}

export default forwardRef(function LaAutocomplete(props: LaSelectProps, ref) {
  useRef(ref);
  const { onSelectChange, onKeyup } =  useFormField(props as FormFieldProps, true);
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

  const handleSelectionChange = (e: Key | null) => {
    onSelectChange(e as Key)
  }

  return <CoreAutocomplete
    labelPlacement="outside"
    {...props}
    placeholder={`Select ${props.label}`}
    isInvalid={!!errorMessage}
    onSelectionChange={handleSelectionChange}
    // selectionMode={props.multiple ? "multiple" : "single"}
    // selectedKey={values.join(",")}
    // onSelectionChange={setValues}
    autoFocus={props.conf?.controls?.focus}
    options={options}
    aria-readonly={props.readOnly}
    // onChange={onSelectChange}
    onSearch={onKeyup}
    isDisabled={props.readOnly || props.isDisabled}
  />
})