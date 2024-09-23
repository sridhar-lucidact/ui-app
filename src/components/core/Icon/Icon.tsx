import { PropsWithChildren, CSSProperties, useMemo } from "react";
import { cn } from "@nextui-org/react";
import { IconProps } from "./types"


/**
 * Component which displays icons based on the name provided as its children
 * @example 
 * 
 * <Icon>close</Icon>
 */
const Icon = (props: PropsWithChildren<IconProps>) => {
	const {
		className,
		color: iColor = "inherit",
		children,
		lineHeight = "inherit",
		size: iconSize,
		style = {},
	} = props;


	const styles = useMemo<CSSProperties>(() => {
		const stylesToUse = {
			...style,
		}
		if (iconSize) {
			stylesToUse.fontSize = iconSize;
		}

		if (lineHeight && lineHeight !== "inherit") {
			stylesToUse.lineHeight = lineHeight;
		}
		return stylesToUse
	}, [style, iColor, lineHeight, iconSize])

	return (
		<span
			className={cn(
				`lucid-icon-${children} leading-none`,
				className
			)}
			style={styles}
		/>
	);
};

export default Icon;