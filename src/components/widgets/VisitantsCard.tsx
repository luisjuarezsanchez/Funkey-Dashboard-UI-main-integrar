import React from "react";
import { Card } from "antd";
import { ContainerOutlined } from "@ant-design/icons";

const gridStyleLeft: React.CSSProperties = {
  width: "50%",
  textAlign: "center",
  backgroundColor: "#D3ADF7",
};

const gridStyleRight: React.CSSProperties = {
  width: "50%",
  textAlign: "center",
  backgroundColor: "#E5E8EE",
};

const App: React.FC = () => (
  <Card>
    <Card.Grid style={gridStyleLeft}>
      <ContainerOutlined style={{ fontSize: "40px", marginRight: "8px" }} />
    </Card.Grid>
    <Card.Grid style={gridStyleRight}>Visitantes esperados hoy</Card.Grid>
  </Card>
);

export default App;
