import Button from "~/components/core/Button/Button";
import CorePopover from "../core/Popover";
import { Typography } from "../core/Typography/Typography";
import { Listbox, ListboxItem, Selection } from "@nextui-org/react";
import ListboxWrapper from "../ListboxWrapper";
import { ChangeEventHandler, useState } from "react";
import CoreInput from "../core/FormControl/Input";
import { debounce } from "lodash";
import { TOption } from "~/types/app.types";

const offices: TOption[] = [
  {
    label: "Text",
    value: "text"
  },
  {
    label: "Number",
    value: "number"
  },
  {
    label: "Date",
    value: "date"
  },
  {
    label: "Single Date",
    value: "single_date"
  },
  {
    label: "Iteration",
    value: "iteration"
  }
]

export default function OfficeDropdown() {

  const [selectedKeys, setSelectedKeys] = useState<Selection>(new Set(["text"]));
  const [searchValue, setSearchValue] = useState("")
  const [options, setOptions] = useState(offices)

  const handleSearch: ChangeEventHandler<HTMLInputElement> = (e) => {
    setSearchValue(e.target.value);
    filterOptions(offices, e.target.value)
  }

  const filterOptions = debounce((values: TOption[], search: string) => {
    if (search) {
      const filteredValues = values.filter(value => 
        value.label.includes(search) || value.value.includes(search) || [...selectedKeys].includes(value.value))
      setOptions(filteredValues);
    } else {
      setOptions(values);
    }
  }, 100)

  return <CorePopover
    triggerNode={<Button variant="bordered" className="bg-lucid-grey-800 border-lucid-grey-700 text-lucid-grey-100 !border w-[260px] text-left px-3 py-0 min-h-8">
      <span className="flex items-center justify-between w-full">
        <Typography variant="subtitle-medium-s2">St. Martin's Hospital</Typography>
        <span className="lucid-icon lucid-icon-arrow-down text-xs mr-2"></span>
      </span>
    </Button>}
  >
    <div className="w-[260px]">
      <Typography className="p-4 text-lucid-grey-900" variant="subtitle-medium-s2">Clinic</Typography>
      <div className="border-t border-b py-1">
        <CoreInput
          placeholder="Search"
          startContent={<span className="lucid-icon- lucid-icon-icon-search text-xl"></span>}
          size="sm"
          inputWrapperClassName="border-none group-data-[focus=true]:!outline-none"
          value={searchValue}
          onChange={handleSearch}
        />
      </div>
      <ListboxWrapper>
        <Listbox 
          aria-label="Single selection example"
          variant="flat"
          disallowEmptySelection
          selectionMode="single"
          selectedKeys={selectedKeys}
          onSelectionChange={setSelectedKeys}
        >
          {options.map(option => <ListboxItem key={option.value}>{option.label}</ListboxItem>)}
        </Listbox>
      </ListboxWrapper>
    </div>
  </CorePopover>
}

