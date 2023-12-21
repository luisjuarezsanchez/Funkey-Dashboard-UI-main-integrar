"use client";
import { ICamera, useGetCamerasQuery } from "@/src/services/camerasApi";
import { IGroup } from "@/src/services/groups/groups.interfaces";
import { useGetGroupsQuery } from "@/src/services/groups/groupsApi";
import { CheckCircleTwoTone } from "@ant-design/icons";
import { Card, Flex, Layout, Modal, Select, Space } from "antd";
import Meta from "antd/es/card/Meta";
import dayjs from "dayjs";
import React, { useEffect, useState } from "react";
import { io } from "socket.io-client";
import CameraModal from "./CameraModal";

export const socket = io(`${process.env.NEXT_PUBLIC_BFF_URL}`);

const modalStyle: React.CSSProperties = {
  height: "100vh",
  width: "100vw",
  margin: 0,
  top: 0,
};

const CameraList = () => {
  const [wsIsConnected, setWsIsConnected] = useState(socket.connected);
  const [isTakingPicture, setIsTakingPicture] = useState(false);
  const [imgPreview, setImgPreview] = useState<string | null>(null);

  const [open, setOpen] = useState(false);
  const [currentCamera, setCurrentCamera] = useState<ICamera | null>(null);
  const [courrentGroup, setCourrentGroup] = useState<string | null>(null);

  const date = dayjs();
  const startDate = date.startOf("day").format("YYYY-MM-DDTHH:mm");
  const endDate = date.endOf("day").format("YYYY-MM-DDTHH:mm");

  const {
    isLoading: camerasIsLoading,
    isFetching: camerasIsFetching,
    data: cameras,
    error: camerasError,
  } = useGetCamerasQuery(null);

  const {
    isLoading: groupsIsLoading,
    isFetching: groupsIsFetching,
    data: groups,
    error: groupsError,
  } = useGetGroupsQuery({ startDate, endDate });

  const isLoading = camerasIsLoading || groupsIsLoading;
  const isFetching = camerasIsFetching || groupsIsFetching;
  const error = camerasError || groupsError;

  useEffect(() => {
    function onConnect() {
      setWsIsConnected(true);
    }

    function onDisconnect() {
      setWsIsConnected(false);
    }

    function onPictureCreatedEvent(value: any) {
      setIsTakingPicture(false);
      setImgPreview(value.pictureUrl);
    }

    socket.on("connect", onConnect);
    socket.on("disconnect", onDisconnect);
    socket.on("onPictureCreated", onPictureCreatedEvent);

    return () => {
      socket.off("connect", onConnect);
      socket.off("disconnect", onDisconnect);
      socket.off("onPictureCreated", onPictureCreatedEvent);
    };
  }, []);

  const handlerOnTakePicture = () => {
    if (courrentGroup && currentCamera) {
      setIsTakingPicture(true);
      socket.emit(
        "takePicture",
        JSON.stringify({
          cameraId: currentCamera?.id,
          groupId: courrentGroup,
        })
      );
    }
  };

  const handlerOnCloseModal = () => {
    setOpen(false);
    setImgPreview(null);
    setIsTakingPicture(false);
  };

  const showModal = (camera: ICamera) => {
    if (courrentGroup) {
      setCurrentCamera(camera);
      setOpen(true);
    }
  };

  if (isLoading || isFetching) {
    return "Loading";
  }

  if (error) {
    return "Error";
  }

  return (
    <Layout
      style={{
        padding: "0 30px 30px 30px",
      }}
    >
      <Space direction="vertical" size="middle" style={{ display: "flex" }}>
        <h1>Photo Opportunities</h1>
        <h2> 1. Selecciona el grupo a tomar foto</h2>

        <Select
          size="large"
          showSearch
          style={{ width: 500 }}
          placeholder="Buscar Grupo"
          onChange={(value: string) => setCourrentGroup(value)}
          options={groups?.map((group: IGroup) => ({
            value: group.key,
            label: group.namegroup,
          }))}
        />
        <h2> 2. Selecciona la cámara</h2>
        <Space size={16}>
          <Flex wrap="wrap" gap="large">
            {cameras?.map((camera: ICamera) => (
              <Card
                key={camera.id}
                style={{
                  width: 300,
                  cursor:
                    camera.isConnected && courrentGroup && wsIsConnected
                      ? "pointer"
                      : "not-allowed",
                  opacity:
                    camera.isConnected && courrentGroup && wsIsConnected
                      ? 1
                      : 0.7,
                }}
                cover={<img alt="example" src={camera.preview} />}
                onClick={() => showModal(camera)}
                actions={[
                  wsIsConnected ? (
                    <CheckCircleTwoTone
                      key={camera.id}
                      twoToneColor={camera.isConnected ? "#009e00" : "#9e0000"}
                    />
                  ) : (
                    "Conectando..."
                  ),
                ]}
              >
                <Meta title={camera.name} description={camera.description} />
              </Card>
            ))}
          </Flex>

          <Modal
            style={modalStyle}
            centered
            open={open}
            width={"100%"}
            footer={null}
            onCancel={handlerOnCloseModal}
          >
            <CameraModal
              open={open}
              isLoading={isTakingPicture}
              onCloseModal={handlerOnCloseModal}
              courrentGroup={groups?.find(
                (o: IGroup) => o.key === courrentGroup
              )}
              currentCamera={currentCamera}
              onTackePicture={handlerOnTakePicture}
              imgPreview={imgPreview}
            />
          </Modal>
        </Space>
      </Space>
    </Layout>
  );
};

export default CameraList;
