import { TGridControls } from "~/types/schema/common.type";
import Button from "../core/Button/Button";
import IconButton from "../core/Button/IconButton";
import CoreDropdown from "../core/Dropdown";
import { executeEvent } from "~/executableEvents/eventHandler";
import { TWidget } from "~/types/schema/widget.type";

interface TGridToolbarProps {
  controls?: TGridControls
}

export default function TableToolbar({ controls }: TGridToolbarProps) {
  const handleAdd = () => {
    if (controls?.addRecord) {
      executeEvent({event: controls.addRecord, conf: {} as TWidget, id: "", data: {}, responses: []})
    } 
  }
  return <div className="flex justify-between items-center w-full">
    <div>
      {controls?.addRecord ? <IconButton icon="lucid-icon lucid-icon-add" variant="light" onClick={handleAdd}/> : null}
    </div>
    <div>
      <div className="flex gap-1 items-center">
        <Button isIconOnly variant="light" size="icon-small" aria-label="Like">
          <span className="lucid-icon lucid-icon-icon-search"></span>
        </Button>
        <Button isIconOnly variant="light" size="icon-small" aria-label="Like">
          <span className="lucid-icon-icon-arrows"></span>
        </Button>
        <Button isIconOnly variant="light" size="icon-small" aria-label="Like">
          <span className="lucid-icon lucid-icon-sort"></span>
        </Button>
        
        <CoreDropdown
          triggerNode={<Button isIconOnly variant="light" size="icon-small" aria-label="Like">
            <span className="lucid-icon lucid-icon-icon-dots-horizontal"></span>
          </Button>}
          options={[
            {key: "a",  label: "New file"},
            {key: "b",  label: "Copy link"},
            {key: "c",  label: "Edit file"},
          ]} />
      </div>
    </div>
  </div>
}