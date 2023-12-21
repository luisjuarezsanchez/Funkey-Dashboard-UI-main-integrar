"use client";

import { PlusOutlined } from "@ant-design/icons";
import {
  Button,
  Form,
  Input,
  Layout,
  Modal,
  Skeleton,
  Space,
  Table,
  Tag,
} from "antd";
import type { ColumnsType } from "antd/es/table";
import { useEffect, useState } from "react";

interface IRoles {
  name: string;
}

interface IResponse {
  id: string;
  key: string;
  fullName: string;
  email: string;
  roles: IRoles[];
}

interface DataType {
  id: string;
  key: string;
  fullName: string;
  email: string;
  roles: string[];
}

type FieldType = {
  name: string;
  lastName: string;
  email?: string;
  password?: string;
};

const rolesColor: any = {
  ADMIN: "magenta",
  STORYTELLER: "green",
  GUEST: "blue",
};

const UsersTable = ({ token }: { token: string }) => {
  const [isAuth, setIsAuth] = useState(false);
  const [data, setData] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const [loadingData, setLoadingData] = useState(false);
  const [isConfirmOpen, setIsConfirmOpen] = useState(false);
  const [deleteUserId, setDeleteUserId] = useState<string | null>(null);

  const URL = `${process.env.NEXT_PUBLIC_BFF_URL}/users`;

  useEffect(() => {
    if (token.length && !isAuth) {
      setIsAuth(true);
      setLoadingData(true);
      fetch(`${URL}/all`, {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
          mode: "cors",
        },
      })
        .then((response) => response.json())
        .then((data) => {
          setLoadingData(false);
          setData(
            data.map((item: IResponse, i: number) => ({
              id: item.id,
              key: i,
              fullName: item.fullName,
              email: item.email,
              roles:
                item.roles.length > 0
                  ? item.roles.map((role) => role.name)
                  : ["GUEST"],
            }))
          );
        })
        .catch((e) => {
          console.log("error", e);
        });
    }
  }, [URL, token, isAuth]);

  const handleDelete = () => {
    fetch(`${URL}/delete/${deleteUserId}`, { method: "DELETE" }).then(() => {
      setData(data.filter(({ id }) => id !== deleteUserId));
      setDeleteUserId(null);
      setIsConfirmOpen(false);
    });
  };

  const handleCancel = () => {
    setIsModalOpen(false);
  };

  const onFinish = (values: FieldType) => {
    setLoading(true);
    fetch(`${URL}/create`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(values),
    })
      .then((data) => {
        console.log(data);

        setLoading(false);
        setIsModalOpen(false);
      })
      .catch((e) => {
        console.log(e);
      });
  };

  const columns: ColumnsType<DataType> = [
    {
      title: "Nombre",
      dataIndex: "fullName",
      key: "fullName",
    },
    {
      title: "Email",
      dataIndex: "email",
      key: "email",
    },
    {
      title: "Roles",
      key: "roles",
      dataIndex: "tags",
      render: (_, { roles }) => (
        <>
          {roles.map((role) => {
            return (
              <Tag color={rolesColor[role]} key={role}>
                {role.toUpperCase()}
              </Tag>
            );
          })}
        </>
      ),
    },
    {
      title: "Acciones",
      key: "id",
      width: "200px",
      render: (_, { id }) => (
        <Space size="middle">
          <Button>Editar</Button>
          <Button
            danger
            onClick={() => {
              setIsConfirmOpen(true);
              setDeleteUserId(id);
            }}
          >
            Borrar
          </Button>
        </Space>
      ),
    },
  ];

  return (
    <Layout style={{ padding: "0 30px 30px 30px" }}>
      <div style={{ display: "flex", alignItems: "center" }}>
        <h1>Usarios</h1>
        <Button
          style={{ marginLeft: "auto" }}
          type="primary"
          onClick={() => setIsModalOpen(true)}
        >
          <PlusOutlined />
          Crear Usuario
        </Button>
      </div>

      {loadingData ? (
        <Layout style={{ width: "100%" }}>
          <Skeleton.Button
            active
            block
            size="large"
            style={{ marginBottom: 5, height: 60 }}
          />
          <Skeleton.Button
            active
            block
            size="large"
            style={{ marginBottom: 5, height: 70 }}
          />
          <Skeleton.Button
            active
            block
            size="large"
            style={{ marginBottom: 5, height: 70 }}
          />
          <Skeleton.Button
            active
            block
            size="large"
            style={{ marginBottom: 5, height: 70 }}
          />
          <Skeleton.Button
            active
            block
            size="large"
            style={{ marginBottom: 5, height: 70 }}
          />
          <Skeleton.Button
            active
            block
            size="large"
            style={{ marginBottom: 5, height: 70 }}
          />
        </Layout>
      ) : (
        <Table columns={columns} dataSource={data} />
      )}

      <Modal
        title="Crear Usuario"
        open={isModalOpen}
        footer={null}
        onCancel={handleCancel}
      >
        <Form
          name="basic"
          layout="vertical"
          onFinish={onFinish}
          autoComplete="off"
        >
          <Form.Item<FieldType>
            label="Nombre"
            name="name"
            rules={[
              {
                required: true,
                message: "Este campo es requerido",
              },
            ]}
          >
            <Input />
          </Form.Item>

          <Form.Item<FieldType>
            label="Apellido"
            name="lastName"
            rules={[
              {
                required: true,
                message: "Este campo es requerido",
              },
            ]}
          >
            <Input />
          </Form.Item>

          <Form.Item<FieldType>
            label="Correo electrónico"
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
            label="Contraseña"
            name="password"
            rules={[{ required: true, message: "Este campo es requerido" }]}
          >
            <Input.Password />
          </Form.Item>
          <div>
            <Button
              key="submit"
              type="primary"
              loading={loading}
              htmlType="submit"
              style={{ minWidth: 150 }}
            >
              {loading ? "Guardando..." : "Crear Usuario"}
            </Button>
          </div>
        </Form>
      </Modal>

      <Modal
        title="Borrar Usuario"
        open={isConfirmOpen}
        onCancel={() => setIsConfirmOpen(false)}
        onOk={handleDelete}
      >
        ¿Confirma que desa eliminar este usuario?
      </Modal>
    </Layout>
  );
};

export default UsersTable;
