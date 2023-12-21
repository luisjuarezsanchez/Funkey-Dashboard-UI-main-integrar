"use client";

import VisitorsProfile from "./components/VisitorsProfile";

function page({ params }: { params: { visitorId: string } }) {
  return <VisitorsProfile visitorId={params.visitorId} />;
}

export default page;
