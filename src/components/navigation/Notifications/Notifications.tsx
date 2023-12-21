import { BellOutlined } from "@ant-design/icons";
import { Badge, Button, Popover, Space } from "antd";
import Link from "next/link";
import { useState } from "react";
import { Dot, NotificationsPanel } from "./styles";

interface INotification {
  id: string;
  title: string;
  description: string;
  read: boolean;
  user: string;
  date: Date;
  type: number;
  section: string;
}

const Notifications = () => {
  const data: INotification[] = [
    {
      id: "id-1",
      title: "En recorrido",
      description: "El grupo A ha llegado a la Fábrica de Envasado",
      read: false,
      user: "user1",
      date: new Date(),
      type: 1,
      section: "/dashboard/users",
    },
    {
      id: "id-2",
      title: "En recorrido",
      description: "El grupo A ha llegado a la Fábrica de Envasado",
      read: false,
      user: "user1",
      date: new Date(),
      type: 1,
      section: "/dashboard/monitoring",
    },
    {
      id: "id-3",
      title: "En recorrido",
      description: "El grupo A ha llegado a la Fábrica de Envasado",
      read: false,
      user: "user1",
      date: new Date(),
      type: 1,
      section: "/dashboard/monitoring",
    },
    {
      id: "id-4",
      title: "En recorrido",
      description: "El grupo A ha llegado a la Fábrica de Envasado",
      read: false,
      user: "user1",
      date: new Date(),
      type: 1,
      section: "/dashboard/monitoring",
    },
  ];

  const [notifications, setNotifications] = useState(data);
  const [open, setOpen] = useState(false);

  const unreadNotifications = notifications.filter((o) => !o.read);

  const updateNotificationStatus = (id: string) => {
    setNotifications(
      notifications.map((o) => {
        if (o.id === id) {
          return { ...o, read: true };
        }

        return o;
      })
    );

    setOpen(false);
  };

  const content = (
    <NotificationsPanel>
      {notifications.map((notification) => (
        <div
          className="notification"
          key={notification.id}
          onClick={() => updateNotificationStatus(notification.id)}
        >
          <Link href={notification.section}>
            <Space>
              <div>
                <span>{notification.title}</span>
                <p>{notification.description}</p>
                <p
                  className="time"
                  style={{ color: notification.read ? "#C4C4C4" : "#08c" }}
                >
                  hace 5 minutos
                </p>
              </div>
              <div className="status">
                {!notification.read ? <Dot /> : null}
              </div>
            </Space>
          </Link>
        </div>
      ))}
    </NotificationsPanel>
  );

  return (
    <Popover
      content={content}
      trigger="click"
      open={open}
      onOpenChange={(newOpen: boolean) => {
        setOpen(newOpen);
      }}
    >
      <Button
        type="text"
        size="middle"
        shape="circle"
        style={{ position: "relative", marginLeft: 10 }}
        icon={
          <Badge
            count={unreadNotifications.length}
            offset={[-2, 4]}
            size="small"
            color="#08c"
            style={{ fontSize: 8 }}
          >
            <BellOutlined style={{ fontSize: "23px", color: "#08c" }} />
          </Badge>
        }
      ></Button>
    </Popover>
  );
};

export default Notifications;
