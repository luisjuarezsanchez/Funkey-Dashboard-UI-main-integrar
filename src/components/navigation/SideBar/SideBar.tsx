import Image from "next/image";
import { FC, ReactNode, useContext } from "react";

import logo from "@/public/images/logo-ca.png";
import AuthContext from "@/src/context/auth";
import {
  DashboardOutlined,
  MonitorOutlined,
  ToolOutlined,
  UserOutlined,
} from "@ant-design/icons";
import { Layout, Menu } from "antd";
import Link from "next/link";
import { usePathname } from "next/navigation";
import styles from "../../../styles/Dashboard.module.css";

const { Sider } = Layout;

interface INavItems {
  key: string;
  icon?: ReactNode;
  disabled?: boolean;
  label: ReactNode;
  children?: INavItems[];
}

interface ISideBar {
  collapsed: boolean;
}

const SideBar: FC<ISideBar> = ({ collapsed }) => {
  const pathname = usePathname();
  const context = useContext(AuthContext);

  const items: INavItems[] = [
    {
      key: "/dashboard",
      icon: <DashboardOutlined />,
      label: <Link href="/dashboard">Home</Link>,
      disabled: context.roles?.includes("GUEST"),
    },
    {
      key: "/dashboard/monitoring",
      icon: <MonitorOutlined />,
      label: <Link href="/dashboard/monitoring">Monitoreo</Link>,
      disabled: context.roles?.includes("GUEST"),
      children: [
        {
          key: "/dashboard/Visitantes",
          label: <Link href="/dashboard/visitors">Visitantes</Link>,
        },
      ],
    },
    {
      key: "users-menu",
      icon: <UserOutlined />,
      label: "Administrador",
      disabled: !context.roles?.includes("ADMIN"),
      children: context.roles?.includes("ADMIN")
        ? [
            {
              key: "/dashboard/users",
              label: <Link href="/dashboard/users">Usuarios</Link>,
            },
            {
              key: "/dashboard/roles",
              label: <Link href="/dashboard/roles">Roles</Link>,
            },
          ]
        : undefined,
    },
    {
      key: "tools",
      icon: <ToolOutlined />,
      label: "Herramientas",
      children: [
        {
          key: "/dashboard/wearable",
          label: <Link href="/dashboard/wearable">Weareable</Link>,
        },
        {
          key: "/dashboard/photo-opps",
          label: <Link href="/dashboard/photo-opps">Photo Opportunities</Link>,
        },
      ],
    },
  ];

  return (
    <Sider
      style={{ minHeight: "100vh" }}
      trigger={null}
      collapsible
      collapsed={collapsed}
    >
      <Link href="/dashboard">
        <div className={styles.logo}>
          <Image src={logo} alt="Codice Azul Logo" width={30} height={30} />
          {!collapsed && (
            <span style={{ padding: 10, color: "#fff" }}>Códice Azul</span>
          )}
        </div>
      </Link>
      <Menu
        theme="dark"
        mode="inline"
        defaultOpenKeys={["users-menu", "tools"]}
        defaultSelectedKeys={[pathname]}
        items={items}
      />
      <div></div>
    </Sider>
  );
};

export default SideBar;
