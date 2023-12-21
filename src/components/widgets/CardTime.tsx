import React, { useState, useEffect } from "react";
import { Card } from "antd";
import { CalendarOutlined } from "@ant-design/icons";

const DraggableCardTime: React.FC = () => {
  const [currentTime, setCurrentTime] = useState<string>("");
  const [currentDay, setCurrentDay] = useState<string>("");
  const [currentMonth, setCurrentMonth] = useState<string>("");

  const updateDateTime = () => {
    const now = new Date();

    const formattedTime = now.toLocaleTimeString("es-MX", {
      timeZone: "America/Mexico_City",
      hour: "2-digit",
      minute: "2-digit",
      hour12: true,
    });

    const dayOfWeek = new Intl.DateTimeFormat("es", {
      weekday: "long",
    }).format(now);

    const month = new Intl.DateTimeFormat("es", { month: "long" }).format(now);

    const dayOfMonth = now.getDate();
    const year = now.getFullYear();

    setCurrentTime(formattedTime);
    setCurrentDay(`${dayOfWeek}`);
    setCurrentMonth(`${month} ${dayOfMonth}, ${year.toString().slice(-2)}`);
  };

  useEffect(() => {
    // Actualizar la fecha y la hora inicialmente
    updateDateTime();

    // Configurar un intervalo para actualizar la fecha y la hora cada segundo
    const intervalId = setInterval(updateDateTime, 1000);

    // Limpieza al desmontar el componente
    return () => clearInterval(intervalId);
  }, []);

  return (
    <div>
      <Card
        title={
          <div>
            <CalendarOutlined
              style={{ fontSize: "40px", marginRight: "8px" }}
            />
          </div>
        }
        style={{ width: 350, height: 95 }}
        headStyle={{ background: "#40A9FF", color: "black", height: "50px" }}
        bodyStyle={{
          background: "#E5E8EE",
          display: "flex",
          justifyContent: "space-between",
          height: "100%",
        }}
      >
        <div style={{ flex: 1, padding: "1px" }}>
          <p
            style={{
              fontFamily: "Highlight 2",
              fontWeight: "bold",
              fontSize: "15px",
              marginTop: "-15px",
            }}
          >
            {currentDay}
          </p>
          <p
            style={{
              fontFamily: "Highlight 2",
              fontWeight: "bold",
              fontSize: "15px",
              marginTop: "-13px",
            }}
          >
            {currentMonth}
          </p>
        </div>
        <div style={{ padding: "1px" }}>
          <p
            style={{
              fontFamily: "Highlight 1",
              fontWeight: "bold",
              fontSize: "32px",
              marginTop: "-13px",
            }}
          >
            {currentTime}
          </p>
        </div>
      </Card>
    </div>
  );
};

export default DraggableCardTime;
