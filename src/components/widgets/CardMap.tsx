import React from "react";
import { Card, Image, Flex, Button } from "antd";

const App: React.FC = () => (
  <Card
    style={{ width: 713, height: 200 }}
    headStyle={{ background: "#E5E8EE", color: "black" }}
    bodyStyle={{
      background: "#E5E8EE",
      display: "flex",
      flexDirection: "column",
      alignItems: "left",
      justifyContent: "center",
      height: "100%",
    }}
    bordered={false}
  >
    <p
      style={{
        margin: 0,
        textAlign: "left",
        paddingTop: "2px",
        paddingBottom: "10px",
        fontFamily: "Highlight 2",
        fontWeight: "bold",
      }}
    >
      Mapa de monitoreo
    </p>
    <Image src="/images/map.jpg" alt="Image" width={660} height={125} />
    <Flex
      wrap="wrap"
      gap="small"
      className="site-button-ghost-wrapper"
      justify="end"
      style={{ padding: "5px", borderRadius: "20px", paddingTop: "5px" }}
    >
      <Button type="primary" ghost>
        Ir a Mapa de Monitoreo {">"}
      </Button>
    </Flex>
  </Card>
);

export default App;
