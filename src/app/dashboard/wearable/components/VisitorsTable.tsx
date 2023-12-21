"use client";
import { IGroup, IVisitor } from "@/src/services/groups/groups.interfaces";
import { useGetGroupsQuery } from "@/src/services/groups/groupsApi";
import {
  AutoComplete,
  Button,
  Card,
  DatePicker,
  DatePickerProps,
  Input,
  Layout,
  Space,
  TableColumnsType,
} from "antd";
import { RangePickerProps } from "antd/es/date-picker";
import Table from "antd/es/table";
import dayjs from "dayjs";
import React, { ChangeEvent, useState } from "react";
import { GroupLabel, Section } from "./style";

const AutoStyle: React.CSSProperties = {
  width: "31.42rem",
  backgroundColor: "#969CB4",
};
const { RangePicker } = DatePicker;

const VisitorsTable = () => {
  const date = dayjs();
  const inDate = date.startOf("day").format("YYYY-MM-DDTHH:mm");
  const outDate = date.endOf("day").format("YYYY-MM-DDTHH:mm");
  const [searchText, setSearchText] = useState("");
  const [startDate, setStartDate] = useState(inDate);
  const [endDate, setEndDate] = useState(outDate);
  const { data } = useGetGroupsQuery({
    startDate: startDate,
    endDate: endDate,
  });

  const expandedRowRender = (record: IGroup) => {
    const columns: TableColumnsType<IVisitor> = [
      { title: "Nombre del Visitante", dataIndex: "name", key: "name" },
      { title: "Email", dataIndex: "mail", key: "mail" },
      { title: "Edad", dataIndex: "age", key: "age" },
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

  const handlerOnInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    setSearchText(e.currentTarget.value);
  };

  const searchVistors = () => {
    console.log(searchText);
  };

  const onChange = (
    value: DatePickerProps["value"] | RangePickerProps["value"],
    dateString: [string, string] | string
  ) => {
    console.log("Formatted Selected Time: ", dateString[0]);
    setStartDate(dateString[0]);
    setEndDate(dateString[1]);
  };

  const groupsData: IGroup[] | undefined = data?.filter(
    (o) =>
      o.visitors.filter(
        (visitor) =>
          visitor.name.toLowerCase().includes(searchText.toLocaleLowerCase()) ||
          visitor.mail.toLowerCase().includes(searchText.toLocaleLowerCase())
      ).length > 0
  );

  return (
    <Layout style={{ padding: "30px 30px 30px 30px" }}>
      <Section>
        <h1>Buscador de visitantes</h1>
        <Space direction="vertical" size="middle" style={{ display: "flex" }}>
          <Card title="Encontrar visitante" className="card-style">
            <Space size={12}>
              <RangePicker
                showTime={{ format: "HH:mm" }}
                format="YYYY-MM-DD HH:mm"
                onChange={onChange}
                value={[date.startOf("day"), date.endOf("day")]}
              />
              <AutoComplete
                popupClassName="certain-category-search-dropdown"
                popupMatchSelectWidth={500}
                size="large"
              >
                <Input.Search
                  style={AutoStyle}
                  size="large"
                  placeholder="Nombre/E-mail/Edad"
                  onChange={handlerOnInputChange}
                />
              </AutoComplete>
              <Button
                type="primary"
                className="button-style"
                onClick={() => searchVistors()}
              >
                Buscar
              </Button>
            </Space>
          </Card>
          {!groupsData ? (
            "Loading..."
          ) : (
            <Table
              columns={columns}
              expandable={{
                expandedRowRender,
                defaultExpandedRowKeys: groupsData.map((o) => o.key),
              }}
              dataSource={groupsData}
            />
          )}
        </Space>
      </Section>
    </Layout>
  );
};

export default VisitorsTable;
