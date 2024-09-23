import { forwardRef } from 'react';
import { SwitchProps } from './types';
import { Switch as NextUiSwitch } from "@nextui-org/react";
import { cn } from '@nextui-org/react';

export const Switch = forwardRef<HTMLInputElement | null, SwitchProps>(
  (
    {
      classNames,
      size = "xs",
      ...rest
    },
    ref
  ) => {

    const isXS = size === "xs";

    return (
      <NextUiSwitch 
        {...rest} 
        size={!isXS ? size : undefined}
        classNames={{
          ...classNames,
          base: cn({
            [`h-4`]: isXS
          }, classNames?.base),
          wrapper: cn(
            `
              bg-lucid-grey-300
              hover:bg-lucid-grey-400
              group-data-[selected=true]:bg-lucid-blue-500
              group-data-[selected=true]:hover:bg-lucid-blue-600
            `, {
              [`
                h-4 w-[1.9375rem] 
                pl-[.1875rem] 
                pr-[.15rem]
              `]: isXS
            }, 
            classNames?.wrapper
          ),
          thumb: cn(
            "shadow-none",
            {
              [`
                h-3 w-3
                group-data-[pressed=true]:w-[.875rem]
                group-data-[selected=true]:ml-[.83rem]
                group-data-[selected=true]:group-data-[pressed=true]:!ml-[.7rem]
                group-data-[selected=true]:group-data-[pressed=true]:w-[.875rem]
              `]: isXS
            }, 
            classNames?.thumb
          )
        }}
        ref={ref} 
      />
    );
  }
);