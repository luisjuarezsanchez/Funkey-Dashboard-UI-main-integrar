"use client";
import VisitorDetail from "../../../components/VisitorDetail";

function page({
  params,
}: {
  params: { visitorId: string; rfid: string; qrcode: string };
}) {
  return (
    <VisitorDetail
      visitorId={params.visitorId}
      rfid={params.rfid}
      qrcode={params.qrcode}
      activePanel="final"
    />
  );
}

export default page;
