import NotificationPopover from "~/components/Notifications/NotificationPopover";
import UserAvatarPopup from "~/components/UserAvatarDropdown/UserAvatarDropdown";
import NavSearch from "./NavSearch";
import OfficeDropdown from "./OfficeDropdown";


export default function Navbar() {
  return <div className="px-4 h-12 min-h-12 bg-lucid-grey-900 flex items-center justify-between">
    <div className="flex space-x-4">
      <img src="/lucidact.svg"  alt="Lucidact"/>
      <OfficeDropdown />
    </div>
    <div className="flex space-x-4 items-center">
      <NavSearch />
      <NotificationPopover />
      <UserAvatarPopup />
    </div>
  </div>
}