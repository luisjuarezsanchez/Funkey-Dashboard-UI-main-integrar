import { AutoComplete, Button, Card, Input, Space } from "antd";
import { ChangeEvent, useState } from "react";

const cardStyle: React.CSSProperties = {
  width: "73rem",
  height: "9rem",
  borderRadius: "0.625rem",
  backgroundColor: "#969CB4",
};

const AutoStyle: React.CSSProperties = {
  width: "31.42rem",
  backgroundColor: "#969CB4",
};
const ButtonStyle: React.CSSProperties = {
  borderRadius: "2rem",
  width: "10rem",
  height: "2.5rem",
  backgroundColor: "#24314C",
};

const VisitorsSearch = ({ onSearch }: { onSearch: (text: string) => void }) => {
  const [text, setText] = useState("");
  const handlerOnInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    setText(e.currentTarget.value);
  };

  return (
    <Card title="Encontrar visitante" style={cardStyle}>
      <Space size={12}>
        <AutoComplete
          popupClassName="certain-category-search-dropdown"
          popupMatchSelectWidth={500}
          style={AutoStyle}
          size="large"
        >
          <Input.Search
            size="large"
            placeholder="Nombre/E-mail"
            onChange={handlerOnInputChange}
            onSearch={() => onSearch(text)}
          />
        </AutoComplete>
        <Button
          type="primary"
          style={ButtonStyle}
          onClick={() => onSearch(text)}
        >
          Buscar
        </Button>
      </Space>
    </Card>
  );
};

export default VisitorsSearch;
