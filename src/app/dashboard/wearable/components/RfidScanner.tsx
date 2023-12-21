import { Button, Card, Col, Image, Row, Space } from "antd";
import { useSearchParams } from "next/navigation";
import React, { FC, useEffect, useState } from "react";

const car1dStyle: React.CSSProperties = {
  padding: "10px 50px 50px 50px",
  width: "75rem",
  height: "40rem",
  borderRadius: "0.625rem",
  backgroundColor: "#D7DBEC",
};

const cardImage: React.CSSProperties = {
  backgroundColor: "#D7DBEC",
};

const parrafo: React.CSSProperties = {
  color: "#24314C",
  fontSize: "1.25rem",
  fontStyle: "normal",
};

const ButtonStyle: React.CSSProperties = {
  borderRadius: "2rem",
  backgroundColor: "#24314C",
  width: "9rem",
};
interface RfidScannerProps {
  visitorId: string;
}
const RfidScanner: FC<RfidScannerProps> = ({ visitorId }) => {
  const [rfid, setRfid] = useState("");
  const searchParams = useSearchParams();
  const bookingId = searchParams.get("bookingId");

  useEffect(() => {
    const handleKeyPress = (event: any) => {
      if (event.key.match(/^[0-9a-z]+$/)) {
        const newRfidVal = rfid.length >= 10 ? "" : rfid;
        setRfid(`${newRfidVal}${event.key}`);
      }
    };

    document.addEventListener("keydown", handleKeyPress);

    return () => {
      document.removeEventListener("keydown", handleKeyPress);
    };
  }, [rfid]);

  return (
    <Card style={car1dStyle}>
      <h1 style={{ margin: 0, marginBottom: "2rem" }}>Escanear RFID</h1>
      <Space direction="vertical" size={20}>
        <Space size={190}>
          <Image src="/images/Vector.png" alt="Codice Azul Logo" width={200} />
          <Image
            style={cardImage}
            src="/images/rfdi.png"
            alt="Codice Azul Logo"
            width={200}
          />
          <Image
            style={cardImage}
            src="/images/desktop.png"
            alt="Codice Azul Logo"
            width={200}
          />
        </Space>
        <Space size={210}>
          <p style={parrafo}>1 Localizar el RFDI</p>
          <p style={parrafo}>2 Escanear el RFDI</p>
          <p style={parrafo}>3 Comprueba en la computadora</p>
        </Space>
        <Space size={350}>
          <p></p>
          <p>Puedes introducirlo manualmente en el siguiente campo</p>
        </Space>
        <Row justify="space-evenly">
          <Col>
            <Space
              style={{
                background: "#BFC4DA",
                color: "white",
                fontSize: "1.5rem",
                width: "15rem",
                height: "3rem",
                justifyContent: "center",
                border: "1px solid white",
              }}
            >
              {rfid}
            </Space>
          </Col>
        </Row>
        <Row justify="center" gutter={16}>
          <Col>
            <Button
              size="large"
              type="primary"
              style={ButtonStyle}
              onClick={() => setRfid("")}
            >
              Limpiar
            </Button>
          </Col>
          <Col>
            <Button
              size="large"
              type="primary"
              style={ButtonStyle}
              href={`/dashboard/wearable/${visitorId}/${rfid}?bookingId=${bookingId}`}
            >
              Siguiente
            </Button>
          </Col>
        </Row>
      </Space>
    </Card>
  );
};

export default RfidScanner;
