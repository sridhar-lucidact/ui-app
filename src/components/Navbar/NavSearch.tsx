import { cn, Listbox, ListboxItem } from "@nextui-org/react";
import CoreInput from "../core/FormControl/Input";
import { createRef, useState } from "react";
import {Popover, PopoverTrigger, PopoverContent} from "@nextui-org/react";
import CoreTabs from "../core/Tabs/Tabs";
import CoreTab from "../core/Tabs/Tab";
import { Tag } from "../core/Tag/Tag";
import { Typography } from "../core/Typography/Typography";
import Button from "../core/Button/Button";
import { InfoStatusSearch } from "../InfoStatusSearch/InfoStatusSearch";

type SearchType = "Patient" | "Notes" | "Tag Title"
interface SearchResult {
  type: SearchType
  description: string
}

interface SearchMetrics {
  total: number
  active: number
  inactive: number
}

const defaultSearchResults: SearchResult[] = [
  {
    type: "Patient",
    description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit"
  },
  {
    type: "Notes",
    description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit"
  },
  {
    type: "Tag Title",
    description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit"
  }
]

export default function NavSearch() {
  const searchRef = createRef<HTMLDivElement>();

  const [open, setOpen] = useState(false);
  const [openPopover, setOpenPopover] = useState(false);
  const [searchValue, setSearchValue] = useState("");
  const [recentSearches, setRecent] = useState(['value 1', 'value 2', 'Search request 1'])
  const [results, setResults] = useState<SearchResult[]>(defaultSearchResults)
  const [metric, setMetric] = useState<SearchMetrics>({
    total: 0,
    active: 0,
    inactive: 0,
  })

  const handleFocus = () => {
    if (!open) {
      setOpen(true)
      setTimeout(() => {
        setOpenPopover(true)
      }, 300)
    }
  }

  const handleBlur = () => {
    setOpen(false)
    setOpenPopover(false)
  }

  const selectRecentKeyword = (value?: string) => {
    setSearchValue(value || "")
  }

  const clearRecent = () => setRecent([])

  const deleteRecent = (value?: string) => {
    console.log('deleteRecent', value);
  }

  return <div
    onClick={handleFocus}
    // onBlur={handleBlur}
    className={cn("w-[260px] transition-all", {
      "w-[50vw]": open
    })}
  >
    <CoreInput
      size="sm"
      theme="dark"
      variant="bordered"
      placeholder="Search"
      className="border border-lucid-grey-700 !mt-0"
      startContent={<span className="lucid-icon lucid-icon-icon-search text-lucid-grey-100 text-xl"></span>}
      value={searchValue}
      readOnly
    />
    <div ref={searchRef}></div>
    <Popover
      isOpen={openPopover}
      showArrow={false}
      offset={10}
      placement="bottom"
      motionProps={{  
        variants: {
          enter: {
            y: 0,
            opacity: 1,
            transition: {
              opacity: {
                duration: 0.15,
              },
            },
          },
          exit: {
            y: "10%",
            opacity: 0,
            transition: {
              opacity: {
                duration: 0.1,
              },
            },
          },
        },
      }}
      triggerRef={searchRef}
      shouldFlip={false}
      onClose={handleBlur}
      shouldCloseOnInteractOutside={() => true}
      shouldCloseOnBlur
    >
      <div></div>
      <PopoverContent className="w-[50vw] pt-0">
        <div className="absolute w-[50vw] -top-[42px]">
          <CoreInput
            size="sm"
            theme="dark"
            variant="bordered"
            placeholder="Search"
            className="border border-lucid-grey-700"
            startContent={<span className="lucid-icon lucid-icon-icon-search text-lucid-grey-100 text-xl"></span>}
            value={searchValue}
            onChange={(e) => setSearchValue(e.target.value)}
            autoFocus
          />
        </div>
        <div className="text-left w-full flex">
          <div className="flex-1">
            <div className="border-b">
              <CoreTabs variant="underlined">
                <CoreTab title="All" />
                <CoreTab title="Workload" />
                <CoreTab title="Program" />
                <CoreTab title="Trends" />
              </CoreTabs>
            </div>
            <div>
              {!searchValue && recentSearches.length > 0 && <>
                <div className="flex justify-between items-center">
                  <Typography variant="subtitle-medium-s2" className="text-lucid-grey-700">Recent searches</Typography>
                  <Button disableRipple variant="light" size="medium" onClick={clearRecent}>Clear History</Button>
                </div>
                {recentSearches.map((searchKeyword, i)=> <div className="my-2" key={`tag-${i}`}>
                  <Tag
                    // tag="div" 
                    value={searchKeyword}
                    onClick={selectRecentKeyword}
                    rightIcon={<span className="lucid-icon lucid-icon-icon-cross-small text-[8px]"></span>}
                    onRightIconClick={deleteRecent}
                    className="bg-lucid-grey-200 hover:bg-lucid-grey-300 text-lucid-grey-700"
                    iconWrapperClassname="bg-lucid-grey-200 hover:bg-lucid-grey-300 text-lucid-grey-700"
                  >
                    {searchKeyword}
                  </Tag>
                </div>)}
              </>}
              {!searchValue && recentSearches.length === 0 && <>
                <div className="h-[314px] flex justify-center items-center">
                  <InfoStatusSearch
                    icon={<span className="lucid-icon- lucid-icon-search-status text-2xl"></span>}
                    labelProps={{
                      className: "text-center"
                    }}
                  >
                    Find anything <br/> 
                    in St. Martin's Hospital
                  </InfoStatusSearch>
                </div>
              </>}
              {searchValue && results.length === 0 && <>
                <div className="h-[314px] flex justify-center items-center">
                  <InfoStatusSearch
                    icon={<span className="lucid-icon- lucid-icon-ghost text-2xl"></span>}
                    labelProps={{
                      className: "text-center"
                    }}
                  >
                    No results found
                  </InfoStatusSearch>
                </div>
              </>}
              {searchValue && results.length > 0 && <>
                <div className="flex justify-between items-center">
                  <Typography variant="subtitle-medium-s2" className="text-lucid-grey-700">{results.length} Results</Typography>
                  <Button disableRipple variant="light" size="medium" onClick={clearRecent}>Clear History</Button>
                </div>
                <Listbox className="p-0">
                  {results.map((result, i) => <ListboxItem key={`search-result-${i}`} className="px-0 py-2 border-b rounded-none hover:!bg-lucid-grey-200">
                      <div className="mb-2"><SearchLabel type={result.type} /></div>
                      <Typography variant="subtitle-medium-s2">{result.description}</Typography>
                    </ListboxItem>
                  )}
                </Listbox>
              </>}
            </div>
          </div>
          {searchValue && results.length > 0 && <div className="ml-4 pl-4 pr-[6px] pt-4 border-l w-[240px]">
            <Typography className="text-lucid-grey-900" variant="subtitle-medium-s2">Metrics</Typography>
            <Listbox className="mt-6">
              <ListboxItem key="total" className="border-b rounded-none p-0 hover:!bg-lucid-grey-200">
                <div className="flex py-4 items-end">
                  <Typography className="text-xl text-lucid-grey-900 leading-[18px] mr-1">{metric.total}</Typography>
                  <Typography variant="subtitle-s2" className="text-lucid-grey-600 leading-[12px]">Total</Typography>
                </div>
              </ListboxItem>
              <ListboxItem key="active" className="border-b rounded-none p-0 hover:!bg-lucid-grey-200">
                <div className="flex py-4 items-end">
                <Typography className="text-xl text-lucid-grey-900 leading-[18px] mr-1">{metric.active}</Typography>
                <Typography variant="subtitle-s2" className="text-lucid-grey-600 leading-[12px]">Active</Typography>
                </div>
              </ListboxItem>
              <ListboxItem key="inactive" className="border-b rounded-none p-0 hover:!bg-lucid-grey-200">
                <div className="flex py-4 items-end">
                <Typography className="text-xl text-lucid-grey-900 leading-[18px] mr-1">{metric.inactive}</Typography>
                <Typography variant="subtitle-s2" className="text-lucid-grey-600 leading-[12px]">Inactive</Typography>
                </div>
              </ListboxItem>
            </Listbox>
          </div>}
          
        </div>
      </PopoverContent>
    </Popover>  
  </div>
}

const SearchLabel = ({ type }: { type: SearchType }) => {
  return <div className={cn("inline-block rounded py-1 px-1.5", {
    'bg-lucid-blue-100': type === "Patient",
    'bg-lucid-orange-100': type === "Notes",
    'bg-lucid-green-100': type === "Tag Title",
  })}>
    <Typography variant="subtitle-medium-s2" className={cn("leading-[1.166667]", {
      'text-lucid-blue-500': type === "Patient",
      'text-lucid-orange-500': type === "Notes",
      'text-lucid-green-400': type === "Tag Title",
    })}>
      {type}
    </Typography>
  </div>
}