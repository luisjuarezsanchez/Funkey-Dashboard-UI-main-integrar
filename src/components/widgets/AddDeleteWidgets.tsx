import React, { useState } from "react";
import { Button, Modal, Checkbox } from "antd";

const App: React.FC = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const showModal = () => {
    setIsModalOpen(true);
  };

  const handleOk = () => {
    setIsModalOpen(false);
  };

  const handleCancel = () => {
    setIsModalOpen(false);
  };

  // Opciones para los checkboxes
  const checkboxOptions = [
    "Fecha/Hora",
    "Clima",
    "Humedad",
    "Grupos activos la hacienda",
    "Acceso a phpto opportunity",
    "Calendario",
    "Primera reservación",
    "Ultima reservación",
    "Reservacion siguientes del día",
  ];

  //const [checkedList, setCheckedList] = useState<CheckboxValueType[]>([]);

  /*const onChange = (list: CheckboxValueType[]) => {
    setCheckedList(list);
  };*/

  return (
    <>
      <Button type="primary" onClick={showModal}>
        + Agregar widget
      </Button>
      <Modal
        title="Agregar widget al escritorio"
        visible={isModalOpen}
        onOk={handleOk}
        onCancel={handleCancel}
      >
        <Checkbox.Group options={checkboxOptions} />
      </Modal>
    </>
  );
};

export default App;
