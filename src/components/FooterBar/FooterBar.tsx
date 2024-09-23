import { useEvents } from "~/executableEvents/useEvents"
import { TForm } from "~/types/schema/widget.type"
import IconButton from "../core/Button/IconButton"
import { EventType } from "la-ui-schema/lib/EnumModule"
import { TAnyValue } from "../core/FormElements/formFieldTypes"

interface FooterBarProps {
  conf?: TForm
  id: string
  children?: React.ReactNode
  data?: TAnyValue
}

export default function FooterBar({conf, id, children, data}: FooterBarProps) {
  
  const { processOnPrev, processOnNext, hasEvent } = useEvents(conf, id, false)
  
  const onPrev = hasEvent(EventType.OnPrevious) ? () => {
    processOnPrev(data)
  } : undefined

  const onNext = hasEvent(EventType.OnNext) ? () => {
    processOnNext(data)
  } : undefined

  return <>
    {onPrev ? <IconButton
      icon={'lucid-icon lucid-icon-icon-dropdown-left'}
      size="icon-small"
      onClick={onPrev}
    /> : null}
    
    {children}

    {onNext ? <IconButton
      icon={'lucid-icon lucid-icon-icon-dropdown-right'}
      size="icon-small"
      onClick={onNext}
    /> : null}
    
  </>
}