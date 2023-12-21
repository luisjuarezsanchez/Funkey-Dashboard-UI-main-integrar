import { ICamera } from "@/src/services/camerasApi";
import { IGroup } from "@/src/services/groups/groups.interfaces";
import { LoadingOutlined } from "@ant-design/icons";
import { Button, Skeleton, Space, Spin } from "antd";
import { FC } from "react";
import { ModalContaner } from "./style";

// import { ModalContaner } from "./style";

//
const modalbodyStyle: React.CSSProperties = {
  position: "relative",
  height: "calc(103vh - 110px)",
  width: "100%",
  justifyContent: "center",
};

interface ICameraModalProps {
  open: boolean;
  isLoading: boolean;
  imgPreview: string | null;
  courrentGroup?: IGroup;
  currentCamera: ICamera | null;
  onTackePicture: () => void;
  onCloseModal: () => void;
}

const CameraModal: FC<ICameraModalProps> = ({
  isLoading,
  imgPreview,
  courrentGroup,
  currentCamera,
  onTackePicture,
  onCloseModal,
}) => {
  if (isLoading) {
    return (
      <Space
        align="center"
        direction="vertical"
        size={5}
        style={modalbodyStyle}
      >
        <div
          style={{
            position: "absolute",
            width: 84,
            height: 84,
            border: "5px solid #ddd",
            borderRadius: "50%",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -47%)",
          }}
        ></div>
        <Spin indicator={<LoadingOutlined style={{ fontSize: 84 }} spin />} />
      </Space>
    );
  }

  return (
    <Space align="center" direction="vertical" size={5} style={modalbodyStyle}>
      {!imgPreview ? (
        <>
          <h1 style={{ margin: 0 }}>{courrentGroup?.namegroup}</h1>
          <h1 style={{ margin: 0 }}>{currentCamera?.name}</h1>

          <img
            src={currentCamera?.preview}
            alt="preview"
            width={300}
            style={{ position: "relative" }}
          />

          <h4>
            Cámara montada sobre tótem enfrente de cava. Los visitantes deberán
            colocarse enfrente del tótem.
          </h4>

          <Button type="primary" onClick={() => onTackePicture()}>
            Tomar Foto
          </Button>
        </>
      ) : (
        <ModalContaner>
          <Space direction="vertical" align="start">
            <h1 style={{ margin: 0 }}>{courrentGroup?.namegroup}</h1>
            <h1 style={{ margin: 0 }}>{currentCamera?.name}</h1>
          </Space>

          <div className="preview-wrap">
            <Skeleton.Image active={true} className="preview-skeleton" />
            <img src={imgPreview} className="preview-img" alt="preview" />
          </div>

          <Space
            style={{
              paddingTop: "2rem",
              justifyContent: "center",
              width: "100%",
            }}
          >
            <Button onClick={() => onTackePicture()}>Repetir Foto</Button>
            <Button onClick={() => onCloseModal()} type="primary">
              Guardar Foto
            </Button>
          </Space>
        </ModalContaner>
      )}
    </Space>
  );
};

export default CameraModal;
