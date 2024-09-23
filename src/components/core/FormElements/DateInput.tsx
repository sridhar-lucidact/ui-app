import {CalendarDate, CalendarDateTime, ZonedDateTime} from '@internationalized/date';
import { forwardRef, useEffect, useRef, useState } from "react";
import CoreDatePicker, { CoreDatePickerProps } from "../FormControl/DatePicker/DatePicker";
import { TFieldSpec } from '~/types/schema/widget.type';
import { DateValue } from '@nextui-org/react';

type LaDateInputProps = CoreDatePickerProps & {
  conf?: TFieldSpec,
  readOnly?: boolean
}

const getDate = (value:  DateValue | null | undefined) => {
  let v = value;
  try {
    if (v && typeof v === "string") {
      const date = new Date(v);
      if ((v as string).includes("T") || (v as string).includes(" ")) {
        v = new CalendarDateTime(
          date.getFullYear(),
          date.getMonth(),
          date.getDate(),
          date.getHours(),
          date.getMinutes(),
          date.getSeconds()
        );
      } else {
        v = new CalendarDate(
          date.getFullYear(),
          date.getMonth(),
          date.getDate()
        );
      }
    }  
  } catch (error) {
    console.log(error)
  }
  
  return v;
}

export default forwardRef(function LaInput(props: LaDateInputProps, ref) {
  const [value, setValue] = useState<ZonedDateTime | CalendarDate | CalendarDateTime | undefined | null>(getDate(props.value))
  const { errorMessage } = props;

  useEffect(() => {
    if (props.value) {
      setValue(getDate(props.value))
    } else {
      setValue(null)
    }
  }, [props.value])

  useRef(ref);
  return <CoreDatePicker
    labelPlacement="outside"
    {...props}
    value={value || null}
    isInvalid={!!errorMessage}
    aria-readonly={props.readOnly}
    autoFocus={props.conf?.controls?.focus}
    isDisabled={props.readOnly || props.isDisabled}
  />
})