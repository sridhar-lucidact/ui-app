import { forwardRef } from 'react';
import { cn } from "@nextui-org/react";
import { TypographyProps } from './types';
import { getFontFamily, getTagVariant } from './helpers';

export const Typography = forwardRef<any, TypographyProps>(
  (
    {
      className,
      family = "Inter",
      variant = "body",
      tag,
      children,
      uppercase,
      enableLetterSpacing = true,
      onClick
    },
    ref
  ) => {

    const fontFamily = getFontFamily(family);
    const Tag = tag || getTagVariant(variant);

    return (
      <Tag ref={ref} onClick={onClick} className={cn(fontFamily, {
        // Big display
        "font-inter-tight text-[6.25rem] font-normal leading-[6.25rem]": variant === "big-title",
        // Headings
        "font-inter-tight text-4xl leading-[2.8125rem] font-medium": variant === "h1" || variant === "h1-title",
        "font-inter-tight text-xl leading-[1.125rem] font-medium": variant === "h2" || variant === "h2-title",
        // Body
        "font-sans text-base leading-5 font-normal tracking-[-0.16px]": variant === "body",
        "font-sans text-base leading-5 font-semibold tracking-[-0.16px]": variant === "body-semibold",
        // Subtitles
        "font-sans text-sm leading-[1.09375rem] font-normal": variant === "subtitle",
        "font-sans text-sm leading-[1.09375rem] font-medium tracking-[-0.28px]": variant === "subtitle-medium",
        "font-sans text-sm leading-[1.09375rem] font-semibold tracking-[-0.28px]": variant === "subtitle-semibold",
        // Subtitles (small)
        "font-sans text-xs leading-[0.9rem] font-normal tracking-[-.12px]": variant === "subtitle-s2",
        "font-sans text-xs leading-[0.9rem] font-medium tracking-[-.24px]": variant === "subtitle-medium-s2",
        "font-sans text-[.625rem] leading-[.625rem] font-semibold ": variant === "subtitle-semibold-s2",
        // general
        "uppercase": uppercase,
        "tracking-normal": !enableLetterSpacing
      }, className)}>
        {children}
      </Tag>
    );
  }
);