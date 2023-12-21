"use client";

import { Button, Layout, Space, Table, Tag } from "antd";
import type { ColumnsType } from "antd/es/table";

function page() {
  interface DataType {
    key: string;
    name: string;
    description: string;
  }

  const columns: ColumnsType<DataType> = [
    {
      title: "Nombre",
      dataIndex: "name",
      key: "name",
      render: (_, { name }) => (
        <Tag color={name === "magenta" ? "volcano" : "green"}>
          {name.toUpperCase()}
        </Tag>
      ),
    },
    {
      title: "Descripción",
      dataIndex: "description",
      key: "description",
    },
    {
      title: "Action",
      key: "action",
      width: "200px",
      render: () => (
        <Space size="middle">
          <Button>...</Button>
        </Space>
      ),
    },
  ];

  const data: DataType[] = [
    {
      key: "1",
      name: "admin",
      description: "Acceso completo al sistema",
    },
    {
      key: "2",
      name: "storyteller",
      description: "Solo puede la sección Home",
    },
  ];

  return (
    <Layout style={{ padding: "0 30px 30px 30px" }}>
      <h1>Roles</h1>
      <Table columns={columns} dataSource={data} />
    </Layout>
  );
}

export default page;
