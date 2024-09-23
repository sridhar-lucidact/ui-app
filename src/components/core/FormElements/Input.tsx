
import { cn } from "@nextui-org/react";
import { createRef, forwardRef, useRef } from "react";
import CoreInput, { CoreInputProps } from "../FormControl/Input";
import { TFieldSpec } from "~/types/schema/widget.type";

type LaInputProps = CoreInputProps & {
  conf?: TFieldSpec
}

export default forwardRef(function LaInput(props: LaInputProps, ref) {
  useRef(ref);
  const input = createRef<HTMLInputElement>();
  const { errorMessage } = props;

  return <CoreInput
    {...props}
    isInvalid={!!errorMessage}
    ref={input}
    autoFocus={props.conf?.controls?.focus}
    classNames={{ inputWrapper: cn('after:bg-blue-500', { '!border-b-small': props.variant === "underlined" })}}
  />
})