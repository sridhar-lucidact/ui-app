import { Checkbox as NextUICheckbox } from '@nextui-org/react';
import { forwardRef } from 'react'
import { CheckboxProps } from './types';
import { cn } from '@nextui-org/react';

export const Checkbox = forwardRef<HTMLInputElement | null, CheckboxProps>(
  (
    {
      className,
      name,
      classNames,
      ...rest
    },
    ref
  ) => {
    return (
      <NextUICheckbox 
        name={name}
        {...rest}
        className=' '
        classNames={{
          ...classNames,
          base: cn("p-0 m-0", classNames?.base),
          icon: cn("p-[.03rem]", classNames?.icon),
          wrapper: cn(`
            h-4 w-4
          
            rounded
            border 
            before:border-0
            border-lucid-grey-500 
            hover:border-lucid-grey-600 
            
            group-data-[focus-visible=true]:ring-0
            
            before:rounded
            after:rounded
            group-data-[pressed=true]:scale-95
            group-data-[pressed=true]:bg-transparent

            after:bg-lucid-blue-500
            after:hover:bg-lucid-blue-600
            
            group-data-[pressed=true]:hover:bg-transparent
            
            group-data-[selected=true]:border-lucid-blue-500
            group-data-[selected=true]:hover:border-lucid-blue-600
            group-data-[selected=true]:bg-lucid-blue-500
            group-data-[selected=true]:hover:bg-lucid-blue-600
          `, classNames?.wrapper)
        }} 
        ref={ref}
      />
    );
  }
);
