import {
  IInteraction,
  useGetInteractionByVisitorIdQuery,
} from "@/src/services/interactionsApi";
import { useGetVisitorByIdQuery } from "@/src/services/visitors/visitorsApi";
import { ClockCircleOutlined } from "@ant-design/icons";
import { Card, Col, Divider, Image, Layout, Row, Space } from "antd";
import Meta from "antd/es/card/Meta";
import React from "react";
import VisitorsTags from "./VisitorsTags";

const cardStyle: React.CSSProperties = {
  width: "75rem",
  height: "10rem",
  borderRadius: "0.625rem",
  backgroundColor: "#FFF",
};

const letter: React.CSSProperties = {
  color: "#38435A",
  margin: 0,
};

const VisitorsProfile = ({ visitorId }: { visitorId: string }) => {
  const {
    data: profile,
    error: visitorError,
    isFetching: profileIsFetching,
    isLoading: profileIsLoading,
  } = useGetVisitorByIdQuery({
    id: visitorId,
  });

  const {
    data: interactions,
    isFetching: interactionsIsFetching,
    isLoading: interactionsIsLoading,
  } = useGetInteractionByVisitorIdQuery({
    id: visitorId,
  });

  const isLoading = profileIsLoading || interactionsIsLoading;
  const isFetching = profileIsFetching || interactionsIsFetching;

  if (isLoading || isFetching) {
    return "Loading...";
  }

  if (visitorError) {
    if ("status" in visitorError && visitorError.status) {
      return <h1>Visitante no encontrado</h1>;
    }

    return <h1>{JSON.stringify(visitorError)}</h1>;
  }

  return (
    <Layout style={{ padding: "0 30px 30px 30px" }}>
      <h1>Perfil de visitante</h1>
      <Space direction="vertical" size={16}>
        <Card style={cardStyle} key={profile?.mail}>
          <>
            <Row gutter={24}>
              <Col span={6}>
                <h2 style={letter}>{profile?.name}</h2>
              </Col>
              <Col span={6}>
                <Meta title="Edad:" description={profile?.age} />
              </Col>
              <Col span={6}>
                <Meta
                  title="Tipo de reservación:"
                  description={profile?.reservationType}
                />
              </Col>
              <Col span={6}>
                <Meta title="Idioma:" description={profile?.language} />
              </Col>
            </Row>
            <Row gutter={5}>
              <Col span={24}></Col>
            </Row>
            <Row gutter={5} style={{ marginTop: "1.5rem" }}>
              <Col span={6}>
                <Meta title="Cliente:" description={profile?.client} />
              </Col>
              <Col span={6}>
                <Meta title="Email:" description={profile?.mail} />
              </Col>
              <Col span={6}>
                <Meta
                  title="Nacionalidad:"
                  description={profile?.nationality}
                />
              </Col>
              <Col span={6}>
                <Meta title="Responsable:" description={profile?.responsable} />
              </Col>
            </Row>
          </>
        </Card>
        <Space>
          <Card
            size="small"
            title="Puntos de información escaneados"
            style={{ width: 300 }}
            bodyStyle={{ paddingRight: 0, height: 200, overflowY: "scroll" }}
          >
            {!interactions?.length ? (
              <p>NO INTERACTIONS</p>
            ) : (
              interactions?.map((interaction: IInteraction) => (
                <Row key={interaction.activationDate}>
                  <Col span={24}>
                    <Meta
                      avatar={<ClockCircleOutlined />}
                      title={interaction.activationDate}
                      description={interaction.idSensor}
                    />
                  </Col>
                  <Divider orientation="left"></Divider>
                </Row>
              ))
            )}
          </Card>
          <Card
            size="small"
            title="Galería de fotografías"
            style={{ width: 700 }}
          >
            <Row gutter={5} style={{ marginTop: "1rem" }}>
              <Col span={6}>
                <Image
                  src="/images/rfdi.png"
                  alt="Codice Azul Logo"
                  width={90}
                />
              </Col>
              <Col span={6}>
                <Image
                  src="/images/rfdi.png"
                  alt="Codice Azul Logo"
                  width={90}
                />
              </Col>
              <Col span={6}>
                <Image
                  src="/images/rfdi.png"
                  alt="Codice Azul Logo"
                  width={90}
                />
              </Col>
              <Col span={6}>
                <Image
                  src="/images/rfdi.png"
                  alt="Codice Azul Logo"
                  width={90}
                />
              </Col>
              <Divider orientation="right">
                <a href="#">Ver más</a>
              </Divider>
            </Row>
          </Card>
        </Space>
        <Space>
          <VisitorsTags visitorId={visitorId} />
        </Space>
      </Space>
    </Layout>
  );
};

export default VisitorsProfile;
