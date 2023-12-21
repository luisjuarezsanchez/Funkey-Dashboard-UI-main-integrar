"use client";
import VisitorDetail from "../components/VisitorDetail";

function page({ params }: { params: { visitorId: string } }) {
  return <VisitorDetail visitorId={params.visitorId} activePanel="rfid" />;
}

export default page;
