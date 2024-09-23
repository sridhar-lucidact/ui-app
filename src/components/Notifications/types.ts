import { HTMLAttributes } from "react";

export type PartialNotificationMessageProps = Partial<{
}>;

export type NotificationMessageProps = PartialNotificationMessageProps & {
  id: string,
  handleNotificationSelection: (notificationId: string)=> void,
  menuOptions: Record<string,any>[],
  handleSelectedMenuOption: (notificationId: string, optionValue:any)=> void,
  isRead: boolean,
  isSelected: boolean,
  tag: string,
  time: string,
  title: string,
  content: string,
} & HTMLAttributes<HTMLDivElement>;