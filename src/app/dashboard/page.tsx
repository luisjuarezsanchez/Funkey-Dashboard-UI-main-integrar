"use client";
import { Space } from "antd";
import DashboardLayout from "@/src/components/widgets/DashboardLayout";

function page() {
  return (
    <Space style={{ justifyContent: "center" }}>
      <DashboardLayout />
    </Space>
  );
}

export default page;
