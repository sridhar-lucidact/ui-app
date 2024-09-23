import { FieldError, FieldErrorsImpl, Merge } from "react-hook-form"
import { CalendarDate } from "@nextui-org/react";
import { format } from "date-fns/format";
import { Inputs } from "./formFieldTypes";
import { FieldType } from "~/types/schema/enum.type";
import { TFieldSpec } from "~/types/schema/widget.type";

export const parseValues = (data: Inputs) => {
  const values: any = data
  if (!values) return values;
  if (Array.isArray(values)) {

  } else {
    for (let key in values) {
      const value = values[key];
      if (value && value.calendar) {
        let date = value as CalendarDate;       
        values[key] = format(date.toDate("UTC"), "yyyy-MM-dd")
      }
    }
  }
  return values;
}

export const getErrorMessage = (error?: FieldError | Merge<FieldError, FieldErrorsImpl<any>>, conf?: TFieldSpec): string => {
  let errorMessage = ""
  if (error && typeof error != "string") {
    if (error.message) {
      errorMessage = error.message as string
    } else if(error.type === "required") {
      errorMessage = `${conf?.label} is required`
    } else if(error.type === "required") {
      errorMessage = `${conf?.label} is required`
    } else if(error.type === "max") {
      errorMessage = `Max value ${conf?.label} allowed is ${conf?.validation?.maxValue}`
    } else if(error.type === "min") {
      errorMessage = `Min value ${conf?.label} needed is ${conf?.validation?.minValue}`
    } else if(error.type === "maxLength") {
      errorMessage = `Max length ${conf?.label} allowed is ${conf?.validation?.maxLength}`
    } else if(error.type === "minLength") {
      errorMessage = `Min length ${conf?.label} needed is ${conf?.validation?.minLength}`
    } else if(error.type === "pattern") {
      errorMessage = `Incorrect pattern provided for ${conf?.label}`
    } else if(error.type === "validate") {
      errorMessage = `Error in ${conf?.label}`
    }
    
  }

  return errorMessage;
}


const validateArrayLength = (value: any[], conf: TFieldSpec) => {
  if (conf.validation?.maxValue && value.length > conf.validation.maxValue) {
    return `Select upto ${conf.validation.maxValue} only`
  }

  if (conf.validation?.minValue && value.length < conf.validation.minValue) {
    return `Select atleast ${conf.validation.minValue}`
  }

  if (conf.validation?.maxLength && value.length > conf.validation.maxLength) {
    return `Select upto ${conf.validation.maxLength} only`
  }

  if (conf.validation?.minLength && value.length < conf.validation.minLength) {
    return `Select atleast ${conf.validation.minLength}`
  }
}

export const validateField = (conf: TFieldSpec) => (value: any) => {
  if (Array.isArray(value)) {
    return validateArrayLength(value, conf)
  }

  if ((conf.fieldType === FieldType.DropDownMultiSelect || conf.fieldType === FieldType.AutoFillMulti) && value) {
    const selectedValues = value.split(",")
    return validateArrayLength(selectedValues, conf)
  }


  // if (conf.fieldType === FieldType.DateField && value) {
  //   validateDate(value)
  // }
  return undefined;
}