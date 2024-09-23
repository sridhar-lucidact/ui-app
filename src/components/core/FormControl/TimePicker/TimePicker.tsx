import { PropsWithChildren, useEffect, useMemo, useState } from "react";
import { TimeInput, TimeInputProps, TimeInputValue, } from "@nextui-org/react";
import { Time } from "@internationalized/date";
import { cn } from "@nextui-org/react"
import "./styles.css"
import { createTimeIntervalsOptsList, formatDate, getHrsAndMinsFromDate, getRoundedDate, isValidDate } from "~/utils/date";
import CoreDropdown, { CoreDropdownItem, Selection } from "~/components/core/Dropdown";
import CoreButton from "~/components/core/Button/Button";
import Icon from "~/components/core/Icon/Icon";

type CustomCoreTimePickerProps = {
    /**
     * Pass classes to label element
     */
    labelClassName?: string,
    variant?: "bordered" | "underlined",
    /**
     * Pass classes to input element wrapper
     */
    inputWrapperClassName?: string,
    /**
     * Pass classes to input element
     */
    className?: string,
    /**
     * Show label 
     * 
     * @default true
     */
    showLabel?: boolean,

    /**
     * Valid date object or null
     */
    value: Date | null,

    /**
     * Gets called whenever value is changed 
     */
    onChange: (d: Date | null) => void
}

/**
 * Type definitions of props for CoreInput 
 * 
 * It extends props available from next ui's input component with custom props
 * 
 */
export type CoreTimePickerProps = PropsWithChildren<Omit<TimeInputProps, "variant" | "value"> & CustomCoreTimePickerProps>



type TimePickerMenuProps = {
    onSelect?: (time: Date) => void,
    isOpened?: boolean,
    selection?: Date | null,
    onMenuStateChange?: (isOpen: boolean) => void
}
const TimePickerMenu = ({ onSelect, selection, onMenuStateChange }: TimePickerMenuProps) => {
    const [value, setValue] = useState<Selection>(new Set([]));
    const [isMenuOpened, setMenuOpened] = useState<boolean>(false);
    const timeOptsData = useMemo(() => {
        const timeList = createTimeIntervalsOptsList()
        return {
            list: timeList,
            map: timeList.reduce((acc: Record<string, Date>, o) => {
                acc[o.label] = o.value;
                return acc;
            }, {})

        }
    }, [])


    useEffect(() => {
        if (selection && isValidDate(selection)) {
            setValue(new Set([formatDate(selection, "h:mm a")]));
        } else {
            setValue(new Set([]))
        }
    }, [selection])

    const handleSelection = (selection: Selection) => {
        setValue(selection)
        const convertedArray = Array.from(selection)
        onSelect?.(timeOptsData.map[convertedArray[0]])
    }

    const handleMenuStateChange = (isOpen: boolean) => {
        setMenuOpened(isOpen)
        onMenuStateChange?.(isOpen)
    }


    const triggerButtonClasses = useMemo(() => {

        return {
            btn: cn("mr-1 data-[focus=true]:bg-transparent data-[hover=true]:bg-transparent flex justify-center items-center h-4 w-4 aria-[expanded=true]:opacity-100"),
            icon: cn("text-lucid-grey-800 text-[0.625rem] duration-250", isMenuOpened && "rotate-180")
        }

    }, [isMenuOpened]);
    return (

        <CoreDropdown
            selectedKeys={value}
            onSelectionChanged={handleSelection}
            offset={20}
            crossOffset={-90}
            className="timepicker-dropdown-menu"
            menuProps={{
                classNames: { "base": "h-full p-0" }, itemClasses: {
                    title: "text-xs font-medium leading-[1.166667] text-lucid-grey-900",
                    base: "p-2 min-h-[2rem] data-[hover=true]:bg-lucid-grey-100 data-[selectable=true]:focus:text-lucid-grey-900 data-[selectable=true]:focus:bg-lucid-grey-100 rounded data-[focus=true]:bg-lucid-grey-100"
                }
            }}
            triggerNode={<CoreButton className={triggerButtonClasses.btn} isIconOnly size="icon-small" variant="light" data-is-menu-open={isMenuOpened} ><Icon className={triggerButtonClasses.icon} >arrow-down</Icon></CoreButton>}
            onOpenChange={handleMenuStateChange}

        >
            {
                timeOptsData.list.map((o) => {
                    return <CoreDropdownItem key={o.label} classNames={{ title: "font-medium leading-[1.2857] text-lucid-grey-900" }}>
                        {o.label}
                    </CoreDropdownItem>
                })
            }

        </CoreDropdown>


    )
}


/**
 * Component which wraps next ui's time picker and provides it a time picker dropdown and some additional functionality with custom styling
 * 
 * For Documentation 
 * @see https://nextui.org/docs/components/input#input-props 
 * 
 */
const CoreTimePicker = ({ label = "Time", showLabel = true, variant = "bordered", value, onChange, className, errorMessage, labelClassName, inputWrapperClassName, ...restProps }: CoreTimePickerProps) => {

    const [storedTime, setTime] = useState<TimeInputValue | null>(null);
    const [storedTimeDate, setTimeDate] = useState<Date | null>(null);
    const inputMemoziedClassesNames = useMemo(() => {
        return {

            allClasses: {
                label: cn("text-xs leading-[1.167] !text-lucid-grey-700  top-5", labelClassName),
                input: cn(" font-medium !text-lucid-blue-900   leading-[1.28577] placeholder:text-lucid-grey-600 ", {
                    ["px-0 py-2"]: variant === "underlined",

                    ["!text-lucid-blue-900 "]: !!errorMessage
                }, className),
                inputWrapper: cn(
                    " py-0 px-0 shadow-none h-auto min-h-[auto] rounded-lg  ", {
                    ["px-4 py-3.5 border border-lucid-grey-500 hover:border-lucid-blue-500 focus-within:shadow-active-input focus-within:border-lucid-blue-500 focus-within:hover:border-lucid-blue-500"]: variant === 'bordered',
                    ["border data-[hover=true]:border-lucid-blue-500   group-data-[focus=true]:outline group-data-[focus=true]:outline-2 group-data-[focus=true]:outline-lucid-blue-200 border-lucid-grey-500"]: variant === "bordered",
                    ["group-data-[focus=true]:!border-lucid-blue-500 "]: variant === "bordered" && !errorMessage,
                    ["group-data-[invalid=true]:outline group-data-[invalid=true]:!border-lucid-red-400 group-data-[invalid=true]:outline-2 group-data-[invalid=true]:outline-[#FFC5CA] group-data-[focus=true]:!border-lucid-red-400 "]: variant === "bordered" && !!errorMessage,
                    ["!px-0  border-b border-lucid-grey-300 hover:border-lucid-grey-500  after:bg-lucid-blue-500 after:!h-px"]: variant === "underlined",
                    ["border-lucid-red-400 hover:border-lucid-red-400 after:!bg-lucid-red-400"]: variant === "underlined" && !!errorMessage,
                }, inputWrapperClassName),

                base: cn("data-[has-label=true]:mt-[1.375rem] core-time-picker-input", {
                    ["bordered"]: variant === "bordered",
                    ["underlined"]: variant === "underlined",
                }),
                helperWrapper: "p-0 pt-2",
                description: "leading-[1.16667] text-lucid-grey-600",
                errorMessage: "leading-[1.16667] text-lucid-red-400",
                innerWrapper: cn("h-full", {
                    ["p-0 "]: variant === "bordered",
                    ["pb-0"]: variant === "underlined"
                })
            },
            startIcon: "core-time-picker-icon ",

        }
    }, [labelClassName, inputWrapperClassName, className, errorMessage])


    useEffect(() => {
        if (value && isValidDate(value)) {
            const roundedTime = getRoundedDate(30, value)
            handleTimeSelection(roundedTime)
        } else {
            setTime(null);
            setTimeDate(null);
        }
    }, [value])


    /**
     * Handle change via input 
     * @param time 
     */
    const handleChange = (time: TimeInputValue) => {
        if (time) {
            const date = new Date();
            date.setHours(time.hour);
            date.setMinutes(time.minute);
            const roundedTime = getRoundedDate(30, date)
            setTime(new Time(roundedTime.getHours(), roundedTime.getMinutes()))
            setTimeDate(roundedTime);
            onChange?.(roundedTime);
        } else {
            setTime(null);
            setTimeDate(null);
            onChange?.(null);
        }
    }

    /**
     * Handle change via time picker drop down
     * @param date 
     */
    const handleTimeSelection = (date: Date) => {
        const { hrs, minutes } = getHrsAndMinsFromDate(date);
        setTime(new Time(hrs, minutes));
        setTimeDate(date);
        onChange?.(date);
    }


    return (
        <TimeInput
            {...restProps}
            variant={variant}
            value={storedTime}
            onChange={handleChange}
            startContent={<Icon className={inputMemoziedClassesNames.startIcon}>clock</Icon>}
            endContent={<TimePickerMenu selection={storedTimeDate} onSelect={handleTimeSelection} />}
            label={showLabel && label}
            labelPlacement="outside"
            errorMessage={errorMessage}
            isInvalid={!!errorMessage}
            classNames={inputMemoziedClassesNames.allClasses}
            hourCycle={12}
        />
    )
}


export default CoreTimePicker