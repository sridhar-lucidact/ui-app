import { Controller } from "react-hook-form"
import Input from "./Input";
import Textarea from "./Textarea";
import Select from "./Select";
import DateInput from "./DateInput";
import RadioGroup from "./RadioGroup";
import Checkbox from "./Checkbox";
import Autocomplete from "./Autocomplete";
import { ControlProps, FormFieldProps, TFinalFormFieldProps } from "./formFieldTypes";
import { getErrorMessage, validateField } from "./formFieldHelper";
import SecuredInput from "./SecuredInput";
import { useMemo, useState } from "react";
import { FieldType } from "~/types/schema/enum.type";
import { TFieldSpec } from "~/types/schema/widget.type";
import { TOption } from "~/types/app.types";
import { ClickFields } from "./ClickableFields";
import Switch from "./Switch";
import ViewOnly from "../FormControl/ViewOnly";
import dottie from "dottie";
import { getUiConf } from "~/store/uiConf";
import { useSelector } from "react-redux";
import { checkHidden } from "~/utils/confUtils";

const getFieldValue = (conf: TFieldSpec, columnData?: any, formData?: any, getFormValues?: Function) => {
  const name = conf.name as string
  
  const formValues = getFormValues ? getFormValues() : null
  const formValue = dottie.get(formValues, name)
  if (formValue) return formValue;
  
  const columnValue = dottie.get(columnData, name);
  if (columnValue) return columnValue;

  const formDataValue = dottie.get(formData, name);
  if (formDataValue) return formDataValue;

  return conf.value;
}

export const getField = (conf: TFieldSpec, attr: TFinalFormFieldProps, columnData?: any, formData?: any, getFormValues?: Function) => {
  
  let labelPlacement = attr.labelPlacement || "outside-left";
  if (conf.labelAlign === "vertical") {
    labelPlacement = "outside";
  }
  
  const field: { component: any, props: TFinalFormFieldProps } = {
    component: null,
    props: {
      ...attr,
      key: `${conf.name}-${conf.fieldType}`,
      variant: attr.variant || "underlined",
      label: conf?.label || "",
      readOnly: conf?.controls?.readOnly || false,
      conf: conf,
      placeholder: attr.placeholder || `Enter ${conf?.label}`,
      labelPlacement,
      errorMessage: attr.errorMessage,
      description: attr.description || ""
    }
  }

  const options = conf.options as TOption[];

  switch(true) {
    case conf.fieldType === FieldType.AmericanAddress:
    break;
    case conf.fieldType === FieldType.AutoFill:
      field.component = Autocomplete;
      field.props.options = options
      field.props.children = null
    break;
    case conf.fieldType === FieldType.AutoFillMulti:
      field.component = Autocomplete;
      field.props.options = options
      field.props.multiple = true
      field.props.children = null
    break;
    case conf.fieldType === FieldType.DropDown:
      field.component = Select;
      field.props.options = options
      field.props.children = null
    break;
    case conf.fieldType === FieldType.DropDownMultiSelect:
      field.component = Select;
      field.props.options = options
      field.props.multiple = true
      field.props.children = null
    break;
    case conf.fieldType === FieldType.Avatar:
    break;
    case conf.fieldType === FieldType.Button:
      field.component = ClickFields; 
      field.props.conf = conf;
      field.props.formData = getFormValues ? getFormValues() : null;
    break;
    case conf.fieldType === FieldType.Hyperlink:
      field.component = ClickFields;
      field.props.formData = formData;
      field.props.columnData = columnData;
    break;
    case conf.fieldType === FieldType.ChatControl:
    break;
    case conf.fieldType === FieldType.CheckBox:
      field.component = Checkbox;
      field.props.options = options
    break;
    case conf.fieldType === FieldType.Currentcy:
    break;
    case conf.fieldType === FieldType.DateField:
      field.component = DateInput;
    break;
    case conf.fieldType === FieldType.Decimal:
    break;
    case conf.fieldType === FieldType.FileUpload:
    break;
    case conf.fieldType === FieldType.Graph:
    break;
    case conf.fieldType === FieldType.Image:
    break;
    case conf.fieldType === FieldType.Percentage:
    break;
    case conf.fieldType === FieldType.Prgoress:
    break;
    case conf.fieldType === FieldType.Radio:
      field.component = RadioGroup;
      field.props.options = options || []
    break;
    // case conf.fieldType === FieldType.Reset:
      
    // break;
    case conf.fieldType === FieldType.Switch:
      field.component = Switch
    break;
    case conf.fieldType === FieldType.TextArea:
      field.component = Textarea;
    break;
    // case conf.fieldType === FieldType.Password:
    //   field.component = SecuredInput;
    // break;
    case conf.fieldType === FieldType.Email:
      field.component = Input;
      field.props.type = "email";
    break;
    case conf.fieldType === FieldType.Phone:
      field.component = Input;
    break;
    case conf.fieldType === FieldType.Text:
      field.component = Input;
    break;
    case conf.fieldType === FieldType.WholeNumber:
      field.component = Input;
      field.props.type = "number";
    break;
    case conf.fieldType === FieldType.ViewField:
      field.component = ViewOnly;
      field.props.value = getFieldValue(conf, columnData, formData, getFormValues)
    break;
    case conf.fieldType === FieldType.WorldAddress:
    break;
    default:
      field.component = "div";
      console.log("fieldType not found", conf.fieldType)
  }
  return field;
}

export const FormFieldWithoutController = (props: FormFieldProps) => {
  const [fieldValue, setFieldValue] = useState(props.value || "")
  const { conf } = props;
  const field = getField(conf, {} as TFinalFormFieldProps, null, null);
  
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFieldValue(e.target.value);
  }

  return <field.component
    {...field.props}
    onChange={handleChange}
    value={fieldValue}
    className="min-w-[200px]"
  />
}

const FormField = (props: FormFieldProps) => {
  const {
    conf,
    formData,
    columnData,
    control,
    error,
    getFormValues,
    labelPlacement,
    description,
    component: Component,
    fieldProps
  } = props

  if (!conf || !control) return null;

  const fieldUiConf = useSelector(getUiConf(conf.id)) as TFieldSpec;

  if (fieldUiConf?.fieldType) conf.fieldType = fieldUiConf.fieldType;
  
  const controlProps: ControlProps = {
    name: conf?.name || "",
    control,
    rules: {
      required: conf?.validation?.required,
      validate: validateField(conf)
    },
  }

  const errorMessage = getErrorMessage(error, conf)
  
  const finalFieldProps: TFinalFormFieldProps = {
    label: conf?.label || "",
    conf: conf,
    readOnly: conf?.controls?.readOnly || false,
    variant: "underlined",
    placeholder: conf?.placeholder || props.placeholder || `Enter ${conf?.label}`,
    labelPlacement: labelPlacement || "outside-left",
    errorMessage: errorMessage,
    description: description || "",
    ...fieldProps
  }

  const BaseField = getField(conf, finalFieldProps, columnData, formData, getFormValues);

  const isHidden = useMemo(() => {
    return checkHidden(conf, formData, fieldUiConf, true)
  }, [conf, fieldUiConf, formData, true])

  if (!!isHidden) return null;

  if (Component) {
    return <Controller
      {...controlProps}
      render={({ field }) => <Component
          {...field}
          {...BaseField.props} 
        />
      }
    />
  }

  if (conf.fieldType === FieldType.Hyperlink) {
    return <BaseField.component
      {...BaseField.props}
    />
  }
  return <Controller
    {...controlProps}
    render={({ field }) => <BaseField.component
        {...field}
        {...BaseField.props} 
      />
    }
  />
}

export default FormField;