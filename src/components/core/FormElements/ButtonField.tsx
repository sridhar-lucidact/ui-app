import { useEvents } from "~/executableEvents/useEvents";
import Button from "~/components/core/Button/Button";
import { FormFieldProps, Inputs } from "./formFieldTypes";
import { parseValues } from "./formFieldHelper";

const ButtonField = ({ conf, getFormValues }: FormFieldProps) => {
  const { processOnClick } = useEvents(conf, conf.id)
  const handleClick = () => {
    if (getFormValues) {
      const formValues = getFormValues();
      const parsedValues = parseValues(formValues as Inputs)
      processOnClick(parsedValues)
    }
  }

  return <Button onClick={handleClick}>{conf.label}</Button>
}

export default ButtonField
