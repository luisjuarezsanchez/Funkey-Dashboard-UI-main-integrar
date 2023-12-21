import { Card, Col, Row } from "antd";
import Meta from "antd/es/card/Meta";
import { FC } from "react";

interface IVisitorCardProps {
  name: string;
  age: string;
  reservationType: string;
  language: string;
  client: string;
  mail: string;
  nationality: string;
}

const cardStyle: React.CSSProperties = {
  width: "75rem",
  height: "10rem",
  borderRadius: "0.625rem",
  backgroundColor: "#FFF",
};

const letter: React.CSSProperties = {
  color: "#38435A",
  margin: 0,
};

const VisitorCard: FC<IVisitorCardProps> = ({
  name,
  age,
  reservationType,
  language,
  client,
  mail,
  nationality,
}) => {
  return (
    <Card style={cardStyle}>
      <>
        <Row gutter={5}>
          <Col span={6}>
            <h2 style={letter}>{name}</h2>
          </Col>
          <Col span={6}>
            <Meta title="Edad:" description={age} />
          </Col>
          <Col span={6}>
            <Meta title="Tipo de reservación:" description={reservationType} />
          </Col>
          <Col span={6}>
            <Meta title="Idioma:" description={language} />
          </Col>
        </Row>
        <Row gutter={5}>
          <Col span={24}></Col>
        </Row>
        <Row gutter={5} style={{ marginTop: "1.5rem" }}>
          <Col span={6}>
            <Meta title="Cliente:" description={client} />
          </Col>
          <Col span={6}>
            <Meta title="Email:" description={mail} />
          </Col>
          <Col span={6}>
            <Meta title="Nacionalidad:" description={nationality} />
          </Col>
        </Row>
      </>
    </Card>
  );
};

export default VisitorCard;
