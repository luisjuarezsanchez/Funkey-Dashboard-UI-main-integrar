import VisitorCard from "@/src/components/dataDisplay/VisitorDetail/VisitorCard";
import { useGetVisitorByIdQuery } from "@/src/services/visitors/visitorsApi";
import { Card, Layout, Space } from "antd";
import { FC } from "react";
import ConfirmationStep from "./ConfirmationStep";
import QrCodeStep from "./QrCodeStep";
import RfidScanner from "./RfidScanner";

interface IVisitorDetail {
  visitorId: string;
  rfid?: string;
  qrcode?: string;
  activePanel: string;
}

const VisitorDetail: FC<IVisitorDetail> = ({
  visitorId,
  rfid,
  qrcode,
  activePanel,
}) => {
  const {
    data: visitor,
    error: visitorError,
    isFetching,
    isLoading,
  } = useGetVisitorByIdQuery({
    id: visitorId,
  });

  if (!visitor || isLoading || isFetching) {
    return "Loading...";
  }

  if (visitorError) {
    if ("status" in visitorError && visitorError.status) {
      return <h1>Visitante no encontrado</h1>;
    }

    return <h1>{JSON.stringify(visitorError)}</h1>;
  }

  const subComponent: any = {
    rfid: <RfidScanner visitorId={visitor.mail} />,
    qrcode: <QrCodeStep visitorId={visitor.mail} rfid={rfid || ""} />,
    final: (
      <ConfirmationStep
        visitorId={visitor.mail}
        rfid={rfid || ""}
        qrcode={qrcode || ""}
      />
    ),
  };

  return (
    <Layout style={{ padding: "30px 30px 30px 30px" }}>
      <Card>
        <Space direction="vertical" size={15}>
          <VisitorCard
            name={visitor.name}
            age={visitor.age}
            reservationType={visitor.reservationType}
            language={visitor.language}
            client={visitor.client}
            mail={visitor.mail}
            nationality={visitor.nationality}
          />
          {subComponent[activePanel]}
        </Space>
      </Card>
    </Layout>
  );
};

export default VisitorDetail;
