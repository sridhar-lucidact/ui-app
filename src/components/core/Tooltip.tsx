import { Tooltip, TooltipProps } from "@nextui-org/react";
import { cn } from "@nextui-org/react";

export type CoreTooltipProps = TooltipProps



/**
 * Component which wraps tooltip component from next-ui and gives a default styling to it
 * 
 * For documentation
 * @see https://nextui.org/docs/components/tooltip#tooltip-props
 */
const CoreTooltip = ({ children, className, ...restProps }: CoreTooltipProps) => {


    return (
        <Tooltip {...restProps} classNames={{
            content: cn("px-2 py-1 rounded border border-lucid-grey-300 shadow-elevated-lite text-lucid-grey-600 font-medium text-xs leading-[1.166667]", className)
        }}>
            {children}
        </Tooltip>
    )
}



export default CoreTooltip;