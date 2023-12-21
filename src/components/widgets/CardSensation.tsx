// CardSensation.tsx
import React from "react";
import { Card, Col, Row } from "antd";
import { FireOutlined } from "@ant-design/icons";

interface CardSensationProps {
  weatherData: any;
}

const DraggableCardSensation: React.FC<CardSensationProps> = ({
  weatherData,
}) => {
  if (
    !weatherData ||
    !weatherData.main ||
    !weatherData.weather ||
    weatherData.weather.length === 0
  ) {
    return <div>Cargando datos meteorológicos...</div>;
  }

  const { main } = weatherData;
  const humidity = main.humidity;
  const feelsLike = main.feels_like;

  return (
    <div>
      <Card
        title={
          <div>
            <FireOutlined style={{ fontSize: "40px", marginRight: "8px" }} />
          </div>
        }
        style={{ width: 350, height: 95 }}
        headStyle={{ background: "#FFCCC7", color: "black" }}
        bodyStyle={{
          background: "#E5E8EE",
          display: "flex",
          justifyContent: "space-between",
          height: "100%",
        }}
      >
        <div style={{ flex: 1, padding: "1px" }}>
          <Row>
            <Col span={6}>
              <p
                style={{
                  fontFamily: "Highlight 2",
                  fontWeight: "bold",
                  fontSize: "18px",
                  marginTop: "-15px",
                }}
              >
                Humedad:
              </p>
              <p
                style={{
                  fontFamily: "Highlight 1",
                  fontWeight: "bold",
                  fontSize: "32px",
                  marginTop: "-15px",
                }}
              >
                {humidity}%
              </p>
            </Col>
          </Row>
        </div>
        <div style={{ padding: "1px" }}>
          <Row>
            <Col span={6}>
              <p
                style={{
                  fontFamily: "Highlight 2",
                  fontWeight: "bold",
                  fontSize: "18px",
                  marginTop: "-15px",
                }}
              >
                Sensación:
              </p>
            </Col>
          </Row>
          <Row>
            <Col>
              <p
                style={{
                  fontFamily: "Highlight 1",
                  fontWeight: "bold",
                  fontSize: "32px",
                  marginTop: "-15px",
                }}
              >
                {feelsLike}°C
              </p>
            </Col>
          </Row>
        </div>
      </Card>
    </div>
  );
};

export default DraggableCardSensation;
