// CardClimate.tsx
import React from "react";
import { Card, Col, Row } from "antd";
import { CloudOutlined } from "@ant-design/icons";

interface CardClimateProps {
  weatherData: any;
}

const DraggableCardClimate: React.FC<CardClimateProps> = ({ weatherData }) => {
  if (
    !weatherData ||
    !weatherData.main ||
    !weatherData.weather ||
    weatherData.weather.length === 0
  ) {
    return <div>Cargando datos meteorológicos...</div>;
  }

  const { main, weather } = weatherData;
  const actualMain = weather[0].main;
  const maxTemperature = main.temp_max;
  const minTemperature = main.temp_min;
  const actualTemperature = main.temp;

  return (
    <div>
      <Card
        title={
          <div>
            <CloudOutlined style={{ fontSize: "40px", marginRight: "8px" }} />
          </div>
        }
        style={{ width: 350, height: 95 }}
        headStyle={{ background: "#FFD591", color: "black" }}
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
                {actualMain}
              </p>
            </Col>
          </Row>
          <Row>
            <Col span={6}>
              <p
                style={{
                  fontFamily: "Highlight 1",
                  fontWeight: "bold",
                  fontSize: "32px",
                  marginTop: "-15px",
                }}
              >
                {actualTemperature}°C
              </p>
            </Col>
          </Row>
        </div>
        <div style={{ padding: "1px" }}>
          <Row>
            <Col>
              <p
                style={{
                  fontFamily: "Highlight 2",
                  fontWeight: "bold",
                  fontSize: "18px",
                  marginTop: "-15px",
                }}
              >
                Max: {maxTemperature}°C
              </p>
            </Col>
          </Row>
          <Row>
            <Col>
              <p
                style={{
                  fontFamily: "Highlight 2",
                  fontWeight: "bold",
                  fontSize: "18px",
                  marginTop: "-15px",
                }}
              >
                Min: {minTemperature}°C
              </p>
            </Col>
          </Row>
        </div>
      </Card>
    </div>
  );
};

export default DraggableCardClimate;
