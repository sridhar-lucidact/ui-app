import { ReactNode } from "react";
import { TypographyProps } from "src/components/core/Typography/types";

export type PartialInfoStatusSearchProps = Partial<{
  labelProps: Omit<TypographyProps, "children">,
  className: string
}>;

export type InfoStatusSearchProps = PartialInfoStatusSearchProps & {
  icon: ReactNode,
  children: ReactNode
};