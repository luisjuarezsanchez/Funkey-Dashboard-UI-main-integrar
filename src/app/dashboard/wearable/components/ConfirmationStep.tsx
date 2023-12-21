import { Button, Card, Col, Layout, Result, Row, Space } from "antd";
import { useSearchParams } from "next/navigation";
import React, { useState } from "react";
import { ResultContainer } from "./style";

const car1dStyle: React.CSSProperties = {
  padding: "10px 50px 50px 50px",
  width: "100%",
  height: "30rem",
  borderRadius: "0.625rem",
  backgroundColor: "#D7DBEC",
};

const ButtonStyle: React.CSSProperties = {
  borderRadius: "2rem",
  width: "10rem",
  height: "2.5rem",
  backgroundColor: "#24314C",
  alignItems: "center",
  justifyContent: "center",
  display: "flex",
};

const ConfirmationStep = ({
  visitorId,
  rfid,
  qrcode,
}: {
  visitorId: string;
  rfid: string;
  qrcode: string;
}) => {
  const searchParams = useSearchParams();
  const bookingId = searchParams.get("bookingId");
  const [isResultVisible, setIsResultVisible] = useState(false);

  const handlerOnConfirm = () => {
    fetch(`${process.env.NEXT_PUBLIC_BFF_URL}/tags`, {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${"tmp-token"}`,
        mode: "cors",
      },
      method: "POST",
      body: JSON.stringify({
        id: visitorId,
        idNanotag: qrcode,
        idRfid: rfid,
        idBooking: bookingId,
      }),
    })
      .then((response) => response.status)
      .then((data) => {
        if (data === 201) {
          setIsResultVisible(true);
        }
      })
      .catch((e) => {
        console.log("error", e);
      });
  };

  return (
    <Layout>
      <Row gutter={15}>
        <Col span={12}>
          <Card style={car1dStyle}>
            <Space
              direction="vertical"
              align="center"
              style={{ width: "100%" }}
            >
              <h3>RFID</h3>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="199"
                height="199"
                viewBox="0 0 199 199"
                fill="none"
              >
                <g clipPath="url(#clip0_750_3355)">
                  <path
                    d="M190.708 -3.91394e-05H66.2556C65.1664 -0.00254904 64.0874 0.210746 63.081 0.627529C62.0746 1.04431 61.1608 1.65633 60.3922 2.42823L2.4283 60.3922C1.65639 61.1607 1.04437 62.0746 0.62759 63.0809C0.210807 64.0873 -0.002488 65.1663 2.18957e-05 66.2556V190.708C0.0019822 192.907 0.876196 195.015 2.43076 196.569C3.98532 198.124 6.0932 198.998 8.29169 199H190.708C192.906 198.997 195.013 198.122 196.567 196.568C198.121 195.013 198.994 192.906 198.996 190.708V8.29163C198.994 6.09314 198.12 3.98526 196.566 2.4307C195.011 0.876134 192.903 0.00192117 190.705 -3.91394e-05H190.708ZM8.29169 190.708V66.2519L66.2556 8.29163H190.708V190.708H8.29169Z"
                    fill="black"
                  />
                  <path
                    d="M116.083 78.7708H82.9168C82.3723 78.7703 81.8329 78.8772 81.3297 79.0854C80.8265 79.2936 80.3693 79.599 79.9842 79.984C79.5991 80.3691 79.2938 80.8263 79.0856 81.3295C78.8774 81.8328 78.7705 82.3721 78.771 82.9167V116.083C78.7705 116.628 78.8774 117.167 79.0856 117.67C79.2938 118.174 79.5991 118.631 79.9842 119.016C80.3693 119.401 80.8265 119.706 81.3297 119.915C81.8329 120.123 82.3723 120.23 82.9168 120.229H116.083C116.628 120.23 117.167 120.123 117.671 119.915C118.174 119.706 118.631 119.401 119.016 119.016C119.401 118.631 119.707 118.174 119.915 117.67C120.123 117.167 120.23 116.628 120.229 116.083V103.646H140.958C143.157 103.643 145.264 102.768 146.818 101.214C148.373 99.6597 149.247 97.5523 149.25 95.3542V58.0417C149.247 55.8435 148.373 53.7362 146.818 52.1818C145.264 50.6275 143.157 49.7529 140.958 49.75H92.926C91.8364 49.747 90.7569 49.9604 89.7504 50.3778C88.7439 50.7953 87.8303 51.4086 87.0627 52.182L52.1784 87.0625C51.4062 87.8308 50.794 88.7446 50.3772 89.751C49.9604 90.7575 49.7472 91.8366 49.7502 92.9259V140.958C49.7521 143.157 50.6263 145.265 52.1809 146.819C53.7355 148.374 55.8433 149.248 58.0418 149.25H165.833C168.031 149.247 170.138 148.372 171.692 146.818C173.246 145.264 174.12 143.156 174.121 140.958V33.1667C174.119 30.9688 173.244 28.8619 171.689 27.3081C170.135 25.7544 168.028 24.8807 165.83 24.8787H80.4886C79.3985 24.8772 78.3189 25.0921 77.3124 25.5108C76.3059 25.9296 75.3925 26.5438 74.6252 27.3181L27.3182 74.625C26.5448 75.3926 25.9316 76.3062 25.5141 77.3127C25.0966 78.3193 24.8832 79.3987 24.8863 80.4884V165.833C24.8882 168.032 25.7624 170.14 27.317 171.694C28.8716 173.249 30.9794 174.123 33.1779 174.125H169.979C171.079 174.125 172.133 173.688 172.911 172.911C173.688 172.133 174.125 171.079 174.125 169.979C174.125 168.88 173.688 167.825 172.911 167.048C172.133 166.27 171.079 165.833 169.979 165.833H33.1668V80.4884L80.4886 33.1667H165.833V140.958H58.0418V92.9259L92.926 58.0417H140.958V95.3542H120.229V82.9167C120.23 82.3721 120.123 81.8328 119.915 81.3295C119.707 80.8263 119.401 80.3691 119.016 79.984C118.631 79.599 118.174 79.2936 117.671 79.0854C117.167 78.8772 116.628 78.7703 116.083 78.7708ZM111.938 111.938H87.0627V87.0625H111.938V111.938Z"
                    fill="black"
                  />
                </g>
                <defs>
                  <clipPath id="clip0_750_3355">
                    <rect width="199" height="199" fill="white" />
                  </clipPath>
                </defs>
              </svg>
              <Space
                style={{
                  background: "#BFC4DA",
                  color: "white",
                  fontSize: "1.5rem",
                  width: "15rem",
                  height: "3rem",
                  justifyContent: "center",
                  border: "1px solid white",
                }}
              >
                {rfid}
              </Space>
            </Space>
          </Card>
        </Col>
        <Col span={12}>
          <Card style={car1dStyle}>
            <Space
              direction="vertical"
              align="center"
              style={{ width: "100%" }}
            >
              <h3>Nanotag</h3>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="202"
                height="202"
                viewBox="0 0 202 202"
                fill="none"
              >
                <g clipPath="url(#clip0_750_3358)">
                  <path
                    d="M105.812 0H125.049V9.61664H115.428V19.2369H96.1915V48.094H76.9546V38.4774H86.5712V9.62025H105.812V0Z"
                    fill="black"
                  />
                  <path
                    d="M0 0V67.3345H67.3345V0H0ZM57.7143 57.7143H9.62025V9.62025H57.7143V57.7143Z"
                    fill="black"
                  />
                  <path
                    d="M134.669 0V67.3345H202V0H134.669ZM192.383 57.7143H144.286V9.62025H192.383V57.7143Z"
                    fill="black"
                  />
                  <path
                    d="M19.2368 19.2369H48.094V48.094H19.2368V19.2369Z"
                    fill="black"
                  />
                  <path
                    d="M153.902 19.2369H182.759V48.094H153.902V19.2369Z"
                    fill="black"
                  />
                  <path
                    d="M105.812 28.8571H115.429V38.4774H105.812V28.8571Z"
                    fill="black"
                  />
                  <path
                    d="M115.428 38.4774H125.045V76.9548H115.428V57.7143H105.812V67.3345H96.188V48.0976H115.428V38.4774Z"
                    fill="black"
                  />
                  <path
                    d="M76.9549 57.7143H86.5715V67.3345H96.1918V76.9548H86.5715V96.1917H96.1918V86.5714H105.812V76.9548H115.429V105.812H96.1918V115.429H86.5715V105.812H76.9549V86.5714H57.7144V76.9548H76.9549V57.7143Z"
                    fill="black"
                  />
                  <path
                    d="M19.2368 76.9548H38.4737V86.5714H19.2368V76.9548Z"
                    fill="black"
                  />
                  <path
                    d="M125.045 76.9548H144.286V86.5714H134.669V96.1917H125.045V76.9548Z"
                    fill="black"
                  />
                  <path
                    d="M153.902 76.9548H163.523V86.5714H153.902V76.9548Z"
                    fill="black"
                  />
                  <path
                    d="M0 86.5714H19.2369V96.1881H28.8571V105.812H19.2369V115.429H9.61664V96.1881H0V86.5714Z"
                    fill="black"
                  />
                  <path
                    d="M38.4775 86.5714H57.7144V96.1881H48.0942V105.812H57.7144V115.429H38.4775V86.5714Z"
                    fill="black"
                  />
                  <path
                    d="M163.523 86.5714H173.143V96.1881H182.759V125.045H173.143V115.429H153.902V125.045H144.286V105.812H163.523V86.5714Z"
                    fill="black"
                  />
                  <path
                    d="M57.7144 96.1881H67.331V105.808H57.7144V96.1881Z"
                    fill="black"
                  />
                  <path
                    d="M192.38 96.1881H202V105.808H192.38V96.1881Z"
                    fill="black"
                  />
                  <path
                    d="M67.3346 105.812H76.9549V125.049H57.7144V115.429H67.3346V105.812Z"
                    fill="black"
                  />
                  <path
                    d="M115.429 105.812H125.049V115.429H115.429V105.812Z"
                    fill="black"
                  />
                  <path
                    d="M0 115.429H9.61664V125.049H0V115.429Z"
                    fill="black"
                  />
                  <path
                    d="M19.2368 115.429H28.8571V125.049H19.2368V115.429Z"
                    fill="black"
                  />
                  <path
                    d="M96.1881 115.429H115.429V125.045H105.808V144.286H96.1881V163.523H86.5714V144.286H76.9512V125.045H86.5714V134.665H96.1881V115.429Z"
                    fill="black"
                  />
                  <path
                    d="M125.045 115.429H134.666V125.049H125.045V115.429Z"
                    fill="black"
                  />
                  <path
                    d="M192.38 115.429H202V125.049H192.38V115.429Z"
                    fill="black"
                  />
                  <path
                    d="M115.429 125.045H125.049V144.286H115.429V125.045Z"
                    fill="black"
                  />
                  <path
                    d="M163.522 125.045H173.143V144.286H163.522V125.045Z"
                    fill="black"
                  />
                  <path
                    d="M182.763 125.045H192.38V134.662H182.763V125.045Z"
                    fill="black"
                  />
                  <path
                    d="M144.286 134.665H153.902V144.286H163.522V163.523H192.38V173.143H153.899V192.383H144.286V173.143H134.665V182.767H125.045V192.383H134.665V202H86.5713V192.38H115.428V173.143H125.049V144.286H144.286V134.665Z"
                    fill="black"
                  />
                  <path
                    d="M0 134.665V202H67.3345V134.665H0ZM57.7143 192.38H9.62025V144.286H57.7143V192.38Z"
                    fill="black"
                  />
                  <path
                    d="M105.812 144.286H115.429V153.902H105.812V144.286Z"
                    fill="black"
                  />
                  <path
                    d="M173.143 144.286H192.376V153.902H173.143V144.286Z"
                    fill="black"
                  />
                  <path
                    d="M19.2368 153.902H48.094V182.76H19.2368V153.902Z"
                    fill="black"
                  />
                  <path
                    d="M192.38 153.902H202V163.523H192.38V153.902Z"
                    fill="black"
                  />
                  <path
                    d="M76.9546 163.523H86.5712V173.143H96.1915V182.767H76.9546V163.523Z"
                    fill="black"
                  />
                  <path
                    d="M96.188 163.523H115.428V173.143H96.188V163.523Z"
                    fill="black"
                  />
                  <path
                    d="M173.143 182.763H182.76V192.38H173.143V182.763Z"
                    fill="black"
                  />
                  <path
                    d="M192.38 182.763H202V192.38H192.38V182.763Z"
                    fill="black"
                  />
                  <path
                    d="M153.902 192.38H163.523V202H153.902V192.38Z"
                    fill="black"
                  />
                </g>
                <defs>
                  <clipPath id="clip0_750_3358">
                    <rect width="202" height="202" fill="white" />
                  </clipPath>
                </defs>
              </svg>
              <Space
                style={{
                  background: "#BFC4DA",
                  color: "white",
                  fontSize: "1.5rem",
                  width: "15rem",
                  height: "3rem",
                  justifyContent: "center",
                  border: "1px solid white",
                }}
              >
                {qrcode}
              </Space>
            </Space>
          </Card>
        </Col>
      </Row>
      <Row>
        <Col span={24}>
          <Space
            style={{ justifyContent: "center", width: "100%", padding: "2rem" }}
          >
            <Button
              type="primary"
              style={ButtonStyle}
              onClick={handlerOnConfirm}
            >
              Confirmar
            </Button>
          </Space>
        </Col>
      </Row>
      {isResultVisible && (
        <ResultContainer>
          <Result
            status="success"
            title="Registro de pulsera exitoso"
            subTitle="Order number: 2017182818828182881 Cloud server configuration takes 1-5 minutes, please wait."
            extra={[
              <Button type="primary" key="console" href="/dashboard//wearable">
                Ir al inicio
              </Button>,
            ]}
          />
        </ResultContainer>
      )}
    </Layout>
  );
};

export default ConfirmationStep;
