import {
  MenuContent,
  MenuItem,
  MenuRoot,
  MenuTrigger,
} from "components/ui/menu"
import { IoNotificationsOutline } from "react-icons/io5";
import { Icon } from "@chakra-ui/react";


interface NotificationsProps {
  notifications: Notification[];
}

const Notifications = ({ notifications }: NotificationsProps) => {
  return (
    <MenuRoot>
      <MenuTrigger asChild>
        <Icon cursor="pointer" fontSize="24px" color="neutral">
          <IoNotificationsOutline />
        </Icon>
      </MenuTrigger>
      <MenuContent>
        {notifications?.map((notification) => (
          <MenuItem asChild key={notification._id} value={notification.title}>
            <a
              href={notification.link}
              target="_blank"
              rel="noreferrer"
            >
              {notification.title}
              <p>{notification.content}</p>
            </a>
          </MenuItem>
        ))}
      </MenuContent>
    </MenuRoot>
  )
}

export default Notifications