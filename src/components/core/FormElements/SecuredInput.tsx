import { createRef, forwardRef, useRef, useState } from "react";
import { TFieldSpec } from "~/types/schema/widget.type";
import Input from "./Input";
import { CoreInputProps } from "../FormControl/Input";

type LaInputProps = CoreInputProps & {
  conf?: TFieldSpec
}

export default forwardRef(function LaInput(props: LaInputProps, ref) {
  useRef(ref);
  const input = createRef<HTMLInputElement>();
  
  const [isVisible, setIsVisible] = useState(false);

  const toggleVisibility = () => setIsVisible(!isVisible);

  return <Input
    {...props}
    ref={input}
    endContent={
      <button className="focus:outline-none" type="button" onClick={toggleVisibility}>
        {isVisible ? (
          <span className="lucid-icon lucid-icon-eye-slash"></span>
        ) : (
          <span className="lucid-icon lucid-icon-eye"></span>
        )}
      </button>
    }
    type={isVisible ? "text" : "password"}
  />
})