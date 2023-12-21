import Auth0Service from "@/src/services/auth0";
import { Loading3QuartersOutlined } from "@ant-design/icons";
import { Button, Card, Form, Input } from "antd";
import Image from "next/image";
import { useState } from "react";
import styles from "../../../styles/Login.module.css";

const LoginForm = () => {
  const [form] = Form.useForm();
  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState(false);

  const onFinish = () => {
    setLoading(true);
    setErrorMessage(false);

    const auth0Service = new Auth0Service();
    try {
      auth0Service.login();
    }
    catch(err: any) {
      if (err.code === "access_denied") {
        setErrorMessage(true);
      }
      setLoading(false);
    }
  };

  type FieldType = {
    email?: string;
    password?: string;
  };

  const antIcon = (
    <Loading3QuartersOutlined spin style={{ fontSize: 19, color: "#fff" }} />
  );

  return (
    <Card className={styles.loginCard}>
      <div className={styles.loginLogo}>
        <Image
          src="/images/LogoCA.png"
          alt="Codice Azul Logo"
          width={30}
          height={30}
        />
        <span>CLASE AZUL</span>
      </div>
      <h2>INICIAR SESIÓN</h2>
      <Form
        form={form}
        name="basic"
        layout="vertical"
        onFinish={onFinish}
        autoComplete="off"
      >
        <Form.Item<FieldType>
          label={<label style={{ color: "white" }}>Correo electrónico</label>}
          name="email"
          rules={[
            {
              required: true,
              message: "Este campo es requerido",
            },
            {
              type: "email",
              message: "Debes ingresar un correo valido",
            },
          ]}
        >
          <Input />
        </Form.Item>

        <Form.Item<FieldType>
          label={<label style={{ color: "white" }}>Contraseña</label>}
          name="password"
          rules={[{ required: true, message: "Este campo es requerido" }]}
        >
          <Input.Password />
        </Form.Item>

        {errorMessage && (
          <p style={{ color: "red" }}>Correo o contraseña invalidos</p>
        )}

        <Form.Item>
          <a href="">Restablecer contraseña</a>
        </Form.Item>
        <Form.Item>
          <Button type="primary" htmlType="submit" style={{ width: 130 }}>
            {loading ? antIcon : "Ingresar"}
          </Button>
        </Form.Item>
      </Form>
    </Card>
  );
};

export default LoginForm;
