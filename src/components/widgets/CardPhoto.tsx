import React from "react";
import { Card, Image, Flex, Button } from "antd";

const App: React.FC = () => (
  <Card
    style={{ width: 350, height: 190 }}
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
        fontFamily: "Highlight 2",
        fontWeight: "bold",
      }}
    >
      Photo opportunity
    </p>
    <Image src="/images/photo.jpg" alt="Image" width={300} height={100} />
    <Flex
      wrap="wrap"
      gap="small"
      className="site-button-ghost-wrapper"
      justify="end"
      style={{
        padding: "5px",
        borderRadius: "20px",
        paddingTop: "5px",
        alignItems: "center",
      }}
    >
      <Button type="primary" ghost>
        Ir a Photo Opps {">"}
      </Button>
    </Flex>
  </Card>
);

export default App;
