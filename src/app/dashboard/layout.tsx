"use client";
import DashboardHeader from "@/src/components/navigation/DashboardHeader";
import SideBar from "@/src/components/navigation/SideBar/SideBar";
import { Layout } from "antd";
import { ReactNode, useEffect, useState } from "react";

import Loader from "@/src/components/feedback/Loader";
import AuthContext from "@/src/context/auth";
import Auth0Service from "@/src/services/auth0";
import { IUserProfile } from "@/src/services/auth0/interfaces";
import { useRouter } from "next/navigation";
import styles from "../../styles/Dashboard.module.css";

if (process.env.NEXT_PUBLIC_API_MOCKING === "enabled") {
  if (typeof window !== "undefined") {
    /* eslint-disable */
    const { worker } = require("../../../mocks/browser");
    worker.start({
      onUnhandledRequest(request: any, print: any) {
        // Ignore any requests containing "cdn.com" in their URL.
        if (
          request.url.includes("/_next") ||
          request.url.includes("https://s.gravatar.com") ||
          request.url.includes("chrome-extension") ||
          request.url.includes("/dashboard") ||
          request.url.includes("/images/")
        ) {
          return;
        }
        print.warning();
      },
    });
  }
}

const { Content } = Layout;

function DashboardLayout({ children }: { children: ReactNode }) {
  const { push } = useRouter();
  const [collapsed, setCollapsed] = useState(false);
  const [authLoading, setAuthLoading] = useState(true);
  const [userProfile, setUserProfile] = useState<IUserProfile>({});

  useEffect(() => {
    const auth0Service = new Auth0Service();
    auth0Service
      .checkSession()
      .then((result) => {
        setAuthLoading(false);
        setUserProfile(result as IUserProfile);
      })
      .catch(() => {
        auth0Service.login();
      });
  }, [push]);

  if (authLoading) return <Loader />;

  return (
    <AuthContext.Provider value={userProfile}>
      <Layout hasSider>
        <SideBar collapsed={collapsed} />
        <Layout className={styles.siteLayout}>
          <DashboardHeader collapsed={collapsed} onCollapse={setCollapsed} />
          <Content className={styles.containerLayout}>{children}</Content>
        </Layout>
      </Layout>
    </AuthContext.Provider>
  );
}

export default DashboardLayout;
