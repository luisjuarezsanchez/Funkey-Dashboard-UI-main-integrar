"use client";

import { Space } from "antd";
import Image from "next/image";

function page() {
  return (
    <Space
      style={{
        position: "relative",
        justifyContent: "center",
        objectFit: "contain",
      }}
    >
      <Image
        src="/images/monitoreo.jpg"
        alt="Codice Azul Logo"
        width={1000}
        height={712}
      />
    </Space>
  );
}

export default page;
