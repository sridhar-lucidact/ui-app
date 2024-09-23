
import { cn } from "@nextui-org/react";
import { createRef, forwardRef, useRef } from "react";
import CoreInput, { CoreInputProps } from "../FormControl/Input";
import { TFieldSpec } from "~/types/schema/widget.type";

type ViewOnlyProps = CoreInputProps & {
  conf?: TFieldSpec
}

export default forwardRef(function ViewOnly(props: ViewOnlyProps, ref) {
  useRef(ref);
  const input = createRef<HTMLInputElement>();
  const { errorMessage  } = props;

  return <CoreInput
    {...props}
    isInvalid={!!errorMessage}
    ref={input}
    readOnly={false}
    disabled
    classNames={{ inputWrapper: '!border-0'}}
  />
})