import { Layout, Spin } from "antd";

function Loader() {
  return (
    <Layout style={{ justifyContent: "center", minHeight: "100vh" }}>
      <Spin size="large" />
    </Layout>
  );
}

export default Loader;
