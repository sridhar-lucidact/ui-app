import { TFieldSpec, TForm, TWidget } from "~/types/schema/widget.type";
import { TCardBarSchema } from "./schema/card.type";
import { Inputs } from "~/components/core/FormElements/formFieldTypes";
import { SubmitHandler } from "react-hook-form";
import { HtmlHTMLAttributes } from "react";

export type ConfType = TWidget | TForm | TCardBarSchema | TFieldSpec

export interface TViewField {
  conf: TFieldSpec,
  data?: any,
  id: string,
  uiConf?: TFieldSpec,
  value?: string
  onEdit?: () => void
  processOnSubmit?: (data: any) => Promise<any[]>
  onDelete?: () => void
}

export interface TViewFieldWithRows extends TViewField {
  rows: TFieldSpec[][],
  repeatUiConf?: any
}

export interface TRepeatField extends TViewFieldWithRows {
  position: number
}

export interface TEditableField extends HtmlHTMLAttributes<HTMLDivElement> {
  conf: TFieldSpec,
  value?: any,
  onClose: () => void,
  id: string,
  onSubmitForm: SubmitHandler<Inputs>
}