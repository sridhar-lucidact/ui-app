import { forwardRef, useMemo, useState } from 'react'
import { TagProps, TagVariant } from './types';
import { getTagElement } from './helpers';
import { cn } from '@nextui-org/react';

const getDefaultClassnames = (tagVariant:TagVariant)=> {
  const classnames: Record<TagVariant, string> = {
    "default": " bg-lucid-grey-600 hover:bg-lucid-grey-700 text-white" ,
    "default-lite": " bg-lucid-grey-200 hover:bg-lucid-grey-400 text-lucid-grey-700 ",
    
    "info": " bg-lucid-blue-500 hover:bg-lucid-blue-600 text-white",
    "info-lite": " bg-lucid-blue-100 hover:bg-lucid-blue-200 text-lucid-blue-500",
    
    "success": " bg-lucid-green-400 hover:bg-lucid-green-500 text-white",
    "success-lite": " bg-lucid-green-100 hover:bg-lucid-green-200 text-lucid-green-400",
    
    "warning": " bg-lucid-orange-500 hover:bg-lucid-orange-600 text-white",
    "warning-lite": " bg-lucid-orange-200 hover:bg-lucid-orange-300 text-lucid-orange-500",
    
    "secondary": " bg-lucid-magenta-100 hover:bg-lucid-magenta-200 text-lucid-magenta-400",
  };

  return classnames[tagVariant];
};

const getOnHoverBG = (tagVariant:TagVariant)=> {
  const classnames: Record<TagVariant, string> = {
    "default": "bg-lucid-grey-700",
    "default-lite": "bg-lucid-grey-400",

    "info": "bg-lucid-blue-600",
    "info-lite": "bg-lucid-blue-200",
    
    "success": "bg-lucid-green-500",
    "success-lite": "bg-lucid-green-200",
    
    "warning": "bg-lucid-orange-600",
    "warning-lite": "bg-lucid-orange-300",
    
    "secondary": "bg-lucid-magenta-200",
  };

  return classnames[tagVariant];
};

type ExtendedTagProps = TagProps & {
  onRightIconClick?: (value?: string) => void,
  onLeftIconClick?: (value?: string) => void,
}

export const Tag = forwardRef<HTMLDivElement | HTMLSpanElement | null, ExtendedTagProps>(
  (
    {
      tag = "span",
      className,
      variant = "default",
      value,
      onClick,
      leftIcon,
      onLeftIconClick,
      rightIcon,
      onRightIconClick,
      iconWrapperClassname,
      ...rest
    },
    ref
  ) => {

    const [hoverOnTag, setHoverOnTag] = useState(false);

    const Tag = getTagElement(tag);

    const handleOnClick = ()=> {
      onClick?.(value);
    };

    const handleOnMouseOver = ()=> {
      setHoverOnTag(true);
    };

    const handleOnMouseOut = ()=> {
      setHoverOnTag(false);
    };

    const handleRightIconClick = () => {
      onRightIconClick?.(value)
    }

    const handleLeftIconClick = () => {
      onLeftIconClick?.(value)
    }

    const baseIconClassname = " flex items-center justify-center pr-[.125rem] pl-[.125rem]";

    const baseTagClassnames = useMemo(()=> {
      return getDefaultClassnames(variant);
    }, [variant]);

    const onHoverBgClassname = useMemo(()=> {
      return hoverOnTag ? getOnHoverBG(variant) : "";
    }, [hoverOnTag, variant]);

    return (
      <div className={cn(' select-none inline-flex items-stretch')}>
        {leftIcon ? ( 
          <button onClick={handleLeftIconClick} className={cn(
            baseIconClassname, 
            baseTagClassnames,
            onHoverBgClassname, {
              "rounded-l": leftIcon,
            }, iconWrapperClassname
          )}>
            {leftIcon}
          </button>
        ) : ""}

        <Tag 
          {...rest} 
          onClick={handleOnClick}
          ref={ref}
          onMouseOver={handleOnMouseOver} 
          onMouseOut={handleOnMouseOut} 
          className={cn( `
            flex items-center justify-center
            py-1
            px-[.375rem]              
            cursor-pointer
            text-xs
            leading-[.9rem]
            font-medium
            tracking-[-.24px] 
          `, baseTagClassnames, { 
            "pl-[.125rem] rounded-r": leftIcon,
            "pr-[.125rem] rounded-l": rightIcon,
            "rounded": !rightIcon && !leftIcon,
            "rounded-none": rightIcon && leftIcon,
          }, className )}
        />

        {rightIcon ? (
          <button onClick={handleRightIconClick} className={cn(
            baseIconClassname, 
            baseTagClassnames,
            onHoverBgClassname, {
              "rounded-r px-2": rightIcon,
            }, iconWrapperClassname
          )}>
            {rightIcon}
          </button>
        ) : ""}
      </div>
    );
  }
);
