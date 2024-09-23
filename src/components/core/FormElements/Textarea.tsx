import { TFieldSpec } from "~/types/schema/widget.type";
import { forwardRef, useRef } from "react";
import CoreTextArea, { CustomCoreTextareaProps } from "../FormControl/Textarea";

type LaTextAreaProps = CustomCoreTextareaProps & {
  conf?: TFieldSpec;
}

export default forwardRef(function LaTextArea(props: LaTextAreaProps, ref) {
  const { errorMessage } = props;
  useRef(ref);
  return <CoreTextArea
    {...props}
    isInvalid={!!errorMessage}
  />
})