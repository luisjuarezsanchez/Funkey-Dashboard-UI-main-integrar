import { QrScanner } from "@yudiel/react-qr-scanner";
import { Button, Card, Space } from "antd";
import { useSearchParams } from "next/navigation";
import { useState } from "react";

const car1dStyle: React.CSSProperties = {
  padding: "10px 50px 50px 50px",
  width: "75rem",
  height: "40rem",
  borderRadius: "0.625rem",
  backgroundColor: "#D7DBEC",
};

const ButtonStyle: React.CSSProperties = {
  borderRadius: "2rem",
  width: "10rem",
  height: "2.5rem",
  backgroundColor: "#24314C",
  alignItems: "center",
  justifyContent: "center",
  display: "flex",
};

const QrCodeStep = ({
  visitorId,
  rfid,
}: {
  visitorId: string;
  rfid: string;
}) => {
  const [result, setResult] = useState("");
  const [isCameraActive, setIsCameraActive] = useState(false);
  const searchParams = useSearchParams();
  const bookingId = searchParams.get("bookingId");

  return (
    <Card style={car1dStyle}>
      <Space direction="vertical" align="center" style={{ width: "100%" }}>
        <h1 style={{ margin: 0, marginBottom: "2rem" }}>Escanear Nanotag</h1>
        Coloca el QR dentro del área
        <div style={{ width: 300, margin: "auto" }}>
          {isCameraActive ? (
            <QrScanner
              onResult={(result: any) => setResult(result.text)}
              onError={(error: any) => console.log(error?.message)}
            />
          ) : (
            <Space
              style={{
                width: "100%",
                height: 250,
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              <Button onClick={() => setIsCameraActive(true)}>Activar</Button>
            </Space>
          )}
        </div>
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
          {result}
        </Space>
        <Button
          type="primary"
          style={ButtonStyle}
          href={`/dashboard/wearable/${visitorId}/${rfid}/${result}?bookingId=${bookingId}`}
        >
          Siguiente
        </Button>
      </Space>
    </Card>
  );
};

export default QrCodeStep;
