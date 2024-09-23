import { Control, FieldError, FieldErrorsImpl, Merge, Validate, Message, ValidationRule } from "react-hook-form"
import { TOption } from "~/types/app.types"
import { TFieldSpec } from "~/types/schema/widget.type"

export type TAnyValue  = string | boolean | number | string[] | boolean[] | number[] | object
export type TAnyMap = {
  [key: string]: TAnyMap | TAnyValue
}

export type Inputs = TAnyMap

export interface FormFieldProps {
  name?: string
  conf: TFieldSpec
  formData?: Inputs
  columnData?: Inputs
  control?: Control<Inputs, any>
  error?: FieldError | Merge<FieldError, FieldErrorsImpl<any>>
  getFormValues?: Function,
  labelPlacement?: "inside" | "outside" | "outside-left"
  description?: string
  value?: any
  placeholder?: string
  onChange?: Function
  component?: any
  fieldProps?: Partial<TFinalFormFieldProps>
}

export interface TFinalFormFieldProps {
  key?: string
  label: string
  errorMessage: string
  readOnly: boolean
  conf: TFieldSpec
  labelPlacement: "inside" | "outside" | "outside-left"
  description: string
  variant: any
  placeholder?: string
  options?: TOption[]
  children?: any
  multiple?: boolean
  className?: string
  href?: string
  type?: string
  onClick?: (e: any) => void
  formData?: Inputs
  columnData?: Inputs
  value?: TAnyValue
}

export interface ControlProps {
  name: string
  control: Control<Inputs, any>
  rules: {
    required?: Message | ValidationRule<boolean>;
    min?: ValidationRule<number | string>;
    max?: ValidationRule<number | string>;
    maxLength?: ValidationRule<number>;
    minLength?: ValidationRule<number>;
    pattern?: ValidationRule<RegExp>;
    validate?: Validate<any, Inputs> | Record<string, Validate<any, Inputs>> | undefined
    // future: conf?.validation?.future,
    // past: conf?.validation?.past
  }
}