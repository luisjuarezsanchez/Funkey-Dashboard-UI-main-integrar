import React, { useState } from "react";
import GridLayout from "react-grid-layout";
import "react-grid-layout/css/styles.css";
import CardTime from "./CardTime.tsx";
import CardClimate from "./CardClimate.tsx";
import CardSensation from "./CardSensation.tsx";
import Table from "./Table.tsx";
import CardPhoto from "./CardPhoto.tsx";
import ReservationsCard from "./ReservationsCard.tsx";
import VisitantsCard from "./VisitantsCard.tsx";
import CardMap from "./CardMap.tsx";
import useWeatherData from "@/utils/useWeatherData";
import Switch from "./Switch.tsx";
import Modal from "./AddDeleteWidgets.tsx";

const DashboardLayout = () => {
  const weatherData = useWeatherData();
  const [isLayoutEditable, setIsLayoutEditable] = useState(true);

  if (!weatherData) {
    return <div>Cargando datos meteorológicos...</div>;
  }

  // Define el diseño inicial del dashboard con tres componentes Card
  // w anchura, h altura
  const initialLayout = [
    {
      i: "CardTime",
      x: 0,
      y: 0,
      w: 3.99,
      h: 1.45,
      minW: 3.6,
      minH: 1.8,
      maxW: 4,
      maxH: 1.8,
    },
    {
      i: "CardClimate",
      x: 4,
      y: 0,
      w: 3.99,
      h: 1.45,
      minW: 3.6,
      minH: 1.8,
      maxW: 4,
      maxH: 1.8,
    },
    {
      i: "CardSensation",
      x: 8,
      y: 0,
      w: 3.99,
      h: 1.45,
      minW: 4,
      minH: 1.8,
      maxW: 4,
      maxH: 1.8,
    },
    {
      i: "Table",
      x: 0,
      y: 1,
      w: 8,
      h: 1.85,
    },
    {
      i: "CardPhoto",
      x: 8,
      y: 1,
      w: 4,
      h: 1.8,
    },
    {
      i: "ReservationsCard",
      x: 0,
      y: 2,
      w: 4,
      h: 1,
    },
    {
      i: "VisitantsCard",
      x: 0,
      y: 3,
      w: 4,
      h: 1,
    },
    {
      i: "CardMap",
      x: 4,
      y: 3,
      w: 8,
      h: 2,
    },
  ];

  // Maneja el cambio en el diseño
  const onLayoutChange = (newLayout) => {
    // Puedes guardar el nuevo diseño en el estado si es necesario
    console.log("Nuevo layout:", newLayout);
  };

  const toggleLayoutEditability = () => {
    setIsLayoutEditable(!isLayoutEditable);
  };

  return (
    <div>
      <div style={{ display: "flex", justifyContent: "space-between" }}>
        <div>
          <button onClick={toggleLayoutEditability}>
            <Switch checked={isLayoutEditable} />
          </button>
        </div>
        <div style={{ marginLeft: "auto", marginRight: "20px" }}>
          <Modal />
        </div>
      </div>
      <GridLayout
        className="layout"
        layout={initialLayout}
        cols={12}
        rowHeight={100}
        width={1100} // Ancho
        onLayoutChange={onLayoutChange}
        isResizable={isLayoutEditable}
        isDraggable={isLayoutEditable}
      >
        <div key="CardTime">
          <CardTime />
        </div>
        <div key="CardClimate">
          <CardClimate weatherData={weatherData} />
        </div>
        <div key="CardSensation">
          <CardSensation weatherData={weatherData} />
        </div>
        <div key="Table">
          <Table />
        </div>
        <div key="CardPhoto">
          <CardPhoto />
        </div>
        <div key="ReservationsCard">
          <ReservationsCard />
        </div>
        <div key="VisitantsCard">
          <VisitantsCard />
        </div>
        <div key="CardMap">
          <CardMap />
        </div>
      </GridLayout>
    </div>
  );
};

export default DashboardLayout;
