import { Avatar, AvatarProps, } from "@nextui-org/avatar";
import CoreBadge, { CoreBadgeProps } from "./Badge";
import { useMemo } from "react";
import { cn } from "@nextui-org/react";




type CustomCoreAvatarProps = {
    /**
     * Show avatar with a badge
     * 
     * By default its enabled
     */
    withBadge?: boolean,
    /**
     * Placement of the badge 
     * 
     * @default "bottom-right"
     */
    badgePlacement?: CoreBadgeProps["placement"],
    /**
     * Pass classes to badge element
     */
    badgeClassName?: string,
    /**
     * Size of badge 
     * 
     * By default size is "sm"
     */
    badgeSize?: CoreBadgeProps["size"]

}


/**
 * Type definition for the props of CoreAvatar component
 */
type CoreAvatarProps = AvatarProps & CustomCoreAvatarProps;

/**
 * Component which wraps next-ui's Avatar component and provides some default styles 
 * 
 * For documentation
 * @see https://nextui.org/docs/components/avatar#api
 */
const CoreAvatar = ({ size = "md", radius = "full", withBadge = true, badgePlacement = "bottom-right", badgeClassName, badgeSize = "sm", ref, ...restProps }: CoreAvatarProps) => {

    const avatarNode = <Avatar
        {...restProps}
        radius={radius}
        size={size}
    />

    const badgeClassNames = useMemo(() => {
        return {
            badge: cn("bg-lucid-green-300", badgeClassName)
        }
    }, [badgeClassName])
    return (
        withBadge ?
            <CoreBadge content="" placement={badgePlacement} classNames={badgeClassNames} size={badgeSize} shape="circle">
                {avatarNode}
            </CoreBadge>
            :
            avatarNode

    )
}




export default CoreAvatar;