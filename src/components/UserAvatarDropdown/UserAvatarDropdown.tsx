import { ForwardedRef, forwardRef, useCallback, useState } from "react";
import CoreButton from "~/components/core/Button/Button";
import CoreAvatar from "~/components/core/Avatar";
import "./styles.css"
import CorePopover, { useCorePopoverContext } from "~/components/core/Popover";
import CoreList, { CoreListItem, CoreListSection } from "~/components/core/List";
import { Typography } from "~/components/core/Typography/Typography";
import { openDialog } from "~/executableEvents/eventHandler";
import { TForm } from "~/types/schema/widget.type";
import { useNavigate } from "react-router-dom";


/**
 * Classes for list
 */
const listStyles = {

    main: {
        base: "border-b border-t border-lucid-grey-300 py-2 px-2.5 m-0 ",
    },
    section: { group: "!p-0", base: "m-0", heading: "pl-3 text-xs leading-[1.16666] text-lucid-grey-600 mb-2" },
    item: {
        title: "font-medium leading-[1.2857] text-lucid-grey-900 "
    }


}


/**
 * Type definition for the props of UserAvatarDropdown
 */
type UserAvatarDropdownProps = {
    onSelect?: (option: { label: string, value: string }) => void
}


/**
 * User Avatar component
 */
const UserAvatar = forwardRef((props, ref: ForwardedRef<HTMLButtonElement>) => {

    return <button ref={ref} className="m-h-0 h-[32px] min-w-0 w-[32px]">
        <CoreAvatar size="sm" {...props} name="Test Tes" />
    </button>


})

/**
 * Type definition for the props of UserAvatarDropdownContentProps
 */
type UserAvatarDropdownContentProps = {
    onSelect: (key: string) => void,
    selectedKeys: string[]
}


/**
 * Component which shows content of in user avatar popover
 */
const UserAvatarDropdownContent = ({
    onSelect,
    selectedKeys,
}: UserAvatarDropdownContentProps) => {

    const navigate = useNavigate();

    const popoverContext = useCorePopoverContext();
    const handleSelect = useCallback((key: string) => {
        onSelect(key);
        popoverContext.state.close()

    }, [onSelect])

    const onSettingsDialog = () => {
        openDialog({
            event: {
                dialogConf: {
                    path: "settings"
                }
            },
            conf: {} as TForm,
            data: {},
            responses: [],
            pathValues: {},
            queryParams: {}
        })
        popoverContext.state.close()
    }

    const handleLogout = () => {
        navigate("/sign-in")
    }

    const handleLock = () => {
        navigate("/locked")
    }

    return (

        <>
            <div className="flex items-center p-4 w-full">
                <CoreAvatar name="Test Tes" />
                <div className="ml-2" >
                    <Typography variant="subtitle-medium" className="text-lucid-grey-800 leading-[1.28571]" >
                        Sarah Connor
                    </Typography>
                    <Typography variant="subtitle-s2" className="text-lucid-grey-600 leading-[1.166666] mt-1">
                        Online
                    </Typography>
                </div>
            </div>

            <CoreList label="Test" classNames={listStyles.main} onSelect={handleSelect} selectedKeys={selectedKeys} selectionMode="single">
                <CoreListSection title="Role" classNames={listStyles.section} >
                    <CoreListItem key="role-1" className="p-3 rounded-lg mb-2 data-[hover=true]:!bg-lucid-grey-200 data-[focus=true]:!bg-lucid-grey-200" classNames={listStyles.item}>Role 1</CoreListItem>
                    <CoreListItem key="role-2" className="p-3 rounded-lg data-[hover=true]:!bg-lucid-grey-200 data-[focus=true]:!bg-lucid-grey-200" classNames={listStyles.item}>Role 2</CoreListItem>
                </CoreListSection>


            </CoreList>

            <div className="py-2 px-2.5 w-full flex flex-col justify-center gap-y-2">

                <CoreButton variant="light" className="block text-left font-medium !p-3 min-h-[auto] data-[hover=true]:bg-lucid-grey-200 text-lucid-grey-900 data-[focus=true]:text-lucid-grey-900" fullWidth disableAnimation disableRipple onClick={onSettingsDialog}>
                    Settings
                </CoreButton>
                <CoreButton variant="light" className="block text-left font-medium !p-3 min-h-[auto] data-[hover=true]:bg-lucid-grey-200 text-lucid-grey-900 data-[focus=true]:text-lucid-grey-900" fullWidth disableAnimation disableRipple onClick={handleLock}>
                    Lock Screen
                </CoreButton>
                <CoreButton variant="light" className="block text-lucid-red-400 text-left font-medium p-3 min-h-[auto] data-[hover=true]:bg-lucid-grey-200 data-[focus=true]:text-lucid-red-400 " fullWidth disableAnimation disableRipple onClick={handleLogout}>
                    Log Out
                </CoreButton>
            </div>
        </>
    )
}



/**
 * Component which shows user avatar and opens a popover when user clicks on user avatar
 */
const UserAvatarPopup = ({ }: UserAvatarDropdownProps) => {

    const [selectedKeys, setSelectedKeys] = useState<string[]>([]);


    const handleSelect = useCallback((key: string) => {
        setSelectedKeys([key])
    }, [])

    return (
        <CorePopover triggerNode={<UserAvatar />} className="min-w-[16.4375rem]" shouldFlip >
            <UserAvatarDropdownContent onSelect={handleSelect} selectedKeys={selectedKeys} />
        </CorePopover>
    )
}

export default UserAvatarPopup;