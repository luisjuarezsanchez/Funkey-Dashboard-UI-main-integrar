import React from "react";
import { Table, Button, Flex } from "antd";

const { Column } = Table;

interface DataType {
  key: React.Key;
  grupo: string;
  visitantes: number;
  idioma: string;
  horaReserva: string;
  responsable: string;
}

const data: DataType[] = [
  {
    key: "1",
    grupo: "Grupo A",
    visitantes: 4,
    idioma: "Español",
    horaReserva: "3:22 pm",
    responsable: "Roberto Jimenez",
  },
  {
    key: "2",
    grupo: "Grupo B",
    visitantes: 5,
    idioma: "Inglés",
    horaReserva: "4:30 pm",
    responsable: "Mariana Díaz",
  },
  {
    key: "3",
    grupo: "Grupo C",
    visitantes: 4,
    idioma: "Español",
    horaReserva: "3:22 pm",
    responsable: "Roberto Jimenez",
  },
];

const App: React.FC = () => (
  <div>
    <Table dataSource={data} pagination={false} scroll={{ x: 500, y: 100 }}>
      <Column
        title={<span style={{ color: "#000000" }}>Grupo</span>}
        dataIndex="grupo"
        key="grupo"
      />
      <Column
        title={<span style={{ color: "#000000" }}># Visitantes</span>}
        dataIndex="visitantes"
        key="visitantes"
      />
      <Column
        title={<span style={{ color: "#000000" }}>Idioma</span>}
        dataIndex="idioma"
        key="idioma"
      />
      <Column
        title={<span style={{ color: "#000000" }}>Hora de reserva</span>}
        dataIndex="horaReserva"
        key="horaReserva"
      />
      <Column
        title={<span style={{ color: "#000000" }}>Responsable</span>}
        dataIndex="responsable"
        key="responsable"
      />
    </Table>

    <Flex
      wrap="wrap"
      gap="small"
      className="site-button-ghost-wrapper"
      justify="end"
      style={{ padding: "5px", borderRadius: "20px" }}
    >
      <Button type="primary" ghost>
        Ir a visita de Hacienda {">"}
      </Button>
    </Flex>
  </div>
);

export default App;
