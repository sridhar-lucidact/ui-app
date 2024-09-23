import { CardProps, cn, HTMLNextUIProps } from "@nextui-org/react";
import { Card as NextCard, CardHeader as NextCardHeader, CardBody as NextCardBody, CardFooter as NextCardFooter } from "@nextui-org/react";


export function CardHeader (props: HTMLNextUIProps<"div", never>) {
  return <NextCardHeader
    {...props}
    className={cn(props.className, "card-header")}
  />
} 

export function CardBody (props: HTMLNextUIProps<"div", never>) {
  return <NextCardBody
    {...props}
    className={cn(props.className, "card-body")}
  />
} 

export function CardFooter (props: HTMLNextUIProps<"div", never>) {
  return <NextCardFooter
    {...props}
    className={cn(props.className, "card-footer")}
  />
} 

export function Card(props: CardProps) {
  return <NextCard
    {...props}
    className={cn(props.className, "card border-1 rounded-xl border-[#DEE2E6] shadow-[2px_2px_5px_0px_rgba(73,80,87,0.05)]")}
  />
}