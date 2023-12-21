import { Space } from "antd";
import Image from "next/image";

function page() {
  return (
    <Space style={{ justifyContent: "center" }}>
      <Image
        src="/images/tmp.jpg"
        alt="Codice Azul Logo"
        width={1200}
        height={522}
      />
    </Space>
  );
}

export default page;
