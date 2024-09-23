import { useState } from "react";
import "./styles.css"
import CorePopover from "~/components/core/Popover";
import Button from "~/components/core/Button/Button";
import { NotificationMessage } from "./NotificationMessage";
import { Typography } from "~/components/core/Typography/Typography";
import CoreTabs from "~/components/core/Tabs/Tabs";
import CoreTab from "~/components/core/Tabs/Tab";


type OptionKey = "read" | "delete";
type MenuOption = {
  key: OptionKey,
  label: string
};
const menuOptions: MenuOption[] = [
    {
        key: "read",
        label: "Mark as Read",
    },
    {
        key: "delete",
        label: "Delete",
    }
];

const messages = new Array(100).fill(0)


/**
 * Component which shows user avatar and opens a popover when user clicks on user avatar
 */
export default function NotificationPopover() {

    const [selectedNotifications, setSelectedNotifications] = useState<Set<string>>(new Set());
    const [readNotifications, setReadNotifications] = useState<Set<string>>(new Set());
  
    const handleSelectedNotification = (notificationId: string)=> {
      const notifications = new Set([...selectedNotifications]);
      if(notifications?.has(notificationId)){
        notifications.delete(notificationId);
      } else {
        notifications.add(notificationId);
      }
      setSelectedNotifications(notifications);
    };
  
    const checkNotificationState = (notificationId: string, notifications: Set<string>)=> {
      return notifications?.has(notificationId);
    };
  
    const checkIsNotificationSelected = (notificationId: string)=>{
      return checkNotificationState(notificationId, selectedNotifications);
    };
  
    const checkIsNotificationIsRead = (notificationId: string)=> {
      return checkNotificationState(notificationId, readNotifications);
    };
  
    const handleSelectedMenuOption = (notificationId: string, optionValue: any) => {
      const optValue = optionValue as OptionKey;
      if(optValue === "read"){
        const notifications = new Set([...readNotifications]);
        notifications.add(notificationId);
        setReadNotifications(notifications);
      } 
    };

    return (
        <CorePopover
          triggerNode={<Button isIconOnly size="icon-medium" variant="bordered" className="text-lucid-grey-100 bg-lucid-grey-800 border-lucid-grey-700">
              <span className="lucid-icon lucid-icon-notification"></span>
          </Button>}
          className="min-w-[16.4375rem]" shouldFlip>
            <div>
                <div className="p-4 pb-0">
                    <Typography className="text-lucid-grey-900" variant="subtitle-medium-s2">Notifications</Typography>
                    <div className="border-b">
                        <CoreTabs variant="underlined">
                            <CoreTab title="All" />
                            <CoreTab title="Unread" />
                        </CoreTabs>
                    </div>
                </div>
                <div className="max-h-[80vh] overflow-auto">
                    {messages.map((_, i) => <NotificationMessage
                        key={`notification-${i}`}
                        id='one'
                        tag='Tag'
                        time="10 minutes ago"
                        title="Notification Title"
                        content='Lorem ipsum dolor, sit amet consectetur adipisicing elit. Quisquam recusandae explicabo laboriosam autem ullam consequuntur facilis facere perferendis fugiat omnis, ipsum atque officiis? Mollitia architecto vero enim, nihil neque dolorem!'
                        isSelected={checkIsNotificationSelected("one")}
                        handleNotificationSelection={handleSelectedNotification}
                        menuOptions={menuOptions}
                        isRead={checkIsNotificationIsRead("one")}
                        handleSelectedMenuOption={handleSelectedMenuOption}
                    />)}

                </div>
            </div>
        </CorePopover>
    )
}
