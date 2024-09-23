import OtherSettings from "./OtherSettings";
import Password from "./Password";
import UserProfile from "./UserProfile";

export default function UserSettings({ active }: { active: string }) {
  switch(active) {
    case "user-profile":
      return <UserProfile />
    case "user-password": 
      return <Password />
    case "other-settings":
      return <OtherSettings />
  }
}