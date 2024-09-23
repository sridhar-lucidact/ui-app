import React, { ForwardedRef, forwardRef } from "react";
import { Popover, PopoverTrigger, PopoverContent, PopoverProps, usePopoverContext } from "@nextui-org/popover";
import { cn } from "@nextui-org/react";



type CustomCorePopoverProps = {

    /**
     * Trigger node on which the popover will anchor 
     * 
     * It should support ref otherwise popup won't work
     */
    triggerNode: React.ReactNode,
    /**
     * This node will be the content of Popover
     */
    children: React.ReactNode,

}


type CorePopoverProps = Omit<PopoverProps, "children"> & CustomCorePopoverProps


/**
 * Component wraps next-ui's Popover component and provides standard functionality for easy use
 * 
 * For documentation
 * @see https://nextui.org/docs/components/popover#api
 */
const CorePopover = forwardRef(({
    children,
    triggerNode,
    className,
    ...restProps
}: CorePopoverProps, ref: ForwardedRef<HTMLDivElement>) => {

    return (
        <Popover {...restProps} ref={ref} classNames={{
            content: cn("core-popover items-start !shadow-elevated-lite border border-lucid-grey-300 rounded-xl p-0 overflow-hidden", className)
        }}>
            <PopoverTrigger>
                {triggerNode}
            </PopoverTrigger>
            <PopoverContent>
                {children}
            </PopoverContent>
        </Popover>
    );
})



export const useCorePopoverContext = usePopoverContext;

export default CorePopover;