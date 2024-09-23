import { Calendar } from "@nextui-org/react";
import Button from "../core/Button/Button";
import CorePopover from "../core/Popover";

export default function DatePicker( ) {
  return <CorePopover
    triggerNode={<Button isIconOnly variant="bordered" size="icon-small" aria-label="Like">
      <span className="lucid-icon-calendar"></span>
    </Button>}
  >
    <Calendar />
  </CorePopover>
}