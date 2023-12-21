import AuthContext from "@/src/context/auth";
import Auth0Service from "@/src/services/auth0";
import { MenuFoldOutlined, MenuUnfoldOutlined } from "@ant-design/icons";
import type { MenuProps } from "antd";
import { Avatar, Dropdown, Layout, Space } from "antd";
import React, { FC, useContext } from "react";
import styles from "../../../styles/Dashboard.module.css";
import Notifications from "../Notifications";

const { Header } = Layout;

interface IDashboardHeader {
  collapsed: boolean;
  onCollapse: (collapsed: boolean) => void;
}

const DashboardHeader: FC<IDashboardHeader> = ({ collapsed, onCollapse }) => {
  const auth0Service = new Auth0Service();
  const context = useContext(AuthContext);

  // const unreadNotifications = 22;

  const items: MenuProps["items"] = [
    {
      key: "1",
      label: "Log out",
      onClick: () => auth0Service.logout(),
    },
  ];

  return (
    <Header
      className={styles.siteLayoutBackground}
      style={{
        padding: "0 20px 0 0",
        display: "flex",
        alignItems: "center",
      }}
    >
      {React.createElement(collapsed ? MenuUnfoldOutlined : MenuFoldOutlined, {
        className: styles.trigger,
        onClick: () => onCollapse(!collapsed),
      })}
      <Space
        style={{
          position: "relative",
          display: "flex",
          marginLeft: "auto",
          alignItems: "center",
          cursor: "pointer",
        }}
      >
        <Dropdown menu={{ items }} trigger={["click"]} placement="bottomLeft">
          <Space>
            <Avatar src="https://s.gravatar.com/avatar/5531607c0ff9ee07b6720400c89942ec?s=480&r=pg&d=https%3A%2F%2Fcdn.auth0.com%2Favatars%2Fma.png" />
            <strong>{context.name}</strong>
          </Space>
        </Dropdown>
      </Space>

      <Notifications />
    </Header>
  );
};

export default DashboardHeader;
