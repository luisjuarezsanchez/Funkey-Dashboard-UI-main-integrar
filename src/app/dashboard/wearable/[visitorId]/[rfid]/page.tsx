"use client";
import VisitorDetail from "../../components/VisitorDetail";

function page({ params }: { params: { visitorId: string; rfid: string } }) {
  return (
    <VisitorDetail
      visitorId={params.visitorId}
      rfid={params.rfid}
      activePanel="qrcode"
    />
  );
}

export default page;
