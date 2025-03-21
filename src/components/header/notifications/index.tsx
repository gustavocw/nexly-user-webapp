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
    <MenuRoot  positioning={{ placement: "bottom-end" }}>
      <MenuTrigger asChild>
        <Icon cursor="pointer" fontSize="24px" color="neutral">
          <IoNotificationsOutline />
        </Icon>
      </MenuTrigger>
      <MenuContent placeContent="flex-end">
        {notifications?.length > 0 ? (
          notifications.map((notification) => (
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
          ))
        ) : (
          <MenuItem py={4} px={2} bg="neutral.60" color="neutral" value="no-notifications">
            Sem notificações
          </MenuItem>
        )}
      </MenuContent>
    </MenuRoot>
  )
}

export default Notifications