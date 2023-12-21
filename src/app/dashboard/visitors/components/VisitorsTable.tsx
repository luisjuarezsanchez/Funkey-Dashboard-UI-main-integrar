import { IGroup, IVisitor } from "@/src/services/groups/groups.interfaces";
import { useGetGroupsQuery } from "@/src/services/groups/groupsApi";
import { Button, Space, Table, TableColumnsType } from "antd";
import dayjs from "dayjs";
import { useState } from "react";
import VisitorsSearch from "./VisitorsSearch";
import { GroupLabel } from "./styles";

const columns: TableColumnsType<IGroup> = [
  {
    title: "Nombre del Grupo",
    dataIndex: "namegroup",
    key: "namegroup",
    render: (namegroup, _, index) => (
      <GroupLabel colorIndex={index}>{namegroup}</GroupLabel>
    ),
  },
  { title: "Fecha de reservación", dataIndex: "date", key: "date" },
  { title: "Hora de reservación", dataIndex: "hour", key: "hour" },
  { title: "Responsable", dataIndex: "responsable", key: "responsable" },
  {
    title: "Número de visitantes",
    dataIndex: "visitorsCount",
    key: "visitorsCount",
  },
  { title: "Idioma", dataIndex: "language", key: "language" },
];

const VisitorsTable = () => {
  const [searchText, setSearchText] = useState("");

  const date = dayjs();
  const startDate = date.startOf("day").format("YYYY-MM-DDTHH:mm");
  const endDate = date.endOf("day").format("YYYY-MM-DDTHH:mm");
  const { data, error } = useGetGroupsQuery({ startDate, endDate });

  const expandedRowRender = (record: IGroup) => {
    const columns: TableColumnsType<IVisitor> = [
      { title: "Nombre del Visitante", dataIndex: "name", key: "name" },
      { title: "Email", dataIndex: "mail", key: "mail" },
      { title: "Idioma", dataIndex: "language", key: "language" },
      { title: "Nacionalidad", dataIndex: "nacionality", key: "nacionality" },
      { title: "Cliente", dataIndex: "client", key: "client" },
      { title: "Genero", dataIndex: "gender", key: "gender" },
      {
        title: "Información",
        dataIndex: "information",
        key: "information",
        render: (_, { mail }) => (
          <Space size="middle">
            <Button
              href={`/dashboard/wearable/${mail}?bookingId=${record.bookingId}`}
            >
              Información
            </Button>
          </Space>
        ),
      },
    ];

    return (
      <Table
        columns={columns}
        dataSource={record.visitors.filter(
          (visitor) =>
            visitor.name
              .toLowerCase()
              .includes(searchText.toLocaleLowerCase()) ||
            visitor.mail.toLowerCase().includes(searchText.toLocaleLowerCase())
        )}
        pagination={false}
      />
    );
  };

  if (error) {
    return "Error";
  }

  if (!data) {
    return <>Loading ...</>;
  }

  const groupsData: IGroup[] = data.filter(
    (o) =>
      o.visitors.filter(
        (visitor) =>
          visitor.name.toLowerCase().includes(searchText.toLocaleLowerCase()) ||
          visitor.mail.toLowerCase().includes(searchText.toLocaleLowerCase())
      ).length > 0
  );

  return (
    <Space direction="vertical" style={{ padding: 20 }}>
      <VisitorsSearch onSearch={setSearchText} />
      <Table
        columns={columns}
        expandable={{
          expandedRowRender,
          defaultExpandedRowKeys: groupsData.map((o) => o.key),
        }}
        dataSource={groupsData}
      />
    </Space>
  );
};

export default VisitorsTable;
